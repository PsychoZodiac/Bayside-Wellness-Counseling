// Shared metadata for Bayside's core, service, article, and local pages.
const baseUrl = "https://baysidewellnessandcounseling.com";
const defaultImage = `${baseUrl}/og-image-square.jpg`;

export const baseMeta = {
  siteName: "Bayside Wellness & Counseling",
  therapistName: "Marcus Ghiasi, LMFT",
  phone: "415-857-5799",
  address: "2323 Broadway, Oakland, CA 94612",
  baseUrl,
};

// Canonical page URLs use this site's origin, without tracking queries/fragments.
const canonicalUrl = (path = "/") => {
  const url = new URL(path || "/", `${baseUrl}/`);
  if (url.origin !== baseUrl) {
    throw new TypeError("Canonical page URLs must belong to the Bayside website.");
  }
  url.search = "";
  url.hash = "";
  if (url.pathname !== "/") url.pathname = url.pathname.replace(/\/+$/, "");
  return url.href;
};

const imageUrl = (image) => {
  const url = new URL(image || defaultImage, `${baseUrl}/`);
  return ["https:", "http:"].includes(url.protocol) ? url.href : defaultImage;
};

export const generateMetadata = ({
  title = baseMeta.siteName,
  description = "Virtual therapy for adults and young adults across California with Marcus Ghiasi, LMFT. Schedule a free 15-minute consultation.",
  keywords = [],
  path = "/",
  image = defaultImage,
  type = "website",
  skipBrandSuffix = false,
  noindex = false,
  robots = "index, follow",
} = {}) => {
  const titleText = title || baseMeta.siteName;
  const fullTitle = (skipBrandSuffix || titleText.includes("Bayside"))
    ? titleText
    : `${titleText} | ${baseMeta.siteName}`;
  const directives = noindex ? "noindex, follow" : robots;
  const isNoindex = /\bnoindex\b/i.test(directives);
  const url = isNoindex ? undefined : canonicalUrl(path);
  const socialImage = imageUrl(image);

  return {
    title: fullTitle,
    description,
    keywords: Array.isArray(keywords) ? keywords.filter(Boolean).join(", ") : keywords || "",
    canonical: url,
    // Keep the explicit flag separate so custom robots directives survive SEO.jsx.
    noindex: Boolean(noindex),
    robots: directives,
    ogTitle: fullTitle,
    ogDescription: description,
    ogImage: socialImage,
    ogUrl: url,
    ogType: type,
    twitterCard: "summary_large_image",
    twitterTitle: fullTitle,
    twitterDescription: description,
    twitterImage: socialImage,
  };
};

export const mainPages = {
  home: generateMetadata({
    title: "Oakland-Based Online Therapy | Bayside Wellness & Counseling",
    description: "Virtual individual therapy for adults across California. Support for anxiety, trauma, depression, and relationships. Book a free 15-minute consultation.",
    keywords: ["Oakland therapist", "LMFT California", "EMDR therapy", "IFS therapy", "trauma therapy", "anxiety therapy", "depression counseling", "virtual therapy California", "telehealth therapy"],
    path: "/",
  }),
  about: generateMetadata({
    title: "About Marcus Ghiasi, LMFT",
    description: "Meet Marcus Ghiasi, LMFT, California license #158475. Learn about his background and approach to virtual individual therapy for adults.",
    keywords: ["Marcus Ghiasi", "LMFT Oakland", "licensed therapist", "marriage family therapist", "Bay Area therapist", "Persian American therapist"],
    path: "/about",
  }),
  contact: generateMetadata({
    title: "Contact & Book Appointment | Bayside Wellness Oakland",
    description: "Schedule your free 15-minute consultation with Marcus Ghiasi, LMFT. Virtual therapy across California. Call 415-857-5799 or book online.",
    keywords: ["book therapy appointment", "schedule consultation", "Oakland therapy contact", "virtual therapy booking"],
    path: "/contact",
  }),
  faq: generateMetadata({
    title: "FAQ - Therapy Questions Answered | Bayside Wellness",
    description: "Common questions about therapy, insurance, session length, virtual therapy, and what to expect. Get answers about working with Marcus Ghiasi, LMFT.",
    keywords: ["therapy FAQ", "therapy questions", "how therapy works", "therapy cost", "virtual therapy questions"],
    path: "/faq",
  }),
  blog: generateMetadata({
    title: "Mental Health Blog | Bayside Wellness & Counseling",
    description: "Reflections and educational articles from Marcus Ghiasi, LMFT, on mental health, therapy, relationships, and everyday life.",
    keywords: ["mental health blog", "therapy blog", "trauma recovery", "relationship advice", "therapist insights"],
    path: "/blog",
  }),
  services: generateMetadata({
    title: "Individual Therapy Services",
    description: "Explore EMDR, IFS, CBT, psychodynamic work, and individual therapy for young adults and men. Virtual sessions with Marcus Ghiasi, LMFT, in California.",
    keywords: ["therapy services Oakland", "EMDR therapy", "IFS therapy", "CBT therapy", "young adults therapy", "men's therapy"],
    path: "/services",
  }),
  crisisResources: generateMetadata({
    title: "Crisis Resources & Mental Health Support | Bayside Wellness",
    description: "Immediate support options, including the 988 Suicide & Crisis Lifeline, and links to safety resources. Bayside is not an emergency response service.",
    keywords: ["crisis resources", "suicide prevention", "988 hotline", "mental health emergency", "crisis support"],
    path: "/crisis-resources",
  }),
  // Ready for the missing-page routes; this entry alone does not change routing
  // or the HTTP response code returned by the hosting service.
  notFound: generateMetadata({
    title: "Page Not Found",
    description: "This page could not be found. Explore Bayside Wellness & Counseling's therapy services or contact Marcus Ghiasi, LMFT.",
    noindex: true,
  }),
};

export const servicePages = {
  emdr: generateMetadata({
    title: "EMDR Therapy in Oakland, CA",
    description: "Explore virtual EMDR with Marcus Ghiasi, LMFT, including assessment, preparation, and work with distressing memories. Adults in California.",
    keywords: ["EMDR therapy Oakland", "trauma therapy", "PTSD treatment", "EMDR therapist", "trauma processing", "eye movement therapy"],
    path: "/services/emdr",
  }),
  ifs: generateMetadata({
    title: "IFS Therapy in Oakland, CA",
    description: "Virtual Internal Family Systems (IFS) therapy and compassionate parts work with Marcus Ghiasi, LMFT. Oakland-based and serving adults across California.",
    keywords: ["IFS therapy Oakland", "Internal Family Systems", "parts work therapy", "IFS therapist", "self-compassion therapy"],
    path: "/services/ifs",
  }),
  cbt: generateMetadata({
    title: "CBT Therapy in Oakland, CA",
    description: "Virtual CBT for anxiety, depression, and stress with Marcus Ghiasi, LMFT. Learn practical skills to shift thought patterns. Available across California.",
    keywords: ["CBT therapy Oakland", "cognitive behavioral therapy", "anxiety treatment", "depression therapy", "thought pattern work"],
    path: "/services/cbt",
  }),
  psychodynamic: generateMetadata({
    title: "Psychodynamic Therapy in Oakland",
    description: "Virtual psychodynamic therapy exploring how your past shapes your present. Work with Oakland-based Marcus Ghiasi, LMFT, from anywhere in California.",
    keywords: ["psychodynamic therapy Oakland", "insight therapy", "depth psychology", "relationship patterns", "unconscious patterns"],
    path: "/services/psychodynamic",
  }),
  "young-adults": generateMetadata({
    title: "Young Adult Therapy in Oakland",
    description: "Virtual therapy for young adults ages 18 to 30 navigating anxiety, identity, career transitions, and early adulthood. Marcus Ghiasi, LMFT. California-wide.",
    keywords: ["young adults therapy Oakland", "therapy for 20 somethings", "quarter life crisis therapist", "college graduate therapy", "early career anxiety", "identity therapy young adults"],
    path: "/services/young-adults",
  }),
  mens: generateMetadata({
    title: "Men's Therapy in Oakland, CA",
    description: "Virtual therapy for men addressing anger, relationships, emotional expression, and work stress. A direct, practical approach with Marcus Ghiasi, LMFT in California.",
    keywords: ["men's therapy Oakland", "therapy for men", "anger management", "men's mental health", "masculinity counseling"],
    path: "/services/mens",
  }),
};

export const generateBlogMeta = (post) => {
  if (!post?.slug) return mainPages.notFound;
  return generateMetadata({
    title: post.title,
    description: post.excerpt,
    keywords: [post.category, "mental health", "therapy", "counseling", "Oakland therapist"],
    path: `/blog/${post.slug}`,
    type: "article",
    image: post.image,
    noindex: post.noindex,
    robots: post.robots,
  });
};

export const generateSEOPageMeta = (page) => {
  if (!page?.slug) return mainPages.notFound;
  return generateMetadata({
    title: page.metaTitle || `${page.title} | ${baseMeta.siteName}`,
    skipBrandSuffix: true,
    description: page.metaDescription || `Virtual therapy in ${page.city}, CA with Marcus Ghiasi, LMFT. EMDR, IFS, CBT. Free 15-minute consultation.`,
    keywords: page.keywords || [
      `${page.city} therapist`, `therapy ${page.city}`, "LMFT California",
      "virtual therapy", "telehealth therapy", "EMDR", "IFS", "CBT",
    ],
    path: `/${page.slug}`,
    image: page.image,
    noindex: page.noindex,
    robots: page.robots,
  });
};

export default {
  baseMeta,
  generateMetadata,
  mainPages,
  servicePages,
  generateBlogMeta,
  generateSEOPageMeta,
};
