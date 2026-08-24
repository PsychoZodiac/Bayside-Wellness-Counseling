import fs from 'fs';
import path from 'path';

// Browser-global stubs needed because some component initializers
// (e.g. dark mode) reference these outside of useEffect.
global.window = { matchMedia: () => ({ matches: false, addListener: () => {}, removeListener: () => {} }) };
global.localStorage = { getItem: () => null, setItem: () => {}, removeItem: () => {} };
global.document = {
  createElement: () => ({ setAttribute: () => {}, appendChild: () => {}, remove: () => {} }),
  getElementById: () => null,
  body: { appendChild: () => {}, removeChild: () => {} },
  head: { appendChild: () => {} },
};

const { render } = await import('./dist-ssr/entry-server.js');

const template = fs.readFileSync('dist/index.html', 'utf-8');

// Extract routes directly from the sitemap - this is already the site's
// real source of truth for which URLs exist, so this script can never
// silently drift out of sync with it.
const sitemapXml = fs.readFileSync('dist/sitemap.xml', 'utf-8');
const locMatches = [...sitemapXml.matchAll(/<loc>https:\/\/baysidewellnessandcounseling\.com\/([^<]*)<\/loc>/g)];
const routes = locMatches.map(m => m[1]);
if (!routes.includes('')) routes.unshift(''); // ensure homepage is included

function buildPage(routePath, appHtml, helmet) {
  let html = template;

  // Remove the default static <title> tag, replace with the real per-page one
  html = html.replace(/<title>.*?<\/title>/s, helmet.title.toString());

  // Remove the default Open Graph block, replace with per-page Helmet meta
  html = html.replace(
    /<!-- Open Graph -->[\s\S]*?<!-- Twitter -->[\s\S]*?(?=<!-- Google Analytics -->)/,
    ''
  );

  // Insert the full Helmet meta + link block right after the title
  const helmetHead = [
    helmet.meta ? helmet.meta.toString() : '',
    helmet.link ? helmet.link.toString() : '',
  ].join('\n');
  html = html.replace(helmet.title.toString(), `${helmet.title.toString()}\n${helmetHead}`);

  // Fill the empty root div with the real rendered content
  html = html.replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`);

  return html;
}

let successCount = 0;
let failCount = 0;
const failures = [];

for (const route of routes) {
  const urlPath = '/' + route;
  try {
    const { html: appHtml, helmet } = render(urlPath);
    const finalHtml = buildPage(urlPath, appHtml, helmet);

    const outDir = route === '' ? null : path.join('dist', route);
    if (outDir) {
      fs.mkdirSync(outDir, { recursive: true });
      fs.writeFileSync(path.join(outDir, 'index.html'), finalHtml);
    }
    // route === '' is the homepage, dist/index.html already exists from
    // the client build - overwrite it with the prerendered version too
    if (route === '') {
      fs.writeFileSync('dist/index.html', finalHtml);
    }
    successCount++;
  } catch (e) {
    failCount++;
    failures.push({ route: urlPath, error: e.message });
  }
}

console.log(`Success: ${successCount}`);
console.log(`Failed: ${failCount}`);
if (failures.length > 0) {
  console.log('\nFailures:');
  failures.forEach(f => console.log(`  ${f.route}: ${f.error}`));
}
