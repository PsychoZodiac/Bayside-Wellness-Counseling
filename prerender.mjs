import fs from 'node:fs';
import path from 'node:path';

// Keep browser-dependent component initializers compatible with server rendering.
// Do not set window.document: Helmet must remain in server mode.
global.window = {
  matchMedia: () => ({
    matches: false,
    addListener() {},
    removeListener() {},
  }),
};

global.localStorage = {
  getItem: () => null,
  setItem() {},
  removeItem() {},
};

global.document = {
  createElement: () => ({
    setAttribute() {},
    appendChild() {},
    remove() {},
  }),
  getElementById: () => null,
  body: { appendChild() {}, removeChild() {} },
  head: { appendChild() {} },
};

const tagAttributes = (tag) => {
  const attrs = {};
  const pattern =
    /([^\s=/>]+)\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'=<>`]+))/g;

  for (const match of tag.matchAll(pattern)) {
    attrs[match[1].toLowerCase()] =
      match[2] ?? match[3] ?? match[4];
  }

  return attrs;
};

const ownedMeta = (tag) => {
  const attrs = tagAttributes(tag);
  const name = (attrs.name || '').toLowerCase();
  const property = (attrs.property || '').toLowerCase();

  return [
    'description',
    'keywords',
    'robots',
    'googlebot',
    'author',
    'icbm',
  ].includes(name)
    || name.startsWith('geo.')
    || name.startsWith('twitter:')
    || property.startsWith('og:');
};

const isCanonical = (tag) =>
  (tagAttributes(tag).rel || '')
    .toLowerCase()
    .split(/\s+/)
    .includes('canonical');

function buildPage(template, appHtml, helmet, urlPath) {
  if (typeof appHtml !== 'string' || !appHtml.trim()) {
    throw new Error('The renderer returned empty page content.');
  }

  const title = helmet?.title?.toString() || '';
  const meta = helmet?.meta?.toString() || '';
  const links = helmet?.link?.toString() || '';

  if (
    (title.match(/<title\b/gi) || []).length !== 1
    || !/<title\b[^>]*>\s*\S[\s\S]*?<\/title>/i.test(title)
  ) {
    throw new Error(
      'The renderer must supply one nonempty Helmet title.'
    );
  }

  const headPattern =
    /(<head\b[^>]*>)([\s\S]*?)(<\/head\s*>)/i;

  const protectedPattern =
    /(<script\b[^>]*>[\s\S]*?<\/script\s*>|<style\b[^>]*>[\s\S]*?<\/style\s*>|<!--[\s\S]*?-->)/gi;

  if (!headPattern.test(template)) {
    throw new Error('dist/index.html has no head element.');
  }

  let html = template.replace(
    headPattern,
    (_match, open, head, close) => {
      // Preserve scripts, styles, comments, analytics, and JSON-LD.
      const parts = head.split(protectedPattern);

      const cleaned = parts.map((part, index) =>
        index % 2
          ? part
          : part
              .replace(
                /<title\b[^>]*>[\s\S]*?<\/title\s*>/gi,
                ''
              )
              .replace(
                /<meta\b(?:[^"'<>]|"[^"]*"|'[^']*')*>/gi,
                (tag) => ownedMeta(tag) ? '' : tag
              )
              .replace(
                /<link\b(?:[^"'<>]|"[^"]*"|'[^']*')*>/gi,
                (tag) => isCanonical(tag) ? '' : tag
              )
      ).join('');

      return `${open}\n${title}\n${meta}\n${links}\n${cleaned}${close}`;
    }
  );

  // Accept either quote style and whitespace, but require an empty root.
  const rootPattern =
    /<div\b(?=[^>]*\sid\s*=\s*(["'])root\1)[^>]*>\s*<\/div\s*>/gi;

  if ([...html.matchAll(rootPattern)].length !== 1) {
    throw new Error(
      'Expected one empty root div. Run a fresh Vite build first.'
    );
  }

  // Function replacements preserve literal dollar sequences in content.
  html = html.replace(
    rootPattern,
    (root) => root.replace(
      />\s*<\/div\s*>$/i,
      () => `>${appHtml}</div>`
    )
  );

  const finalHead = html.match(headPattern)[2]
    .split(protectedPattern)
    .filter((_part, index) => index % 2 === 0)
    .join('');

  const metaTags =
    finalHead.match(
      /<meta\b(?:[^"'<>]|"[^"]*"|'[^']*')*>/gi
    ) || [];

  const descriptions = metaTags.filter(
    (tag) =>
      (tagAttributes(tag).name || '').toLowerCase()
      === 'description'
  );

  if (
    descriptions.length !== 1
    || !(tagAttributes(descriptions[0]).content || '').trim()
  ) {
    throw new Error('Expected one nonempty page description.');
  }

  const canonicals = (
    finalHead.match(
      /<link\b(?:[^"'<>]|"[^"]*"|'[^']*')*>/gi
    ) || []
  ).filter(isCanonical);

  if (canonicals.length > 1) {
    throw new Error('The page has conflicting canonical tags.');
  }

  const noindex = metaTags.some((tag) => {
    const attrs = tagAttributes(tag);

    return ['robots', 'googlebot'].includes(
      (attrs.name || '').toLowerCase()
    ) && /\bnoindex\b/i.test(attrs.content || '');
  });

  if (!noindex && canonicals.length !== 1) {
    throw new Error(
      'An indexable page must supply one canonical URL.'
    );
  }

  if (canonicals.length) {
    const canonicalPath =
      new URL(tagAttributes(canonicals[0]).href)
        .pathname.replace(/\/+$/, '') || '/';

    if (canonicalPath !== urlPath) {
      throw new Error(
        `Canonical URL does not match ${urlPath}. Check the route list and metadata.`
      );
    }
  }

  return html;
}

function readRoutes(text) {
  const routes = new Set(['']);

  for (const line of text.replace(/^\uFEFF/, '').split(/\r?\n/)) {
    const trimmed = line.trim();

    if (!trimmed || trimmed.startsWith('#')) continue;

    if (
      /^[a-z][a-z0-9+.-]*:/i.test(trimmed)
      || trimmed.startsWith('//')
    ) {
      throw new Error(
        `Use local paths in prerender-routes.txt: ${trimmed}`
      );
    }

    const route = trimmed.replace(/^\/+|\/+$/g, '');
    if (!route) continue;

    if (
      /[?#\\%]/.test(route)
      || route.split('/').some(
        (part) => !part || part === '.' || part === '..'
      )
    ) {
      throw new Error(`Invalid prerender route: ${trimmed}`);
    }

    routes.add(route);
  }

  return [...routes];
}

try {
  const { render } = await import('./dist-ssr/entry-server.js');

  const template = fs.readFileSync('dist/index.html', 'utf8');

  const routes = readRoutes(
    fs.readFileSync('prerender-routes.txt', 'utf8')
  );

  const pages = [];
  const failures = [];

  for (const route of routes) {
    const urlPath = '/' + route;

    try {
      const { html: appHtml, helmet } = await render(urlPath);

      pages.push({
        route,
        html: buildPage(template, appHtml, helmet, urlPath),
      });
    } catch (error) {
      failures.push({
        route: urlPath,
        error: error.message,
      });
    }
  }

  console.log(`Success: ${pages.length}`);
  console.log(`Failed: ${failures.length}`);

  if (failures.length) {
    for (const failure of failures) {
      console.error(`  ${failure.route}: ${failure.error}`);
    }

    throw new Error(
      'Prerender failed. No generated pages were written.'
    );
  }

  // Write only after all requested pages render successfully.
  for (const page of pages) {
    const outDir = path.join('dist', page.route);
    fs.mkdirSync(outDir, { recursive: true });
    fs.writeFileSync(
      path.join(outDir, 'index.html'),
      page.html
    );
  }
} catch (error) {
  console.error(error.message);
  process.exitCode = 1;
}
