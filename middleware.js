import { rewrite, next } from '@vercel/functions';

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
  matcher: ['/((?!api/|assets/)(?!.*\\.(ico|png|jpg|jpeg|svg|gif|css|js|xml|txt|json|webp)$).*)'],
};
