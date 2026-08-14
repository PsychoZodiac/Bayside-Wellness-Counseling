export const config = { runtime: "edge" };

const SITE_URL = "https://baysidewellnessandcounseling.com";
const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.jpg`;
const DEFAULT_TITLE = "Bayside Wellness & Counseling | Licensed Therapist Oakland, CA";
const DEFAULT_DESCRIPTION = "Compassionate, evidence-based virtual therapy for adults and young adults across California. EMDR, IFS, CBT, and more. Free 15-minute consultation.";

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
    title: "Therapy Services | EMDR, IFS, CBT, Young Adults & Men's Therapy Oakland",
    description: "Evidence-based therapy services including EMDR for trauma, IFS for parts work, CBT for anxiety and depression, young adults therapy, and men's therapy. Virtual sessions across California.",
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
    description: "EMDR (Eye Movement Desensitization and Reprocessing) therapy for trauma, PTSD, anxiety, and distressing memories. Evidence-based trauma treatment in Oakland, CA.",
  },
  "/services/ifs": {
    title: "IFS Therapy Oakland | Internal Family Systems | Parts Work",
    description: "Internal Family Systems (IFS) therapy helps you understand and heal different parts of yourself. Compassionate parts work with Marcus Ghiasi, LMFT in Oakland.",
  },
  "/services/cbt": {
    title: "CBT Therapy Oakland | Cognitive Behavioral Therapy | LMFT",
    description: "Cognitive Behavioral Therapy (CBT) for anxiety, depression, and stress. Learn practical skills to identify and shift thought patterns with Marcus Ghiasi, LMFT.",
  },
  "/services/psychodynamic": {
    title: "Psychodynamic Therapy Oakland | Insight-Oriented Therapy | LMFT",
    description: "Psychodynamic therapy explores how your past shapes your present. Deep, insight-oriented work addressing root causes with Marcus Ghiasi, LMFT in Oakland.",
  },
  "/services/young-adults": {
    title: "Young Adults Therapy Oakland | Ages 18-30 | LMFT",
    description: "Individual therapy for young adults ages 18 to 30 navigating anxiety, identity, career transitions, and the disorientation of early adulthood. Virtual therapy across California with Marcus Ghiasi, LMFT.",
  },
  "/services/mens": {
    title: "Men's Therapy Oakland | Counseling for Men | Anger, Relationships",
    description: "Therapy for men addressing anger, emotional expression, relationship issues, and work stress. Direct, practical approach with Marcus Ghiasi, LMFT.",
  },
};

// SEO landing pages - sourced directly from the same seoPages data used by
// the live app's SEO component, so this file cannot drift out of sync with
// what the SPA itself actually shows. If you add or edit a page in
// src/App.jsx's seoPages object, re-sync this block to match.
const CITY_PAGES = {
  "anger-therapy-berkeley": { title: "Anger Therapy Berkeley | IFS & EMDR for Anger | Marcus Ghiasi, LMFT", description: "Find lasting relief from anger, emotional reactivity, and rage with IFS parts work and EMDR in Berkeley. Licensed LMFT, telehealth across California. Start with a free 15-minute consultation today." },
  "anger-therapy-oakland": { title: "Anger Therapy Oakland | IFS & EMDR for Anger | Marcus Ghiasi, LMFT", description: "Find lasting relief from anger, emotional reactivity, and rage with IFS parts work and EMDR in Oakland. Oakland-based LMFT, telehealth across California. Start with a free 15-minute consultation today." },
  "anger-therapy-palo-alto": { title: "Anger Therapy Palo Alto | IFS & EMDR for Anger | Marcus Ghiasi, LMFT", description: "Find lasting relief from anger, emotional reactivity, and rage with IFS parts work and EMDR in Palo Alto. Licensed LMFT, telehealth across California. Start with a free 15-minute consultation today." },
  "anger-therapy-san-francisco": { title: "Anger Therapy San Francisco | IFS & EMDR for Anger | Marcus Ghiasi, LMFT", description: "Find lasting relief from anger, rage, and emotional reactivity with IFS parts work and EMDR in San Francisco. Licensed LMFT, telehealth across California. Start with a free 15-minute consultation today." },
  "anger-therapy-san-jose": { title: "Anger Therapy San Jose | IFS & EMDR for Anger | Marcus Ghiasi, LMFT", description: "Find lasting relief from anger, emotional reactivity, and rage with IFS parts work and EMDR in San Jose. Licensed LMFT, telehealth across California. Start with a free 15-minute consultation today." },
  "anxiety-therapy-berkeley": { title: "Anxiety Therapy Berkeley | IFS & EMDR for Anxiety | Marcus Ghiasi, LMFT", description: "Find lasting relief from anxiety, panic attacks, and chronic worry with IFS parts work and EMDR in Berkeley. Licensed LMFT, telehealth across California. Start with a free 15-minute consultation today." },
  "anxiety-therapy-oakland": { title: "Anxiety Therapy Oakland | IFS & EMDR for Anxiety | Marcus Ghiasi, LMFT", description: "Find lasting relief from anxiety, chronic worry, and stress with IFS parts work and EMDR in Oakland. Oakland-based LMFT, telehealth across California. Start with a free 15-minute consultation today." },
  "anxiety-therapy-palo-alto": { title: "Anxiety Therapy Palo Alto | IFS & EMDR for Anxiety | Marcus Ghiasi, LMFT", description: "Find lasting relief from anxiety, perfectionism, and achievement anxiety with IFS parts work and EMDR in Palo Alto. Licensed LMFT, telehealth across California. Start with a free 15-minute consultation today." },
  "anxiety-therapy-san-francisco": { title: "Anxiety Therapy San Francisco | IFS & EMDR for Anxiety | Marcus Ghiasi, LMFT", description: "Find lasting relief from anxiety, panic attacks, and high-functioning anxiety with IFS parts work and EMDR in San Francisco. Licensed LMFT, telehealth across California. Start with a free 15-minute consultation today." },
  "anxiety-therapy-san-jose": { title: "Anxiety Therapy San Jose | IFS & EMDR for Anxiety | Marcus Ghiasi, LMFT", description: "Find lasting relief from anxiety, performance anxiety, and chronic worry with IFS parts work and EMDR in San Jose. Licensed LMFT, telehealth across California. Start with a free 15-minute consultation today." },
  "cbt-therapy-berkeley": { title: "CBT Therapy Berkeley | Cognitive Behavioral Therapy | Marcus Ghiasi, LMFT", description: "Find lasting relief from anxiety, depression, and stuck thought patterns with CBT therapy in Berkeley. Licensed LMFT, telehealth across California. Start with a free 15-minute consultation today." },
  "cbt-therapy-oakland": { title: "CBT Therapy Oakland | Cognitive Behavioral Therapy | Marcus Ghiasi, LMFT", description: "Find lasting relief from anxiety, depression, and anger with CBT therapy in Oakland. Oakland-based LMFT, telehealth across California. Start with a free 15-minute consultation today." },
  "cbt-therapy-palo-alto": { title: "CBT Therapy Palo Alto | Cognitive Behavioral Therapy | Marcus Ghiasi, LMFT", description: "Find lasting relief from perfectionism, performance anxiety, and depression with CBT therapy in Palo Alto. Licensed LMFT, telehealth across California. Start with a free 15-minute consultation today." },
  "cbt-therapy-san-francisco": { title: "CBT Therapy San Francisco | Cognitive Behavioral Therapy | Marcus Ghiasi, LMFT", description: "Find lasting relief from anxiety, depression, and negative thought patterns with CBT therapy in San Francisco. Licensed LMFT, telehealth across California. Start with a free 15-minute consultation today." },
  "cbt-therapy-san-jose": { title: "CBT Therapy San Jose | Cognitive Behavioral Therapy | Marcus Ghiasi, LMFT", description: "Find lasting relief from anxiety, depression, and performance-related thought patterns with CBT therapy in San Jose. Licensed LMFT, telehealth across California. Start with a free 15-minute consultation today." },
  "college-student-therapy-berkeley": { title: "College Student Therapy Berkeley | IFS & EMDR | Marcus Ghiasi, LMFT", description: "Individual therapy for UC Berkeley students dealing with anxiety, depression, academic pressure, and identity questions. Licensed LMFT, telehealth across California. Start with a free 15-minute consultation today." },
  "college-student-therapy-oakland": { title: "College Student Therapy Oakland | IFS & EMDR | Marcus Ghiasi, LMFT", description: "Individual therapy for college students in Oakland dealing with anxiety, depression, identity, and early adulthood pressures. Oakland-based LMFT, telehealth across California. Start with a free 15-minute consultation today." },
  "college-student-therapy-palo-alto": { title: "College Student Therapy Palo Alto | IFS & EMDR | Marcus Ghiasi, LMFT", description: "Individual therapy for college students near Palo Alto dealing with anxiety, perfectionism, academic pressure, and identity questions. Licensed LMFT, telehealth across California. Start with a free 15-minute consultation today." },
  "college-student-therapy-san-francisco": { title: "College Student Therapy San Francisco | IFS & EMDR | Marcus Ghiasi, LMFT", description: "Individual therapy for college students in San Francisco dealing with anxiety, depression, identity, and the pressures of early adulthood. Licensed LMFT, telehealth across California. Start with a free 15-minute consultation today." },
  "college-student-therapy-san-jose": { title: "College Student Therapy San Jose | IFS & EMDR | Marcus Ghiasi, LMFT", description: "Individual therapy for college students in San Jose dealing with anxiety, depression, identity, and early adulthood pressures. Licensed LMFT, telehealth across California. Start with a free 15-minute consultation today." },
  "depression-therapy-berkeley": { title: "Depression Therapy Berkeley | IFS & EMDR for Depression | Marcus Ghiasi, LMFT", description: "Find lasting relief from depression, existential emptiness, and chronic low mood with IFS parts work and EMDR in Berkeley. Licensed LMFT, telehealth across California. Start with a free 15-minute consultation today." },
  "depression-therapy-oakland": { title: "Depression Therapy Oakland | IFS & EMDR for Depression | Marcus Ghiasi, LMFT", description: "Find lasting relief from depression, chronic low mood, and burnout with IFS parts work and EMDR in Oakland. Licensed LMFT, telehealth across California. Start with a free 15-minute consultation today." },
  "depression-therapy-palo-alto": { title: "Depression Therapy Palo Alto | IFS & EMDR for Depression | Marcus Ghiasi, LMFT", description: "Find lasting relief from high-functioning depression, achievement-related emptiness, and chronic low mood with IFS parts work and EMDR in Palo Alto. Licensed LMFT, telehealth across California. Start with a free 15-minute consultation today." },
  "depression-therapy-san-francisco": { title: "Depression Therapy San Francisco | IFS & EMDR for Depression | Marcus Ghiasi, LMFT", description: "Find lasting relief from depression, high-functioning depression, and chronic low mood with IFS parts work and EMDR in San Francisco. Licensed LMFT, telehealth across California. Start with a free 15-minute consultation today." },
  "depression-therapy-san-jose": { title: "Depression Therapy San Jose | IFS & EMDR for Depression | Marcus Ghiasi, LMFT", description: "Find lasting relief from depression, high-functioning depression, and work-related low mood with IFS parts work and EMDR in San Jose. Licensed LMFT, telehealth across California. Start with a free 15-minute consultation today." },
  "emdr-therapy-berkeley": { title: "EMDR Therapy Berkeley | Trauma & Anxiety Treatment | Marcus Ghiasi, LMFT", description: "EMDR therapy in Berkeley for trauma, anxiety, PTSD, and the patterns that insight and talk therapy have not resolved. Licensed LMFT, telehealth across California. Start with a free 15-minute consultation today." },
  "emdr-therapy-oakland": { title: "EMDR Therapy Oakland | Trauma & PTSD Treatment | Marcus Ghiasi, LMFT", description: "EMDR therapy in Oakland for trauma, PTSD, anxiety, and accumulated adversity that talk therapy has not resolved. Oakland-based LMFT, telehealth across California. Start with a free 15-minute consultation today." },
  "emdr-therapy-palo-alto": { title: "EMDR Therapy Palo Alto | Trauma & Anxiety Treatment | Marcus Ghiasi, LMFT", description: "EMDR therapy in Palo Alto for trauma, anxiety, PTSD, and achievement-related patterns that talk therapy has not resolved. Licensed LMFT, telehealth across California. Start with a free 15-minute consultation today." },
  "emdr-therapy-san-francisco": { title: "EMDR Therapy San Francisco | Trauma & PTSD Treatment | Marcus Ghiasi, LMFT", description: "EMDR therapy in San Francisco for trauma, PTSD, anxiety, and the patterns that talk therapy has not resolved. Licensed LMFT, telehealth across California. Start with a free 15-minute consultation today." },
  "emdr-therapy-san-jose": { title: "EMDR Therapy San Jose | Trauma & PTSD Treatment | Marcus Ghiasi, LMFT", description: "EMDR therapy in San Jose for trauma, PTSD, anxiety, and the patterns that talk therapy and self-optimization have not resolved. Licensed LMFT, telehealth across California. Start with a free 15-minute consultation today." },
  "ifs-therapy-berkeley": { title: "IFS Therapy Berkeley | Parts Work & Internal Family Systems | Marcus Ghiasi, LMFT", description: "Find lasting relief from anxiety, depression, and stuck patterns with IFS parts work in Berkeley. Licensed LMFT, telehealth across California. Start with a free 15-minute consultation today." },
  "ifs-therapy-oakland": { title: "IFS Therapy Oakland | Parts Work & Internal Family Systems | Marcus Ghiasi, LMFT", description: "Find lasting relief from anxiety, anger, depression, and relationship patterns with IFS parts work in Oakland. Oakland-based LMFT, telehealth across California. Start with a free 15-minute consultation today." },
  "ifs-therapy-palo-alto": { title: "IFS Therapy Palo Alto | Parts Work & Internal Family Systems | Marcus Ghiasi, LMFT", description: "Find lasting relief from perfectionism, self-criticism, anxiety, and achievement pressure with IFS parts work in Palo Alto. Licensed LMFT, telehealth across California. Start with a free 15-minute consultation today." },
  "ifs-therapy-san-francisco": { title: "IFS Therapy San Francisco | Parts Work & Internal Family Systems | Marcus Ghiasi, LMFT", description: "Find lasting relief from anxiety, burnout, and relationship patterns with IFS parts work in San Francisco. Licensed LMFT, telehealth across California. Start with a free 15-minute consultation today." },
  "ifs-therapy-san-jose": { title: "IFS Therapy San Jose | Parts Work & Internal Family Systems | Marcus Ghiasi, LMFT", description: "Find lasting relief from anxiety, burnout, identity pressure, and relationship patterns with IFS parts work in San Jose. Licensed LMFT, telehealth across California. Start with a free 15-minute consultation today." },
  "lgbtq-therapy-berkeley": { title: "LGBTQ+ Therapy Berkeley | Affirming Individual Therapy | Marcus Ghiasi, LMFT", description: "LGBTQ+ affirming individual therapy in Berkeley for anxiety, depression, identity, and relationship patterns. Licensed LMFT, telehealth across California. Start with a free 15-minute consultation today." },
  "lgbtq-therapy-oakland": { title: "LGBTQ+ Therapy Oakland | Affirming Individual Therapy | Marcus Ghiasi, LMFT", description: "LGBTQ+ affirming individual therapy in Oakland for anxiety, depression, trauma, identity, and relationship patterns. Oakland-based LMFT, telehealth across California. Start with a free 15-minute consultation today." },
  "lgbtq-therapy-palo-alto": { title: "LGBTQ+ Therapy Palo Alto | Affirming Individual Therapy | Marcus Ghiasi, LMFT", description: "LGBTQ+ affirming individual therapy in Palo Alto for anxiety, depression, identity, and relationship patterns. Licensed LMFT, telehealth across California. Start with a free 15-minute consultation today." },
  "lgbtq-therapy-san-francisco": { title: "LGBTQ+ Therapy San Francisco | Affirming Individual Therapy | Marcus Ghiasi, LMFT", description: "LGBTQ+ affirming individual therapy in San Francisco for anxiety, depression, identity, and relationship patterns. Licensed LMFT, telehealth across California. Start with a free 15-minute consultation today." },
  "lgbtq-therapy-san-jose": { title: "LGBTQ+ Therapy San Jose | Affirming Individual Therapy | Marcus Ghiasi, LMFT", description: "LGBTQ+ affirming individual therapy in San Jose for anxiety, depression, identity, and relationship patterns. Licensed LMFT, telehealth across California. Start with a free 15-minute consultation today." },
  "mens-therapy-berkeley": { title: "Men's Therapy Berkeley | Therapy for Men | Marcus Ghiasi, LMFT", description: "Individual therapy for men in Berkeley dealing with anxiety, self-criticism, relationship patterns, and the gap between insight and change. Licensed LMFT, telehealth across California. Start with a free 15-minute consultation today." },
  "mens-therapy-oakland": { title: "Men's Therapy Oakland | Therapy for Men | Marcus Ghiasi, LMFT", description: "Individual therapy for men in Oakland dealing with anxiety, anger, depression, and relationship strain. Oakland-based LMFT, telehealth across California. Start with a free 15-minute consultation today." },
  "mens-therapy-palo-alto": { title: "Men's Therapy Palo Alto | Therapy for Men | Marcus Ghiasi, LMFT", description: "Individual therapy for men in Palo Alto dealing with perfectionism, anxiety, relationship strain, and the cost of sustained high performance. Licensed LMFT, telehealth across California. Start with a free 15-minute consultation today." },
  "mens-therapy-san-francisco": { title: "Men's Therapy San Francisco | Therapy for Men | Marcus Ghiasi, LMFT", description: "Individual therapy for men in San Francisco dealing with anxiety, burnout, relationship strain, and anger. Licensed LMFT, telehealth across California. Start with a free 15-minute consultation today." },
  "mens-therapy-san-jose": { title: "Men's Therapy San Jose | Therapy for Men | Marcus Ghiasi, LMFT", description: "Individual therapy for men in San Jose dealing with anxiety, burnout, identity pressure, and relationship strain. Licensed LMFT, telehealth across California. Start with a free 15-minute consultation today." },
  "online-therapy-alameda": { title: "Online Therapy Alameda | Virtual Therapy | Marcus Ghiasi, LMFT", description: "Online and virtual therapy in Alameda for anxiety, trauma, PTSD, and depression. Licensed LMFT, telehealth across California. No tubes or bridge required. Start with a free 15-minute consultation today." },
  "online-therapy-berkeley": { title: "Online Therapy Berkeley | Telehealth Therapy | Marcus Ghiasi, LMFT", description: "Online therapy in Berkeley for anxiety, depression, trauma, and the insight-change gap. Licensed LMFT, telehealth across California. No commute required. Start with a free 15-minute consultation today." },
  "online-therapy-daly-city": { title: "Online Therapy Daly City | Virtual Therapy | Marcus Ghiasi, LMFT", description: "Online and virtual therapy in Daly City for anxiety, depression, trauma, and family stress. Licensed LMFT, telehealth across California. No commute required. Start with a free 15-minute consultation today." },
  "online-therapy-fremont": { title: "Online Therapy Fremont | Virtual Therapy | Marcus Ghiasi, LMFT", description: "Online and virtual therapy in Fremont for anxiety, depression, trauma, and family pressure. Licensed LMFT, telehealth across California. Start with a free 15-minute consultation today." },
  "online-therapy-hayward": { title: "Online Therapy Hayward | Virtual Therapy | Marcus Ghiasi, LMFT", description: "Online and virtual therapy in Hayward for anxiety, depression, trauma, and anger. Licensed LMFT, telehealth across California. No commute required. Start with a free 15-minute consultation today." },
  "online-therapy-mountain-view": { title: "Online Therapy Mountain View | Virtual Therapy | Marcus Ghiasi, LMFT", description: "Online and virtual therapy in Mountain View for anxiety, burnout, depression, and identity pressure. Licensed LMFT, telehealth across California. Start with a free 15-minute consultation today." },
  "online-therapy-oakland": { title: "Online Therapy Oakland | Telehealth Therapy | Marcus Ghiasi, LMFT", description: "Online therapy in Oakland for anxiety, depression, trauma, and anger. Oakland-based LMFT, telehealth across California. No commute required. Start with a free 15-minute consultation today." },
  "online-therapy-palo-alto": { title: "Online Therapy Palo Alto | Telehealth Therapy | Marcus Ghiasi, LMFT", description: "Online therapy in Palo Alto for anxiety, perfectionism, depression, and burnout. Licensed LMFT, telehealth across California. No commute required. Start with a free 15-minute consultation today." },
  "online-therapy-redwood-city": { title: "Online Therapy Redwood City | Virtual Therapy | Marcus Ghiasi, LMFT", description: "Online and virtual therapy in Redwood City for anxiety, burnout, depression, and relationship patterns. Licensed LMFT, telehealth across California. Start with a free 15-minute consultation today." },
  "online-therapy-san-francisco": { title: "Online Therapy San Francisco | Telehealth Therapy | Marcus Ghiasi, LMFT", description: "Online therapy in San Francisco for anxiety, depression, trauma, and burnout. Licensed LMFT, telehealth across California. No commute, no parking. Start with a free 15-minute consultation today." },
  "online-therapy-san-jose": { title: "Online Therapy San Jose | Telehealth Therapy | Marcus Ghiasi, LMFT", description: "Online therapy in San Jose for anxiety, depression, trauma, and burnout. Licensed LMFT, telehealth across California. No commute required. Start with a free 15-minute consultation today." },
  "online-therapy-san-mateo": { title: "Online Therapy San Mateo | Virtual Therapy | Marcus Ghiasi, LMFT", description: "Online and virtual therapy in San Mateo for anxiety, depression, life transitions, and relationship patterns. Licensed LMFT, telehealth across California. Start with a free 15-minute consultation today." },
  "online-therapy-san-rafael": { title: "Online Therapy San Rafael | Virtual Therapy Marin County | Marcus Ghiasi, LMFT", description: "Online and virtual therapy in San Rafael for anxiety, trauma, depression, and the insight-change gap. Licensed LMFT, telehealth across California. No bridge required. Start with a free 15-minute consultation today." },
  "online-therapy-sunnyvale": { title: "Online Therapy Sunnyvale | Virtual Therapy | Marcus Ghiasi, LMFT", description: "Online and virtual therapy in Sunnyvale for anxiety, depression, family pressure, and burnout. Licensed LMFT, telehealth across California. Start with a free 15-minute consultation today." },
  "online-therapy-walnut-creek": { title: "Online Therapy Walnut Creek | Virtual Therapy | Marcus Ghiasi, LMFT", description: "Online and virtual therapy in Walnut Creek for anxiety, burnout, self-criticism, and relationship patterns. Licensed LMFT, telehealth across California. Start with a free 15-minute consultation today." },
  "psychodynamic-therapy-berkeley": { title: "Psychodynamic Therapy Berkeley | Depth Therapy | Marcus Ghiasi, LMFT", description: "Find lasting relief from recurring relationship patterns, existential depression, and deep-rooted anxiety with psychodynamic therapy in Berkeley. Licensed LMFT, telehealth across California. Start with a free 15-minute consultation today." },
  "psychodynamic-therapy-oakland": { title: "Psychodynamic Therapy Oakland | Depth Therapy | Marcus Ghiasi, LMFT", description: "Find lasting relief from recurring relationship patterns, chronic depression, and deep-rooted anxiety with psychodynamic therapy in Oakland. Oakland-based LMFT, telehealth across California. Start with a free 15-minute consultation today." },
  "psychodynamic-therapy-palo-alto": { title: "Psychodynamic Therapy Palo Alto | Depth Therapy | Marcus Ghiasi, LMFT", description: "Find lasting relief from recurring relationship patterns, achievement-related emptiness, and deep-rooted anxiety with psychodynamic therapy in Palo Alto. Licensed LMFT, telehealth across California. Start with a free 15-minute consultation today." },
  "psychodynamic-therapy-san-francisco": { title: "Psychodynamic Therapy San Francisco | Depth Therapy | Marcus Ghiasi, LMFT", description: "Find lasting relief from relationship patterns, recurring depression, and deep-rooted anxiety with psychodynamic therapy in San Francisco. Licensed LMFT, telehealth across California. Start with a free 15-minute consultation today." },
  "psychodynamic-therapy-san-jose": { title: "Psychodynamic Therapy San Jose | Depth Therapy | Marcus Ghiasi, LMFT", description: "Find lasting relief from recurring relationship patterns, chronic depression, and deep-rooted anxiety with psychodynamic therapy in San Jose. Licensed LMFT, telehealth across California. Start with a free 15-minute consultation today." },
  "relationship-therapy-berkeley": { title: "Relationship Therapy Berkeley | Individual Therapy for Relationship Patterns | Marcus Ghiasi, LMFT", description: "Individual therapy for relationship patterns, attachment issues, and recurring relationship difficulties in Berkeley. Licensed LMFT, telehealth across California. Start with a free 15-minute consultation today." },
  "relationship-therapy-oakland": { title: "Relationship Therapy Oakland | Individual Therapy for Relationship Patterns | Marcus Ghiasi, LMFT", description: "Individual therapy for relationship patterns, attachment issues, and recurring relationship difficulties in Oakland. Oakland-based LMFT, telehealth across California. Start with a free 15-minute consultation today." },
  "relationship-therapy-palo-alto": { title: "Relationship Therapy Palo Alto | Individual Therapy for Relationship Patterns | Marcus Ghiasi, LMFT", description: "Individual therapy for relationship patterns, attachment issues, and recurring relationship difficulties in Palo Alto. Licensed LMFT, telehealth across California. Start with a free 15-minute consultation today." },
  "relationship-therapy-san-francisco": { title: "Relationship Therapy San Francisco | Individual Therapy for Relationship Patterns | Marcus Ghiasi, LMFT", description: "Individual therapy for relationship patterns, attachment issues, and recurring relationship difficulties in San Francisco. Licensed LMFT, telehealth across California. Start with a free 15-minute consultation today." },
  "relationship-therapy-san-jose": { title: "Relationship Therapy San Jose | Individual Therapy for Relationship Patterns | Marcus Ghiasi, LMFT", description: "Individual therapy for relationship patterns, attachment issues, and recurring relationship difficulties in San Jose. Licensed LMFT, telehealth across California. Start with a free 15-minute consultation today." },
  "therapy-alameda": { title: "Therapist in Alameda, CA | IFS & EMDR | Marcus Ghiasi, LMFT", description: "Find lasting relief from anxiety, trauma, depression, and burnout with IFS parts work and EMDR in Alameda. Licensed LMFT, telehealth across California. Start with a free 15-minute consultation today." },
  "therapy-berkeley": { title: "Therapist in Berkeley, CA | IFS & EMDR | Marcus Ghiasi, LMFT", description: "Find lasting relief from anxiety, trauma, depression, and stuck patterns with IFS parts work and EMDR in Berkeley. Licensed LMFT, telehealth across California. Start with a free 15-minute consultation today." },
  "therapy-burlingame": { title: "Therapist in Burlingame, CA | IFS & EMDR | Anxiety & Trauma | Marcus Ghiasi, LMFT", description: "Licensed therapist in Burlingame, CA specializing in IFS parts work, EMDR, anxiety, and trauma. Telehealth for Peninsula adults. Free 15-minute consultation." },
  "therapy-concord": { title: "Therapist in Concord, CA | IFS & EMDR for Anxiety & Trauma | Marcus Ghiasi, LMFT", description: "Find lasting relief from anxiety, trauma, anger, and depression with IFS parts work and EMDR in Concord. Licensed LMFT, telehealth across California. Start with a free 15-minute consultation today." },
  "therapy-daly-city": { title: "Therapist in Daly City, CA | IFS & EMDR | Anxiety & Trauma | Marcus Ghiasi, LMFT", description: "Licensed therapist in Daly City, CA specializing in IFS parts work, EMDR, anxiety, and trauma. Telehealth for San Mateo County adults. Free 15-minute consultation." },
  "therapy-emeryville": { title: "Therapist in Emeryville, CA | IFS & EMDR for Burnout & Anxiety | Marcus Ghiasi, LMFT", description: "Find lasting relief from burnout, anxiety, and trauma with IFS parts work and EMDR in Emeryville. Licensed LMFT, telehealth across California. Start with a free 15-minute consultation today." },
  "therapy-fremont": { title: "Therapist in Fremont, CA | IFS & EMDR for Anxiety & Trauma | Marcus Ghiasi, LMFT", description: "Find lasting relief from anxiety, trauma, depression, and family pressure with IFS parts work and EMDR in Fremont. Licensed LMFT, telehealth across California. Start with a free 15-minute consultation today." },
  "therapy-hayward": { title: "Therapist in Hayward, CA | IFS & EMDR for Anxiety & Trauma | Marcus Ghiasi, LMFT", description: "Find lasting relief from anxiety, trauma, depression, and anger with IFS parts work and EMDR in Hayward. Licensed LMFT, telehealth across California. Start with a free 15-minute consultation today." },
  "therapy-los-altos": { title: "Therapist in Los Altos, CA | IFS & EMDR | Anxiety & Burnout | Marcus Ghiasi, LMFT", description: "Licensed therapist in Los Altos, CA specializing in IFS parts work, EMDR, anxiety, and burnout. Telehealth for Peninsula adults. Free 15-minute consultation." },
  "therapy-marin-city": { title: "IFS Therapist in Marin City, CA | Parts Work & EMDR | Marcus Ghiasi, LMFT", description: "Find lasting relief from anxiety, trauma, and depression with IFS parts work and EMDR in Marin City. Licensed LMFT, telehealth across California. Start with a free 15-minute consultation today." },
  "therapy-menlo-park": { title: "Therapist in Menlo Park, CA | IFS & EMDR | Anxiety & Trauma | Marcus Ghiasi, LMFT", description: "Licensed therapist in Menlo Park, CA specializing in IFS parts work, EMDR, anxiety, and trauma. Telehealth for Peninsula adults. Free 15-minute consultation." },
  "therapy-mill-valley": { title: "IFS Therapist in Mill Valley, CA | Parts Work & EMDR | Marcus Ghiasi, LMFT", description: "Find lasting relief from anxiety, trauma, and burnout with IFS parts work and EMDR in Mill Valley. Licensed LMFT, telehealth across California. Start with a free 15-minute consultation today." },
  "therapy-millbrae": { title: "Therapist in Millbrae, CA | IFS & EMDR | Anxiety & Depression | Marcus Ghiasi, LMFT", description: "Licensed therapist in Millbrae, CA specializing in IFS parts work, EMDR, anxiety, and depression. Telehealth for Peninsula adults. Free 15-minute consultation." },
  "therapy-mountain-view": { title: "Therapist in Mountain View, CA | IFS, EMDR & Trauma | Marcus Ghiasi, LMFT", description: "Licensed therapist in Mountain View, CA specializing in IFS parts work, EMDR, and burnout. Telehealth for Silicon Valley adults. Free 15-minute consultation." },
  "therapy-novato": { title: "IFS Therapist in Novato, CA | Parts Work & EMDR | Marcus Ghiasi, LMFT", description: "Find lasting relief from anxiety, trauma, and burnout with IFS parts work and EMDR in Novato. Licensed LMFT, telehealth across California. Start with a free 15-minute consultation today." },
  "therapy-oakland": { title: "Therapist in Oakland, CA | IFS & EMDR | Marcus Ghiasi, LMFT", description: "Find lasting relief from anxiety, trauma, depression, and burnout with IFS parts work and EMDR in Oakland. Licensed LMFT, telehealth across California. Start with a free 15-minute consultation today." },
  "therapy-pacifica": { title: "Therapist in Pacifica, CA | IFS & EMDR | Anxiety & Trauma | Marcus Ghiasi, LMFT", description: "Licensed therapist in Pacifica, CA specializing in IFS parts work, EMDR, anxiety, and trauma. Telehealth for San Mateo County adults. Free 15-minute consultation." },
  "therapy-palo-alto": { title: "Therapist in Palo Alto, CA | IFS, EMDR & Parts Work | Marcus Ghiasi, LMFT", description: "Licensed therapist in Palo Alto, CA specializing in IFS parts work, EMDR, and trauma. Telehealth for Stanford students and Peninsula adults. Free consultation." },
  "therapy-petaluma": { title: "IFS Therapist in Petaluma, CA | Parts Work & EMDR | Marcus Ghiasi, LMFT", description: "Find lasting relief from anxiety, trauma, and burnout with IFS parts work and EMDR in Petaluma. Licensed LMFT, telehealth across California. Start with a free 15-minute consultation today." },
  "therapy-piedmont": { title: "Therapist in Piedmont, CA | IFS & EMDR for Anxiety & Perfectionism | Marcus Ghiasi, LMFT", description: "Find lasting relief from anxiety, perfectionism, and burnout with IFS parts work and EMDR in Piedmont. Licensed LMFT, telehealth across California. Start with a free 15-minute consultation today." },
  "therapy-pleasant-hill": { title: "Therapist in Pleasant Hill, CA | IFS & EMDR for Anxiety & Life Transitions | Marcus Ghiasi, LMFT", description: "Find lasting relief from anxiety, depression, life transitions, and relationship patterns with IFS parts work and EMDR in Pleasant Hill. Licensed LMFT, telehealth across California. Start with a free 15-minute consultation today." },
  "therapy-pleasanton": { title: "Therapist in Pleasanton, CA | IFS & EMDR for Anxiety & Burnout | Marcus Ghiasi, LMFT", description: "Find lasting relief from anxiety, burnout, perfectionism, and trauma with IFS parts work and EMDR in Pleasanton. Licensed LMFT, telehealth across California. Start with a free 15-minute consultation today." },
  "therapy-redwood-city": { title: "Therapist in Redwood City, CA | IFS & EMDR | Marcus Ghiasi, LMFT", description: "Licensed therapist in Redwood City, CA specializing in IFS parts work, EMDR, anxiety, and trauma. Telehealth for Peninsula adults. Free 15-minute consultation." },
  "therapy-richmond": { title: "Therapist in Richmond, CA | IFS & EMDR for Trauma & Anxiety | Marcus Ghiasi, LMFT", description: "Find lasting relief from trauma, anxiety, depression, and anger with IFS parts work and EMDR in Richmond. Licensed LMFT, telehealth across California. Start with a free 15-minute consultation today." },
  "therapy-san-carlos": { title: "Therapist in San Carlos, CA | IFS & EMDR | Anxiety & Burnout | Marcus Ghiasi, LMFT", description: "Licensed therapist in San Carlos, CA specializing in IFS parts work, EMDR, anxiety, burnout, and trauma. Telehealth for Peninsula adults. Free 15-minute consultation." },
  "therapy-san-francisco": { title: "Therapist in San Francisco, CA | IFS & EMDR | Marcus Ghiasi, LMFT", description: "Find lasting relief from anxiety, trauma, depression, and burnout with IFS parts work and EMDR in San Francisco. Licensed LMFT, telehealth across California. Start with a free 15-minute consultation today." },
  "therapy-san-jose": { title: "Therapist in San Jose, CA | IFS, EMDR & Trauma | Marcus Ghiasi, LMFT", description: "Licensed therapist in San Jose, CA specializing in IFS parts work, EMDR, and trauma. Telehealth for Silicon Valley adults. Free 15-minute consultation." },
  "therapy-san-leandro": { title: "Therapist in San Leandro, CA | IFS & EMDR for Anxiety & Trauma | Marcus Ghiasi, LMFT", description: "Find lasting relief from anxiety, trauma, depression, and anger with IFS parts work and EMDR in San Leandro. Licensed LMFT, telehealth across California. Start with a free 15-minute consultation today." },
  "therapy-san-mateo": { title: "Therapist in San Mateo, CA | IFS & EMDR | Anxiety & Trauma | Marcus Ghiasi, LMFT", description: "Licensed therapist in San Mateo, CA specializing in IFS parts work, EMDR, anxiety, trauma, and depression. Telehealth for Peninsula adults. Free 15-minute consultation." },
  "therapy-san-rafael": { title: "IFS Therapist in San Rafael, CA | Parts Work & EMDR | Marcus Ghiasi, LMFT", description: "Find lasting relief from anxiety, trauma, and burnout with IFS parts work and EMDR in San Rafael. Licensed LMFT, telehealth across California. Start with a free 15-minute consultation today." },
  "therapy-sausalito": { title: "IFS Therapist in Sausalito, CA | Parts Work & EMDR | Marcus Ghiasi, LMFT", description: "Find lasting relief from anxiety, trauma, and relationship patterns with IFS parts work and EMDR in Sausalito. Licensed LMFT, telehealth across California. Start with a free 15-minute consultation today." },
  "therapy-south-san-francisco": { title: "Therapist in South San Francisco, CA | IFS & EMDR | Anxiety & Trauma | Marcus Ghiasi, LMFT", description: "Licensed therapist in South San Francisco, CA specializing in IFS parts work, EMDR, anxiety, and trauma. Telehealth for San Mateo County adults. Free 15-minute consultation." },
  "therapy-sunnyvale": { title: "Therapist in Sunnyvale, CA | IFS & EMDR for Immigrants & Professionals | Marcus Ghiasi, LMFT", description: "Licensed therapist in Sunnyvale, CA specializing in IFS, EMDR, and culturally aware therapy for immigrants, engineers, and South Bay professionals. Free consultation." },
  "therapy-vallejo": { title: "IFS Therapist in Vallejo, CA | Parts Work & EMDR | Marcus Ghiasi, LMFT", description: "Find lasting relief from anxiety, trauma, and depression with IFS parts work and EMDR in Vallejo. Licensed LMFT, telehealth across California. Start with a free 15-minute consultation today." },
  "therapy-walnut-creek": { title: "Therapist in Walnut Creek, CA | IFS & EMDR for Anxiety & Burnout | Marcus Ghiasi, LMFT", description: "Find lasting relief from anxiety, burnout, self-criticism, and trauma with IFS parts work and EMDR in Walnut Creek. Licensed LMFT, telehealth across California. Start with a free 15-minute consultation today." },
  "trauma-therapy-berkeley": { title: "Trauma Therapy Berkeley | EMDR & IFS for Trauma | Marcus Ghiasi, LMFT", description: "Find lasting relief from trauma, PTSD, and complex trauma with EMDR and IFS therapy in Berkeley. Licensed LMFT, telehealth across California. Start with a free 15-minute consultation today." },
  "trauma-therapy-oakland": { title: "Trauma Therapy Oakland | EMDR & IFS for Trauma | Marcus Ghiasi, LMFT", description: "Find lasting relief from trauma, PTSD, and complex trauma with EMDR and IFS therapy in Oakland. Oakland-based LMFT, telehealth across California. Start with a free 15-minute consultation today." },
  "trauma-therapy-palo-alto": { title: "Trauma Therapy Palo Alto | EMDR & IFS for Trauma | Marcus Ghiasi, LMFT", description: "Find lasting relief from trauma, PTSD, and achievement-related trauma with EMDR and IFS therapy in Palo Alto. Licensed LMFT, telehealth across California. Start with a free 15-minute consultation today." },
  "trauma-therapy-san-francisco": { title: "Trauma Therapy San Francisco | EMDR & IFS for Trauma | Marcus Ghiasi, LMFT", description: "Find lasting relief from trauma, PTSD, and complex trauma with EMDR and IFS therapy in San Francisco. Licensed LMFT, telehealth across California. Start with a free 15-minute consultation today." },
  "trauma-therapy-san-jose": { title: "Trauma Therapy San Jose | EMDR & IFS for Trauma | Marcus Ghiasi, LMFT", description: "Find lasting relief from trauma, PTSD, and complex trauma with EMDR and IFS therapy in San Jose. Licensed LMFT, telehealth across California. Start with a free 15-minute consultation today." },
  "young-adults-therapy-berkeley": { title: "Young Adults Therapist Berkeley | Ages 18-30 | Marcus Ghiasi, LMFT", description: "Individual therapy for young adults and UC Berkeley students navigating anxiety, identity, academic pressure, and life transitions. Licensed LMFT, telehealth across California. Start with a free 15-minute consultation today." },
  "young-adults-therapy-oakland": { title: "Young Adults Therapist Oakland | Ages 18-30 | Marcus Ghiasi, LMFT", description: "Individual therapy for young adults in Oakland navigating anxiety, identity, family expectations, and life transitions. Oakland-based LMFT, telehealth across California. Start with a free 15-minute consultation today." },
  "young-adults-therapy-palo-alto": { title: "Young Adults Therapist Palo Alto | Ages 18-30 | Marcus Ghiasi, LMFT", description: "Individual therapy for young adults near Palo Alto navigating perfectionism, anxiety, imposter syndrome, and identity. Licensed LMFT, telehealth across California. Start with a free 15-minute consultation today." },
  "young-adults-therapy-san-francisco": { title: "Young Adults Therapist San Francisco | Ages 18-30 | Marcus Ghiasi, LMFT", description: "Individual therapy for young adults in San Francisco navigating anxiety, career pressure, identity, and life transitions. Licensed LMFT, telehealth across California. Start with a free 15-minute consultation today." },
  "young-adults-therapy-san-jose": { title: "Young Adults Therapist San Jose | Ages 18-30 | Marcus Ghiasi, LMFT", description: "Individual therapy for young adults in San Jose navigating anxiety, career pressure, family expectations, and identity. Licensed LMFT, telehealth across California. Start with a free 15-minute consultation today." },
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
  // 4. Check SEO landing pages - titles here already include full branding
  // (e.g. "| Marcus Ghiasi, LMFT"), pulled directly from the live seoPages
  // data, so no additional suffix is appended.
  else if (CITY_PAGES[cleanPath]) {
    const page = CITY_PAGES[cleanPath];
    title = page.title;
    description = page.description;
  }
  // 5. Fallback: generate from slug pattern for any page not yet synced
  // into CITY_PAGES above. Splits on known therapy-type prefixes first
  // so multi-word city names (e.g. "san-francisco") aren't mangled into
  // just their last segment.
  else if (cleanPath) {
    const KNOWN_PREFIXES = [
      "young-adults-therapy-", "college-student-therapy-", "psychodynamic-therapy-",
      "relationship-therapy-", "depression-therapy-", "online-therapy-",
      "anxiety-therapy-", "trauma-therapy-", "mens-therapy-", "lgbtq-therapy-",
      "anger-therapy-", "emdr-therapy-", "ifs-therapy-", "cbt-therapy-", "therapy-",
    ];
    let citySlug = cleanPath;
    for (const prefix of KNOWN_PREFIXES) {
      if (cleanPath.startsWith(prefix)) {
        citySlug = cleanPath.slice(prefix.length);
        break;
      }
    }
    const cityGuess = citySlug
      .split("-")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ");
    title = `Therapy in ${cityGuess}, CA | Bayside Wellness & Counseling`;
    description = `Licensed therapist serving ${cityGuess} and the greater Bay Area. Virtual EMDR, CBT, IFS therapy. $210 for 45 minutes, $280 for 60 minutes. Free 15-minute consultation.`;
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
