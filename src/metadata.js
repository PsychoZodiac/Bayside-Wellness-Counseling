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
    keywords: ["Marcus Ghiasi", "LMFT Oakland", "licensed therapist", "marriage family therapist", "Bay Area therapist", "Persian American therap
