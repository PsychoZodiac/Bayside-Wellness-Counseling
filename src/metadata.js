// Comprehensive SEO Metadata Configuration
// For all 165+ pages of Bayside Wellness & Counseling

const baseUrl = "https://baysidewellnessandcounseling.com";
const defaultImage = `${baseUrl}/og-image.jpg`;

// Base metadata used across the site
export const baseMeta = {
  siteName: "Bayside Wellness & Counseling",
  therapistName: "Marcus Ghiasi, LMFT",
  phone: "415-857-5799",
  address: "2323 Broadway, Oakland, CA 94612",
  baseUrl: baseUrl,
};

// Generate metadata helper function
export const generateMetadata = ({ 
  title, 
  description, 
  keywords = [], 
  path = "/",
  image = defaultImage,
  type = "website"
}) => {
  const fullTitle = title.includes("Bayside") ? title : `${title} | Bayside Wellness & Counseling`;
  const url = `${baseUrl}${path}`;
  
  return {
    title: fullTitle,
    description: description,
    keywords: keywords.join(", "),
    canonical: url,
    ogTitle: fullTitle,
    ogDescription: description,
    ogImage: image,
    ogUrl: url,
    ogType: type,
    twitterCard: "summary_large_image",
    twitterTitle: fullTitle,
    twitterDescription: description,
    twitterImage: image,
  };
};

// MAIN PAGES METADATA
export const mainPages = {
  home: generateMetadata({
    title: "Bayside Wellness & Counseling | Licensed Therapist Oakland, CA",
    description: "EMDR, IFS, and CBT therapy for trauma, anxiety, depression, and relationship issues. Virtual therapy across California with Marcus Ghiasi, LMFT. Free 15-minute consultation.",
    keywords: ["Oakland therapist", "LMFT California", "EMDR therapy", "IFS therapy", "trauma therapy", "anxiety therapy", "depression counseling", "virtual therapy California", "telehealth therapy"],
    path: "/",
  }),
  
  about: generateMetadata({
    title: "About Marcus Ghiasi, LMFT | Licensed Therapist Oakland",
    description: "Marcus Ghiasi is a Licensed Marriage and Family Therapist specializing in EMDR, IFS, CBT, and psychodynamic therapy. Bay Area native offering virtual therapy across California.",
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
    description: "Expert insights on mental health, therapy, trauma, relationships, and personal growth from Marcus Ghiasi, LMFT. Evidence-based perspectives and practical guidance.",
    keywords: ["mental health blog", "therapy blog", "trauma recovery", "relationship advice", "therapist insights"],
    path: "/blog",
  }),
  
  services: generateMetadata({
    title: "Therapy Services | EMDR, IFS, CBT, Teen & Men's Therapy Oakland",
    description: "Evidence-based therapy services including EMDR for trauma, IFS for parts work, CBT for anxiety and depression, teen therapy, and men's therapy. Virtual sessions across California.",
    keywords: ["therapy services Oakland", "EMDR therapy", "IFS therapy", "CBT therapy", "teen therapy", "men's therapy"],
    path: "/services",
  }),
  
  crisisResources: generateMetadata({
    title: "Crisis Resources & Mental Health Support | Bayside Wellness",
    description: "Immediate mental health crisis resources including 988 Suicide & Crisis Lifeline, emergency contacts, and support services. Help is available 24/7.",
    keywords: ["crisis resources", "suicide prevention", "988 hotline", "mental health emergency", "crisis support"],
    path: "/crisis-resources",
  }),
};

// SERVICE PAGES METADATA
export const servicePages = {
  emdr: generateMetadata({
    title: "EMDR Therapy Oakland | Trauma Treatment | Marcus Ghiasi, LMFT",
    description: "EMDR (Eye Movement Desensitization and Reprocessing) therapy for trauma, PTSD, anxiety, and distressing memories. Evidence-based trauma treatment in Oakland, CA.",
    keywords: ["EMDR therapy Oakland", "trauma therapy", "PTSD treatment", "EMDR therapist", "trauma processing", "eye movement therapy"],
    path: "/services/emdr",
  }),
  
  ifs: generateMetadata({
    title: "IFS Therapy Oakland | Internal Family Systems | Parts Work",
    description: "Internal Family Systems (IFS) therapy helps you understand and heal different parts of yourself. Compassionate parts work with Marcus Ghiasi, LMFT in Oakland.",
    keywords: ["IFS therapy Oakland", "Internal Family Systems", "parts work therapy", "IFS therapist", "self-compassion therapy"],
    path: "/services/ifs",
  }),
  
  cbt: generateMetadata({
    title: "CBT Therapy Oakland | Cognitive Behavioral Therapy | LMFT",
    description: "Cognitive Behavioral Therapy (CBT) for anxiety, depression, and stress. Learn practical skills to identify and shift thought patterns with Marcus Ghiasi, LMFT.",
    keywords: ["CBT therapy Oakland", "cognitive behavioral therapy", "anxiety treatment", "depression therapy", "thought pattern work"],
    path: "/services/cbt",
  }),
  
  psychodynamic: generateMetadata({
    title: "Psychodynamic Therapy Oakland | Insight-Oriented Therapy | LMFT",
    description: "Psychodynamic therapy explores how your past shapes your present. Deep, insight-oriented work addressing root causes with Marcus Ghiasi, LMFT in Oakland.",
    keywords: ["psychodynamic therapy Oakland", "insight therapy", "depth psychology", "relationship patterns", "unconscious patterns"],
    path: "/services/psychodynamic",
  }),

  teen: generateMetadata({
    title: "Teen Therapy Oakland | High School & College Students | LMFT",
    description: "Teen therapy for high schoolers and college students (14+) dealing with anxiety, depression, identity, academic pressure, athletic stress, and social struggles. Virtual therapy across California with Marcus Ghiasi, LMFT.",
    keywords: ["teen therapy Oakland", "therapy for teenagers", "high school therapy", "college student therapy", "teen anxiety", "teen depression", "adolescent counseling"],
    path: "/services/teen",
  }),
  
  mens: generateMetadata({
    title: "Men's Therapy Oakland | Counseling for Men | Anger, Relationships",
    description: "Therapy for men addressing anger, emotional expression, relationship issues, and work stress. Direct, practical approach with Marcus Ghiasi, LMFT.",
    keywords: ["men's therapy Oakland", "therapy for men", "anger management", "men's mental health", "masculinity counseling"],
    path: "/services/mens",
  }),
};

// Helper function to generate blog post metadata
export const generateBlogMeta = (post) => {
  return generateMetadata({
    title: post.title,
    description: post.excerpt,
    keywords: [post.category, "mental health", "therapy", "counseling", "Oakland therapist"],
    path: `/blog/${post.slug}`,
    type: "article",
  });
};

// Helper function to generate SEO landing page metadata
export const generateSEOPageMeta = (page) => {
  return generateMetadata({
    title: page.metaTitle || `${page.title} | Bayside Wellness & Counseling`,
    description: page.metaDescription || `Virtual therapy in ${page.city}, CA with Marcus Ghiasi, LMFT. EMDR, IFS, CBT. Free 15-minute consultation.`,
    keywords: [
      `${page.city} therapist`,
      `therapy ${page.city}`,
      "LMFT California",
      "virtual therapy",
      "telehealth therapy",
      "EMDR",
      "IFS",
      "CBT",
    ],
    path: `/${page.slug}`,
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
