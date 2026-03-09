// Comprehensive SEO Metadata Configuration
// For all 165+ pages of Bayside Wellness & Counseling

const baseUrl = "https://baysidewellnessandcounseling.com";
const defaultImage = `${baseUrl}/og-image.jpg`; // You can add a social share image later

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
    path: "/#/about",
  }),
  
  contact: generateMetadata({
    title: "Contact & Book Appointment | Bayside Wellness Oakland",
    description: "Schedule your free 15-minute consultation with Marcus Ghiasi, LMFT. Virtual therapy across California. Call 415-857-5799 or book online.",
    keywords: ["book therapy appointment", "schedule consultation", "Oakland therapy contact", "virtual therapy booking"],
    path: "/#/contact",
  }),
  
  faq: generateMetadata({
    title: "FAQ - Therapy Questions Answered | Bayside Wellness",
    description: "Common questions about therapy, insurance, session length, virtual therapy, and what to expect. Get answers about working with Marcus Ghiasi, LMFT.",
    keywords: ["therapy FAQ", "therapy questions", "how therapy works", "therapy cost", "virtual therapy questions"],
    path: "/#/faq",
  }),
  
  blog: generateMetadata({
    title: "Mental Health Blog | Bayside Wellness & Counseling",
    description: "Expert insights on mental health, therapy, trauma, relationships, and personal growth from Marcus Ghiasi, LMFT. Evidence-based perspectives and practical guidance.",
    keywords: ["mental health blog", "therapy blog", "trauma recovery", "relationship advice", "therapist insights"],
    path: "/#/blog",
  }),
  
  services: generateMetadata({
    title: "Therapy Services | EMDR, IFS, CBT, Family Therapy Oakland",
    description: "Evidence-based therapy services including EMDR for trauma, IFS for parts work, CBT for anxiety/depression, men's therapy, and family therapy. Virtual sessions across California.",
    keywords: ["therapy services Oakland", "EMDR therapy", "IFS therapy", "CBT therapy", "family therapy", "men's therapy"],
    path: "/#/services",
  }),
  
  crisisResources: generateMetadata({
    title: "Crisis Resources & Mental Health Support | Bayside Wellness",
    description: "Immediate mental health crisis resources including 988 Suicide & Crisis Lifeline, emergency contacts, and support services. Help is available 24/7.",
    keywords: ["crisis resources", "suicide prevention", "988 hotline", "mental health emergency", "crisis support"],
    path: "/#/crisis-resources",
  }),
};

// SERVICE PAGES METADATA
export const servicePages = {
  emdr: generateMetadata({
    title: "EMDR Therapy Oakland | Trauma Treatment | Marcus Ghiasi, LMFT",
    description: "EMDR (Eye Movement Desensitization and Reprocessing) therapy for trauma, PTSD, anxiety, and distressing memories. Evidence-based trauma treatment in Oakland, CA.",
    keywords: ["EMDR therapy Oakland", "trauma therapy", "PTSD treatment", "EMDR therapist", "trauma processing", "eye movement therapy"],
    path: "/#/service-emdr",
  }),
  
  ifs: generateMetadata({
    title: "IFS Therapy Oakland | Internal Family Systems | Parts Work",
    description: "Internal Family Systems (IFS) therapy helps you understand and heal different parts of yourself. Compassionate parts work with Marcus Ghiasi, LMFT in Oakland.",
    keywords: ["IFS therapy Oakland", "Internal Family Systems", "parts work therapy", "IFS therapist", "self-compassion therapy"],
    path: "/#/service-ifs",
  }),
  
  mensTherapy: generateMetadata({
    title: "Men's Therapy Oakland | Counseling for Men | Anger, Relationships",
    description: "Therapy for men addressing anger, emotional expression, relationship issues, and masculinity. Safe space to process feelings with Marcus Ghiasi, LMFT.",
    keywords: ["men's therapy Oakland", "therapy for men", "anger management", "men's mental health", "masculinity counseling"],
    path: "/#/service-mens-therapy",
  }),
  
  familyTherapy: generateMetadata({
    title: "Family Therapy Oakland | Parent-Teen Counseling | LMFT",
    description: "Family therapy focused on parent-teen relationships, communication, and conflict resolution. Strengthen family dynamics with evidence-based approaches.",
    keywords: ["family therapy Oakland", "parent teen therapy", "family counseling", "teen therapy", "family communication"],
    path: "/#/service-family-therapy",
  }),
  
  anxietyDepression: generateMetadata({
    title: "Anxiety & Depression Therapy Oakland | CBT Treatment | LMFT",
    description: "CBT and evidence-based therapy for anxiety, depression, panic, and mood disorders. Learn coping skills and address root causes with compassionate support.",
    keywords: ["anxiety therapy Oakland", "depression counseling", "CBT therapy", "panic disorder treatment", "anxiety counselor"],
    path: "/#/service-anxiety-depression",
  }),
  
  trauma: generateMetadata({
    title: "Trauma Therapy Oakland | PTSD Treatment | EMDR & IFS",
    description: "Specialized trauma therapy using EMDR, IFS, and psychodynamic approaches. Heal from childhood trauma, PTSD, complex trauma, and adverse experiences.",
    keywords: ["trauma therapy Oakland", "PTSD treatment", "childhood trauma", "complex trauma therapy", "trauma recovery"],
    path: "/#/service-trauma",
  }),
};

// Helper function to generate blog post metadata
export const generateBlogMeta = (post) => {
  return generateMetadata({
    title: post.title,
    description: post.excerpt,
    keywords: [post.category, "mental health", "therapy", "counseling", "Oakland therapist"],
    path: `/#/blog/${post.slug}`,
    type: "article",
  });
};

// Helper function to generate SEO page metadata
export const generateSEOPageMeta = (page) => {
  // Create description from title
  const description = `Professional ${page.title.toLowerCase()} with Marcus Ghiasi, LMFT in Oakland, CA. Evidence-based therapy using EMDR, IFS, and CBT. Virtual sessions across California. Call 415-857-5799.`;
  
  // Extract keywords from title
  const titleWords = page.title.toLowerCase().split(' ');
  const baseKeywords = ["Oakland", "California", "therapy", "counseling", "LMFT"];
  const keywords = [...titleWords, ...baseKeywords, "virtual therapy", "telehealth"];
  
  return generateMetadata({
    title: `${page.title} | Bayside Wellness Oakland`,
    description: description,
    keywords: keywords,
    path: `/#/${page.slug}`,
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
