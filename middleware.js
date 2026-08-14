// The rewrite() and next() helpers below are inlined from
// @vercel/functions/middleware rather than imported, to avoid pulling in
// the full @vercel/functions package (which bundles unrelated Node-only
// features like OIDC, database connections, and websockets that the
// Edge Runtime rejects even when unused). Both functions just build a
// plain Response with the header Vercel's own routing layer looks for.
function rewrite(destination) {
  const headers = new Headers();
  headers.set('x-middleware-rewrite', String(destination));
  return new Response(null, { headers });
}

function next() {
  const headers = new Headers();
  headers.set('x-middleware-next', '1');
  return new Response(null, { headers });
}

// Known crawlers that need server-rendered HTML with real meta tags,
// since they either don't execute JavaScript at all or don't wait
// long enough for a client-rendered SPA to finish loading.
const BOT_USER_AGENTS = [
  'googlebot',
  'bingbot',
  'slurp',
  'duckduckbot',
  'baiduspider',
  'yandexbot',
  'facebookexternalhit',
  'facebot',
  'twitterbot',
  'linkedinbot',
  'slackbot',
  'discordbot',
  'whatsapp',
  'telegrambot',
  'applebot',
  'pinterest',
  'redditbot',
  'skypeuripreview',
];

function isBot(userAgent) {
  if (!userAgent) return false;
  const ua = userAgent.toLowerCase();
  return BOT_USER_AGENTS.some((bot) => ua.includes(bot));
}

export default function middleware(request) {
  const userAgent = request.headers.get('user-agent');

  if (!isBot(userAgent)) {
    return next();
  }

  const url = new URL(request.url);
  const targetUrl = new URL('/api/og', request.url);
  targetUrl.searchParams.set('path', url.pathname);

  return rewrite(targetUrl);
}

// Run on every page route except static assets, the api route itself,
// and root-level static files identified by a common file extension.
export const config = {
  matcher: ['/((?!api/|assets/)(?!.*\\.(?:ico|png|jpg|jpeg|svg|gif|css|js|xml|txt|json|webp)$).*)'],
};
