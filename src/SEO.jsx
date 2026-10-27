import { Helmet } from 'react-helmet-async';

const DEFAULT_TITLE = 'Bayside Wellness & Counseling | Therapy in California';
const DEFAULT_DESCRIPTION = 'Virtual therapy for adults and young adults across California with Marcus Ghiasi, LMFT. Schedule a free 15-minute consultation.';
const DEFAULT_IMAGE = 'https://baysidewellnessandcounseling.com/og-image-square.jpg';

// Existing <SEO metadata={...} /> calls continue to work.
// Use noindex or metadata.noindex for pages that should stay out of search.
export function SEO({ metadata, noindex = false }) {
  const page = metadata || {};
  const title = page.title || DEFAULT_TITLE;
  const description = page.description || DEFAULT_DESCRIPTION;
  const robots = noindex || page.noindex
    ? 'noindex, follow'
    : page.robots || 'index, follow';
  const isNoindex = /\bnoindex\b/i.test(robots);
  // Never default an unknown page's canonical URL to the homepage.
  const canonical = isNoindex ? undefined : page.canonical;
  const ogTitle = page.ogTitle || title;
  const ogDescription = page.ogDescription || description;
  const ogImage = page.ogImage || DEFAULT_IMAGE;
  const ogUrl = isNoindex ? undefined : page.ogUrl || canonical;

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      {page.keywords && <meta name="keywords" content={page.keywords} />}
      {canonical && <link rel="canonical" href={canonical} />}

      <meta property="og:type" content={page.ogType || 'website'} />
      {ogUrl && <meta property="og:url" content={ogUrl} />}
      <meta property="og:title" content={ogTitle} />
      <meta property="og:description" content={ogDescription} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:site_name" content="Bayside Wellness & Counseling" />

      <meta name="twitter:card" content={page.twitterCard || 'summary_large_image'} />
      <meta name="twitter:title" content={page.twitterTitle || ogTitle} />
      <meta name="twitter:description" content={page.twitterDescription || ogDescription} />
      <meta name="twitter:image" content={page.twitterImage || ogImage} />

      <meta name="robots" content={robots} />
      <meta name="googlebot" content={robots} />
      <meta name="author" content="Marcus Ghiasi, LMFT" />

      <meta name="geo.region" content="US-CA" />
      <meta name="geo.placename" content="Oakland" />
      <meta name="geo.position" content="37.8044;-122.2712" />
      <meta name="ICBM" content="37.8044, -122.2712" />
    </Helmet>
  );
}

export default SEO;
