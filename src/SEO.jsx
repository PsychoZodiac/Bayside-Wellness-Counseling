import { Helmet } from 'react-helmet-async';

// Reusable SEO component for all pages
export function SEO({ metadata }) {
  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{metadata.title}</title>
      <meta name="description" content={metadata.description} />
      {metadata.keywords && <meta name="keywords" content={metadata.keywords} />}
      <link rel="canonical" href={metadata.canonical} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={metadata.ogType} />
      <meta property="og:url" content={metadata.ogUrl} />
      <meta property="og:title" content={metadata.ogTitle} />
      <meta property="og:description" content={metadata.ogDescription} />
      <meta property="og:image" content={metadata.ogImage} />
      <meta property="og:site_name" content="Bayside Wellness & Counseling" />
      
      {/* Twitter */}
      <meta name="twitter:card" content={metadata.twitterCard} />
      <meta name="twitter:title" content={metadata.twitterTitle} />
      <meta name="twitter:description" content={metadata.twitterDescription} />
      <meta name="twitter:image" content={metadata.twitterImage} />
      
      {/* Additional SEO */}
      <meta name="robots" content="index, follow" />
      <meta name="googlebot" content="index, follow" />
      <meta name="author" content="Marcus Ghiasi, LMFT" />
      
      {/* Geo Tags for Local SEO */}
      <meta name="geo.region" content="US-CA" />
      <meta name="geo.placename" content="Oakland" />
      <meta name="geo.position" content="37.8044;-122.2712" />
      <meta name="ICBM" content="37.8044, -122.2712" />
    </Helmet>
  );
}

export default SEO;
