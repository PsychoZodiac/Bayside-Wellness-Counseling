export const config = { runtime: "edge" };

const SITE_URL = "https://baysidewellnessandcounseling.com";
const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.jpg`;
const DEFAULT_TITLE = "Bayside Wellness & Counseling | Licensed Therapist Oakland, CA";
const DEFAULT_DESCRIPTION = "Compassionate, evidence-based virtual therapy for adults, teens, and families across California. EMDR, IFS, CBT, and more. Free 15-minute consultation.";

// Main pages
const MAIN_PAGES = {
  "/": {
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
  },
  "/about": {
    title: "About Marcus Ghiasi, LMFT | Licensed Therapist Oakland",
    description: "Marcus Ghiasi is a Licensed Marriage and Family Therapist specializing in EMDR, IFS, CBT, and psychodynamic therapy. Bay Area native offering virtual therapy across California.",
  },
  "/services": {
    title: "Therapy Services | EMDR, IFS, CBT, Teen & Men's Therapy Oakland",
    description: "Evidence-based therapy services including EMDR for trauma, IFS for parts work, CBT for anxiety and depression, teen therapy, and men's therapy. Virtual sessions across California.",
  },
  "/contact": {
    title: "Contact & Book Appointment | Bayside Wellness Oakland",
    description: "Schedule your free 15-minute consultation with Marcus Ghiasi, LMFT. Virtual therapy across California. Call 415-857-5799 or book online.",
  },
  "/faq": {
    title: "FAQ - Therapy Questions Answered | Bayside Wellness",
    description: "Common questions about therapy, insurance, session length, virtual therapy, and what to expect working with Marcus Ghiasi, LMFT.",
  },
  "/blog": {
    title: "Mental Health Blog | Bayside Wellness & Counseling",
    description: "Expert insights on mental health, therapy, trauma, relationships, and personal growth from Marcus Ghiasi, LMFT.",
  },
  "/crisis-resources": {
    title: "Crisis Resources & Mental Health Support | Bayside Wellness",
    description: "Immediate mental health crisis resources including 988 Suicide & Crisis Lifeline, emergency contacts, and support services. Help is available 24/7.",
  },
};

// Service pages
const SERVICE_PAGES = {
  "/services/emdr": {
    title: "EMDR Therapy Oakland | Trauma Treatment | Marcus Ghiasi, LMFT",
    description: "EMDR therapy for trauma, PTSD, anxiety, and distressing memories. Evidence-based trauma treatment with Marcus Ghiasi, LMFT.",
  },
  "/services/ifs": {
    title: "IFS Therapy Oakland | Internal Family Systems | Parts Work",
    description: "Internal Family Systems therapy helps you understand and heal different parts of yourself. Compassionate parts work with Marcus Ghiasi, LMFT.",
  },
  "/services/cbt": {
    title: "CBT Therapy Oakland | Cognitive Behavioral Therapy | LMFT",
    description: "Cognitive Behavioral Therapy for anxiety, depression, and stress. Learn practical skills to identify and shift thought patterns.",
  },
  "/services/psychodynamic": {
    title: "Psychodynamic Therapy Oakland | Insight-Oriented Therapy | LMFT",
    description: "Psychodynamic therapy explores how your past shapes your present. Deep, insight-oriented work addressing root causes.",
  },
  "/services/teen": {
    title: "Teen Therapy Oakland | High School & College Students | LMFT",
    description: "Teen therapy for high schoolers and college students dealing with anxiety, depression, identity, academic pressure, and social struggles.",
  },
  "/services/mens": {
    title: "Men's Therapy Oakland | Counseling for Men | Anger, Relationships",
    description: "Therapy for men addressing anger, emotional expression, relationship issues, and work stress. Direct, practical approach.",
  },
};

// SEO landing pages - city therapy pages
const CITY_PAGES = {
  "therapy-oakland": { title: "Therapist in Oakland, CA | LMFT | EMDR, CBT, IFS", description: "Licensed Oakland therapist (LMFT). Virtual EMDR, IFS, CBT, teen therapy. $240/45min. Free 15-minute consultation. Serving all East Bay.", city: "Oakland" },
  "therapy-san-francisco": { title: "Therapist in San Francisco, CA | LMFT | EMDR, CBT, IFS", description: "Licensed SF therapist (LMFT). Virtual EMDR, IFS, CBT, teen therapy. $240/45min. Free 15-minute consultation. Serving all San Francisco neighborhoods.", city: "San Francisco" },
  "therapy-berkeley": { title: "Therapist in Berkeley, CA | LMFT | UC Berkeley | Free Consultation", description: "Licensed Berkeley therapist (LMFT). Virtual therapy for UC Berkeley students and East Bay residents. EMDR, CBT, IFS. $240/45min.", city: "Berkeley" },
  "therapy-san-jose": { title: "Therapist in San Jose, CA | LMFT | Silicon Valley | Free Consultation", description: "Licensed San Jose therapist (LMFT). Virtual EMDR, CBT, teen therapy. $240/45min. Serving Silicon Valley.", city: "San Jose" },
  "therapy-palo-alto": { title: "Therapist in Palo Alto, CA | LMFT | Stanford | Free Consultation", description: "Licensed Palo Alto therapist (LMFT). Virtual therapy for Stanford students and professionals. $240/45min.", city: "Palo Alto" },
  "emdr-therapy-san-francisco": { title: "EMDR Therapist San Francisco | Trauma Therapy | LMFT", description: "Licensed EMDR therapist in San Francisco (LMFT). EMDR for trauma, PTSD, anxiety. $240/45min. Free consultation.", city: "San Francisco" },
  "emdr-therapy-oakland": { title: "EMDR Therapist Oakland | Trauma Therapy | LMFT | East Bay", description: "Licensed EMDR therapist in Oakland (LMFT). EMDR for trauma, PTSD, anxiety, and community violence. $240/45min.", city: "Oakland" },
  "emdr-therapy-berkeley": { title: "EMDR Therapist Berkeley | Trauma Therapy | LMFT | UC Berkeley", description: "Licensed EMDR therapist in Berkeley (LMFT). EMDR for trauma, PTSD, anxiety. $240/45min. Serving UC Berkeley.", city: "Berkeley" },
  "emdr-therapy-san-jose": { title: "EMDR Therapist San Jose | Trauma Therapy | LMFT | Silicon Valley", description: "Licensed EMDR therapist in San Jose (LMFT). EMDR for trauma, PTSD, performance anxiety. $240/45min.", city: "San Jose" },
  "emdr-therapy-palo-alto": { title: "EMDR Therapist Palo Alto | Trauma Therapy | LMFT | Stanford", description: "Licensed EMDR therapist in Palo Alto (LMFT). EMDR for trauma, PTSD, performance anxiety. $240/45min.", city: "Palo Alto" },
  "ifs-therapy-san-francisco": { title: "IFS Therapist San Francisco | Internal Family Systems | LMFT", description: "Licensed IFS therapist in San Francisco (LMFT). Internal Family Systems therapy for self-criticism, perfectionism, trauma. $240/45min.", city: "San Francisco" },
  "ifs-therapy-oakland": { title: "IFS Therapist Oakland | Internal Family Systems | LMFT", description: "Licensed IFS therapist in Oakland (LMFT). Internal Family Systems therapy for self-criticism, internal conflict. $240/45min.", city: "Oakland" },
  "ifs-therapy-berkeley": { title: "IFS Therapist Berkeley | Internal Family Systems | LMFT | UC Berkeley", description: "Licensed IFS therapist in Berkeley (LMFT). Internal Family Systems therapy for perfectionism, self-criticism. $240/45min.", city: "Berkeley" },
  "ifs-therapy-san-jose": { title: "IFS Therapist San Jose | Internal Family Systems | LMFT | Silicon Valley", description: "Licensed IFS therapist in San Jose (LMFT). Internal Family Systems therapy for perfectionism, internal conflict. $240/45min.", city: "San Jose" },
  "ifs-therapy-palo-alto": { title: "IFS Therapist Palo Alto | Internal Family Systems | LMFT | Stanford", description: "Licensed IFS therapist in Palo Alto (LMFT). Internal Family Systems therapy for perfectionism, self-criticism. $240/45min.", city: "Palo Alto" },
  "cbt-therapy-san-francisco": { title: "CBT Therapist San Francisco | Cognitive Behavioral Therapy | LMFT", description: "Licensed CBT therapist in San Francisco (LMFT). Cognitive behavioral therapy for anxiety, depression, OCD. $240/45min.", city: "San Francisco" },
  "cbt-therapy-oakland": { title: "CBT Therapist Oakland | Cognitive Behavioral Therapy | LMFT", description: "Licensed CBT therapist in Oakland (LMFT). Cognitive behavioral therapy for anxiety, depression, anger. $240/45min.", city: "Oakland" },
  "cbt-therapy-berkeley": { title: "CBT Therapist Berkeley | Cognitive Behavioral Therapy | LMFT | UC Berkeley", description: "Licensed CBT therapist in Berkeley (LMFT). Cognitive behavioral therapy for anxiety, depression, academic stress. $240/45min.", city: "Berkeley" },
  "cbt-therapy-san-jose": { title: "CBT Therapist San Jose | Cognitive Behavioral Therapy | LMFT | Silicon Valley", description: "Licensed CBT therapist in San Jose (LMFT). Cognitive behavioral therapy for work anxiety, depression, burnout. $240/45min.", city: "San Jose" },
  "cbt-therapy-palo-alto": { title: "CBT Therapist Palo Alto | Cognitive Behavioral Therapy | LMFT | Stanford", description: "Licensed CBT therapist in Palo Alto (LMFT). Cognitive behavioral therapy for anxiety, perfectionism, depression. $240/45min.", city: "Palo Alto" },
  "psychodynamic-therapy-san-francisco": { title: "Psychodynamic Therapist San Francisco | Depth Therapy | LMFT", description: "Licensed psychodynamic therapist in San Francisco (LMFT). Insight-oriented therapy for relationship patterns, chronic dissatisfaction. $240/45min.", city: "San Francisco" },
  "psychodynamic-therapy-oakland": { title: "Psychodynamic Therapist Oakland | Depth Therapy | LMFT | East Bay", description: "Licensed psychodynamic therapist in Oakland (LMFT). Insight-oriented therapy for relationship patterns, chronic stress. $240/45min.", city: "Oakland" },
  "psychodynamic-therapy-berkeley": { title: "Psychodynamic Therapist Berkeley | Depth Therapy | LMFT | UC Berkeley", description: "Licensed psychodynamic therapist in Berkeley (LMFT). Insight-oriented therapy for relationship patterns, identity questions. $240/45min.", city: "Berkeley" },
  "psychodynamic-therapy-san-jose": { title: "Psychodynamic Therapist San Jose | Depth Therapy | LMFT | Silicon Valley", description: "Licensed psychodynamic therapist in San Jose (LMFT). Insight-oriented therapy for relationship patterns, work dissatisfaction. $240/45min.", city: "San Jose" },
  "psychodynamic-therapy-palo-alto": { title: "Psychodynamic Therapist Palo Alto | Depth Therapy | LMFT | Stanford", description: "Licensed psychodynamic therapist in Palo Alto (LMFT). Insight-oriented therapy for achievement patterns, relationship issues. $240/45min.", city: "Palo Alto" },
  "teen-therapy-san-francisco": { title: "Teen Therapist San Francisco | High School & College Students | LMFT", description: "Licensed teen therapist in San Francisco (LMFT). Therapy for high schoolers and college students dealing with anxiety, depression, identity. $240/45min.", city: "San Francisco" },
  "teen-therapy-oakland": { title: "Teen Therapist Oakland | High School & College Students | LMFT", description: "Licensed teen therapist in Oakland (LMFT). Therapy for high schoolers and college students dealing with anxiety, depression, identity. $240/45min.", city: "Oakland" },
  "teen-therapy-berkeley": { title: "Teen Therapist Berkeley | High School & College Students | LMFT | UC Berkeley", description: "Licensed teen therapist in Berkeley (LMFT). Therapy for high schoolers and UC Berkeley students dealing with anxiety, depression. $240/45min.", city: "Berkeley" },
  "teen-therapy-san-jose": { title: "Teen Therapist San Jose | High School & College Students | LMFT | Silicon Valley", description: "Licensed teen therapist in San Jose (LMFT). Therapy for high schoolers and college students dealing with anxiety, academic pressure. $240/45min.", city: "San Jose" },
  "teen-therapy-palo-alto": { title: "Teen Therapist Palo Alto | High School & College Students | LMFT", description: "Licensed teen therapist in Palo Alto (LMFT). Therapy for high schoolers and college students dealing with anxiety, achievement pressure. $240/45min.", city: "Palo Alto" },
  "mens-therapy-san-francisco": { title: "Men's Therapist San Francisco | Therapy for Men | LMFT", description: "Licensed men's therapist in San Francisco (LMFT). Direct therapy for men dealing with anger, relationships, work stress. $240/45min.", city: "San Francisco" },
  "mens-therapy-oakland": { title: "Men's Therapist Oakland | Therapy for Men | LMFT | East Bay", description: "Licensed men's therapist in Oakland (LMFT). Direct therapy for men dealing with anger, relationships, work stress. $240/45min.", city: "Oakland" },
  "mens-therapy-berkeley": { title: "Men's Therapist Berkeley | Therapy for Men | LMFT", description: "Licensed men's therapist in Berkeley (LMFT). Direct therapy for men dealing with anger, relationships, identity. $240/45min.", city: "Berkeley" },
  "mens-therapy-san-jose": { title: "Men's Therapist San Jose | Therapy for Men | LMFT | Silicon Valley", description: "Licensed men's therapist in San Jose (LMFT). Direct therapy for men dealing with anger, work stress, relationships. $240/45min.", city: "San Jose" },
  "mens-therapy-palo-alto": { title: "Men's Therapist Palo Alto | Therapy for Men | LMFT | Stanford", description: "Licensed men's therapist in Palo Alto (LMFT). Direct therapy for men dealing with work pressure, relationships, anger. $240/45min.", city: "Palo Alto" },
  "anxiety-therapy-san-francisco": { title: "Anxiety Therapist San Francisco | CBT & EMDR | LMFT", description: "Licensed anxiety therapist in San Francisco (LMFT). CBT and EMDR for generalized anxiety, social anxiety, panic. $240/45min.", city: "San Francisco" },
  "anxiety-therapy-oakland": { title: "Anxiety Therapist Oakland | CBT & EMDR | LMFT | East Bay", description: "Licensed anxiety therapist in Oakland (LMFT). CBT and EMDR for anxiety, panic, and chronic stress. $240/45min.", city: "Oakland" },
  "anxiety-therapy-berkeley": { title: "Anxiety Therapist Berkeley | CBT & EMDR | LMFT | UC Berkeley", description: "Licensed anxiety therapist in Berkeley (LMFT). CBT and EMDR for anxiety, panic, and social anxiety. $240/45min.", city: "Berkeley" },
  "anxiety-therapy-san-jose": { title: "Anxiety Therapist San Jose | CBT & EMDR | LMFT | Silicon Valley", description: "Licensed anxiety therapist in San Jose (LMFT). CBT and EMDR for work anxiety, panic, and social anxiety. $240/45min.", city: "San Jose" },
  "anxiety-therapy-palo-alto": { title: "Anxiety Therapist Palo Alto | CBT & EMDR | LMFT | Stanford", description: "Licensed anxiety therapist in Palo Alto (LMFT). CBT and EMDR for performance anxiety, achievement anxiety. $240/45min.", city: "Palo Alto" },
  "depression-therapy-san-francisco": { title: "Depression Therapist San Francisco | CBT & EMDR | LMFT", description: "Licensed depression therapist in San Francisco (LMFT). CBT and EMDR for depression, low mood, high-functioning depression. $240/45min.", city: "San Francisco" },
  "depression-therapy-oakland": { title: "Depression Therapist Oakland | CBT & EMDR | LMFT | East Bay", description: "Licensed depression therapist in Oakland (LMFT). CBT and EMDR for depression, chronic low mood, burnout. $240/45min.", city: "Oakland" },
  "depression-therapy-berkeley": { title: "Depression Therapist Berkeley | CBT & EMDR | LMFT | UC Berkeley", description: "Licensed depression therapist in Berkeley (LMFT). CBT and EMDR for depression, chronic low mood, existential emptiness. $240/45min.", city: "Berkeley" },
  "depression-therapy-san-jose": { title: "Depression Therapist San Jose | CBT & EMDR | LMFT | Silicon Valley", description: "Licensed depression therapist in San Jose (LMFT). CBT and EMDR for depression, high-functioning depression, work-related low mood. $240/45min.", city: "San Jose" },
  "depression-therapy-palo-alto": { title: "Depression Therapist Palo Alto | CBT & EMDR | LMFT | Stanford", description: "Licensed depression therapist in Palo Alto (LMFT). CBT and EMDR for depression, achievement-related low mood. $240/45min.", city: "Palo Alto" },
  "trauma-therapy-san-francisco": { title: "Trauma Therapist San Francisco | EMDR & Trauma-Informed | LMFT", description: "Licensed trauma therapist in San Francisco (LMFT). EMDR and trauma-informed therapy for PTSD, complex trauma. $240/45min.", city: "San Francisco" },
  "trauma-therapy-oakland": { title: "Trauma Therapist Oakland | EMDR & Trauma-Informed | LMFT | East Bay", description: "Licensed trauma therapist in Oakland (LMFT). EMDR and trauma-informed therapy for PTSD, community trauma. $240/45min.", city: "Oakland" },
  "trauma-therapy-berkeley": { title: "Trauma Therapist Berkeley | EMDR & Trauma-Informed | LMFT | UC Berkeley", description: "Licensed trauma therapist in Berkeley (LMFT). EMDR and trauma-informed therapy for PTSD, complex trauma. $240/45min.", city: "Berkeley" },
  "trauma-therapy-san-jose": { title: "Trauma Therapist San Jose | EMDR & Trauma-Informed | LMFT | Silicon Valley", description: "Licensed trauma therapist in San Jose (LMFT). EMDR and trauma-informed therapy for PTSD, work trauma, immigration stress. $240/45min.", city: "San Jose" },
  "trauma-therapy-palo-alto": { title: "Trauma Therapist Palo Alto | EMDR & Trauma-Informed | LMFT | Stanford", description: "Licensed trauma therapist in Palo Alto (LMFT). EMDR and trauma-informed therapy for PTSD, achievement trauma. $240/45min.", city: "Palo Alto" },
  "anger-therapy-san-francisco": { title: "Anger Management Therapist San Francisco | LMFT | Men's Therapy", description: "Licensed anger management therapist in San Francisco (LMFT). Direct therapy for anger, explosive reactions, resentment. $240/45min.", city: "San Francisco" },
  "anger-therapy-oakland": { title: "Anger Management Therapist Oakland | LMFT | Men's Therapy | East Bay", description: "Licensed anger management therapist in Oakland (LMFT). Direct therapy for anger, explosive reactions, resentment. $240/45min.", city: "Oakland" },
  "anger-therapy-berkeley": { title: "Anger Management Therapist Berkeley | LMFT | Men's Therapy", description: "Licensed anger management therapist in Berkeley (LMFT). Direct therapy for anger, reactive patterns, resentment. $240/45min.", city: "Berkeley" },
  "anger-therapy-san-jose": { title: "Anger Management Therapist San Jose | LMFT | Silicon Valley", description: "Licensed anger management therapist in San Jose (LMFT). Direct therapy for anger, work stress, relationship conflict. $240/45min.", city: "San Jose" },
  "anger-therapy-palo-alto": { title: "Anger Management Therapist Palo Alto | LMFT | Stanford", description: "Licensed anger management therapist in Palo Alto (LMFT). Direct therapy for anger, achievement stress, relationship conflict. $240/45min.", city: "Palo Alto" },
  "college-student-therapy-san-francisco": { title: "College Student Therapist San Francisco | LMFT | SFSU & USF", description: "Licensed therapist for college students in San Francisco (LMFT). Therapy for anxiety, depression, identity, and transitions. $240/45min.", city: "San Francisco" },
  "college-student-therapy-oakland": { title: "College Student Therapist Oakland | LMFT | Laney & Merritt", description: "Licensed therapist for college students in Oakland (LMFT). Therapy for anxiety, depression, transitions, and identity. $240/45min.", city: "Oakland" },
  "college-student-therapy-berkeley": { title: "College Student Therapist Berkeley | LMFT | UC Berkeley", description: "Licensed therapist for college students in Berkeley (LMFT). Therapy for UC Berkeley students dealing with anxiety, depression, perfectionism. $240/45min.", city: "Berkeley" },
  "college-student-therapy-san-jose": { title: "College Student Therapist San Jose | LMFT | SJSU | Silicon Valley", description: "Licensed therapist for college students in San Jose (LMFT). Therapy for SJSU students dealing with anxiety, academic pressure. $240/45min.", city: "San Jose" },
  "college-student-therapy-palo-alto": { title: "College Student Therapist Palo Alto | LMFT | Stanford Students", description: "Licensed therapist for college students in Palo Alto (LMFT). Therapy for Stanford students dealing with anxiety, perfectionism. $240/45min.", city: "Palo Alto" },
  "lgbtq-therapy-san-francisco": { title: "LGBTQ+ Affirming Therapist San Francisco | LMFT | Castro & Mission", description: "LGBTQ+ affirming therapist in San Francisco (LMFT). Therapy for identity, relationships, family dynamics, and transitions. $240/45min.", city: "San Francisco" },
  "lgbtq-therapy-oakland": { title: "LGBTQ+ Affirming Therapist Oakland | LMFT | East Bay | BIPOC Affirming", description: "LGBTQ+ affirming therapist in Oakland (LMFT). Therapy for identity, relationships, family dynamics. BIPOC affirming. $240/45min.", city: "Oakland" },
  "lgbtq-therapy-berkeley": { title: "LGBTQ+ Affirming Therapist Berkeley | LMFT | UC Berkeley", description: "LGBTQ+ affirming therapist in Berkeley (LMFT). Therapy for UC Berkeley students and East Bay residents dealing with identity. $240/45min.", city: "Berkeley" },
  "lgbtq-therapy-san-jose": { title: "LGBTQ+ Affirming Therapist San Jose | LMFT | Silicon Valley | BIPOC Affirming", description: "LGBTQ+ affirming therapist in San Jose (LMFT). Therapy for identity, relationships, family dynamics. BIPOC affirming. $240/45min.", city: "San Jose" },
  "lgbtq-therapy-palo-alto": { title: "LGBTQ+ Affirming Therapist Palo Alto | LMFT | Stanford", description: "LGBTQ+ affirming therapist in Palo Alto (LMFT). Therapy for Stanford students and Peninsula residents dealing with identity. $240/45min.", city: "Palo Alto" },
  "relationship-therapy-san-francisco": { title: "Relationship Therapist San Francisco | Individual Therapy | LMFT", description: "Individual relationship therapy in San Francisco (LMFT). Work on relationship patterns, communication, and attachment. $240/45min.", city: "San Francisco" },
  "relationship-therapy-oakland": { title: "Relationship Therapist Oakland | Individual Therapy | LMFT | East Bay", description: "Individual relationship therapy in Oakland (LMFT). Work on relationship patterns, communication, and attachment. $240/45min.", city: "Oakland" },
  "relationship-therapy-berkeley": { title: "Relationship Therapist Berkeley | Individual Therapy | LMFT | UC Berkeley", description: "Individual relationship therapy in Berkeley (LMFT). Work on relationship patterns, attachment, and communication. $240/45min.", city: "Berkeley" },
  "relationship-therapy-san-jose": { title: "Relationship Therapist San Jose | Individual Therapy | LMFT | Silicon Valley", description: "Individual relationship therapy in San Jose (LMFT). Work on relationship patterns, communication, and attachment. $240/45min.", city: "San Jose" },
  "relationship-therapy-palo-alto": { title: "Relationship Therapist Palo Alto | Individual Therapy | LMFT | Stanford", description: "Individual relationship therapy in Palo Alto (LMFT). Work on relationship patterns, attachment, and communication. $240/45min.", city: "Palo Alto" },
  "online-therapy-san-francisco": { title: "Online Therapist San Francisco | LMFT | EMDR, CBT, IFS", description: "Licensed online therapist in San Francisco (LMFT). Virtual EMDR, CBT, IFS, and trauma therapy. $240/45min. No commute.", city: "San Francisco" },
  "online-therapy-oakland": { title: "Online Therapist Oakland | LMFT | EMDR, CBT, IFS | East Bay", description: "Licensed online therapist in Oakland (LMFT). Virtual EMDR, CBT, IFS, and trauma therapy. $240/45min.", city: "Oakland" },
  "online-therapy-berkeley": { title: "Online Therapist Berkeley | LMFT | UC Berkeley | EMDR, CBT, IFS", description: "Licensed online therapist in Berkeley (LMFT). Virtual EMDR, CBT, IFS therapy for UC Berkeley students and East Bay residents. $240/45min.", city: "Berkeley" },
  "online-therapy-san-jose": { title: "Online Therapist San Jose | LMFT | Silicon Valley | EMDR, CBT, IFS", description: "Licensed online therapist in San Jose (LMFT). Virtual therapy for Silicon Valley professionals. EMDR, CBT, IFS. $240/45min.", city: "San Jose" },
  "online-therapy-palo-alto": { title: "Online Therapist Palo Alto | LMFT | Stanford | Peninsula | EMDR, CBT", description: "Licensed online therapist in Palo Alto (LMFT). Virtual therapy for Stanford students and Peninsula professionals. $240/45min.", city: "Palo Alto" },
  "online-therapy-fremont": { title: "Online Therapist Fremont | LMFT | South Bay | EMDR, CBT", description: "Licensed online therapist in Fremont (LMFT). Virtual EMDR, CBT, IFS therapy for South Bay residents. $240/45min.", city: "Fremont" },
  "online-therapy-hayward": { title: "Online Therapist Hayward | LMFT | East Bay | EMDR, CBT", description: "Licensed online therapist in Hayward (LMFT). Virtual EMDR, CBT, trauma therapy for East Bay residents. $240/45min.", city: "Hayward" },
  "online-therapy-walnut-creek": { title: "Online Therapist Walnut Creek | LMFT | Contra Costa | EMDR, CBT", description: "Licensed online therapist in Walnut Creek (LMFT). Virtual EMDR, CBT, IFS therapy for Contra Costa County residents. $240/45min.", city: "Walnut Creek" },
  "online-therapy-san-mateo": { title: "Online Therapist San Mateo | LMFT | Peninsula | EMDR, CBT", description: "Licensed online therapist in San Mateo (LMFT). Virtual EMDR, CBT, IFS therapy for Peninsula residents. $240/45min.", city: "San Mateo" },
  "online-therapy-redwood-city": { title: "Online Therapist Redwood City | LMFT | Peninsula | EMDR, CBT", description: "Licensed online therapist in Redwood City (LMFT). Virtual EMDR, CBT, IFS therapy for Peninsula families and professionals. $240/45min.", city: "Redwood City" },
  "online-therapy-mountain-view": { title: "Online Therapist Mountain View | LMFT | Silicon Valley | EMDR, CBT", description: "Licensed online therapist in Mountain View (LMFT). Virtual therapy for tech professionals. EMDR, CBT, IFS. $240/45min.", city: "Mountain View" },
  "online-therapy-sunnyvale": { title: "Online Therapist Sunnyvale | LMFT | Silicon Valley | EMDR, CBT", description: "Licensed online therapist in Sunnyvale (LMFT). Virtual therapy for Silicon Valley residents. EMDR, CBT, IFS. $240/45min.", city: "Sunnyvale" },
  "online-therapy-daly-city": { title: "Online Therapist Daly City | LMFT | Peninsula | EMDR, CBT | Culturally Responsive", description: "Licensed online therapist in Daly City (LMFT). Virtual therapy for diverse communities. EMDR, CBT, IFS. $240/45min.", city: "Daly City" },
  "online-therapy-alameda": { title: "Online Therapist Alameda | LMFT | East Bay | EMDR, CBT", description: "Licensed online therapist in Alameda (LMFT). Virtual EMDR, CBT, IFS therapy for island residents. $240/45min. No bridge traffic.", city: "Alameda" },
  "online-therapy-san-rafael": { title: "Online Therapist San Rafael | LMFT | Marin County | EMDR, CBT", description: "Licensed online therapist in San Rafael (LMFT). Virtual EMDR, CBT, IFS therapy for Marin County residents. $240/45min.", city: "San Rafael" },
};

const BLOG_POSTS = {
  "signs-you-need-therapy": {
    title: "Signs You Need Therapy (That You're Probably Explaining Away)",
    image: `${SITE_URL}/signs-therapy.jpeg`,
    description: "Most people who need therapy already know it. The knowledge arrives quietly, in the margins of ordinary days. And then the explaining begins.",
  },
  "understanding-depression": {
    title: "What Depression Actually Does to a Life",
    image: `${SITE_URL}/understanding-depression.jpeg`,
    description: "Depression is not sadness. This distinction matters more than most clinical descriptions acknowledge — especially for the people who most need to recognize it in themselves.",
  },
  "mens-mental-health": {
    title: "Men and Mental Health: What Actually Gets in the Way",
    image: `${SITE_URL}/mens-mental-health.jpeg`,
    description: "The conversation about men and mental health has gotten louder. It has not moved the needle as much as it should. The barriers are real and worth understanding honestly.",
  },
  "attachment-styles-in-relationships": {
    title: "Your Attachment Style Is Running Your Relationships",
    image: `${SITE_URL}/attachment-styles.jpeg`,
    description: "There is a version of you that shows up in intimate relationships. It has patterns, sensitivities, and ways of protecting itself. It was built long before you had any say in it.",
  },
  "setting-boundaries-in-relationships": {
    title: "Why Your Boundaries Keep Failing",
    image: `${SITE_URL}/boundaries.jpeg`,
    description: "Everyone understands that boundaries are important. Most people who understand them conceptually still struggle to maintain them. The problem isn't information. It's something deeper.",
  },
  "mindfulness-for-anxiety": {
    title: "What Mindfulness Can and Cannot Do for Anxiety",
    image: `${SITE_URL}/mindfulness-anxiety.jpeg`,
    description: "Mindfulness has become the default recommendation for anxiety. There is genuine research behind it. There are also real limits that rarely get discussed honestly.",
  },
  "managing-holiday-stress": {
    title: "The Holiday Relationship Trap: Why Family Visits Are So Hard",
    image: `${SITE_URL}/holiday-family.jpeg`,
    description: "You walk into your parents' house and within twenty minutes you are sixteen again. This is not regression. It is neurology.",
  },
  "family-therapy-benefits": {
    title: "How Individual Therapy Changes Your Family",
    image: `${SITE_URL}/family-therapy.jpeg`,
    description: "The most durable changes in family dynamics frequently come from individual work done by one person. Not because the other family members don't matter, but because that's where the leverage is.",
  },
  "emdr-trauma-therapy-guide": {
    title: "What a Full Course of EMDR Actually Looks Like",
    image: `${SITE_URL}/emdr-guide.jpeg`,
    description: "Most introductions to EMDR focus on what it is. This one focuses on what it is like — what actually happens across weeks and months of treatment, phase by phase.",
  },
  "burnout-is-not-a-scheduling-problem": {
    title: "Burnout Isn't a Scheduling Problem",
    image: `${SITE_URL}/burnout.jpg`,
    description: "You cleared your calendar. You took the vacation. Monday still arrived like a debt collector. This is what burnout actually looks like.",
  },
  "why-anxiety-gets-worse-at-night": {
    title: "Why Your Anxiety Gets Louder at Night",
    image: `${SITE_URL}/anxiety-at-night.jpg`,
    description: "The day ends. The distractions stop. And suddenly the thing you have been outrunning for sixteen hours is sitting on the edge of your bed, waiting.",
  },
  "how-to-find-a-therapist-who-fits": {
    title: "How to Find a Therapist Who Actually Fits",
    image: `${SITE_URL}/find-a-therapist.jpg`,
    description: "Most people searching for a therapist are not looking for a directory. They are looking for permission to trust their instincts.",
  },
  "what-your-anger-is-actually-telling-you": {
    title: "What Your Anger Is Actually Trying to Tell You",
    image: `${SITE_URL}/anger-relationships.jpg`,
    description: "Most people who struggle with anger are not struggling with too much emotion. They are struggling with too little access to the emotions underneath it.",
  },
  "cost-of-constant-exposure-desensitization": {
    title: "The Cost of Constant Exposure: Understanding Desensitization",
    image: `${SITE_URL}/desensitization-blog.jpg`,
    description: "What happens when we become desensitized to the constant stream of distressing content in our lives.",
  },
  "master-trauma-or-die-trying": {
    title: "Master Trauma, or Die Trying",
    image: `${SITE_URL}/master-trauma.jpeg`,
    description: "A direct look at what it actually takes to work through trauma rather than around it.",
  },
  "the-5-lies-suicide-tells-us": {
    title: "The 5 Lies of Suicide",
    image: `${SITE_URL}/5-lies-suicide.jpeg`,
    description: "Suicide distorts thinking in predictable ways. Understanding those distortions can save lives.",
  },
  "ai-and-therapy": {
    title: "AI vs Therapist!",
    image: `${SITE_URL}/ai-therapy.jpeg`,
    description: "What artificial intelligence can and cannot do in the therapeutic space.",
  },
  "rupture-and-repair": {
    title: "Rupture and Repair: How Relationships Actually Heal",
    image: `${SITE_URL}/rupture-repair.jpeg`,
    description: "How relationships break and heal — and why repair is more important than avoiding conflict.",
  },
  "valentines-day-and-men": {
    title: "Valentine's Day and the Emotional Expectations Men Carry",
    image: `${SITE_URL}/valentines-men.jpeg`,
    description: "What Valentine's Day reveals about how men relate to love, vulnerability, and connection.",
  },
  "rethinking-therapy-2026": {
    title: "Rethinking Therapy and Mental Health in 2026",
    image: `${SITE_URL}/rethinking-therapy.jpeg`,
    description: "How therapy is evolving and what that means for people seeking help today.",
  },
  "beginning-again": {
    title: "Beginning Again in Your Own Time",
    image: `${SITE_URL}/beginning-again.jpeg`,
    description: "On starting over — what it requires and what it makes possible.",
  },
  "low-mood-depression": {
    title: "Low Mood vs Depression",
    image: `${SITE_URL}/low-mood-depression.jpeg`,
    description: "Understanding the difference between feeling down and clinical depression.",
  },
  "dream-bigger-2026": {
    title: "Dreaming Big in 2026",
    image: `${SITE_URL}/dreaming-bigger.jpeg`,
    description: "Why setting meaningful intentions matters more than resolutions.",
  },
  "starting-new-year-with-intention": {
    title: "Beginning Again: Stepping Into a New Year With Intention",
    image: `${SITE_URL}/new-years-intentions.jpeg`,
    description: "How to approach a new year with clarity and purpose rather than pressure.",
  },
  "beginners-guide-to-ifs": {
    title: "A Beginner's Guide to IFS and Understanding Your Inner World",
    image: `${SITE_URL}/beginners-ifs.jpeg`,
    description: "Internal Family Systems therapy explained simply and honestly.",
  },
  "beginners-guide-to-emdr": {
    title: "A Beginner's Guide to EMDR: What It Is and How It Helps",
    image: `${SITE_URL}/beginners-emdr.jpeg`,
    description: "What EMDR is, how it works, and whether it might be right for you.",
  },
  "holiday-stress-loneliness": {
    title: "When the Holidays Don't Feel the Way They Are Supposed To",
    image: `${SITE_URL}/holiday-stress.jpeg`,
    description: "Why the holidays are hard for so many people and what actually helps.",
  },
};

export default async function handler(req) {
  const url = new URL(req.url);
  const pathname = url.searchParams.get("path") || "/";
  const cleanPath = pathname.replace(/^\/+/, "").replace(/\/+$/, "");

  let title = DEFAULT_TITLE;
  let description = DEFAULT_DESCRIPTION;
  let ogImage = DEFAULT_OG_IMAGE;
  let canonicalUrl = `${SITE_URL}${pathname}`;

  // 1. Check main pages
  if (MAIN_PAGES[pathname]) {
    title = MAIN_PAGES[pathname].title;
    description = MAIN_PAGES[pathname].description;
  }
  // 2. Check service pages
  else if (SERVICE_PAGES[pathname]) {
    title = SERVICE_PAGES[pathname].title;
    description = SERVICE_PAGES[pathname].description;
  }
  // 3. Check blog posts
  else if (pathname.startsWith("/blog/")) {
    const slug = pathname.replace("/blog/", "").replace(/\/$/, "");
    const post = BLOG_POSTS[slug];
    if (post) {
      title = `${post.title} | Bayside Wellness & Counseling`;
      description = post.description;
      ogImage = post.image;
    }
  }
  // 4. Check SEO landing pages
  else if (CITY_PAGES[cleanPath]) {
    const page = CITY_PAGES[cleanPath];
    title = `${page.title} | Bayside Wellness & Counseling`;
    description = page.description;
  }
  // 5. Fallback: generate from slug pattern
  else if (cleanPath) {
    const parts = cleanPath.split("-");
    const cityGuess = parts[parts.length - 1];
    title = `Therapy in ${cityGuess.charAt(0).toUpperCase() + cityGuess.slice(1)}, CA | Bayside Wellness & Counseling`;
    description = `Licensed therapist serving ${cityGuess} and the greater Bay Area. Virtual EMDR, CBT, IFS therapy. $240/45min. Free 15-minute consultation.`;
  }

  const html = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${escapeHtml(title)}</title>
    <meta name="description" content="${escapeHtml(description)}" />
    <link rel="canonical" href="${escapeHtml(canonicalUrl)}" />
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="Bayside Wellness &amp; Counseling" />
    <meta property="og:url" content="${escapeHtml(canonicalUrl)}" />
    <meta property="og:title" content="${escapeHtml(title)}" />
    <meta property="og:description" content="${escapeHtml(description)}" />
    <meta property="og:image" content="${escapeHtml(ogImage)}" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${escapeHtml(title)}" />
    <meta name="twitter:description" content="${escapeHtml(description)}" />
    <meta name="twitter:image" content="${escapeHtml(ogImage)}" />
    <meta name="robots" content="index, follow" />
    <meta name="author" content="Marcus Ghiasi, LMFT" />
    <meta name="geo.region" content="US-CA" />
    <meta name="geo.placename" content="Oakland" />
    <link rel="icon" type="image/png" href="/favicon.png" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=DM+Sans:wght@300;400;500;600&display=swap" rel="stylesheet" />
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-J6FXEZVPHX"></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-J6FXEZVPHX');
    </script>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>`;

  return new Response(html, {
    status: 200,
    headers: {
      "content-type": "text/html; charset=utf-8",
      "cache-control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}
