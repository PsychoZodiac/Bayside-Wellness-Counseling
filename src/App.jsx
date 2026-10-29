import React, { useState, useEffect, useRef, createContext, useContext } from "react";
import { Routes, Route, Link, useNavigate, useParams, useLocation } from 'react-router-dom';
import logo from './assets/bayside-logo.png';
import marcusHeadshot from './assets/marcus-headshot.jpg';
import camftLogo from './assets/camft-logo.webp';
import SEO from './SEO';
import { mainPages, servicePages, generateBlogMeta, generateSEOPageMeta } from './metadata';
import { Analytics } from '@vercel/analytics/react';

// Dark Mode Context
const DarkModeContext = createContext();
export const useDarkMode = () => useContext(DarkModeContext);

// ========================================
// DESIGN SYSTEM
// ========================================

const colors = {
  // Light mode colors
  ivory: "#FAF7F4",
  ivoryDark: "#F2EDE8",
  teal: "#2E7D7A",
  tealLight: "#3D9E9A",
  tealMuted: "#6B8F8E",
  tealPale: "#E8F4F4",
  charcoal: "#2C3A3A",
  charcoalLight: "#4A5A5A",
  warmGray: "#8A9090",
  white: "#FFFFFF",
  accent: "#C17B4E",
  
  // Dark mode colors
  darkBg: "#1A2424",
  darkBgLight: "#243333",
  darkBgLighter: "#2E4040",
  darkText: "#E8F4F4",
  darkTextMuted: "#A8C0C0",
  darkTeal: "#4DBDB7",
  darkTealMuted: "#6B9E9A",
};

// Get theme colors based on mode
const getTheme = (isDark) => ({
  bg: isDark ? colors.darkBg : colors.ivory,
  bgAlt: isDark ? colors.darkBgLight : colors.white,
  bgLighter: isDark ? colors.darkBgLighter : colors.ivoryDark,
  text: isDark ? colors.darkText : colors.charcoal,
  textMuted: isDark ? colors.darkTextMuted : colors.charcoalLight,
  accent: isDark ? colors.darkTeal : colors.teal,
  accentMuted: isDark ? colors.darkTealMuted : colors.tealMuted,
  border: isDark ? colors.darkBgLighter : colors.ivoryDark,
});

const fonts = `
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=DM+Sans:wght@300;400;500;600&display=swap');
`;

const clientPortalUrl = "https://baysidewellnessandcounseling.janeapp.com/login";

// ========================================
// DATA
// ========================================

const services = [
  {
    "name": "EMDR Therapy",
    "slug": "emdr",
    "shortDesc": "Working with distressing memories",
    "desc": "EMDR is a structured therapy used in treatment of PTSD. It involves assessment and preparation before work with selected memories. We discuss whether trauma-focused treatment is appropriate for your symptoms and circumstances."
  },
  {
    "name": "IFS Therapy (Parts Work)",
    "slug": "ifs",
    "shortDesc": "Understanding internal conflict",
    "desc": "IFS uses the language of parts to explore conflicting feelings, self-criticism, and protective habits. At Bayside, it is used in individual therapy, not sessions involving your family members."
  },
  {
    "name": "Cognitive Behavioral Therapy",
    "slug": "cbt",
    "shortDesc": "Practical work with thoughts and actions",
    "desc": "CBT explores how interpretations, emotions, and behavior influence one another. Sessions can include testing predictions, addressing avoidance, and planning manageable practice related to your goals."
  },
  {
    "name": "Psychodynamic Therapy",
    "slug": "psychodynamic",
    "shortDesc": "Exploring recurring relationship themes",
    "desc": "Psychodynamic therapy explores how earlier experiences and recurring expectations may influence your present life. We connect reflection with the relationships, decisions, and changes that matter to you now."
  },
  {
    "name": "Young Adults Therapy",
    "slug": "young-adults",
    "shortDesc": "Support during early adulthood",
    "desc": "Individual therapy for adults roughly ages 18 to 30 navigating school, work, relationships, identity, and independence. You do not need a settled plan for your life before seeking support."
  },
  {
    "name": "Men's Therapy",
    "slug": "mens",
    "shortDesc": "Room for honest conversation",
    "desc": "Individual therapy for men working on anger, relationships, work stress, or emotional expression. Sessions can combine practical skills and reflection without assuming there is one way men should feel or communicate."
  }
];

// Detailed content for individual service pages
const serviceDetails = {
  "emdr": {
    "intro": "A reminder of an accident, loss, or frightening experience can bring back distress even when you know the event is over. In therapy, we can explore the reminders, their effect on daily life, and whether memory-focused work is an appropriate next step.",
    "howItWorks": "EMDR involves assessment, preparation, and work with selected memories using bilateral stimulation, such as guided eye movements. Processing does not have to begin in the first session. We discuss your history, ways to manage distress, and whether this approach fits your needs. There is no fixed number of sessions or promised outcome. We can review what is changing, what remains difficult, and whether to adjust the approach, frequency, or plan for care.",
    "whoThisHelps": "A structured approach to working with distressing memories and the reactions connected to them. A consultation can help clarify fit, including whether another approach or provider would better meet your needs.",
    "ctaHeading": "Ready to move forward?",
    "ctaText": "Ask about this approach in a free 15-minute consultation with Marcus Ghiasi, LMFT. Virtual individual sessions are available to adults physically in California."
  },
  "ifs": {
    "intro": "Self-criticism can sound like a plan for improvement while leaving you more anxious or discouraged. Parts work can explore what the critical voice is trying to prevent, how it affects you, and other ways to respond to mistakes.",
    "howItWorks": "Internal Family Systems uses the language of parts to explore different feelings, needs, and ways of coping. You might notice a part that pushes hard and another that wants to withdraw. We can approach both with curiosity without treating them as separate people or assuming the model explains every experience. There is no fixed number of sessions or promised outcome. We can review what is changing, what remains difficult, and whether to adjust the approach, frequency, or plan for care.",
    "whoThisHelps": "Individual parts work for understanding inner conflict, self-criticism, and protective habits. A consultation can help clarify fit, including whether another approach or provider would better meet your needs.",
    "ctaHeading": "Curious about parts work?",
    "ctaText": "Ask about this approach in a free 15-minute consultation with Marcus Ghiasi, LMFT. Virtual individual sessions are available to adults physically in California."
  },
  "cbt": {
    "intro": "An unanswered message or a small mistake can quickly become evidence that something terrible will happen. We can separate what is known from what is feared and practice responding to uncertainty without endless reassurance.",
    "howItWorks": "Cognitive Behavioral Therapy looks at the interaction between a situation, your interpretation, your feelings, and what you do next. Sessions may include tracking patterns, testing predictions, and planning manageable steps between appointments. The aim is a more workable response, not forced positive thinking. There is no fixed number of sessions or promised outcome. We can review what is changing, what remains difficult, and whether to adjust the approach, frequency, or plan for care.",
    "whoThisHelps": "Practical work with thoughts, emotions, and behaviors that keep anxiety or low mood going. A consultation can help clarify fit, including whether another approach or provider would better meet your needs.",
    "ctaHeading": "Want a practical approach?",
    "ctaText": "Ask about this approach in a free 15-minute consultation with Marcus Ghiasi, LMFT. Virtual individual sessions are available to adults physically in California."
  },
  "psychodynamic": {
    "intro": "Different relationships may leave you with a similar feeling: overlooked, responsible for everyone, or afraid to ask for more. We can examine the pattern without assuming every difficulty has the same cause.",
    "howItWorks": "Psychodynamic work makes room for themes that recur across relationships and over time. We can notice what feels difficult to say, how you respond to closeness or conflict, and how earlier expectations influence present choices. Understanding is connected to what you want to do differently now. There is no fixed number of sessions or promised outcome. We can review what is changing, what remains difficult, and whether to adjust the approach, frequency, or plan for care.",
    "whoThisHelps": "Exploring recurring relationship patterns, emotional conflicts, and the meaning of earlier experiences. A consultation can help clarify fit, including whether another approach or provider would better meet your needs.",
    "ctaHeading": "Looking for deeper understanding?",
    "ctaText": "Ask about this approach in a free 15-minute consultation with Marcus Ghiasi, LMFT. Virtual individual sessions are available to adults physically in California."
  },
  "young-adults": {
    "intro": "Finishing school or entering work can leave you without familiar structure. We can separate decisions that need attention now from questions that can remain open, then identify steps that fit your circumstances.",
    "howItWorks": "We can work on current decisions while also exploring the anxiety, expectations, and relationship habits that make them harder. The approach may draw on CBT, IFS, psychodynamic work, or EMDR when appropriate. You do not need to have your career, identity, or goals settled before starting. There is no fixed number of sessions or promised outcome. We can review what is changing, what remains difficult, and whether to adjust the approach, frequency, or plan for care.",
    "whoThisHelps": "Individual therapy for adults roughly ages 18 to 30 navigating identity, relationships, and transitions. A consultation can help clarify fit, including whether another approach or provider would better meet your needs.",
    "ctaHeading": "Ready to get started?",
    "ctaText": "Ask about this approach in a free 15-minute consultation with Marcus Ghiasi, LMFT. Virtual individual sessions are available to adults physically in California."
  },
  "mens": {
    "intro": "You may regret how a conversation ended without knowing how to change it next time. We can identify warning signs, practice pauses, and examine what you need to take responsibility for after conflict.",
    "howItWorks": "Sessions can connect immediate concerns with the ways you have learned to handle pressure, conflict, or vulnerability. CBT, parts work, and reflective conversation may be useful depending on what you bring. There is no expectation that all men share the same experience or want the same style of therapy. There is no fixed number of sessions or promised outcome. We can review what is changing, what remains difficult, and whether to adjust the approach, frequency, or plan for care.",
    "whoThisHelps": "Individual counseling for men working on anger, relationships, stress, and emotional expression. A consultation can help clarify fit, including whether another approach or provider would better meet your needs.",
    "ctaHeading": "Ready to do the work?",
    "ctaText": "Ask about this approach in a free 15-minute consultation with Marcus Ghiasi, LMFT. Virtual individual sessions are available to adults physically in California."
  }
};

const cityRegions = {
  "San Francisco Area": ["San Francisco", "Daly City", "South San Francisco", "Pacifica"],
  "East Bay Core": ["Oakland", "Berkeley", "Alameda", "Emeryville", "Piedmont", "San Leandro"],
  "East Bay & Tri-Valley": ["Hayward", "Fremont", "Pleasanton", "Walnut Creek", "Concord", "Richmond", "Pleasant Hill"],
  "South Bay / Silicon Valley": ["San Jose", "Mountain View", "Sunnyvale", "Palo Alto", "Los Altos"],
  "Peninsula": ["Redwood City", "San Mateo", "San Carlos", "Burlingame", "Millbrae", "Menlo Park"],
  "North Bay": ["San Rafael", "Sausalito", "Mill Valley", "Novato", "Marin City", "Vallejo", "Petaluma"],
};

function getNearbyCityLinks(currentCity, currentSlug) {
  const region = Object.values(cityRegions).find(cities => cities.includes(currentCity));
  if (!region) return [];
  return region
    .filter(city => city !== currentCity)
    .map(city => {
      const citySlug = "therapy-" + city.toLowerCase().replace(/\s+/g, "-");
      return citySlug === currentSlug ? null : { city, slug: citySlug };
    })
    .filter(Boolean)
    .filter(entry => !!seoPagesSlugSet.has(entry.slug))
    .slice(0, 6);
}

function getTopicClusterLinks(currentSlug, currentCity) {
  if (!currentCity) return [];
  const citySuffix = "-" + currentCity.toLowerCase().replace(/\s+/g, "-");
  const hubSlug = "therapy" + citySuffix;
  const siblingSlugs = Object.keys(seoPages).filter(key =>
    key.endsWith(citySuffix) && key !== currentSlug && key !== hubSlug
  );
  const links = siblingSlugs.map(slug => ({
    slug,
    label: seoPages[slug].title || seoPages[slug].h1 || slug,
  }));
  if (currentSlug !== hubSlug && seoPagesSlugSet.has(hubSlug)) {
    links.unshift({ slug: hubSlug, label: seoPages[hubSlug].title || `Therapy in ${currentCity}` });
  }
  return links;
}

const seoPages = {
  "therapy-san-francisco": {
    "city": "San Francisco",
    "state": "CA",
    "slug": "therapy-san-francisco",
    "title": "Individual Therapy for San Francisco Residents",
    "metaTitle": "Therapy in San Francisco | Virtual Sessions",
    "metaDescription": "Therapy for adults in San Francisco, CA. Choosing a starting point. Virtual sessions with Marcus Ghiasi, LMFT. Free consultation.",
    "h1": "Individual Therapy for Adults in San Francisco, CA",
    "intro": "You may have several concerns and not know which one belongs in therapy first. We can begin with the situation affecting daily life most and develop a focus together. You do not need to select a therapy method before a consultation. Bayside offers virtual individual therapy to adults in San Francisco who are physically in California for sessions.",
    "localContent": "Marcus Ghiasi is a California Licensed Marriage and Family Therapist, license #158475. Bayside is based in Oakland. Sessions for San Francisco residents take place online from a private setting in California. A place to work on anxiety, low mood, trauma-related concerns, relationships, and life transitions.",
    "whyChoose": [
      "Individual sessions with Marcus Ghiasi, LMFT, California license #158475",
      "Virtual access for San Francisco residents; you must be in California for appointments",
      "A conversation about goals, preferences, and the reasons for a proposed approach",
      "45- or 60-minute private-pay sessions; rates and insurance details are below",
      "Free 15-minute consultation to discuss fit and practical questions"
    ],
    "uniqueContent": [
      "Therapy can draw on CBT for patterns of worry and avoidance, IFS for exploring internal conflict, psychodynamic work for recurring relational themes, or EMDR when memory-focused treatment is appropriate. We discuss the reason for an approach and review how it fits your goals.",
      "<a href=\"/services\">Compare the therapy approaches offered at Bayside.</a> <a href=\"/about\">Read about Marcus and his approach.</a> You can ask about experience relevant to your concern before deciding on care."
    ],
    "uniqueWhatToExpect": [
      "A free 15-minute consultation gives you room to describe what you need, ask questions, and discuss availability. It does not commit you to ongoing sessions.",
      "The first full appointment can explore choosing a starting point, your history, and the concerns most important to you. You can ask questions about pace, methods, and what to do if something does not feel useful. Session length is 45 or 60 minutes; check current scheduling options when booking.",
      "There is no fixed number of sessions or promised outcome. We can review what is changing, what remains difficult, and whether to adjust the approach, frequency, or plan for care."
    ],
    "uniqueFaqs": [
      {
        "q": "What if I do not know which service to choose?",
        "a": "Describe what is happening and what you hope might change. We can discuss options and fit without requiring you to arrive with a diagnosis or modality in mind."
      },
      {
        "q": "Are these in-person appointments in San Francisco?",
        "a": "No. Bayside provides virtual individual therapy. You can attend from a private, suitable setting in San Francisco or elsewhere in California; your physical location matters for every appointment."
      },
      {
        "q": "How much do sessions cost, and can I use insurance?",
        "a": "Sessions are $210 for 45 minutes or $280 for 60 minutes. Bayside is a private-pay practice and does not bill insurance directly. A superbill is available for possible out-of-network reimbursement; eligibility and payment depend on your plan."
      },
      {
        "q": "How many sessions will I need?",
        "a": "There is no fixed number of sessions or promised outcome. We can review what is changing, what remains difficult, and whether to adjust the approach, frequency, or plan for care."
      }
    ],
    "contentHeading": "Choosing a starting point"
  },
  "therapy-oakland": {
    "city": "Oakland",
    "state": "CA",
    "slug": "therapy-oakland",
    "title": "Individual Therapy for Oakland Residents",
    "metaTitle": "Therapy in Oakland | Virtual Sessions",
    "metaDescription": "Therapy for adults in Oakland, CA. Understanding the person you would work with. Virtual sessions with Marcus Ghiasi, LMFT. Free consultation.",
    "h1": "Individual Therapy for Adults in Oakland, CA",
    "intro": "Bayside is an Oakland-based virtual practice led by Marcus Ghiasi, LMFT. You can read about his approach and ask how it relates to your concerns before deciding on care. A license identifies a professional qualification; fit still deserves a conversation. Bayside offers virtual individual therapy to adults in Oakland who are physically in California for sessions.",
    "localContent": "Marcus Ghiasi is a California Licensed Marriage and Family Therapist, license #158475. Bayside is based in Oakland and provides virtual individual sessions, rather than in-person office appointments. A place to work on anxiety, low mood, trauma-related concerns, relationships, and life transitions.",
    "whyChoose": [
      "Individual sessions with Marcus Ghiasi, LMFT, California license #158475",
      "Virtual access for Oakland residents; you must be in California for appointments",
      "A conversation about goals, preferences, and the reasons for a proposed approach",
      "45- or 60-minute private-pay sessions; rates and insurance details are below",
      "Free 15-minute consultation to discuss fit and practical questions"
    ],
    "uniqueContent": [
      "Therapy can draw on CBT for patterns of worry and avoidance, IFS for exploring internal conflict, psychodynamic work for recurring relational themes, or EMDR when memory-focused treatment is appropriate. We discuss the reason for an approach and review how it fits your goals.",
      "<a href=\"/services\">Compare the therapy approaches offered at Bayside.</a> <a href=\"/about\">Read about Marcus and his approach.</a> You can ask about experience relevant to your concern before deciding on care."
    ],
    "uniqueWhatToExpect": [
      "A free 15-minute consultation gives you room to describe what you need, ask questions, and discuss availability. It does not commit you to ongoing sessions.",
      "The first full appointment can explore understanding the person you would work with, your history, and the concerns most important to you. You can ask questions about pace, methods, and what to do if something does not feel useful. Session length is 45 or 60 minutes; check current scheduling options when booking.",
      "There is no fixed number of sessions or promised outcome. We can review what is changing, what remains difficult, and whether to adjust the approach, frequency, or plan for care."
    ],
    "uniqueFaqs": [
      {
        "q": "Can I learn about Marcus before booking?",
        "a": "Yes. The About page describes his background and approach. You can use the consultation to ask about relevant experience, methods, and what working together might involve."
      },
      {
        "q": "Are these in-person appointments in Oakland?",
        "a": "No. Bayside provides virtual individual therapy. You can attend from a private, suitable setting in Oakland or elsewhere in California; your physical location matters for every appointment."
      },
      {
        "q": "How much do sessions cost, and can I use insurance?",
        "a": "Sessions are $210 for 45 minutes or $280 for 60 minutes. Bayside is a private-pay practice and does not bill insurance directly. A superbill is available for possible out-of-network reimbursement; eligibility and payment depend on your plan."
      },
      {
        "q": "How many sessions will I need?",
        "a": "There is no fixed number of sessions or promised outcome. We can review what is changing, what remains difficult, and whether to adjust the approach, frequency, or plan for care."
      }
    ],
    "contentHeading": "Understanding the person you would work with"
  },
  "therapy-berkeley": {
    "city": "Berkeley",
    "state": "CA",
    "slug": "therapy-berkeley",
    "title": "Individual Therapy for Berkeley Residents",
    "metaTitle": "Therapy in Berkeley | Virtual Sessions",
    "metaDescription": "Therapy for adults in Berkeley, CA. Finding support during a transition. Virtual sessions with Marcus Ghiasi, LMFT. Free consultation.",
    "h1": "Individual Therapy for Adults in Berkeley, CA",
    "intro": "A change in school, work, or relationships can bring uncertainty even when it was wanted. Therapy can help you sort immediate decisions from questions of identity and belonging without assuming you should already feel settled. Bayside offers virtual individual therapy to adults in Berkeley who are physically in California for sessions.",
    "localContent": "Marcus Ghiasi is a California Licensed Marriage and Family Therapist, license #158475. Bayside is based in Oakland. Sessions for Berkeley residents take place online from a private setting in California. A place to work on anxiety, low mood, trauma-related concerns, relationships, and life transitions.",
    "whyChoose": [
      "Individual sessions with Marcus Ghiasi, LMFT, California license #158475",
      "Virtual access for Berkeley residents; you must be in California for appointments",
      "A conversation about goals, preferences, and the reasons for a proposed approach",
      "45- or 60-minute private-pay sessions; rates and insurance details are below",
      "Free 15-minute consultation to discuss fit and practical questions"
    ],
    "uniqueContent": [
      "Therapy can draw on CBT for patterns of worry and avoidance, IFS for exploring internal conflict, psychodynamic work for recurring relational themes, or EMDR when memory-focused treatment is appropriate. We discuss the reason for an approach and review how it fits your goals.",
      "<a href=\"/services\">Compare the therapy approaches offered at Bayside.</a> <a href=\"/about\">Read about Marcus and his approach.</a> You can ask about experience relevant to your concern before deciding on care."
    ],
    "uniqueWhatToExpect": [
      "A free 15-minute consultation gives you room to describe what you need, ask questions, and discuss availability. It does not commit you to ongoing sessions.",
      "The first full appointment can explore finding support during a transition, your history, and the concerns most important to you. You can ask questions about pace, methods, and what to do if something does not feel useful. Session length is 45 or 60 minutes; check current scheduling options when booking.",
      "There is no fixed number of sessions or promised outcome. We can review what is changing, what remains difficult, and whether to adjust the approach, frequency, or plan for care."
    ],
    "uniqueFaqs": [
      {
        "q": "Can I ask for support before things become a crisis?",
        "a": "Yes. You can seek a consultation for a transition, recurring stress, or a pattern you want to understand. A crisis is not a prerequisite."
      },
      {
        "q": "Are these in-person appointments in Berkeley?",
        "a": "No. Bayside provides virtual individual therapy. You can attend from a private, suitable setting in Berkeley or elsewhere in California; your physical location matters for every appointment."
      },
      {
        "q": "How much do sessions cost, and can I use insurance?",
        "a": "Sessions are $210 for 45 minutes or $280 for 60 minutes. Bayside is a private-pay practice and does not bill insurance directly. A superbill is available for possible out-of-network reimbursement; eligibility and payment depend on your plan."
      },
      {
        "q": "How many sessions will I need?",
        "a": "There is no fixed number of sessions or promised outcome. We can review what is changing, what remains difficult, and whether to adjust the approach, frequency, or plan for care."
      }
    ],
    "contentHeading": "Finding support during a transition"
  },
  "therapy-alameda": {
    "city": "Alameda",
    "state": "CA",
    "slug": "therapy-alameda",
    "title": "Individual Therapy for Alameda Residents",
    "metaTitle": "Therapy in Alameda | Virtual Sessions",
    "metaDescription": "Therapy for adults in Alameda, CA. Making room for therapy at home. Virtual sessions with Marcus Ghiasi, LMFT. Free consultation.",
    "h1": "Individual Therapy for Adults in Alameda, CA",
    "intro": "A familiar room is not automatically a private one. Before virtual sessions, consider whether you can speak freely, whether someone may enter, and whether headphones help. We can discuss a workable setup during the consultation. Bayside offers virtual individual therapy to adults in Alameda who are physically in California for sessions.",
    "localContent": "Marcus Ghiasi is a California Licensed Marriage and Family Therapist, license #158475. Bayside is based in Oakland. Sessions for Alameda residents take place online from a private setting in California. A place to work on anxiety, low mood, trauma-related concerns, relationships, and life transitions.",
    "whyChoose": [
      "Individual sessions with Marcus Ghiasi, LMFT, California license #158475",
      "Virtual access for Alameda residents; you must be in California for appointments",
      "A conversation about goals, preferences, and the reasons for a proposed approach",
      "45- or 60-minute private-pay sessions; rates and insurance details are below",
      "Free 15-minute consultation to discuss fit and practical questions"
    ],
    "uniqueContent": [
      "Therapy can draw on CBT for patterns of worry and avoidance, IFS for exploring internal conflict, psychodynamic work for recurring relational themes, or EMDR when memory-focused treatment is appropriate. We discuss the reason for an approach and review how it fits your goals.",
      "<a href=\"/services\">Compare the therapy approaches offered at Bayside.</a> <a href=\"/about\">Read about Marcus and his approach.</a> You can ask about experience relevant to your concern before deciding on care."
    ],
    "uniqueWhatToExpect": [
      "A free 15-minute consultation gives you room to describe what you need, ask questions, and discuss availability. It does not commit you to ongoing sessions.",
      "The first full appointment can explore making room for therapy at home, your history, and the concerns most important to you. You can ask questions about pace, methods, and what to do if something does not feel useful. Session length is 45 or 60 minutes; check current scheduling options when booking.",
      "There is no fixed number of sessions or promised outcome. We can review what is changing, what remains difficult, and whether to adjust the approach, frequency, or plan for care."
    ],
    "uniqueFaqs": [
      {
        "q": "Is an in-person appointment available in Alameda?",
        "a": "Bayside provides virtual individual therapy rather than an Alameda office appointment. You need a private, suitable setting in California for sessions."
      },
      {
        "q": "Are these in-person appointments in Alameda?",
        "a": "No. Bayside provides virtual individual therapy. You can attend from a private, suitable setting in Alameda or elsewhere in California; your physical location matters for every appointment."
      },
      {
        "q": "How much do sessions cost, and can I use insurance?",
        "a": "Sessions are $210 for 45 minutes or $280 for 60 minutes. Bayside is a private-pay practice and does not bill insurance directly. A superbill is available for possible out-of-network reimbursement; eligibility and payment depend on your plan."
      },
      {
        "q": "How many sessions will I need?",
        "a": "There is no fixed number of sessions or promised outcome. We can review what is changing, what remains difficult, and whether to adjust the approach, frequency, or plan for care."
      }
    ],
    "contentHeading": "Making room for therapy at home"
  },
  "therapy-emeryville": {
    "city": "Emeryville",
    "state": "CA",
    "slug": "therapy-emeryville",
    "title": "Individual Therapy for Emeryville Residents",
    "metaTitle": "Therapy in Emeryville | Virtual Sessions",
    "metaDescription": "Therapy for adults in Emeryville, CA. When the same concern keeps returning. Virtual sessions with Marcus Ghiasi, LMFT. Free consultation.",
    "h1": "Individual Therapy for Adults in Emeryville, CA",
    "intro": "You may have found ways to cope while still returning to a familiar argument, worry, or withdrawal. We can look at when it happens, what you have tried, and what a useful change would look like. Bayside offers virtual individual therapy to adults in Emeryville who are physically in California for sessions.",
    "localContent": "Marcus Ghiasi is a California Licensed Marriage and Family Therapist, license #158475. Bayside is based in Oakland. Sessions for Emeryville residents take place online from a private setting in California. A place to work on anxiety, low mood, trauma-related concerns, relationships, and life transitions.",
    "whyChoose": [
      "Individual sessions with Marcus Ghiasi, LMFT, California license #158475",
      "Virtual access for Emeryville residents; you must be in California for appointments",
      "A conversation about goals, preferences, and the reasons for a proposed approach",
      "45- or 60-minute private-pay sessions; rates and insurance details are below",
      "Free 15-minute consultation to discuss fit and practical questions"
    ],
    "uniqueContent": [
      "Therapy can draw on CBT for patterns of worry and avoidance, IFS for exploring internal conflict, psychodynamic work for recurring relational themes, or EMDR when memory-focused treatment is appropriate. We discuss the reason for an approach and review how it fits your goals.",
      "<a href=\"/services\">Compare the therapy approaches offered at Bayside.</a> <a href=\"/about\">Read about Marcus and his approach.</a> You can ask about experience relevant to your concern before deciding on care."
    ],
    "uniqueWhatToExpect": [
      "A free 15-minute consultation gives you room to describe what you need, ask questions, and discuss availability. It does not commit you to ongoing sessions.",
      "The first full appointment can explore when the same concern keeps returning, your history, and the concerns most important to you. You can ask questions about pace, methods, and what to do if something does not feel useful. Session length is 45 or 60 minutes; check current scheduling options when booking.",
      "There is no fixed number of sessions or promised outcome. We can review what is changing, what remains difficult, and whether to adjust the approach, frequency, or plan for care."
    ],
    "uniqueFaqs": [
      {
        "q": "Does a recurring pattern mean previous therapy failed?",
        "a": "No. Previous work may have helped in important ways. We can discuss what you want to build on and what still needs attention rather than dismissing earlier care."
      },
      {
        "q": "Are these in-person appointments in Emeryville?",
        "a": "No. Bayside provides virtual individual therapy. You can attend from a private, suitable setting in Emeryville or elsewhere in California; your physical location matters for every appointment."
      },
      {
        "q": "How much do sessions cost, and can I use insurance?",
        "a": "Sessions are $210 for 45 minutes or $280 for 60 minutes. Bayside is a private-pay practice and does not bill insurance directly. A superbill is available for possible out-of-network reimbursement; eligibility and payment depend on your plan."
      },
      {
        "q": "How many sessions will I need?",
        "a": "There is no fixed number of sessions or promised outcome. We can review what is changing, what remains difficult, and whether to adjust the approach, frequency, or plan for care."
      }
    ],
    "contentHeading": "When the same concern keeps returning"
  },
  "therapy-piedmont": {
    "city": "Piedmont",
    "state": "CA",
    "slug": "therapy-piedmont",
    "title": "Individual Therapy for Piedmont Residents",
    "metaTitle": "Therapy in Piedmont | Virtual Sessions",
    "metaDescription": "Therapy for adults in Piedmont, CA. Separating goals from pressure. Virtual sessions with Marcus Ghiasi, LMFT. Free consultation.",
    "h1": "Individual Therapy for Adults in Piedmont, CA",
    "intro": "It can be difficult to tell what you want from what you feel expected to want. Therapy offers a place to examine competing priorities and consider a next step without requiring a dramatic life change. Bayside offers virtual individual therapy to adults in Piedmont who are physically in California for sessions.",
    "localContent": "Marcus Ghiasi is a California Licensed Marriage and Family Therapist, license #158475. Bayside is based in Oakland. Sessions for Piedmont residents take place online from a private setting in California. A place to work on anxiety, low mood, trauma-related concerns, relationships, and life transitions.",
    "whyChoose": [
      "Individual sessions with Marcus Ghiasi, LMFT, California license #158475",
      "Virtual access for Piedmont residents; you must be in California for appointments",
      "A conversation about goals, preferences, and the reasons for a proposed approach",
      "45- or 60-minute private-pay sessions; rates and insurance details are below",
      "Free 15-minute consultation to discuss fit and practical questions"
    ],
    "uniqueContent": [
      "Therapy can draw on CBT for patterns of worry and avoidance, IFS for exploring internal conflict, psychodynamic work for recurring relational themes, or EMDR when memory-focused treatment is appropriate. We discuss the reason for an approach and review how it fits your goals.",
      "<a href=\"/services\">Compare the therapy approaches offered at Bayside.</a> <a href=\"/about\">Read about Marcus and his approach.</a> You can ask about experience relevant to your concern before deciding on care."
    ],
    "uniqueWhatToExpect": [
      "A free 15-minute consultation gives you room to describe what you need, ask questions, and discuss availability. It does not commit you to ongoing sessions.",
      "The first full appointment can explore separating goals from pressure, your history, and the concerns most important to you. You can ask questions about pace, methods, and what to do if something does not feel useful. Session length is 45 or 60 minutes; check current scheduling options when booking.",
      "There is no fixed number of sessions or promised outcome. We can review what is changing, what remains difficult, and whether to adjust the approach, frequency, or plan for care."
    ],
    "uniqueFaqs": [
      {
        "q": "Will you tell me which decision to make?",
        "a": "The work is collaborative. We can examine options, patterns, and consequences while leaving decisions about your life with you."
      },
      {
        "q": "Are these in-person appointments in Piedmont?",
        "a": "No. Bayside provides virtual individual therapy. You can attend from a private, suitable setting in Piedmont or elsewhere in California; your physical location matters for every appointment."
      },
      {
        "q": "How much do sessions cost, and can I use insurance?",
        "a": "Sessions are $210 for 45 minutes or $280 for 60 minutes. Bayside is a private-pay practice and does not bill insurance directly. A superbill is available for possible out-of-network reimbursement; eligibility and payment depend on your plan."
      },
      {
        "q": "How many sessions will I need?",
        "a": "There is no fixed number of sessions or promised outcome. We can review what is changing, what remains difficult, and whether to adjust the approach, frequency, or plan for care."
      }
    ],
    "contentHeading": "Separating goals from pressure"
  },
  "therapy-san-leandro": {
    "city": "San Leandro",
    "state": "CA",
    "slug": "therapy-san-leandro",
    "title": "Individual Therapy for San Leandro Residents",
    "metaTitle": "Therapy in San Leandro | Virtual Sessions",
    "metaDescription": "Therapy for adults in San Leandro, CA. Taking the first conversation seriously. Virtual sessions with Marcus Ghiasi, LMFT. Free consultation.",
    "h1": "Individual Therapy for Adults in San Leandro, CA",
    "intro": "A consultation can be useful even when you are undecided. Bring questions about approach, availability, cost, and whether your concerns fit the practice. You are allowed to take time after the conversation to decide. Bayside offers virtual individual therapy to adults in San Leandro who are physically in California for sessions.",
    "localContent": "Marcus Ghiasi is a California Licensed Marriage and Family Therapist, license #158475. Bayside is based in Oakland. Sessions for San Leandro residents take place online from a private setting in California. A place to work on anxiety, low mood, trauma-related concerns, relationships, and life transitions.",
    "whyChoose": [
      "Individual sessions with Marcus Ghiasi, LMFT, California license #158475",
      "Virtual access for San Leandro residents; you must be in California for appointments",
      "A conversation about goals, preferences, and the reasons for a proposed approach",
      "45- or 60-minute private-pay sessions; rates and insurance details are below",
      "Free 15-minute consultation to discuss fit and practical questions"
    ],
    "uniqueContent": [
      "Therapy can draw on CBT for patterns of worry and avoidance, IFS for exploring internal conflict, psychodynamic work for recurring relational themes, or EMDR when memory-focused treatment is appropriate. We discuss the reason for an approach and review how it fits your goals.",
      "<a href=\"/services\">Compare the therapy approaches offered at Bayside.</a> <a href=\"/about\">Read about Marcus and his approach.</a> You can ask about experience relevant to your concern before deciding on care."
    ],
    "uniqueWhatToExpect": [
      "A free 15-minute consultation gives you room to describe what you need, ask questions, and discuss availability. It does not commit you to ongoing sessions.",
      "The first full appointment can explore taking the first conversation seriously, your history, and the concerns most important to you. You can ask questions about pace, methods, and what to do if something does not feel useful. Session length is 45 or 60 minutes; check current scheduling options when booking.",
      "There is no fixed number of sessions or promised outcome. We can review what is changing, what remains difficult, and whether to adjust the approach, frequency, or plan for care."
    ],
    "uniqueFaqs": [
      {
        "q": "What should I prepare for the consultation?",
        "a": "A brief description of what brings you in and any practical questions is enough. You do not need a complete history or a polished explanation."
      },
      {
        "q": "Are these in-person appointments in San Leandro?",
        "a": "No. Bayside provides virtual individual therapy. You can attend from a private, suitable setting in San Leandro or elsewhere in California; your physical location matters for every appointment."
      },
      {
        "q": "How much do sessions cost, and can I use insurance?",
        "a": "Sessions are $210 for 45 minutes or $280 for 60 minutes. Bayside is a private-pay practice and does not bill insurance directly. A superbill is available for possible out-of-network reimbursement; eligibility and payment depend on your plan."
      },
      {
        "q": "How many sessions will I need?",
        "a": "There is no fixed number of sessions or promised outcome. We can review what is changing, what remains difficult, and whether to adjust the approach, frequency, or plan for care."
      }
    ],
    "contentHeading": "Taking the first conversation seriously"
  },
  "therapy-hayward": {
    "city": "Hayward",
    "state": "CA",
    "slug": "therapy-hayward",
    "title": "Individual Therapy for Hayward Residents",
    "metaTitle": "Therapy in Hayward | Virtual Sessions",
    "metaDescription": "Therapy for adults in Hayward, CA. Recognizing stress without minimizing it. Virtual sessions with Marcus Ghiasi, LMFT. Free consultation.",
    "h1": "Individual Therapy for Adults in Hayward, CA",
    "intro": "You may be keeping up with responsibilities while feeling strained, irritable, or disconnected. Therapy can help explore what that strain involves and what support would be appropriate before deciding on a label. Bayside offers virtual individual therapy to adults in Hayward who are physically in California for sessions.",
    "localContent": "Marcus Ghiasi is a California Licensed Marriage and Family Therapist, license #158475. Bayside is based in Oakland. Sessions for Hayward residents take place online from a private setting in California. A place to work on anxiety, low mood, trauma-related concerns, relationships, and life transitions.",
    "whyChoose": [
      "Individual sessions with Marcus Ghiasi, LMFT, California license #158475",
      "Virtual access for Hayward residents; you must be in California for appointments",
      "A conversation about goals, preferences, and the reasons for a proposed approach",
      "45- or 60-minute private-pay sessions; rates and insurance details are below",
      "Free 15-minute consultation to discuss fit and practical questions"
    ],
    "uniqueContent": [
      "Therapy can draw on CBT for patterns of worry and avoidance, IFS for exploring internal conflict, psychodynamic work for recurring relational themes, or EMDR when memory-focused treatment is appropriate. We discuss the reason for an approach and review how it fits your goals.",
      "<a href=\"/services\">Compare the therapy approaches offered at Bayside.</a> <a href=\"/about\">Read about Marcus and his approach.</a> You can ask about experience relevant to your concern before deciding on care."
    ],
    "uniqueWhatToExpect": [
      "A free 15-minute consultation gives you room to describe what you need, ask questions, and discuss availability. It does not commit you to ongoing sessions.",
      "The first full appointment can explore recognizing stress without minimizing it, your history, and the concerns most important to you. You can ask questions about pace, methods, and what to do if something does not feel useful. Session length is 45 or 60 minutes; check current scheduling options when booking.",
      "There is no fixed number of sessions or promised outcome. We can review what is changing, what remains difficult, and whether to adjust the approach, frequency, or plan for care."
    ],
    "uniqueFaqs": [
      {
        "q": "Do I need to be unable to work before asking for help?",
        "a": "No. Outward functioning does not capture every difficulty. You can seek support for distress even when you continue meeting obligations."
      },
      {
        "q": "Are these in-person appointments in Hayward?",
        "a": "No. Bayside provides virtual individual therapy. You can attend from a private, suitable setting in Hayward or elsewhere in California; your physical location matters for every appointment."
      },
      {
        "q": "How much do sessions cost, and can I use insurance?",
        "a": "Sessions are $210 for 45 minutes or $280 for 60 minutes. Bayside is a private-pay practice and does not bill insurance directly. A superbill is available for possible out-of-network reimbursement; eligibility and payment depend on your plan."
      },
      {
        "q": "How many sessions will I need?",
        "a": "There is no fixed number of sessions or promised outcome. We can review what is changing, what remains difficult, and whether to adjust the approach, frequency, or plan for care."
      }
    ],
    "contentHeading": "Recognizing stress without minimizing it"
  },
  "therapy-fremont": {
    "city": "Fremont",
    "state": "CA",
    "slug": "therapy-fremont",
    "title": "Individual Therapy for Fremont Residents",
    "metaTitle": "Therapy in Fremont | Virtual Sessions",
    "metaDescription": "Therapy for adults in Fremont, CA. Considering family and personal priorities. Virtual sessions with Marcus Ghiasi, LMFT. Free consultation.",
    "h1": "Individual Therapy for Adults in Fremont, CA",
    "intro": "Care for family and a need for autonomy can both matter. We can explore expectations, obligations, and boundaries without assuming there is a single right way to be independent. Bayside offers virtual individual therapy to adults in Fremont who are physically in California for sessions.",
    "localContent": "Marcus Ghiasi is a California Licensed Marriage and Family Therapist, license #158475. Bayside is based in Oakland. Sessions for Fremont residents take place online from a private setting in California. A place to work on anxiety, low mood, trauma-related concerns, relationships, and life transitions.",
    "whyChoose": [
      "Individual sessions with Marcus Ghiasi, LMFT, California license #158475",
      "Virtual access for Fremont residents; you must be in California for appointments",
      "A conversation about goals, preferences, and the reasons for a proposed approach",
      "45- or 60-minute private-pay sessions; rates and insurance details are below",
      "Free 15-minute consultation to discuss fit and practical questions"
    ],
    "uniqueContent": [
      "Therapy can draw on CBT for patterns of worry and avoidance, IFS for exploring internal conflict, psychodynamic work for recurring relational themes, or EMDR when memory-focused treatment is appropriate. We discuss the reason for an approach and review how it fits your goals.",
      "<a href=\"/services\">Compare the therapy approaches offered at Bayside.</a> <a href=\"/about\">Read about Marcus and his approach.</a> You can ask about experience relevant to your concern before deciding on care."
    ],
    "uniqueWhatToExpect": [
      "A free 15-minute consultation gives you room to describe what you need, ask questions, and discuss availability. It does not commit you to ongoing sessions.",
      "The first full appointment can explore considering family and personal priorities, your history, and the concerns most important to you. You can ask questions about pace, methods, and what to do if something does not feel useful. Session length is 45 or 60 minutes; check current scheduling options when booking.",
      "There is no fixed number of sessions or promised outcome. We can review what is changing, what remains difficult, and whether to adjust the approach, frequency, or plan for care."
    ],
    "uniqueFaqs": [
      {
        "q": "Can cultural context be part of sessions?",
        "a": "Yes. You can discuss the meaning of culture, family, and identity in your life. Those influences are explored with you, not presumed from where you live or how you identify."
      },
      {
        "q": "Are these in-person appointments in Fremont?",
        "a": "No. Bayside provides virtual individual therapy. You can attend from a private, suitable setting in Fremont or elsewhere in California; your physical location matters for every appointment."
      },
      {
        "q": "How much do sessions cost, and can I use insurance?",
        "a": "Sessions are $210 for 45 minutes or $280 for 60 minutes. Bayside is a private-pay practice and does not bill insurance directly. A superbill is available for possible out-of-network reimbursement; eligibility and payment depend on your plan."
      },
      {
        "q": "How many sessions will I need?",
        "a": "There is no fixed number of sessions or promised outcome. We can review what is changing, what remains difficult, and whether to adjust the approach, frequency, or plan for care."
      }
    ],
    "contentHeading": "Considering family and personal priorities"
  },
  "therapy-pleasanton": {
    "city": "Pleasanton",
    "state": "CA",
    "slug": "therapy-pleasanton",
    "title": "Individual Therapy for Pleasanton Residents",
    "metaTitle": "Therapy in Pleasanton | Virtual Sessions",
    "metaDescription": "Therapy for adults in Pleasanton, CA. Discussing cost before committing. Virtual sessions with Marcus Ghiasi, LMFT. Free consultation.",
    "h1": "Individual Therapy for Adults in Pleasanton, CA",
    "intro": "A therapy plan needs to fit your finances as well as your clinical needs. You can ask about session length, frequency, and payment before starting rather than waiting until cost becomes a source of stress. Bayside offers virtual individual therapy to adults in Pleasanton who are physically in California for sessions.",
    "localContent": "Marcus Ghiasi is a California Licensed Marriage and Family Therapist, license #158475. Bayside is based in Oakland. Sessions for Pleasanton residents take place online from a private setting in California. A place to work on anxiety, low mood, trauma-related concerns, relationships, and life transitions.",
    "whyChoose": [
      "Individual sessions with Marcus Ghiasi, LMFT, California license #158475",
      "Virtual access for Pleasanton residents; you must be in California for appointments",
      "A conversation about goals, preferences, and the reasons for a proposed approach",
      "45- or 60-minute private-pay sessions; rates and insurance details are below",
      "Free 15-minute consultation to discuss fit and practical questions"
    ],
    "uniqueContent": [
      "Therapy can draw on CBT for patterns of worry and avoidance, IFS for exploring internal conflict, psychodynamic work for recurring relational themes, or EMDR when memory-focused treatment is appropriate. We discuss the reason for an approach and review how it fits your goals.",
      "<a href=\"/services\">Compare the therapy approaches offered at Bayside.</a> <a href=\"/about\">Read about Marcus and his approach.</a> You can ask about experience relevant to your concern before deciding on care."
    ],
    "uniqueWhatToExpect": [
      "A free 15-minute consultation gives you room to describe what you need, ask questions, and discuss availability. It does not commit you to ongoing sessions.",
      "The first full appointment can explore discussing cost before committing, your history, and the concerns most important to you. You can ask questions about pace, methods, and what to do if something does not feel useful. Session length is 45 or 60 minutes; check current scheduling options when booking.",
      "There is no fixed number of sessions or promised outcome. We can review what is changing, what remains difficult, and whether to adjust the approach, frequency, or plan for care."
    ],
    "uniqueFaqs": [
      {
        "q": "Does a superbill guarantee insurance reimbursement?",
        "a": "No. Your plan determines coverage, deductible requirements, and reimbursement. Ask your insurer about out-of-network mental health benefits before relying on payment."
      },
      {
        "q": "Are these in-person appointments in Pleasanton?",
        "a": "No. Bayside provides virtual individual therapy. You can attend from a private, suitable setting in Pleasanton or elsewhere in California; your physical location matters for every appointment."
      },
      {
        "q": "How much do sessions cost, and can I use insurance?",
        "a": "Sessions are $210 for 45 minutes or $280 for 60 minutes. Bayside is a private-pay practice and does not bill insurance directly. A superbill is available for possible out-of-network reimbursement; eligibility and payment depend on your plan."
      },
      {
        "q": "How many sessions will I need?",
        "a": "There is no fixed number of sessions or promised outcome. We can review what is changing, what remains difficult, and whether to adjust the approach, frequency, or plan for care."
      }
    ],
    "contentHeading": "Discussing cost before committing"
  },
  "therapy-walnut-creek": {
    "city": "Walnut Creek",
    "state": "CA",
    "slug": "therapy-walnut-creek",
    "title": "Individual Therapy for Walnut Creek Residents",
    "metaTitle": "Therapy in Walnut Creek | Virtual Sessions",
    "metaDescription": "Therapy for adults in Walnut Creek, CA. Finding a private place for online sessions. Virtual sessions with Marcus Ghiasi, LMFT. Free consultation.",
    "h1": "Individual Therapy for Adults in Walnut Creek, CA",
    "intro": "Telehealth removes travel but still asks for time and privacy. Consider interruptions, whether you can be overheard, and a few minutes to settle before and after the session. A moving car or public setting is not a suitable substitute. Bayside offers virtual individual therapy to adults in Walnut Creek who are physically in California for sessions.",
    "localContent": "Marcus Ghiasi is a California Licensed Marriage and Family Therapist, license #158475. Bayside is based in Oakland. Sessions for Walnut Creek residents take place online from a private setting in California. A place to work on anxiety, low mood, trauma-related concerns, relationships, and life transitions.",
    "whyChoose": [
      "Individual sessions with Marcus Ghiasi, LMFT, California license #158475",
      "Virtual access for Walnut Creek residents; you must be in California for appointments",
      "A conversation about goals, preferences, and the reasons for a proposed approach",
      "45- or 60-minute private-pay sessions; rates and insurance details are below",
      "Free 15-minute consultation to discuss fit and practical questions"
    ],
    "uniqueContent": [
      "Therapy can draw on CBT for patterns of worry and avoidance, IFS for exploring internal conflict, psychodynamic work for recurring relational themes, or EMDR when memory-focused treatment is appropriate. We discuss the reason for an approach and review how it fits your goals.",
      "<a href=\"/services\">Compare the therapy approaches offered at Bayside.</a> <a href=\"/about\">Read about Marcus and his approach.</a> You can ask about experience relevant to your concern before deciding on care."
    ],
    "uniqueWhatToExpect": [
      "A free 15-minute consultation gives you room to describe what you need, ask questions, and discuss availability. It does not commit you to ongoing sessions.",
      "The first full appointment can explore finding a private place for online sessions, your history, and the concerns most important to you. You can ask questions about pace, methods, and what to do if something does not feel useful. Session length is 45 or 60 minutes; check current scheduling options when booking.",
      "There is no fixed number of sessions or promised outcome. We can review what is changing, what remains difficult, and whether to adjust the approach, frequency, or plan for care."
    ],
    "uniqueFaqs": [
      {
        "q": "Can I attend from my workplace?",
        "a": "Only if you have a private, suitable setting in California and can participate without interruptions or work obligations. We can discuss whether your proposed setup is workable."
      },
      {
        "q": "Are these in-person appointments in Walnut Creek?",
        "a": "No. Bayside provides virtual individual therapy. You can attend from a private, suitable setting in Walnut Creek or elsewhere in California; your physical location matters for every appointment."
      },
      {
        "q": "How much do sessions cost, and can I use insurance?",
        "a": "Sessions are $210 for 45 minutes or $280 for 60 minutes. Bayside is a private-pay practice and does not bill insurance directly. A superbill is available for possible out-of-network reimbursement; eligibility and payment depend on your plan."
      },
      {
        "q": "How many sessions will I need?",
        "a": "There is no fixed number of sessions or promised outcome. We can review what is changing, what remains difficult, and whether to adjust the approach, frequency, or plan for care."
      }
    ],
    "contentHeading": "Finding a private place for online sessions"
  },
  "therapy-concord": {
    "city": "Concord",
    "state": "CA",
    "slug": "therapy-concord",
    "title": "Individual Therapy for Concord Residents",
    "metaTitle": "Therapy in Concord | Virtual Sessions",
    "metaDescription": "Therapy for adults in Concord, CA. What the first full session can cover. Virtual sessions with Marcus Ghiasi, LMFT. Free consultation.",
    "h1": "Individual Therapy for Adults in Concord, CA",
    "intro": "The first appointment gives more room to discuss history, current concerns, and what you want help with. It can also clarify whether the practice is the right level and type of support for your needs. Bayside offers virtual individual therapy to adults in Concord who are physically in California for sessions.",
    "localContent": "Marcus Ghiasi is a California Licensed Marriage and Family Therapist, license #158475. Bayside is based in Oakland. Sessions for Concord residents take place online from a private setting in California. A place to work on anxiety, low mood, trauma-related concerns, relationships, and life transitions.",
    "whyChoose": [
      "Individual sessions with Marcus Ghiasi, LMFT, California license #158475",
      "Virtual access for Concord residents; you must be in California for appointments",
      "A conversation about goals, preferences, and the reasons for a proposed approach",
      "45- or 60-minute private-pay sessions; rates and insurance details are below",
      "Free 15-minute consultation to discuss fit and practical questions"
    ],
    "uniqueContent": [
      "Therapy can draw on CBT for patterns of worry and avoidance, IFS for exploring internal conflict, psychodynamic work for recurring relational themes, or EMDR when memory-focused treatment is appropriate. We discuss the reason for an approach and review how it fits your goals.",
      "<a href=\"/services\">Compare the therapy approaches offered at Bayside.</a> <a href=\"/about\">Read about Marcus and his approach.</a> You can ask about experience relevant to your concern before deciding on care."
    ],
    "uniqueWhatToExpect": [
      "A free 15-minute consultation gives you room to describe what you need, ask questions, and discuss availability. It does not commit you to ongoing sessions.",
      "The first full appointment can explore what the first full session can cover, your history, and the concerns most important to you. You can ask questions about pace, methods, and what to do if something does not feel useful. Session length is 45 or 60 minutes; check current scheduling options when booking.",
      "There is no fixed number of sessions or promised outcome. We can review what is changing, what remains difficult, and whether to adjust the approach, frequency, or plan for care."
    ],
    "uniqueFaqs": [
      {
        "q": "Will treatment begin with a specific technique immediately?",
        "a": "Not necessarily. Assessment and planning come first. You can ask how a proposed method relates to your goals before deciding to try it."
      },
      {
        "q": "Are these in-person appointments in Concord?",
        "a": "No. Bayside provides virtual individual therapy. You can attend from a private, suitable setting in Concord or elsewhere in California; your physical location matters for every appointment."
      },
      {
        "q": "How much do sessions cost, and can I use insurance?",
        "a": "Sessions are $210 for 45 minutes or $280 for 60 minutes. Bayside is a private-pay practice and does not bill insurance directly. A superbill is available for possible out-of-network reimbursement; eligibility and payment depend on your plan."
      },
      {
        "q": "How many sessions will I need?",
        "a": "There is no fixed number of sessions or promised outcome. We can review what is changing, what remains difficult, and whether to adjust the approach, frequency, or plan for care."
      }
    ],
    "contentHeading": "What the first full session can cover"
  },
  "therapy-richmond": {
    "city": "Richmond",
    "state": "CA",
    "slug": "therapy-richmond",
    "title": "Individual Therapy for Richmond Residents",
    "metaTitle": "Therapy in Richmond | Virtual Sessions",
    "metaDescription": "Therapy for adults in Richmond, CA. When self-criticism makes change harder. Virtual sessions with Marcus Ghiasi, LMFT. Free consultation.",
    "h1": "Individual Therapy for Adults in Richmond, CA",
    "intro": "A harsh internal standard may leave little room to learn from a mistake. Therapy can help examine how you respond to yourself and practice a more useful response without asking you to abandon responsibility. Bayside offers virtual individual therapy to adults in Richmond who are physically in California for sessions.",
    "localContent": "Marcus Ghiasi is a California Licensed Marriage and Family Therapist, license #158475. Bayside is based in Oakland. Sessions for Richmond residents take place online from a private setting in California. A place to work on anxiety, low mood, trauma-related concerns, relationships, and life transitions.",
    "whyChoose": [
      "Individual sessions with Marcus Ghiasi, LMFT, California license #158475",
      "Virtual access for Richmond residents; you must be in California for appointments",
      "A conversation about goals, preferences, and the reasons for a proposed approach",
      "45- or 60-minute private-pay sessions; rates and insurance details are below",
      "Free 15-minute consultation to discuss fit and practical questions"
    ],
    "uniqueContent": [
      "Therapy can draw on CBT for patterns of worry and avoidance, IFS for exploring internal conflict, psychodynamic work for recurring relational themes, or EMDR when memory-focused treatment is appropriate. We discuss the reason for an approach and review how it fits your goals.",
      "<a href=\"/services\">Compare the therapy approaches offered at Bayside.</a> <a href=\"/about\">Read about Marcus and his approach.</a> You can ask about experience relevant to your concern before deciding on care."
    ],
    "uniqueWhatToExpect": [
      "A free 15-minute consultation gives you room to describe what you need, ask questions, and discuss availability. It does not commit you to ongoing sessions.",
      "The first full appointment can explore when self-criticism makes change harder, your history, and the concerns most important to you. You can ask questions about pace, methods, and what to do if something does not feel useful. Session length is 45 or 60 minutes; check current scheduling options when booking.",
      "There is no fixed number of sessions or promised outcome. We can review what is changing, what remains difficult, and whether to adjust the approach, frequency, or plan for care."
    ],
    "uniqueFaqs": [
      {
        "q": "Can we work on self-criticism without calling every thought wrong?",
        "a": "Yes. We can explore what the criticism is trying to accomplish, its costs, and alternatives that fit your values."
      },
      {
        "q": "Are these in-person appointments in Richmond?",
        "a": "No. Bayside provides virtual individual therapy. You can attend from a private, suitable setting in Richmond or elsewhere in California; your physical location matters for every appointment."
      },
      {
        "q": "How much do sessions cost, and can I use insurance?",
        "a": "Sessions are $210 for 45 minutes or $280 for 60 minutes. Bayside is a private-pay practice and does not bill insurance directly. A superbill is available for possible out-of-network reimbursement; eligibility and payment depend on your plan."
      },
      {
        "q": "How many sessions will I need?",
        "a": "There is no fixed number of sessions or promised outcome. We can review what is changing, what remains difficult, and whether to adjust the approach, frequency, or plan for care."
      }
    ],
    "contentHeading": "When self-criticism makes change harder"
  },
  "therapy-pleasant-hill": {
    "city": "Pleasant Hill",
    "state": "CA",
    "slug": "therapy-pleasant-hill",
    "title": "Individual Therapy for Pleasant Hill Residents",
    "metaTitle": "Therapy in Pleasant Hill | Virtual Sessions",
    "metaDescription": "Therapy for adults in Pleasant Hill, CA. Noticing progress in ordinary life. Virtual sessions with Marcus Ghiasi, LMFT. Free consultation.",
    "h1": "Individual Therapy for Adults in Pleasant Hill, CA",
    "intro": "Progress may involve handling a conversation differently, returning to an activity, or recovering from a difficult moment with more flexibility. We can choose signs that matter to you rather than treating insight alone as the endpoint. Bayside offers virtual individual therapy to adults in Pleasant Hill who are physically in California for sessions.",
    "localContent": "Marcus Ghiasi is a California Licensed Marriage and Family Therapist, license #158475. Bayside is based in Oakland. Sessions for Pleasant Hill residents take place online from a private setting in California. A place to work on anxiety, low mood, trauma-related concerns, relationships, and life transitions.",
    "whyChoose": [
      "Individual sessions with Marcus Ghiasi, LMFT, California license #158475",
      "Virtual access for Pleasant Hill residents; you must be in California for appointments",
      "A conversation about goals, preferences, and the reasons for a proposed approach",
      "45- or 60-minute private-pay sessions; rates and insurance details are below",
      "Free 15-minute consultation to discuss fit and practical questions"
    ],
    "uniqueContent": [
      "Therapy can draw on CBT for patterns of worry and avoidance, IFS for exploring internal conflict, psychodynamic work for recurring relational themes, or EMDR when memory-focused treatment is appropriate. We discuss the reason for an approach and review how it fits your goals.",
      "<a href=\"/services\">Compare the therapy approaches offered at Bayside.</a> <a href=\"/about\">Read about Marcus and his approach.</a> You can ask about experience relevant to your concern before deciding on care."
    ],
    "uniqueWhatToExpect": [
      "A free 15-minute consultation gives you room to describe what you need, ask questions, and discuss availability. It does not commit you to ongoing sessions.",
      "The first full appointment can explore noticing progress in ordinary life, your history, and the concerns most important to you. You can ask questions about pace, methods, and what to do if something does not feel useful. Session length is 45 or 60 minutes; check current scheduling options when booking.",
      "There is no fixed number of sessions or promised outcome. We can review what is changing, what remains difficult, and whether to adjust the approach, frequency, or plan for care."
    ],
    "uniqueFaqs": [
      {
        "q": "What if I am unsure whether therapy is helping?",
        "a": "Bring that into the session. We can review the focus, pace, and approach and discuss changes or other care options if needed."
      },
      {
        "q": "Are these in-person appointments in Pleasant Hill?",
        "a": "No. Bayside provides virtual individual therapy. You can attend from a private, suitable setting in Pleasant Hill or elsewhere in California; your physical location matters for every appointment."
      },
      {
        "q": "How much do sessions cost, and can I use insurance?",
        "a": "Sessions are $210 for 45 minutes or $280 for 60 minutes. Bayside is a private-pay practice and does not bill insurance directly. A superbill is available for possible out-of-network reimbursement; eligibility and payment depend on your plan."
      },
      {
        "q": "How many sessions will I need?",
        "a": "There is no fixed number of sessions or promised outcome. We can review what is changing, what remains difficult, and whether to adjust the approach, frequency, or plan for care."
      }
    ],
    "contentHeading": "Noticing progress in ordinary life"
  },
  "depression-therapy-san-francisco": {
    "city": "San Francisco",
    "state": "CA",
    "slug": "depression-therapy-san-francisco",
    "title": "Depression Therapy for San Francisco Residents",
    "metaTitle": "Depression Therapy in San Francisco | Virtual Sessions",
    "metaDescription": "Depression Therapy for adults in San Francisco, CA. When daily tasks take more effort. Virtual sessions with Marcus Ghiasi, LMFT. Free consultation.",
    "h1": "Depression Therapy for Adults in San Francisco, CA",
    "intro": "Getting out of bed, answering messages, or making a meal can become difficult even when you want to do them. We can choose small steps that respect your current capacity and look at what support is missing. Bayside offers virtual individual therapy to adults in San Francisco who are physically in California for sessions.",
    "localContent": "Marcus Ghiasi is a California Licensed Marriage and Family Therapist, license #158475. Bayside is based in Oakland. Sessions for San Francisco residents take place online from a private setting in California. Individual support for low mood, withdrawal, loss of interest, and difficulty getting through daily life.",
    "whyChoose": [
      "Individual sessions with Marcus Ghiasi, LMFT, California license #158475",
      "Virtual access for San Francisco residents; you must be in California for appointments",
      "A conversation about goals, preferences, and the reasons for a proposed approach",
      "45- or 60-minute private-pay sessions; rates and insurance details are below",
      "Free 15-minute consultation to discuss fit and practical questions"
    ],
    "uniqueContent": [
      "We can look at mood, sleep, energy, relationships, and the routines that have become difficult. Work may include manageable activity, examining self-critical thoughts, and understanding losses or ongoing stress. Therapy can be one part of care; medication evaluation or other support may also be appropriate.",
      "<a href=\"/services/cbt\">Read about Cognitive Behavioral Therapy at Bayside.</a> The service overview explains the approach; a consultation can help clarify whether it fits your situation."
    ],
    "uniqueWhatToExpect": [
      "A free 15-minute consultation gives you room to describe what you need, ask questions, and discuss availability. It does not commit you to ongoing sessions.",
      "The first full appointment can explore when daily tasks take more effort, your history, and the concerns most important to you. You can ask questions about pace, methods, and what to do if something does not feel useful. Session length is 45 or 60 minutes; check current scheduling options when booking.",
      "There is no fixed number of sessions or promised outcome. We can review what is changing, what remains difficult, and whether to adjust the approach, frequency, or plan for care."
    ],
    "uniqueFaqs": [
      {
        "q": "Will I be expected to fix everything between sessions?",
        "a": "No. We can start with a manageable focus and adjust if a plan is too demanding. Difficulty following through is something to understand, not a character judgment."
      },
      {
        "q": "Are these in-person appointments in San Francisco?",
        "a": "No. Bayside provides virtual individual therapy. You can attend from a private, suitable setting in San Francisco or elsewhere in California; your physical location matters for every appointment."
      },
      {
        "q": "How much do sessions cost, and can I use insurance?",
        "a": "Sessions are $210 for 45 minutes or $280 for 60 minutes. Bayside is a private-pay practice and does not bill insurance directly. A superbill is available for possible out-of-network reimbursement; eligibility and payment depend on your plan."
      },
      {
        "q": "How many sessions will I need?",
        "a": "There is no fixed number of sessions or promised outcome. We can review what is changing, what remains difficult, and whether to adjust the approach, frequency, or plan for care."
      }
    ],
    "contentHeading": "When daily tasks take more effort"
  },
  "depression-therapy-oakland": {
    "city": "Oakland",
    "state": "CA",
    "slug": "depression-therapy-oakland",
    "title": "Depression Therapy for Oakland Residents",
    "metaTitle": "Depression Therapy in Oakland | Virtual Sessions",
    "metaDescription": "Depression Therapy for adults in Oakland, CA. When you keep functioning but feel disconnected. Virtual sessions with Marcus Ghiasi, LMFT. Free consultation.",
    "h1": "Depression Therapy for Adults in Oakland, CA",
    "intro": "Meeting obligations does not always reflect how you feel inside. Sessions can make room for numbness, irritability, or a loss of interest that other people may not notice. Bayside offers virtual individual therapy to adults in Oakland who are physically in California for sessions.",
    "localContent": "Marcus Ghiasi is a California Licensed Marriage and Family Therapist, license #158475. Bayside is based in Oakland and provides virtual individual sessions, rather than in-person office appointments. Individual support for low mood, withdrawal, loss of interest, and difficulty getting through daily life.",
    "whyChoose": [
      "Individual sessions with Marcus Ghiasi, LMFT, California license #158475",
      "Virtual access for Oakland residents; you must be in California for appointments",
      "A conversation about goals, preferences, and the reasons for a proposed approach",
      "45- or 60-minute private-pay sessions; rates and insurance details are below",
      "Free 15-minute consultation to discuss fit and practical questions"
    ],
    "uniqueContent": [
      "We can look at mood, sleep, energy, relationships, and the routines that have become difficult. Work may include manageable activity, examining self-critical thoughts, and understanding losses or ongoing stress. Therapy can be one part of care; medication evaluation or other support may also be appropriate.",
      "<a href=\"/services/cbt\">Read about Cognitive Behavioral Therapy at Bayside.</a> The service overview explains the approach; a consultation can help clarify whether it fits your situation."
    ],
    "uniqueWhatToExpect": [
      "A free 15-minute consultation gives you room to describe what you need, ask questions, and discuss availability. It does not commit you to ongoing sessions.",
      "The first full appointment can explore when you keep functioning but feel disconnected, your history, and the concerns most important to you. You can ask questions about pace, methods, and what to do if something does not feel useful. Session length is 45 or 60 minutes; check current scheduling options when booking.",
      "There is no fixed number of sessions or promised outcome. We can review what is changing, what remains difficult, and whether to adjust the approach, frequency, or plan for care."
    ],
    "uniqueFaqs": [
      {
        "q": "Can depression be present when I am still working?",
        "a": "Yes, difficulties can coexist with outward functioning. An assessment can help clarify the symptoms and what kind of care would be appropriate."
      },
      {
        "q": "Are these in-person appointments in Oakland?",
        "a": "No. Bayside provides virtual individual therapy. You can attend from a private, suitable setting in Oakland or elsewhere in California; your physical location matters for every appointment."
      },
      {
        "q": "How much do sessions cost, and can I use insurance?",
        "a": "Sessions are $210 for 45 minutes or $280 for 60 minutes. Bayside is a private-pay practice and does not bill insurance directly. A superbill is available for possible out-of-network reimbursement; eligibility and payment depend on your plan."
      },
      {
        "q": "How many sessions will I need?",
        "a": "There is no fixed number of sessions or promised outcome. We can review what is changing, what remains difficult, and whether to adjust the approach, frequency, or plan for care."
      }
    ],
    "contentHeading": "When you keep functioning but feel disconnected"
  },
  "depression-therapy-san-jose": {
    "city": "San Jose",
    "state": "CA",
    "slug": "depression-therapy-san-jose",
    "title": "Depression Therapy for San Jose Residents",
    "metaTitle": "Depression Therapy in San Jose | Virtual Sessions",
    "metaDescription": "Depression Therapy for adults in San Jose, CA. When withdrawal makes connection harder. Virtual sessions with Marcus Ghiasi, LMFT. Free consultation.",
    "h1": "Depression Therapy for Adults in San Jose, CA",
    "intro": "You may want company and still feel unable to reach out. We can explore what gets in the way and identify forms of contact that feel possible rather than treating a full social calendar as the goal. Bayside offers virtual individual therapy to adults in San Jose who are physically in California for sessions.",
    "localContent": "Marcus Ghiasi is a California Licensed Marriage and Family Therapist, license #158475. Bayside is based in Oakland. Sessions for San Jose residents take place online from a private setting in California. Individual support for low mood, withdrawal, loss of interest, and difficulty getting through daily life.",
    "whyChoose": [
      "Individual sessions with Marcus Ghiasi, LMFT, California license #158475",
      "Virtual access for San Jose residents; you must be in California for appointments",
      "A conversation about goals, preferences, and the reasons for a proposed approach",
      "45- or 60-minute private-pay sessions; rates and insurance details are below",
      "Free 15-minute consultation to discuss fit and practical questions"
    ],
    "uniqueContent": [
      "We can look at mood, sleep, energy, relationships, and the routines that have become difficult. Work may include manageable activity, examining self-critical thoughts, and understanding losses or ongoing stress. Therapy can be one part of care; medication evaluation or other support may also be appropriate.",
      "<a href=\"/services/cbt\">Read about Cognitive Behavioral Therapy at Bayside.</a> The service overview explains the approach; a consultation can help clarify whether it fits your situation."
    ],
    "uniqueWhatToExpect": [
      "A free 15-minute consultation gives you room to describe what you need, ask questions, and discuss availability. It does not commit you to ongoing sessions.",
      "The first full appointment can explore when withdrawal makes connection harder, your history, and the concerns most important to you. You can ask questions about pace, methods, and what to do if something does not feel useful. Session length is 45 or 60 minutes; check current scheduling options when booking.",
      "There is no fixed number of sessions or promised outcome. We can review what is changing, what remains difficult, and whether to adjust the approach, frequency, or plan for care."
    ],
    "uniqueFaqs": [
      {
        "q": "What if I do not know whether this is depression?",
        "a": "You do not need to diagnose yourself before starting. We can discuss what has changed, how long it has been happening, and whether additional evaluation is needed."
      },
      {
        "q": "Are these in-person appointments in San Jose?",
        "a": "No. Bayside provides virtual individual therapy. You can attend from a private, suitable setting in San Jose or elsewhere in California; your physical location matters for every appointment."
      },
      {
        "q": "How much do sessions cost, and can I use insurance?",
        "a": "Sessions are $210 for 45 minutes or $280 for 60 minutes. Bayside is a private-pay practice and does not bill insurance directly. A superbill is available for possible out-of-network reimbursement; eligibility and payment depend on your plan."
      },
      {
        "q": "How many sessions will I need?",
        "a": "There is no fixed number of sessions or promised outcome. We can review what is changing, what remains difficult, and whether to adjust the approach, frequency, or plan for care."
      }
    ],
    "contentHeading": "When withdrawal makes connection harder"
  },
  "depression-therapy-berkeley": {
    "city": "Berkeley",
    "state": "CA",
    "slug": "depression-therapy-berkeley",
    "title": "Depression Therapy for Berkeley Residents",
    "metaTitle": "Depression Therapy in Berkeley | Virtual Sessions",
    "metaDescription": "Depression Therapy for adults in Berkeley, CA. When self-criticism follows a loss or setback. Virtual sessions with Marcus Ghiasi, LMFT. Free consultation.",
    "h1": "Depression Therapy for Adults in Berkeley, CA",
    "intro": "A difficult event can become a harsh explanation of your worth. Therapy can help distinguish grief, disappointment, and self-blame while supporting daily functioning and connection. Bayside offers virtual individual therapy to adults in Berkeley who are physically in California for sessions.",
    "localContent": "Marcus Ghiasi is a California Licensed Marriage and Family Therapist, license #158475. Bayside is based in Oakland. Sessions for Berkeley residents take place online from a private setting in California. Individual support for low mood, withdrawal, loss of interest, and difficulty getting through daily life.",
    "whyChoose": [
      "Individual sessions with Marcus Ghiasi, LMFT, California license #158475",
      "Virtual access for Berkeley residents; you must be in California for appointments",
      "A conversation about goals, preferences, and the reasons for a proposed approach",
      "45- or 60-minute private-pay sessions; rates and insurance details are below",
      "Free 15-minute consultation to discuss fit and practical questions"
    ],
    "uniqueContent": [
      "We can look at mood, sleep, energy, relationships, and the routines that have become difficult. Work may include manageable activity, examining self-critical thoughts, and understanding losses or ongoing stress. Therapy can be one part of care; medication evaluation or other support may also be appropriate.",
      "<a href=\"/services/cbt\">Read about Cognitive Behavioral Therapy at Bayside.</a> The service overview explains the approach; a consultation can help clarify whether it fits your situation."
    ],
    "uniqueWhatToExpect": [
      "A free 15-minute consultation gives you room to describe what you need, ask questions, and discuss availability. It does not commit you to ongoing sessions.",
      "The first full appointment can explore when self-criticism follows a loss or setback, your history, and the concerns most important to you. You can ask questions about pace, methods, and what to do if something does not feel useful. Session length is 45 or 60 minutes; check current scheduling options when booking.",
      "There is no fixed number of sessions or promised outcome. We can review what is changing, what remains difficult, and whether to adjust the approach, frequency, or plan for care."
    ],
    "uniqueFaqs": [
      {
        "q": "Can therapy and medication be used together?",
        "a": "They can be, depending on your needs and preferences. Marcus does not prescribe medication; a qualified medical clinician can assess that option."
      },
      {
        "q": "Are these in-person appointments in Berkeley?",
        "a": "No. Bayside provides virtual individual therapy. You can attend from a private, suitable setting in Berkeley or elsewhere in California; your physical location matters for every appointment."
      },
      {
        "q": "How much do sessions cost, and can I use insurance?",
        "a": "Sessions are $210 for 45 minutes or $280 for 60 minutes. Bayside is a private-pay practice and does not bill insurance directly. A superbill is available for possible out-of-network reimbursement; eligibility and payment depend on your plan."
      },
      {
        "q": "How many sessions will I need?",
        "a": "There is no fixed number of sessions or promised outcome. We can review what is changing, what remains difficult, and whether to adjust the approach, frequency, or plan for care."
      }
    ],
    "contentHeading": "When self-criticism follows a loss or setback"
  },
  "depression-therapy-palo-alto": {
    "city": "Palo Alto",
    "state": "CA",
    "slug": "depression-therapy-palo-alto",
    "title": "Depression Therapy for Palo Alto Residents",
    "metaTitle": "Depression Therapy in Palo Alto | Virtual Sessions",
    "metaDescription": "Depression Therapy for adults in Palo Alto, CA. When nothing seems worth starting. Virtual sessions with Marcus Ghiasi, LMFT. Free consultation.",
    "h1": "Depression Therapy for Adults in Palo Alto, CA",
    "intro": "A loss of interest can make it hard to choose a first step. We can explore what once mattered, what is difficult now, and whether small changes in routine or support make life more workable. Bayside offers virtual individual therapy to adults in Palo Alto who are physically in California for sessions.",
    "localContent": "Marcus Ghiasi is a California Licensed Marriage and Family Therapist, license #158475. Bayside is based in Oakland. Sessions for Palo Alto residents take place online from a private setting in California. Individual support for low mood, withdrawal, loss of interest, and difficulty getting through daily life.",
    "whyChoose": [
      "Individual sessions with Marcus Ghiasi, LMFT, California license #158475",
      "Virtual access for Palo Alto residents; you must be in California for appointments",
      "A conversation about goals, preferences, and the reasons for a proposed approach",
      "45- or 60-minute private-pay sessions; rates and insurance details are below",
      "Free 15-minute consultation to discuss fit and practical questions"
    ],
    "uniqueContent": [
      "We can look at mood, sleep, energy, relationships, and the routines that have become difficult. Work may include manageable activity, examining self-critical thoughts, and understanding losses or ongoing stress. Therapy can be one part of care; medication evaluation or other support may also be appropriate.",
      "<a href=\"/services/cbt\">Read about Cognitive Behavioral Therapy at Bayside.</a> The service overview explains the approach; a consultation can help clarify whether it fits your situation."
    ],
    "uniqueWhatToExpect": [
      "A free 15-minute consultation gives you room to describe what you need, ask questions, and discuss availability. It does not commit you to ongoing sessions.",
      "The first full appointment can explore when nothing seems worth starting, your history, and the concerns most important to you. You can ask questions about pace, methods, and what to do if something does not feel useful. Session length is 45 or 60 minutes; check current scheduling options when booking.",
      "There is no fixed number of sessions or promised outcome. We can review what is changing, what remains difficult, and whether to adjust the approach, frequency, or plan for care."
    ],
    "uniqueFaqs": [
      {
        "q": "How will we assess progress without expecting constant improvement?",
        "a": "We can track changes in functioning, connection, interest, and distress over time. Progress can be uneven, and a plan should be reviewed if symptoms worsen or care is not helping."
      },
      {
        "q": "Are these in-person appointments in Palo Alto?",
        "a": "No. Bayside provides virtual individual therapy. You can attend from a private, suitable setting in Palo Alto or elsewhere in California; your physical location matters for every appointment."
      },
      {
        "q": "How much do sessions cost, and can I use insurance?",
        "a": "Sessions are $210 for 45 minutes or $280 for 60 minutes. Bayside is a private-pay practice and does not bill insurance directly. A superbill is available for possible out-of-network reimbursement; eligibility and payment depend on your plan."
      },
      {
        "q": "How many sessions will I need?",
        "a": "There is no fixed number of sessions or promised outcome. We can review what is changing, what remains difficult, and whether to adjust the approach, frequency, or plan for care."
      }
    ],
    "contentHeading": "When nothing seems worth starting"
  },
  "therapy-san-jose": {
    "city": "San Jose",
    "state": "CA",
    "slug": "therapy-san-jose",
    "title": "Individual Therapy for San Jose Residents",
    "metaTitle": "Therapy in San Jose | Virtual Sessions",
    "metaDescription": "Therapy for adults in San Jose, CA. When responsibilities compete with your needs. Virtual sessions with Marcus Ghiasi, LMFT. Free consultation.",
    "h1": "Individual Therapy for Adults in San Jose, CA",
    "intro": "Work, family, and personal priorities can leave little time to notice what is wearing you down. Sessions can examine both practical constraints and patterns such as overcommitting or avoiding difficult conversations. Bayside offers virtual individual therapy to adults in San Jose who are physically in California for sessions.",
    "localContent": "Marcus Ghiasi is a California Licensed Marriage and Family Therapist, license #158475. Bayside is based in Oakland. Sessions for San Jose residents take place online from a private setting in California. A place to work on anxiety, low mood, trauma-related concerns, relationships, and life transitions.",
    "whyChoose": [
      "Individual sessions with Marcus Ghiasi, LMFT, California license #158475",
      "Virtual access for San Jose residents; you must be in California for appointments",
      "A conversation about goals, preferences, and the reasons for a proposed approach",
      "45- or 60-minute private-pay sessions; rates and insurance details are below",
      "Free 15-minute consultation to discuss fit and practical questions"
    ],
    "uniqueContent": [
      "Therapy can draw on CBT for patterns of worry and avoidance, IFS for exploring internal conflict, psychodynamic work for recurring relational themes, or EMDR when memory-focused treatment is appropriate. We discuss the reason for an approach and review how it fits your goals.",
      "<a href=\"/services\">Compare the therapy approaches offered at Bayside.</a> <a href=\"/about\">Read about Marcus and his approach.</a> You can ask about experience relevant to your concern before deciding on care."
    ],
    "uniqueWhatToExpect": [
      "A free 15-minute consultation gives you room to describe what you need, ask questions, and discuss availability. It does not commit you to ongoing sessions.",
      "The first full appointment can explore when responsibilities compete with your needs, your history, and the concerns most important to you. You can ask questions about pace, methods, and what to do if something does not feel useful. Session length is 45 or 60 minutes; check current scheduling options when booking.",
      "There is no fixed number of sessions or promised outcome. We can review what is changing, what remains difficult, and whether to adjust the approach, frequency, or plan for care."
    ],
    "uniqueFaqs": [
      {
        "q": "Can therapy change a stressful situation outside my control?",
        "a": "Not always. It can help you evaluate choices, seek support, and respond to constraints without treating real external problems as merely a mindset issue."
      },
      {
        "q": "Are these in-person appointments in San Jose?",
        "a": "No. Bayside provides virtual individual therapy. You can attend from a private, suitable setting in San Jose or elsewhere in California; your physical location matters for every appointment."
      },
      {
        "q": "How much do sessions cost, and can I use insurance?",
        "a": "Sessions are $210 for 45 minutes or $280 for 60 minutes. Bayside is a private-pay practice and does not bill insurance directly. A superbill is available for possible out-of-network reimbursement; eligibility and payment depend on your plan."
      },
      {
        "q": "How many sessions will I need?",
        "a": "There is no fixed number of sessions or promised outcome. We can review what is changing, what remains difficult, and whether to adjust the approach, frequency, or plan for care."
      }
    ],
    "contentHeading": "When responsibilities compete with your needs"
  },
  "therapy-palo-alto": {
    "city": "Palo Alto",
    "state": "CA",
    "slug": "therapy-palo-alto",
    "title": "Individual Therapy for Palo Alto Residents",
    "metaTitle": "Therapy in Palo Alto | Virtual Sessions",
    "metaDescription": "Therapy for adults in Palo Alto, CA. Choosing an approach with a clear purpose. Virtual sessions with Marcus Ghiasi, LMFT. Free consultation.",
    "h1": "Individual Therapy for Adults in Palo Alto, CA",
    "intro": "Different methods offer different ways of working. It is reasonable to ask what an approach is intended to address, what it involves, and how you will review whether it is useful. You do not need to choose based on a label alone. Bayside offers virtual individual therapy to adults in Palo Alto who are physically in California for sessions.",
    "localContent": "Marcus Ghiasi is a California Licensed Marriage and Family Therapist, license #158475. Bayside is based in Oakland. Sessions for Palo Alto residents take place online from a private setting in California. A place to work on anxiety, low mood, trauma-related concerns, relationships, and life transitions.",
    "whyChoose": [
      "Individual sessions with Marcus Ghiasi, LMFT, California license #158475",
      "Virtual access for Palo Alto residents; you must be in California for appointments",
      "A conversation about goals, preferences, and the reasons for a proposed approach",
      "45- or 60-minute private-pay sessions; rates and insurance details are below",
      "Free 15-minute consultation to discuss fit and practical questions"
    ],
    "uniqueContent": [
      "Therapy can draw on CBT for patterns of worry and avoidance, IFS for exploring internal conflict, psychodynamic work for recurring relational themes, or EMDR when memory-focused treatment is appropriate. We discuss the reason for an approach and review how it fits your goals.",
      "<a href=\"/services\">Compare the therapy approaches offered at Bayside.</a> <a href=\"/about\">Read about Marcus and his approach.</a> You can ask about experience relevant to your concern before deciding on care."
    ],
    "uniqueWhatToExpect": [
      "A free 15-minute consultation gives you room to describe what you need, ask questions, and discuss availability. It does not commit you to ongoing sessions.",
      "The first full appointment can explore choosing an approach with a clear purpose, your history, and the concerns most important to you. You can ask questions about pace, methods, and what to do if something does not feel useful. Session length is 45 or 60 minutes; check current scheduling options when booking.",
      "There is no fixed number of sessions or promised outcome. We can review what is changing, what remains difficult, and whether to adjust the approach, frequency, or plan for care."
    ],
    "uniqueFaqs": [
      {
        "q": "Can the approach change over time?",
        "a": "Yes. A plan can be adjusted as needs become clearer or your response changes. The reason for a change should be discussed with you."
      },
      {
        "q": "Are these in-person appointments in Palo Alto?",
        "a": "No. Bayside provides virtual individual therapy. You can attend from a private, suitable setting in Palo Alto or elsewhere in California; your physical location matters for every appointment."
      },
      {
        "q": "How much do sessions cost, and can I use insurance?",
        "a": "Sessions are $210 for 45 minutes or $280 for 60 minutes. Bayside is a private-pay practice and does not bill insurance directly. A superbill is available for possible out-of-network reimbursement; eligibility and payment depend on your plan."
      },
      {
        "q": "How many sessions will I need?",
        "a": "There is no fixed number of sessions or promised outcome. We can review what is changing, what remains difficult, and whether to adjust the approach, frequency, or plan for care."
      }
    ],
    "contentHeading": "Choosing an approach with a clear purpose"
  },
  "therapy-mountain-view": {
    "city": "Mountain View",
    "state": "CA",
    "slug": "therapy-mountain-view",
    "title": "Individual Therapy for Mountain View Residents",
    "metaTitle": "Therapy in Mountain View | Virtual Sessions",
    "metaDescription": "Therapy for adults in Mountain View, CA. Working with uncertainty. Virtual sessions with Marcus Ghiasi, LMFT. Free consultation.",
    "h1": "Individual Therapy for Adults in Mountain View, CA",
    "intro": "A decision may stay difficult even after you have thought through every option. Therapy can help distinguish useful planning from repetitive worry and identify a step that does not require complete certainty. Bayside offers virtual individual therapy to adults in Mountain View who are physically in California for sessions.",
    "localContent": "Marcus Ghiasi is a California Licensed Marriage and Family Therapist, license #158475. Bayside is based in Oakland. Sessions for Mountain View residents take place online from a private setting in California. A place to work on anxiety, low mood, trauma-related concerns, relationships, and life transitions.",
    "whyChoose": [
      "Individual sessions with Marcus Ghiasi, LMFT, California license #158475",
      "Virtual access for Mountain View residents; you must be in California for appointments",
      "A conversation about goals, preferences, and the reasons for a proposed approach",
      "45- or 60-minute private-pay sessions; rates and insurance details are below",
      "Free 15-minute consultation to discuss fit and practical questions"
    ],
    "uniqueContent": [
      "Therapy can draw on CBT for patterns of worry and avoidance, IFS for exploring internal conflict, psychodynamic work for recurring relational themes, or EMDR when memory-focused treatment is appropriate. We discuss the reason for an approach and review how it fits your goals.",
      "<a href=\"/services\">Compare the therapy approaches offered at Bayside.</a> <a href=\"/about\">Read about Marcus and his approach.</a> You can ask about experience relevant to your concern before deciding on care."
    ],
    "uniqueWhatToExpect": [
      "A free 15-minute consultation gives you room to describe what you need, ask questions, and discuss availability. It does not commit you to ongoing sessions.",
      "The first full appointment can explore working with uncertainty, your history, and the concerns most important to you. You can ask questions about pace, methods, and what to do if something does not feel useful. Session length is 45 or 60 minutes; check current scheduling options when booking.",
      "There is no fixed number of sessions or promised outcome. We can review what is changing, what remains difficult, and whether to adjust the approach, frequency, or plan for care."
    ],
    "uniqueFaqs": [
      {
        "q": "Will I need to have clear goals at the start?",
        "a": "No. Clarifying what matters and what feels difficult can be part of the initial work."
      },
      {
        "q": "Are these in-person appointments in Mountain View?",
        "a": "No. Bayside provides virtual individual therapy. You can attend from a private, suitable setting in Mountain View or elsewhere in California; your physical location matters for every appointment."
      },
      {
        "q": "How much do sessions cost, and can I use insurance?",
        "a": "Sessions are $210 for 45 minutes or $280 for 60 minutes. Bayside is a private-pay practice and does not bill insurance directly. A superbill is available for possible out-of-network reimbursement; eligibility and payment depend on your plan."
      },
      {
        "q": "How many sessions will I need?",
        "a": "There is no fixed number of sessions or promised outcome. We can review what is changing, what remains difficult, and whether to adjust the approach, frequency, or plan for care."
      }
    ],
    "contentHeading": "Working with uncertainty"
  },
  "therapy-sunnyvale": {
    "city": "Sunnyvale",
    "state": "CA",
    "slug": "therapy-sunnyvale",
    "title": "Individual Therapy for Sunnyvale Residents",
    "metaTitle": "Therapy in Sunnyvale | Virtual Sessions",
    "metaDescription": "Therapy for adults in Sunnyvale, CA. Making space for difficult feelings. Virtual sessions with Marcus Ghiasi, LMFT. Free consultation.",
    "h1": "Individual Therapy for Adults in Sunnyvale, CA",
    "intro": "You may be used to staying busy or explaining a feeling instead of experiencing it. Sessions can help you notice what is present at a pace you can participate in, without assuming emotional intensity is evidence of progress. Bayside offers virtual individual therapy to adults in Sunnyvale who are physically in California for sessions.",
    "localContent": "Marcus Ghiasi is a California Licensed Marriage and Family Therapist, license #158475. Bayside is based in Oakland. Sessions for Sunnyvale residents take place online from a private setting in California. A place to work on anxiety, low mood, trauma-related concerns, relationships, and life transitions.",
    "whyChoose": [
      "Individual sessions with Marcus Ghiasi, LMFT, California license #158475",
      "Virtual access for Sunnyvale residents; you must be in California for appointments",
      "A conversation about goals, preferences, and the reasons for a proposed approach",
      "45- or 60-minute private-pay sessions; rates and insurance details are below",
      "Free 15-minute consultation to discuss fit and practical questions"
    ],
    "uniqueContent": [
      "Therapy can draw on CBT for patterns of worry and avoidance, IFS for exploring internal conflict, psychodynamic work for recurring relational themes, or EMDR when memory-focused treatment is appropriate. We discuss the reason for an approach and review how it fits your goals.",
      "<a href=\"/services\">Compare the therapy approaches offered at Bayside.</a> <a href=\"/about\">Read about Marcus and his approach.</a> You can ask about experience relevant to your concern before deciding on care."
    ],
    "uniqueWhatToExpect": [
      "A free 15-minute consultation gives you room to describe what you need, ask questions, and discuss availability. It does not commit you to ongoing sessions.",
      "The first full appointment can explore making space for difficult feelings, your history, and the concerns most important to you. You can ask questions about pace, methods, and what to do if something does not feel useful. Session length is 45 or 60 minutes; check current scheduling options when booking.",
      "There is no fixed number of sessions or promised outcome. We can review what is changing, what remains difficult, and whether to adjust the approach, frequency, or plan for care."
    ],
    "uniqueFaqs": [
      {
        "q": "What if I become overwhelmed in a session?",
        "a": "Let your therapist know. We can pause, ground, or change the focus and discuss whether additional support is needed."
      },
      {
        "q": "Are these in-person appointments in Sunnyvale?",
        "a": "No. Bayside provides virtual individual therapy. You can attend from a private, suitable setting in Sunnyvale or elsewhere in California; your physical location matters for every appointment."
      },
      {
        "q": "How much do sessions cost, and can I use insurance?",
        "a": "Sessions are $210 for 45 minutes or $280 for 60 minutes. Bayside is a private-pay practice and does not bill insurance directly. A superbill is available for possible out-of-network reimbursement; eligibility and payment depend on your plan."
      },
      {
        "q": "How many sessions will I need?",
        "a": "There is no fixed number of sessions or promised outcome. We can review what is changing, what remains difficult, and whether to adjust the approach, frequency, or plan for care."
      }
    ],
    "contentHeading": "Making space for difficult feelings"
  },
  "therapy-redwood-city": {
    "city": "Redwood City",
    "state": "CA",
    "slug": "therapy-redwood-city",
    "title": "Individual Therapy for Redwood City Residents",
    "metaTitle": "Therapy in Redwood City | Virtual Sessions",
    "metaDescription": "Therapy for adults in Redwood City, CA. Returning to therapy after a break. Virtual sessions with Marcus Ghiasi, LMFT. Free consultation.",
    "h1": "Individual Therapy for Adults in Redwood City, CA",
    "intro": "Starting again can bring questions about what to repeat and what to do differently. We can discuss what helped in previous care, what felt less useful, and what is different in your life now. Bayside offers virtual individual therapy to adults in Redwood City who are physically in California for sessions.",
    "localContent": "Marcus Ghiasi is a California Licensed Marriage and Family Therapist, license #158475. Bayside is based in Oakland. Sessions for Redwood City residents take place online from a private setting in California. A place to work on anxiety, low mood, trauma-related concerns, relationships, and life transitions.",
    "whyChoose": [
      "Individual sessions with Marcus Ghiasi, LMFT, California license #158475",
      "Virtual access for Redwood City residents; you must be in California for appointments",
      "A conversation about goals, preferences, and the reasons for a proposed approach",
      "45- or 60-minute private-pay sessions; rates and insurance details are below",
      "Free 15-minute consultation to discuss fit and practical questions"
    ],
    "uniqueContent": [
      "Therapy can draw on CBT for patterns of worry and avoidance, IFS for exploring internal conflict, psychodynamic work for recurring relational themes, or EMDR when memory-focused treatment is appropriate. We discuss the reason for an approach and review how it fits your goals.",
      "<a href=\"/services\">Compare the therapy approaches offered at Bayside.</a> <a href=\"/about\">Read about Marcus and his approach.</a> You can ask about experience relevant to your concern before deciding on care."
    ],
    "uniqueWhatToExpect": [
      "A free 15-minute consultation gives you room to describe what you need, ask questions, and discuss availability. It does not commit you to ongoing sessions.",
      "The first full appointment can explore returning to therapy after a break, your history, and the concerns most important to you. You can ask questions about pace, methods, and what to do if something does not feel useful. Session length is 45 or 60 minutes; check current scheduling options when booking.",
      "There is no fixed number of sessions or promised outcome. We can review what is changing, what remains difficult, and whether to adjust the approach, frequency, or plan for care."
    ],
    "uniqueFaqs": [
      {
        "q": "Do I need to start my story from the beginning?",
        "a": "Not all at once. We can begin with what brings you back and gather relevant history as the work develops."
      },
      {
        "q": "Are these in-person appointments in Redwood City?",
        "a": "No. Bayside provides virtual individual therapy. You can attend from a private, suitable setting in Redwood City or elsewhere in California; your physical location matters for every appointment."
      },
      {
        "q": "How much do sessions cost, and can I use insurance?",
        "a": "Sessions are $210 for 45 minutes or $280 for 60 minutes. Bayside is a private-pay practice and does not bill insurance directly. A superbill is available for possible out-of-network reimbursement; eligibility and payment depend on your plan."
      },
      {
        "q": "How many sessions will I need?",
        "a": "There is no fixed number of sessions or promised outcome. We can review what is changing, what remains difficult, and whether to adjust the approach, frequency, or plan for care."
      }
    ],
    "contentHeading": "Returning to therapy after a break"
  },
  "therapy-san-mateo": {
    "city": "San Mateo",
    "state": "CA",
    "slug": "therapy-san-mateo",
    "title": "Individual Therapy for San Mateo Residents",
    "metaTitle": "Therapy in San Mateo | Virtual Sessions",
    "metaDescription": "Therapy for adults in San Mateo, CA. Discussing relationship concerns individually. Virtual sessions with Marcus Ghiasi, LMFT. Free consultation.",
    "h1": "Individual Therapy for Adults in San Mateo, CA",
    "intro": "You can work on communication, boundaries, grief, or recurring patterns without a partner attending. The focus stays on your experience and choices, including what is beyond your control. Bayside offers virtual individual therapy to adults in San Mateo who are physically in California for sessions.",
    "localContent": "Marcus Ghiasi is a California Licensed Marriage and Family Therapist, license #158475. Bayside is based in Oakland. Sessions for San Mateo residents take place online from a private setting in California. A place to work on anxiety, low mood, trauma-related concerns, relationships, and life transitions.",
    "whyChoose": [
      "Individual sessions with Marcus Ghiasi, LMFT, California license #158475",
      "Virtual access for San Mateo residents; you must be in California for appointments",
      "A conversation about goals, preferences, and the reasons for a proposed approach",
      "45- or 60-minute private-pay sessions; rates and insurance details are below",
      "Free 15-minute consultation to discuss fit and practical questions"
    ],
    "uniqueContent": [
      "Therapy can draw on CBT for patterns of worry and avoidance, IFS for exploring internal conflict, psychodynamic work for recurring relational themes, or EMDR when memory-focused treatment is appropriate. We discuss the reason for an approach and review how it fits your goals.",
      "<a href=\"/services\">Compare the therapy approaches offered at Bayside.</a> <a href=\"/about\">Read about Marcus and his approach.</a> You can ask about experience relevant to your concern before deciding on care."
    ],
    "uniqueWhatToExpect": [
      "A free 15-minute consultation gives you room to describe what you need, ask questions, and discuss availability. It does not commit you to ongoing sessions.",
      "The first full appointment can explore discussing relationship concerns individually, your history, and the concerns most important to you. You can ask questions about pace, methods, and what to do if something does not feel useful. Session length is 45 or 60 minutes; check current scheduling options when booking.",
      "There is no fixed number of sessions or promised outcome. We can review what is changing, what remains difficult, and whether to adjust the approach, frequency, or plan for care."
    ],
    "uniqueFaqs": [
      {
        "q": "Does Bayside offer couples sessions?",
        "a": "The services described here are individual therapy. If you need joint couples or family work, ask about an appropriate referral."
      },
      {
        "q": "Are these in-person appointments in San Mateo?",
        "a": "No. Bayside provides virtual individual therapy. You can attend from a private, suitable setting in San Mateo or elsewhere in California; your physical location matters for every appointment."
      },
      {
        "q": "How much do sessions cost, and can I use insurance?",
        "a": "Sessions are $210 for 45 minutes or $280 for 60 minutes. Bayside is a private-pay practice and does not bill insurance directly. A superbill is available for possible out-of-network reimbursement; eligibility and payment depend on your plan."
      },
      {
        "q": "How many sessions will I need?",
        "a": "There is no fixed number of sessions or promised outcome. We can review what is changing, what remains difficult, and whether to adjust the approach, frequency, or plan for care."
      }
    ],
    "contentHeading": "Discussing relationship concerns individually"
  },
  "therapy-san-carlos": {
    "city": "San Carlos",
    "state": "CA",
    "slug": "therapy-san-carlos",
    "title": "Individual Therapy for San Carlos Residents",
    "metaTitle": "Therapy in San Carlos | Virtual Sessions",
    "metaDescription": "Therapy for adults in San Carlos, CA. When motivation and energy are low. Virtual sessions with Marcus Ghiasi, LMFT. Free consultation.",
    "h1": "Individual Therapy for Adults in San Carlos, CA",
    "intro": "Tasks may feel harder than they once did, and advice to push through may add pressure. Therapy can explore mood, stress, routine, and support while considering whether other evaluation would be helpful. Bayside offers virtual individual therapy to adults in San Carlos who are physically in California for sessions.",
    "localContent": "Marcus Ghiasi is a California Licensed Marriage and Family Therapist, license #158475. Bayside is based in Oakland. Sessions for San Carlos residents take place online from a private setting in California. A place to work on anxiety, low mood, trauma-related concerns, relationships, and life transitions.",
    "whyChoose": [
      "Individual sessions with Marcus Ghiasi, LMFT, California license #158475",
      "Virtual access for San Carlos residents; you must be in California for appointments",
      "A conversation about goals, preferences, and the reasons for a proposed approach",
      "45- or 60-minute private-pay sessions; rates and insurance details are below",
      "Free 15-minute consultation to discuss fit and practical questions"
    ],
    "uniqueContent": [
      "Therapy can draw on CBT for patterns of worry and avoidance, IFS for exploring internal conflict, psychodynamic work for recurring relational themes, or EMDR when memory-focused treatment is appropriate. We discuss the reason for an approach and review how it fits your goals.",
      "<a href=\"/services\">Compare the therapy approaches offered at Bayside.</a> <a href=\"/about\">Read about Marcus and his approach.</a> You can ask about experience relevant to your concern before deciding on care."
    ],
    "uniqueWhatToExpect": [
      "A free 15-minute consultation gives you room to describe what you need, ask questions, and discuss availability. It does not commit you to ongoing sessions.",
      "The first full appointment can explore when motivation and energy are low, your history, and the concerns most important to you. You can ask questions about pace, methods, and what to do if something does not feel useful. Session length is 45 or 60 minutes; check current scheduling options when booking.",
      "There is no fixed number of sessions or promised outcome. We can review what is changing, what remains difficult, and whether to adjust the approach, frequency, or plan for care."
    ],
    "uniqueFaqs": [
      {
        "q": "Do I need to know whether I have depression?",
        "a": "No. You can describe the changes you have noticed. Assessment helps clarify what type of support may fit."
      },
      {
        "q": "Are these in-person appointments in San Carlos?",
        "a": "No. Bayside provides virtual individual therapy. You can attend from a private, suitable setting in San Carlos or elsewhere in California; your physical location matters for every appointment."
      },
      {
        "q": "How much do sessions cost, and can I use insurance?",
        "a": "Sessions are $210 for 45 minutes or $280 for 60 minutes. Bayside is a private-pay practice and does not bill insurance directly. A superbill is available for possible out-of-network reimbursement; eligibility and payment depend on your plan."
      },
      {
        "q": "How many sessions will I need?",
        "a": "There is no fixed number of sessions or promised outcome. We can review what is changing, what remains difficult, and whether to adjust the approach, frequency, or plan for care."
      }
    ],
    "contentHeading": "When motivation and energy are low"
  },
  "therapy-burlingame": {
    "city": "Burlingame",
    "state": "CA",
    "slug": "therapy-burlingame",
    "title": "Individual Therapy for Burlingame Residents",
    "metaTitle": "Therapy in Burlingame | Virtual Sessions",
    "metaDescription": "Therapy for adults in Burlingame, CA. Being honest about ambivalence. Virtual sessions with Marcus Ghiasi, LMFT. Free consultation.",
    "h1": "Individual Therapy for Adults in Burlingame, CA",
    "intro": "Part of you may want help while another part doubts it will be useful. Those reactions do not disqualify you from therapy. We can discuss concerns about trust, cost, previous experiences, or what change might ask of you. Bayside offers virtual individual therapy to adults in Burlingame who are physically in California for sessions.",
    "localContent": "Marcus Ghiasi is a California Licensed Marriage and Family Therapist, license #158475. Bayside is based in Oakland. Sessions for Burlingame residents take place online from a private setting in California. A place to work on anxiety, low mood, trauma-related concerns, relationships, and life transitions.",
    "whyChoose": [
      "Individual sessions with Marcus Ghiasi, LMFT, California license #158475",
      "Virtual access for Burlingame residents; you must be in California for appointments",
      "A conversation about goals, preferences, and the reasons for a proposed approach",
      "45- or 60-minute private-pay sessions; rates and insurance details are below",
      "Free 15-minute consultation to discuss fit and practical questions"
    ],
    "uniqueContent": [
      "Therapy can draw on CBT for patterns of worry and avoidance, IFS for exploring internal conflict, psychodynamic work for recurring relational themes, or EMDR when memory-focused treatment is appropriate. We discuss the reason for an approach and review how it fits your goals.",
      "<a href=\"/services\">Compare the therapy approaches offered at Bayside.</a> <a href=\"/about\">Read about Marcus and his approach.</a> You can ask about experience relevant to your concern before deciding on care."
    ],
    "uniqueWhatToExpect": [
      "A free 15-minute consultation gives you room to describe what you need, ask questions, and discuss availability. It does not commit you to ongoing sessions.",
      "The first full appointment can explore being honest about ambivalence, your history, and the concerns most important to you. You can ask questions about pace, methods, and what to do if something does not feel useful. Session length is 45 or 60 minutes; check current scheduling options when booking.",
      "There is no fixed number of sessions or promised outcome. We can review what is changing, what remains difficult, and whether to adjust the approach, frequency, or plan for care."
    ],
    "uniqueFaqs": [
      {
        "q": "Can I use the consultation to decide whether I want therapy at all?",
        "a": "Yes. It is a chance to ask questions and assess fit, without a commitment to ongoing appointments."
      },
      {
        "q": "Are these in-person appointments in Burlingame?",
        "a": "No. Bayside provides virtual individual therapy. You can attend from a private, suitable setting in Burlingame or elsewhere in California; your physical location matters for every appointment."
      },
      {
        "q": "How much do sessions cost, and can I use insurance?",
        "a": "Sessions are $210 for 45 minutes or $280 for 60 minutes. Bayside is a private-pay practice and does not bill insurance directly. A superbill is available for possible out-of-network reimbursement; eligibility and payment depend on your plan."
      },
      {
        "q": "How many sessions will I need?",
        "a": "There is no fixed number of sessions or promised outcome. We can review what is changing, what remains difficult, and whether to adjust the approach, frequency, or plan for care."
      }
    ],
    "contentHeading": "Being honest about ambivalence"
  },
  "therapy-millbrae": {
    "city": "Millbrae",
    "state": "CA",
    "slug": "therapy-millbrae",
    "title": "Individual Therapy for Millbrae Residents",
    "metaTitle": "Therapy in Millbrae | Virtual Sessions",
    "metaDescription": "Therapy for adults in Millbrae, CA. Making a plan around travel. Virtual sessions with Marcus Ghiasi, LMFT. Free consultation.",
    "h1": "Individual Therapy for Adults in Millbrae, CA",
    "intro": "Virtual therapy still involves location requirements. If you expect to travel, discuss it before an appointment so care can be planned appropriately. Living in California does not mean every session can occur from any destination. Bayside offers virtual individual therapy to adults in Millbrae who are physically in California for sessions.",
    "localContent": "Marcus Ghiasi is a California Licensed Marriage and Family Therapist, license #158475. Bayside is based in Oakland. Sessions for Millbrae residents take place online from a private setting in California. A place to work on anxiety, low mood, trauma-related concerns, relationships, and life transitions.",
    "whyChoose": [
      "Individual sessions with Marcus Ghiasi, LMFT, California license #158475",
      "Virtual access for Millbrae residents; you must be in California for appointments",
      "A conversation about goals, preferences, and the reasons for a proposed approach",
      "45- or 60-minute private-pay sessions; rates and insurance details are below",
      "Free 15-minute consultation to discuss fit and practical questions"
    ],
    "uniqueContent": [
      "Therapy can draw on CBT for patterns of worry and avoidance, IFS for exploring internal conflict, psychodynamic work for recurring relational themes, or EMDR when memory-focused treatment is appropriate. We discuss the reason for an approach and review how it fits your goals.",
      "<a href=\"/services\">Compare the therapy approaches offered at Bayside.</a> <a href=\"/about\">Read about Marcus and his approach.</a> You can ask about experience relevant to your concern before deciding on care."
    ],
    "uniqueWhatToExpect": [
      "A free 15-minute consultation gives you room to describe what you need, ask questions, and discuss availability. It does not commit you to ongoing sessions.",
      "The first full appointment can explore making a plan around travel, your history, and the concerns most important to you. You can ask questions about pace, methods, and what to do if something does not feel useful. Session length is 45 or 60 minutes; check current scheduling options when booking.",
      "There is no fixed number of sessions or promised outcome. We can review what is changing, what remains difficult, and whether to adjust the approach, frequency, or plan for care."
    ],
    "uniqueFaqs": [
      {
        "q": "Can I attend while temporarily outside California?",
        "a": "Do not assume that you can. This practice offers care to clients physically in California for sessions. Discuss travel and continuity of care before leaving."
      },
      {
        "q": "Are these in-person appointments in Millbrae?",
        "a": "No. Bayside provides virtual individual therapy. You can attend from a private, suitable setting in Millbrae or elsewhere in California; your physical location matters for every appointment."
      },
      {
        "q": "How much do sessions cost, and can I use insurance?",
        "a": "Sessions are $210 for 45 minutes or $280 for 60 minutes. Bayside is a private-pay practice and does not bill insurance directly. A superbill is available for possible out-of-network reimbursement; eligibility and payment depend on your plan."
      },
      {
        "q": "How many sessions will I need?",
        "a": "There is no fixed number of sessions or promised outcome. We can review what is changing, what remains difficult, and whether to adjust the approach, frequency, or plan for care."
      }
    ],
    "contentHeading": "Making a plan around travel"
  },
  "therapy-pacifica": {
    "city": "Pacifica",
    "state": "CA",
    "slug": "therapy-pacifica",
    "title": "Individual Therapy for Pacifica Residents",
    "metaTitle": "Therapy in Pacifica | Virtual Sessions",
    "metaDescription": "Therapy for adults in Pacifica, CA. Seeking help without comparing your pain. Virtual sessions with Marcus Ghiasi, LMFT. Free consultation.",
    "h1": "Individual Therapy for Adults in Pacifica, CA",
    "intro": "You may hesitate because someone else seems to have experienced more. A consultation can begin with the effect a concern has on your life, not a comparison with another person’s history. Bayside offers virtual individual therapy to adults in Pacifica who are physically in California for sessions.",
    "localContent": "Marcus Ghiasi is a California Licensed Marriage and Family Therapist, license #158475. Bayside is based in Oakland. Sessions for Pacifica residents take place online from a private setting in California. A place to work on anxiety, low mood, trauma-related concerns, relationships, and life transitions.",
    "whyChoose": [
      "Individual sessions with Marcus Ghiasi, LMFT, California license #158475",
      "Virtual access for Pacifica residents; you must be in California for appointments",
      "A conversation about goals, preferences, and the reasons for a proposed approach",
      "45- or 60-minute private-pay sessions; rates and insurance details are below",
      "Free 15-minute consultation to discuss fit and practical questions"
    ],
    "uniqueContent": [
      "Therapy can draw on CBT for patterns of worry and avoidance, IFS for exploring internal conflict, psychodynamic work for recurring relational themes, or EMDR when memory-focused treatment is appropriate. We discuss the reason for an approach and review how it fits your goals.",
      "<a href=\"/services\">Compare the therapy approaches offered at Bayside.</a> <a href=\"/about\">Read about Marcus and his approach.</a> You can ask about experience relevant to your concern before deciding on care."
    ],
    "uniqueWhatToExpect": [
      "A free 15-minute consultation gives you room to describe what you need, ask questions, and discuss availability. It does not commit you to ongoing sessions.",
      "The first full appointment can explore seeking help without comparing your pain, your history, and the concerns most important to you. You can ask questions about pace, methods, and what to do if something does not feel useful. Session length is 45 or 60 minutes; check current scheduling options when booking.",
      "There is no fixed number of sessions or promised outcome. We can review what is changing, what remains difficult, and whether to adjust the approach, frequency, or plan for care."
    ],
    "uniqueFaqs": [
      {
        "q": "Does an experience have to count as trauma to discuss it?",
        "a": "No. Distress, uncertainty, grief, and recurring patterns can all be appropriate topics. The assessment does not require you to select a label first."
      },
      {
        "q": "Are these in-person appointments in Pacifica?",
        "a": "No. Bayside provides virtual individual therapy. You can attend from a private, suitable setting in Pacifica or elsewhere in California; your physical location matters for every appointment."
      },
      {
        "q": "How much do sessions cost, and can I use insurance?",
        "a": "Sessions are $210 for 45 minutes or $280 for 60 minutes. Bayside is a private-pay practice and does not bill insurance directly. A superbill is available for possible out-of-network reimbursement; eligibility and payment depend on your plan."
      },
      {
        "q": "How many sessions will I need?",
        "a": "There is no fixed number of sessions or promised outcome. We can review what is changing, what remains difficult, and whether to adjust the approach, frequency, or plan for care."
      }
    ],
    "contentHeading": "Seeking help without comparing your pain"
  },
  "therapy-daly-city": {
    "city": "Daly City",
    "state": "CA",
    "slug": "therapy-daly-city",
    "title": "Individual Therapy for Daly City Residents",
    "metaTitle": "Therapy in Daly City | Virtual Sessions",
    "metaDescription": "Therapy for adults in Daly City, CA. Considering what you need from a therapist. Virtual sessions with Marcus Ghiasi, LMFT. Free consultation.",
    "h1": "Individual Therapy for Adults in Daly City, CA",
    "intro": "Some people want structure and practice; others need more space to explore. You can discuss preferences, ask how sessions work, and say when something does not fit. That feedback can help shape the plan. Bayside offers virtual individual therapy to adults in Daly City who are physically in California for sessions.",
    "localContent": "Marcus Ghiasi is a California Licensed Marriage and Family Therapist, license #158475. Bayside is based in Oakland. Sessions for Daly City residents take place online from a private setting in California. A place to work on anxiety, low mood, trauma-related concerns, relationships, and life transitions.",
    "whyChoose": [
      "Individual sessions with Marcus Ghiasi, LMFT, California license #158475",
      "Virtual access for Daly City residents; you must be in California for appointments",
      "A conversation about goals, preferences, and the reasons for a proposed approach",
      "45- or 60-minute private-pay sessions; rates and insurance details are below",
      "Free 15-minute consultation to discuss fit and practical questions"
    ],
    "uniqueContent": [
      "Therapy can draw on CBT for patterns of worry and avoidance, IFS for exploring internal conflict, psychodynamic work for recurring relational themes, or EMDR when memory-focused treatment is appropriate. We discuss the reason for an approach and review how it fits your goals.",
      "<a href=\"/services\">Compare the therapy approaches offered at Bayside.</a> <a href=\"/about\">Read about Marcus and his approach.</a> You can ask about experience relevant to your concern before deciding on care."
    ],
    "uniqueWhatToExpect": [
      "A free 15-minute consultation gives you room to describe what you need, ask questions, and discuss availability. It does not commit you to ongoing sessions.",
      "The first full appointment can explore considering what you need from a therapist, your history, and the concerns most important to you. You can ask questions about pace, methods, and what to do if something does not feel useful. Session length is 45 or 60 minutes; check current scheduling options when booking.",
      "There is no fixed number of sessions or promised outcome. We can review what is changing, what remains difficult, and whether to adjust the approach, frequency, or plan for care."
    ],
    "uniqueFaqs": [
      {
        "q": "Can I disagree with an interpretation?",
        "a": "Yes. Your perspective matters. An interpretation is something to examine together, not an explanation you must accept."
      },
      {
        "q": "Are these in-person appointments in Daly City?",
        "a": "No. Bayside provides virtual individual therapy. You can attend from a private, suitable setting in Daly City or elsewhere in California; your physical location matters for every appointment."
      },
      {
        "q": "How much do sessions cost, and can I use insurance?",
        "a": "Sessions are $210 for 45 minutes or $280 for 60 minutes. Bayside is a private-pay practice and does not bill insurance directly. A superbill is available for possible out-of-network reimbursement; eligibility and payment depend on your plan."
      },
      {
        "q": "How many sessions will I need?",
        "a": "There is no fixed number of sessions or promised outcome. We can review what is changing, what remains difficult, and whether to adjust the approach, frequency, or plan for care."
      }
    ],
    "contentHeading": "Considering what you need from a therapist"
  },
  "therapy-south-san-francisco": {
    "city": "South San Francisco",
    "state": "CA",
    "slug": "therapy-south-san-francisco",
    "title": "Individual Therapy for South San Francisco Residents",
    "metaTitle": "Therapy in South San Francisco | Virtual Sessions",
    "metaDescription": "Therapy for adults in South San Francisco, CA. Protecting time for a virtual appointment. Virtual sessions with Marcus Ghiasi, LMFT. Free consultation.",
    "h1": "Individual Therapy for Adults in South San Francisco, CA",
    "intro": "A session can become harder to use when it is squeezed between calls or interrupted by tasks. Consider what would help you arrive with attention available and transition back into the rest of the day. Bayside offers virtual individual therapy to adults in South San Francisco who are physically in California for sessions.",
    "localContent": "Marcus Ghiasi is a California Licensed Marriage and Family Therapist, license #158475. Bayside is based in Oakland. Sessions for South San Francisco residents take place online from a private setting in California. A place to work on anxiety, low mood, trauma-related concerns, relationships, and life transitions.",
    "whyChoose": [
      "Individual sessions with Marcus Ghiasi, LMFT, California license #158475",
      "Virtual access for South San Francisco residents; you must be in California for appointments",
      "A conversation about goals, preferences, and the reasons for a proposed approach",
      "45- or 60-minute private-pay sessions; rates and insurance details are below",
      "Free 15-minute consultation to discuss fit and practical questions"
    ],
    "uniqueContent": [
      "Therapy can draw on CBT for patterns of worry and avoidance, IFS for exploring internal conflict, psychodynamic work for recurring relational themes, or EMDR when memory-focused treatment is appropriate. We discuss the reason for an approach and review how it fits your goals.",
      "<a href=\"/services\">Compare the therapy approaches offered at Bayside.</a> <a href=\"/about\">Read about Marcus and his approach.</a> You can ask about experience relevant to your concern before deciding on care."
    ],
    "uniqueWhatToExpect": [
      "A free 15-minute consultation gives you room to describe what you need, ask questions, and discuss availability. It does not commit you to ongoing sessions.",
      "The first full appointment can explore protecting time for a virtual appointment, your history, and the concerns most important to you. You can ask questions about pace, methods, and what to do if something does not feel useful. Session length is 45 or 60 minutes; check current scheduling options when booking.",
      "There is no fixed number of sessions or promised outcome. We can review what is changing, what remains difficult, and whether to adjust the approach, frequency, or plan for care."
    ],
    "uniqueFaqs": [
      {
        "q": "Do virtual sessions require travel to Oakland?",
        "a": "No. Sessions take place online from a private, suitable location in California. Bayside’s Oakland base is not a requirement to visit an office."
      },
      {
        "q": "Are these in-person appointments in South San Francisco?",
        "a": "No. Bayside provides virtual individual therapy. You can attend from a private, suitable setting in South San Francisco or elsewhere in California; your physical location matters for every appointment."
      },
      {
        "q": "How much do sessions cost, and can I use insurance?",
        "a": "Sessions are $210 for 45 minutes or $280 for 60 minutes. Bayside is a private-pay practice and does not bill insurance directly. A superbill is available for possible out-of-network reimbursement; eligibility and payment depend on your plan."
      },
      {
        "q": "How many sessions will I need?",
        "a": "There is no fixed number of sessions or promised outcome. We can review what is changing, what remains difficult, and whether to adjust the approach, frequency, or plan for care."
      }
    ],
    "contentHeading": "Protecting time for a virtual appointment"
  },
  "therapy-menlo-park": {
    "city": "Menlo Park",
    "state": "CA",
    "slug": "therapy-menlo-park",
    "title": "Individual Therapy for Menlo Park Residents",
    "metaTitle": "Therapy in Menlo Park | Virtual Sessions",
    "metaDescription": "Therapy for adults in Menlo Park, CA. Working on limits without losing connection. Virtual sessions with Marcus Ghiasi, LMFT. Free consultation.",
    "h1": "Individual Therapy for Adults in Menlo Park, CA",
    "intro": "You may worry that saying no will damage a relationship. Therapy can help clarify the limit, the fear around expressing it, and how you want to respond if another person disagrees. Bayside offers virtual individual therapy to adults in Menlo Park who are physically in California for sessions.",
    "localContent": "Marcus Ghiasi is a California Licensed Marriage and Family Therapist, license #158475. Bayside is based in Oakland. Sessions for Menlo Park residents take place online from a private setting in California. A place to work on anxiety, low mood, trauma-related concerns, relationships, and life transitions.",
    "whyChoose": [
      "Individual sessions with Marcus Ghiasi, LMFT, California license #158475",
      "Virtual access for Menlo Park residents; you must be in California for appointments",
      "A conversation about goals, preferences, and the reasons for a proposed approach",
      "45- or 60-minute private-pay sessions; rates and insurance details are below",
      "Free 15-minute consultation to discuss fit and practical questions"
    ],
    "uniqueContent": [
      "Therapy can draw on CBT for patterns of worry and avoidance, IFS for exploring internal conflict, psychodynamic work for recurring relational themes, or EMDR when memory-focused treatment is appropriate. We discuss the reason for an approach and review how it fits your goals.",
      "<a href=\"/services\">Compare the therapy approaches offered at Bayside.</a> <a href=\"/about\">Read about Marcus and his approach.</a> You can ask about experience relevant to your concern before deciding on care."
    ],
    "uniqueWhatToExpect": [
      "A free 15-minute consultation gives you room to describe what you need, ask questions, and discuss availability. It does not commit you to ongoing sessions.",
      "The first full appointment can explore working on limits without losing connection, your history, and the concerns most important to you. You can ask questions about pace, methods, and what to do if something does not feel useful. Session length is 45 or 60 minutes; check current scheduling options when booking.",
      "There is no fixed number of sessions or promised outcome. We can review what is changing, what remains difficult, and whether to adjust the approach, frequency, or plan for care."
    ],
    "uniqueFaqs": [
      {
        "q": "Will therapy always recommend distancing from people?",
        "a": "No. We can consider a range of choices, including communication, changes in expectations, limits, and support. Safety concerns may require a different discussion."
      },
      {
        "q": "Are these in-person appointments in Menlo Park?",
        "a": "No. Bayside provides virtual individual therapy. You can attend from a private, suitable setting in Menlo Park or elsewhere in California; your physical location matters for every appointment."
      },
      {
        "q": "How much do sessions cost, and can I use insurance?",
        "a": "Sessions are $210 for 45 minutes or $280 for 60 minutes. Bayside is a private-pay practice and does not bill insurance directly. A superbill is available for possible out-of-network reimbursement; eligibility and payment depend on your plan."
      },
      {
        "q": "How many sessions will I need?",
        "a": "There is no fixed number of sessions or promised outcome. We can review what is changing, what remains difficult, and whether to adjust the approach, frequency, or plan for care."
      }
    ],
    "contentHeading": "Working on limits without losing connection"
  },
  "therapy-los-altos": {
    "city": "Los Altos",
    "state": "CA",
    "slug": "therapy-los-altos",
    "title": "Individual Therapy for Los Altos Residents",
    "metaTitle": "Therapy in Los Altos | Virtual Sessions",
    "metaDescription": "Therapy for adults in Los Altos, CA. When understanding has not become action. Virtual sessions with Marcus Ghiasi, LMFT. Free consultation.",
    "h1": "Individual Therapy for Adults in Los Altos, CA",
    "intro": "You may recognize a pattern and still repeat it. We can explore the situations where it appears, practice alternatives, and review what happens outside sessions rather than assuming insight should automatically change behavior. Bayside offers virtual individual therapy to adults in Los Altos who are physically in California for sessions.",
    "localContent": "Marcus Ghiasi is a California Licensed Marriage and Family Therapist, license #158475. Bayside is based in Oakland. Sessions for Los Altos residents take place online from a private setting in California. A place to work on anxiety, low mood, trauma-related concerns, relationships, and life transitions.",
    "whyChoose": [
      "Individual sessions with Marcus Ghiasi, LMFT, California license #158475",
      "Virtual access for Los Altos residents; you must be in California for appointments",
      "A conversation about goals, preferences, and the reasons for a proposed approach",
      "45- or 60-minute private-pay sessions; rates and insurance details are below",
      "Free 15-minute consultation to discuss fit and practical questions"
    ],
    "uniqueContent": [
      "Therapy can draw on CBT for patterns of worry and avoidance, IFS for exploring internal conflict, psychodynamic work for recurring relational themes, or EMDR when memory-focused treatment is appropriate. We discuss the reason for an approach and review how it fits your goals.",
      "<a href=\"/services\">Compare the therapy approaches offered at Bayside.</a> <a href=\"/about\">Read about Marcus and his approach.</a> You can ask about experience relevant to your concern before deciding on care."
    ],
    "uniqueWhatToExpect": [
      "A free 15-minute consultation gives you room to describe what you need, ask questions, and discuss availability. It does not commit you to ongoing sessions.",
      "The first full appointment can explore when understanding has not become action, your history, and the concerns most important to you. You can ask questions about pace, methods, and what to do if something does not feel useful. Session length is 45 or 60 minutes; check current scheduling options when booking.",
      "There is no fixed number of sessions or promised outcome. We can review what is changing, what remains difficult, and whether to adjust the approach, frequency, or plan for care."
    ],
    "uniqueFaqs": [
      {
        "q": "What if I keep making the same mistake?",
        "a": "That can be explored without shame. We can look at triggers, constraints, and the size of the change you are attempting, then adjust the plan."
      },
      {
        "q": "Are these in-person appointments in Los Altos?",
        "a": "No. Bayside provides virtual individual therapy. You can attend from a private, suitable setting in Los Altos or elsewhere in California; your physical location matters for every appointment."
      },
      {
        "q": "How much do sessions cost, and can I use insurance?",
        "a": "Sessions are $210 for 45 minutes or $280 for 60 minutes. Bayside is a private-pay practice and does not bill insurance directly. A superbill is available for possible out-of-network reimbursement; eligibility and payment depend on your plan."
      },
      {
        "q": "How many sessions will I need?",
        "a": "There is no fixed number of sessions or promised outcome. We can review what is changing, what remains difficult, and whether to adjust the approach, frequency, or plan for care."
      }
    ],
    "contentHeading": "When understanding has not become action"
  },
  "therapy-san-rafael": {
    "city": "San Rafael",
    "state": "CA",
    "slug": "therapy-san-rafael",
    "title": "Individual Therapy for San Rafael Residents",
    "metaTitle": "Therapy in San Rafael | Virtual Sessions",
    "metaDescription": "Therapy for adults in San Rafael, CA. Choosing between virtual and in-person care. Virtual sessions with Marcus Ghiasi, LMFT. Free consultation.",
    "h1": "Individual Therapy for Adults in San Rafael, CA",
    "intro": "Online sessions offer access without travel, but the format is not ideal for every person or need. Privacy, comfort with video, symptom severity, and available support all matter when considering fit. Bayside offers virtual individual therapy to adults in San Rafael who are physically in California for sessions.",
    "localContent": "Marcus Ghiasi is a California Licensed Marriage and Family Therapist, license #158475. Bayside is based in Oakland. Sessions for San Rafael residents take place online from a private setting in California. A place to work on anxiety, low mood, trauma-related concerns, relationships, and life transitions.",
    "whyChoose": [
      "Individual sessions with Marcus Ghiasi, LMFT, California license #158475",
      "Virtual access for San Rafael residents; you must be in California for appointments",
      "A conversation about goals, preferences, and the reasons for a proposed approach",
      "45- or 60-minute private-pay sessions; rates and insurance details are below",
      "Free 15-minute consultation to discuss fit and practical questions"
    ],
    "uniqueContent": [
      "Therapy can draw on CBT for patterns of worry and avoidance, IFS for exploring internal conflict, psychodynamic work for recurring relational themes, or EMDR when memory-focused treatment is appropriate. We discuss the reason for an approach and review how it fits your goals.",
      "<a href=\"/services\">Compare the therapy approaches offered at Bayside.</a> <a href=\"/about\">Read about Marcus and his approach.</a> You can ask about experience relevant to your concern before deciding on care."
    ],
    "uniqueWhatToExpect": [
      "A free 15-minute consultation gives you room to describe what you need, ask questions, and discuss availability. It does not commit you to ongoing sessions.",
      "The first full appointment can explore choosing between virtual and in-person care, your history, and the concerns most important to you. You can ask questions about pace, methods, and what to do if something does not feel useful. Session length is 45 or 60 minutes; check current scheduling options when booking.",
      "There is no fixed number of sessions or promised outcome. We can review what is changing, what remains difficult, and whether to adjust the approach, frequency, or plan for care."
    ],
    "uniqueFaqs": [
      {
        "q": "Is online therapy always equivalent to in-person therapy?",
        "a": "No blanket promise applies to every condition, approach, or person. The format should be chosen with attention to your needs and the support required."
      },
      {
        "q": "Are these in-person appointments in San Rafael?",
        "a": "No. Bayside provides virtual individual therapy. You can attend from a private, suitable setting in San Rafael or elsewhere in California; your physical location matters for every appointment."
      },
      {
        "q": "How much do sessions cost, and can I use insurance?",
        "a": "Sessions are $210 for 45 minutes or $280 for 60 minutes. Bayside is a private-pay practice and does not bill insurance directly. A superbill is available for possible out-of-network reimbursement; eligibility and payment depend on your plan."
      },
      {
        "q": "How many sessions will I need?",
        "a": "There is no fixed number of sessions or promised outcome. We can review what is changing, what remains difficult, and whether to adjust the approach, frequency, or plan for care."
      }
    ],
    "contentHeading": "Choosing between virtual and in-person care"
  },
  "therapy-sausalito": {
    "city": "Sausalito",
    "state": "CA",
    "slug": "therapy-sausalito",
    "title": "Individual Therapy for Sausalito Residents",
    "metaTitle": "Therapy in Sausalito | Virtual Sessions",
    "metaDescription": "Therapy for adults in Sausalito, CA. Finding language for what has changed. Virtual sessions with Marcus Ghiasi, LMFT. Free consultation.",
    "h1": "Individual Therapy for Adults in Sausalito, CA",
    "intro": "A concern may begin as irritability, distance, or a sense that daily life feels different. We can start with those observations rather than requiring a complete account of why they are happening. Bayside offers virtual individual therapy to adults in Sausalito who are physically in California for sessions.",
    "localContent": "Marcus Ghiasi is a California Licensed Marriage and Family Therapist, license #158475. Bayside is based in Oakland. Sessions for Sausalito residents take place online from a private setting in California. A place to work on anxiety, low mood, trauma-related concerns, relationships, and life transitions.",
    "whyChoose": [
      "Individual sessions with Marcus Ghiasi, LMFT, California license #158475",
      "Virtual access for Sausalito residents; you must be in California for appointments",
      "A conversation about goals, preferences, and the reasons for a proposed approach",
      "45- or 60-minute private-pay sessions; rates and insurance details are below",
      "Free 15-minute consultation to discuss fit and practical questions"
    ],
    "uniqueContent": [
      "Therapy can draw on CBT for patterns of worry and avoidance, IFS for exploring internal conflict, psychodynamic work for recurring relational themes, or EMDR when memory-focused treatment is appropriate. We discuss the reason for an approach and review how it fits your goals.",
      "<a href=\"/services\">Compare the therapy approaches offered at Bayside.</a> <a href=\"/about\">Read about Marcus and his approach.</a> You can ask about experience relevant to your concern before deciding on care."
    ],
    "uniqueWhatToExpect": [
      "A free 15-minute consultation gives you room to describe what you need, ask questions, and discuss availability. It does not commit you to ongoing sessions.",
      "The first full appointment can explore finding language for what has changed, your history, and the concerns most important to you. You can ask questions about pace, methods, and what to do if something does not feel useful. Session length is 45 or 60 minutes; check current scheduling options when booking.",
      "There is no fixed number of sessions or promised outcome. We can review what is changing, what remains difficult, and whether to adjust the approach, frequency, or plan for care."
    ],
    "uniqueFaqs": [
      {
        "q": "Can we begin with one recent example?",
        "a": "Yes. A specific interaction or difficult day can be a useful way to understand the concern and develop a focus."
      },
      {
        "q": "Are these in-person appointments in Sausalito?",
        "a": "No. Bayside provides virtual individual therapy. You can attend from a private, suitable setting in Sausalito or elsewhere in California; your physical location matters for every appointment."
      },
      {
        "q": "How much do sessions cost, and can I use insurance?",
        "a": "Sessions are $210 for 45 minutes or $280 for 60 minutes. Bayside is a private-pay practice and does not bill insurance directly. A superbill is available for possible out-of-network reimbursement; eligibility and payment depend on your plan."
      },
      {
        "q": "How many sessions will I need?",
        "a": "There is no fixed number of sessions or promised outcome. We can review what is changing, what remains difficult, and whether to adjust the approach, frequency, or plan for care."
      }
    ],
    "contentHeading": "Finding language for what has changed"
  },
  "therapy-mill-valley": {
    "city": "Mill Valley",
    "state": "CA",
    "slug": "therapy-mill-valley",
    "title": "Individual Therapy for Mill Valley Residents",
    "metaTitle": "Therapy in Mill Valley | Virtual Sessions",
    "metaDescription": "Therapy for adults in Mill Valley, CA. When roles in a family are shifting. Virtual sessions with Marcus Ghiasi, LMFT. Free consultation.",
    "h1": "Individual Therapy for Adults in Mill Valley, CA",
    "intro": "Parenthood, caregiving, separation, or changing needs in a family can unsettle familiar roles. Individual therapy can help you examine the expectations you carry and the choices available now. Bayside offers virtual individual therapy to adults in Mill Valley who are physically in California for sessions.",
    "localContent": "Marcus Ghiasi is a California Licensed Marriage and Family Therapist, license #158475. Bayside is based in Oakland. Sessions for Mill Valley residents take place online from a private setting in California. A place to work on anxiety, low mood, trauma-related concerns, relationships, and life transitions.",
    "whyChoose": [
      "Individual sessions with Marcus Ghiasi, LMFT, California license #158475",
      "Virtual access for Mill Valley residents; you must be in California for appointments",
      "A conversation about goals, preferences, and the reasons for a proposed approach",
      "45- or 60-minute private-pay sessions; rates and insurance details are below",
      "Free 15-minute consultation to discuss fit and practical questions"
    ],
    "uniqueContent": [
      "Therapy can draw on CBT for patterns of worry and avoidance, IFS for exploring internal conflict, psychodynamic work for recurring relational themes, or EMDR when memory-focused treatment is appropriate. We discuss the reason for an approach and review how it fits your goals.",
      "<a href=\"/services\">Compare the therapy approaches offered at Bayside.</a> <a href=\"/about\">Read about Marcus and his approach.</a> You can ask about experience relevant to your concern before deciding on care."
    ],
    "uniqueWhatToExpect": [
      "A free 15-minute consultation gives you room to describe what you need, ask questions, and discuss availability. It does not commit you to ongoing sessions.",
      "The first full appointment can explore when roles in a family are shifting, your history, and the concerns most important to you. You can ask questions about pace, methods, and what to do if something does not feel useful. Session length is 45 or 60 minutes; check current scheduling options when booking.",
      "There is no fixed number of sessions or promised outcome. We can review what is changing, what remains difficult, and whether to adjust the approach, frequency, or plan for care."
    ],
    "uniqueFaqs": [
      {
        "q": "Can I work on parenting or family stress individually?",
        "a": "Yes. The focus can be your experience, responses, and boundaries. Individual care is different from treatment involving the whole family."
      },
      {
        "q": "Are these in-person appointments in Mill Valley?",
        "a": "No. Bayside provides virtual individual therapy. You can attend from a private, suitable setting in Mill Valley or elsewhere in California; your physical location matters for every appointment."
      },
      {
        "q": "How much do sessions cost, and can I use insurance?",
        "a": "Sessions are $210 for 45 minutes or $280 for 60 minutes. Bayside is a private-pay practice and does not bill insurance directly. A superbill is available for possible out-of-network reimbursement; eligibility and payment depend on your plan."
      },
      {
        "q": "How many sessions will I need?",
        "a": "There is no fixed number of sessions or promised outcome. We can review what is changing, what remains difficult, and whether to adjust the approach, frequency, or plan for care."
      }
    ],
    "contentHeading": "When roles in a family are shifting"
  },
  "therapy-novato": {
    "city": "Novato",
    "state": "CA",
    "slug": "therapy-novato",
    "title": "Individual Therapy for Novato Residents",
    "metaTitle": "Therapy in Novato | Virtual Sessions",
    "metaDescription": "Therapy for adults in Novato, CA. Reviewing whether a plan still fits. Virtual sessions with Marcus Ghiasi, LMFT. Free consultation.",
    "h1": "Individual Therapy for Adults in Novato, CA",
    "intro": "What you need from therapy may change. It can be useful to revisit goals, pace, and practical constraints rather than continuing automatically. Ending, pausing, or seeking another type of care can be discussed openly. Bayside offers virtual individual therapy to adults in Novato who are physically in California for sessions.",
    "localContent": "Marcus Ghiasi is a California Licensed Marriage and Family Therapist, license #158475. Bayside is based in Oakland. Sessions for Novato residents take place online from a private setting in California. A place to work on anxiety, low mood, trauma-related concerns, relationships, and life transitions.",
    "whyChoose": [
      "Individual sessions with Marcus Ghiasi, LMFT, California license #158475",
      "Virtual access for Novato residents; you must be in California for appointments",
      "A conversation about goals, preferences, and the reasons for a proposed approach",
      "45- or 60-minute private-pay sessions; rates and insurance details are below",
      "Free 15-minute consultation to discuss fit and practical questions"
    ],
    "uniqueContent": [
      "Therapy can draw on CBT for patterns of worry and avoidance, IFS for exploring internal conflict, psychodynamic work for recurring relational themes, or EMDR when memory-focused treatment is appropriate. We discuss the reason for an approach and review how it fits your goals.",
      "<a href=\"/services\">Compare the therapy approaches offered at Bayside.</a> <a href=\"/about\">Read about Marcus and his approach.</a> You can ask about experience relevant to your concern before deciding on care."
    ],
    "uniqueWhatToExpect": [
      "A free 15-minute consultation gives you room to describe what you need, ask questions, and discuss availability. It does not commit you to ongoing sessions.",
      "The first full appointment can explore reviewing whether a plan still fits, your history, and the concerns most important to you. You can ask questions about pace, methods, and what to do if something does not feel useful. Session length is 45 or 60 minutes; check current scheduling options when booking.",
      "There is no fixed number of sessions or promised outcome. We can review what is changing, what remains difficult, and whether to adjust the approach, frequency, or plan for care."
    ],
    "uniqueFaqs": [
      {
        "q": "Can I bring up cost or scheduling difficulties after starting?",
        "a": "Yes. Practical constraints belong in treatment planning. Discuss them early so options can be considered rather than allowing pressure to build."
      },
      {
        "q": "Are these in-person appointments in Novato?",
        "a": "No. Bayside provides virtual individual therapy. You can attend from a private, suitable setting in Novato or elsewhere in California; your physical location matters for every appointment."
      },
      {
        "q": "How much do sessions cost, and can I use insurance?",
        "a": "Sessions are $210 for 45 minutes or $280 for 60 minutes. Bayside is a private-pay practice and does not bill insurance directly. A superbill is available for possible out-of-network reimbursement; eligibility and payment depend on your plan."
      },
      {
        "q": "How many sessions will I need?",
        "a": "There is no fixed number of sessions or promised outcome. We can review what is changing, what remains difficult, and whether to adjust the approach, frequency, or plan for care."
      }
    ],
    "contentHeading": "Reviewing whether a plan still fits"
  },
  "therapy-vallejo": {
    "city": "Vallejo",
    "state": "CA",
    "slug": "therapy-vallejo",
    "title": "Individual Therapy for Vallejo Residents",
    "metaTitle": "Therapy in Vallejo | Virtual Sessions",
    "metaDescription": "Therapy for adults in Vallejo, CA. Letting the consultation be a two-way conversation. Virtual sessions with Marcus Ghiasi, LMFT. Free consultation.",
    "h1": "Individual Therapy for Adults in Vallejo, CA",
    "intro": "You are evaluating the therapist as well as describing your concerns. Ask about relevant experience, methods, limits, and how a recommendation would be made. You do not owe a decision during the call. Bayside offers virtual individual therapy to adults in Vallejo who are physically in California for sessions.",
    "localContent": "Marcus Ghiasi is a California Licensed Marriage and Family Therapist, license #158475. Bayside is based in Oakland. Sessions for Vallejo residents take place online from a private setting in California. A place to work on anxiety, low mood, trauma-related concerns, relationships, and life transitions.",
    "whyChoose": [
      "Individual sessions with Marcus Ghiasi, LMFT, California license #158475",
      "Virtual access for Vallejo residents; you must be in California for appointments",
      "A conversation about goals, preferences, and the reasons for a proposed approach",
      "45- or 60-minute private-pay sessions; rates and insurance details are below",
      "Free 15-minute consultation to discuss fit and practical questions"
    ],
    "uniqueContent": [
      "Therapy can draw on CBT for patterns of worry and avoidance, IFS for exploring internal conflict, psychodynamic work for recurring relational themes, or EMDR when memory-focused treatment is appropriate. We discuss the reason for an approach and review how it fits your goals.",
      "<a href=\"/services\">Compare the therapy approaches offered at Bayside.</a> <a href=\"/about\">Read about Marcus and his approach.</a> You can ask about experience relevant to your concern before deciding on care."
    ],
    "uniqueWhatToExpect": [
      "A free 15-minute consultation gives you room to describe what you need, ask questions, and discuss availability. It does not commit you to ongoing sessions.",
      "The first full appointment can explore letting the consultation be a two-way conversation, your history, and the concerns most important to you. You can ask questions about pace, methods, and what to do if something does not feel useful. Session length is 45 or 60 minutes; check current scheduling options when booking.",
      "There is no fixed number of sessions or promised outcome. We can review what is changing, what remains difficult, and whether to adjust the approach, frequency, or plan for care."
    ],
    "uniqueFaqs": [
      {
        "q": "What happens if Bayside is not the right fit?",
        "a": "The consultation can identify that too. You can ask what kind of service or provider may be more appropriate without committing to care here."
      },
      {
        "q": "Are these in-person appointments in Vallejo?",
        "a": "No. Bayside provides virtual individual therapy. You can attend from a private, suitable setting in Vallejo or elsewhere in California; your physical location matters for every appointment."
      },
      {
        "q": "How much do sessions cost, and can I use insurance?",
        "a": "Sessions are $210 for 45 minutes or $280 for 60 minutes. Bayside is a private-pay practice and does not bill insurance directly. A superbill is available for possible out-of-network reimbursement; eligibility and payment depend on your plan."
      },
      {
        "q": "How many sessions will I need?",
        "a": "There is no fixed number of sessions or promised outcome. We can review what is changing, what remains difficult, and whether to adjust the approach, frequency, or plan for care."
      }
    ],
    "contentHeading": "Letting the consultation be a two-way conversation"
  },
  "therapy-petaluma": {
    "city": "Petaluma",
    "state": "CA",
    "slug": "therapy-petaluma",
    "title": "Individual Therapy for Petaluma Residents",
    "metaTitle": "Therapy in Petaluma | Virtual Sessions",
    "metaDescription": "Therapy for adults in Petaluma, CA. Approaching loss without a deadline. Virtual sessions with Marcus Ghiasi, LMFT. Free consultation.",
    "h1": "Individual Therapy for Adults in Petaluma, CA",
    "intro": "Loss can involve a person, a relationship, a role, or a future you expected. Therapy can make room for grief alongside the practical demands that continue, without prescribing how you should feel or how quickly to move forward. Bayside offers virtual individual therapy to adults in Petaluma who are physically in California for sessions.",
    "localContent": "Marcus Ghiasi is a California Licensed Marriage and Family Therapist, license #158475. Bayside is based in Oakland. Sessions for Petaluma residents take place online from a private setting in California. A place to work on anxiety, low mood, trauma-related concerns, relationships, and life transitions.",
    "whyChoose": [
      "Individual sessions with Marcus Ghiasi, LMFT, California license #158475",
      "Virtual access for Petaluma residents; you must be in California for appointments",
      "A conversation about goals, preferences, and the reasons for a proposed approach",
      "45- or 60-minute private-pay sessions; rates and insurance details are below",
      "Free 15-minute consultation to discuss fit and practical questions"
    ],
    "uniqueContent": [
      "Therapy can draw on CBT for patterns of worry and avoidance, IFS for exploring internal conflict, psychodynamic work for recurring relational themes, or EMDR when memory-focused treatment is appropriate. We discuss the reason for an approach and review how it fits your goals.",
      "<a href=\"/services\">Compare the therapy approaches offered at Bayside.</a> <a href=\"/about\">Read about Marcus and his approach.</a> You can ask about experience relevant to your concern before deciding on care."
    ],
    "uniqueWhatToExpect": [
      "A free 15-minute consultation gives you room to describe what you need, ask questions, and discuss availability. It does not commit you to ongoing sessions.",
      "The first full appointment can explore approaching loss without a deadline, your history, and the concerns most important to you. You can ask questions about pace, methods, and what to do if something does not feel useful. Session length is 45 or 60 minutes; check current scheduling options when booking.",
      "There is no fixed number of sessions or promised outcome. We can review what is changing, what remains difficult, and whether to adjust the approach, frequency, or plan for care."
    ],
    "uniqueFaqs": [
      {
        "q": "Do I need to turn grief into a positive lesson?",
        "a": "No. The work can focus on making room for the loss and finding support. Meaning, if it develops, does not need to be forced."
      },
      {
        "q": "Are these in-person appointments in Petaluma?",
        "a": "No. Bayside provides virtual individual therapy. You can attend from a private, suitable setting in Petaluma or elsewhere in California; your physical location matters for every appointment."
      },
      {
        "q": "How much do sessions cost, and can I use insurance?",
        "a": "Sessions are $210 for 45 minutes or $280 for 60 minutes. Bayside is a private-pay practice and does not bill insurance directly. A superbill is available for possible out-of-network reimbursement; eligibility and payment depend on your plan."
      },
      {
        "q": "How many sessions will I need?",
        "a": "There is no fixed number of sessions or promised outcome. We can review what is changing, what remains difficult, and whether to adjust the approach, frequency, or plan for care."
      }
    ],
    "contentHeading": "Approaching loss without a deadline"
  },
  "therapy-marin-city": {
    "city": "Marin City",
    "state": "CA",
    "slug": "therapy-marin-city",
    "title": "Individual Therapy for Marin City Residents",
    "metaTitle": "Therapy in Marin City | Virtual Sessions",
    "metaDescription": "Therapy for adults in Marin City, CA. Keeping identity and context in the conversation. Virtual sessions with Marcus Ghiasi, LMFT. Free consultation.",
    "h1": "Individual Therapy for Adults in Marin City, CA",
    "intro": "Stress does not occur outside the rest of your life. We can consider relationships, culture, finances, discrimination, and community as relevant, without assuming that a city or identity predicts your experience. Bayside offers virtual individual therapy to adults in Marin City who are physically in California for sessions.",
    "localContent": "Marcus Ghiasi is a California Licensed Marriage and Family Therapist, license #158475. Bayside is based in Oakland. Sessions for Marin City residents take place online from a private setting in California. A place to work on anxiety, low mood, trauma-related concerns, relationships, and life transitions.",
    "whyChoose": [
      "Individual sessions with Marcus Ghiasi, LMFT, California license #158475",
      "Virtual access for Marin City residents; you must be in California for appointments",
      "A conversation about goals, preferences, and the reasons for a proposed approach",
      "45- or 60-minute private-pay sessions; rates and insurance details are below",
      "Free 15-minute consultation to discuss fit and practical questions"
    ],
    "uniqueContent": [
      "Therapy can draw on CBT for patterns of worry and avoidance, IFS for exploring internal conflict, psychodynamic work for recurring relational themes, or EMDR when memory-focused treatment is appropriate. We discuss the reason for an approach and review how it fits your goals.",
      "<a href=\"/services\">Compare the therapy approaches offered at Bayside.</a> <a href=\"/about\">Read about Marcus and his approach.</a> You can ask about experience relevant to your concern before deciding on care."
    ],
    "uniqueWhatToExpect": [
      "A free 15-minute consultation gives you room to describe what you need, ask questions, and discuss availability. It does not commit you to ongoing sessions.",
      "The first full appointment can explore keeping identity and context in the conversation, your history, and the concerns most important to you. You can ask questions about pace, methods, and what to do if something does not feel useful. Session length is 45 or 60 minutes; check current scheduling options when booking.",
      "There is no fixed number of sessions or promised outcome. We can review what is changing, what remains difficult, and whether to adjust the approach, frequency, or plan for care."
    ],
    "uniqueFaqs": [
      {
        "q": "Can I ask whether the practice understands my concerns?",
        "a": "Yes. Use the consultation to ask about relevant experience and any specific need. Affirming care includes being clear about the limits of a provider’s scope."
      },
      {
        "q": "Are these in-person appointments in Marin City?",
        "a": "No. Bayside provides virtual individual therapy. You can attend from a private, suitable setting in Marin City or elsewhere in California; your physical location matters for every appointment."
      },
      {
        "q": "How much do sessions cost, and can I use insurance?",
        "a": "Sessions are $210 for 45 minutes or $280 for 60 minutes. Bayside is a private-pay practice and does not bill insurance directly. A superbill is available for possible out-of-network reimbursement; eligibility and payment depend on your plan."
      },
      {
        "q": "How many sessions will I need?",
        "a": "There is no fixed number of sessions or promised outcome. We can review what is changing, what remains difficult, and whether to adjust the approach, frequency, or plan for care."
      }
    ],
    "contentHeading": "Keeping identity and context in the conversation"
  },
  "emdr-therapy-san-francisco": {
    "city": "San Francisco",
    "state": "CA",
    "slug": "emdr-therapy-san-francisco",
    "title": "EMDR Therapy for San Francisco Residents",
    "metaTitle": "EMDR Therapy in San Francisco | Virtual Sessions",
    "metaDescription": "EMDR Therapy for adults in San Francisco, CA. When a memory keeps interrupting the present. Virtual sessions with Marcus Ghiasi, LMFT. Free consultation.",
    "h1": "EMDR Therapy for Adults in San Francisco, CA",
    "intro": "A reminder of an accident, loss, or frightening experience can bring back distress even when you know the event is over. In therapy, we can explore the reminders, their effect on daily life, and whether memory-focused work is an appropriate next step. Bayside offers virtual individual therapy to adults in San Francisco who are physically in California for sessions.",
    "localContent": "Marcus Ghiasi is a California Licensed Marriage and Family Therapist, license #158475. Bayside is based in Oakland. Sessions for San Francisco residents take place online from a private setting in California. A structured approach to working with distressing memories and the reactions connected to them.",
    "whyChoose": [
      "Individual sessions with Marcus Ghiasi, LMFT, California license #158475",
      "Virtual access for San Francisco residents; you must be in California for appointments",
      "A conversation about goals, preferences, and the reasons for a proposed approach",
      "45- or 60-minute private-pay sessions; rates and insurance details are below",
      "Free 15-minute consultation to discuss fit and practical questions"
    ],
    "uniqueContent": [
      "EMDR involves assessment, preparation, and work with selected memories using bilateral stimulation, such as guided eye movements. Processing does not have to begin in the first session. We discuss your history, ways to manage distress, and whether this approach fits your needs.",
      "<a href=\"/services/emdr\">Read about EMDR Therapy at Bayside.</a> The service overview explains the approach; a consultation can help clarify whether it fits your situation.",
      "<a href=\"https://www.ptsd.va.gov/understand_tx/emdr.asp\" target=\"_blank\" rel=\"noopener noreferrer\">The VA explains EMDR for PTSD.</a>"
    ],
    "uniqueWhatToExpect": [
      "A free 15-minute consultation gives you room to describe what you need, ask questions, and discuss availability. It does not commit you to ongoing sessions.",
      "The first full appointment can explore when a memory keeps interrupting the present, your history, and the concerns most important to you. You can ask questions about pace, methods, and what to do if something does not feel useful. Session length is 45 or 60 minutes; check current scheduling options when booking.",
      "There is no fixed number of sessions or promised outcome. We can review what is changing, what remains difficult, and whether to adjust the approach, frequency, or plan for care."
    ],
    "uniqueFaqs": [
      {
        "q": "Do I need to describe every detail of what happened?",
        "a": "You can ask about how much sharing a particular approach involves. EMDR does not require a detailed spoken account of every aspect of an experience, but it does involve attending to difficult material. We discuss pacing and your ability to pause before processing."
      },
      {
        "q": "Are these in-person appointments in San Francisco?",
        "a": "No. Bayside provides virtual individual therapy. You can attend from a private, suitable setting in San Francisco or elsewhere in California; your physical location matters for every appointment."
      },
      {
        "q": "How much do sessions cost, and can I use insurance?",
        "a": "Sessions are $210 for 45 minutes or $280 for 60 minutes. Bayside is a private-pay practice and does not bill insurance directly. A superbill is available for possible out-of-network reimbursement; eligibility and payment depend on your plan."
      },
      {
        "q": "How many sessions will I need?",
        "a": "There is no fixed number of sessions or promised outcome. We can review what is changing, what remains difficult, and whether to adjust the approach, frequency, or plan for care."
      }
    ],
    "contentHeading": "When a memory keeps interrupting the present"
  },
  "emdr-therapy-oakland": {
    "city": "Oakland",
    "state": "CA",
    "slug": "emdr-therapy-oakland",
    "title": "EMDR Therapy for Oakland Residents",
    "metaTitle": "EMDR Therapy in Oakland | Virtual Sessions",
    "metaDescription": "EMDR Therapy for adults in Oakland, CA. Preparing before working with trauma. Virtual sessions with Marcus Ghiasi, LMFT. Free consultation.",
    "h1": "EMDR Therapy for Adults in Oakland, CA",
    "intro": "Wanting relief and feeling hesitant about revisiting an experience can coexist. Preparation includes learning what helps you stay oriented to the present, discussing what to do if distress rises, and making a plan for after sessions. Readiness is an ongoing conversation. Bayside offers virtual individual therapy to adults in Oakland who are physically in California for sessions.",
    "localContent": "Marcus Ghiasi is a California Licensed Marriage and Family Therapist, license #158475. Bayside is based in Oakland and provides virtual individual sessions, rather than in-person office appointments. A structured approach to working with distressing memories and the reactions connected to them.",
    "whyChoose": [
      "Individual sessions with Marcus Ghiasi, LMFT, California license #158475",
      "Virtual access for Oakland residents; you must be in California for appointments",
      "A conversation about goals, preferences, and the reasons for a proposed approach",
      "45- or 60-minute private-pay sessions; rates and insurance details are below",
      "Free 15-minute consultation to discuss fit and practical questions"
    ],
    "uniqueContent": [
      "EMDR involves assessment, preparation, and work with selected memories using bilateral stimulation, such as guided eye movements. Processing does not have to begin in the first session. We discuss your history, ways to manage distress, and whether this approach fits your needs.",
      "<a href=\"/services/emdr\">Read about EMDR Therapy at Bayside.</a> The service overview explains the approach; a consultation can help clarify whether it fits your situation.",
      "<a href=\"https://www.ptsd.va.gov/understand_tx/emdr.asp\" target=\"_blank\" rel=\"noopener noreferrer\">The VA explains EMDR for PTSD.</a>"
    ],
    "uniqueWhatToExpect": [
      "A free 15-minute consultation gives you room to describe what you need, ask questions, and discuss availability. It does not commit you to ongoing sessions.",
      "The first full appointment can explore preparing before working with trauma, your history, and the concerns most important to you. You can ask questions about pace, methods, and what to do if something does not feel useful. Session length is 45 or 60 minutes; check current scheduling options when booking.",
      "There is no fixed number of sessions or promised outcome. We can review what is changing, what remains difficult, and whether to adjust the approach, frequency, or plan for care."
    ],
    "uniqueFaqs": [
      {
        "q": "Can we spend time preparing before processing memories?",
        "a": "Yes. Assessment, preparation, and checking how you are responding are part of the work. We can slow down or reconsider the plan if the level of distress becomes difficult to manage."
      },
      {
        "q": "Are these in-person appointments in Oakland?",
        "a": "No. Bayside provides virtual individual therapy. You can attend from a private, suitable setting in Oakland or elsewhere in California; your physical location matters for every appointment."
      },
      {
        "q": "How much do sessions cost, and can I use insurance?",
        "a": "Sessions are $210 for 45 minutes or $280 for 60 minutes. Bayside is a private-pay practice and does not bill insurance directly. A superbill is available for possible out-of-network reimbursement; eligibility and payment depend on your plan."
      },
      {
        "q": "How many sessions will I need?",
        "a": "There is no fixed number of sessions or promised outcome. We can review what is changing, what remains difficult, and whether to adjust the approach, frequency, or plan for care."
      }
    ],
    "contentHeading": "Preparing before working with trauma"
  },
  "emdr-therapy-berkeley": {
    "city": "Berkeley",
    "state": "CA",
    "slug": "emdr-therapy-berkeley",
    "title": "EMDR Therapy for Berkeley Residents",
    "metaTitle": "EMDR Therapy in Berkeley | Virtual Sessions",
    "metaDescription": "EMDR Therapy for adults in Berkeley, CA. Understanding reminders and avoidance. Virtual sessions with Marcus Ghiasi, LMFT. Free consultation.",
    "h1": "EMDR Therapy for Adults in Berkeley, CA",
    "intro": "Avoiding a place, conversation, or situation may bring short-term relief while making life smaller over time. We can look at what feels unsafe, what is difficult now, and whether EMDR or another approach offers a reasonable way forward. Bayside offers virtual individual therapy to adults in Berkeley who are physically in California for sessions.",
    "localContent": "Marcus Ghiasi is a California Licensed Marriage and Family Therapist, license #158475. Bayside is based in Oakland. Sessions for Berkeley residents take place online from a private setting in California. A structured approach to working with distressing memories and the reactions connected to them.",
    "whyChoose": [
      "Individual sessions with Marcus Ghiasi, LMFT, California license #158475",
      "Virtual access for Berkeley residents; you must be in California for appointments",
      "A conversation about goals, preferences, and the reasons for a proposed approach",
      "45- or 60-minute private-pay sessions; rates and insurance details are below",
      "Free 15-minute consultation to discuss fit and practical questions"
    ],
    "uniqueContent": [
      "EMDR involves assessment, preparation, and work with selected memories using bilateral stimulation, such as guided eye movements. Processing does not have to begin in the first session. We discuss your history, ways to manage distress, and whether this approach fits your needs.",
      "<a href=\"/services/emdr\">Read about EMDR Therapy at Bayside.</a> The service overview explains the approach; a consultation can help clarify whether it fits your situation.",
      "<a href=\"https://www.ptsd.va.gov/understand_tx/emdr.asp\" target=\"_blank\" rel=\"noopener noreferrer\">The VA explains EMDR for PTSD.</a>"
    ],
    "uniqueWhatToExpect": [
      "A free 15-minute consultation gives you room to describe what you need, ask questions, and discuss availability. It does not commit you to ongoing sessions.",
      "The first full appointment can explore understanding reminders and avoidance, your history, and the concerns most important to you. You can ask questions about pace, methods, and what to do if something does not feel useful. Session length is 45 or 60 minutes; check current scheduling options when booking.",
      "There is no fixed number of sessions or promised outcome. We can review what is changing, what remains difficult, and whether to adjust the approach, frequency, or plan for care."
    ],
    "uniqueFaqs": [
      {
        "q": "Is every strong reaction a sign that I need EMDR?",
        "a": "No. Strong reactions can have many causes. An assessment helps distinguish current stress, anxiety, trauma-related symptoms, and other concerns rather than assuming that all distress comes from an unprocessed memory."
      },
      {
        "q": "Are these in-person appointments in Berkeley?",
        "a": "No. Bayside provides virtual individual therapy. You can attend from a private, suitable setting in Berkeley or elsewhere in California; your physical location matters for every appointment."
      },
      {
        "q": "How much do sessions cost, and can I use insurance?",
        "a": "Sessions are $210 for 45 minutes or $280 for 60 minutes. Bayside is a private-pay practice and does not bill insurance directly. A superbill is available for possible out-of-network reimbursement; eligibility and payment depend on your plan."
      },
      {
        "q": "How many sessions will I need?",
        "a": "There is no fixed number of sessions or promised outcome. We can review what is changing, what remains difficult, and whether to adjust the approach, frequency, or plan for care."
      }
    ],
    "contentHeading": "Understanding reminders and avoidance"
  },
  "emdr-therapy-san-jose": {
    "city": "San Jose",
    "state": "CA",
    "slug": "emdr-therapy-san-jose",
    "title": "EMDR Therapy for San Jose Residents",
    "metaTitle": "EMDR Therapy in San Jose | Virtual Sessions",
    "metaDescription": "EMDR Therapy for adults in San Jose, CA. When insight has not brought enough relief. Virtual sessions with Marcus Ghiasi, LMFT. Free consultation.",
    "h1": "EMDR Therapy for Adults in San Jose, CA",
    "intro": "You may understand an experience and still struggle with the feelings it brings up. That does not mean previous therapy failed. We can discuss what helped, what did not, and whether adding a structured trauma-focused approach makes sense. Bayside offers virtual individual therapy to adults in San Jose who are physically in California for sessions.",
    "localContent": "Marcus Ghiasi is a California Licensed Marriage and Family Therapist, license #158475. Bayside is based in Oakland. Sessions for San Jose residents take place online from a private setting in California. A structured approach to working with distressing memories and the reactions connected to them.",
    "whyChoose": [
      "Individual sessions with Marcus Ghiasi, LMFT, California license #158475",
      "Virtual access for San Jose residents; you must be in California for appointments",
      "A conversation about goals, preferences, and the reasons for a proposed approach",
      "45- or 60-minute private-pay sessions; rates and insurance details are below",
      "Free 15-minute consultation to discuss fit and practical questions"
    ],
    "uniqueContent": [
      "EMDR involves assessment, preparation, and work with selected memories using bilateral stimulation, such as guided eye movements. Processing does not have to begin in the first session. We discuss your history, ways to manage distress, and whether this approach fits your needs.",
      "<a href=\"/services/emdr\">Read about EMDR Therapy at Bayside.</a> The service overview explains the approach; a consultation can help clarify whether it fits your situation.",
      "<a href=\"https://www.ptsd.va.gov/understand_tx/emdr.asp\" target=\"_blank\" rel=\"noopener noreferrer\">The VA explains EMDR for PTSD.</a>"
    ],
    "uniqueWhatToExpect": [
      "A free 15-minute consultation gives you room to describe what you need, ask questions, and discuss availability. It does not commit you to ongoing sessions.",
      "The first full appointment can explore when insight has not brought enough relief, your history, and the concerns most important to you. You can ask questions about pace, methods, and what to do if something does not feel useful. Session length is 45 or 60 minutes; check current scheduling options when booking.",
      "There is no fixed number of sessions or promised outcome. We can review what is changing, what remains difficult, and whether to adjust the approach, frequency, or plan for care."
    ],
    "uniqueFaqs": [
      {
        "q": "Does EMDR replace all other therapy?",
        "a": "Not necessarily. It may be part of a broader plan that also addresses current relationships, coping, and everyday stress. The plan depends on your goals and how you respond, rather than a belief that one method is best for everyone."
      },
      {
        "q": "Are these in-person appointments in San Jose?",
        "a": "No. Bayside provides virtual individual therapy. You can attend from a private, suitable setting in San Jose or elsewhere in California; your physical location matters for every appointment."
      },
      {
        "q": "How much do sessions cost, and can I use insurance?",
        "a": "Sessions are $210 for 45 minutes or $280 for 60 minutes. Bayside is a private-pay practice and does not bill insurance directly. A superbill is available for possible out-of-network reimbursement; eligibility and payment depend on your plan."
      },
      {
        "q": "How many sessions will I need?",
        "a": "There is no fixed number of sessions or promised outcome. We can review what is changing, what remains difficult, and whether to adjust the approach, frequency, or plan for care."
      }
    ],
    "contentHeading": "When insight has not brought enough relief"
  },
  "emdr-therapy-palo-alto": {
    "city": "Palo Alto",
    "state": "CA",
    "slug": "emdr-therapy-palo-alto",
    "title": "EMDR Therapy for Palo Alto Residents",
    "metaTitle": "EMDR Therapy in Palo Alto | Virtual Sessions",
    "metaDescription": "EMDR Therapy for adults in Palo Alto, CA. Deciding whether virtual EMDR fits. Virtual sessions with Marcus Ghiasi, LMFT. Free consultation.",
    "h1": "EMDR Therapy for Adults in Palo Alto, CA",
    "intro": "Working from home can remove travel, but trauma work still needs privacy and a workable plan for support. Before starting, we discuss your setting, connection, ability to stay engaged, and what happens if a session is interrupted. Bayside offers virtual individual therapy to adults in Palo Alto who are physically in California for sessions.",
    "localContent": "Marcus Ghiasi is a California Licensed Marriage and Family Therapist, license #158475. Bayside is based in Oakland. Sessions for Palo Alto residents take place online from a private setting in California. A structured approach to working with distressing memories and the reactions connected to them.",
    "whyChoose": [
      "Individual sessions with Marcus Ghiasi, LMFT, California license #158475",
      "Virtual access for Palo Alto residents; you must be in California for appointments",
      "A conversation about goals, preferences, and the reasons for a proposed approach",
      "45- or 60-minute private-pay sessions; rates and insurance details are below",
      "Free 15-minute consultation to discuss fit and practical questions"
    ],
    "uniqueContent": [
      "EMDR involves assessment, preparation, and work with selected memories using bilateral stimulation, such as guided eye movements. Processing does not have to begin in the first session. We discuss your history, ways to manage distress, and whether this approach fits your needs.",
      "<a href=\"/services/emdr\">Read about EMDR Therapy at Bayside.</a> The service overview explains the approach; a consultation can help clarify whether it fits your situation.",
      "<a href=\"https://www.ptsd.va.gov/understand_tx/emdr.asp\" target=\"_blank\" rel=\"noopener noreferrer\">The VA explains EMDR for PTSD.</a>"
    ],
    "uniqueWhatToExpect": [
      "A free 15-minute consultation gives you room to describe what you need, ask questions, and discuss availability. It does not commit you to ongoing sessions.",
      "The first full appointment can explore deciding whether virtual emdr fits, your history, and the concerns most important to you. You can ask questions about pace, methods, and what to do if something does not feel useful. Session length is 45 or 60 minutes; check current scheduling options when booking.",
      "There is no fixed number of sessions or promised outcome. We can review what is changing, what remains difficult, and whether to adjust the approach, frequency, or plan for care."
    ],
    "uniqueFaqs": [
      {
        "q": "Can I do EMDR remotely?",
        "a": "It can be offered through telehealth when clinically appropriate. We assess the practical setup and your needs first. If another format or level of support would fit better, that should be part of the discussion."
      },
      {
        "q": "Are these in-person appointments in Palo Alto?",
        "a": "No. Bayside provides virtual individual therapy. You can attend from a private, suitable setting in Palo Alto or elsewhere in California; your physical location matters for every appointment."
      },
      {
        "q": "How much do sessions cost, and can I use insurance?",
        "a": "Sessions are $210 for 45 minutes or $280 for 60 minutes. Bayside is a private-pay practice and does not bill insurance directly. A superbill is available for possible out-of-network reimbursement; eligibility and payment depend on your plan."
      },
      {
        "q": "How many sessions will I need?",
        "a": "There is no fixed number of sessions or promised outcome. We can review what is changing, what remains difficult, and whether to adjust the approach, frequency, or plan for care."
      }
    ],
    "contentHeading": "Deciding whether virtual EMDR fits"
  },
  "ifs-therapy-san-francisco": {
    "city": "San Francisco",
    "state": "CA",
    "slug": "ifs-therapy-san-francisco",
    "title": "IFS Therapy for San Francisco Residents",
    "metaTitle": "IFS Therapy in San Francisco | Virtual Sessions",
    "metaDescription": "IFS Therapy for adults in San Francisco, CA. When your inner critic takes over. Virtual sessions with Marcus Ghiasi, LMFT. Free consultation.",
    "h1": "IFS Therapy for Adults in San Francisco, CA",
    "intro": "Self-criticism can sound like a plan for improvement while leaving you more anxious or discouraged. Parts work can explore what the critical voice is trying to prevent, how it affects you, and other ways to respond to mistakes. Bayside offers virtual individual therapy to adults in San Francisco who are physically in California for sessions.",
    "localContent": "Marcus Ghiasi is a California Licensed Marriage and Family Therapist, license #158475. Bayside is based in Oakland. Sessions for San Francisco residents take place online from a private setting in California. Individual parts work for understanding inner conflict, self-criticism, and protective habits.",
    "whyChoose": [
      "Individual sessions with Marcus Ghiasi, LMFT, California license #158475",
      "Virtual access for San Francisco residents; you must be in California for appointments",
      "A conversation about goals, preferences, and the reasons for a proposed approach",
      "45- or 60-minute private-pay sessions; rates and insurance details are below",
      "Free 15-minute consultation to discuss fit and practical questions"
    ],
    "uniqueContent": [
      "Internal Family Systems uses the language of parts to explore different feelings, needs, and ways of coping. You might notice a part that pushes hard and another that wants to withdraw. We can approach both with curiosity without treating them as separate people or assuming the model explains every experience.",
      "<a href=\"/services/ifs\">Read about IFS Therapy (Parts Work) at Bayside.</a> The service overview explains the approach; a consultation can help clarify whether it fits your situation."
    ],
    "uniqueWhatToExpect": [
      "A free 15-minute consultation gives you room to describe what you need, ask questions, and discuss availability. It does not commit you to ongoing sessions.",
      "The first full appointment can explore when your inner critic takes over, your history, and the concerns most important to you. You can ask questions about pace, methods, and what to do if something does not feel useful. Session length is 45 or 60 minutes; check current scheduling options when booking.",
      "There is no fixed number of sessions or promised outcome. We can review what is changing, what remains difficult, and whether to adjust the approach, frequency, or plan for care."
    ],
    "uniqueFaqs": [
      {
        "q": "Do I have to believe in parts for IFS to be useful?",
        "a": "No. Parts can be a way to describe conflicting reactions, much like saying part of me wants to speak and part of me is afraid. We can use language that feels natural to you or choose another approach."
      },
      {
        "q": "Are these in-person appointments in San Francisco?",
        "a": "No. Bayside provides virtual individual therapy. You can attend from a private, suitable setting in San Francisco or elsewhere in California; your physical location matters for every appointment."
      },
      {
        "q": "How much do sessions cost, and can I use insurance?",
        "a": "Sessions are $210 for 45 minutes or $280 for 60 minutes. Bayside is a private-pay practice and does not bill insurance directly. A superbill is available for possible out-of-network reimbursement; eligibility and payment depend on your plan."
      },
      {
        "q": "How many sessions will I need?",
        "a": "There is no fixed number of sessions or promised outcome. We can review what is changing, what remains difficult, and whether to adjust the approach, frequency, or plan for care."
      }
    ],
    "contentHeading": "When your inner critic takes over"
  },
  "ifs-therapy-oakland": {
    "city": "Oakland",
    "state": "CA",
    "slug": "ifs-therapy-oakland",
    "title": "IFS Therapy for Oakland Residents",
    "metaTitle": "IFS Therapy in Oakland | Virtual Sessions",
    "metaDescription": "IFS Therapy for adults in Oakland, CA. Wanting closeness and wanting distance. Virtual sessions with Marcus Ghiasi, LMFT. Free consultation.",
    "h1": "IFS Therapy for Adults in Oakland, CA",
    "intro": "You may want support and then pull back when someone offers it. Instead of deciding which reaction is the real you, we can explore the needs behind both and practice responding with more choice in relationships. Bayside offers virtual individual therapy to adults in Oakland who are physically in California for sessions.",
    "localContent": "Marcus Ghiasi is a California Licensed Marriage and Family Therapist, license #158475. Bayside is based in Oakland and provides virtual individual sessions, rather than in-person office appointments. Individual parts work for understanding inner conflict, self-criticism, and protective habits.",
    "whyChoose": [
      "Individual sessions with Marcus Ghiasi, LMFT, California license #158475",
      "Virtual access for Oakland residents; you must be in California for appointments",
      "A conversation about goals, preferences, and the reasons for a proposed approach",
      "45- or 60-minute private-pay sessions; rates and insurance details are below",
      "Free 15-minute consultation to discuss fit and practical questions"
    ],
    "uniqueContent": [
      "Internal Family Systems uses the language of parts to explore different feelings, needs, and ways of coping. You might notice a part that pushes hard and another that wants to withdraw. We can approach both with curiosity without treating them as separate people or assuming the model explains every experience.",
      "<a href=\"/services/ifs\">Read about IFS Therapy (Parts Work) at Bayside.</a> The service overview explains the approach; a consultation can help clarify whether it fits your situation."
    ],
    "uniqueWhatToExpect": [
      "A free 15-minute consultation gives you room to describe what you need, ask questions, and discuss availability. It does not commit you to ongoing sessions.",
      "The first full appointment can explore wanting closeness and wanting distance, your history, and the concerns most important to you. You can ask questions about pace, methods, and what to do if something does not feel useful. Session length is 45 or 60 minutes; check current scheduling options when booking.",
      "There is no fixed number of sessions or promised outcome. We can review what is changing, what remains difficult, and whether to adjust the approach, frequency, or plan for care."
    ],
    "uniqueFaqs": [
      {
        "q": "Is IFS the same as family therapy?",
        "a": "No. At Bayside, IFS is used in individual sessions to explore your internal experience. It does not involve bringing family members into treatment."
      },
      {
        "q": "Are these in-person appointments in Oakland?",
        "a": "No. Bayside provides virtual individual therapy. You can attend from a private, suitable setting in Oakland or elsewhere in California; your physical location matters for every appointment."
      },
      {
        "q": "How much do sessions cost, and can I use insurance?",
        "a": "Sessions are $210 for 45 minutes or $280 for 60 minutes. Bayside is a private-pay practice and does not bill insurance directly. A superbill is available for possible out-of-network reimbursement; eligibility and payment depend on your plan."
      },
      {
        "q": "How many sessions will I need?",
        "a": "There is no fixed number of sessions or promised outcome. We can review what is changing, what remains difficult, and whether to adjust the approach, frequency, or plan for care."
      }
    ],
    "contentHeading": "Wanting closeness and wanting distance"
  },
  "ifs-therapy-berkeley": {
    "city": "Berkeley",
    "state": "CA",
    "slug": "ifs-therapy-berkeley",
    "title": "IFS Therapy for Berkeley Residents",
    "metaTitle": "IFS Therapy in Berkeley | Virtual Sessions",
    "metaDescription": "IFS Therapy for adults in Berkeley, CA. When being dependable becomes exhausting. Virtual sessions with Marcus Ghiasi, LMFT. Free consultation.",
    "h1": "IFS Therapy for Adults in Berkeley, CA",
    "intro": "Saying yes can be tied to care, fear of conflict, or uncertainty about what you are allowed to need. We can explore the pressure to remain available and develop boundaries that reflect your circumstances and values. Bayside offers virtual individual therapy to adults in Berkeley who are physically in California for sessions.",
    "localContent": "Marcus Ghiasi is a California Licensed Marriage and Family Therapist, license #158475. Bayside is based in Oakland. Sessions for Berkeley residents take place online from a private setting in California. Individual parts work for understanding inner conflict, self-criticism, and protective habits.",
    "whyChoose": [
      "Individual sessions with Marcus Ghiasi, LMFT, California license #158475",
      "Virtual access for Berkeley residents; you must be in California for appointments",
      "A conversation about goals, preferences, and the reasons for a proposed approach",
      "45- or 60-minute private-pay sessions; rates and insurance details are below",
      "Free 15-minute consultation to discuss fit and practical questions"
    ],
    "uniqueContent": [
      "Internal Family Systems uses the language of parts to explore different feelings, needs, and ways of coping. You might notice a part that pushes hard and another that wants to withdraw. We can approach both with curiosity without treating them as separate people or assuming the model explains every experience.",
      "<a href=\"/services/ifs\">Read about IFS Therapy (Parts Work) at Bayside.</a> The service overview explains the approach; a consultation can help clarify whether it fits your situation."
    ],
    "uniqueWhatToExpect": [
      "A free 15-minute consultation gives you room to describe what you need, ask questions, and discuss availability. It does not commit you to ongoing sessions.",
      "The first full appointment can explore when being dependable becomes exhausting, your history, and the concerns most important to you. You can ask questions about pace, methods, and what to do if something does not feel useful. Session length is 45 or 60 minutes; check current scheduling options when booking.",
      "There is no fixed number of sessions or promised outcome. We can review what is changing, what remains difficult, and whether to adjust the approach, frequency, or plan for care."
    ],
    "uniqueFaqs": [
      {
        "q": "Will parts work tell me to stop helping people?",
        "a": "The aim is not to remove generosity or responsibility. It is to understand when helping is a choice and when it comes at an unsustainable cost, then consider what you want to change."
      },
      {
        "q": "Are these in-person appointments in Berkeley?",
        "a": "No. Bayside provides virtual individual therapy. You can attend from a private, suitable setting in Berkeley or elsewhere in California; your physical location matters for every appointment."
      },
      {
        "q": "How much do sessions cost, and can I use insurance?",
        "a": "Sessions are $210 for 45 minutes or $280 for 60 minutes. Bayside is a private-pay practice and does not bill insurance directly. A superbill is available for possible out-of-network reimbursement; eligibility and payment depend on your plan."
      },
      {
        "q": "How many sessions will I need?",
        "a": "There is no fixed number of sessions or promised outcome. We can review what is changing, what remains difficult, and whether to adjust the approach, frequency, or plan for care."
      }
    ],
    "contentHeading": "When being dependable becomes exhausting"
  },
  "ifs-therapy-san-jose": {
    "city": "San Jose",
    "state": "CA",
    "slug": "ifs-therapy-san-jose",
    "title": "IFS Therapy for San Jose Residents",
    "metaTitle": "IFS Therapy in San Jose | Virtual Sessions",
    "metaDescription": "IFS Therapy for adults in San Jose, CA. Finding room for feelings you usually avoid. Virtual sessions with Marcus Ghiasi, LMFT. Free consultation.",
    "h1": "IFS Therapy for Adults in San Jose, CA",
    "intro": "Numbness, distraction, or busyness may have helped you get through something difficult. We can explore those responses respectfully and work toward noticing feelings at a pace that remains manageable. Bayside offers virtual individual therapy to adults in San Jose who are physically in California for sessions.",
    "localContent": "Marcus Ghiasi is a California Licensed Marriage and Family Therapist, license #158475. Bayside is based in Oakland. Sessions for San Jose residents take place online from a private setting in California. Individual parts work for understanding inner conflict, self-criticism, and protective habits.",
    "whyChoose": [
      "Individual sessions with Marcus Ghiasi, LMFT, California license #158475",
      "Virtual access for San Jose residents; you must be in California for appointments",
      "A conversation about goals, preferences, and the reasons for a proposed approach",
      "45- or 60-minute private-pay sessions; rates and insurance details are below",
      "Free 15-minute consultation to discuss fit and practical questions"
    ],
    "uniqueContent": [
      "Internal Family Systems uses the language of parts to explore different feelings, needs, and ways of coping. You might notice a part that pushes hard and another that wants to withdraw. We can approach both with curiosity without treating them as separate people or assuming the model explains every experience.",
      "<a href=\"/services/ifs\">Read about IFS Therapy (Parts Work) at Bayside.</a> The service overview explains the approach; a consultation can help clarify whether it fits your situation."
    ],
    "uniqueWhatToExpect": [
      "A free 15-minute consultation gives you room to describe what you need, ask questions, and discuss availability. It does not commit you to ongoing sessions.",
      "The first full appointment can explore finding room for feelings you usually avoid, your history, and the concerns most important to you. You can ask questions about pace, methods, and what to do if something does not feel useful. Session length is 45 or 60 minutes; check current scheduling options when booking.",
      "There is no fixed number of sessions or promised outcome. We can review what is changing, what remains difficult, and whether to adjust the approach, frequency, or plan for care."
    ],
    "uniqueFaqs": [
      {
        "q": "Do I have to access painful memories right away?",
        "a": "No. You can talk about hesitation, limits, and what helps you feel present. There is no requirement to produce a memory or push through an experience that feels overwhelming."
      },
      {
        "q": "Are these in-person appointments in San Jose?",
        "a": "No. Bayside provides virtual individual therapy. You can attend from a private, suitable setting in San Jose or elsewhere in California; your physical location matters for every appointment."
      },
      {
        "q": "How much do sessions cost, and can I use insurance?",
        "a": "Sessions are $210 for 45 minutes or $280 for 60 minutes. Bayside is a private-pay practice and does not bill insurance directly. A superbill is available for possible out-of-network reimbursement; eligibility and payment depend on your plan."
      },
      {
        "q": "How many sessions will I need?",
        "a": "There is no fixed number of sessions or promised outcome. We can review what is changing, what remains difficult, and whether to adjust the approach, frequency, or plan for care."
      }
    ],
    "contentHeading": "Finding room for feelings you usually avoid"
  },
  "ifs-therapy-palo-alto": {
    "city": "Palo Alto",
    "state": "CA",
    "slug": "ifs-therapy-palo-alto",
    "title": "IFS Therapy for Palo Alto Residents",
    "metaTitle": "IFS Therapy in Palo Alto | Virtual Sessions",
    "metaDescription": "IFS Therapy for adults in Palo Alto, CA. Making decisions when you feel divided. Virtual sessions with Marcus Ghiasi, LMFT. Free consultation.",
    "h1": "IFS Therapy for Adults in Palo Alto, CA",
    "intro": "One reaction may favor security while another wants a change in work or relationships. Parts work can help clarify the concerns on each side so that a decision is less dominated by self-criticism or urgency. Bayside offers virtual individual therapy to adults in Palo Alto who are physically in California for sessions.",
    "localContent": "Marcus Ghiasi is a California Licensed Marriage and Family Therapist, license #158475. Bayside is based in Oakland. Sessions for Palo Alto residents take place online from a private setting in California. Individual parts work for understanding inner conflict, self-criticism, and protective habits.",
    "whyChoose": [
      "Individual sessions with Marcus Ghiasi, LMFT, California license #158475",
      "Virtual access for Palo Alto residents; you must be in California for appointments",
      "A conversation about goals, preferences, and the reasons for a proposed approach",
      "45- or 60-minute private-pay sessions; rates and insurance details are below",
      "Free 15-minute consultation to discuss fit and practical questions"
    ],
    "uniqueContent": [
      "Internal Family Systems uses the language of parts to explore different feelings, needs, and ways of coping. You might notice a part that pushes hard and another that wants to withdraw. We can approach both with curiosity without treating them as separate people or assuming the model explains every experience.",
      "<a href=\"/services/ifs\">Read about IFS Therapy (Parts Work) at Bayside.</a> The service overview explains the approach; a consultation can help clarify whether it fits your situation."
    ],
    "uniqueWhatToExpect": [
      "A free 15-minute consultation gives you room to describe what you need, ask questions, and discuss availability. It does not commit you to ongoing sessions.",
      "The first full appointment can explore making decisions when you feel divided, your history, and the concerns most important to you. You can ask questions about pace, methods, and what to do if something does not feel useful. Session length is 45 or 60 minutes; check current scheduling options when booking.",
      "There is no fixed number of sessions or promised outcome. We can review what is changing, what remains difficult, and whether to adjust the approach, frequency, or plan for care."
    ],
    "uniqueFaqs": [
      {
        "q": "Is IFS the right approach for every concern?",
        "a": "No single approach fits every person or condition. We discuss what the model offers, its limits, your preferences, and whether another method or referral would better serve your goals."
      },
      {
        "q": "Are these in-person appointments in Palo Alto?",
        "a": "No. Bayside provides virtual individual therapy. You can attend from a private, suitable setting in Palo Alto or elsewhere in California; your physical location matters for every appointment."
      },
      {
        "q": "How much do sessions cost, and can I use insurance?",
        "a": "Sessions are $210 for 45 minutes or $280 for 60 minutes. Bayside is a private-pay practice and does not bill insurance directly. A superbill is available for possible out-of-network reimbursement; eligibility and payment depend on your plan."
      },
      {
        "q": "How many sessions will I need?",
        "a": "There is no fixed number of sessions or promised outcome. We can review what is changing, what remains difficult, and whether to adjust the approach, frequency, or plan for care."
      }
    ],
    "contentHeading": "Making decisions when you feel divided"
  },
  "cbt-therapy-san-francisco": {
    "city": "San Francisco",
    "state": "CA",
    "slug": "cbt-therapy-san-francisco",
    "title": "CBT Therapy for San Francisco Residents",
    "metaTitle": "CBT Therapy in San Francisco | Virtual Sessions",
    "metaDescription": "CBT Therapy for adults in San Francisco, CA. When worry turns possibilities into predictions. Virtual sessions with Marcus Ghiasi, LMFT. Free consultation.",
    "h1": "CBT Therapy for Adults in San Francisco, CA",
    "intro": "An unanswered message or a small mistake can quickly become evidence that something terrible will happen. We can separate what is known from what is feared and practice responding to uncertainty without endless reassurance. Bayside offers virtual individual therapy to adults in San Francisco who are physically in California for sessions.",
    "localContent": "Marcus Ghiasi is a California Licensed Marriage and Family Therapist, license #158475. Bayside is based in Oakland. Sessions for San Francisco residents take place online from a private setting in California. Practical work with thoughts, emotions, and behaviors that keep anxiety or low mood going.",
    "whyChoose": [
      "Individual sessions with Marcus Ghiasi, LMFT, California license #158475",
      "Virtual access for San Francisco residents; you must be in California for appointments",
      "A conversation about goals, preferences, and the reasons for a proposed approach",
      "45- or 60-minute private-pay sessions; rates and insurance details are below",
      "Free 15-minute consultation to discuss fit and practical questions"
    ],
    "uniqueContent": [
      "Cognitive Behavioral Therapy looks at the interaction between a situation, your interpretation, your feelings, and what you do next. Sessions may include tracking patterns, testing predictions, and planning manageable steps between appointments. The aim is a more workable response, not forced positive thinking.",
      "<a href=\"/services/cbt\">Read about Cognitive Behavioral Therapy at Bayside.</a> The service overview explains the approach; a consultation can help clarify whether it fits your situation."
    ],
    "uniqueWhatToExpect": [
      "A free 15-minute consultation gives you room to describe what you need, ask questions, and discuss availability. It does not commit you to ongoing sessions.",
      "The first full appointment can explore when worry turns possibilities into predictions, your history, and the concerns most important to you. You can ask questions about pace, methods, and what to do if something does not feel useful. Session length is 45 or 60 minutes; check current scheduling options when booking.",
      "There is no fixed number of sessions or promised outcome. We can review what is changing, what remains difficult, and whether to adjust the approach, frequency, or plan for care."
    ],
    "uniqueFaqs": [
      {
        "q": "Will CBT ask me to ignore real problems?",
        "a": "No. Some concerns call for problem-solving or a change in circumstances. Others involve predictions we can examine. We work to distinguish them rather than labeling every difficult thought irrational."
      },
      {
        "q": "Are these in-person appointments in San Francisco?",
        "a": "No. Bayside provides virtual individual therapy. You can attend from a private, suitable setting in San Francisco or elsewhere in California; your physical location matters for every appointment."
      },
      {
        "q": "How much do sessions cost, and can I use insurance?",
        "a": "Sessions are $210 for 45 minutes or $280 for 60 minutes. Bayside is a private-pay practice and does not bill insurance directly. A superbill is available for possible out-of-network reimbursement; eligibility and payment depend on your plan."
      },
      {
        "q": "How many sessions will I need?",
        "a": "There is no fixed number of sessions or promised outcome. We can review what is changing, what remains difficult, and whether to adjust the approach, frequency, or plan for care."
      }
    ],
    "contentHeading": "When worry turns possibilities into predictions"
  },
  "cbt-therapy-oakland": {
    "city": "Oakland",
    "state": "CA",
    "slug": "cbt-therapy-oakland",
    "title": "CBT Therapy for Oakland Residents",
    "metaTitle": "CBT Therapy in Oakland | Virtual Sessions",
    "metaDescription": "CBT Therapy for adults in Oakland, CA. Getting started when motivation is low. Virtual sessions with Marcus Ghiasi, LMFT. Free consultation.",
    "h1": "CBT Therapy for Adults in Oakland, CA",
    "intro": "Low mood can reduce activity, and reduced activity can make days feel even narrower. We can identify small, realistic actions related to care, connection, or routine without treating exhaustion as a lack of effort. Bayside offers virtual individual therapy to adults in Oakland who are physically in California for sessions.",
    "localContent": "Marcus Ghiasi is a California Licensed Marriage and Family Therapist, license #158475. Bayside is based in Oakland and provides virtual individual sessions, rather than in-person office appointments. Practical work with thoughts, emotions, and behaviors that keep anxiety or low mood going.",
    "whyChoose": [
      "Individual sessions with Marcus Ghiasi, LMFT, California license #158475",
      "Virtual access for Oakland residents; you must be in California for appointments",
      "A conversation about goals, preferences, and the reasons for a proposed approach",
      "45- or 60-minute private-pay sessions; rates and insurance details are below",
      "Free 15-minute consultation to discuss fit and practical questions"
    ],
    "uniqueContent": [
      "Cognitive Behavioral Therapy looks at the interaction between a situation, your interpretation, your feelings, and what you do next. Sessions may include tracking patterns, testing predictions, and planning manageable steps between appointments. The aim is a more workable response, not forced positive thinking.",
      "<a href=\"/services/cbt\">Read about Cognitive Behavioral Therapy at Bayside.</a> The service overview explains the approach; a consultation can help clarify whether it fits your situation."
    ],
    "uniqueWhatToExpect": [
      "A free 15-minute consultation gives you room to describe what you need, ask questions, and discuss availability. It does not commit you to ongoing sessions.",
      "The first full appointment can explore getting started when motivation is low, your history, and the concerns most important to you. You can ask questions about pace, methods, and what to do if something does not feel useful. Session length is 45 or 60 minutes; check current scheduling options when booking.",
      "There is no fixed number of sessions or promised outcome. We can review what is changing, what remains difficult, and whether to adjust the approach, frequency, or plan for care."
    ],
    "uniqueFaqs": [
      {
        "q": "What if I cannot complete practice between sessions?",
        "a": "That is information we can use. We can reduce the size of a task, look at barriers, or choose a different strategy. Practice is collaborative rather than a test you pass or fail."
      },
      {
        "q": "Are these in-person appointments in Oakland?",
        "a": "No. Bayside provides virtual individual therapy. You can attend from a private, suitable setting in Oakland or elsewhere in California; your physical location matters for every appointment."
      },
      {
        "q": "How much do sessions cost, and can I use insurance?",
        "a": "Sessions are $210 for 45 minutes or $280 for 60 minutes. Bayside is a private-pay practice and does not bill insurance directly. A superbill is available for possible out-of-network reimbursement; eligibility and payment depend on your plan."
      },
      {
        "q": "How many sessions will I need?",
        "a": "There is no fixed number of sessions or promised outcome. We can review what is changing, what remains difficult, and whether to adjust the approach, frequency, or plan for care."
      }
    ],
    "contentHeading": "Getting started when motivation is low"
  },
  "cbt-therapy-san-jose": {
    "city": "San Jose",
    "state": "CA",
    "slug": "cbt-therapy-san-jose",
    "title": "CBT Therapy for San Jose Residents",
    "metaTitle": "CBT Therapy in San Jose | Virtual Sessions",
    "metaDescription": "CBT Therapy for adults in San Jose, CA. When perfectionism makes tasks harder to finish. Virtual sessions with Marcus Ghiasi, LMFT. Free consultation.",
    "h1": "CBT Therapy for Adults in San Jose, CA",
    "intro": "A high standard can become a rule that nothing is worth doing unless it is flawless. We can examine the costs of that rule and try small experiments with finishing, asking for feedback, and allowing uncertainty. Bayside offers virtual individual therapy to adults in San Jose who are physically in California for sessions.",
    "localContent": "Marcus Ghiasi is a California Licensed Marriage and Family Therapist, license #158475. Bayside is based in Oakland. Sessions for San Jose residents take place online from a private setting in California. Practical work with thoughts, emotions, and behaviors that keep anxiety or low mood going.",
    "whyChoose": [
      "Individual sessions with Marcus Ghiasi, LMFT, California license #158475",
      "Virtual access for San Jose residents; you must be in California for appointments",
      "A conversation about goals, preferences, and the reasons for a proposed approach",
      "45- or 60-minute private-pay sessions; rates and insurance details are below",
      "Free 15-minute consultation to discuss fit and practical questions"
    ],
    "uniqueContent": [
      "Cognitive Behavioral Therapy looks at the interaction between a situation, your interpretation, your feelings, and what you do next. Sessions may include tracking patterns, testing predictions, and planning manageable steps between appointments. The aim is a more workable response, not forced positive thinking.",
      "<a href=\"/services/cbt\">Read about Cognitive Behavioral Therapy at Bayside.</a> The service overview explains the approach; a consultation can help clarify whether it fits your situation."
    ],
    "uniqueWhatToExpect": [
      "A free 15-minute consultation gives you room to describe what you need, ask questions, and discuss availability. It does not commit you to ongoing sessions.",
      "The first full appointment can explore when perfectionism makes tasks harder to finish, your history, and the concerns most important to you. You can ask questions about pace, methods, and what to do if something does not feel useful. Session length is 45 or 60 minutes; check current scheduling options when booking.",
      "There is no fixed number of sessions or promised outcome. We can review what is changing, what remains difficult, and whether to adjust the approach, frequency, or plan for care."
    ],
    "uniqueFaqs": [
      {
        "q": "Can I keep my standards while working on perfectionism?",
        "a": "Yes. The question is whether your standards support your priorities or keep you stuck. We can preserve what matters while changing habits such as repeated checking, avoidance, or harsh self-evaluation."
      },
      {
        "q": "Are these in-person appointments in San Jose?",
        "a": "No. Bayside provides virtual individual therapy. You can attend from a private, suitable setting in San Jose or elsewhere in California; your physical location matters for every appointment."
      },
      {
        "q": "How much do sessions cost, and can I use insurance?",
        "a": "Sessions are $210 for 45 minutes or $280 for 60 minutes. Bayside is a private-pay practice and does not bill insurance directly. A superbill is available for possible out-of-network reimbursement; eligibility and payment depend on your plan."
      },
      {
        "q": "How many sessions will I need?",
        "a": "There is no fixed number of sessions or promised outcome. We can review what is changing, what remains difficult, and whether to adjust the approach, frequency, or plan for care."
      }
    ],
    "contentHeading": "When perfectionism makes tasks harder to finish"
  },
  "cbt-therapy-berkeley": {
    "city": "Berkeley",
    "state": "CA",
    "slug": "cbt-therapy-berkeley",
    "title": "CBT Therapy for Berkeley Residents",
    "metaTitle": "CBT Therapy in Berkeley | Virtual Sessions",
    "metaDescription": "CBT Therapy for adults in Berkeley, CA. Approaching situations you have been avoiding. Virtual sessions with Marcus Ghiasi, LMFT. Free consultation.",
    "h1": "CBT Therapy for Adults in Berkeley, CA",
    "intro": "Avoidance can make a feared situation feel harder to approach. When appropriate, we can plan gradual steps that you understand and agree to, with attention to actual safety and your capacity to participate. Bayside offers virtual individual therapy to adults in Berkeley who are physically in California for sessions.",
    "localContent": "Marcus Ghiasi is a California Licensed Marriage and Family Therapist, license #158475. Bayside is based in Oakland. Sessions for Berkeley residents take place online from a private setting in California. Practical work with thoughts, emotions, and behaviors that keep anxiety or low mood going.",
    "whyChoose": [
      "Individual sessions with Marcus Ghiasi, LMFT, California license #158475",
      "Virtual access for Berkeley residents; you must be in California for appointments",
      "A conversation about goals, preferences, and the reasons for a proposed approach",
      "45- or 60-minute private-pay sessions; rates and insurance details are below",
      "Free 15-minute consultation to discuss fit and practical questions"
    ],
    "uniqueContent": [
      "Cognitive Behavioral Therapy looks at the interaction between a situation, your interpretation, your feelings, and what you do next. Sessions may include tracking patterns, testing predictions, and planning manageable steps between appointments. The aim is a more workable response, not forced positive thinking.",
      "<a href=\"/services/cbt\">Read about Cognitive Behavioral Therapy at Bayside.</a> The service overview explains the approach; a consultation can help clarify whether it fits your situation."
    ],
    "uniqueWhatToExpect": [
      "A free 15-minute consultation gives you room to describe what you need, ask questions, and discuss availability. It does not commit you to ongoing sessions.",
      "The first full appointment can explore approaching situations you have been avoiding, your history, and the concerns most important to you. You can ask questions about pace, methods, and what to do if something does not feel useful. Session length is 45 or 60 minutes; check current scheduling options when booking.",
      "There is no fixed number of sessions or promised outcome. We can review what is changing, what remains difficult, and whether to adjust the approach, frequency, or plan for care."
    ],
    "uniqueFaqs": [
      {
        "q": "Does CBT involve being forced into stressful situations?",
        "a": "No. Any behavioral experiment or exposure work should have a clear purpose, consent, and appropriate pacing. You can ask questions and discuss what does not feel workable."
      },
      {
        "q": "Are these in-person appointments in Berkeley?",
        "a": "No. Bayside provides virtual individual therapy. You can attend from a private, suitable setting in Berkeley or elsewhere in California; your physical location matters for every appointment."
      },
      {
        "q": "How much do sessions cost, and can I use insurance?",
        "a": "Sessions are $210 for 45 minutes or $280 for 60 minutes. Bayside is a private-pay practice and does not bill insurance directly. A superbill is available for possible out-of-network reimbursement; eligibility and payment depend on your plan."
      },
      {
        "q": "How many sessions will I need?",
        "a": "There is no fixed number of sessions or promised outcome. We can review what is changing, what remains difficult, and whether to adjust the approach, frequency, or plan for care."
      }
    ],
    "contentHeading": "Approaching situations you have been avoiding"
  },
  "cbt-therapy-palo-alto": {
    "city": "Palo Alto",
    "state": "CA",
    "slug": "cbt-therapy-palo-alto",
    "title": "CBT Therapy for Palo Alto Residents",
    "metaTitle": "CBT Therapy in Palo Alto | Virtual Sessions",
    "metaDescription": "CBT Therapy for adults in Palo Alto, CA. Working with self-consciousness in relationships. Virtual sessions with Marcus Ghiasi, LMFT. Free consultation.",
    "h1": "CBT Therapy for Adults in Palo Alto, CA",
    "intro": "Replaying a conversation or assuming someone is judging you can make connection harder. We can examine those interpretations, notice safety behaviors, and practice alternatives in situations that matter to you. Bayside offers virtual individual therapy to adults in Palo Alto who are physically in California for sessions.",
    "localContent": "Marcus Ghiasi is a California Licensed Marriage and Family Therapist, license #158475. Bayside is based in Oakland. Sessions for Palo Alto residents take place online from a private setting in California. Practical work with thoughts, emotions, and behaviors that keep anxiety or low mood going.",
    "whyChoose": [
      "Individual sessions with Marcus Ghiasi, LMFT, California license #158475",
      "Virtual access for Palo Alto residents; you must be in California for appointments",
      "A conversation about goals, preferences, and the reasons for a proposed approach",
      "45- or 60-minute private-pay sessions; rates and insurance details are below",
      "Free 15-minute consultation to discuss fit and practical questions"
    ],
    "uniqueContent": [
      "Cognitive Behavioral Therapy looks at the interaction between a situation, your interpretation, your feelings, and what you do next. Sessions may include tracking patterns, testing predictions, and planning manageable steps between appointments. The aim is a more workable response, not forced positive thinking.",
      "<a href=\"/services/cbt\">Read about Cognitive Behavioral Therapy at Bayside.</a> The service overview explains the approach; a consultation can help clarify whether it fits your situation."
    ],
    "uniqueWhatToExpect": [
      "A free 15-minute consultation gives you room to describe what you need, ask questions, and discuss availability. It does not commit you to ongoing sessions.",
      "The first full appointment can explore working with self-consciousness in relationships, your history, and the concerns most important to you. You can ask questions about pace, methods, and what to do if something does not feel useful. Session length is 45 or 60 minutes; check current scheduling options when booking.",
      "There is no fixed number of sessions or promised outcome. We can review what is changing, what remains difficult, and whether to adjust the approach, frequency, or plan for care."
    ],
    "uniqueFaqs": [
      {
        "q": "How will we know whether CBT is helping?",
        "a": "We can choose observable goals, such as less time spent replaying conversations or greater participation in an activity you value. We review progress and difficulties rather than assuming a worksheet alone produces change."
      },
      {
        "q": "Are these in-person appointments in Palo Alto?",
        "a": "No. Bayside provides virtual individual therapy. You can attend from a private, suitable setting in Palo Alto or elsewhere in California; your physical location matters for every appointment."
      },
      {
        "q": "How much do sessions cost, and can I use insurance?",
        "a": "Sessions are $210 for 45 minutes or $280 for 60 minutes. Bayside is a private-pay practice and does not bill insurance directly. A superbill is available for possible out-of-network reimbursement; eligibility and payment depend on your plan."
      },
      {
        "q": "How many sessions will I need?",
        "a": "There is no fixed number of sessions or promised outcome. We can review what is changing, what remains difficult, and whether to adjust the approach, frequency, or plan for care."
      }
    ],
    "contentHeading": "Working with self-consciousness in relationships"
  },
  "psychodynamic-therapy-san-francisco": {
    "city": "San Francisco",
    "state": "CA",
    "slug": "psychodynamic-therapy-san-francisco",
    "title": "Psychodynamic Therapy for San Francisco Residents",
    "metaTitle": "Psychodynamic Therapy in San Francisco | Virtual Sessions",
    "metaDescription": "Psychodynamic Therapy for adults in San Francisco, CA. When a familiar relationship pattern returns. Virtual sessions with Marcus Ghiasi, LMFT. Free consultation.",
    "h1": "Psychodynamic Therapy for Adults in San Francisco, CA",
    "intro": "Different relationships may leave you with a similar feeling: overlooked, responsible for everyone, or afraid to ask for more. We can examine the pattern without assuming every difficulty has the same cause. Bayside offers virtual individual therapy to adults in San Francisco who are physically in California for sessions.",
    "localContent": "Marcus Ghiasi is a California Licensed Marriage and Family Therapist, license #158475. Bayside is based in Oakland. Sessions for San Francisco residents take place online from a private setting in California. Exploring recurring relationship patterns, emotional conflicts, and the meaning of earlier experiences.",
    "whyChoose": [
      "Individual sessions with Marcus Ghiasi, LMFT, California license #158475",
      "Virtual access for San Francisco residents; you must be in California for appointments",
      "A conversation about goals, preferences, and the reasons for a proposed approach",
      "45- or 60-minute private-pay sessions; rates and insurance details are below",
      "Free 15-minute consultation to discuss fit and practical questions"
    ],
    "uniqueContent": [
      "Psychodynamic work makes room for themes that recur across relationships and over time. We can notice what feels difficult to say, how you respond to closeness or conflict, and how earlier expectations influence present choices. Understanding is connected to what you want to do differently now.",
      "<a href=\"/services/psychodynamic\">Read about Psychodynamic Therapy at Bayside.</a> The service overview explains the approach; a consultation can help clarify whether it fits your situation."
    ],
    "uniqueWhatToExpect": [
      "A free 15-minute consultation gives you room to describe what you need, ask questions, and discuss availability. It does not commit you to ongoing sessions.",
      "The first full appointment can explore when a familiar relationship pattern returns, your history, and the concerns most important to you. You can ask questions about pace, methods, and what to do if something does not feel useful. Session length is 45 or 60 minutes; check current scheduling options when booking.",
      "There is no fixed number of sessions or promised outcome. We can review what is changing, what remains difficult, and whether to adjust the approach, frequency, or plan for care."
    ],
    "uniqueFaqs": [
      {
        "q": "Do we only talk about childhood?",
        "a": "No. Earlier experiences may matter, but current relationships and daily concerns remain central. We consider the past when it helps illuminate what is happening now."
      },
      {
        "q": "Are these in-person appointments in San Francisco?",
        "a": "No. Bayside provides virtual individual therapy. You can attend from a private, suitable setting in San Francisco or elsewhere in California; your physical location matters for every appointment."
      },
      {
        "q": "How much do sessions cost, and can I use insurance?",
        "a": "Sessions are $210 for 45 minutes or $280 for 60 minutes. Bayside is a private-pay practice and does not bill insurance directly. A superbill is available for possible out-of-network reimbursement; eligibility and payment depend on your plan."
      },
      {
        "q": "How many sessions will I need?",
        "a": "There is no fixed number of sessions or promised outcome. We can review what is changing, what remains difficult, and whether to adjust the approach, frequency, or plan for care."
      }
    ],
    "contentHeading": "When a familiar relationship pattern returns"
  },
  "psychodynamic-therapy-oakland": {
    "city": "Oakland",
    "state": "CA",
    "slug": "psychodynamic-therapy-oakland",
    "title": "Psychodynamic Therapy for Oakland Residents",
    "metaTitle": "Psychodynamic Therapy in Oakland | Virtual Sessions",
    "metaDescription": "Psychodynamic Therapy for adults in Oakland, CA. Understanding reactions that surprise you. Virtual sessions with Marcus Ghiasi, LMFT. Free consultation.",
    "h1": "Psychodynamic Therapy for Adults in Oakland, CA",
    "intro": "An interaction may bring up more sadness, anger, or withdrawal than you expected. Therapy can help explore its meaning alongside current stress, rather than deciding in advance that it must be about the past. Bayside offers virtual individual therapy to adults in Oakland who are physically in California for sessions.",
    "localContent": "Marcus Ghiasi is a California Licensed Marriage and Family Therapist, license #158475. Bayside is based in Oakland and provides virtual individual sessions, rather than in-person office appointments. Exploring recurring relationship patterns, emotional conflicts, and the meaning of earlier experiences.",
    "whyChoose": [
      "Individual sessions with Marcus Ghiasi, LMFT, California license #158475",
      "Virtual access for Oakland residents; you must be in California for appointments",
      "A conversation about goals, preferences, and the reasons for a proposed approach",
      "45- or 60-minute private-pay sessions; rates and insurance details are below",
      "Free 15-minute consultation to discuss fit and practical questions"
    ],
    "uniqueContent": [
      "Psychodynamic work makes room for themes that recur across relationships and over time. We can notice what feels difficult to say, how you respond to closeness or conflict, and how earlier expectations influence present choices. Understanding is connected to what you want to do differently now.",
      "<a href=\"/services/psychodynamic\">Read about Psychodynamic Therapy at Bayside.</a> The service overview explains the approach; a consultation can help clarify whether it fits your situation."
    ],
    "uniqueWhatToExpect": [
      "A free 15-minute consultation gives you room to describe what you need, ask questions, and discuss availability. It does not commit you to ongoing sessions.",
      "The first full appointment can explore understanding reactions that surprise you, your history, and the concerns most important to you. You can ask questions about pace, methods, and what to do if something does not feel useful. Session length is 45 or 60 minutes; check current scheduling options when booking.",
      "There is no fixed number of sessions or promised outcome. We can review what is changing, what remains difficult, and whether to adjust the approach, frequency, or plan for care."
    ],
    "uniqueFaqs": [
      {
        "q": "Is there room for practical help in this approach?",
        "a": "Yes. Reflection and practical change can inform each other. You can bring a current decision or conversation into sessions and consider both its meaning and your options."
      },
      {
        "q": "Are these in-person appointments in Oakland?",
        "a": "No. Bayside provides virtual individual therapy. You can attend from a private, suitable setting in Oakland or elsewhere in California; your physical location matters for every appointment."
      },
      {
        "q": "How much do sessions cost, and can I use insurance?",
        "a": "Sessions are $210 for 45 minutes or $280 for 60 minutes. Bayside is a private-pay practice and does not bill insurance directly. A superbill is available for possible out-of-network reimbursement; eligibility and payment depend on your plan."
      },
      {
        "q": "How many sessions will I need?",
        "a": "There is no fixed number of sessions or promised outcome. We can review what is changing, what remains difficult, and whether to adjust the approach, frequency, or plan for care."
      }
    ],
    "contentHeading": "Understanding reactions that surprise you"
  },
  "psychodynamic-therapy-berkeley": {
    "city": "Berkeley",
    "state": "CA",
    "slug": "psychodynamic-therapy-berkeley",
    "title": "Psychodynamic Therapy for Berkeley Residents",
    "metaTitle": "Psychodynamic Therapy in Berkeley | Virtual Sessions",
    "metaDescription": "Psychodynamic Therapy for adults in Berkeley, CA. When your own needs are difficult to recognize. Virtual sessions with Marcus Ghiasi, LMFT. Free consultation.",
    "h1": "Psychodynamic Therapy for Adults in Berkeley, CA",
    "intro": "You may know what others expect while finding it harder to say what you want. We can explore how that pattern developed, what happens when you express a preference, and how to make room for your needs. Bayside offers virtual individual therapy to adults in Berkeley who are physically in California for sessions.",
    "localContent": "Marcus Ghiasi is a California Licensed Marriage and Family Therapist, license #158475. Bayside is based in Oakland. Sessions for Berkeley residents take place online from a private setting in California. Exploring recurring relationship patterns, emotional conflicts, and the meaning of earlier experiences.",
    "whyChoose": [
      "Individual sessions with Marcus Ghiasi, LMFT, California license #158475",
      "Virtual access for Berkeley residents; you must be in California for appointments",
      "A conversation about goals, preferences, and the reasons for a proposed approach",
      "45- or 60-minute private-pay sessions; rates and insurance details are below",
      "Free 15-minute consultation to discuss fit and practical questions"
    ],
    "uniqueContent": [
      "Psychodynamic work makes room for themes that recur across relationships and over time. We can notice what feels difficult to say, how you respond to closeness or conflict, and how earlier expectations influence present choices. Understanding is connected to what you want to do differently now.",
      "<a href=\"/services/psychodynamic\">Read about Psychodynamic Therapy at Bayside.</a> The service overview explains the approach; a consultation can help clarify whether it fits your situation."
    ],
    "uniqueWhatToExpect": [
      "A free 15-minute consultation gives you room to describe what you need, ask questions, and discuss availability. It does not commit you to ongoing sessions.",
      "The first full appointment can explore when your own needs are difficult to recognize, your history, and the concerns most important to you. You can ask questions about pace, methods, and what to do if something does not feel useful. Session length is 45 or 60 minutes; check current scheduling options when booking.",
      "There is no fixed number of sessions or promised outcome. We can review what is changing, what remains difficult, and whether to adjust the approach, frequency, or plan for care."
    ],
    "uniqueFaqs": [
      {
        "q": "Do I need a clear explanation before starting?",
        "a": "No. Uncertainty, mixed feelings, and difficulty finding words can all be starting points. We can develop an understanding together instead of expecting you to arrive with one."
      },
      {
        "q": "Are these in-person appointments in Berkeley?",
        "a": "No. Bayside provides virtual individual therapy. You can attend from a private, suitable setting in Berkeley or elsewhere in California; your physical location matters for every appointment."
      },
      {
        "q": "How much do sessions cost, and can I use insurance?",
        "a": "Sessions are $210 for 45 minutes or $280 for 60 minutes. Bayside is a private-pay practice and does not bill insurance directly. A superbill is available for possible out-of-network reimbursement; eligibility and payment depend on your plan."
      },
      {
        "q": "How many sessions will I need?",
        "a": "There is no fixed number of sessions or promised outcome. We can review what is changing, what remains difficult, and whether to adjust the approach, frequency, or plan for care."
      }
    ],
    "contentHeading": "When your own needs are difficult to recognize"
  },
  "psychodynamic-therapy-san-jose": {
    "city": "San Jose",
    "state": "CA",
    "slug": "psychodynamic-therapy-san-jose",
    "title": "Psychodynamic Therapy for San Jose Residents",
    "metaTitle": "Psychodynamic Therapy in San Jose | Virtual Sessions",
    "metaDescription": "Psychodynamic Therapy for adults in San Jose, CA. Making sense of shame and self-doubt. Virtual sessions with Marcus Ghiasi, LMFT. Free consultation.",
    "h1": "Psychodynamic Therapy for Adults in San Jose, CA",
    "intro": "A critical view of yourself can feel familiar enough to go unquestioned. We can look at when that view becomes strongest, the relationships that reinforce it, and experiences that allow a different understanding. Bayside offers virtual individual therapy to adults in San Jose who are physically in California for sessions.",
    "localContent": "Marcus Ghiasi is a California Licensed Marriage and Family Therapist, license #158475. Bayside is based in Oakland. Sessions for San Jose residents take place online from a private setting in California. Exploring recurring relationship patterns, emotional conflicts, and the meaning of earlier experiences.",
    "whyChoose": [
      "Individual sessions with Marcus Ghiasi, LMFT, California license #158475",
      "Virtual access for San Jose residents; you must be in California for appointments",
      "A conversation about goals, preferences, and the reasons for a proposed approach",
      "45- or 60-minute private-pay sessions; rates and insurance details are below",
      "Free 15-minute consultation to discuss fit and practical questions"
    ],
    "uniqueContent": [
      "Psychodynamic work makes room for themes that recur across relationships and over time. We can notice what feels difficult to say, how you respond to closeness or conflict, and how earlier expectations influence present choices. Understanding is connected to what you want to do differently now.",
      "<a href=\"/services/psychodynamic\">Read about Psychodynamic Therapy at Bayside.</a> The service overview explains the approach; a consultation can help clarify whether it fits your situation."
    ],
    "uniqueWhatToExpect": [
      "A free 15-minute consultation gives you room to describe what you need, ask questions, and discuss availability. It does not commit you to ongoing sessions.",
      "The first full appointment can explore making sense of shame and self-doubt, your history, and the concerns most important to you. You can ask questions about pace, methods, and what to do if something does not feel useful. Session length is 45 or 60 minutes; check current scheduling options when booking.",
      "There is no fixed number of sessions or promised outcome. We can review what is changing, what remains difficult, and whether to adjust the approach, frequency, or plan for care."
    ],
    "uniqueFaqs": [
      {
        "q": "Will therapy blame my family?",
        "a": "The aim is understanding, not assigning a single explanation or blame. We can acknowledge both care and harm in relationships and respect how you make sense of your own history."
      },
      {
        "q": "Are these in-person appointments in San Jose?",
        "a": "No. Bayside provides virtual individual therapy. You can attend from a private, suitable setting in San Jose or elsewhere in California; your physical location matters for every appointment."
      },
      {
        "q": "How much do sessions cost, and can I use insurance?",
        "a": "Sessions are $210 for 45 minutes or $280 for 60 minutes. Bayside is a private-pay practice and does not bill insurance directly. A superbill is available for possible out-of-network reimbursement; eligibility and payment depend on your plan."
      },
      {
        "q": "How many sessions will I need?",
        "a": "There is no fixed number of sessions or promised outcome. We can review what is changing, what remains difficult, and whether to adjust the approach, frequency, or plan for care."
      }
    ],
    "contentHeading": "Making sense of shame and self-doubt"
  },
  "psychodynamic-therapy-palo-alto": {
    "city": "Palo Alto",
    "state": "CA",
    "slug": "psychodynamic-therapy-palo-alto",
    "title": "Psychodynamic Therapy for Palo Alto Residents",
    "metaTitle": "Psychodynamic Therapy in Palo Alto | Virtual Sessions",
    "metaDescription": "Psychodynamic Therapy for adults in Palo Alto, CA. Looking beyond a repeated feeling of dissatisfaction. Virtual sessions with Marcus Ghiasi, LMFT. Free consultation.",
    "h1": "Psychodynamic Therapy for Adults in Palo Alto, CA",
    "intro": "Life may look settled while a sense of disconnection or dissatisfaction persists. Therapy offers room to explore that feeling without assuming it is ingratitude or insisting on a dramatic change. Bayside offers virtual individual therapy to adults in Palo Alto who are physically in California for sessions.",
    "localContent": "Marcus Ghiasi is a California Licensed Marriage and Family Therapist, license #158475. Bayside is based in Oakland. Sessions for Palo Alto residents take place online from a private setting in California. Exploring recurring relationship patterns, emotional conflicts, and the meaning of earlier experiences.",
    "whyChoose": [
      "Individual sessions with Marcus Ghiasi, LMFT, California license #158475",
      "Virtual access for Palo Alto residents; you must be in California for appointments",
      "A conversation about goals, preferences, and the reasons for a proposed approach",
      "45- or 60-minute private-pay sessions; rates and insurance details are below",
      "Free 15-minute consultation to discuss fit and practical questions"
    ],
    "uniqueContent": [
      "Psychodynamic work makes room for themes that recur across relationships and over time. We can notice what feels difficult to say, how you respond to closeness or conflict, and how earlier expectations influence present choices. Understanding is connected to what you want to do differently now.",
      "<a href=\"/services/psychodynamic\">Read about Psychodynamic Therapy at Bayside.</a> The service overview explains the approach; a consultation can help clarify whether it fits your situation."
    ],
    "uniqueWhatToExpect": [
      "A free 15-minute consultation gives you room to describe what you need, ask questions, and discuss availability. It does not commit you to ongoing sessions.",
      "The first full appointment can explore looking beyond a repeated feeling of dissatisfaction, your history, and the concerns most important to you. You can ask questions about pace, methods, and what to do if something does not feel useful. Session length is 45 or 60 minutes; check current scheduling options when booking.",
      "There is no fixed number of sessions or promised outcome. We can review what is changing, what remains difficult, and whether to adjust the approach, frequency, or plan for care."
    ],
    "uniqueFaqs": [
      {
        "q": "Is psychodynamic therapy always long-term?",
        "a": "Duration varies with your goals, circumstances, and preferences. We can discuss a focus and review whether the work is useful rather than assuming an open-ended commitment."
      },
      {
        "q": "Are these in-person appointments in Palo Alto?",
        "a": "No. Bayside provides virtual individual therapy. You can attend from a private, suitable setting in Palo Alto or elsewhere in California; your physical location matters for every appointment."
      },
      {
        "q": "How much do sessions cost, and can I use insurance?",
        "a": "Sessions are $210 for 45 minutes or $280 for 60 minutes. Bayside is a private-pay practice and does not bill insurance directly. A superbill is available for possible out-of-network reimbursement; eligibility and payment depend on your plan."
      },
      {
        "q": "How many sessions will I need?",
        "a": "There is no fixed number of sessions or promised outcome. We can review what is changing, what remains difficult, and whether to adjust the approach, frequency, or plan for care."
      }
    ],
    "contentHeading": "Looking beyond a repeated feeling of dissatisfaction"
  },
  "mens-therapy-san-francisco": {
    "city": "San Francisco",
    "state": "CA",
    "slug": "mens-therapy-san-francisco",
    "title": "Men's Therapy for San Francisco Residents",
    "metaTitle": "Men’s Therapy in San Francisco | Virtual Sessions",
    "metaDescription": "Men’s Therapy for adults in San Francisco, CA. When anger is affecting the people you care about. Virtual sessions with Marcus Ghiasi, LMFT. Free consultation.",
    "h1": "Men's Therapy for Adults in San Francisco, CA",
    "intro": "You may regret how a conversation ended without knowing how to change it next time. We can identify warning signs, practice pauses, and examine what you need to take responsibility for after conflict. Bayside offers virtual individual therapy to adults in San Francisco who are physically in California for sessions.",
    "localContent": "Marcus Ghiasi is a California Licensed Marriage and Family Therapist, license #158475. Bayside is based in Oakland. Sessions for San Francisco residents take place online from a private setting in California. Individual counseling for men working on anger, relationships, stress, and emotional expression.",
    "whyChoose": [
      "Individual sessions with Marcus Ghiasi, LMFT, California license #158475",
      "Virtual access for San Francisco residents; you must be in California for appointments",
      "A conversation about goals, preferences, and the reasons for a proposed approach",
      "45- or 60-minute private-pay sessions; rates and insurance details are below",
      "Free 15-minute consultation to discuss fit and practical questions"
    ],
    "uniqueContent": [
      "Sessions can connect immediate concerns with the ways you have learned to handle pressure, conflict, or vulnerability. CBT, parts work, and reflective conversation may be useful depending on what you bring. There is no expectation that all men share the same experience or want the same style of therapy.",
      "<a href=\"/services/mens\">Read about Men's Therapy at Bayside.</a> The service overview explains the approach; a consultation can help clarify whether it fits your situation."
    ],
    "uniqueWhatToExpect": [
      "A free 15-minute consultation gives you room to describe what you need, ask questions, and discuss availability. It does not commit you to ongoing sessions.",
      "The first full appointment can explore when anger is affecting the people you care about, your history, and the concerns most important to you. You can ask questions about pace, methods, and what to do if something does not feel useful. Session length is 45 or 60 minutes; check current scheduling options when booking.",
      "There is no fixed number of sessions or promised outcome. We can review what is changing, what remains difficult, and whether to adjust the approach, frequency, or plan for care."
    ],
    "uniqueFaqs": [
      {
        "q": "Does understanding anger excuse hurtful behavior?",
        "a": "No. Understanding a reaction can support change, but it does not remove responsibility for its impact. Safety, accountability, and changes in behavior matter alongside insight."
      },
      {
        "q": "Are these in-person appointments in San Francisco?",
        "a": "No. Bayside provides virtual individual therapy. You can attend from a private, suitable setting in San Francisco or elsewhere in California; your physical location matters for every appointment."
      },
      {
        "q": "How much do sessions cost, and can I use insurance?",
        "a": "Sessions are $210 for 45 minutes or $280 for 60 minutes. Bayside is a private-pay practice and does not bill insurance directly. A superbill is available for possible out-of-network reimbursement; eligibility and payment depend on your plan."
      },
      {
        "q": "How many sessions will I need?",
        "a": "There is no fixed number of sessions or promised outcome. We can review what is changing, what remains difficult, and whether to adjust the approach, frequency, or plan for care."
      }
    ],
    "contentHeading": "When anger is affecting the people you care about"
  },
  "mens-therapy-oakland": {
    "city": "Oakland",
    "state": "CA",
    "slug": "mens-therapy-oakland",
    "title": "Men's Therapy for Oakland Residents",
    "metaTitle": "Men’s Therapy in Oakland | Virtual Sessions",
    "metaDescription": "Men’s Therapy for adults in Oakland, CA. Finding words beyond fine or stressed. Virtual sessions with Marcus Ghiasi, LMFT. Free consultation.",
    "h1": "Men's Therapy for Adults in Oakland, CA",
    "intro": "You do not need an extensive emotional vocabulary to begin. We can start with a situation, a physical sensation, or a reaction you noticed and gradually develop language that helps you communicate what is happening. Bayside offers virtual individual therapy to adults in Oakland who are physically in California for sessions.",
    "localContent": "Marcus Ghiasi is a California Licensed Marriage and Family Therapist, license #158475. Bayside is based in Oakland and provides virtual individual sessions, rather than in-person office appointments. Individual counseling for men working on anger, relationships, stress, and emotional expression.",
    "whyChoose": [
      "Individual sessions with Marcus Ghiasi, LMFT, California license #158475",
      "Virtual access for Oakland residents; you must be in California for appointments",
      "A conversation about goals, preferences, and the reasons for a proposed approach",
      "45- or 60-minute private-pay sessions; rates and insurance details are below",
      "Free 15-minute consultation to discuss fit and practical questions"
    ],
    "uniqueContent": [
      "Sessions can connect immediate concerns with the ways you have learned to handle pressure, conflict, or vulnerability. CBT, parts work, and reflective conversation may be useful depending on what you bring. There is no expectation that all men share the same experience or want the same style of therapy.",
      "<a href=\"/services/mens\">Read about Men's Therapy at Bayside.</a> The service overview explains the approach; a consultation can help clarify whether it fits your situation."
    ],
    "uniqueWhatToExpect": [
      "A free 15-minute consultation gives you room to describe what you need, ask questions, and discuss availability. It does not commit you to ongoing sessions.",
      "The first full appointment can explore finding words beyond fine or stressed, your history, and the concerns most important to you. You can ask questions about pace, methods, and what to do if something does not feel useful. Session length is 45 or 60 minutes; check current scheduling options when booking.",
      "There is no fixed number of sessions or promised outcome. We can review what is changing, what remains difficult, and whether to adjust the approach, frequency, or plan for care."
    ],
    "uniqueFaqs": [
      {
        "q": "What if I am not comfortable talking about feelings?",
        "a": "You can say that directly. We can begin with specific events and practical concerns, then explore emotion at a pace that feels useful rather than performative."
      },
      {
        "q": "Are these in-person appointments in Oakland?",
        "a": "No. Bayside provides virtual individual therapy. You can attend from a private, suitable setting in Oakland or elsewhere in California; your physical location matters for every appointment."
      },
      {
        "q": "How much do sessions cost, and can I use insurance?",
        "a": "Sessions are $210 for 45 minutes or $280 for 60 minutes. Bayside is a private-pay practice and does not bill insurance directly. A superbill is available for possible out-of-network reimbursement; eligibility and payment depend on your plan."
      },
      {
        "q": "How many sessions will I need?",
        "a": "There is no fixed number of sessions or promised outcome. We can review what is changing, what remains difficult, and whether to adjust the approach, frequency, or plan for care."
      }
    ],
    "contentHeading": "Finding words beyond fine or stressed"
  },
  "mens-therapy-berkeley": {
    "city": "Berkeley",
    "state": "CA",
    "slug": "mens-therapy-berkeley",
    "title": "Men's Therapy for Berkeley Residents",
    "metaTitle": "Men’s Therapy in Berkeley | Virtual Sessions",
    "metaDescription": "Men’s Therapy for adults in Berkeley, CA. When work takes up more than you want it to. Virtual sessions with Marcus Ghiasi, LMFT. Free consultation.",
    "h1": "Men's Therapy for Adults in Berkeley, CA",
    "intro": "Work can provide purpose while also crowding out rest and relationships. We can examine the expectations you carry, what is within your control, and what a more sustainable balance would mean in practice. Bayside offers virtual individual therapy to adults in Berkeley who are physically in California for sessions.",
    "localContent": "Marcus Ghiasi is a California Licensed Marriage and Family Therapist, license #158475. Bayside is based in Oakland. Sessions for Berkeley residents take place online from a private setting in California. Individual counseling for men working on anger, relationships, stress, and emotional expression.",
    "whyChoose": [
      "Individual sessions with Marcus Ghiasi, LMFT, California license #158475",
      "Virtual access for Berkeley residents; you must be in California for appointments",
      "A conversation about goals, preferences, and the reasons for a proposed approach",
      "45- or 60-minute private-pay sessions; rates and insurance details are below",
      "Free 15-minute consultation to discuss fit and practical questions"
    ],
    "uniqueContent": [
      "Sessions can connect immediate concerns with the ways you have learned to handle pressure, conflict, or vulnerability. CBT, parts work, and reflective conversation may be useful depending on what you bring. There is no expectation that all men share the same experience or want the same style of therapy.",
      "<a href=\"/services/mens\">Read about Men's Therapy at Bayside.</a> The service overview explains the approach; a consultation can help clarify whether it fits your situation."
    ],
    "uniqueWhatToExpect": [
      "A free 15-minute consultation gives you room to describe what you need, ask questions, and discuss availability. It does not commit you to ongoing sessions.",
      "The first full appointment can explore when work takes up more than you want it to, your history, and the concerns most important to you. You can ask questions about pace, methods, and what to do if something does not feel useful. Session length is 45 or 60 minutes; check current scheduling options when booking.",
      "There is no fixed number of sessions or promised outcome. We can review what is changing, what remains difficult, and whether to adjust the approach, frequency, or plan for care."
    ],
    "uniqueFaqs": [
      {
        "q": "Will therapy tell me to care less about my work?",
        "a": "The goal is not to prescribe how ambitious you should be. It is to help you make choices that fit your values and recognize when pressure is harming the rest of your life."
      },
      {
        "q": "Are these in-person appointments in Berkeley?",
        "a": "No. Bayside provides virtual individual therapy. You can attend from a private, suitable setting in Berkeley or elsewhere in California; your physical location matters for every appointment."
      },
      {
        "q": "How much do sessions cost, and can I use insurance?",
        "a": "Sessions are $210 for 45 minutes or $280 for 60 minutes. Bayside is a private-pay practice and does not bill insurance directly. A superbill is available for possible out-of-network reimbursement; eligibility and payment depend on your plan."
      },
      {
        "q": "How many sessions will I need?",
        "a": "There is no fixed number of sessions or promised outcome. We can review what is changing, what remains difficult, and whether to adjust the approach, frequency, or plan for care."
      }
    ],
    "contentHeading": "When work takes up more than you want it to"
  },
  "mens-therapy-san-jose": {
    "city": "San Jose",
    "state": "CA",
    "slug": "mens-therapy-san-jose",
    "title": "Men's Therapy for San Jose Residents",
    "metaTitle": "Men’s Therapy in San Jose | Virtual Sessions",
    "metaDescription": "Men’s Therapy for adults in San Jose, CA. Showing up differently in close relationships. Virtual sessions with Marcus Ghiasi, LMFT. Free consultation.",
    "h1": "Men's Therapy for Adults in San Jose, CA",
    "intro": "Pulling away, becoming defensive, or trying to fix a problem immediately can make a partner feel unheard. Individual therapy can help you notice your contribution to a pattern and practice different responses. Bayside offers virtual individual therapy to adults in San Jose who are physically in California for sessions.",
    "localContent": "Marcus Ghiasi is a California Licensed Marriage and Family Therapist, license #158475. Bayside is based in Oakland. Sessions for San Jose residents take place online from a private setting in California. Individual counseling for men working on anger, relationships, stress, and emotional expression.",
    "whyChoose": [
      "Individual sessions with Marcus Ghiasi, LMFT, California license #158475",
      "Virtual access for San Jose residents; you must be in California for appointments",
      "A conversation about goals, preferences, and the reasons for a proposed approach",
      "45- or 60-minute private-pay sessions; rates and insurance details are below",
      "Free 15-minute consultation to discuss fit and practical questions"
    ],
    "uniqueContent": [
      "Sessions can connect immediate concerns with the ways you have learned to handle pressure, conflict, or vulnerability. CBT, parts work, and reflective conversation may be useful depending on what you bring. There is no expectation that all men share the same experience or want the same style of therapy.",
      "<a href=\"/services/mens\">Read about Men's Therapy at Bayside.</a> The service overview explains the approach; a consultation can help clarify whether it fits your situation."
    ],
    "uniqueWhatToExpect": [
      "A free 15-minute consultation gives you room to describe what you need, ask questions, and discuss availability. It does not commit you to ongoing sessions.",
      "The first full appointment can explore showing up differently in close relationships, your history, and the concerns most important to you. You can ask questions about pace, methods, and what to do if something does not feel useful. Session length is 45 or 60 minutes; check current scheduling options when booking.",
      "There is no fixed number of sessions or promised outcome. We can review what is changing, what remains difficult, and whether to adjust the approach, frequency, or plan for care."
    ],
    "uniqueFaqs": [
      {
        "q": "Can I work on my relationship without my partner attending?",
        "a": "Yes. Individual sessions can address your reactions, boundaries, and communication. They do not replace couples therapy when joint work is needed, and they cannot determine another person’s intentions or diagnosis."
      },
      {
        "q": "Are these in-person appointments in San Jose?",
        "a": "No. Bayside provides virtual individual therapy. You can attend from a private, suitable setting in San Jose or elsewhere in California; your physical location matters for every appointment."
      },
      {
        "q": "How much do sessions cost, and can I use insurance?",
        "a": "Sessions are $210 for 45 minutes or $280 for 60 minutes. Bayside is a private-pay practice and does not bill insurance directly. A superbill is available for possible out-of-network reimbursement; eligibility and payment depend on your plan."
      },
      {
        "q": "How many sessions will I need?",
        "a": "There is no fixed number of sessions or promised outcome. We can review what is changing, what remains difficult, and whether to adjust the approach, frequency, or plan for care."
      }
    ],
    "contentHeading": "Showing up differently in close relationships"
  },
  "mens-therapy-palo-alto": {
    "city": "Palo Alto",
    "state": "CA",
    "slug": "mens-therapy-palo-alto",
    "title": "Men's Therapy for Palo Alto Residents",
    "metaTitle": "Men’s Therapy in Palo Alto | Virtual Sessions",
    "metaDescription": "Men’s Therapy for adults in Palo Alto, CA. Adjusting to a changing role. Virtual sessions with Marcus Ghiasi, LMFT. Free consultation.",
    "h1": "Men's Therapy for Adults in Palo Alto, CA",
    "intro": "Parenthood, a relationship ending, or a career change may unsettle an identity that once felt clear. Therapy can make room for mixed feelings and help you decide how you want to respond to new responsibilities or losses. Bayside offers virtual individual therapy to adults in Palo Alto who are physically in California for sessions.",
    "localContent": "Marcus Ghiasi is a California Licensed Marriage and Family Therapist, license #158475. Bayside is based in Oakland. Sessions for Palo Alto residents take place online from a private setting in California. Individual counseling for men working on anger, relationships, stress, and emotional expression.",
    "whyChoose": [
      "Individual sessions with Marcus Ghiasi, LMFT, California license #158475",
      "Virtual access for Palo Alto residents; you must be in California for appointments",
      "A conversation about goals, preferences, and the reasons for a proposed approach",
      "45- or 60-minute private-pay sessions; rates and insurance details are below",
      "Free 15-minute consultation to discuss fit and practical questions"
    ],
    "uniqueContent": [
      "Sessions can connect immediate concerns with the ways you have learned to handle pressure, conflict, or vulnerability. CBT, parts work, and reflective conversation may be useful depending on what you bring. There is no expectation that all men share the same experience or want the same style of therapy.",
      "<a href=\"/services/mens\">Read about Men's Therapy at Bayside.</a> The service overview explains the approach; a consultation can help clarify whether it fits your situation."
    ],
    "uniqueWhatToExpect": [
      "A free 15-minute consultation gives you room to describe what you need, ask questions, and discuss availability. It does not commit you to ongoing sessions.",
      "The first full appointment can explore adjusting to a changing role, your history, and the concerns most important to you. You can ask questions about pace, methods, and what to do if something does not feel useful. Session length is 45 or 60 minutes; check current scheduling options when booking.",
      "There is no fixed number of sessions or promised outcome. We can review what is changing, what remains difficult, and whether to adjust the approach, frequency, or plan for care."
    ],
    "uniqueFaqs": [
      {
        "q": "Do I need to be in a crisis to start?",
        "a": "No. A wish to understand a pattern, improve a relationship, or handle a transition can be enough to begin a consultation."
      },
      {
        "q": "Are these in-person appointments in Palo Alto?",
        "a": "No. Bayside provides virtual individual therapy. You can attend from a private, suitable setting in Palo Alto or elsewhere in California; your physical location matters for every appointment."
      },
      {
        "q": "How much do sessions cost, and can I use insurance?",
        "a": "Sessions are $210 for 45 minutes or $280 for 60 minutes. Bayside is a private-pay practice and does not bill insurance directly. A superbill is available for possible out-of-network reimbursement; eligibility and payment depend on your plan."
      },
      {
        "q": "How many sessions will I need?",
        "a": "There is no fixed number of sessions or promised outcome. We can review what is changing, what remains difficult, and whether to adjust the approach, frequency, or plan for care."
      }
    ],
    "contentHeading": "Adjusting to a changing role"
  },
  "young-adults-therapy-san-francisco": {
    "city": "San Francisco",
    "state": "CA",
    "slug": "young-adults-therapy-san-francisco",
    "title": "Young Adults Therapy for San Francisco Residents",
    "metaTitle": "Young Adult Therapy in San Francisco | Virtual Sessions",
    "metaDescription": "Young Adult Therapy for adults in San Francisco, CA. When the next step feels unclear. Virtual sessions with Marcus Ghiasi, LMFT. Free consultation.",
    "h1": "Young Adults Therapy for Adults in San Francisco, CA",
    "intro": "Finishing school or entering work can leave you without familiar structure. We can separate decisions that need attention now from questions that can remain open, then identify steps that fit your circumstances. Bayside offers virtual individual therapy to adults in San Francisco who are physically in California for sessions.",
    "localContent": "Marcus Ghiasi is a California Licensed Marriage and Family Therapist, license #158475. Bayside is based in Oakland. Sessions for San Francisco residents take place online from a private setting in California. Individual therapy for adults roughly ages 18 to 30 navigating identity, relationships, and transitions.",
    "whyChoose": [
      "Individual sessions with Marcus Ghiasi, LMFT, California license #158475",
      "Virtual access for San Francisco residents; you must be in California for appointments",
      "A conversation about goals, preferences, and the reasons for a proposed approach",
      "45- or 60-minute private-pay sessions; rates and insurance details are below",
      "Free 15-minute consultation to discuss fit and practical questions"
    ],
    "uniqueContent": [
      "We can work on current decisions while also exploring the anxiety, expectations, and relationship habits that make them harder. The approach may draw on CBT, IFS, psychodynamic work, or EMDR when appropriate. You do not need to have your career, identity, or goals settled before starting.",
      "<a href=\"/services/young-adults\">Read about Young Adults Therapy at Bayside.</a> The service overview explains the approach; a consultation can help clarify whether it fits your situation."
    ],
    "uniqueWhatToExpect": [
      "A free 15-minute consultation gives you room to describe what you need, ask questions, and discuss availability. It does not commit you to ongoing sessions.",
      "The first full appointment can explore when the next step feels unclear, your history, and the concerns most important to you. You can ask questions about pace, methods, and what to do if something does not feel useful. Session length is 45 or 60 minutes; check current scheduling options when booking.",
      "There is no fixed number of sessions or promised outcome. We can review what is changing, what remains difficult, and whether to adjust the approach, frequency, or plan for care."
    ],
    "uniqueFaqs": [
      {
        "q": "Do I need a major life problem to benefit from therapy?",
        "a": "No. Feeling unsure, isolated, or repeatedly overwhelmed can be worth exploring even when you are meeting your responsibilities."
      },
      {
        "q": "Are these in-person appointments in San Francisco?",
        "a": "No. Bayside provides virtual individual therapy. You can attend from a private, suitable setting in San Francisco or elsewhere in California; your physical location matters for every appointment."
      },
      {
        "q": "How much do sessions cost, and can I use insurance?",
        "a": "Sessions are $210 for 45 minutes or $280 for 60 minutes. Bayside is a private-pay practice and does not bill insurance directly. A superbill is available for possible out-of-network reimbursement; eligibility and payment depend on your plan."
      },
      {
        "q": "How many sessions will I need?",
        "a": "There is no fixed number of sessions or promised outcome. We can review what is changing, what remains difficult, and whether to adjust the approach, frequency, or plan for care."
      }
    ],
    "contentHeading": "When the next step feels unclear"
  },
  "young-adults-therapy-oakland": {
    "city": "Oakland",
    "state": "CA",
    "slug": "young-adults-therapy-oakland",
    "title": "Young Adults Therapy for Oakland Residents",
    "metaTitle": "Young Adult Therapy in Oakland | Virtual Sessions",
    "metaDescription": "Young Adult Therapy for adults in Oakland, CA. Balancing your priorities with family expectations. Virtual sessions with Marcus Ghiasi, LMFT. Free consultation.",
    "h1": "Young Adults Therapy for Adults in Oakland, CA",
    "intro": "You may value connection with family while wanting a different path. Therapy can help you name the competing needs and plan conversations without assuming that independence requires cutting people off. Bayside offers virtual individual therapy to adults in Oakland who are physically in California for sessions.",
    "localContent": "Marcus Ghiasi is a California Licensed Marriage and Family Therapist, license #158475. Bayside is based in Oakland and provides virtual individual sessions, rather than in-person office appointments. Individual therapy for adults roughly ages 18 to 30 navigating identity, relationships, and transitions.",
    "whyChoose": [
      "Individual sessions with Marcus Ghiasi, LMFT, California license #158475",
      "Virtual access for Oakland residents; you must be in California for appointments",
      "A conversation about goals, preferences, and the reasons for a proposed approach",
      "45- or 60-minute private-pay sessions; rates and insurance details are below",
      "Free 15-minute consultation to discuss fit and practical questions"
    ],
    "uniqueContent": [
      "We can work on current decisions while also exploring the anxiety, expectations, and relationship habits that make them harder. The approach may draw on CBT, IFS, psychodynamic work, or EMDR when appropriate. You do not need to have your career, identity, or goals settled before starting.",
      "<a href=\"/services/young-adults\">Read about Young Adults Therapy at Bayside.</a> The service overview explains the approach; a consultation can help clarify whether it fits your situation."
    ],
    "uniqueWhatToExpect": [
      "A free 15-minute consultation gives you room to describe what you need, ask questions, and discuss availability. It does not commit you to ongoing sessions.",
      "The first full appointment can explore balancing your priorities with family expectations, your history, and the concerns most important to you. You can ask questions about pace, methods, and what to do if something does not feel useful. Session length is 45 or 60 minutes; check current scheduling options when booking.",
      "There is no fixed number of sessions or promised outcome. We can review what is changing, what remains difficult, and whether to adjust the approach, frequency, or plan for care."
    ],
    "uniqueFaqs": [
      {
        "q": "Can we discuss culture and family without reducing everything to them?",
        "a": "Yes. You define what matters in your experience. We can consider cultural and family context alongside other influences without treating identity as a ready-made explanation."
      },
      {
        "q": "Are these in-person appointments in Oakland?",
        "a": "No. Bayside provides virtual individual therapy. You can attend from a private, suitable setting in Oakland or elsewhere in California; your physical location matters for every appointment."
      },
      {
        "q": "How much do sessions cost, and can I use insurance?",
        "a": "Sessions are $210 for 45 minutes or $280 for 60 minutes. Bayside is a private-pay practice and does not bill insurance directly. A superbill is available for possible out-of-network reimbursement; eligibility and payment depend on your plan."
      },
      {
        "q": "How many sessions will I need?",
        "a": "There is no fixed number of sessions or promised outcome. We can review what is changing, what remains difficult, and whether to adjust the approach, frequency, or plan for care."
      }
    ],
    "contentHeading": "Balancing your priorities with family expectations"
  },
  "young-adults-therapy-berkeley": {
    "city": "Berkeley",
    "state": "CA",
    "slug": "young-adults-therapy-berkeley",
    "title": "Young Adults Therapy for Berkeley Residents",
    "metaTitle": "Young Adult Therapy in Berkeley | Virtual Sessions",
    "metaDescription": "Young Adult Therapy for adults in Berkeley, CA. Building relationships beyond familiar settings. Virtual sessions with Marcus Ghiasi, LMFT. Free consultation.",
    "h1": "Young Adults Therapy for Adults in Berkeley, CA",
    "intro": "Leaving a school, workplace, or social circle can change how connection happens. We can explore loneliness, social anxiety, and the practical challenge of reaching out without making every difficult interaction a judgment of your worth. Bayside offers virtual individual therapy to adults in Berkeley who are physically in California for sessions.",
    "localContent": "Marcus Ghiasi is a California Licensed Marriage and Family Therapist, license #158475. Bayside is based in Oakland. Sessions for Berkeley residents take place online from a private setting in California. Individual therapy for adults roughly ages 18 to 30 navigating identity, relationships, and transitions.",
    "whyChoose": [
      "Individual sessions with Marcus Ghiasi, LMFT, California license #158475",
      "Virtual access for Berkeley residents; you must be in California for appointments",
      "A conversation about goals, preferences, and the reasons for a proposed approach",
      "45- or 60-minute private-pay sessions; rates and insurance details are below",
      "Free 15-minute consultation to discuss fit and practical questions"
    ],
    "uniqueContent": [
      "We can work on current decisions while also exploring the anxiety, expectations, and relationship habits that make them harder. The approach may draw on CBT, IFS, psychodynamic work, or EMDR when appropriate. You do not need to have your career, identity, or goals settled before starting.",
      "<a href=\"/services/young-adults\">Read about Young Adults Therapy at Bayside.</a> The service overview explains the approach; a consultation can help clarify whether it fits your situation."
    ],
    "uniqueWhatToExpect": [
      "A free 15-minute consultation gives you room to describe what you need, ask questions, and discuss availability. It does not commit you to ongoing sessions.",
      "The first full appointment can explore building relationships beyond familiar settings, your history, and the concerns most important to you. You can ask questions about pace, methods, and what to do if something does not feel useful. Session length is 45 or 60 minutes; check current scheduling options when booking.",
      "There is no fixed number of sessions or promised outcome. We can review what is changing, what remains difficult, and whether to adjust the approach, frequency, or plan for care."
    ],
    "uniqueFaqs": [
      {
        "q": "What if I feel behind other people my age?",
        "a": "We can examine the comparisons you are using and the realities they leave out. The aim is to identify your priorities and next steps, not replace one rigid timeline with another."
      },
      {
        "q": "Are these in-person appointments in Berkeley?",
        "a": "No. Bayside provides virtual individual therapy. You can attend from a private, suitable setting in Berkeley or elsewhere in California; your physical location matters for every appointment."
      },
      {
        "q": "How much do sessions cost, and can I use insurance?",
        "a": "Sessions are $210 for 45 minutes or $280 for 60 minutes. Bayside is a private-pay practice and does not bill insurance directly. A superbill is available for possible out-of-network reimbursement; eligibility and payment depend on your plan."
      },
      {
        "q": "How many sessions will I need?",
        "a": "There is no fixed number of sessions or promised outcome. We can review what is changing, what remains difficult, and whether to adjust the approach, frequency, or plan for care."
      }
    ],
    "contentHeading": "Building relationships beyond familiar settings"
  },
  "young-adults-therapy-san-jose": {
    "city": "San Jose",
    "state": "CA",
    "slug": "young-adults-therapy-san-jose",
    "title": "Young Adults Therapy for San Jose Residents",
    "metaTitle": "Young Adult Therapy in San Jose | Virtual Sessions",
    "metaDescription": "Young Adult Therapy for adults in San Jose, CA. Separating a setback from your identity. Virtual sessions with Marcus Ghiasi, LMFT. Free consultation.",
    "h1": "Young Adults Therapy for Adults in San Jose, CA",
    "intro": "A job rejection, breakup, or difficult semester can become a story about who you are. Therapy can help make room for disappointment while challenging conclusions that turn one experience into a verdict on your future. Bayside offers virtual individual therapy to adults in San Jose who are physically in California for sessions.",
    "localContent": "Marcus Ghiasi is a California Licensed Marriage and Family Therapist, license #158475. Bayside is based in Oakland. Sessions for San Jose residents take place online from a private setting in California. Individual therapy for adults roughly ages 18 to 30 navigating identity, relationships, and transitions.",
    "whyChoose": [
      "Individual sessions with Marcus Ghiasi, LMFT, California license #158475",
      "Virtual access for San Jose residents; you must be in California for appointments",
      "A conversation about goals, preferences, and the reasons for a proposed approach",
      "45- or 60-minute private-pay sessions; rates and insurance details are below",
      "Free 15-minute consultation to discuss fit and practical questions"
    ],
    "uniqueContent": [
      "We can work on current decisions while also exploring the anxiety, expectations, and relationship habits that make them harder. The approach may draw on CBT, IFS, psychodynamic work, or EMDR when appropriate. You do not need to have your career, identity, or goals settled before starting.",
      "<a href=\"/services/young-adults\">Read about Young Adults Therapy at Bayside.</a> The service overview explains the approach; a consultation can help clarify whether it fits your situation."
    ],
    "uniqueWhatToExpect": [
      "A free 15-minute consultation gives you room to describe what you need, ask questions, and discuss availability. It does not commit you to ongoing sessions.",
      "The first full appointment can explore separating a setback from your identity, your history, and the concerns most important to you. You can ask questions about pace, methods, and what to do if something does not feel useful. Session length is 45 or 60 minutes; check current scheduling options when booking.",
      "There is no fixed number of sessions or promised outcome. We can review what is changing, what remains difficult, and whether to adjust the approach, frequency, or plan for care."
    ],
    "uniqueFaqs": [
      {
        "q": "Will we focus on practical decisions or deeper patterns?",
        "a": "Both can be relevant. We can work on an immediate decision and notice patterns that keep making similar decisions painful."
      },
      {
        "q": "Are these in-person appointments in San Jose?",
        "a": "No. Bayside provides virtual individual therapy. You can attend from a private, suitable setting in San Jose or elsewhere in California; your physical location matters for every appointment."
      },
      {
        "q": "How much do sessions cost, and can I use insurance?",
        "a": "Sessions are $210 for 45 minutes or $280 for 60 minutes. Bayside is a private-pay practice and does not bill insurance directly. A superbill is available for possible out-of-network reimbursement; eligibility and payment depend on your plan."
      },
      {
        "q": "How many sessions will I need?",
        "a": "There is no fixed number of sessions or promised outcome. We can review what is changing, what remains difficult, and whether to adjust the approach, frequency, or plan for care."
      }
    ],
    "contentHeading": "Separating a setback from your identity"
  },
  "young-adults-therapy-palo-alto": {
    "city": "Palo Alto",
    "state": "CA",
    "slug": "young-adults-therapy-palo-alto",
    "title": "Young Adults Therapy for Palo Alto Residents",
    "metaTitle": "Young Adult Therapy in Palo Alto | Virtual Sessions",
    "metaDescription": "Young Adult Therapy for adults in Palo Alto, CA. Learning to trust your own preferences. Virtual sessions with Marcus Ghiasi, LMFT. Free consultation.",
    "h1": "Young Adults Therapy for Adults in Palo Alto, CA",
    "intro": "It can be difficult to know what you want when you are used to adapting to others. Sessions can explore what feels meaningful, what feels obligatory, and how to experiment with a choice without needing complete certainty. Bayside offers virtual individual therapy to adults in Palo Alto who are physically in California for sessions.",
    "localContent": "Marcus Ghiasi is a California Licensed Marriage and Family Therapist, license #158475. Bayside is based in Oakland. Sessions for Palo Alto residents take place online from a private setting in California. Individual therapy for adults roughly ages 18 to 30 navigating identity, relationships, and transitions.",
    "whyChoose": [
      "Individual sessions with Marcus Ghiasi, LMFT, California license #158475",
      "Virtual access for Palo Alto residents; you must be in California for appointments",
      "A conversation about goals, preferences, and the reasons for a proposed approach",
      "45- or 60-minute private-pay sessions; rates and insurance details are below",
      "Free 15-minute consultation to discuss fit and practical questions"
    ],
    "uniqueContent": [
      "We can work on current decisions while also exploring the anxiety, expectations, and relationship habits that make them harder. The approach may draw on CBT, IFS, psychodynamic work, or EMDR when appropriate. You do not need to have your career, identity, or goals settled before starting.",
      "<a href=\"/services/young-adults\">Read about Young Adults Therapy at Bayside.</a> The service overview explains the approach; a consultation can help clarify whether it fits your situation."
    ],
    "uniqueWhatToExpect": [
      "A free 15-minute consultation gives you room to describe what you need, ask questions, and discuss availability. It does not commit you to ongoing sessions.",
      "The first full appointment can explore learning to trust your own preferences, your history, and the concerns most important to you. You can ask questions about pace, methods, and what to do if something does not feel useful. Session length is 45 or 60 minutes; check current scheduling options when booking.",
      "There is no fixed number of sessions or promised outcome. We can review what is changing, what remains difficult, and whether to adjust the approach, frequency, or plan for care."
    ],
    "uniqueFaqs": [
      {
        "q": "Can I start even if I cannot explain what feels wrong?",
        "a": "Yes. You can begin with what you notice in daily life. We can clarify the concern and decide together whether ongoing work would be useful."
      },
      {
        "q": "Are these in-person appointments in Palo Alto?",
        "a": "No. Bayside provides virtual individual therapy. You can attend from a private, suitable setting in Palo Alto or elsewhere in California; your physical location matters for every appointment."
      },
      {
        "q": "How much do sessions cost, and can I use insurance?",
        "a": "Sessions are $210 for 45 minutes or $280 for 60 minutes. Bayside is a private-pay practice and does not bill insurance directly. A superbill is available for possible out-of-network reimbursement; eligibility and payment depend on your plan."
      },
      {
        "q": "How many sessions will I need?",
        "a": "There is no fixed number of sessions or promised outcome. We can review what is changing, what remains difficult, and whether to adjust the approach, frequency, or plan for care."
      }
    ],
    "contentHeading": "Learning to trust your own preferences"
  },
  "anxiety-therapy-berkeley": {
    "city": "Berkeley",
    "state": "CA",
    "slug": "anxiety-therapy-berkeley",
    "title": "Anxiety Therapy for Berkeley Residents",
    "metaTitle": "Anxiety Therapy in Berkeley | Virtual Sessions",
    "metaDescription": "Anxiety Therapy for adults in Berkeley, CA. When worry occupies the whole day. Virtual sessions with Marcus Ghiasi, LMFT. Free consultation.",
    "h1": "Anxiety Therapy for Adults in Berkeley, CA",
    "intro": "Repeatedly checking, planning, or asking for reassurance may ease distress briefly while keeping your attention on what could go wrong. We can examine that cycle and work on tolerating uncertainty in manageable steps. Bayside offers virtual individual therapy to adults in Berkeley who are physically in California for sessions.",
    "localContent": "Marcus Ghiasi is a California Licensed Marriage and Family Therapist, license #158475. Bayside is based in Oakland. Sessions for Berkeley residents take place online from a private setting in California. Support for persistent worry, avoidance, self-doubt, and anxiety that interferes with daily life.",
    "whyChoose": [
      "Individual sessions with Marcus Ghiasi, LMFT, California license #158475",
      "Virtual access for Berkeley residents; you must be in California for appointments",
      "A conversation about goals, preferences, and the reasons for a proposed approach",
      "45- or 60-minute private-pay sessions; rates and insurance details are below",
      "Free 15-minute consultation to discuss fit and practical questions"
    ],
    "uniqueContent": [
      "We begin by understanding when anxiety shows up, what you do to manage it, and what it keeps you from doing. CBT can help examine worry and avoidance; parts work or other approaches may help explore self-criticism and competing needs. Trauma-focused work is considered when relevant, not assumed to be necessary for all anxiety.",
      "<a href=\"/services/cbt\">Read about Cognitive Behavioral Therapy at Bayside.</a> The service overview explains the approach; a consultation can help clarify whether it fits your situation."
    ],
    "uniqueWhatToExpect": [
      "A free 15-minute consultation gives you room to describe what you need, ask questions, and discuss availability. It does not commit you to ongoing sessions.",
      "The first full appointment can explore when worry occupies the whole day, your history, and the concerns most important to you. You can ask questions about pace, methods, and what to do if something does not feel useful. Session length is 45 or 60 minutes; check current scheduling options when booking.",
      "There is no fixed number of sessions or promised outcome. We can review what is changing, what remains difficult, and whether to adjust the approach, frequency, or plan for care."
    ],
    "uniqueFaqs": [
      {
        "q": "Is the goal to stop feeling anxious altogether?",
        "a": "Not necessarily. Anxiety can be a useful signal. A practical goal may be responding with more flexibility and spending less time organizing life around worry."
      },
      {
        "q": "Are these in-person appointments in Berkeley?",
        "a": "No. Bayside provides virtual individual therapy. You can attend from a private, suitable setting in Berkeley or elsewhere in California; your physical location matters for every appointment."
      },
      {
        "q": "How much do sessions cost, and can I use insurance?",
        "a": "Sessions are $210 for 45 minutes or $280 for 60 minutes. Bayside is a private-pay practice and does not bill insurance directly. A superbill is available for possible out-of-network reimbursement; eligibility and payment depend on your plan."
      },
      {
        "q": "How many sessions will I need?",
        "a": "There is no fixed number of sessions or promised outcome. We can review what is changing, what remains difficult, and whether to adjust the approach, frequency, or plan for care."
      }
    ],
    "contentHeading": "When worry occupies the whole day"
  },
  "anxiety-therapy-san-francisco": {
    "city": "San Francisco",
    "state": "CA",
    "slug": "anxiety-therapy-san-francisco",
    "title": "Anxiety Therapy for San Francisco Residents",
    "metaTitle": "Anxiety Therapy in San Francisco | Virtual Sessions",
    "metaDescription": "Anxiety Therapy for adults in San Francisco, CA. When anxiety shows up physically. Virtual sessions with Marcus Ghiasi, LMFT. Free consultation.",
    "h1": "Anxiety Therapy for Adults in San Francisco, CA",
    "intro": "Tension, a racing heart, or an unsettled stomach can be frightening. We can explore the connection with stress while recognizing that new, severe, or unexplained physical symptoms may also need medical evaluation. Bayside offers virtual individual therapy to adults in San Francisco who are physically in California for sessions.",
    "localContent": "Marcus Ghiasi is a California Licensed Marriage and Family Therapist, license #158475. Bayside is based in Oakland. Sessions for San Francisco residents take place online from a private setting in California. Support for persistent worry, avoidance, self-doubt, and anxiety that interferes with daily life.",
    "whyChoose": [
      "Individual sessions with Marcus Ghiasi, LMFT, California license #158475",
      "Virtual access for San Francisco residents; you must be in California for appointments",
      "A conversation about goals, preferences, and the reasons for a proposed approach",
      "45- or 60-minute private-pay sessions; rates and insurance details are below",
      "Free 15-minute consultation to discuss fit and practical questions"
    ],
    "uniqueContent": [
      "We begin by understanding when anxiety shows up, what you do to manage it, and what it keeps you from doing. CBT can help examine worry and avoidance; parts work or other approaches may help explore self-criticism and competing needs. Trauma-focused work is considered when relevant, not assumed to be necessary for all anxiety.",
      "<a href=\"/services/cbt\">Read about Cognitive Behavioral Therapy at Bayside.</a> The service overview explains the approach; a consultation can help clarify whether it fits your situation."
    ],
    "uniqueWhatToExpect": [
      "A free 15-minute consultation gives you room to describe what you need, ask questions, and discuss availability. It does not commit you to ongoing sessions.",
      "The first full appointment can explore when anxiety shows up physically, your history, and the concerns most important to you. You can ask questions about pace, methods, and what to do if something does not feel useful. Session length is 45 or 60 minutes; check current scheduling options when booking.",
      "There is no fixed number of sessions or promised outcome. We can review what is changing, what remains difficult, and whether to adjust the approach, frequency, or plan for care."
    ],
    "uniqueFaqs": [
      {
        "q": "Will you assume every physical symptom is anxiety?",
        "a": "No. Therapy does not replace medical assessment. We can discuss when to seek medical care and work on anxiety alongside appropriate health care."
      },
      {
        "q": "Are these in-person appointments in San Francisco?",
        "a": "No. Bayside provides virtual individual therapy. You can attend from a private, suitable setting in San Francisco or elsewhere in California; your physical location matters for every appointment."
      },
      {
        "q": "How much do sessions cost, and can I use insurance?",
        "a": "Sessions are $210 for 45 minutes or $280 for 60 minutes. Bayside is a private-pay practice and does not bill insurance directly. A superbill is available for possible out-of-network reimbursement; eligibility and payment depend on your plan."
      },
      {
        "q": "How many sessions will I need?",
        "a": "There is no fixed number of sessions or promised outcome. We can review what is changing, what remains difficult, and whether to adjust the approach, frequency, or plan for care."
      }
    ],
    "contentHeading": "When anxiety shows up physically"
  },
  "anxiety-therapy-oakland": {
    "city": "Oakland",
    "state": "CA",
    "slug": "anxiety-therapy-oakland",
    "title": "Anxiety Therapy for Oakland Residents",
    "metaTitle": "Anxiety Therapy in Oakland | Virtual Sessions",
    "metaDescription": "Anxiety Therapy for adults in Oakland, CA. When avoiding discomfort narrows your choices. Virtual sessions with Marcus Ghiasi, LMFT. Free consultation.",
    "h1": "Anxiety Therapy for Adults in Oakland, CA",
    "intro": "Skipping a conversation or event can feel protective in the moment. Over time, avoidance may leave fewer options. We can distinguish genuine risk from feared outcomes and plan steps you agree to try. Bayside offers virtual individual therapy to adults in Oakland who are physically in California for sessions.",
    "localContent": "Marcus Ghiasi is a California Licensed Marriage and Family Therapist, license #158475. Bayside is based in Oakland and provides virtual individual sessions, rather than in-person office appointments. Support for persistent worry, avoidance, self-doubt, and anxiety that interferes with daily life.",
    "whyChoose": [
      "Individual sessions with Marcus Ghiasi, LMFT, California license #158475",
      "Virtual access for Oakland residents; you must be in California for appointments",
      "A conversation about goals, preferences, and the reasons for a proposed approach",
      "45- or 60-minute private-pay sessions; rates and insurance details are below",
      "Free 15-minute consultation to discuss fit and practical questions"
    ],
    "uniqueContent": [
      "We begin by understanding when anxiety shows up, what you do to manage it, and what it keeps you from doing. CBT can help examine worry and avoidance; parts work or other approaches may help explore self-criticism and competing needs. Trauma-focused work is considered when relevant, not assumed to be necessary for all anxiety.",
      "<a href=\"/services/cbt\">Read about Cognitive Behavioral Therapy at Bayside.</a> The service overview explains the approach; a consultation can help clarify whether it fits your situation."
    ],
    "uniqueWhatToExpect": [
      "A free 15-minute consultation gives you room to describe what you need, ask questions, and discuss availability. It does not commit you to ongoing sessions.",
      "The first full appointment can explore when avoiding discomfort narrows your choices, your history, and the concerns most important to you. You can ask questions about pace, methods, and what to do if something does not feel useful. Session length is 45 or 60 minutes; check current scheduling options when booking.",
      "There is no fixed number of sessions or promised outcome. We can review what is changing, what remains difficult, and whether to adjust the approach, frequency, or plan for care."
    ],
    "uniqueFaqs": [
      {
        "q": "Do I have to face my biggest fear immediately?",
        "a": "No. Any work with feared situations should be collaborative, relevant to your goals, and appropriately paced."
      },
      {
        "q": "Are these in-person appointments in Oakland?",
        "a": "No. Bayside provides virtual individual therapy. You can attend from a private, suitable setting in Oakland or elsewhere in California; your physical location matters for every appointment."
      },
      {
        "q": "How much do sessions cost, and can I use insurance?",
        "a": "Sessions are $210 for 45 minutes or $280 for 60 minutes. Bayside is a private-pay practice and does not bill insurance directly. A superbill is available for possible out-of-network reimbursement; eligibility and payment depend on your plan."
      },
      {
        "q": "How many sessions will I need?",
        "a": "There is no fixed number of sessions or promised outcome. We can review what is changing, what remains difficult, and whether to adjust the approach, frequency, or plan for care."
      }
    ],
    "contentHeading": "When avoiding discomfort narrows your choices"
  },
  "anxiety-therapy-san-jose": {
    "city": "San Jose",
    "state": "CA",
    "slug": "anxiety-therapy-san-jose",
    "title": "Anxiety Therapy for San Jose Residents",
    "metaTitle": "Anxiety Therapy in San Jose | Virtual Sessions",
    "metaDescription": "Anxiety Therapy for adults in San Jose, CA. When you replay conversations afterward. Virtual sessions with Marcus Ghiasi, LMFT. Free consultation.",
    "h1": "Anxiety Therapy for Adults in San Jose, CA",
    "intro": "A conversation may end while the self-evaluation continues for hours. We can look at assumptions about how others see you, the urge to seek certainty, and ways to return attention to the present. Bayside offers virtual individual therapy to adults in San Jose who are physically in California for sessions.",
    "localContent": "Marcus Ghiasi is a California Licensed Marriage and Family Therapist, license #158475. Bayside is based in Oakland. Sessions for San Jose residents take place online from a private setting in California. Support for persistent worry, avoidance, self-doubt, and anxiety that interferes with daily life.",
    "whyChoose": [
      "Individual sessions with Marcus Ghiasi, LMFT, California license #158475",
      "Virtual access for San Jose residents; you must be in California for appointments",
      "A conversation about goals, preferences, and the reasons for a proposed approach",
      "45- or 60-minute private-pay sessions; rates and insurance details are below",
      "Free 15-minute consultation to discuss fit and practical questions"
    ],
    "uniqueContent": [
      "We begin by understanding when anxiety shows up, what you do to manage it, and what it keeps you from doing. CBT can help examine worry and avoidance; parts work or other approaches may help explore self-criticism and competing needs. Trauma-focused work is considered when relevant, not assumed to be necessary for all anxiety.",
      "<a href=\"/services/cbt\">Read about Cognitive Behavioral Therapy at Bayside.</a> The service overview explains the approach; a consultation can help clarify whether it fits your situation."
    ],
    "uniqueWhatToExpect": [
      "A free 15-minute consultation gives you room to describe what you need, ask questions, and discuss availability. It does not commit you to ongoing sessions.",
      "The first full appointment can explore when you replay conversations afterward, your history, and the concerns most important to you. You can ask questions about pace, methods, and what to do if something does not feel useful. Session length is 45 or 60 minutes; check current scheduling options when booking.",
      "There is no fixed number of sessions or promised outcome. We can review what is changing, what remains difficult, and whether to adjust the approach, frequency, or plan for care."
    ],
    "uniqueFaqs": [
      {
        "q": "Can therapy help even when I know my worry is excessive?",
        "a": "Yes. Recognizing a pattern and changing your response to it are different tasks. Sessions can include practice with what to do when the familiar worry returns."
      },
      {
        "q": "Are these in-person appointments in San Jose?",
        "a": "No. Bayside provides virtual individual therapy. You can attend from a private, suitable setting in San Jose or elsewhere in California; your physical location matters for every appointment."
      },
      {
        "q": "How much do sessions cost, and can I use insurance?",
        "a": "Sessions are $210 for 45 minutes or $280 for 60 minutes. Bayside is a private-pay practice and does not bill insurance directly. A superbill is available for possible out-of-network reimbursement; eligibility and payment depend on your plan."
      },
      {
        "q": "How many sessions will I need?",
        "a": "There is no fixed number of sessions or promised outcome. We can review what is changing, what remains difficult, and whether to adjust the approach, frequency, or plan for care."
      }
    ],
    "contentHeading": "When you replay conversations afterward"
  },
  "anxiety-therapy-palo-alto": {
    "city": "Palo Alto",
    "state": "CA",
    "slug": "anxiety-therapy-palo-alto",
    "title": "Anxiety Therapy for Palo Alto Residents",
    "metaTitle": "Anxiety Therapy in Palo Alto | Virtual Sessions",
    "metaDescription": "Anxiety Therapy for adults in Palo Alto, CA. When worry follows you into rest. Virtual sessions with Marcus Ghiasi, LMFT. Free consultation.",
    "h1": "Anxiety Therapy for Adults in Palo Alto, CA",
    "intro": "Time off can make unresolved concerns feel louder rather than quieter. We can explore routines, expectations, and what happens when you stop being busy without assuming that one relaxation exercise will solve it. Bayside offers virtual individual therapy to adults in Palo Alto who are physically in California for sessions.",
    "localContent": "Marcus Ghiasi is a California Licensed Marriage and Family Therapist, license #158475. Bayside is based in Oakland. Sessions for Palo Alto residents take place online from a private setting in California. Support for persistent worry, avoidance, self-doubt, and anxiety that interferes with daily life.",
    "whyChoose": [
      "Individual sessions with Marcus Ghiasi, LMFT, California license #158475",
      "Virtual access for Palo Alto residents; you must be in California for appointments",
      "A conversation about goals, preferences, and the reasons for a proposed approach",
      "45- or 60-minute private-pay sessions; rates and insurance details are below",
      "Free 15-minute consultation to discuss fit and practical questions"
    ],
    "uniqueContent": [
      "We begin by understanding when anxiety shows up, what you do to manage it, and what it keeps you from doing. CBT can help examine worry and avoidance; parts work or other approaches may help explore self-criticism and competing needs. Trauma-focused work is considered when relevant, not assumed to be necessary for all anxiety.",
      "<a href=\"/services/cbt\">Read about Cognitive Behavioral Therapy at Bayside.</a> The service overview explains the approach; a consultation can help clarify whether it fits your situation."
    ],
    "uniqueWhatToExpect": [
      "A free 15-minute consultation gives you room to describe what you need, ask questions, and discuss availability. It does not commit you to ongoing sessions.",
      "The first full appointment can explore when worry follows you into rest, your history, and the concerns most important to you. You can ask questions about pace, methods, and what to do if something does not feel useful. Session length is 45 or 60 minutes; check current scheduling options when booking.",
      "There is no fixed number of sessions or promised outcome. We can review what is changing, what remains difficult, and whether to adjust the approach, frequency, or plan for care."
    ],
    "uniqueFaqs": [
      {
        "q": "Should I use EMDR for anxiety?",
        "a": "It depends on the assessment. EMDR may be relevant when distress is linked to particular experiences, but other approaches may be a better starting point."
      },
      {
        "q": "Are these in-person appointments in Palo Alto?",
        "a": "No. Bayside provides virtual individual therapy. You can attend from a private, suitable setting in Palo Alto or elsewhere in California; your physical location matters for every appointment."
      },
      {
        "q": "How much do sessions cost, and can I use insurance?",
        "a": "Sessions are $210 for 45 minutes or $280 for 60 minutes. Bayside is a private-pay practice and does not bill insurance directly. A superbill is available for possible out-of-network reimbursement; eligibility and payment depend on your plan."
      },
      {
        "q": "How many sessions will I need?",
        "a": "There is no fixed number of sessions or promised outcome. We can review what is changing, what remains difficult, and whether to adjust the approach, frequency, or plan for care."
      }
    ],
    "contentHeading": "When worry follows you into rest"
  },
  "trauma-therapy-san-francisco": {
    "city": "San Francisco",
    "state": "CA",
    "slug": "trauma-therapy-san-francisco",
    "title": "Trauma Therapy for San Francisco Residents",
    "metaTitle": "Trauma Therapy in San Francisco | Virtual Sessions",
    "metaDescription": "Trauma Therapy for adults in San Francisco, CA. When reminders interrupt ordinary moments. Virtual sessions with Marcus Ghiasi, LMFT. Free consultation.",
    "h1": "Trauma Therapy for Adults in San Francisco, CA",
    "intro": "A sound, interaction, or unexpected event may bring a strong reaction. We can identify patterns, discuss ways to stay oriented, and consider whether trauma-focused treatment fits what you are experiencing. Bayside offers virtual individual therapy to adults in San Francisco who are physically in California for sessions.",
    "localContent": "Marcus Ghiasi is a California Licensed Marriage and Family Therapist, license #158475. Bayside is based in Oakland. Sessions for San Francisco residents take place online from a private setting in California. A paced space to address the continuing effects of overwhelming or frightening experiences.",
    "whyChoose": [
      "Individual sessions with Marcus Ghiasi, LMFT, California license #158475",
      "Virtual access for San Francisco residents; you must be in California for appointments",
      "A conversation about goals, preferences, and the reasons for a proposed approach",
      "45- or 60-minute private-pay sessions; rates and insurance details are below",
      "Free 15-minute consultation to discuss fit and practical questions"
    ],
    "uniqueContent": [
      "Trauma therapy begins with understanding what is affecting you now and what helps you feel more grounded. EMDR may be an option, alongside work on coping, relationships, and daily functioning. We discuss treatment choices and pacing rather than assuming that recounting everything immediately is helpful.",
      "<a href=\"/services/emdr\">Read about EMDR Therapy at Bayside.</a> The service overview explains the approach; a consultation can help clarify whether it fits your situation."
    ],
    "uniqueWhatToExpect": [
      "A free 15-minute consultation gives you room to describe what you need, ask questions, and discuss availability. It does not commit you to ongoing sessions.",
      "The first full appointment can explore when reminders interrupt ordinary moments, your history, and the concerns most important to you. You can ask questions about pace, methods, and what to do if something does not feel useful. Session length is 45 or 60 minutes; check current scheduling options when booking.",
      "There is no fixed number of sessions or promised outcome. We can review what is changing, what remains difficult, and whether to adjust the approach, frequency, or plan for care."
    ],
    "uniqueFaqs": [
      {
        "q": "Do I need a PTSD diagnosis to ask about trauma therapy?",
        "a": "No. You can seek help for distressing experiences without deciding on a diagnosis first. Assessment helps clarify symptoms and appropriate options."
      },
      {
        "q": "Are these in-person appointments in San Francisco?",
        "a": "No. Bayside provides virtual individual therapy. You can attend from a private, suitable setting in San Francisco or elsewhere in California; your physical location matters for every appointment."
      },
      {
        "q": "How much do sessions cost, and can I use insurance?",
        "a": "Sessions are $210 for 45 minutes or $280 for 60 minutes. Bayside is a private-pay practice and does not bill insurance directly. A superbill is available for possible out-of-network reimbursement; eligibility and payment depend on your plan."
      },
      {
        "q": "How many sessions will I need?",
        "a": "There is no fixed number of sessions or promised outcome. We can review what is changing, what remains difficult, and whether to adjust the approach, frequency, or plan for care."
      }
    ],
    "contentHeading": "When reminders interrupt ordinary moments"
  },
  "trauma-therapy-oakland": {
    "city": "Oakland",
    "state": "CA",
    "slug": "trauma-therapy-oakland",
    "title": "Trauma Therapy for Oakland Residents",
    "metaTitle": "Trauma Therapy in Oakland | Virtual Sessions",
    "metaDescription": "Trauma Therapy for adults in Oakland, CA. When feeling safe takes more than reassurance. Virtual sessions with Marcus Ghiasi, LMFT. Free consultation.",
    "h1": "Trauma Therapy for Adults in Oakland, CA",
    "intro": "Knowing that an event is over does not always settle your reactions. Therapy can address how you respond to reminders while also considering present conditions that may still need practical attention. Bayside offers virtual individual therapy to adults in Oakland who are physically in California for sessions.",
    "localContent": "Marcus Ghiasi is a California Licensed Marriage and Family Therapist, license #158475. Bayside is based in Oakland and provides virtual individual sessions, rather than in-person office appointments. A paced space to address the continuing effects of overwhelming or frightening experiences.",
    "whyChoose": [
      "Individual sessions with Marcus Ghiasi, LMFT, California license #158475",
      "Virtual access for Oakland residents; you must be in California for appointments",
      "A conversation about goals, preferences, and the reasons for a proposed approach",
      "45- or 60-minute private-pay sessions; rates and insurance details are below",
      "Free 15-minute consultation to discuss fit and practical questions"
    ],
    "uniqueContent": [
      "Trauma therapy begins with understanding what is affecting you now and what helps you feel more grounded. EMDR may be an option, alongside work on coping, relationships, and daily functioning. We discuss treatment choices and pacing rather than assuming that recounting everything immediately is helpful.",
      "<a href=\"/services/emdr\">Read about EMDR Therapy at Bayside.</a> The service overview explains the approach; a consultation can help clarify whether it fits your situation."
    ],
    "uniqueWhatToExpect": [
      "A free 15-minute consultation gives you room to describe what you need, ask questions, and discuss availability. It does not commit you to ongoing sessions.",
      "The first full appointment can explore when feeling safe takes more than reassurance, your history, and the concerns most important to you. You can ask questions about pace, methods, and what to do if something does not feel useful. Session length is 45 or 60 minutes; check current scheduling options when booking.",
      "There is no fixed number of sessions or promised outcome. We can review what is changing, what remains difficult, and whether to adjust the approach, frequency, or plan for care."
    ],
    "uniqueFaqs": [
      {
        "q": "Will you assume my current situation is safe?",
        "a": "No. Current safety and support need to be considered directly. Therapy should not treat a reasonable response to ongoing harm as merely a memory problem."
      },
      {
        "q": "Are these in-person appointments in Oakland?",
        "a": "No. Bayside provides virtual individual therapy. You can attend from a private, suitable setting in Oakland or elsewhere in California; your physical location matters for every appointment."
      },
      {
        "q": "How much do sessions cost, and can I use insurance?",
        "a": "Sessions are $210 for 45 minutes or $280 for 60 minutes. Bayside is a private-pay practice and does not bill insurance directly. A superbill is available for possible out-of-network reimbursement; eligibility and payment depend on your plan."
      },
      {
        "q": "How many sessions will I need?",
        "a": "There is no fixed number of sessions or promised outcome. We can review what is changing, what remains difficult, and whether to adjust the approach, frequency, or plan for care."
      }
    ],
    "contentHeading": "When feeling safe takes more than reassurance"
  },
  "trauma-therapy-berkeley": {
    "city": "Berkeley",
    "state": "CA",
    "slug": "trauma-therapy-berkeley",
    "title": "Trauma Therapy for Berkeley Residents",
    "metaTitle": "Trauma Therapy in Berkeley | Virtual Sessions",
    "metaDescription": "Trauma Therapy for adults in Berkeley, CA. Making space for experiences you have minimized. Virtual sessions with Marcus Ghiasi, LMFT. Free consultation.",
    "h1": "Trauma Therapy for Adults in Berkeley, CA",
    "intro": "You may wonder whether an experience was serious enough to discuss. You do not need to compare it with someone else’s history. We can begin with its effect on your life and what you want help with. Bayside offers virtual individual therapy to adults in Berkeley who are physically in California for sessions.",
    "localContent": "Marcus Ghiasi is a California Licensed Marriage and Family Therapist, license #158475. Bayside is based in Oakland. Sessions for Berkeley residents take place online from a private setting in California. A paced space to address the continuing effects of overwhelming or frightening experiences.",
    "whyChoose": [
      "Individual sessions with Marcus Ghiasi, LMFT, California license #158475",
      "Virtual access for Berkeley residents; you must be in California for appointments",
      "A conversation about goals, preferences, and the reasons for a proposed approach",
      "45- or 60-minute private-pay sessions; rates and insurance details are below",
      "Free 15-minute consultation to discuss fit and practical questions"
    ],
    "uniqueContent": [
      "Trauma therapy begins with understanding what is affecting you now and what helps you feel more grounded. EMDR may be an option, alongside work on coping, relationships, and daily functioning. We discuss treatment choices and pacing rather than assuming that recounting everything immediately is helpful.",
      "<a href=\"/services/emdr\">Read about EMDR Therapy at Bayside.</a> The service overview explains the approach; a consultation can help clarify whether it fits your situation."
    ],
    "uniqueWhatToExpect": [
      "A free 15-minute consultation gives you room to describe what you need, ask questions, and discuss availability. It does not commit you to ongoing sessions.",
      "The first full appointment can explore making space for experiences you have minimized, your history, and the concerns most important to you. You can ask questions about pace, methods, and what to do if something does not feel useful. Session length is 45 or 60 minutes; check current scheduling options when booking.",
      "There is no fixed number of sessions or promised outcome. We can review what is changing, what remains difficult, and whether to adjust the approach, frequency, or plan for care."
    ],
    "uniqueFaqs": [
      {
        "q": "Must I tell the whole story during the consultation?",
        "a": "No. A brief description of the concern and what you need from treatment is enough to start discussing fit. Detailed history belongs in an appropriate clinical setting."
      },
      {
        "q": "Are these in-person appointments in Berkeley?",
        "a": "No. Bayside provides virtual individual therapy. You can attend from a private, suitable setting in Berkeley or elsewhere in California; your physical location matters for every appointment."
      },
      {
        "q": "How much do sessions cost, and can I use insurance?",
        "a": "Sessions are $210 for 45 minutes or $280 for 60 minutes. Bayside is a private-pay practice and does not bill insurance directly. A superbill is available for possible out-of-network reimbursement; eligibility and payment depend on your plan."
      },
      {
        "q": "How many sessions will I need?",
        "a": "There is no fixed number of sessions or promised outcome. We can review what is changing, what remains difficult, and whether to adjust the approach, frequency, or plan for care."
      }
    ],
    "contentHeading": "Making space for experiences you have minimized"
  },
  "trauma-therapy-san-jose": {
    "city": "San Jose",
    "state": "CA",
    "slug": "trauma-therapy-san-jose",
    "title": "Trauma Therapy for San Jose Residents",
    "metaTitle": "Trauma Therapy in San Jose | Virtual Sessions",
    "metaDescription": "Trauma Therapy for adults in San Jose, CA. When relationships bring up old protective habits. Virtual sessions with Marcus Ghiasi, LMFT. Free consultation.",
    "h1": "Trauma Therapy for Adults in San Jose, CA",
    "intro": "Withdrawing, appeasing, or staying alert to conflict may have helped you cope before. We can explore whether those responses still protect you, what they cost now, and what alternatives feel possible. Bayside offers virtual individual therapy to adults in San Jose who are physically in California for sessions.",
    "localContent": "Marcus Ghiasi is a California Licensed Marriage and Family Therapist, license #158475. Bayside is based in Oakland. Sessions for San Jose residents take place online from a private setting in California. A paced space to address the continuing effects of overwhelming or frightening experiences.",
    "whyChoose": [
      "Individual sessions with Marcus Ghiasi, LMFT, California license #158475",
      "Virtual access for San Jose residents; you must be in California for appointments",
      "A conversation about goals, preferences, and the reasons for a proposed approach",
      "45- or 60-minute private-pay sessions; rates and insurance details are below",
      "Free 15-minute consultation to discuss fit and practical questions"
    ],
    "uniqueContent": [
      "Trauma therapy begins with understanding what is affecting you now and what helps you feel more grounded. EMDR may be an option, alongside work on coping, relationships, and daily functioning. We discuss treatment choices and pacing rather than assuming that recounting everything immediately is helpful.",
      "<a href=\"/services/emdr\">Read about EMDR Therapy at Bayside.</a> The service overview explains the approach; a consultation can help clarify whether it fits your situation."
    ],
    "uniqueWhatToExpect": [
      "A free 15-minute consultation gives you room to describe what you need, ask questions, and discuss availability. It does not commit you to ongoing sessions.",
      "The first full appointment can explore when relationships bring up old protective habits, your history, and the concerns most important to you. You can ask questions about pace, methods, and what to do if something does not feel useful. Session length is 45 or 60 minutes; check current scheduling options when booking.",
      "There is no fixed number of sessions or promised outcome. We can review what is changing, what remains difficult, and whether to adjust the approach, frequency, or plan for care."
    ],
    "uniqueFaqs": [
      {
        "q": "Does trauma therapy require forgiving someone?",
        "a": "No. You do not have to forgive, reconcile, or adopt a particular interpretation of what happened. Your goals and boundaries remain central."
      },
      {
        "q": "Are these in-person appointments in San Jose?",
        "a": "No. Bayside provides virtual individual therapy. You can attend from a private, suitable setting in San Jose or elsewhere in California; your physical location matters for every appointment."
      },
      {
        "q": "How much do sessions cost, and can I use insurance?",
        "a": "Sessions are $210 for 45 minutes or $280 for 60 minutes. Bayside is a private-pay practice and does not bill insurance directly. A superbill is available for possible out-of-network reimbursement; eligibility and payment depend on your plan."
      },
      {
        "q": "How many sessions will I need?",
        "a": "There is no fixed number of sessions or promised outcome. We can review what is changing, what remains difficult, and whether to adjust the approach, frequency, or plan for care."
      }
    ],
    "contentHeading": "When relationships bring up old protective habits"
  },
  "trauma-therapy-palo-alto": {
    "city": "Palo Alto",
    "state": "CA",
    "slug": "trauma-therapy-palo-alto",
    "title": "Trauma Therapy for Palo Alto Residents",
    "metaTitle": "Trauma Therapy in Palo Alto | Virtual Sessions",
    "metaDescription": "Trauma Therapy for adults in Palo Alto, CA. Choosing a pace you can participate in. Virtual sessions with Marcus Ghiasi, LMFT. Free consultation.",
    "h1": "Trauma Therapy for Adults in Palo Alto, CA",
    "intro": "It is reasonable to ask how difficult material will be approached and what support is available between sessions. We can discuss readiness, stabilization, and when a different level of care may be needed. Bayside offers virtual individual therapy to adults in Palo Alto who are physically in California for sessions.",
    "localContent": "Marcus Ghiasi is a California Licensed Marriage and Family Therapist, license #158475. Bayside is based in Oakland. Sessions for Palo Alto residents take place online from a private setting in California. A paced space to address the continuing effects of overwhelming or frightening experiences.",
    "whyChoose": [
      "Individual sessions with Marcus Ghiasi, LMFT, California license #158475",
      "Virtual access for Palo Alto residents; you must be in California for appointments",
      "A conversation about goals, preferences, and the reasons for a proposed approach",
      "45- or 60-minute private-pay sessions; rates and insurance details are below",
      "Free 15-minute consultation to discuss fit and practical questions"
    ],
    "uniqueContent": [
      "Trauma therapy begins with understanding what is affecting you now and what helps you feel more grounded. EMDR may be an option, alongside work on coping, relationships, and daily functioning. We discuss treatment choices and pacing rather than assuming that recounting everything immediately is helpful.",
      "<a href=\"/services/emdr\">Read about EMDR Therapy at Bayside.</a> The service overview explains the approach; a consultation can help clarify whether it fits your situation."
    ],
    "uniqueWhatToExpect": [
      "A free 15-minute consultation gives you room to describe what you need, ask questions, and discuss availability. It does not commit you to ongoing sessions.",
      "The first full appointment can explore choosing a pace you can participate in, your history, and the concerns most important to you. You can ask questions about pace, methods, and what to do if something does not feel useful. Session length is 45 or 60 minutes; check current scheduling options when booking.",
      "There is no fixed number of sessions or promised outcome. We can review what is changing, what remains difficult, and whether to adjust the approach, frequency, or plan for care."
    ],
    "uniqueFaqs": [
      {
        "q": "What if trauma work feels too intense?",
        "a": "Tell your therapist. We can pause, review the approach, and consider additional support or a referral. Feeling overwhelmed is not a requirement for progress."
      },
      {
        "q": "Are these in-person appointments in Palo Alto?",
        "a": "No. Bayside provides virtual individual therapy. You can attend from a private, suitable setting in Palo Alto or elsewhere in California; your physical location matters for every appointment."
      },
      {
        "q": "How much do sessions cost, and can I use insurance?",
        "a": "Sessions are $210 for 45 minutes or $280 for 60 minutes. Bayside is a private-pay practice and does not bill insurance directly. A superbill is available for possible out-of-network reimbursement; eligibility and payment depend on your plan."
      },
      {
        "q": "How many sessions will I need?",
        "a": "There is no fixed number of sessions or promised outcome. We can review what is changing, what remains difficult, and whether to adjust the approach, frequency, or plan for care."
      }
    ],
    "contentHeading": "Choosing a pace you can participate in"
  },
  "anger-therapy-san-francisco": {
    "city": "San Francisco",
    "state": "CA",
    "slug": "anger-therapy-san-francisco",
    "title": "Therapy for Anger for San Francisco Residents",
    "metaTitle": "Therapy for Anger in San Francisco | Virtual Sessions",
    "metaDescription": "Therapy for Anger for adults in San Francisco, CA. Noticing the escalation earlier. Virtual sessions with Marcus Ghiasi, LMFT. Free consultation.",
    "h1": "Therapy for Anger for Adults in San Francisco, CA",
    "intro": "Anger may seem sudden, but there can be earlier signs such as tension, urgency, or rehearsing an argument. We can look for those cues and practice a plan for responding before an interaction becomes harder to repair. Bayside offers virtual individual therapy to adults in San Francisco who are physically in California for sessions.",
    "localContent": "Marcus Ghiasi is a California Licensed Marriage and Family Therapist, license #158475. Bayside is based in Oakland. Sessions for San Francisco residents take place online from a private setting in California. Individual work on anger, conflict, and the behavior you want to change.",
    "whyChoose": [
      "Individual sessions with Marcus Ghiasi, LMFT, California license #158475",
      "Virtual access for San Francisco residents; you must be in California for appointments",
      "A conversation about goals, preferences, and the reasons for a proposed approach",
      "45- or 60-minute private-pay sessions; rates and insurance details are below",
      "Free 15-minute consultation to discuss fit and practical questions"
    ],
    "uniqueContent": [
      "We can examine a recent incident in detail: the trigger, interpretation, physical cues, actions, and aftermath. Therapy may include regulation skills, examining beliefs, practicing communication, and taking responsibility for harm. Understanding a feeling does not excuse intimidation or aggression.",
      "<a href=\"/services/mens\">Read about Men's Therapy at Bayside.</a> The service overview explains the approach; a consultation can help clarify whether it fits your situation."
    ],
    "uniqueWhatToExpect": [
      "A free 15-minute consultation gives you room to describe what you need, ask questions, and discuss availability. It does not commit you to ongoing sessions.",
      "The first full appointment can explore noticing the escalation earlier, your history, and the concerns most important to you. You can ask questions about pace, methods, and what to do if something does not feel useful. Session length is 45 or 60 minutes; check current scheduling options when booking.",
      "There is no fixed number of sessions or promised outcome. We can review what is changing, what remains difficult, and whether to adjust the approach, frequency, or plan for care."
    ],
    "uniqueFaqs": [
      {
        "q": "Is this a court-approved anger management program?",
        "a": "Bayside offers individual psychotherapy, not a represented court-approved or mandated anger-management course. If you have a legal requirement, confirm the exact program criteria with the referring authority."
      },
      {
        "q": "Are these in-person appointments in San Francisco?",
        "a": "No. Bayside provides virtual individual therapy. You can attend from a private, suitable setting in San Francisco or elsewhere in California; your physical location matters for every appointment."
      },
      {
        "q": "How much do sessions cost, and can I use insurance?",
        "a": "Sessions are $210 for 45 minutes or $280 for 60 minutes. Bayside is a private-pay practice and does not bill insurance directly. A superbill is available for possible out-of-network reimbursement; eligibility and payment depend on your plan."
      },
      {
        "q": "How many sessions will I need?",
        "a": "There is no fixed number of sessions or promised outcome. We can review what is changing, what remains difficult, and whether to adjust the approach, frequency, or plan for care."
      }
    ],
    "contentHeading": "Noticing the escalation earlier"
  },
  "anger-therapy-oakland": {
    "city": "Oakland",
    "state": "CA",
    "slug": "anger-therapy-oakland",
    "title": "Therapy for Anger for Oakland Residents",
    "metaTitle": "Therapy for Anger in Oakland | Virtual Sessions",
    "metaDescription": "Therapy for Anger for adults in Oakland, CA. Taking responsibility after conflict. Virtual sessions with Marcus Ghiasi, LMFT. Free consultation.",
    "h1": "Therapy for Anger for Adults in Oakland, CA",
    "intro": "An apology can matter, but repeated apologies without changes in behavior may erode trust. We can explore what accountability would look like in a specific situation and develop a plan for responding differently. Bayside offers virtual individual therapy to adults in Oakland who are physically in California for sessions.",
    "localContent": "Marcus Ghiasi is a California Licensed Marriage and Family Therapist, license #158475. Bayside is based in Oakland and provides virtual individual sessions, rather than in-person office appointments. Individual work on anger, conflict, and the behavior you want to change.",
    "whyChoose": [
      "Individual sessions with Marcus Ghiasi, LMFT, California license #158475",
      "Virtual access for Oakland residents; you must be in California for appointments",
      "A conversation about goals, preferences, and the reasons for a proposed approach",
      "45- or 60-minute private-pay sessions; rates and insurance details are below",
      "Free 15-minute consultation to discuss fit and practical questions"
    ],
    "uniqueContent": [
      "We can examine a recent incident in detail: the trigger, interpretation, physical cues, actions, and aftermath. Therapy may include regulation skills, examining beliefs, practicing communication, and taking responsibility for harm. Understanding a feeling does not excuse intimidation or aggression.",
      "<a href=\"/services/mens\">Read about Men's Therapy at Bayside.</a> The service overview explains the approach; a consultation can help clarify whether it fits your situation."
    ],
    "uniqueWhatToExpect": [
      "A free 15-minute consultation gives you room to describe what you need, ask questions, and discuss availability. It does not commit you to ongoing sessions.",
      "The first full appointment can explore taking responsibility after conflict, your history, and the concerns most important to you. You can ask questions about pace, methods, and what to do if something does not feel useful. Session length is 45 or 60 minutes; check current scheduling options when booking.",
      "There is no fixed number of sessions or promised outcome. We can review what is changing, what remains difficult, and whether to adjust the approach, frequency, or plan for care."
    ],
    "uniqueFaqs": [
      {
        "q": "Will therapy focus only on what other people do to trigger me?",
        "a": "No. Other people’s actions may be relevant, but the work includes your choices, impact, and responsibility. The goal is more than explaining the reaction."
      },
      {
        "q": "Are these in-person appointments in Oakland?",
        "a": "No. Bayside provides virtual individual therapy. You can attend from a private, suitable setting in Oakland or elsewhere in California; your physical location matters for every appointment."
      },
      {
        "q": "How much do sessions cost, and can I use insurance?",
        "a": "Sessions are $210 for 45 minutes or $280 for 60 minutes. Bayside is a private-pay practice and does not bill insurance directly. A superbill is available for possible out-of-network reimbursement; eligibility and payment depend on your plan."
      },
      {
        "q": "How many sessions will I need?",
        "a": "There is no fixed number of sessions or promised outcome. We can review what is changing, what remains difficult, and whether to adjust the approach, frequency, or plan for care."
      }
    ],
    "contentHeading": "Taking responsibility after conflict"
  },
  "anger-therapy-berkeley": {
    "city": "Berkeley",
    "state": "CA",
    "slug": "anger-therapy-berkeley",
    "title": "Therapy for Anger for Berkeley Residents",
    "metaTitle": "Therapy for Anger in Berkeley | Virtual Sessions",
    "metaDescription": "Therapy for Anger for adults in Berkeley, CA. Recognizing what anger is communicating. Virtual sessions with Marcus Ghiasi, LMFT. Free consultation.",
    "h1": "Therapy for Anger for Adults in Berkeley, CA",
    "intro": "Anger may accompany hurt, fear, frustration, or a crossed boundary. Sometimes it is a direct response to a current problem. We can explore its meaning without assuming another emotion is always underneath it. Bayside offers virtual individual therapy to adults in Berkeley who are physically in California for sessions.",
    "localContent": "Marcus Ghiasi is a California Licensed Marriage and Family Therapist, license #158475. Bayside is based in Oakland. Sessions for Berkeley residents take place online from a private setting in California. Individual work on anger, conflict, and the behavior you want to change.",
    "whyChoose": [
      "Individual sessions with Marcus Ghiasi, LMFT, California license #158475",
      "Virtual access for Berkeley residents; you must be in California for appointments",
      "A conversation about goals, preferences, and the reasons for a proposed approach",
      "45- or 60-minute private-pay sessions; rates and insurance details are below",
      "Free 15-minute consultation to discuss fit and practical questions"
    ],
    "uniqueContent": [
      "We can examine a recent incident in detail: the trigger, interpretation, physical cues, actions, and aftermath. Therapy may include regulation skills, examining beliefs, practicing communication, and taking responsibility for harm. Understanding a feeling does not excuse intimidation or aggression.",
      "<a href=\"/services/mens\">Read about Men's Therapy at Bayside.</a> The service overview explains the approach; a consultation can help clarify whether it fits your situation."
    ],
    "uniqueWhatToExpect": [
      "A free 15-minute consultation gives you room to describe what you need, ask questions, and discuss availability. It does not commit you to ongoing sessions.",
      "The first full appointment can explore recognizing what anger is communicating, your history, and the concerns most important to you. You can ask questions about pace, methods, and what to do if something does not feel useful. Session length is 45 or 60 minutes; check current scheduling options when booking.",
      "There is no fixed number of sessions or promised outcome. We can review what is changing, what remains difficult, and whether to adjust the approach, frequency, or plan for care."
    ],
    "uniqueFaqs": [
      {
        "q": "Does anger always come from trauma?",
        "a": "No. Sleep, stress, learned habits, substance use, current conflict, and other factors can contribute. Assessment helps avoid an overly simple explanation."
      },
      {
        "q": "Are these in-person appointments in Berkeley?",
        "a": "No. Bayside provides virtual individual therapy. You can attend from a private, suitable setting in Berkeley or elsewhere in California; your physical location matters for every appointment."
      },
      {
        "q": "How much do sessions cost, and can I use insurance?",
        "a": "Sessions are $210 for 45 minutes or $280 for 60 minutes. Bayside is a private-pay practice and does not bill insurance directly. A superbill is available for possible out-of-network reimbursement; eligibility and payment depend on your plan."
      },
      {
        "q": "How many sessions will I need?",
        "a": "There is no fixed number of sessions or promised outcome. We can review what is changing, what remains difficult, and whether to adjust the approach, frequency, or plan for care."
      }
    ],
    "contentHeading": "Recognizing what anger is communicating"
  },
  "anger-therapy-san-jose": {
    "city": "San Jose",
    "state": "CA",
    "slug": "anger-therapy-san-jose",
    "title": "Therapy for Anger for San Jose Residents",
    "metaTitle": "Therapy for Anger in San Jose | Virtual Sessions",
    "metaDescription": "Therapy for Anger for adults in San Jose, CA. Leaving an argument without abandoning it. Virtual sessions with Marcus Ghiasi, LMFT. Free consultation.",
    "h1": "Therapy for Anger for Adults in San Jose, CA",
    "intro": "A pause can help when both people know what it means and when the conversation will resume. We can practice ways to request space without using silence or withdrawal as punishment. Bayside offers virtual individual therapy to adults in San Jose who are physically in California for sessions.",
    "localContent": "Marcus Ghiasi is a California Licensed Marriage and Family Therapist, license #158475. Bayside is based in Oakland. Sessions for San Jose residents take place online from a private setting in California. Individual work on anger, conflict, and the behavior you want to change.",
    "whyChoose": [
      "Individual sessions with Marcus Ghiasi, LMFT, California license #158475",
      "Virtual access for San Jose residents; you must be in California for appointments",
      "A conversation about goals, preferences, and the reasons for a proposed approach",
      "45- or 60-minute private-pay sessions; rates and insurance details are below",
      "Free 15-minute consultation to discuss fit and practical questions"
    ],
    "uniqueContent": [
      "We can examine a recent incident in detail: the trigger, interpretation, physical cues, actions, and aftermath. Therapy may include regulation skills, examining beliefs, practicing communication, and taking responsibility for harm. Understanding a feeling does not excuse intimidation or aggression.",
      "<a href=\"/services/mens\">Read about Men's Therapy at Bayside.</a> The service overview explains the approach; a consultation can help clarify whether it fits your situation."
    ],
    "uniqueWhatToExpect": [
      "A free 15-minute consultation gives you room to describe what you need, ask questions, and discuss availability. It does not commit you to ongoing sessions.",
      "The first full appointment can explore leaving an argument without abandoning it, your history, and the concerns most important to you. You can ask questions about pace, methods, and what to do if something does not feel useful. Session length is 45 or 60 minutes; check current scheduling options when booking.",
      "There is no fixed number of sessions or promised outcome. We can review what is changing, what remains difficult, and whether to adjust the approach, frequency, or plan for care."
    ],
    "uniqueFaqs": [
      {
        "q": "Can individual therapy replace a safety plan in an abusive situation?",
        "a": "No. If there is coercion, threats, or violence, safety and appropriate specialist support take priority. General communication advice is not sufficient for those situations."
      },
      {
        "q": "Are these in-person appointments in San Jose?",
        "a": "No. Bayside provides virtual individual therapy. You can attend from a private, suitable setting in San Jose or elsewhere in California; your physical location matters for every appointment."
      },
      {
        "q": "How much do sessions cost, and can I use insurance?",
        "a": "Sessions are $210 for 45 minutes or $280 for 60 minutes. Bayside is a private-pay practice and does not bill insurance directly. A superbill is available for possible out-of-network reimbursement; eligibility and payment depend on your plan."
      },
      {
        "q": "How many sessions will I need?",
        "a": "There is no fixed number of sessions or promised outcome. We can review what is changing, what remains difficult, and whether to adjust the approach, frequency, or plan for care."
      }
    ],
    "contentHeading": "Leaving an argument without abandoning it"
  },
  "anger-therapy-palo-alto": {
    "city": "Palo Alto",
    "state": "CA",
    "slug": "anger-therapy-palo-alto",
    "title": "Therapy for Anger for Palo Alto Residents",
    "metaTitle": "Therapy for Anger in Palo Alto | Virtual Sessions",
    "metaDescription": "Therapy for Anger for adults in Palo Alto, CA. Changing the pattern beyond the latest incident. Virtual sessions with Marcus Ghiasi, LMFT. Free consultation.",
    "h1": "Therapy for Anger for Adults in Palo Alto, CA",
    "intro": "Work pressure, resentment, and habits around conflict may accumulate before an outburst. We can examine the recurring pattern and what needs to change between incidents, not just during the moment of escalation. Bayside offers virtual individual therapy to adults in Palo Alto who are physically in California for sessions.",
    "localContent": "Marcus Ghiasi is a California Licensed Marriage and Family Therapist, license #158475. Bayside is based in Oakland. Sessions for Palo Alto residents take place online from a private setting in California. Individual work on anger, conflict, and the behavior you want to change.",
    "whyChoose": [
      "Individual sessions with Marcus Ghiasi, LMFT, California license #158475",
      "Virtual access for Palo Alto residents; you must be in California for appointments",
      "A conversation about goals, preferences, and the reasons for a proposed approach",
      "45- or 60-minute private-pay sessions; rates and insurance details are below",
      "Free 15-minute consultation to discuss fit and practical questions"
    ],
    "uniqueContent": [
      "We can examine a recent incident in detail: the trigger, interpretation, physical cues, actions, and aftermath. Therapy may include regulation skills, examining beliefs, practicing communication, and taking responsibility for harm. Understanding a feeling does not excuse intimidation or aggression.",
      "<a href=\"/services/mens\">Read about Men's Therapy at Bayside.</a> The service overview explains the approach; a consultation can help clarify whether it fits your situation."
    ],
    "uniqueWhatToExpect": [
      "A free 15-minute consultation gives you room to describe what you need, ask questions, and discuss availability. It does not commit you to ongoing sessions.",
      "The first full appointment can explore changing the pattern beyond the latest incident, your history, and the concerns most important to you. You can ask questions about pace, methods, and what to do if something does not feel useful. Session length is 45 or 60 minutes; check current scheduling options when booking.",
      "There is no fixed number of sessions or promised outcome. We can review what is changing, what remains difficult, and whether to adjust the approach, frequency, or plan for care."
    ],
    "uniqueFaqs": [
      {
        "q": "Can women and nonbinary adults seek help with anger here?",
        "a": "Yes. Anger is not limited to men. Individual therapy can address anger across genders, with the approach shaped by the person rather than a stereotype."
      },
      {
        "q": "Are these in-person appointments in Palo Alto?",
        "a": "No. Bayside provides virtual individual therapy. You can attend from a private, suitable setting in Palo Alto or elsewhere in California; your physical location matters for every appointment."
      },
      {
        "q": "How much do sessions cost, and can I use insurance?",
        "a": "Sessions are $210 for 45 minutes or $280 for 60 minutes. Bayside is a private-pay practice and does not bill insurance directly. A superbill is available for possible out-of-network reimbursement; eligibility and payment depend on your plan."
      },
      {
        "q": "How many sessions will I need?",
        "a": "There is no fixed number of sessions or promised outcome. We can review what is changing, what remains difficult, and whether to adjust the approach, frequency, or plan for care."
      }
    ],
    "contentHeading": "Changing the pattern beyond the latest incident"
  },
  "college-student-therapy-san-francisco": {
    "city": "San Francisco",
    "state": "CA",
    "slug": "college-student-therapy-san-francisco",
    "title": "College Student Therapy for San Francisco Residents",
    "metaTitle": "College Student Therapy in San Francisco | Virtual Sessions",
    "metaDescription": "College Student Therapy for adults in San Francisco, CA. When coursework follows you into every part of life. Virtual sessions with Marcus Ghiasi, LMFT. Free consultation.",
    "h1": "College Student Therapy for Adults in San Francisco, CA",
    "intro": "Assignments may be finished while the feeling of being behind remains. We can explore how you judge your work, what happens when you rest, and how to make room for relationships and basic care alongside school. Bayside offers virtual individual therapy to adults in San Francisco who are physically in California for sessions.",
    "localContent": "Marcus Ghiasi is a California Licensed Marriage and Family Therapist, license #158475. Bayside is based in Oakland. Sessions for San Francisco residents take place online from a private setting in California. Individual support for adult students navigating academic pressure, relationships, and changing independence.",
    "whyChoose": [
      "Individual sessions with Marcus Ghiasi, LMFT, California license #158475",
      "Virtual access for San Francisco residents; you must be in California for appointments",
      "A conversation about goals, preferences, and the reasons for a proposed approach",
      "45- or 60-minute private-pay sessions; rates and insurance details are below",
      "Free 15-minute consultation to discuss fit and practical questions"
    ],
    "uniqueContent": [
      "Student therapy can address immediate stress and the patterns that make it harder to manage. We can work on perfectionism, avoidance, identity, or relationships using an approach suited to your needs. Private therapy is one option alongside campus resources; it is not inherently better or a substitute for every service a school provides.",
      "<a href=\"/services/young-adults\">Read about Young Adults Therapy at Bayside.</a> The service overview explains the approach; a consultation can help clarify whether it fits your situation."
    ],
    "uniqueWhatToExpect": [
      "A free 15-minute consultation gives you room to describe what you need, ask questions, and discuss availability. It does not commit you to ongoing sessions.",
      "The first full appointment can explore when coursework follows you into every part of life, your history, and the concerns most important to you. You can ask questions about pace, methods, and what to do if something does not feel useful. Session length is 45 or 60 minutes; check current scheduling options when booking.",
      "There is no fixed number of sessions or promised outcome. We can review what is changing, what remains difficult, and whether to adjust the approach, frequency, or plan for care."
    ],
    "uniqueFaqs": [
      {
        "q": "Do I need to wait until my grades are affected?",
        "a": "No. Anxiety, isolation, or persistent pressure can be worth addressing before academic performance changes. You can start with the concern that matters to you."
      },
      {
        "q": "Are these in-person appointments in San Francisco?",
        "a": "No. Bayside provides virtual individual therapy. You can attend from a private, suitable setting in San Francisco or elsewhere in California; your physical location matters for every appointment."
      },
      {
        "q": "How much do sessions cost, and can I use insurance?",
        "a": "Sessions are $210 for 45 minutes or $280 for 60 minutes. Bayside is a private-pay practice and does not bill insurance directly. A superbill is available for possible out-of-network reimbursement; eligibility and payment depend on your plan."
      },
      {
        "q": "How many sessions will I need?",
        "a": "There is no fixed number of sessions or promised outcome. We can review what is changing, what remains difficult, and whether to adjust the approach, frequency, or plan for care."
      }
    ],
    "contentHeading": "When coursework follows you into every part of life"
  },
  "college-student-therapy-oakland": {
    "city": "Oakland",
    "state": "CA",
    "slug": "college-student-therapy-oakland",
    "title": "College Student Therapy for Oakland Residents",
    "metaTitle": "College Student Therapy in Oakland | Virtual Sessions",
    "metaDescription": "College Student Therapy for adults in Oakland, CA. Balancing school with work or family responsibilities. Virtual sessions with Marcus Ghiasi, LMFT. Free consultation.",
    "h1": "College Student Therapy for Adults in Oakland, CA",
    "intro": "A study plan may not solve the strain of competing obligations. We can distinguish practical limits from self-blame, consider boundaries, and identify support without assuming you can simply remove responsibilities. Bayside offers virtual individual therapy to adults in Oakland who are physically in California for sessions.",
    "localContent": "Marcus Ghiasi is a California Licensed Marriage and Family Therapist, license #158475. Bayside is based in Oakland and provides virtual individual sessions, rather than in-person office appointments. Individual support for adult students navigating academic pressure, relationships, and changing independence.",
    "whyChoose": [
      "Individual sessions with Marcus Ghiasi, LMFT, California license #158475",
      "Virtual access for Oakland residents; you must be in California for appointments",
      "A conversation about goals, preferences, and the reasons for a proposed approach",
      "45- or 60-minute private-pay sessions; rates and insurance details are below",
      "Free 15-minute consultation to discuss fit and practical questions"
    ],
    "uniqueContent": [
      "Student therapy can address immediate stress and the patterns that make it harder to manage. We can work on perfectionism, avoidance, identity, or relationships using an approach suited to your needs. Private therapy is one option alongside campus resources; it is not inherently better or a substitute for every service a school provides.",
      "<a href=\"/services/young-adults\">Read about Young Adults Therapy at Bayside.</a> The service overview explains the approach; a consultation can help clarify whether it fits your situation."
    ],
    "uniqueWhatToExpect": [
      "A free 15-minute consultation gives you room to describe what you need, ask questions, and discuss availability. It does not commit you to ongoing sessions.",
      "The first full appointment can explore balancing school with work or family responsibilities, your history, and the concerns most important to you. You can ask questions about pace, methods, and what to do if something does not feel useful. Session length is 45 or 60 minutes; check current scheduling options when booking.",
      "There is no fixed number of sessions or promised outcome. We can review what is changing, what remains difficult, and whether to adjust the approach, frequency, or plan for care."
    ],
    "uniqueFaqs": [
      {
        "q": "Can therapy help if the workload itself is the problem?",
        "a": "Therapy cannot change every external demand. It can help you evaluate options, communicate limits, and respond to pressure while recognizing that practical support may also be needed."
      },
      {
        "q": "Are these in-person appointments in Oakland?",
        "a": "No. Bayside provides virtual individual therapy. You can attend from a private, suitable setting in Oakland or elsewhere in California; your physical location matters for every appointment."
      },
      {
        "q": "How much do sessions cost, and can I use insurance?",
        "a": "Sessions are $210 for 45 minutes or $280 for 60 minutes. Bayside is a private-pay practice and does not bill insurance directly. A superbill is available for possible out-of-network reimbursement; eligibility and payment depend on your plan."
      },
      {
        "q": "How many sessions will I need?",
        "a": "There is no fixed number of sessions or promised outcome. We can review what is changing, what remains difficult, and whether to adjust the approach, frequency, or plan for care."
      }
    ],
    "contentHeading": "Balancing school with work or family responsibilities"
  },
  "college-student-therapy-berkeley": {
    "city": "Berkeley",
    "state": "CA",
    "slug": "college-student-therapy-berkeley",
    "title": "College Student Therapy for Berkeley Residents",
    "metaTitle": "College Student Therapy in Berkeley | Virtual Sessions",
    "metaDescription": "College Student Therapy for adults in Berkeley, CA. When belonging feels uncertain. Virtual sessions with Marcus Ghiasi, LMFT. Free consultation.",
    "h1": "College Student Therapy for Adults in Berkeley, CA",
    "intro": "It is possible to be surrounded by people and still feel disconnected. Sessions can explore social anxiety, comparison, identity, and the difference between wanting connection and feeling able to reach for it. Bayside offers virtual individual therapy to adults in Berkeley who are physically in California for sessions.",
    "localContent": "Marcus Ghiasi is a California Licensed Marriage and Family Therapist, license #158475. Bayside is based in Oakland. Sessions for Berkeley residents take place online from a private setting in California. Individual support for adult students navigating academic pressure, relationships, and changing independence.",
    "whyChoose": [
      "Individual sessions with Marcus Ghiasi, LMFT, California license #158475",
      "Virtual access for Berkeley residents; you must be in California for appointments",
      "A conversation about goals, preferences, and the reasons for a proposed approach",
      "45- or 60-minute private-pay sessions; rates and insurance details are below",
      "Free 15-minute consultation to discuss fit and practical questions"
    ],
    "uniqueContent": [
      "Student therapy can address immediate stress and the patterns that make it harder to manage. We can work on perfectionism, avoidance, identity, or relationships using an approach suited to your needs. Private therapy is one option alongside campus resources; it is not inherently better or a substitute for every service a school provides.",
      "<a href=\"/services/young-adults\">Read about Young Adults Therapy at Bayside.</a> The service overview explains the approach; a consultation can help clarify whether it fits your situation."
    ],
    "uniqueWhatToExpect": [
      "A free 15-minute consultation gives you room to describe what you need, ask questions, and discuss availability. It does not commit you to ongoing sessions.",
      "The first full appointment can explore when belonging feels uncertain, your history, and the concerns most important to you. You can ask questions about pace, methods, and what to do if something does not feel useful. Session length is 45 or 60 minutes; check current scheduling options when booking.",
      "There is no fixed number of sessions or promised outcome. We can review what is changing, what remains difficult, and whether to adjust the approach, frequency, or plan for care."
    ],
    "uniqueFaqs": [
      {
        "q": "Do I have to attend a particular university?",
        "a": "No. Adult students can ask about care regardless of their college. Bayside is an independent practice and is not a university counseling service."
      },
      {
        "q": "Are these in-person appointments in Berkeley?",
        "a": "No. Bayside provides virtual individual therapy. You can attend from a private, suitable setting in Berkeley or elsewhere in California; your physical location matters for every appointment."
      },
      {
        "q": "How much do sessions cost, and can I use insurance?",
        "a": "Sessions are $210 for 45 minutes or $280 for 60 minutes. Bayside is a private-pay practice and does not bill insurance directly. A superbill is available for possible out-of-network reimbursement; eligibility and payment depend on your plan."
      },
      {
        "q": "How many sessions will I need?",
        "a": "There is no fixed number of sessions or promised outcome. We can review what is changing, what remains difficult, and whether to adjust the approach, frequency, or plan for care."
      }
    ],
    "contentHeading": "When belonging feels uncertain"
  },
  "college-student-therapy-san-jose": {
    "city": "San Jose",
    "state": "CA",
    "slug": "college-student-therapy-san-jose",
    "title": "College Student Therapy for San Jose Residents",
    "metaTitle": "College Student Therapy in San Jose | Virtual Sessions",
    "metaDescription": "College Student Therapy for adults in San Jose, CA. When comparison turns learning into a verdict. Virtual sessions with Marcus Ghiasi, LMFT. Free consultation.",
    "h1": "College Student Therapy for Adults in San Jose, CA",
    "intro": "Seeing a peer succeed can become evidence that you do not belong. We can explore the standards you use, the parts of other people’s lives you cannot see, and ways to stay engaged when confidence is low. Bayside offers virtual individual therapy to adults in San Jose who are physically in California for sessions.",
    "localContent": "Marcus Ghiasi is a California Licensed Marriage and Family Therapist, license #158475. Bayside is based in Oakland. Sessions for San Jose residents take place online from a private setting in California. Individual support for adult students navigating academic pressure, relationships, and changing independence.",
    "whyChoose": [
      "Individual sessions with Marcus Ghiasi, LMFT, California license #158475",
      "Virtual access for San Jose residents; you must be in California for appointments",
      "A conversation about goals, preferences, and the reasons for a proposed approach",
      "45- or 60-minute private-pay sessions; rates and insurance details are below",
      "Free 15-minute consultation to discuss fit and practical questions"
    ],
    "uniqueContent": [
      "Student therapy can address immediate stress and the patterns that make it harder to manage. We can work on perfectionism, avoidance, identity, or relationships using an approach suited to your needs. Private therapy is one option alongside campus resources; it is not inherently better or a substitute for every service a school provides.",
      "<a href=\"/services/young-adults\">Read about Young Adults Therapy at Bayside.</a> The service overview explains the approach; a consultation can help clarify whether it fits your situation."
    ],
    "uniqueWhatToExpect": [
      "A free 15-minute consultation gives you room to describe what you need, ask questions, and discuss availability. It does not commit you to ongoing sessions.",
      "The first full appointment can explore when comparison turns learning into a verdict, your history, and the concerns most important to you. You can ask questions about pace, methods, and what to do if something does not feel useful. Session length is 45 or 60 minutes; check current scheduling options when booking.",
      "There is no fixed number of sessions or promised outcome. We can review what is changing, what remains difficult, and whether to adjust the approach, frequency, or plan for care."
    ],
    "uniqueFaqs": [
      {
        "q": "What if I already understand that my self-criticism is unfair?",
        "a": "Understanding is a useful starting point. We can also practice how you respond when criticism shows up, examine avoidance, and explore the experiences that give the criticism its force."
      },
      {
        "q": "Are these in-person appointments in San Jose?",
        "a": "No. Bayside provides virtual individual therapy. You can attend from a private, suitable setting in San Jose or elsewhere in California; your physical location matters for every appointment."
      },
      {
        "q": "How much do sessions cost, and can I use insurance?",
        "a": "Sessions are $210 for 45 minutes or $280 for 60 minutes. Bayside is a private-pay practice and does not bill insurance directly. A superbill is available for possible out-of-network reimbursement; eligibility and payment depend on your plan."
      },
      {
        "q": "How many sessions will I need?",
        "a": "There is no fixed number of sessions or promised outcome. We can review what is changing, what remains difficult, and whether to adjust the approach, frequency, or plan for care."
      }
    ],
    "contentHeading": "When comparison turns learning into a verdict"
  },
  "college-student-therapy-palo-alto": {
    "city": "Palo Alto",
    "state": "CA",
    "slug": "college-student-therapy-palo-alto",
    "title": "College Student Therapy for Palo Alto Residents",
    "metaTitle": "College Student Therapy in Palo Alto | Virtual Sessions",
    "metaDescription": "College Student Therapy for adults in Palo Alto, CA. When the next stage feels harder to picture. Virtual sessions with Marcus Ghiasi, LMFT. Free consultation.",
    "h1": "College Student Therapy for Adults in Palo Alto, CA",
    "intro": "Graduation, a change of major, or uncertainty about work can bring grief as well as possibility. Therapy can support decisions without assuming there is one correct path or one timetable for becoming an adult. Bayside offers virtual individual therapy to adults in Palo Alto who are physically in California for sessions.",
    "localContent": "Marcus Ghiasi is a California Licensed Marriage and Family Therapist, license #158475. Bayside is based in Oakland. Sessions for Palo Alto residents take place online from a private setting in California. Individual support for adult students navigating academic pressure, relationships, and changing independence.",
    "whyChoose": [
      "Individual sessions with Marcus Ghiasi, LMFT, California license #158475",
      "Virtual access for Palo Alto residents; you must be in California for appointments",
      "A conversation about goals, preferences, and the reasons for a proposed approach",
      "45- or 60-minute private-pay sessions; rates and insurance details are below",
      "Free 15-minute consultation to discuss fit and practical questions"
    ],
    "uniqueContent": [
      "Student therapy can address immediate stress and the patterns that make it harder to manage. We can work on perfectionism, avoidance, identity, or relationships using an approach suited to your needs. Private therapy is one option alongside campus resources; it is not inherently better or a substitute for every service a school provides.",
      "<a href=\"/services/young-adults\">Read about Young Adults Therapy at Bayside.</a> The service overview explains the approach; a consultation can help clarify whether it fits your situation."
    ],
    "uniqueWhatToExpect": [
      "A free 15-minute consultation gives you room to describe what you need, ask questions, and discuss availability. It does not commit you to ongoing sessions.",
      "The first full appointment can explore when the next stage feels harder to picture, your history, and the concerns most important to you. You can ask questions about pace, methods, and what to do if something does not feel useful. Session length is 45 or 60 minutes; check current scheduling options when booking.",
      "There is no fixed number of sessions or promised outcome. We can review what is changing, what remains difficult, and whether to adjust the approach, frequency, or plan for care."
    ],
    "uniqueFaqs": [
      {
        "q": "Can graduate students use this service?",
        "a": "Yes. Graduate students can bring concerns such as isolation, uncertainty, working relationships, and the balance between training and the rest of life. Fit is discussed individually."
      },
      {
        "q": "Are these in-person appointments in Palo Alto?",
        "a": "No. Bayside provides virtual individual therapy. You can attend from a private, suitable setting in Palo Alto or elsewhere in California; your physical location matters for every appointment."
      },
      {
        "q": "How much do sessions cost, and can I use insurance?",
        "a": "Sessions are $210 for 45 minutes or $280 for 60 minutes. Bayside is a private-pay practice and does not bill insurance directly. A superbill is available for possible out-of-network reimbursement; eligibility and payment depend on your plan."
      },
      {
        "q": "How many sessions will I need?",
        "a": "There is no fixed number of sessions or promised outcome. We can review what is changing, what remains difficult, and whether to adjust the approach, frequency, or plan for care."
      }
    ],
    "contentHeading": "When the next stage feels harder to picture"
  },
  "lgbtq-therapy-san-francisco": {
    "city": "San Francisco",
    "state": "CA",
    "slug": "lgbtq-therapy-san-francisco",
    "title": "LGBTQ+ Affirming Therapy for San Francisco Residents",
    "metaTitle": "LGBTQ+ Affirming Therapy in San Francisco | Virtual Sessions",
    "metaDescription": "LGBTQ+ Affirming Therapy for adults in San Francisco, CA. Being seen without being reduced to an identity. Virtual sessions with Marcus Ghiasi, LMFT. Free consultation.",
    "h1": "LGBTQ+ Affirming Therapy for Adults in San Francisco, CA",
    "intro": "You may want a therapist who respects your identity without making it the focus of every conversation. We can discuss the role it plays in your life and follow your priorities. Bayside offers virtual individual therapy to adults in San Francisco who are physically in California for sessions.",
    "localContent": "Marcus Ghiasi is a California Licensed Marriage and Family Therapist, license #158475. Bayside is based in Oakland. Sessions for San Francisco residents take place online from a private setting in California. Individual therapy that respects your identity while making room for the concerns you want to address.",
    "whyChoose": [
      "Individual sessions with Marcus Ghiasi, LMFT, California license #158475",
      "Virtual access for San Francisco residents; you must be in California for appointments",
      "A conversation about goals, preferences, and the reasons for a proposed approach",
      "45- or 60-minute private-pay sessions; rates and insurance details are below",
      "Free 15-minute consultation to discuss fit and practical questions"
    ],
    "uniqueContent": [
      "Affirming care means your identity is not treated as a problem to correct. You decide what language and context matter. Sessions may address anxiety, trauma, relationships, or other concerns, with attention to discrimination and safety when relevant rather than assuming identity explains everything.",
      "<a href=\"/services/psychodynamic\">Read about Psychodynamic Therapy at Bayside.</a> The service overview explains the approach; a consultation can help clarify whether it fits your situation."
    ],
    "uniqueWhatToExpect": [
      "A free 15-minute consultation gives you room to describe what you need, ask questions, and discuss availability. It does not commit you to ongoing sessions.",
      "The first full appointment can explore being seen without being reduced to an identity, your history, and the concerns most important to you. You can ask questions about pace, methods, and what to do if something does not feel useful. Session length is 45 or 60 minutes; check current scheduling options when booking.",
      "There is no fixed number of sessions or promised outcome. We can review what is changing, what remains difficult, and whether to adjust the approach, frequency, or plan for care."
    ],
    "uniqueFaqs": [
      {
        "q": "Does therapy here aim to change sexual orientation or gender identity?",
        "a": "No. The work supports your well-being and goals without attempting to change or suppress your sexual orientation or gender identity."
      },
      {
        "q": "Are these in-person appointments in San Francisco?",
        "a": "No. Bayside provides virtual individual therapy. You can attend from a private, suitable setting in San Francisco or elsewhere in California; your physical location matters for every appointment."
      },
      {
        "q": "How much do sessions cost, and can I use insurance?",
        "a": "Sessions are $210 for 45 minutes or $280 for 60 minutes. Bayside is a private-pay practice and does not bill insurance directly. A superbill is available for possible out-of-network reimbursement; eligibility and payment depend on your plan."
      },
      {
        "q": "How many sessions will I need?",
        "a": "There is no fixed number of sessions or promised outcome. We can review what is changing, what remains difficult, and whether to adjust the approach, frequency, or plan for care."
      }
    ],
    "contentHeading": "Being seen without being reduced to an identity"
  },
  "lgbtq-therapy-oakland": {
    "city": "Oakland",
    "state": "CA",
    "slug": "lgbtq-therapy-oakland",
    "title": "LGBTQ+ Affirming Therapy for Oakland Residents",
    "metaTitle": "LGBTQ+ Affirming Therapy in Oakland | Virtual Sessions",
    "metaDescription": "LGBTQ+ Affirming Therapy for adults in Oakland, CA. Making decisions about disclosure and boundaries. Virtual sessions with Marcus Ghiasi, LMFT. Free consultation.",
    "h1": "LGBTQ+ Affirming Therapy for Adults in Oakland, CA",
    "intro": "Deciding whom to tell, what to share, or when to wait can involve both connection and safety. Therapy can help you consider the options without treating disclosure as a requirement for authenticity. Bayside offers virtual individual therapy to adults in Oakland who are physically in California for sessions.",
    "localContent": "Marcus Ghiasi is a California Licensed Marriage and Family Therapist, license #158475. Bayside is based in Oakland and provides virtual individual sessions, rather than in-person office appointments. Individual therapy that respects your identity while making room for the concerns you want to address.",
    "whyChoose": [
      "Individual sessions with Marcus Ghiasi, LMFT, California license #158475",
      "Virtual access for Oakland residents; you must be in California for appointments",
      "A conversation about goals, preferences, and the reasons for a proposed approach",
      "45- or 60-minute private-pay sessions; rates and insurance details are below",
      "Free 15-minute consultation to discuss fit and practical questions"
    ],
    "uniqueContent": [
      "Affirming care means your identity is not treated as a problem to correct. You decide what language and context matter. Sessions may address anxiety, trauma, relationships, or other concerns, with attention to discrimination and safety when relevant rather than assuming identity explains everything.",
      "<a href=\"/services/psychodynamic\">Read about Psychodynamic Therapy at Bayside.</a> The service overview explains the approach; a consultation can help clarify whether it fits your situation."
    ],
    "uniqueWhatToExpect": [
      "A free 15-minute consultation gives you room to describe what you need, ask questions, and discuss availability. It does not commit you to ongoing sessions.",
      "The first full appointment can explore making decisions about disclosure and boundaries, your history, and the concerns most important to you. You can ask questions about pace, methods, and what to do if something does not feel useful. Session length is 45 or 60 minutes; check current scheduling options when booking.",
      "There is no fixed number of sessions or promised outcome. We can review what is changing, what remains difficult, and whether to adjust the approach, frequency, or plan for care."
    ],
    "uniqueFaqs": [
      {
        "q": "Will I be pressured to come out?",
        "a": "No. Disclosure is your decision. We can explore your wishes, relationships, practical circumstances, and safety without prescribing one path."
      },
      {
        "q": "Are these in-person appointments in Oakland?",
        "a": "No. Bayside provides virtual individual therapy. You can attend from a private, suitable setting in Oakland or elsewhere in California; your physical location matters for every appointment."
      },
      {
        "q": "How much do sessions cost, and can I use insurance?",
        "a": "Sessions are $210 for 45 minutes or $280 for 60 minutes. Bayside is a private-pay practice and does not bill insurance directly. A superbill is available for possible out-of-network reimbursement; eligibility and payment depend on your plan."
      },
      {
        "q": "How many sessions will I need?",
        "a": "There is no fixed number of sessions or promised outcome. We can review what is changing, what remains difficult, and whether to adjust the approach, frequency, or plan for care."
      }
    ],
    "contentHeading": "Making decisions about disclosure and boundaries"
  },
  "lgbtq-therapy-berkeley": {
    "city": "Berkeley",
    "state": "CA",
    "slug": "lgbtq-therapy-berkeley",
    "title": "LGBTQ+ Affirming Therapy for Berkeley Residents",
    "metaTitle": "LGBTQ+ Affirming Therapy in Berkeley | Virtual Sessions",
    "metaDescription": "LGBTQ+ Affirming Therapy for adults in Berkeley, CA. When family relationships feel conditional. Virtual sessions with Marcus Ghiasi, LMFT. Free consultation.",
    "h1": "LGBTQ+ Affirming Therapy for Adults in Berkeley, CA",
    "intro": "You may want connection and also need limits around comments, expectations, or disrespect. Sessions can help you consider what contact feels workable and how to protect your needs. Bayside offers virtual individual therapy to adults in Berkeley who are physically in California for sessions.",
    "localContent": "Marcus Ghiasi is a California Licensed Marriage and Family Therapist, license #158475. Bayside is based in Oakland. Sessions for Berkeley residents take place online from a private setting in California. Individual therapy that respects your identity while making room for the concerns you want to address.",
    "whyChoose": [
      "Individual sessions with Marcus Ghiasi, LMFT, California license #158475",
      "Virtual access for Berkeley residents; you must be in California for appointments",
      "A conversation about goals, preferences, and the reasons for a proposed approach",
      "45- or 60-minute private-pay sessions; rates and insurance details are below",
      "Free 15-minute consultation to discuss fit and practical questions"
    ],
    "uniqueContent": [
      "Affirming care means your identity is not treated as a problem to correct. You decide what language and context matter. Sessions may address anxiety, trauma, relationships, or other concerns, with attention to discrimination and safety when relevant rather than assuming identity explains everything.",
      "<a href=\"/services/psychodynamic\">Read about Psychodynamic Therapy at Bayside.</a> The service overview explains the approach; a consultation can help clarify whether it fits your situation."
    ],
    "uniqueWhatToExpect": [
      "A free 15-minute consultation gives you room to describe what you need, ask questions, and discuss availability. It does not commit you to ongoing sessions.",
      "The first full appointment can explore when family relationships feel conditional, your history, and the concerns most important to you. You can ask questions about pace, methods, and what to do if something does not feel useful. Session length is 45 or 60 minutes; check current scheduling options when booking.",
      "There is no fixed number of sessions or promised outcome. We can review what is changing, what remains difficult, and whether to adjust the approach, frequency, or plan for care."
    ],
    "uniqueFaqs": [
      {
        "q": "Can I discuss family conflict without being told to cut contact?",
        "a": "Yes. We can explore options and consequences while respecting that family ties, culture, finances, and safety can make these decisions complex."
      },
      {
        "q": "Are these in-person appointments in Berkeley?",
        "a": "No. Bayside provides virtual individual therapy. You can attend from a private, suitable setting in Berkeley or elsewhere in California; your physical location matters for every appointment."
      },
      {
        "q": "How much do sessions cost, and can I use insurance?",
        "a": "Sessions are $210 for 45 minutes or $280 for 60 minutes. Bayside is a private-pay practice and does not bill insurance directly. A superbill is available for possible out-of-network reimbursement; eligibility and payment depend on your plan."
      },
      {
        "q": "How many sessions will I need?",
        "a": "There is no fixed number of sessions or promised outcome. We can review what is changing, what remains difficult, and whether to adjust the approach, frequency, or plan for care."
      }
    ],
    "contentHeading": "When family relationships feel conditional"
  },
  "lgbtq-therapy-san-jose": {
    "city": "San Jose",
    "state": "CA",
    "slug": "lgbtq-therapy-san-jose",
    "title": "LGBTQ+ Affirming Therapy for San Jose Residents",
    "metaTitle": "LGBTQ+ Affirming Therapy in San Jose | Virtual Sessions",
    "metaDescription": "LGBTQ+ Affirming Therapy for adults in San Jose, CA. Addressing anxiety without overlooking context. Virtual sessions with Marcus Ghiasi, LMFT. Free consultation.",
    "h1": "LGBTQ+ Affirming Therapy for Adults in San Jose, CA",
    "intro": "Anxiety may involve both internal patterns and real experiences of exclusion or discrimination. We can take the context seriously while also working on responses that help you navigate daily life. Bayside offers virtual individual therapy to adults in San Jose who are physically in California for sessions.",
    "localContent": "Marcus Ghiasi is a California Licensed Marriage and Family Therapist, license #158475. Bayside is based in Oakland. Sessions for San Jose residents take place online from a private setting in California. Individual therapy that respects your identity while making room for the concerns you want to address.",
    "whyChoose": [
      "Individual sessions with Marcus Ghiasi, LMFT, California license #158475",
      "Virtual access for San Jose residents; you must be in California for appointments",
      "A conversation about goals, preferences, and the reasons for a proposed approach",
      "45- or 60-minute private-pay sessions; rates and insurance details are below",
      "Free 15-minute consultation to discuss fit and practical questions"
    ],
    "uniqueContent": [
      "Affirming care means your identity is not treated as a problem to correct. You decide what language and context matter. Sessions may address anxiety, trauma, relationships, or other concerns, with attention to discrimination and safety when relevant rather than assuming identity explains everything.",
      "<a href=\"/services/psychodynamic\">Read about Psychodynamic Therapy at Bayside.</a> The service overview explains the approach; a consultation can help clarify whether it fits your situation."
    ],
    "uniqueWhatToExpect": [
      "A free 15-minute consultation gives you room to describe what you need, ask questions, and discuss availability. It does not commit you to ongoing sessions.",
      "The first full appointment can explore addressing anxiety without overlooking context, your history, and the concerns most important to you. You can ask questions about pace, methods, and what to do if something does not feel useful. Session length is 45 or 60 minutes; check current scheduling options when booking.",
      "There is no fixed number of sessions or promised outcome. We can review what is changing, what remains difficult, and whether to adjust the approach, frequency, or plan for care."
    ],
    "uniqueFaqs": [
      {
        "q": "Will discrimination be treated as just a thinking error?",
        "a": "No. Real harms should not be reframed as irrational thoughts. We can acknowledge external conditions and consider support, boundaries, and choices within your control."
      },
      {
        "q": "Are these in-person appointments in San Jose?",
        "a": "No. Bayside provides virtual individual therapy. You can attend from a private, suitable setting in San Jose or elsewhere in California; your physical location matters for every appointment."
      },
      {
        "q": "How much do sessions cost, and can I use insurance?",
        "a": "Sessions are $210 for 45 minutes or $280 for 60 minutes. Bayside is a private-pay practice and does not bill insurance directly. A superbill is available for possible out-of-network reimbursement; eligibility and payment depend on your plan."
      },
      {
        "q": "How many sessions will I need?",
        "a": "There is no fixed number of sessions or promised outcome. We can review what is changing, what remains difficult, and whether to adjust the approach, frequency, or plan for care."
      }
    ],
    "contentHeading": "Addressing anxiety without overlooking context"
  },
  "lgbtq-therapy-palo-alto": {
    "city": "Palo Alto",
    "state": "CA",
    "slug": "lgbtq-therapy-palo-alto",
    "title": "LGBTQ+ Affirming Therapy for Palo Alto Residents",
    "metaTitle": "LGBTQ+ Affirming Therapy in Palo Alto | Virtual Sessions",
    "metaDescription": "LGBTQ+ Affirming Therapy for adults in Palo Alto, CA. Creating room for relationships on your terms. Virtual sessions with Marcus Ghiasi, LMFT. Free consultation.",
    "h1": "LGBTQ+ Affirming Therapy for Adults in Palo Alto, CA",
    "intro": "Therapy can explore intimacy, trust, conflict, and expectations without assuming a particular relationship structure or set of roles. You can bring uncertainty without needing a finished explanation. Bayside offers virtual individual therapy to adults in Palo Alto who are physically in California for sessions.",
    "localContent": "Marcus Ghiasi is a California Licensed Marriage and Family Therapist, license #158475. Bayside is based in Oakland. Sessions for Palo Alto residents take place online from a private setting in California. Individual therapy that respects your identity while making room for the concerns you want to address.",
    "whyChoose": [
      "Individual sessions with Marcus Ghiasi, LMFT, California license #158475",
      "Virtual access for Palo Alto residents; you must be in California for appointments",
      "A conversation about goals, preferences, and the reasons for a proposed approach",
      "45- or 60-minute private-pay sessions; rates and insurance details are below",
      "Free 15-minute consultation to discuss fit and practical questions"
    ],
    "uniqueContent": [
      "Affirming care means your identity is not treated as a problem to correct. You decide what language and context matter. Sessions may address anxiety, trauma, relationships, or other concerns, with attention to discrimination and safety when relevant rather than assuming identity explains everything.",
      "<a href=\"/services/psychodynamic\">Read about Psychodynamic Therapy at Bayside.</a> The service overview explains the approach; a consultation can help clarify whether it fits your situation."
    ],
    "uniqueWhatToExpect": [
      "A free 15-minute consultation gives you room to describe what you need, ask questions, and discuss availability. It does not commit you to ongoing sessions.",
      "The first full appointment can explore creating room for relationships on your terms, your history, and the concerns most important to you. You can ask questions about pace, methods, and what to do if something does not feel useful. Session length is 45 or 60 minutes; check current scheduling options when booking.",
      "There is no fixed number of sessions or promised outcome. We can review what is changing, what remains difficult, and whether to adjust the approach, frequency, or plan for care."
    ],
    "uniqueFaqs": [
      {
        "q": "Does affirming therapy mean you provide every identity-related specialty?",
        "a": "No. Affirming individual therapy is not a claim to offer every specialized assessment, letter, or medical service. Ask about your specific need so fit and any referral can be discussed."
      },
      {
        "q": "Are these in-person appointments in Palo Alto?",
        "a": "No. Bayside provides virtual individual therapy. You can attend from a private, suitable setting in Palo Alto or elsewhere in California; your physical location matters for every appointment."
      },
      {
        "q": "How much do sessions cost, and can I use insurance?",
        "a": "Sessions are $210 for 45 minutes or $280 for 60 minutes. Bayside is a private-pay practice and does not bill insurance directly. A superbill is available for possible out-of-network reimbursement; eligibility and payment depend on your plan."
      },
      {
        "q": "How many sessions will I need?",
        "a": "There is no fixed number of sessions or promised outcome. We can review what is changing, what remains difficult, and whether to adjust the approach, frequency, or plan for care."
      }
    ],
    "contentHeading": "Creating room for relationships on your terms"
  },
  "relationship-therapy-san-francisco": {
    "city": "San Francisco",
    "state": "CA",
    "slug": "relationship-therapy-san-francisco",
    "title": "Individual Therapy for Relationships for San Francisco Residents",
    "metaTitle": "Individual Relationship Therapy in San Francisco | Virtual Sessions",
    "metaDescription": "Individual Relationship Therapy for adults in San Francisco, CA. When the same argument keeps returning. Virtual sessions with Marcus Ghiasi, LMFT. Free consultation.",
    "h1": "Individual Therapy for Relationships for Adults in San Francisco, CA",
    "intro": "A familiar disagreement may involve different topics but a similar sequence of defensiveness, pursuit, or withdrawal. We can examine your part in that sequence and consider what a different response would involve. Bayside offers virtual individual therapy to adults in San Francisco who are physically in California for sessions.",
    "localContent": "Marcus Ghiasi is a California Licensed Marriage and Family Therapist, license #158475. Bayside is based in Oakland. Sessions for San Francisco residents take place online from a private setting in California. Work on your own relationship patterns, boundaries, and responses in individual sessions.",
    "whyChoose": [
      "Individual sessions with Marcus Ghiasi, LMFT, California license #158475",
      "Virtual access for San Francisco residents; you must be in California for appointments",
      "A conversation about goals, preferences, and the reasons for a proposed approach",
      "45- or 60-minute private-pay sessions; rates and insurance details are below",
      "Free 15-minute consultation to discuss fit and practical questions"
    ],
    "uniqueContent": [
      "We can explore a current relationship while also noticing patterns across relationships. The focus is your experience, choices, and safety. Individual work does not diagnose an absent partner, determine who is right, or provide the same process as joint couples therapy.",
      "<a href=\"/services/psychodynamic\">Read about Psychodynamic Therapy at Bayside.</a> The service overview explains the approach; a consultation can help clarify whether it fits your situation."
    ],
    "uniqueWhatToExpect": [
      "A free 15-minute consultation gives you room to describe what you need, ask questions, and discuss availability. It does not commit you to ongoing sessions.",
      "The first full appointment can explore when the same argument keeps returning, your history, and the concerns most important to you. You can ask questions about pace, methods, and what to do if something does not feel useful. Session length is 45 or 60 minutes; check current scheduling options when booking.",
      "There is no fixed number of sessions or promised outcome. We can review what is changing, what remains difficult, and whether to adjust the approach, frequency, or plan for care."
    ],
    "uniqueFaqs": [
      {
        "q": "Will my partner attend these sessions?",
        "a": "This service is individual therapy. If you want joint couples sessions, ask for help locating a provider who offers that service."
      },
      {
        "q": "Are these in-person appointments in San Francisco?",
        "a": "No. Bayside provides virtual individual therapy. You can attend from a private, suitable setting in San Francisco or elsewhere in California; your physical location matters for every appointment."
      },
      {
        "q": "How much do sessions cost, and can I use insurance?",
        "a": "Sessions are $210 for 45 minutes or $280 for 60 minutes. Bayside is a private-pay practice and does not bill insurance directly. A superbill is available for possible out-of-network reimbursement; eligibility and payment depend on your plan."
      },
      {
        "q": "How many sessions will I need?",
        "a": "There is no fixed number of sessions or promised outcome. We can review what is changing, what remains difficult, and whether to adjust the approach, frequency, or plan for care."
      }
    ],
    "contentHeading": "When the same argument keeps returning"
  },
  "relationship-therapy-oakland": {
    "city": "Oakland",
    "state": "CA",
    "slug": "relationship-therapy-oakland",
    "title": "Individual Therapy for Relationships for Oakland Residents",
    "metaTitle": "Individual Relationship Therapy in Oakland | Virtual Sessions",
    "metaDescription": "Individual Relationship Therapy for adults in Oakland, CA. Recognizing needs before resentment builds. Virtual sessions with Marcus Ghiasi, LMFT. Free consultation.",
    "h1": "Individual Therapy for Relationships for Adults in Oakland, CA",
    "intro": "You may say things are fine until frustration becomes difficult to contain. Therapy can help identify preferences, limits, and fears about asking for something directly. Bayside offers virtual individual therapy to adults in Oakland who are physically in California for sessions.",
    "localContent": "Marcus Ghiasi is a California Licensed Marriage and Family Therapist, license #158475. Bayside is based in Oakland and provides virtual individual sessions, rather than in-person office appointments. Work on your own relationship patterns, boundaries, and responses in individual sessions.",
    "whyChoose": [
      "Individual sessions with Marcus Ghiasi, LMFT, California license #158475",
      "Virtual access for Oakland residents; you must be in California for appointments",
      "A conversation about goals, preferences, and the reasons for a proposed approach",
      "45- or 60-minute private-pay sessions; rates and insurance details are below",
      "Free 15-minute consultation to discuss fit and practical questions"
    ],
    "uniqueContent": [
      "We can explore a current relationship while also noticing patterns across relationships. The focus is your experience, choices, and safety. Individual work does not diagnose an absent partner, determine who is right, or provide the same process as joint couples therapy.",
      "<a href=\"/services/psychodynamic\">Read about Psychodynamic Therapy at Bayside.</a> The service overview explains the approach; a consultation can help clarify whether it fits your situation."
    ],
    "uniqueWhatToExpect": [
      "A free 15-minute consultation gives you room to describe what you need, ask questions, and discuss availability. It does not commit you to ongoing sessions.",
      "The first full appointment can explore recognizing needs before resentment builds, your history, and the concerns most important to you. You can ask questions about pace, methods, and what to do if something does not feel useful. Session length is 45 or 60 minutes; check current scheduling options when booking.",
      "There is no fixed number of sessions or promised outcome. We can review what is changing, what remains difficult, and whether to adjust the approach, frequency, or plan for care."
    ],
    "uniqueFaqs": [
      {
        "q": "Can therapy help if the other person will not change?",
        "a": "We can work on your choices and boundaries without promising a change in the other person. Part of the work may be evaluating what the relationship can realistically offer."
      },
      {
        "q": "Are these in-person appointments in Oakland?",
        "a": "No. Bayside provides virtual individual therapy. You can attend from a private, suitable setting in Oakland or elsewhere in California; your physical location matters for every appointment."
      },
      {
        "q": "How much do sessions cost, and can I use insurance?",
        "a": "Sessions are $210 for 45 minutes or $280 for 60 minutes. Bayside is a private-pay practice and does not bill insurance directly. A superbill is available for possible out-of-network reimbursement; eligibility and payment depend on your plan."
      },
      {
        "q": "How many sessions will I need?",
        "a": "There is no fixed number of sessions or promised outcome. We can review what is changing, what remains difficult, and whether to adjust the approach, frequency, or plan for care."
      }
    ],
    "contentHeading": "Recognizing needs before resentment builds"
  },
  "relationship-therapy-berkeley": {
    "city": "Berkeley",
    "state": "CA",
    "slug": "relationship-therapy-berkeley",
    "title": "Individual Therapy for Relationships for Berkeley Residents",
    "metaTitle": "Individual Relationship Therapy in Berkeley | Virtual Sessions",
    "metaDescription": "Individual Relationship Therapy for adults in Berkeley, CA. When closeness brings uncertainty. Virtual sessions with Marcus Ghiasi, LMFT. Free consultation.",
    "h1": "Individual Therapy for Relationships for Adults in Berkeley, CA",
    "intro": "You may seek reassurance, pull away, or become preoccupied with signs of rejection. We can explore these responses without turning an attachment label into a fixed explanation of who you are. Bayside offers virtual individual therapy to adults in Berkeley who are physically in California for sessions.",
    "localContent": "Marcus Ghiasi is a California Licensed Marriage and Family Therapist, license #158475. Bayside is based in Oakland. Sessions for Berkeley residents take place online from a private setting in California. Work on your own relationship patterns, boundaries, and responses in individual sessions.",
    "whyChoose": [
      "Individual sessions with Marcus Ghiasi, LMFT, California license #158475",
      "Virtual access for Berkeley residents; you must be in California for appointments",
      "A conversation about goals, preferences, and the reasons for a proposed approach",
      "45- or 60-minute private-pay sessions; rates and insurance details are below",
      "Free 15-minute consultation to discuss fit and practical questions"
    ],
    "uniqueContent": [
      "We can explore a current relationship while also noticing patterns across relationships. The focus is your experience, choices, and safety. Individual work does not diagnose an absent partner, determine who is right, or provide the same process as joint couples therapy.",
      "<a href=\"/services/psychodynamic\">Read about Psychodynamic Therapy at Bayside.</a> The service overview explains the approach; a consultation can help clarify whether it fits your situation."
    ],
    "uniqueWhatToExpect": [
      "A free 15-minute consultation gives you room to describe what you need, ask questions, and discuss availability. It does not commit you to ongoing sessions.",
      "The first full appointment can explore when closeness brings uncertainty, your history, and the concerns most important to you. You can ask questions about pace, methods, and what to do if something does not feel useful. Session length is 45 or 60 minutes; check current scheduling options when booking.",
      "There is no fixed number of sessions or promised outcome. We can review what is changing, what remains difficult, and whether to adjust the approach, frequency, or plan for care."
    ],
    "uniqueFaqs": [
      {
        "q": "Will I be assigned an attachment style?",
        "a": "A framework may be useful, but it is not a complete description or diagnosis. We can explore specific experiences and patterns rather than fitting every interaction into a label."
      },
      {
        "q": "Are these in-person appointments in Berkeley?",
        "a": "No. Bayside provides virtual individual therapy. You can attend from a private, suitable setting in Berkeley or elsewhere in California; your physical location matters for every appointment."
      },
      {
        "q": "How much do sessions cost, and can I use insurance?",
        "a": "Sessions are $210 for 45 minutes or $280 for 60 minutes. Bayside is a private-pay practice and does not bill insurance directly. A superbill is available for possible out-of-network reimbursement; eligibility and payment depend on your plan."
      },
      {
        "q": "How many sessions will I need?",
        "a": "There is no fixed number of sessions or promised outcome. We can review what is changing, what remains difficult, and whether to adjust the approach, frequency, or plan for care."
      }
    ],
    "contentHeading": "When closeness brings uncertainty"
  },
  "relationship-therapy-san-jose": {
    "city": "San Jose",
    "state": "CA",
    "slug": "relationship-therapy-san-jose",
    "title": "Individual Therapy for Relationships for San Jose Residents",
    "metaTitle": "Individual Relationship Therapy in San Jose | Virtual Sessions",
    "metaDescription": "Individual Relationship Therapy for adults in San Jose, CA. Finding your footing after a breakup. Virtual sessions with Marcus Ghiasi, LMFT. Free consultation.",
    "h1": "Individual Therapy for Relationships for Adults in San Jose, CA",
    "intro": "A relationship ending can affect routines, identity, friendships, and expectations about the future. Therapy can make room for grief and help you choose next steps without rushing toward a lesson or a new relationship. Bayside offers virtual individual therapy to adults in San Jose who are physically in California for sessions.",
    "localContent": "Marcus Ghiasi is a California Licensed Marriage and Family Therapist, license #158475. Bayside is based in Oakland. Sessions for San Jose residents take place online from a private setting in California. Work on your own relationship patterns, boundaries, and responses in individual sessions.",
    "whyChoose": [
      "Individual sessions with Marcus Ghiasi, LMFT, California license #158475",
      "Virtual access for San Jose residents; you must be in California for appointments",
      "A conversation about goals, preferences, and the reasons for a proposed approach",
      "45- or 60-minute private-pay sessions; rates and insurance details are below",
      "Free 15-minute consultation to discuss fit and practical questions"
    ],
    "uniqueContent": [
      "We can explore a current relationship while also noticing patterns across relationships. The focus is your experience, choices, and safety. Individual work does not diagnose an absent partner, determine who is right, or provide the same process as joint couples therapy.",
      "<a href=\"/services/psychodynamic\">Read about Psychodynamic Therapy at Bayside.</a> The service overview explains the approach; a consultation can help clarify whether it fits your situation."
    ],
    "uniqueWhatToExpect": [
      "A free 15-minute consultation gives you room to describe what you need, ask questions, and discuss availability. It does not commit you to ongoing sessions.",
      "The first full appointment can explore finding your footing after a breakup, your history, and the concerns most important to you. You can ask questions about pace, methods, and what to do if something does not feel useful. Session length is 45 or 60 minutes; check current scheduling options when booking.",
      "There is no fixed number of sessions or promised outcome. We can review what is changing, what remains difficult, and whether to adjust the approach, frequency, or plan for care."
    ],
    "uniqueFaqs": [
      {
        "q": "Is there a right timeline for getting over a breakup?",
        "a": "No single timeline fits everyone. We can consider how you are functioning, what support you have, and what remains painful rather than judging you by a deadline."
      },
      {
        "q": "Are these in-person appointments in San Jose?",
        "a": "No. Bayside provides virtual individual therapy. You can attend from a private, suitable setting in San Jose or elsewhere in California; your physical location matters for every appointment."
      },
      {
        "q": "How much do sessions cost, and can I use insurance?",
        "a": "Sessions are $210 for 45 minutes or $280 for 60 minutes. Bayside is a private-pay practice and does not bill insurance directly. A superbill is available for possible out-of-network reimbursement; eligibility and payment depend on your plan."
      },
      {
        "q": "How many sessions will I need?",
        "a": "There is no fixed number of sessions or promised outcome. We can review what is changing, what remains difficult, and whether to adjust the approach, frequency, or plan for care."
      }
    ],
    "contentHeading": "Finding your footing after a breakup"
  },
  "relationship-therapy-palo-alto": {
    "city": "Palo Alto",
    "state": "CA",
    "slug": "relationship-therapy-palo-alto",
    "title": "Individual Therapy for Relationships for Palo Alto Residents",
    "metaTitle": "Individual Relationship Therapy in Palo Alto | Virtual Sessions",
    "metaDescription": "Individual Relationship Therapy for adults in Palo Alto, CA. Deciding what a workable boundary looks like. Virtual sessions with Marcus Ghiasi, LMFT. Free consultation.",
    "h1": "Individual Therapy for Relationships for Adults in Palo Alto, CA",
    "intro": "A boundary may involve what you will do, what contact you can sustain, or what support you need. We can explore options and consequences without pretending that a carefully worded sentence controls another person. Bayside offers virtual individual therapy to adults in Palo Alto who are physically in California for sessions.",
    "localContent": "Marcus Ghiasi is a California Licensed Marriage and Family Therapist, license #158475. Bayside is based in Oakland. Sessions for Palo Alto residents take place online from a private setting in California. Work on your own relationship patterns, boundaries, and responses in individual sessions.",
    "whyChoose": [
      "Individual sessions with Marcus Ghiasi, LMFT, California license #158475",
      "Virtual access for Palo Alto residents; you must be in California for appointments",
      "A conversation about goals, preferences, and the reasons for a proposed approach",
      "45- or 60-minute private-pay sessions; rates and insurance details are below",
      "Free 15-minute consultation to discuss fit and practical questions"
    ],
    "uniqueContent": [
      "We can explore a current relationship while also noticing patterns across relationships. The focus is your experience, choices, and safety. Individual work does not diagnose an absent partner, determine who is right, or provide the same process as joint couples therapy.",
      "<a href=\"/services/psychodynamic\">Read about Psychodynamic Therapy at Bayside.</a> The service overview explains the approach; a consultation can help clarify whether it fits your situation."
    ],
    "uniqueWhatToExpect": [
      "A free 15-minute consultation gives you room to describe what you need, ask questions, and discuss availability. It does not commit you to ongoing sessions.",
      "The first full appointment can explore deciding what a workable boundary looks like, your history, and the concerns most important to you. You can ask questions about pace, methods, and what to do if something does not feel useful. Session length is 45 or 60 minutes; check current scheduling options when booking.",
      "There is no fixed number of sessions or promised outcome. We can review what is changing, what remains difficult, and whether to adjust the approach, frequency, or plan for care."
    ],
    "uniqueFaqs": [
      {
        "q": "Is communication work enough when there is abuse?",
        "a": "No. Coercion, threats, and violence require attention to safety and appropriate specialist support. You do not have to communicate more effectively to deserve safety."
      },
      {
        "q": "Are these in-person appointments in Palo Alto?",
        "a": "No. Bayside provides virtual individual therapy. You can attend from a private, suitable setting in Palo Alto or elsewhere in California; your physical location matters for every appointment."
      },
      {
        "q": "How much do sessions cost, and can I use insurance?",
        "a": "Sessions are $210 for 45 minutes or $280 for 60 minutes. Bayside is a private-pay practice and does not bill insurance directly. A superbill is available for possible out-of-network reimbursement; eligibility and payment depend on your plan."
      },
      {
        "q": "How many sessions will I need?",
        "a": "There is no fixed number of sessions or promised outcome. We can review what is changing, what remains difficult, and whether to adjust the approach, frequency, or plan for care."
      }
    ],
    "contentHeading": "Deciding what a workable boundary looks like"
  },
  "online-therapy-san-francisco": {
    "city": "San Francisco",
    "state": "CA",
    "slug": "online-therapy-san-francisco",
    "title": "Online Therapy for San Francisco Residents",
    "metaTitle": "Online Therapy in San Francisco | Virtual Sessions",
    "metaDescription": "Online Therapy for adults in San Francisco, CA. A private space matters more than a short commute. Virtual sessions with Marcus Ghiasi, LMFT. Free consultation.",
    "h1": "Online Therapy for Adults in San Francisco, CA",
    "intro": "Consider whether you can speak freely, close a door, and prevent interruptions. Headphones can help with sound, but they do not make a shared space private. If privacy is difficult, bring that up before starting. Bayside offers virtual individual therapy to adults in San Francisco who are physically in California for sessions.",
    "localContent": "Marcus Ghiasi is a California Licensed Marriage and Family Therapist, license #158475. Bayside is based in Oakland. Sessions for San Francisco residents take place online from a private setting in California. Virtual individual therapy for adults, with attention to privacy, access, and clinical fit.",
    "whyChoose": [
      "Individual sessions with Marcus Ghiasi, LMFT, California license #158475",
      "Virtual access for San Francisco residents; you must be in California for appointments",
      "A conversation about goals, preferences, and the reasons for a proposed approach",
      "45- or 60-minute private-pay sessions; rates and insurance details are below",
      "Free 15-minute consultation to discuss fit and practical questions"
    ],
    "uniqueContent": [
      "Therapy can draw on CBT for patterns of worry and avoidance, IFS for exploring internal conflict, psychodynamic work for recurring relational themes, or EMDR when memory-focused treatment is appropriate. We discuss the reason for an approach and review how it fits your goals.",
      "<a href=\"/services\">Compare the therapy approaches offered at Bayside.</a> <a href=\"/about\">Read about Marcus and his approach.</a> You can ask about experience relevant to your concern before deciding on care."
    ],
    "uniqueWhatToExpect": [
      "A free 15-minute consultation gives you room to describe what you need, ask questions, and discuss availability. It does not commit you to ongoing sessions.",
      "The first full appointment can explore a private space matters more than a short commute, your history, and the concerns most important to you. You can ask questions about pace, methods, and what to do if something does not feel useful. Session length is 45 or 60 minutes; check current scheduling options when booking.",
      "There is no fixed number of sessions or promised outcome. We can review what is changing, what remains difficult, and whether to adjust the approach, frequency, or plan for care."
    ],
    "uniqueFaqs": [
      {
        "q": "Can I join from a café?",
        "a": "A public place is generally not suitable for confidential therapy. We should discuss a private location where you can participate safely."
      },
      {
        "q": "Are these in-person appointments in San Francisco?",
        "a": "No. Bayside provides virtual individual therapy. You can attend from a private, suitable setting in San Francisco or elsewhere in California; your physical location matters for every appointment."
      },
      {
        "q": "How much do sessions cost, and can I use insurance?",
        "a": "Sessions are $210 for 45 minutes or $280 for 60 minutes. Bayside is a private-pay practice and does not bill insurance directly. A superbill is available for possible out-of-network reimbursement; eligibility and payment depend on your plan."
      },
      {
        "q": "How many sessions will I need?",
        "a": "There is no fixed number of sessions or promised outcome. We can review what is changing, what remains difficult, and whether to adjust the approach, frequency, or plan for care."
      }
    ],
    "contentHeading": "A private space matters more than a short commute"
  },
  "online-therapy-oakland": {
    "city": "Oakland",
    "state": "CA",
    "slug": "online-therapy-oakland",
    "title": "Online Therapy for Oakland Residents",
    "metaTitle": "Online Therapy in Oakland | Virtual Sessions",
    "metaDescription": "Online Therapy for adults in Oakland, CA. Planning around changes in location. Virtual sessions with Marcus Ghiasi, LMFT. Free consultation.",
    "h1": "Online Therapy for Adults in Oakland, CA",
    "intro": "A remote appointment still takes place somewhere. Discuss travel and location changes before sessions so that licensing, continuity, and support can be considered. Bayside offers virtual individual therapy to adults in Oakland who are physically in California for sessions.",
    "localContent": "Marcus Ghiasi is a California Licensed Marriage and Family Therapist, license #158475. Bayside is based in Oakland and provides virtual individual sessions, rather than in-person office appointments. Virtual individual therapy for adults, with attention to privacy, access, and clinical fit.",
    "whyChoose": [
      "Individual sessions with Marcus Ghiasi, LMFT, California license #158475",
      "Virtual access for Oakland residents; you must be in California for appointments",
      "A conversation about goals, preferences, and the reasons for a proposed approach",
      "45- or 60-minute private-pay sessions; rates and insurance details are below",
      "Free 15-minute consultation to discuss fit and practical questions"
    ],
    "uniqueContent": [
      "Therapy can draw on CBT for patterns of worry and avoidance, IFS for exploring internal conflict, psychodynamic work for recurring relational themes, or EMDR when memory-focused treatment is appropriate. We discuss the reason for an approach and review how it fits your goals.",
      "<a href=\"/services\">Compare the therapy approaches offered at Bayside.</a> <a href=\"/about\">Read about Marcus and his approach.</a> You can ask about experience relevant to your concern before deciding on care."
    ],
    "uniqueWhatToExpect": [
      "A free 15-minute consultation gives you room to describe what you need, ask questions, and discuss availability. It does not commit you to ongoing sessions.",
      "The first full appointment can explore planning around changes in location, your history, and the concerns most important to you. You can ask questions about pace, methods, and what to do if something does not feel useful. Session length is 45 or 60 minutes; check current scheduling options when booking.",
      "There is no fixed number of sessions or promised outcome. We can review what is changing, what remains difficult, and whether to adjust the approach, frequency, or plan for care."
    ],
    "uniqueFaqs": [
      {
        "q": "Does living in California let me attend from another state?",
        "a": "Not automatically. Bayside offers sessions to clients physically in California. Discuss travel in advance rather than assuming an appointment can continue anywhere."
      },
      {
        "q": "Are these in-person appointments in Oakland?",
        "a": "No. Bayside provides virtual individual therapy. You can attend from a private, suitable setting in Oakland or elsewhere in California; your physical location matters for every appointment."
      },
      {
        "q": "How much do sessions cost, and can I use insurance?",
        "a": "Sessions are $210 for 45 minutes or $280 for 60 minutes. Bayside is a private-pay practice and does not bill insurance directly. A superbill is available for possible out-of-network reimbursement; eligibility and payment depend on your plan."
      },
      {
        "q": "How many sessions will I need?",
        "a": "There is no fixed number of sessions or promised outcome. We can review what is changing, what remains difficult, and whether to adjust the approach, frequency, or plan for care."
      }
    ],
    "contentHeading": "Planning around changes in location"
  },
  "online-therapy-berkeley": {
    "city": "Berkeley",
    "state": "CA",
    "slug": "online-therapy-berkeley",
    "title": "Online Therapy for Berkeley Residents",
    "metaTitle": "Online Therapy in Berkeley | Virtual Sessions",
    "metaDescription": "Online Therapy for adults in Berkeley, CA. Keeping the appointment separate from work. Virtual sessions with Marcus Ghiasi, LMFT. Free consultation.",
    "h1": "Online Therapy for Adults in Berkeley, CA",
    "intro": "Online access can make it tempting to multitask. Therapy needs your attention, a suitable setting, and time that is not also allocated to meetings or caregiving. Consider what would help you be present. Bayside offers virtual individual therapy to adults in Berkeley who are physically in California for sessions.",
    "localContent": "Marcus Ghiasi is a California Licensed Marriage and Family Therapist, license #158475. Bayside is based in Oakland. Sessions for Berkeley residents take place online from a private setting in California. Virtual individual therapy for adults, with attention to privacy, access, and clinical fit.",
    "whyChoose": [
      "Individual sessions with Marcus Ghiasi, LMFT, California license #158475",
      "Virtual access for Berkeley residents; you must be in California for appointments",
      "A conversation about goals, preferences, and the reasons for a proposed approach",
      "45- or 60-minute private-pay sessions; rates and insurance details are below",
      "Free 15-minute consultation to discuss fit and practical questions"
    ],
    "uniqueContent": [
      "Therapy can draw on CBT for patterns of worry and avoidance, IFS for exploring internal conflict, psychodynamic work for recurring relational themes, or EMDR when memory-focused treatment is appropriate. We discuss the reason for an approach and review how it fits your goals.",
      "<a href=\"/services\">Compare the therapy approaches offered at Bayside.</a> <a href=\"/about\">Read about Marcus and his approach.</a> You can ask about experience relevant to your concern before deciding on care."
    ],
    "uniqueWhatToExpect": [
      "A free 15-minute consultation gives you room to describe what you need, ask questions, and discuss availability. It does not commit you to ongoing sessions.",
      "The first full appointment can explore keeping the appointment separate from work, your history, and the concerns most important to you. You can ask questions about pace, methods, and what to do if something does not feel useful. Session length is 45 or 60 minutes; check current scheduling options when booking.",
      "There is no fixed number of sessions or promised outcome. We can review what is changing, what remains difficult, and whether to adjust the approach, frequency, or plan for care."
    ],
    "uniqueFaqs": [
      {
        "q": "Can I work on emails during a session?",
        "a": "A session is time for your care. If competing demands make participation difficult, discuss scheduling or another arrangement rather than trying to divide attention."
      },
      {
        "q": "Are these in-person appointments in Berkeley?",
        "a": "No. Bayside provides virtual individual therapy. You can attend from a private, suitable setting in Berkeley or elsewhere in California; your physical location matters for every appointment."
      },
      {
        "q": "How much do sessions cost, and can I use insurance?",
        "a": "Sessions are $210 for 45 minutes or $280 for 60 minutes. Bayside is a private-pay practice and does not bill insurance directly. A superbill is available for possible out-of-network reimbursement; eligibility and payment depend on your plan."
      },
      {
        "q": "How many sessions will I need?",
        "a": "There is no fixed number of sessions or promised outcome. We can review what is changing, what remains difficult, and whether to adjust the approach, frequency, or plan for care."
      }
    ],
    "contentHeading": "Keeping the appointment separate from work"
  },
  "online-therapy-san-jose": {
    "city": "San Jose",
    "state": "CA",
    "slug": "online-therapy-san-jose",
    "title": "Online Therapy for San Jose Residents",
    "metaTitle": "Online Therapy in San Jose | Virtual Sessions",
    "metaDescription": "Online Therapy for adults in San Jose, CA. What happens if the connection drops. Virtual sessions with Marcus Ghiasi, LMFT. Free consultation.",
    "h1": "Online Therapy for Adults in San Jose, CA",
    "intro": "Before ongoing sessions, it is useful to agree on how to reconnect and what to do if video is unavailable. A charged device, stable connection, and a reachable contact number can make interruptions easier to manage. Bayside offers virtual individual therapy to adults in San Jose who are physically in California for sessions.",
    "localContent": "Marcus Ghiasi is a California Licensed Marriage and Family Therapist, license #158475. Bayside is based in Oakland. Sessions for San Jose residents take place online from a private setting in California. Virtual individual therapy for adults, with attention to privacy, access, and clinical fit.",
    "whyChoose": [
      "Individual sessions with Marcus Ghiasi, LMFT, California license #158475",
      "Virtual access for San Jose residents; you must be in California for appointments",
      "A conversation about goals, preferences, and the reasons for a proposed approach",
      "45- or 60-minute private-pay sessions; rates and insurance details are below",
      "Free 15-minute consultation to discuss fit and practical questions"
    ],
    "uniqueContent": [
      "Therapy can draw on CBT for patterns of worry and avoidance, IFS for exploring internal conflict, psychodynamic work for recurring relational themes, or EMDR when memory-focused treatment is appropriate. We discuss the reason for an approach and review how it fits your goals.",
      "<a href=\"/services\">Compare the therapy approaches offered at Bayside.</a> <a href=\"/about\">Read about Marcus and his approach.</a> You can ask about experience relevant to your concern before deciding on care."
    ],
    "uniqueWhatToExpect": [
      "A free 15-minute consultation gives you room to describe what you need, ask questions, and discuss availability. It does not commit you to ongoing sessions.",
      "The first full appointment can explore what happens if the connection drops, your history, and the concerns most important to you. You can ask questions about pace, methods, and what to do if something does not feel useful. Session length is 45 or 60 minutes; check current scheduling options when booking.",
      "There is no fixed number of sessions or promised outcome. We can review what is changing, what remains difficult, and whether to adjust the approach, frequency, or plan for care."
    ],
    "uniqueFaqs": [
      {
        "q": "Do technical problems mean the session must continue by any means?",
        "a": "No. We should consider privacy, clinical needs, and the available options. The plan for interruptions is something to discuss in advance."
      },
      {
        "q": "Are these in-person appointments in San Jose?",
        "a": "No. Bayside provides virtual individual therapy. You can attend from a private, suitable setting in San Jose or elsewhere in California; your physical location matters for every appointment."
      },
      {
        "q": "How much do sessions cost, and can I use insurance?",
        "a": "Sessions are $210 for 45 minutes or $280 for 60 minutes. Bayside is a private-pay practice and does not bill insurance directly. A superbill is available for possible out-of-network reimbursement; eligibility and payment depend on your plan."
      },
      {
        "q": "How many sessions will I need?",
        "a": "There is no fixed number of sessions or promised outcome. We can review what is changing, what remains difficult, and whether to adjust the approach, frequency, or plan for care."
      }
    ],
    "contentHeading": "What happens if the connection drops"
  },
  "online-therapy-palo-alto": {
    "city": "Palo Alto",
    "state": "CA",
    "slug": "online-therapy-palo-alto",
    "title": "Online Therapy for Palo Alto Residents",
    "metaTitle": "Online Therapy in Palo Alto | Virtual Sessions",
    "metaDescription": "Online Therapy for adults in Palo Alto, CA. Choosing the format rather than assuming it fits. Virtual sessions with Marcus Ghiasi, LMFT. Free consultation.",
    "h1": "Online Therapy for Adults in Palo Alto, CA",
    "intro": "Virtual care can reduce travel but may not be the right setting for every need. We can discuss privacy, comfort with video, and whether additional or in-person support is more appropriate. Bayside offers virtual individual therapy to adults in Palo Alto who are physically in California for sessions.",
    "localContent": "Marcus Ghiasi is a California Licensed Marriage and Family Therapist, license #158475. Bayside is based in Oakland. Sessions for Palo Alto residents take place online from a private setting in California. Virtual individual therapy for adults, with attention to privacy, access, and clinical fit.",
    "whyChoose": [
      "Individual sessions with Marcus Ghiasi, LMFT, California license #158475",
      "Virtual access for Palo Alto residents; you must be in California for appointments",
      "A conversation about goals, preferences, and the reasons for a proposed approach",
      "45- or 60-minute private-pay sessions; rates and insurance details are below",
      "Free 15-minute consultation to discuss fit and practical questions"
    ],
    "uniqueContent": [
      "Therapy can draw on CBT for patterns of worry and avoidance, IFS for exploring internal conflict, psychodynamic work for recurring relational themes, or EMDR when memory-focused treatment is appropriate. We discuss the reason for an approach and review how it fits your goals.",
      "<a href=\"/services\">Compare the therapy approaches offered at Bayside.</a> <a href=\"/about\">Read about Marcus and his approach.</a> You can ask about experience relevant to your concern before deciding on care."
    ],
    "uniqueWhatToExpect": [
      "A free 15-minute consultation gives you room to describe what you need, ask questions, and discuss availability. It does not commit you to ongoing sessions.",
      "The first full appointment can explore choosing the format rather than assuming it fits, your history, and the concerns most important to you. You can ask questions about pace, methods, and what to do if something does not feel useful. Session length is 45 or 60 minutes; check current scheduling options when booking.",
      "There is no fixed number of sessions or promised outcome. We can review what is changing, what remains difficult, and whether to adjust the approach, frequency, or plan for care."
    ],
    "uniqueFaqs": [
      {
        "q": "Is online care the best option for everyone?",
        "a": "No. Suitability depends on the person, condition, environment, and support needed. A consultation is a place to ask about those limits."
      },
      {
        "q": "Are these in-person appointments in Palo Alto?",
        "a": "No. Bayside provides virtual individual therapy. You can attend from a private, suitable setting in Palo Alto or elsewhere in California; your physical location matters for every appointment."
      },
      {
        "q": "How much do sessions cost, and can I use insurance?",
        "a": "Sessions are $210 for 45 minutes or $280 for 60 minutes. Bayside is a private-pay practice and does not bill insurance directly. A superbill is available for possible out-of-network reimbursement; eligibility and payment depend on your plan."
      },
      {
        "q": "How many sessions will I need?",
        "a": "There is no fixed number of sessions or promised outcome. We can review what is changing, what remains difficult, and whether to adjust the approach, frequency, or plan for care."
      }
    ],
    "contentHeading": "Choosing the format rather than assuming it fits"
  },
  "online-therapy-fremont": {
    "city": "Fremont",
    "state": "CA",
    "slug": "online-therapy-fremont",
    "title": "Online Therapy for Fremont Residents",
    "metaTitle": "Online Therapy in Fremont | Virtual Sessions",
    "metaDescription": "Online Therapy for adults in Fremont, CA. Arriving with a few minutes to settle. Virtual sessions with Marcus Ghiasi, LMFT. Free consultation.",
    "h1": "Online Therapy for Adults in Fremont, CA",
    "intro": "Moving straight from a stressful task into a video call may make it harder to notice what you need. A brief pause before and after the appointment can help make it a distinct part of the day. Bayside offers virtual individual therapy to adults in Fremont who are physically in California for sessions.",
    "localContent": "Marcus Ghiasi is a California Licensed Marriage and Family Therapist, license #158475. Bayside is based in Oakland. Sessions for Fremont residents take place online from a private setting in California. Virtual individual therapy for adults, with attention to privacy, access, and clinical fit.",
    "whyChoose": [
      "Individual sessions with Marcus Ghiasi, LMFT, California license #158475",
      "Virtual access for Fremont residents; you must be in California for appointments",
      "A conversation about goals, preferences, and the reasons for a proposed approach",
      "45- or 60-minute private-pay sessions; rates and insurance details are below",
      "Free 15-minute consultation to discuss fit and practical questions"
    ],
    "uniqueContent": [
      "Therapy can draw on CBT for patterns of worry and avoidance, IFS for exploring internal conflict, psychodynamic work for recurring relational themes, or EMDR when memory-focused treatment is appropriate. We discuss the reason for an approach and review how it fits your goals.",
      "<a href=\"/services\">Compare the therapy approaches offered at Bayside.</a> <a href=\"/about\">Read about Marcus and his approach.</a> You can ask about experience relevant to your concern before deciding on care."
    ],
    "uniqueWhatToExpect": [
      "A free 15-minute consultation gives you room to describe what you need, ask questions, and discuss availability. It does not commit you to ongoing sessions.",
      "The first full appointment can explore arriving with a few minutes to settle, your history, and the concerns most important to you. You can ask questions about pace, methods, and what to do if something does not feel useful. Session length is 45 or 60 minutes; check current scheduling options when booking.",
      "There is no fixed number of sessions or promised outcome. We can review what is changing, what remains difficult, and whether to adjust the approach, frequency, or plan for care."
    ],
    "uniqueFaqs": [
      {
        "q": "Do I need special equipment?",
        "a": "A suitable device, reliable connection, and a private setting are the practical starting points. Ask about the platform and access instructions before the first appointment."
      },
      {
        "q": "Are these in-person appointments in Fremont?",
        "a": "No. Bayside provides virtual individual therapy. You can attend from a private, suitable setting in Fremont or elsewhere in California; your physical location matters for every appointment."
      },
      {
        "q": "How much do sessions cost, and can I use insurance?",
        "a": "Sessions are $210 for 45 minutes or $280 for 60 minutes. Bayside is a private-pay practice and does not bill insurance directly. A superbill is available for possible out-of-network reimbursement; eligibility and payment depend on your plan."
      },
      {
        "q": "How many sessions will I need?",
        "a": "There is no fixed number of sessions or promised outcome. We can review what is changing, what remains difficult, and whether to adjust the approach, frequency, or plan for care."
      }
    ],
    "contentHeading": "Arriving with a few minutes to settle"
  },
  "online-therapy-hayward": {
    "city": "Hayward",
    "state": "CA",
    "slug": "online-therapy-hayward",
    "title": "Online Therapy for Hayward Residents",
    "metaTitle": "Online Therapy in Hayward | Virtual Sessions",
    "metaDescription": "Online Therapy for adults in Hayward, CA. Being clear about who receives care. Virtual sessions with Marcus Ghiasi, LMFT. Free consultation.",
    "h1": "Online Therapy for Adults in Hayward, CA",
    "intro": "Bayside’s listed services are individual therapy for adults. A partner, parent, or friend should not join unexpectedly; participation and privacy need to be discussed beforehand. Bayside offers virtual individual therapy to adults in Hayward who are physically in California for sessions.",
    "localContent": "Marcus Ghiasi is a California Licensed Marriage and Family Therapist, license #158475. Bayside is based in Oakland. Sessions for Hayward residents take place online from a private setting in California. Virtual individual therapy for adults, with attention to privacy, access, and clinical fit.",
    "whyChoose": [
      "Individual sessions with Marcus Ghiasi, LMFT, California license #158475",
      "Virtual access for Hayward residents; you must be in California for appointments",
      "A conversation about goals, preferences, and the reasons for a proposed approach",
      "45- or 60-minute private-pay sessions; rates and insurance details are below",
      "Free 15-minute consultation to discuss fit and practical questions"
    ],
    "uniqueContent": [
      "Therapy can draw on CBT for patterns of worry and avoidance, IFS for exploring internal conflict, psychodynamic work for recurring relational themes, or EMDR when memory-focused treatment is appropriate. We discuss the reason for an approach and review how it fits your goals.",
      "<a href=\"/services\">Compare the therapy approaches offered at Bayside.</a> <a href=\"/about\">Read about Marcus and his approach.</a> You can ask about experience relevant to your concern before deciding on care."
    ],
    "uniqueWhatToExpect": [
      "A free 15-minute consultation gives you room to describe what you need, ask questions, and discuss availability. It does not commit you to ongoing sessions.",
      "The first full appointment can explore being clear about who receives care, your history, and the concerns most important to you. You can ask questions about pace, methods, and what to do if something does not feel useful. Session length is 45 or 60 minutes; check current scheduling options when booking.",
      "There is no fixed number of sessions or promised outcome. We can review what is changing, what remains difficult, and whether to adjust the approach, frequency, or plan for care."
    ],
    "uniqueFaqs": [
      {
        "q": "Can my partner sit in on my individual appointment?",
        "a": "Please discuss any additional person’s involvement in advance. Individual therapy is different from a joint couples session."
      },
      {
        "q": "Are these in-person appointments in Hayward?",
        "a": "No. Bayside provides virtual individual therapy. You can attend from a private, suitable setting in Hayward or elsewhere in California; your physical location matters for every appointment."
      },
      {
        "q": "How much do sessions cost, and can I use insurance?",
        "a": "Sessions are $210 for 45 minutes or $280 for 60 minutes. Bayside is a private-pay practice and does not bill insurance directly. A superbill is available for possible out-of-network reimbursement; eligibility and payment depend on your plan."
      },
      {
        "q": "How many sessions will I need?",
        "a": "There is no fixed number of sessions or promised outcome. We can review what is changing, what remains difficult, and whether to adjust the approach, frequency, or plan for care."
      }
    ],
    "contentHeading": "Being clear about who receives care"
  },
  "online-therapy-walnut-creek": {
    "city": "Walnut Creek",
    "state": "CA",
    "slug": "online-therapy-walnut-creek",
    "title": "Online Therapy for Walnut Creek Residents",
    "metaTitle": "Online Therapy in Walnut Creek | Virtual Sessions",
    "metaDescription": "Online Therapy for adults in Walnut Creek, CA. Knowing what virtual access does not provide. Virtual sessions with Marcus Ghiasi, LMFT. Free consultation.",
    "h1": "Online Therapy for Adults in Walnut Creek, CA",
    "intro": "A scheduled video appointment is not continuous monitoring or an emergency response service. Discuss the boundaries of between-session contact and what support is appropriate outside appointments. Bayside offers virtual individual therapy to adults in Walnut Creek who are physically in California for sessions.",
    "localContent": "Marcus Ghiasi is a California Licensed Marriage and Family Therapist, license #158475. Bayside is based in Oakland. Sessions for Walnut Creek residents take place online from a private setting in California. Virtual individual therapy for adults, with attention to privacy, access, and clinical fit.",
    "whyChoose": [
      "Individual sessions with Marcus Ghiasi, LMFT, California license #158475",
      "Virtual access for Walnut Creek residents; you must be in California for appointments",
      "A conversation about goals, preferences, and the reasons for a proposed approach",
      "45- or 60-minute private-pay sessions; rates and insurance details are below",
      "Free 15-minute consultation to discuss fit and practical questions"
    ],
    "uniqueContent": [
      "Therapy can draw on CBT for patterns of worry and avoidance, IFS for exploring internal conflict, psychodynamic work for recurring relational themes, or EMDR when memory-focused treatment is appropriate. We discuss the reason for an approach and review how it fits your goals.",
      "<a href=\"/services\">Compare the therapy approaches offered at Bayside.</a> <a href=\"/about\">Read about Marcus and his approach.</a> You can ask about experience relevant to your concern before deciding on care."
    ],
    "uniqueWhatToExpect": [
      "A free 15-minute consultation gives you room to describe what you need, ask questions, and discuss availability. It does not commit you to ongoing sessions.",
      "The first full appointment can explore knowing what virtual access does not provide, your history, and the concerns most important to you. You can ask questions about pace, methods, and what to do if something does not feel useful. Session length is 45 or 60 minutes; check current scheduling options when booking.",
      "There is no fixed number of sessions or promised outcome. We can review what is changing, what remains difficult, and whether to adjust the approach, frequency, or plan for care."
    ],
    "uniqueFaqs": [
      {
        "q": "Is routine booking or phone contact suitable for urgent help?",
        "a": "Do not wait for a routine appointment or callback for urgent or emergency care. The crisis-resources page explains where to seek immediate support."
      },
      {
        "q": "Are these in-person appointments in Walnut Creek?",
        "a": "No. Bayside provides virtual individual therapy. You can attend from a private, suitable setting in Walnut Creek or elsewhere in California; your physical location matters for every appointment."
      },
      {
        "q": "How much do sessions cost, and can I use insurance?",
        "a": "Sessions are $210 for 45 minutes or $280 for 60 minutes. Bayside is a private-pay practice and does not bill insurance directly. A superbill is available for possible out-of-network reimbursement; eligibility and payment depend on your plan."
      },
      {
        "q": "How many sessions will I need?",
        "a": "There is no fixed number of sessions or promised outcome. We can review what is changing, what remains difficult, and whether to adjust the approach, frequency, or plan for care."
      }
    ],
    "contentHeading": "Knowing what virtual access does not provide"
  },
  "online-therapy-san-mateo": {
    "city": "San Mateo",
    "state": "CA",
    "slug": "online-therapy-san-mateo",
    "title": "Online Therapy for San Mateo Residents",
    "metaTitle": "Online Therapy in San Mateo | Virtual Sessions",
    "metaDescription": "Online Therapy for adults in San Mateo, CA. Paying attention to shared devices. Virtual sessions with Marcus Ghiasi, LMFT. Free consultation.",
    "h1": "Online Therapy for Adults in San Mateo, CA",
    "intro": "A shared computer, calendar, or email account can reveal that an appointment exists. Consider the privacy of reminders, browser access, and the device you use, in addition to the room itself. Bayside offers virtual individual therapy to adults in San Mateo who are physically in California for sessions.",
    "localContent": "Marcus Ghiasi is a California Licensed Marriage and Family Therapist, license #158475. Bayside is based in Oakland. Sessions for San Mateo residents take place online from a private setting in California. Virtual individual therapy for adults, with attention to privacy, access, and clinical fit.",
    "whyChoose": [
      "Individual sessions with Marcus Ghiasi, LMFT, California license #158475",
      "Virtual access for San Mateo residents; you must be in California for appointments",
      "A conversation about goals, preferences, and the reasons for a proposed approach",
      "45- or 60-minute private-pay sessions; rates and insurance details are below",
      "Free 15-minute consultation to discuss fit and practical questions"
    ],
    "uniqueContent": [
      "Therapy can draw on CBT for patterns of worry and avoidance, IFS for exploring internal conflict, psychodynamic work for recurring relational themes, or EMDR when memory-focused treatment is appropriate. We discuss the reason for an approach and review how it fits your goals.",
      "<a href=\"/services\">Compare the therapy approaches offered at Bayside.</a> <a href=\"/about\">Read about Marcus and his approach.</a> You can ask about experience relevant to your concern before deciding on care."
    ],
    "uniqueWhatToExpect": [
      "A free 15-minute consultation gives you room to describe what you need, ask questions, and discuss availability. It does not commit you to ongoing sessions.",
      "The first full appointment can explore paying attention to shared devices, your history, and the concerns most important to you. You can ask questions about pace, methods, and what to do if something does not feel useful. Session length is 45 or 60 minutes; check current scheduling options when booking.",
      "There is no fixed number of sessions or promised outcome. We can review what is changing, what remains difficult, and whether to adjust the approach, frequency, or plan for care."
    ],
    "uniqueFaqs": [
      {
        "q": "Can we discuss privacy concerns before I book?",
        "a": "Yes. You can ask about practical arrangements and limits before deciding whether virtual sessions are workable for you."
      },
      {
        "q": "Are these in-person appointments in San Mateo?",
        "a": "No. Bayside provides virtual individual therapy. You can attend from a private, suitable setting in San Mateo or elsewhere in California; your physical location matters for every appointment."
      },
      {
        "q": "How much do sessions cost, and can I use insurance?",
        "a": "Sessions are $210 for 45 minutes or $280 for 60 minutes. Bayside is a private-pay practice and does not bill insurance directly. A superbill is available for possible out-of-network reimbursement; eligibility and payment depend on your plan."
      },
      {
        "q": "How many sessions will I need?",
        "a": "There is no fixed number of sessions or promised outcome. We can review what is changing, what remains difficult, and whether to adjust the approach, frequency, or plan for care."
      }
    ],
    "contentHeading": "Paying attention to shared devices"
  },
  "online-therapy-redwood-city": {
    "city": "Redwood City",
    "state": "CA",
    "slug": "online-therapy-redwood-city",
    "title": "Online Therapy for Redwood City Residents",
    "metaTitle": "Online Therapy in Redwood City | Virtual Sessions",
    "metaDescription": "Online Therapy for adults in Redwood City, CA. Making room for difficult material online. Virtual sessions with Marcus Ghiasi, LMFT. Free consultation.",
    "h1": "Online Therapy for Adults in Redwood City, CA",
    "intro": "Some conversations need a little time afterward before returning to demands. We can consider your setting, support, and the intensity of the work when choosing how to use a session. Bayside offers virtual individual therapy to adults in Redwood City who are physically in California for sessions.",
    "localContent": "Marcus Ghiasi is a California Licensed Marriage and Family Therapist, license #158475. Bayside is based in Oakland. Sessions for Redwood City residents take place online from a private setting in California. Virtual individual therapy for adults, with attention to privacy, access, and clinical fit.",
    "whyChoose": [
      "Individual sessions with Marcus Ghiasi, LMFT, California license #158475",
      "Virtual access for Redwood City residents; you must be in California for appointments",
      "A conversation about goals, preferences, and the reasons for a proposed approach",
      "45- or 60-minute private-pay sessions; rates and insurance details are below",
      "Free 15-minute consultation to discuss fit and practical questions"
    ],
    "uniqueContent": [
      "Therapy can draw on CBT for patterns of worry and avoidance, IFS for exploring internal conflict, psychodynamic work for recurring relational themes, or EMDR when memory-focused treatment is appropriate. We discuss the reason for an approach and review how it fits your goals.",
      "<a href=\"/services\">Compare the therapy approaches offered at Bayside.</a> <a href=\"/about\">Read about Marcus and his approach.</a> You can ask about experience relevant to your concern before deciding on care."
    ],
    "uniqueWhatToExpect": [
      "A free 15-minute consultation gives you room to describe what you need, ask questions, and discuss availability. It does not commit you to ongoing sessions.",
      "The first full appointment can explore making room for difficult material online, your history, and the concerns most important to you. You can ask questions about pace, methods, and what to do if something does not feel useful. Session length is 45 or 60 minutes; check current scheduling options when booking.",
      "There is no fixed number of sessions or promised outcome. We can review what is changing, what remains difficult, and whether to adjust the approach, frequency, or plan for care."
    ],
    "uniqueFaqs": [
      {
        "q": "Will trauma processing begin during the consultation?",
        "a": "No. A brief consultation is for fit and practical questions. Assessment and preparation are needed before deciding on trauma-focused work."
      },
      {
        "q": "Are these in-person appointments in Redwood City?",
        "a": "No. Bayside provides virtual individual therapy. You can attend from a private, suitable setting in Redwood City or elsewhere in California; your physical location matters for every appointment."
      },
      {
        "q": "How much do sessions cost, and can I use insurance?",
        "a": "Sessions are $210 for 45 minutes or $280 for 60 minutes. Bayside is a private-pay practice and does not bill insurance directly. A superbill is available for possible out-of-network reimbursement; eligibility and payment depend on your plan."
      },
      {
        "q": "How many sessions will I need?",
        "a": "There is no fixed number of sessions or promised outcome. We can review what is changing, what remains difficult, and whether to adjust the approach, frequency, or plan for care."
      }
    ],
    "contentHeading": "Making room for difficult material online"
  },
  "online-therapy-mountain-view": {
    "city": "Mountain View",
    "state": "CA",
    "slug": "online-therapy-mountain-view",
    "title": "Online Therapy for Mountain View Residents",
    "metaTitle": "Online Therapy in Mountain View | Virtual Sessions",
    "metaDescription": "Online Therapy for adults in Mountain View, CA. Planning around caregiving interruptions. Virtual sessions with Marcus Ghiasi, LMFT. Free consultation.",
    "h1": "Online Therapy for Adults in Mountain View, CA",
    "intro": "Being at home does not mean you are free from responsibilities. Consider whether someone else can manage interruptions during the appointment, and discuss limits honestly rather than assuming you must make it work. Bayside offers virtual individual therapy to adults in Mountain View who are physically in California for sessions.",
    "localContent": "Marcus Ghiasi is a California Licensed Marriage and Family Therapist, license #158475. Bayside is based in Oakland. Sessions for Mountain View residents take place online from a private setting in California. Virtual individual therapy for adults, with attention to privacy, access, and clinical fit.",
    "whyChoose": [
      "Individual sessions with Marcus Ghiasi, LMFT, California license #158475",
      "Virtual access for Mountain View residents; you must be in California for appointments",
      "A conversation about goals, preferences, and the reasons for a proposed approach",
      "45- or 60-minute private-pay sessions; rates and insurance details are below",
      "Free 15-minute consultation to discuss fit and practical questions"
    ],
    "uniqueContent": [
      "Therapy can draw on CBT for patterns of worry and avoidance, IFS for exploring internal conflict, psychodynamic work for recurring relational themes, or EMDR when memory-focused treatment is appropriate. We discuss the reason for an approach and review how it fits your goals.",
      "<a href=\"/services\">Compare the therapy approaches offered at Bayside.</a> <a href=\"/about\">Read about Marcus and his approach.</a> You can ask about experience relevant to your concern before deciding on care."
    ],
    "uniqueWhatToExpect": [
      "A free 15-minute consultation gives you room to describe what you need, ask questions, and discuss availability. It does not commit you to ongoing sessions.",
      "The first full appointment can explore planning around caregiving interruptions, your history, and the concerns most important to you. You can ask questions about pace, methods, and what to do if something does not feel useful. Session length is 45 or 60 minutes; check current scheduling options when booking.",
      "There is no fixed number of sessions or promised outcome. We can review what is changing, what remains difficult, and whether to adjust the approach, frequency, or plan for care."
    ],
    "uniqueFaqs": [
      {
        "q": "Can I care for a child during the session?",
        "a": "The appointment needs conditions that support privacy and participation. Discuss caregiving constraints before scheduling so the format and timing can be assessed."
      },
      {
        "q": "Are these in-person appointments in Mountain View?",
        "a": "No. Bayside provides virtual individual therapy. You can attend from a private, suitable setting in Mountain View or elsewhere in California; your physical location matters for every appointment."
      },
      {
        "q": "How much do sessions cost, and can I use insurance?",
        "a": "Sessions are $210 for 45 minutes or $280 for 60 minutes. Bayside is a private-pay practice and does not bill insurance directly. A superbill is available for possible out-of-network reimbursement; eligibility and payment depend on your plan."
      },
      {
        "q": "How many sessions will I need?",
        "a": "There is no fixed number of sessions or promised outcome. We can review what is changing, what remains difficult, and whether to adjust the approach, frequency, or plan for care."
      }
    ],
    "contentHeading": "Planning around caregiving interruptions"
  },
  "online-therapy-sunnyvale": {
    "city": "Sunnyvale",
    "state": "CA",
    "slug": "online-therapy-sunnyvale",
    "title": "Online Therapy for Sunnyvale Residents",
    "metaTitle": "Online Therapy in Sunnyvale | Virtual Sessions",
    "metaDescription": "Online Therapy for adults in Sunnyvale, CA. Discussing accessibility needs early. Virtual sessions with Marcus Ghiasi, LMFT. Free consultation.",
    "h1": "Online Therapy for Adults in Sunnyvale, CA",
    "intro": "Video can be comfortable for some people and difficult for others. You can ask about communication needs, technology, or other accommodations before choosing care; availability should be confirmed rather than assumed. Bayside offers virtual individual therapy to adults in Sunnyvale who are physically in California for sessions.",
    "localContent": "Marcus Ghiasi is a California Licensed Marriage and Family Therapist, license #158475. Bayside is based in Oakland. Sessions for Sunnyvale residents take place online from a private setting in California. Virtual individual therapy for adults, with attention to privacy, access, and clinical fit.",
    "whyChoose": [
      "Individual sessions with Marcus Ghiasi, LMFT, California license #158475",
      "Virtual access for Sunnyvale residents; you must be in California for appointments",
      "A conversation about goals, preferences, and the reasons for a proposed approach",
      "45- or 60-minute private-pay sessions; rates and insurance details are below",
      "Free 15-minute consultation to discuss fit and practical questions"
    ],
    "uniqueContent": [
      "Therapy can draw on CBT for patterns of worry and avoidance, IFS for exploring internal conflict, psychodynamic work for recurring relational themes, or EMDR when memory-focused treatment is appropriate. We discuss the reason for an approach and review how it fits your goals.",
      "<a href=\"/services\">Compare the therapy approaches offered at Bayside.</a> <a href=\"/about\">Read about Marcus and his approach.</a> You can ask about experience relevant to your concern before deciding on care."
    ],
    "uniqueWhatToExpect": [
      "A free 15-minute consultation gives you room to describe what you need, ask questions, and discuss availability. It does not commit you to ongoing sessions.",
      "The first full appointment can explore discussing accessibility needs early, your history, and the concerns most important to you. You can ask questions about pace, methods, and what to do if something does not feel useful. Session length is 45 or 60 minutes; check current scheduling options when booking.",
      "There is no fixed number of sessions or promised outcome. We can review what is changing, what remains difficult, and whether to adjust the approach, frequency, or plan for care."
    ],
    "uniqueFaqs": [
      {
        "q": "Can I ask about an accommodation before becoming a client?",
        "a": "Yes. Describe the practical need without feeling required to share a full clinical history in an inquiry. The practice can discuss what is available and what may require another provider."
      },
      {
        "q": "Are these in-person appointments in Sunnyvale?",
        "a": "No. Bayside provides virtual individual therapy. You can attend from a private, suitable setting in Sunnyvale or elsewhere in California; your physical location matters for every appointment."
      },
      {
        "q": "How much do sessions cost, and can I use insurance?",
        "a": "Sessions are $210 for 45 minutes or $280 for 60 minutes. Bayside is a private-pay practice and does not bill insurance directly. A superbill is available for possible out-of-network reimbursement; eligibility and payment depend on your plan."
      },
      {
        "q": "How many sessions will I need?",
        "a": "There is no fixed number of sessions or promised outcome. We can review what is changing, what remains difficult, and whether to adjust the approach, frequency, or plan for care."
      }
    ],
    "contentHeading": "Discussing accessibility needs early"
  },
  "online-therapy-daly-city": {
    "city": "Daly City",
    "state": "CA",
    "slug": "online-therapy-daly-city",
    "title": "Online Therapy for Daly City Residents",
    "metaTitle": "Online Therapy in Daly City | Virtual Sessions",
    "metaDescription": "Online Therapy for adults in Daly City, CA. Keeping location and support information current. Virtual sessions with Marcus Ghiasi, LMFT. Free consultation.",
    "h1": "Online Therapy for Adults in Daly City, CA",
    "intro": "Remote care benefits from a clear plan for where you are and how you can be reached. Discuss changes in your contact details or circumstances so the plan remains workable. Bayside offers virtual individual therapy to adults in Daly City who are physically in California for sessions.",
    "localContent": "Marcus Ghiasi is a California Licensed Marriage and Family Therapist, license #158475. Bayside is based in Oakland. Sessions for Daly City residents take place online from a private setting in California. Virtual individual therapy for adults, with attention to privacy, access, and clinical fit.",
    "whyChoose": [
      "Individual sessions with Marcus Ghiasi, LMFT, California license #158475",
      "Virtual access for Daly City residents; you must be in California for appointments",
      "A conversation about goals, preferences, and the reasons for a proposed approach",
      "45- or 60-minute private-pay sessions; rates and insurance details are below",
      "Free 15-minute consultation to discuss fit and practical questions"
    ],
    "uniqueContent": [
      "Therapy can draw on CBT for patterns of worry and avoidance, IFS for exploring internal conflict, psychodynamic work for recurring relational themes, or EMDR when memory-focused treatment is appropriate. We discuss the reason for an approach and review how it fits your goals.",
      "<a href=\"/services\">Compare the therapy approaches offered at Bayside.</a> <a href=\"/about\">Read about Marcus and his approach.</a> You can ask about experience relevant to your concern before deciding on care."
    ],
    "uniqueWhatToExpect": [
      "A free 15-minute consultation gives you room to describe what you need, ask questions, and discuss availability. It does not commit you to ongoing sessions.",
      "The first full appointment can explore keeping location and support information current, your history, and the concerns most important to you. You can ask questions about pace, methods, and what to do if something does not feel useful. Session length is 45 or 60 minutes; check current scheduling options when booking.",
      "There is no fixed number of sessions or promised outcome. We can review what is changing, what remains difficult, and whether to adjust the approach, frequency, or plan for care."
    ],
    "uniqueFaqs": [
      {
        "q": "Why might a therapist ask where I am during a remote session?",
        "a": "Your location matters for licensing and for planning appropriate support if a problem occurs. Remote access does not remove those responsibilities."
      },
      {
        "q": "Are these in-person appointments in Daly City?",
        "a": "No. Bayside provides virtual individual therapy. You can attend from a private, suitable setting in Daly City or elsewhere in California; your physical location matters for every appointment."
      },
      {
        "q": "How much do sessions cost, and can I use insurance?",
        "a": "Sessions are $210 for 45 minutes or $280 for 60 minutes. Bayside is a private-pay practice and does not bill insurance directly. A superbill is available for possible out-of-network reimbursement; eligibility and payment depend on your plan."
      },
      {
        "q": "How many sessions will I need?",
        "a": "There is no fixed number of sessions or promised outcome. We can review what is changing, what remains difficult, and whether to adjust the approach, frequency, or plan for care."
      }
    ],
    "contentHeading": "Keeping location and support information current"
  },
  "online-therapy-alameda": {
    "city": "Alameda",
    "state": "CA",
    "slug": "online-therapy-alameda",
    "title": "Online Therapy for Alameda Residents",
    "metaTitle": "Online Therapy in Alameda | Virtual Sessions",
    "metaDescription": "Online Therapy for adults in Alameda, CA. Matching the session to your goals. Virtual sessions with Marcus Ghiasi, LMFT. Free consultation.",
    "h1": "Online Therapy for Adults in Alameda, CA",
    "intro": "A video format does not determine the therapy method. We can discuss whether you want structured skills, room to explore, or assessment of trauma-related concerns, then consider an appropriate approach. Bayside offers virtual individual therapy to adults in Alameda who are physically in California for sessions.",
    "localContent": "Marcus Ghiasi is a California Licensed Marriage and Family Therapist, license #158475. Bayside is based in Oakland. Sessions for Alameda residents take place online from a private setting in California. Virtual individual therapy for adults, with attention to privacy, access, and clinical fit.",
    "whyChoose": [
      "Individual sessions with Marcus Ghiasi, LMFT, California license #158475",
      "Virtual access for Alameda residents; you must be in California for appointments",
      "A conversation about goals, preferences, and the reasons for a proposed approach",
      "45- or 60-minute private-pay sessions; rates and insurance details are below",
      "Free 15-minute consultation to discuss fit and practical questions"
    ],
    "uniqueContent": [
      "Therapy can draw on CBT for patterns of worry and avoidance, IFS for exploring internal conflict, psychodynamic work for recurring relational themes, or EMDR when memory-focused treatment is appropriate. We discuss the reason for an approach and review how it fits your goals.",
      "<a href=\"/services\">Compare the therapy approaches offered at Bayside.</a> <a href=\"/about\">Read about Marcus and his approach.</a> You can ask about experience relevant to your concern before deciding on care."
    ],
    "uniqueWhatToExpect": [
      "A free 15-minute consultation gives you room to describe what you need, ask questions, and discuss availability. It does not commit you to ongoing sessions.",
      "The first full appointment can explore matching the session to your goals, your history, and the concerns most important to you. You can ask questions about pace, methods, and what to do if something does not feel useful. Session length is 45 or 60 minutes; check current scheduling options when booking.",
      "There is no fixed number of sessions or promised outcome. We can review what is changing, what remains difficult, and whether to adjust the approach, frequency, or plan for care."
    ],
    "uniqueFaqs": [
      {
        "q": "Do online sessions use only one therapy approach?",
        "a": "No. The approach is selected according to your needs and preferences. Telehealth is the format, not a separate promise about treatment results."
      },
      {
        "q": "Are these in-person appointments in Alameda?",
        "a": "No. Bayside provides virtual individual therapy. You can attend from a private, suitable setting in Alameda or elsewhere in California; your physical location matters for every appointment."
      },
      {
        "q": "How much do sessions cost, and can I use insurance?",
        "a": "Sessions are $210 for 45 minutes or $280 for 60 minutes. Bayside is a private-pay practice and does not bill insurance directly. A superbill is available for possible out-of-network reimbursement; eligibility and payment depend on your plan."
      },
      {
        "q": "How many sessions will I need?",
        "a": "There is no fixed number of sessions or promised outcome. We can review what is changing, what remains difficult, and whether to adjust the approach, frequency, or plan for care."
      }
    ],
    "contentHeading": "Matching the session to your goals"
  },
  "online-therapy-san-rafael": {
    "city": "San Rafael",
    "state": "CA",
    "slug": "online-therapy-san-rafael",
    "title": "Online Therapy for San Rafael Residents",
    "metaTitle": "Online Therapy in San Rafael | Virtual Sessions",
    "metaDescription": "Online Therapy for adults in San Rafael, CA. Reviewing whether online care is helping. Virtual sessions with Marcus Ghiasi, LMFT. Free consultation.",
    "h1": "Online Therapy for Adults in San Rafael, CA",
    "intro": "Convenience alone is not the measure of a useful therapy relationship. We can discuss whether you can engage, whether the focus is relevant, and whether another format or level of care would fit better. Bayside offers virtual individual therapy to adults in San Rafael who are physically in California for sessions.",
    "localContent": "Marcus Ghiasi is a California Licensed Marriage and Family Therapist, license #158475. Bayside is based in Oakland. Sessions for San Rafael residents take place online from a private setting in California. Virtual individual therapy for adults, with attention to privacy, access, and clinical fit.",
    "whyChoose": [
      "Individual sessions with Marcus Ghiasi, LMFT, California license #158475",
      "Virtual access for San Rafael residents; you must be in California for appointments",
      "A conversation about goals, preferences, and the reasons for a proposed approach",
      "45- or 60-minute private-pay sessions; rates and insurance details are below",
      "Free 15-minute consultation to discuss fit and practical questions"
    ],
    "uniqueContent": [
      "Therapy can draw on CBT for patterns of worry and avoidance, IFS for exploring internal conflict, psychodynamic work for recurring relational themes, or EMDR when memory-focused treatment is appropriate. We discuss the reason for an approach and review how it fits your goals.",
      "<a href=\"/services\">Compare the therapy approaches offered at Bayside.</a> <a href=\"/about\">Read about Marcus and his approach.</a> You can ask about experience relevant to your concern before deciding on care."
    ],
    "uniqueWhatToExpect": [
      "A free 15-minute consultation gives you room to describe what you need, ask questions, and discuss availability. It does not commit you to ongoing sessions.",
      "The first full appointment can explore reviewing whether online care is helping, your history, and the concerns most important to you. You can ask questions about pace, methods, and what to do if something does not feel useful. Session length is 45 or 60 minutes; check current scheduling options when booking.",
      "There is no fixed number of sessions or promised outcome. We can review what is changing, what remains difficult, and whether to adjust the approach, frequency, or plan for care."
    ],
    "uniqueFaqs": [
      {
        "q": "Can I change my mind about telehealth?",
        "a": "Yes. Bring concerns into the conversation. We can review the options, including a referral if the practice’s virtual format no longer fits your needs."
      },
      {
        "q": "Are these in-person appointments in San Rafael?",
        "a": "No. Bayside provides virtual individual therapy. You can attend from a private, suitable setting in San Rafael or elsewhere in California; your physical location matters for every appointment."
      },
      {
        "q": "How much do sessions cost, and can I use insurance?",
        "a": "Sessions are $210 for 45 minutes or $280 for 60 minutes. Bayside is a private-pay practice and does not bill insurance directly. A superbill is available for possible out-of-network reimbursement; eligibility and payment depend on your plan."
      },
      {
        "q": "How many sessions will I need?",
        "a": "There is no fixed number of sessions or promised outcome. We can review what is changing, what remains difficult, and whether to adjust the approach, frequency, or plan for care."
      }
    ],
    "contentHeading": "Reviewing whether online care is helping"
  }
};

const seoPagesSlugSet = new Set(Object.keys(seoPages));

const faqs = [
  {
    "q": "Are you accepting new clients?",
    "a": "Please check the booking calendar or contact the practice for current availability. A free 15-minute consultation is a chance to discuss your concerns, scheduling, and whether the practice is a fit."
  },
  {
    "q": "Do you offer in-person sessions?",
    "a": "No. Bayside is an Oakland-based virtual practice. Individual sessions take place through telehealth, and clients must be physically in California for appointments."
  },
  {
    "q": "How much does therapy cost?",
    "a": "Sessions are $210 for 45 minutes or $280 for 60 minutes. Bayside is a private-pay practice and does not bill insurance directly. A superbill is available for possible out-of-network reimbursement; eligibility and payment depend on your plan."
  },
  {
    "q": "Do you take insurance?",
    "a": "Bayside does not accept insurance directly or participate in insurance networks. A superbill is available for possible out-of-network reimbursement. Ask your insurer about coverage, deductibles, and reimbursement before relying on payment. HSA and FSA eligibility is a separate question for your plan administrator."
  },
  {
    "q": "How do I know which therapy approach is right for me?",
    "a": "You do not need to choose a method before starting. We can discuss your goals, history, preferences, and the reasons for a recommendation. The plan can be reviewed as the work develops."
  },
  {
    "q": "Do you work with young adults?",
    "a": "Yes. Marcus works with adults roughly ages 18 to 30, including college students, on concerns such as anxiety, low mood, identity, relationships, and transitions. This is psychotherapy rather than academic advising, learning assessment, or neurodevelopmental testing."
  },
  {
    "q": "Do you offer couples, family, or teen therapy?",
    "a": "The services described on this site are individual therapy for adults age 18 and older. Relationship and family concerns can be discussed individually. Ask about an appropriate referral if you need joint couples sessions, family treatment, or care for a minor."
  },
  {
    "q": "Can I attend while traveling outside California?",
    "a": "Do not assume a virtual appointment can occur from any location. This practice offers sessions to clients physically in California. Discuss travel and continuity of care before a trip."
  },
  {
    "q": "How will we know whether therapy is helping?",
    "a": "There is no fixed number of sessions or promised outcome. We can review what is changing, what remains difficult, and whether to adjust the approach, frequency, or plan for care."
  }
];

const blogPosts = [
  {
    "slug": "when-labor-doesnt-go-according-to-plan",
    "title": "When Labor Doesn't Go According to Plan",
    "excerpt": "A birth plan isn't naive. But birth doesn't actually care what's written on the page, and the gap between the two is where a lot of the aftermath lives.",
    "date": "August 27, 2026",
    "category": "New Parenthood",
    "image": "/birth-plan.jpg",
    "content": "We had a birth plan. We'd read the books, taken the classes, talked through every preference with real care. And then we got to the hospital, and pretty much all of it went out the window.\n \nIf you're reading this in the weeks or months after your own birth, and something similar happened to you, I want to say something plainly before anything else: that experience is real, it matters, and you don't have to pretend it went the way you pictured it just because everyone made it out okay in the end.\n \nThe Gap Between the Plan and the Room\n \nA birth plan isn't naive. It's a reasonable, thoughtful attempt to bring some control into one of the most physically and emotionally intense experiences a person can go through. The problem isn't the plan. The problem is that birth doesn't actually care what's written on the page.\n \nWhat happens for a lot of people is that the room takes over. Decisions get made faster than you can process them. People you don't know are suddenly the ones guiding what happens to your body. And somewhere in the middle of all of it, the version of the experience you'd imagined quietly disappears, replaced by something messier, scarier, and far less within your control.\n \nThat gap, between what you planned and what actually happened, is where a lot of the aftermath lives. Not just in the physical recovery, but in the mind. Some people carry it as grief. Some carry it as anger. Some carry a quiet, nagging sense that they failed at something, even when every objective fact says otherwise.\n \nTrusting Your Body and Mind, Even When the Story Feels Incomplete\n \nHere's something worth sitting with: your body did something extraordinary, even if it didn't do it the way you'd imagined. The pivot, the change of plans, the moment you or your medical team decided something different needed to happen, that wasn't a failure of your body or your judgment. It was often your body and your judgment working exactly as they should, responding to real information in real time.\n \nLetting go of the plan in the moment isn't the same as giving up. It's a different kind of strength, the kind that doesn't get talked about as much because it isn't as clean a story. Flexibility under that kind of pressure is not the same thing as incompetence. It's the opposite.\n \nWhat Actually Mattered\n \nAt the end of the day, what mattered was safety, yours and your baby's, whatever that safety required in that specific moment. Not the plan. Not how closely reality matched what you'd hoped for. The plan was always a guide, never a guarantee, and needing to depart from it doesn't erase the thoughtfulness that went into making it in the first place.\n \nIf you're still carrying something heavy from how your birth actually went, that's not something you're required to just move past because the outcome was fine. Postpartum trauma is real, even after a birth that \"worked out.\" It deserves real attention, not just relief that everyone's healthy.\n \nIf any of this is landing because it sounds familiar, you don't have to sort through it alone. A free 15-minute consultation is a low-pressure way to start, just a conversation about what you're carrying and whether working through it together might help."
  },
  {
    "slug": "what-your-anger-is-actually-telling-you",
    "title": "Understanding Anger and Taking Responsibility",
    "excerpt": "Explore anger through specific situations, earlier warning signs, and accountability for behavior, without assuming every reaction has one hidden cause.",
    "date": "April 28, 2026",
    "category": "Men's Mental Health",
    "image": "/anger-relationships.jpg",
    "content": "Anger can give you information. It can also lead to behavior you regret. Understanding the feeling and taking responsibility for what you do with it belong in the same conversation.\n\nSometimes anger accompanies hurt, fear, embarrassment, or exhaustion. Sometimes it is a direct response to an unfair situation. We do not need to assume there is always a hidden emotion or an old trauma underneath it.\n\nStart with one specific moment\n\nThink about a recent interaction. What happened immediately before you became angry? What did you believe the other person meant? What did you notice in your body? What did you do next, and what was the effect?\n\nThose questions are more useful than deciding that you are simply an angry person. They create room to identify a point where another response might be possible.\n\nMake the pause concrete\n\nA pause is easier to use when it has a plan. You might say that you need time to settle and propose when to return to the conversation. Walking away without explanation, threatening to leave, or using silence as punishment can create a different problem.\n\nIf a pause repeatedly turns into avoidance, that is worth examining too. The aim is to return with enough attention to listen, speak clearly, and address what happened.\n\nUnderstanding does not remove responsibility\n\nStress can help explain an outburst without excusing it. Repair may include acknowledging the impact, listening without immediately defending yourself, and changing the behavior that caused harm. An apology is not a substitute for those changes.\n\nWhen there are threats, intimidation, coercion, or violence, safety and specialist support take priority. General advice about communication is not sufficient.\n\nWhat therapy can work on\n\nIndividual therapy can examine recurring triggers, interpretations, boundaries, and habits around conflict. It can also help identify contributing concerns such as sleep difficulties, substance use, anxiety, or low mood without assuming one cause explains everything.\n\nThe goal is not to eliminate a normal emotion. It is to respond in ways that are more consistent with your values and responsibilities.\n\nBayside offers virtual individual therapy to adults physically in California. A free 15-minute consultation is available to discuss your concerns and whether the practice is a fit.\n\nFurther reading\n\n<a href=\"https://www.nimh.nih.gov/health/topics/psychotherapies\" target=\"_blank\" rel=\"noopener noreferrer\">NIMH: understanding psychotherapy and choosing care</a>",
    "updatedDate": "October 27, 2026"
  },
  {
    "slug": "how-to-find-a-therapist-who-fits",
    "title": "How to Find a Therapist Who Fits",
    "excerpt": "Questions about qualifications, approach, cost, and feedback can help you make an informed choice about a therapist.",
    "date": "April 21, 2026",
    "category": "Therapy Education",
    "image": "/find-a-therapist.jpg",
    "content": "Searching for a therapist can become another demanding task at a time when you already have little energy. A useful search does not require finding a perfect profile. It requires enough information to make a reasonable next step.\n\nStart with qualifications and scope\n\nCheck that a provider holds an appropriate license and offers the service you need. Ask about experience relevant to your concern and training in a method you are considering. A professional license and a good interpersonal fit matter in different ways; neither replaces the other.\n\nIn California, you can use the <a href=\"https://search.dca.ca.gov/\" target=\"_blank\" rel=\"noopener noreferrer\">Department of Consumer Affairs license search</a> to check a clinician’s license status. A directory badge or a polished website should not be the only basis for that check.\n\nAsk how the work would connect to your concern\n\nYou might ask: What would you want to understand before recommending an approach? What might the first few appointments involve? How would we review whether the work is helping? What would make you recommend another provider?\n\nA useful answer should be understandable without requiring you to learn a therapist’s entire vocabulary. You are allowed to ask what a term means and what it would look like in a session.\n\nNotice whether questions are welcome\n\nA consultation is a two-way conversation. Pay attention to whether you feel heard, whether the therapist acknowledges uncertainty, and whether practical questions receive clear answers. Feeling instantly comfortable is not the only measure of fit, but feeling pressured or dismissed deserves attention.\n\nDiscuss the practical arrangement\n\nAsk about fees, scheduling, virtual or in-person delivery, cancellation policies, and contact between sessions. If you intend to use out-of-network benefits, verify your plan rather than assuming a superbill guarantees payment.\n\nFit can be reviewed after starting\n\nYou can say that an approach feels too fast, too vague, or different from what you expected. A conversation about that response may improve the work or clarify that another provider is a better fit. You do not need to prove a therapist is bad to decide a relationship is not right for you.\n\nBayside offers virtual individual therapy to adults physically in California. A free 15-minute consultation is available to discuss your concerns and whether the practice is a fit.\n\nFurther reading\n\n<a href=\"https://www.nimh.nih.gov/health/topics/psychotherapies\" target=\"_blank\" rel=\"noopener noreferrer\">NIMH: understanding psychotherapy and choosing care</a>",
    "updatedDate": "October 27, 2026"
  },
  {
    "slug": "why-anxiety-gets-worse-at-night",
    "title": "Why Your Anxiety Gets Louder at Night",
    "excerpt": "Nighttime worry can have several contributors. Explore the pattern and when sleep or anxiety concerns deserve further assessment.",
    "date": "April 14, 2026",
    "category": "Anxiety",
    "image": "/anxiety-at-night.jpg",
    "content": "During the day, activity can keep worry in the background. At night, fewer distractions may leave more room for it. Fatigue, stress, sleep habits, and expectations about sleep can all play a role. There is no single brain-based explanation that applies to everyone.\n\nNotice the pattern before choosing a solution\n\nWhat happens first: a worry, a physical sensation, an awakening, or a glance at the clock? Do you start reviewing the day or predicting how badly tomorrow will go? Are caffeine, alcohol, medication, pain, or an irregular schedule part of the picture?\n\nThose details help distinguish concerns that may need different kinds of support. Persistent sleep difficulty deserves assessment rather than a presumption that it must come from trauma.\n\nExperiment without turning sleep into a test\n\nA quieter transition before bed, a more consistent routine, or writing down a concern earlier in the evening may be useful experiments. They are not guarantees. If an exercise makes you more alert, frustrated, or anxious, you do not need to keep doing it to demonstrate commitment.\n\nTrying harder to force sleep can become another source of pressure. If the problem persists, a health care professional can help assess sleep, anxiety, and possible medical contributors. You can ask about treatment specifically designed for insomnia.\n\nWhat therapy can explore\n\nWe can examine the worry cycle, responses to uncertainty, and the meaning of being awake when you feel you should be sleeping. Where difficult memories are relevant, trauma-focused treatment may be considered after assessment. EMDR should not be presented as the default answer to every nighttime worry.\n\nNew, severe, or unexplained physical symptoms should not simply be labeled anxiety. Seek appropriate medical evaluation when needed.\n\nThe aim is to understand what keeps the pattern going and develop a workable response, not to blame you for failing to relax.\n\nBayside offers virtual individual therapy to adults physically in California. A free 15-minute consultation is available to discuss your concerns and whether the practice is a fit.\n\nFurther reading\n\n<a href=\"https://www.nimh.nih.gov/health/topics/psychotherapies\" target=\"_blank\" rel=\"noopener noreferrer\">NIMH: understanding psychotherapy and choosing care</a>",
    "updatedDate": "October 27, 2026"
  },
  {
    "slug": "burnout-is-not-a-scheduling-problem",
    "title": "When Time Off Does Not Resolve Exhaustion",
    "excerpt": "A closer look at workload, practical limits, and internal expectations, without reducing exhaustion to a calendar or mindset problem.",
    "date": "April 7, 2026",
    "category": "Mental Health",
    "image": "/burnout.jpg",
    "content": "You cleared some space, took time off, and still felt depleted when the week began again. That experience can be frustrating, especially when the advice you receive is another list of things to do better.\n\nScheduling can matter. So can workload, control, finances, caregiving, discrimination, health, and the expectations you carry. It is too simple to say that burnout is only a calendar problem or only an internal psychological one.\n\nSeparate the demands from your response to them\n\nWhat is being asked of you? Which demands are negotiable? What happens when you consider saying no? You may face real limits while also carrying a rule that rest must be earned or that disappointing someone is unacceptable.\n\nTherapy can help explore that rule without pretending it created every external problem. Some changes may require workplace support, a practical adjustment, or a conversation about resources beyond therapy.\n\nLook at the whole picture\n\nExhaustion, irritability, withdrawal, and loss of interest can overlap with other concerns. Persistent fatigue or a major change in mood or functioning may warrant medical or mental health assessment. A website article cannot determine which explanation fits you.\n\nChoose a change you can evaluate\n\nRather than trying to redesign your life at once, you might examine one commitment, one expectation about availability, or one place where you continue working after the task is finished. What would a different response require? What would make it difficult to sustain?\n\nRest is not a cure-all, but it also does not need to be dismissed because a deeper pattern exists. Practical changes and psychological work can support each other.\n\nHow therapy can help\n\nWe can examine overcommitment, self-criticism, uncertainty, and relationships alongside the actual conditions you face. Progress might mean a more workable boundary, more room for recovery, or a clearer decision about what cannot continue. There is no fixed timeline or single technique that guarantees that change.\n\nBayside offers virtual individual therapy to adults physically in California. A free 15-minute consultation is available to discuss your concerns and whether the practice is a fit.\n\nFurther reading\n\n<a href=\"https://www.nimh.nih.gov/health/topics/psychotherapies\" target=\"_blank\" rel=\"noopener noreferrer\">NIMH: understanding psychotherapy and choosing care</a>",
    "updatedDate": "October 27, 2026"
  },
  {
    "slug": "cost-of-constant-exposure-desensitization",
    "title": "The Cost of Constant Exposure: Understanding Desensitization",
    "excerpt": "In a world of constant distressing information, desensitization serves as protection. But when numbness becomes the default, how do we reconnect with what matters most?",
    "date": "April 1, 2026",
    "category": "Mental Health",
    "image": "/desensitization-blog.jpg",
    "content": "It has become increasingly normal to witness extraordinary suffering in ordinary moments. A person might scroll past footage of war while waiting in line for coffee, read about violence between meetings, or move from stories of economic hardship directly into images of curated luxury and success. The contrast is constant. So is the exposure.\n\nMany people notice a quiet change in themselves over time. Headlines that once felt shocking barely register. Tragedies blur together. Emotional reactions arrive slower, or sometimes not at all.\n\nDesensitization is one way to think about that change. Numbness can also have other contributors, so a single explanation may not fit everyone.\n\nAdaptation, Not Failure\n\nAt its core, desensitization is not a flaw. It is a form of adaptation. A degree of emotional distance can make difficult information easier to manage. That does not mean every muted reaction is a necessary adaptation or that caregivers should remain unaffected by what they encounter.\n\nIn this way, desensitization serves an important purpose. People in helping roles may develop ways to remain present during difficult moments. Support, supervision, rest, and limits can matter too. Emotional buffering allows people to endure uncertainty, loss, and stress without collapsing under the weight of it.\n\nProtection, however, can quietly become disconnection.\n\nWhen Distance Becomes Numbness\n\nWhen exposure never truly stops, emotional numbing can extend beyond the news cycle. Conversations feel harder to enter emotionally. Relationships may feel flatter or more transactional. Some people notice irritability without understanding why, while others struggle to access joy with the same ease they once did.\n\nRepeated exposure and sustained stress may be relevant when someone feels emotionally distant. It is worth exploring the pattern and other possible contributors rather than presenting a fixed neurological explanation.\n\nYet desensitization is not entirely negative. Emotional distance allows people to regulate themselves and remain present for others. Clinically planned exposure work is different from repeated, uncontrolled exposure to distressing media. They should not be treated as interchangeable experiences. The goal has never been to feel everything all at once.\n\nThe challenge is noticing when numbness becomes the default rather than a temporary response.\n\nRecognizing the Shift\n\nAwareness often begins subtly. You may notice yourself scrolling longer without remembering what you saw. Silence feels uncomfortable without distraction. Conversations that once felt meaningful begin to feel rushed or surface level.\n\nReconnection rarely requires dramatic change. Limiting constant exposure to distressing media, spending time in environments that engage the senses, or having conversations without distraction may help you explore what supports emotional presence. Therapy, creativity, movement, and moments of intentional stillness can help sensitivity return without overwhelm.\n\nChoosing to Feel Again\n\nDesensitization is not evidence that something is wrong with you. More often, it reflects a mind working hard to protect itself in a world that rarely pauses.\n\nChoosing to feel again does not mean abandoning protection. It means recognizing when distance is helping you and when it is quietly keeping you from the people, experiences, and parts of yourself that matter most. In a world constantly asking for your attention, reclaiming emotional presence may be one of the most meaningful ways to care for yourself and those around you.\n\nIf numbness persists, affects daily life, or occurs alongside other changes in mood or functioning, consider assessment rather than assuming media exposure is the only cause.",
    "updatedDate": "October 27, 2026"
  },
  {
    "slug": "signs-you-need-therapy",
    "title": "Signs It May Be Time to Ask About Therapy",
    "excerpt": "You do not need a crisis or a diagnosis to ask about support. Consider recurring patterns, daily functioning, and what a consultation can clarify.",
    "date": "March 10, 2026",
    "category": "Mental Health",
    "image": "/signs-therapy.jpeg",
    "content": "You do not need to reach a breaking point to ask about therapy. You also do not need a website to decide that a diagnosis applies to you. A useful starting point is whether something is causing distress, limiting your choices, or repeatedly affecting daily life.\n\nThe same difficulty keeps returning\n\nYou might notice a familiar argument, worry, withdrawal, or habit of putting your needs last. Repetition does not prove that the cause is childhood trauma. It does give you something concrete to explore.\n\nYour usual ways of coping are becoming costly\n\nWorking more, avoiding a conversation, or asking for reassurance may help briefly while creating another problem. Therapy can help examine what the response accomplishes and whether another option is possible.\n\nDaily life has changed\n\nSleep, energy, interest, concentration, or connection may be different from your usual pattern. If changes persist or interfere with functioning, an assessment can help clarify possible causes and appropriate care. Physical symptoms may also need medical evaluation.\n\nSomething happened that you want help making sense of\n\nA loss, frightening event, separation, or transition may be difficult even if other people expect you to move on. You do not need to compare your experience with someone else’s to ask for support. People recover in different ways, with and without formal therapy.\n\nYou want to make a change thoughtfully\n\nTherapy can also be a place to clarify priorities, practice communication, or understand a decision. The goal does not have to be eliminating a symptom before you are allowed to begin.\n\nWhat a consultation can tell you\n\nA brief conversation can address fit, scope, availability, and cost. It is not a complete clinical assessment and does not guarantee a particular outcome. You can ask what a provider would need to understand before recommending treatment.\n\nFor urgent safety concerns, seek immediate support rather than waiting for a routine appointment or inquiry response. Bayside’s crisis-resources page lists options for immediate help.\n\nBayside offers virtual individual therapy to adults physically in California. A free 15-minute consultation is available to discuss your concerns and whether the practice is a fit.\n\nFurther reading\n\n<a href=\"https://www.nimh.nih.gov/health/topics/psychotherapies\" target=\"_blank\" rel=\"noopener noreferrer\">NIMH: understanding psychotherapy and choosing care</a>",
    "updatedDate": "October 27, 2026"
  },
  {
    "slug": "master-trauma-or-die-trying",
    "title": "When Caregiving Becomes Over-Responsibility",
    "excerpt": "If the news feels like background noise and you can't remember the last time something truly moved you, you may not be broken. You may be desensitized. Here's what that means and how to find your way back.",
    "date": "March 2, 2026",
    "category": "Mental Health",
    "image": "https://images.squarespace-cdn.com/content/v1/67b28b6e1f96852c768d5fd2/1771904315221-1TRU8WPW6AVCLPYZOTW4/unsplash-image-1VNw8-5cs54.jpg",
    "content": "Some people become caretakers because they choose to. Others realize, often much later, that they have simply always been one. You might be the person everyone calls when something falls apart. The sibling who learned early how to keep the peace. The friend who listens long after everyone else has gone home. For some, caregiving becomes a profession. Therapist, nurse, teacher, parent, or first responder. Helping others feels natural, even grounding. Yet sometimes what feels natural is also familiar.\n\nReading Trauma Stewardship by Laura van Dernoot Lipsky with Connie Burk invites reflection on how helping affects the helper. One question I take from that reading is whether a caregiving role remains a choice or has begun to feel compulsory. Without realizing it, people can find themselves returning to emotional environments that resemble earlier wounds, hoping, somewhere beneath awareness, that this time the outcome will be different. It is rarely intentional. More often, it is a pull toward what feels known.\n\nA pattern of over-responsibility does not always look dramatic, and it does not by itself establish a trauma history. It shows up in small decisions that slowly accumulate. Saying yes when you are already exhausted because someone else needs support. Feeling responsible for managing the emotional temperature of a room. Staying longer in difficult relationships because leaving feels like failure. Many caregivers notice they are consistently the steady one, the mediator, or the person who absorbs tension so others do not have to.\n\nOn the surface, these behaviors often reflect generosity and empathy. Many helpers are deeply compassionate people whose lived experiences allow them to connect meaningfully with others. The challenge arises when helping begins to serve another purpose. Beneath the desire to support others can live an unspoken hope that if you fix enough problems or hold enough chaos together, something unresolved inside you will finally settle. In this way, caregiving can become less about choice and more about trying to rewrite a story that once felt out of control.\n\nOver time, this pattern can blur the line between compassion and over responsibility. Some people notice that rest feels uncomfortable or even undeserved. Calm moments create anxiety because being needed has become a source of identity. Others find themselves most confident during emergencies yet unsure how to exist when life slows down. Boundaries become difficult to maintain, especially when someone expresses distress. Eventually exhaustion, resentment, or emotional numbness can follow, not because caring is harmful, but because constant exposure to other people's pain leaves little space to tend to one's own.\n\nTrauma stewardship offers a different approach. The goal is not to stop caring but to care sustainably. Stewardship asks caregivers to hold compassion alongside responsibility for their own wellbeing. In everyday terms, this might look like allowing a phone call to go unanswered, asking for help instead of offering it first, or recognizing that supporting someone does not require sacrificing yourself. Sometimes it means allowing others to struggle without immediately stepping in, trusting that growth often requires space.\n\nMany caregivers are shaped by hardship in ways that deepen empathy and resilience. There is nothing wrong with wanting meaning after difficulty, or with discovering purpose through helping others. The invitation is simply to notice when helping begins to cost more than it gives back.\n\nYou do not have to master trauma to prove you survived it. Sometimes the most courageous question a caretaker can ask is not how to save someone else, but who is allowed to care for them.",
    "updatedDate": "October 27, 2026"
  },
  {
    "slug": "the-5-lies-suicide-tells-us",
    "title": "Five Painful Beliefs That Can Accompany Suicidal Thoughts",
    "excerpt": "Suicide is one of the most misunderstood topics in mental health. The myths surrounding it don't just spread misinformation. They cost lives. Here are five lies suicide tells us, and the five truths that can break through them.",
    "date": "February 24, 2026",
    "category": "Mental Health",
    "image": "https://images.squarespace-cdn.com/content/v1/67b28b6e1f96852c768d5fd2/1771902287761-KLHR5ENYZWG25WB9JNUD/unsplash-image-hluOJZjLVXc.jpg",
    "content": "**Trigger Warning:** This article discusses suicide and suicidal thoughts. If you are currently in immediate danger or considering harming yourself, please contact 988 in the United States or seek emergency support right away.\n\nEarly in my career, I volunteered with a suicide prevention hotline. Every shift brought calls from people in immediate crisis. Some were standing at the edge of life altering decisions. Others simply needed someone to listen without judgment. What stayed with me was not only the pain people carried, but the stories they believed about themselves. Through that experience, and in the years that followed as a counselor and case manager, I began to notice patterns. Certain beliefs appeared again and again. They felt true to the person experiencing them. Yet they were often deeply misleading.\n\nHere are five common lies suicide tells people, followed by the truths that help loosen their grip.\n\nThe 5 Lies of Suicide\n\n1. I have to deal with this alone.\nIsolation convinces people that no one could understand their pain. Shame and fear often reinforce silence. Yet suffering tends to grow louder when it is hidden.\n\n2. I do not want to burden others.\nMany people believe their struggles will overwhelm loved ones. They worry about being \"too much.\" In reality, most families and friends would rather know someone is struggling than lose the opportunity to help.\n\n3. Talking about it makes it worse.\nThere is a persistent myth that speaking openly about suicidal thoughts plants dangerous ideas. Asking directly about suicidal thoughts does not increase those thoughts. A conversation can open a path to support, but it should not be treated as a substitute for safety assessment or crisis care.\n\n4. Nothing will ever change.\nHopelessness narrows perspective. Depression and trauma can make the future feel fixed and permanent. Pain begins to look like a life sentence rather than a moment in time.\n\n5. It is the only option.\nWhen distress peaks, the brain shifts into survival mode. Choices appear limited. Suicide can begin to feel like the only escape from unbearable emotion, even when other paths exist.\n\nIf you are reading this, suicide may not be an abstract topic. You may have lost someone. You may be worried about a partner, a child, a friend, or a colleague. Or perhaps parts of these lies sound familiar because you have quietly wrestled with them yourself. Suicide does not exist in isolation. Its impact ripples through families, friendships, and communities. Recognizing these beliefs is often the first step toward interrupting them, whether you are supporting someone you love or learning how to support yourself.\n\nThe 5 Truths About Suicide\n\n1. You do not have to deal with it alone.\nSupport changes outcomes. Therapists, friends, family members, peer groups, and crisis counselors exist because connection saves lives.\n\n2. You are not a burden to others.\nHuman relationships are built on mutual care. Allowing someone to support you often deepens connection rather than damaging it.\n\n3. Talking about it makes it easier.\nSpeaking about pain can make support possible, even when it does not bring immediate relief. A person who remains distressed still deserves help and appropriate care.\n\n4. Feelings and circumstances can change.\nHopelessness tells a convincing story, but emotions are not permanent states. Treatment, community, medication, meaningful change, and time itself can reshape what once felt impossible.\n\n5. It is not the only option.\nCrisis narrows vision. Support expands it again. There are always additional steps, even small ones, that can move someone toward safety and healing.\n\nSuicidal thoughts often grow in secrecy, shame, and isolation. Compassion and connection can support help-seeking; ongoing or urgent risk still needs appropriate assessment and care. Hope does not always arrive as a dramatic turning point. Sometimes it begins with a single conversation, a moment of honesty, or the decision to reach out when everything inside says not to.\n\nSupport can look different for everyone. It might mean speaking with a trusted friend, connecting with a therapist, joining a support group, or reaching out to trained crisis counselors who are there specifically for moments like this. Healing is rarely linear, but change is possible, and people recover every day.\n\nIf you are in the US, you can call or text 988, the Suicide and Crisis Lifeline, to speak with someone right now. You deserve support, your story matters, and you do not have to face this alone.\n\nFurther reading\n\n<a href=\"https://www.nimh.nih.gov/health/publications/suicide-faq\" target=\"_blank\" rel=\"noopener noreferrer\">NIMH: questions about suicide and getting help</a>",
    "updatedDate": "October 27, 2026"
  },
  {
    "slug": "understanding-depression",
    "title": "Understanding Depression in Daily Life",
    "excerpt": "Recognizing changes in mood and functioning, considering assessment, and discussing treatment options without reducing depression to one cause.",
    "date": "February 23, 2026",
    "category": "Depression and Mood",
    "image": "/understanding-depression.jpeg",
    "content": "Depression can affect more than mood. A person may notice a loss of interest, low energy, trouble concentrating, or changes in sleep and appetite. Someone can continue meeting obligations while struggling, and no single outward appearance tells the whole story.\n\nThese experiences deserve care rather than a judgment about effort. They also deserve assessment: symptoms can overlap with other mental or physical health concerns, and an article cannot determine their cause.\n\nDescribe what has changed\n\nIt can help to bring specific observations to an appointment. What has become harder? What have you stopped doing? What still feels possible? How are relationships and responsibilities affected?\n\nThere does not need to be a dramatic event or one explanation that makes everything clear. Biological, psychological, social, and medical factors can be relevant in different combinations.\n\nSupport does not have to begin with a large task\n\nWhen energy is low, a comprehensive self-improvement plan may feel impossible. A clinical plan can consider manageable activity, support, and the thoughts or circumstances making daily life harder. The size of a step should reflect your capacity rather than an assumption that motivation is simply a choice.\n\nConsider the range of care\n\nTreatment may involve psychotherapy, medication, or a combination, depending on the assessment and your preferences. Marcus provides psychotherapy and does not prescribe medication. A medical clinician can discuss medication and possible physical contributors when appropriate.\n\nReviewing the plan matters\n\nProgress is not always steady. It can help to review functioning, connection, and distress over time rather than assuming every difficult day means treatment has failed. Worsening symptoms or lack of improvement are reasons to revisit the plan and the level of support.\n\nIf you have thoughts of suicide or self-harm, seek immediate support rather than waiting for a routine consultation. The crisis-resources page provides immediate support options.\n\nBayside offers virtual individual therapy to adults physically in California. A free 15-minute consultation is available to discuss your concerns and whether the practice is a fit.\n\nFurther reading\n\n<a href=\"https://www.nimh.nih.gov/health/publications/depression\" target=\"_blank\" rel=\"noopener noreferrer\">NIMH: depression, symptoms, and treatment</a>",
    "updatedDate": "October 27, 2026"
  },
  {
    "slug": "ai-and-therapy",
    "title": "AI and Therapy: Reflections on Tools, Trust, and Care",
    "excerpt": "AI can answer questions, track your mood, and be available at 3am when your therapist isn't. But can it actually help you heal? A therapist weighs in on what technology can and cannot replace in the therapy room.",
    "date": "February 17, 2026",
    "category": "Therapy Insights",
    "image": "https://images.squarespace-cdn.com/content/v1/67b28b6e1f96852c768d5fd2/1771310087865-4QXZO9GM1Y8EASO3RBMK/unsplash-image-6UDansS-rPI.jpg",
    "content": "Who will win? AI or Therapist??\n\nThere is a lot of talk about town around the growing concerns when it comes to AI. From security risks to accessibility, there always seems to be some moral or ethical dilemma when we imagine a world with it more integrated into our lives. Especially here in the Bay Area where it seems like AI is just as tied to our identity as E-40 and Karl the Fog are. From tech, to finance, to the mom-and-pop shop in your neighborhood, the question persists: will AI take my job someday?\n\nThis has been a topic of interest amongst my colleagues and me over the past few years. What kind of therapist would an AI be if you could prompt it with your deepest, darkest secrets, your past wounds, current interpersonal conflicts, and fears about the future and after all is said, hope that it will give you the answer to all your problems. This might be hyperbole, but this is becoming a growing expectation from artificial intelligence and the LLMs we use in our day to day lives.\n\nTo begin, it is important to define some terms to for the sake of shared language and contextual understanding. AI (Artificial Intelligence), will be defined as a computer system or machine that is designed to simulate human intelligence, enabling them to perform complex tasks like learning, reasoning, problem-solving, perception, and language understanding. Therapy will be defined as the professional treatment aimed at addressing emotional and psychological challenges of individuals, couples, and families.\n\nNow the question is, \"Will AI ever replace therapists?\", and a follow up question is if AI will not ever replace therapists, \"What role can AI play in therapy?\".\n\nTo be transparent, I use AI more than I would like to admit and probably more than I realize. It's an incredibly powerful tool that saves me a lot of time. And to be honest, there is something kind of nice not having to think original thoughts sometimes. AI can produce a different perspective, but a plausible response is not clinical verification. Identifiable client information should not be entered into a general-purpose tool without appropriate privacy safeguards and authorization. Hell, it even helped me study for my licensing exam. (I wouldn't advise this though as it got many of the practice questions wrong). In 2026, it's easy to see how useful it can be for therapists and influential to the therapy. But to replace therapist entirely, I find that to be harder to imagine. I say this because I am the holder of a little-known therapy secret that I will share with you.\n\nThe therapeutic relationship matters to me: trust, shared goals, and room for honest feedback help make the work possible. It is one important factor alongside an appropriate treatment, the person’s circumstances, access, and the quality of care. I would not reduce outcomes to one universal predictor.\n\nThey say the most important decision you will ever make is choosing the person(s) you will be with. The second most important decision you will make is who you choose as your therapist. Therapy involves courage, vulnerability, curiosity, and compassion. The combination of each of these can lead to trust as is often crucial for any healthy relationship to form. It is once that trust is earned that I find the real work begins in therapy.\n\nIt may seem like commonsense, but it is a truth that is elusive. The humanity of the therapeutic process is what is often under appreciated. To have another person, sitting across the screen or office, listening, empathizing, validating, reflecting, encouraging, walking with you through the feelings with unconditional positive regard, that is something that is not easily simulated.\n\nIn a digital age, we often confuse virtual interactions to authentic connection. AI can be trained to model the likeness of something that is human but therein lies its deceptiveness. By opening an app on their phone or web browser, one can have immediate access to comforting words and suggestions. But the depth and integration to meaningful change is lacking and leaves querists wondering why things aren't changing quick enough.\n\nI have seen clients who come to me saying that they were talking to their \"AI therapist\" about whatever presenting issue they are experiencing and then try to get my input on whether the AI gave good advice or not. Sometimes, part of me feels like it's a challenge to see who can \"out-therapist\" the other. (Therapist vs. AI!) At other times, I'm genuinely curious as to what it says. My most frequent questions in those moments are, \"Did you try what it suggested?\", and \"Was it helpful?\".\n\nWhile AI can learn the same responses and follow the script, I do not treat its responses as a substitute for clinical assessment of the layers of emotion connected to a person’s struggles, the cultural implications this may have on their perspective of suffering and healing, the societal influences that imposes differing values, an awareness of developmental and biological factors, subtle micro expressions resulting from touching on something meaningful, and the very human response where the therapist has their own physical, emotional, and psychological reactions to what is being said in the room. This is what sets AI and therapists apart from each other. It takes one to know one, so to speak.\n\nThat is not to say that AI does not or cannot serve a purpose in the therapeutic process. We are already seeing the integration of artificial intelligence in our work as clinicians. Whether it be in helping therapists stay up to date with their documentation and clinical notes, getting clarity on diagnostic criteria, or even helping create treatment plans aligned with client goals. AI is already proving its value for therapists in the modern age.\n\nFor the client, using an AI can be an invaluable resource when it comes to psycho-education, helping expand vocabulary on clinical material, and gaining clarity to the approaches being used by the therapist. It can make interesting connections that are easy to miss when thoughts are clouded by emotions or bodily responses. It can also give practical suggestions on tips to reduce anxiety, depression, and stress. Using AI has its merits and shouldn't be regarded as useless. However, when treating it like a substitute for something that is it not, it can be dangerous, leading to misdiagnosis, inaccurate interventions, and at its worst, cause irreparable harm.\n\nMy goal as a licensed therapist is to help my clients be informed of the benefits and risks of using a tool like AI and support them in deciding what is best for them. I encourage curiosity and creativity when it comes to learning new ways that one can improve themselves and I believe that this resource available to us can be used in meaningful and practical ways. While I do not see a world where AI ever replaces therapists, I see it's inevitable integration into the therapeutic process. It's our job and privilege to become good stewards of this resource and to use it responsibly.\n\nIf you use AI while in therapy, you can bring questions about its responses into the session. Be thoughtful about the personal information you share with a tool and the limits of its advice.\n\nThese are my reflections on the relationship between technology and care, rather than a prediction about what every future system will do.",
    "updatedDate": "October 27, 2026"
  },
  {
    "slug": "mens-mental-health",
    "title": "Men and Mental Health: What Actually Gets in the Way",
    "excerpt": "A practical starting point for men considering therapy, with room for different needs, preferences, and experiences.",
    "date": "February 10, 2026",
    "category": "Men's Mental Health",
    "image": "/mens-mental-health.jpeg",
    "content": "A man considering therapy may not begin with a clear account of what he feels. He may begin with an argument, a relationship concern, irritability, or a sense that life has become narrower. That is enough to start a conversation.\n\nThere is no single way men experience distress. Gender expectations can matter, but so can family, culture, finances, health, relationships, and previous experiences with care. A useful approach asks about those influences rather than assuming the same story for everyone.\n\nCompetence and help can coexist\n\nBeing dependable may be important to you. Asking for support does not require abandoning that value. It can mean recognizing that a recurring problem deserves time, attention, and another perspective.\n\nYou do not need to arrive fluent in emotional language. We can start with a recent event: what happened, what you noticed, what you did, and what you wish had gone differently.\n\nDirectness is a preference to discuss\n\nSome clients want practical steps and candid feedback. Others need more time to think or build trust. Neither preference defines how a man should approach therapy. You can ask how a therapist works and say what helps you engage.\n\nLook beyond the explanation of a reaction\n\nUnderstanding anger, withdrawal, or overwork can help, but it does not automatically change the impact on other people. Work may involve practicing a different response, acknowledging harm, and following through outside sessions.\n\nIf there is aggression, coercion, or a substance-use concern that needs specialist treatment, the plan should address that directly. Individual psychotherapy is not a substitute for every service or level of care.\n\nWhat would make the work worthwhile?\n\nYour answer might be a conversation handled differently, less time consumed by worry, or greater ability to stay connected under stress. We can identify a focus and review whether the work is helping rather than promise a result based on gender or a set number of sessions.\n\nBayside offers virtual individual therapy to adults physically in California. A free 15-minute consultation is available to discuss your concerns and whether the practice is a fit.\n\nFurther reading\n\n<a href=\"https://www.nimh.nih.gov/health/topics/psychotherapies\" target=\"_blank\" rel=\"noopener noreferrer\">NIMH: understanding psychotherapy and choosing care</a>",
    "updatedDate": "October 27, 2026"
  },
  {
    "slug": "rupture-and-repair",
    "title": "Rupture and Repair: How Relationships Actually Heal",
    "excerpt": "No relationship is conflict-free. The couples and friendships that last aren't the ones that never fight. They're the ones that know how to find their way back to each other. Here's how rupture and repair actually works.",
    "date": "February 9, 2026",
    "category": "Relationships",
    "image": "https://images.squarespace-cdn.com/content/v1/67b28b6e1f96852c768d5fd2/1766355365248-ZHLYJ0YHVJF1HJPOMXFK/unsplash-image-qb85Joj59lw.jpg",
    "content": "Every relationship has moments of rupture. What determines whether a relationship deepens or erodes is not whether rupture happens, but what happens next.\n\nRupture is the moment something breaks. A misunderstanding. A missed bid for connection. A harsh tone. A boundary crossed. These moments are unavoidable in close relationships. Even healthy ones. The idea that strong relationships are conflict free is a myth. In reality, strong relationships are repair capable.\n\nRepair is not about fixing everything perfectly or saying the right thing immediately. It is about returning. About acknowledging impact. About staying engaged even when discomfort shows up.\n\nOne of the biggest misunderstandings about repair is timing. Many people try to repair too quickly. They apologize before they understand what happened. They push for resolution before emotions have settled. This often backfires, not because the intention is wrong, but because the nervous system is still activated. Repair requires enough space for both people to feel grounded again.\n\nAnother misconception is that repair should feel smooth. In practice, it often feels awkward. Clumsy. Uncertain. You might stumble over your words. You might say something imperfect. That does not mean you are failing. It means you are learning. Repair is a skill, and like any skill, it improves with repetition.\n\nWhat matters most is not eloquence, but sincerity and curiosity. Repair begins with responsibility, not defensiveness. That means being willing to acknowledge impact even if harm was unintentional. It means listening without immediately correcting or explaining yourself away.\n\nSome helpful questions during repair can include:\n\n• Can you help me understand what that moment was like for you?\n• What felt most hurtful or disconnecting?\n• Is there something you needed in that moment that you did not receive?\n• What would help rebuild trust here?\n\nThese are not scripts. They are invitations. The goal is not to interrogate or solve everything at once, but to reopen connection.\n\nIt is also important to remember that not all repair happens in words. Sometimes repair looks like changed behavior. Follow through. Consistency over time. A willingness to show up differently. Apologies without action often feel empty. Action without acknowledgment often feels dismissive. Repair works best when both are present.\n\nAnother key piece of repair is self repair. Before attempting to reconnect, it can be helpful to ask yourself what you are feeling and what you need to regulate first. Are you angry. Embarrassed. Afraid. Defensive. Slowing down enough to name this internally can prevent repair from turning into another rupture.\n\nRepair does not mean returning to the relationship exactly as it was. Sometimes it creates something new. A deeper understanding. Clearer boundaries. More honesty. In this way, rupture can become a turning point rather than a breaking point.\n\nTherapy often focuses on helping people learn how to repair, both with others and with themselves. Many of us were never taught these skills. We learned avoidance, escalation, or self blame instead. Repair offers a different path. One that values accountability without shame and connection without perfection.\n\nAt Bayside, repair work often involves experimentation. Trying new language. Noticing what lands and what does not. Adjusting timing. Learning to tolerate discomfort long enough to stay present. This process is rarely linear, but it is deeply impactful.\n\nIf you find that ruptures tend to linger, repeat, or lead to distance in your relationships, support can help. Repair is learnable. And with practice, relationships can become more resilient, not more fragile.\n\nLearning to navigate rupture and repair well is often central to <a href=\"/services/psychodynamic\" target=\"_blank\" rel=\"noopener noreferrer\">psychodynamic therapy</a>.\n\nIf you would like support learning how to navigate rupture and repair more intentionally, you are welcome to schedule a free consultation. We can explore what patterns show up for you and whether working together feels like a good fit.\n\nA limit to this advice\n\nRepair assumes that participation is voluntary and safe. You do not owe reconciliation after harm. In relationships involving coercion, threats, or violence, prioritize safety and appropriate specialist support rather than treating repair as a communication task.",
    "updatedDate": "October 27, 2026"
  },
  {
    "slug": "valentines-day-and-men",
    "title": "Valentine's Day and the Emotional Expectations Men Carry",
    "excerpt": "For many men, Valentine's Day isn't just about flowers and dinner. It's a minefield of unspoken expectations, self-doubt, and pressure to get it right. Here's what's really going on beneath the surface, and how to talk about it.",
    "date": "February 2, 2026",
    "category": "Men's Mental Health",
    "image": "https://images.squarespace-cdn.com/content/v1/67b28b6e1f96852c768d5fd2/1766354837947-4XS5RWRIXZP97CJ1XJYS/unsplash-image-O8-KhBqqI4Y.jpg",
    "content": "For many men, Valentine's Day is less about romance and more about pressure. Pressure to show up the right way, feel the right things, and not disappoint, even when no one has said exactly what is expected.\n\nValentine's Day is often framed as a celebration of love and connection. For a lot of men, though, it quietly brings up comparison, self doubt, and the sense of being evaluated. Whether partnered or single, the day can feel like a test that highlights what feels missing or unclear.\n\nSome men have learned to express care mainly through action; others relate to care differently. Show up. Provide. Do something tangible. On Valentine's Day, that expectation sharpens. There can be an unspoken belief that love must be demonstrated in a specific way, and that getting it wrong says something about who you are. When expectations stay vague but the pressure stays high, anxiety tends to fill the gap.\n\nFor men who are single, this time of year can bring up questions about worth and timing. Not just the absence of a relationship, but the feeling of being overlooked or behind. These thoughts are rarely shared out loud. Instead, they get internalized and quietly reinforced.\n\nFor men in relationships, the pressure often shifts rather than disappears. There may be concern about disappointing a partner or not reading emotional cues correctly. Even in strong relationships, Valentine's Day can amplify worries about adequacy or emotional availability. When those concerns are not named, they tend to turn inward.\n\nOne of the less discussed dynamics is how often men assume that not feeling connected to Valentine's Day means something is wrong with them. That they are emotionally unavailable, detached, or incapable of deeper intimacy. In reality, many men value consistency over performance. Love feels safer when it is steady rather than staged.\n\nNot participating in Valentine's Day does not mean you are disconnected from love. It may mean you relate to it differently. It may mean connection feels more authentic when it is not being measured. These differences are common, even if they are rarely acknowledged.\n\nTherapy can offer a place to unpack these expectations without judgment. It is not about learning how to perform romance correctly. It is about understanding where emotional pressure comes from and separating external expectations from internal values. That clarity often reduces anxiety and creates more room for genuine connection.\n\nAt Bayside, work with men often focuses on helping them understand what they actually want from relationships, rather than what they think they should want. This can shift how holidays like Valentine's Day are experienced, whether that means engaging differently or opting out altogether.\n\nThis is the kind of pattern <a href=\"/services/mens\" target=\"_blank\" rel=\"noopener noreferrer\">men's therapy</a> at Bayside is specifically built to work with.\n\nIf this season brings up pressure, doubt, or quiet frustration, support can help you make sense of it. If you would like to explore this work, you are welcome to schedule a free consultation. We can talk about what this time of year brings up for you and whether working together feels like a good fit.",
    "updatedDate": "October 27, 2026"
  },
  {
    "slug": "attachment-styles-in-relationships",
    "title": "Understanding Attachment Patterns Without Reducing People to Labels",
    "excerpt": "Use attachment language to explore relationship patterns without treating a label as a diagnosis, destiny, or excuse for harm.",
    "date": "January 26, 2026",
    "category": "Relationships",
    "image": "/attachment-styles.jpeg",
    "content": "Attachment language can help describe patterns around closeness, reassurance, and distance. It can also become a way to label yourself or a partner so completely that the actual relationship disappears from view.\n\nAn attachment style is not a diagnosis or a complete account of a person. Early relationships may be relevant, but later experiences, current circumstances, and the particular relationship also matter. One label cannot reliably tell you someone’s history or intentions.\n\nNotice the sequence before naming it\n\nYou might feel worried after a delayed reply, ask repeatedly for reassurance, and then feel more worried when the other person withdraws. Or you may want closeness and pull away when a conversation becomes emotionally demanding.\n\nThose are patterns to explore, not proof that you or your partner belongs to a fixed category. Ask what happened, how each person understood it, and what choices became difficult in that moment.\n\nUse a framework to open questions\n\nWhat does distance mean to you? What do you expect will happen if you express a need? What helps you remain present in disagreement? What is actually happening in the current relationship that needs attention?\n\nThese questions leave room for learning. Deciding that someone is avoidant and therefore incapable of connection, or anxious and therefore unreasonable, can close that room prematurely.\n\nKeep accountability and safety in view\n\nAttachment language does not excuse controlling behavior, threats, or repeated disregard for boundaries. A framework about closeness should not be used to persuade someone to tolerate harm or take responsibility for changing a partner.\n\nPatterns can be explored and changed\n\nTherapy can help you notice a familiar response, understand its context, and practice alternatives. Progress varies; gaining an explanation does not guarantee that a relationship will change or continue.\n\nBayside offers individual therapy for relationship concerns. The focus is your experience, choices, and safety. If you want joint couples work, ask about a provider who offers that service.\n\nBayside offers virtual individual therapy to adults physically in California. A free 15-minute consultation is available to discuss your concerns and whether the practice is a fit.\n\nFurther reading\n\n<a href=\"https://www.nimh.nih.gov/health/topics/psychotherapies\" target=\"_blank\" rel=\"noopener noreferrer\">NIMH: understanding psychotherapy and choosing care</a>",
    "updatedDate": "October 27, 2026"
  },
  {
    "slug": "rethinking-therapy-2026",
    "title": "Rethinking Therapy and Mental Health in 2026",
    "excerpt": "Therapy has changed. The couch, the notepad, the awkward silences? That's not what it looks like anymore. If stigma or outdated ideas have kept you from getting support, here's a clearer picture of what therapy in 2026 actually is.",
    "date": "January 26, 2026",
    "category": "Mental Health Education",
    "image": "https://images.squarespace-cdn.com/content/v1/67b28b6e1f96852c768d5fd2/1766352334066-T1QVIJH3AB4HFOYU5Q5R/unsplash-image-F9DFuJoS9EU.jpg",
    "content": "Most people are not avoiding therapy because they think it does not work. They are avoiding it because they are unsure what it actually involves and whether it is meant for someone like them.\n\nFor many people, the idea of therapy brings up hesitation. Not because they are opposed to growth, but because of the messages they absorbed over time. Phrases like \"others have it worse\", \"I should be able to handle this\", or \"therapy is only for people in crisis\" often linger quietly in the background. These beliefs are rarely questioned. They are shaped by family, culture, and lived experience.\n\nIn 2026, many people find themselves holding two truths at once. There is more openness around mental health than ever before, and there is still uncertainty. Skepticism. Questions about whether therapy applies to them, or whether it would actually help. That hesitation does not mean someone is closed off. It often means they are thoughtful and discerning.\n\nOne of the most common misunderstandings about therapy is that it is only for moments when life has completely fallen apart. In reality, many people begin therapy not because of a crisis, but because something feels off. They may be functioning well on the outside while feeling disconnected, overwhelmed, or stuck internally. Therapy is not only about fixing what is broken. It is often about understanding what you have been managing quietly and deciding whether it needs more support.\n\nAnother misconception is that therapy means being told what to do or endlessly revisiting the past. While insight can be helpful, therapy today is just as much about unlearning as it is about learning. Unlearning harsh self talk. Unlearning the habit of minimizing your needs. Unlearning the belief that rest, clarity, or support must be earned. Learning happens too, but it tends to be practical and grounded in your real life.\n\nAt Bayside, therapy is approached as a collaborative process. There is no script you are expected to follow and no version of yourself you are expected to become. Sessions are paced and intentional. We focus on understanding your experience as it is now, while also making sense of how it came to be. You are not asked to disclose everything at once or relive experiences before you feel ready. You move at a pace that feels safe and sustainable.\n\nPeople often ask what therapy actually feels like here. The simplest answer is that it feels grounded. Conversations unfold naturally. There is space to reflect, to notice patterns, and to speak honestly without needing to perform or justify yourself. Therapy is not about labeling you or reducing you to a diagnosis. It is about helping you understand yourself with more clarity so your choices feel less reactive and more intentional.\n\nMental health stigma often thrives in comparison and silence. Many people delay seeking support because they believe their struggles are not serious enough. But pain does not need to be extreme to matter. If something is affecting your relationships, your energy, or your sense of self, it deserves attention. Seeking support is not a failure of resilience. It is an expression of self awareness.\n\nA defining shift in mental health today is the move toward integration. Rather than separating strength from vulnerability or independence from support, therapy helps people hold complexity with more ease. In a culture that often prioritizes productivity over presence, therapy offers space to slow down and reconnect with what actually matters.\n\nIf you are curious about therapy but unsure whether it fits for you, that curiosity alone is a meaningful place to begin. You do not need the right words or a clear goal. You only need openness to exploring what support could look like.\n\nIf you would like to learn more about therapy at Bayside, you are welcome to schedule a free consultation. We can talk through your questions and see whether working together feels like a good fit."
  },
  {
    "slug": "beginning-again",
    "title": "Beginning Again in Your Own Time",
    "excerpt": "Not every new beginning announces itself. Sometimes change happens quietly, in the small decisions, the pauses, the moments when you finally stop pushing and start listening. Here's a different way to think about starting over.",
    "date": "January 19, 2026",
    "category": "Personal Growth",
    "image": "https://images.squarespace-cdn.com/content/v1/67b28b6e1f96852c768d5fd2/1766351301449-IMHYUW94L99RR3KEVHSL/unsplash-image-G_lwAp0TF38.jpg",
    "content": "A new year does not require urgency or reinvention. It offers an invitation to begin again in a way that honors your pace, your history, and what you are genuinely ready for.\n\nThe start of a new year often carries a quiet question: What now? For some, January brings motivation and clarity. For others, it brings pressure, comparison, or the sense that they should feel more ready than they do. Wanting a fresh start can feel hopeful and heavy at the same time.\n\nThat tension makes sense. The idea of beginning again is deeply human, but the way we frame it often leaves little room for gentleness.\n\nSome stories about the new year emphasize a clean break and rapid reinvention. Another way to imagine change is as a cycle, with periods of action, rest, and reflection. That is a metaphor you can use if it helps, not a rule about how a culture or person must experience time.\n\nApproaching a new year this way allows both truths to exist. You can want change without rejecting who you are now. You can hold hope without placing unrealistic expectations on yourself. Growth does not require pressure. It requires honesty.\n\nMany people struggle not because they lack discipline or motivation, but because they are trying to change without understanding what they are responding to. Patterns do not dissolve simply because a calendar changes. They soften when they are understood. When you slow down long enough to ask what you are ready to release and what you want to protect, direction begins to emerge naturally.\n\nRitual, relationships, and community can offer support for change. You might consider which practices in your own life create room for reflection and which expectations leave you feeling hurried.\n\nModern life rarely offers these containers. We are often asked to move forward without pause, to improve without rest, to carry old weight while striving for something new. Therapy can serve as a modern space for this ancient need.\n\nRather than pushing you toward a version of yourself you are supposed to become, therapy creates room to explore what feels aligned and what does not. It allows you to reflect on your values, notice recurring patterns, and clarify what kind of change feels sustainable. It is not about reinventing yourself. It is about understanding yourself more fully.\n\nAt Bayside, therapy is collaborative and paced. There is room to reflect without urgency, to consider change without judgment, and to move forward in a way that feels grounded rather than forced. Beginning again does not mean starting from nothing. It means choosing a new relationship with your time, your energy, and your expectations.\n\nAs this year unfolds, you may find it helpful to think less in terms of resolution and more in terms of intention. Not what you must fix, but what you want to nourish. Like the moon, growth happens in cycles. Some phases are visible. Others are quiet. All of them matter.\n\nIf you find yourself wanting support as you reflect on what this next chapter could look like, you are welcome to schedule a free consultation. We can explore what you are carrying, what you are ready to release, and whether working together feels like a good fit.",
    "updatedDate": "October 27, 2026"
  },
  {
    "slug": "setting-boundaries-in-relationships",
    "title": "Setting Boundaries When Saying No Is Difficult",
    "excerpt": "Everyone understands that boundaries are important. Most people who understand them conceptually still struggle to maintain them. The problem isn't information. It's something deeper.",
    "date": "January 13, 2026",
    "category": "Relationships",
    "image": "/boundaries.jpeg",
    "content": "Everyone agrees that boundaries are important. The internet has generated an extraordinary volume of content about how to set them. And yet most people who understand boundaries conceptually still struggle to maintain them in the relationships that matter most.\n\nThis is not because they lack information. It is because the standard advice about boundaries is incomplete in a specific way: it treats boundaries as a communication skill when they are actually, at root, a psychological one.\n\nWhat a Boundary Actually Is\n\nA boundary is not a rule you impose on another person. This is one of the most common and most consequential misunderstandings in the popular discourse around boundaries.\n\nYou cannot tell another person what they are allowed to do. You can tell them what you will and will not do in response to their behavior. That distinction is not semantic. It is the difference between a boundary that you actually control and a demand that depends entirely on the other person's compliance.\n\nA genuine boundary sounds like: if this continues, I will do this. Not: you need to stop doing this.\n\nThe first is something you can follow through on regardless of what the other person chooses. The second requires their cooperation and collapses entirely if they refuse.\n\nWhy Boundaries Feel So Hard to Set\n\nSetting a boundary with someone you care about requires tolerating their potential displeasure, disappointment, anger, or withdrawal. For people who grew up in environments where those responses were frightening or unbearable, where love felt conditional, where conflict threatened the relationship, where keeping the peace was a survival strategy, this tolerance is genuinely difficult to develop.\n\nDifficulty setting boundaries can have several contributors: earlier experiences, current safety, financial dependence, culture, and uncertainty about what to say. We can explore those influences without assuming one explanation fits everyone.\n\nThis is why information alone does not fix the problem. You can know exactly how to set a boundary and still find yourself unable to do it in the moment, because the moment activates something older and more powerful than the knowledge.\n\nThe People-Pleasing Pattern\n\nPeople-pleasing is not a character flaw. It is an attachment strategy. It developed in a specific relational context where the most reliable way to maintain connection was to prioritize other people's needs, manage their emotional states, and suppress anything that might create conflict or disappointment.\n\nFor many people, this strategy worked. It kept relationships intact. It earned love and approval. It is still running in adulthood, often without the person's awareness, because the nervous system does not automatically update its strategies just because the original context has changed.\n\nThe cost of chronic people-pleasing is predictable. Resentment accumulates. Needs go unmet and eventually stop being felt. The person becomes less and less visible in their own relationships, slowly replaced by the version of themselves that other people find most manageable. Eventually, the absence of self becomes its own crisis.\n\nThe Guilt That Follows Every Boundary\n\nGuilt can follow a boundary, but it does not prove the boundary was right or wrong. Consider the situation, your values, safety, and the effect of your response.\n\nThis seems counterintuitive. Shouldn't setting a healthy boundary feel good? Sometimes. But for people who learned that their needs are less important than other people's comfort, the act of prioritizing themselves activates a shame response that feels indistinguishable from having done something wrong.\n\nThe guilt is not evidence that the boundary was wrong. It is evidence that the boundary violated an old internal rule about what you are allowed to want. That rule was installed before you had any say in the matter. It is not the truth.\n\nLearning to act in accordance with your own needs while tolerating the guilt that follows is one of the central pieces of work in therapy for people with people-pleasing patterns. The goal is not to eliminate the guilt, which tends to reduce on its own over time. The goal is to stop letting it make decisions.\n\nWhen Someone Consistently Violates Your Boundaries\n\nThis is worth addressing directly because it is where the concept of boundaries most commonly breaks down.\n\nIf you have clearly communicated what you will and will not accept, and someone consistently ignores that, you are not facing a communication problem. You are facing an information problem. The information is about what that person is willing to offer and what they think of your needs.\n\nRepeating the boundary more clearly, more firmly, or in different words does not resolve this. The boundary was heard. The choice was made. What remains is your decision about what to do with that information.\n\nThis is genuinely hard. It is hard to accept what another person's repeated behavior is telling you about how they regard you. It is especially hard when the person is someone you love or depend on. Therapy can help you look at that information directly, understand what keeps you accepting what is not acceptable, and build the capacity to make decisions that are actually in your interest.\n\nBoundaries are not a communication technique. They are a form of self-knowledge translated into action. Knowing who you are, what you need, and what you will not accept, and being willing to act on that knowledge even when it is uncomfortable, is the work of a lifetime.\n\nBayside Wellness and Counseling works with adults navigating these patterns in individual therapy. A free consultation is available if you are ready to start.\n\nSafety matters\n\nIf there is coercion, threats, or violence, general boundary-setting advice may not be safe or sufficient. Seek appropriate specialist support rather than assuming a clearer statement will prevent harm.",
    "updatedDate": "October 27, 2026"
  },
  {
    "slug": "low-mood-depression",
    "title": "Low Mood, Depression, and the Space Between",
    "excerpt": "There's a space between feeling fine and being depressed, and a lot of people live there without knowing what to call it. If you've been feeling low but aren't sure it 'counts,' this post is for you.",
    "date": "January 12, 2026",
    "category": "Depression and Mood",
    "image": "https://images.squarespace-cdn.com/content/v1/67b28b6e1f96852c768d5fd2/1766348432461-CLU9B3CYYK6LCYFWHXBK/unsplash-image-ZnLprInKM7s.jpg",
    "content": "Feeling down is part of being human. Understanding when that feeling shifts into something that needs care can make a meaningful difference in how you respond to yourself.\n\nThere are times of year when energy drops without much warning. Mornings feel heavier. Motivation fades. Things that usually bring interest or relief feel distant. You may still be functioning, still showing up, still doing what needs to be done, yet something inside feels muted or weighed down.\n\nFor many people, especially during the darker months, this experience is familiar. Feeling low does not automatically mean something is wrong. Our bodies and minds respond to light, routine, stress, loss, and pace. A dip in mood can be a natural response to a demanding season or a signal that something needs attention.\n\nThe challenge is knowing where the line is. When is this just a difficult stretch, and when might it be time to get support?\n\nLow mood often shows up as tiredness, irritability, disconnection, or a sense of going through the motions. You might still find moments of enjoyment. You might feel better after rest, connection, or a change of scenery. Even when things feel heavy, there is usually some flexibility in how the day unfolds.\n\nDepression tends to feel different. It is not simply sadness. It often comes with a sense of numbness or emptiness that does not lift easily. Motivation drops significantly. Sleep and appetite may change. Concentration becomes difficult. There can be a persistent sense of hopelessness, worthlessness, or feeling like a burden. The world can feel flat, distant, or overwhelming all at once.\n\nWhat matters most is not the label, but the impact. If your mood is interfering with your ability to care for yourself, maintain relationships, or feel any sense of relief, it may be time to reach out. If weeks pass and the heaviness does not ease, or if it continues to deepen, that is information worth taking seriously.\n\nIt is also important to name that depression does not always announce itself loudly. Many people continue to function at work, meet obligations, and appear fine on the outside while struggling internally. This is especially common for people who are used to pushing through or minimizing their own needs.\n\nSeeking support is not a sign that things have fallen apart. It is often a sign that you are paying attention.\n\nSupport does not have to begin with certainty. Many people consider therapy not because they know exactly what is wrong, but because something feels off, heavier, or harder than it used to be.\n\nTherapy can offer a place to slow down and make sense of that experience. Rather than rushing to label what you are going through, the work often begins with understanding. What has changed. What has stayed the same. What feels manageable and what does not. Over time, patterns emerge that help clarify whether what you are experiencing is a temporary low point, a response to stress or loss, or something that may benefit from more consistent support.\n\nAt Bayside, therapy is collaborative and paced. There is room to talk, but also room to reflect and notice how your inner experience connects with what is happening in your life. The goal is not to pathologize normal emotional responses or push you toward a diagnosis. It is to help you feel more grounded, more resourced, and better able to respond to yourself with care.\n\nIf you are unsure whether what you are feeling warrants support, that uncertainty itself can be a starting point.\n\nIf you would like to talk through what you have been experiencing, you are welcome to schedule a free consultation. We can explore what support might be helpful and whether working together feels like a good fit.\n\nIf you are experiencing thoughts of harming yourself, feeling like you do not want to exist, or believing that others would be better off without you, it is important to seek immediate support. In the United States, you can call or text 988 to reach the Suicide and Crisis Lifeline at any time. You can also go to your nearest emergency room if you are in immediate danger.\n\nFurther reading\n\n<a href=\"https://www.nimh.nih.gov/health/publications/depression\" target=\"_blank\" rel=\"noopener noreferrer\">NIMH explains depression and treatment options.</a> Symptoms can have several contributors; a mental health or medical assessment can help clarify the picture.",
    "updatedDate": "October 27, 2026"
  },
  {
    "slug": "dream-bigger-2026",
    "title": "Dreaming Big in 2026",
    "excerpt": "Most people don't lack ambition. They lack clarity. If you've been going through the motions but sensing there's something more, this post is about what it looks like to actually build the life you've been imagining.",
    "date": "January 5, 2026",
    "category": "Personal Growth",
    "image": "https://images.squarespace-cdn.com/content/v1/67b28b6e1f96852c768d5fd2/1764700039859-HVX3VR21TGNM05TDONQ0/unsplash-image-PSnkh76C-Z8.jpg",
    "content": "What if your biggest dream for 2026 is not unrealistic, but overdue.\n\nYou are allowed to want more from your life than what you have settled for.\n\nDreams are not fantasies, they are directions, and 2026 is asking you to finally listen.\n\nA new year has a way of asking us to look forward. To pause and wonder who we might become if we allowed ourselves to dream a little bigger. Not just survive, but expand. Not just continue, but choose with intention. January is a doorway, and walking through it with vision gives us direction and momentum before doubt has a chance to speak.\n\nSigmund Freud wrote that dreams are the royal road to the unconscious. He believed they reveal unspoken wants and buried wishes. Whether or not we follow every piece of his theory, there is something undeniably powerful about the idea that we dream in the direction of who we could be. Our dreams often know us before we fully know ourselves. They point toward longing, potential, and possibility.\n\nSo what happens when we stop treating dreaming as a distant concept and start treating it as guidance. Not fantasy, but information. Not escape, but blueprint.\n\nSome people hold back after learning that wanting more leads to disappointment. Others face practical barriers that a change in confidence alone cannot remove. To stay safe. To want less. Big dreams can feel risky, vulnerable, or unrealistic, especially if life has taught you to avoid disappointment. But dreaming is not about perfection. It is about movement. It is about letting yourself imagine a life that fits you rather than a life you simply fit into.\n\nWhen you allow yourself to think big at the start of a year, you give yourself direction instead of drifting. You choose where you want to go instead of waiting for life to decide for you. A big dream is not demanding or reckless. It is an anchor. It gives you something to move toward slowly, steadily, compassionately.\n\nDreaming big does not require that you have everything figured out. You only need clarity on what you want to feel more of. Connection. Creativity. Stability. Purpose. Growth. Peace. Most dreams begin as feelings, not details. The plan can come later. First you listen to the whisper of possibility.\n\nTherapy can be a powerful space to explore these visions. It can help you make sense of what you want and what has been getting in the way. Together we can look at old narratives that keep you small, fears that hold you back, or protective habits that once served you but no longer do. Dreaming is the spark. Therapy is the structure that helps you follow through.\n\nMaybe you want to start something new this year. Maybe you want to restore something that was lost. Maybe you want to finally step toward an idea that has lived in you for years. You do not have to navigate that alone. Support makes the path clearer. Accountability makes it real. Courage grows when it has somewhere safe to land.\n\nIf you feel ready to dream a little louder in 2026, it would be an honor to walk with you. You are welcome to reach out and schedule a free consultation so we can explore what you want to build, who you are becoming, and how therapy can help you move confidently in that direction.",
    "updatedDate": "October 27, 2026"
  },
  {
    "slug": "starting-new-year-with-intention",
    "title": "Beginning Again: Stepping Into a New Year With Intention",
    "excerpt": "Resolutions fade. Intentions stick. The difference isn't willpower. It's how you approach change from the start. Here's how to step into the new year with more clarity and less pressure.",
    "date": "December 29, 2025",
    "category": "Personal Growth",
    "image": "https://images.squarespace-cdn.com/content/v1/67b28b6e1f96852c768d5fd2/1764023078154-CEA4CMD323KA6YW3TZND/unsplash-image-LLcAJbEh1_Q.jpg",
    "content": "A new year does not erase what came before, but it does create a moment to listen more closely to your life. It invites you to notice what no longer feels right and what you may be ready to grow into. That awareness is often where meaningful change begins.\n\nMany people enter January with a mix of hope and hesitation. You might feel energized by the promise of a fresh start, yet uncertain about how to move forward. You might be excited for new possibilities but still carrying the weight of unfinished chapters. This blend of emotion is natural. Change is rarely simple, and it rarely follows a straight line.\n\nStill, the beginning of a new year offers a rare kind of clarity. It gives you a chance to meet yourself honestly and consider what you truly want for the months ahead.\n\nSetting intentions is one of the most powerful ways to step into the new year with purpose. Intentions are different from resolutions. They are not demands or rigid expectations. They are commitments to yourself. They reflect what you value, what you want to nurture, and how you want to show up in your relationships, your work, and your own internal life. Intentions guide your choices in a way that honors who you are becoming, rather than pushing you into goals that do not fit.\n\nThis is a good time to revisit the commitments you made in the past. Not in a way that judges you, but in a way that asks what still matters to you. Sometimes commitments fade because they were unrealistic. Sometimes they were rooted in old fears or old expectations. But sometimes they faded simply because you were overwhelmed or stretched too thin. When you take a moment to reflect, you can see which goals still resonate and which ones no longer need space in your life.\n\nClarity often emerges in the quiet moments. It might show up during a morning walk, while journaling, or in a conversation with someone who sees you clearly. Clarity is not always dramatic. Sometimes it arrives in a soft realization that you want more balance. More connection. More courage. More honesty with yourself. Sometimes clarity is the recognition that you are ready to stop carrying something that has been heavy for too long.\n\nThe new year invites you to imagine what your life could feel like if you allowed yourself to grow in the direction you have been quietly hoping for. This might mean pursuing a creative dream you set aside. It might mean creating healthier boundaries. It might mean choosing rest instead of burnout. It might mean showing up more fully in your relationships or allowing yourself to seek the support you have been putting off. Whatever it looks like, your future does not need to match your past.\n\nFollowing through on your intentions does not require perfection. It requires consistency.\n\nSmall steps taken steadily will carry you much farther than a burst of motivation that fades within a week. The key is to treat yourself with patience. Growth happens when you allow yourself the space to try, to adjust, and to begin again when needed.\n\nA supportive community can also help you stay aligned with your intentions. Change feels more possible when someone is walking beside you. This does not mean you need a large group. Even one or two trusted people can make a meaningful difference. Having someone who listens, encourages your growth, and holds you accountable can turn your intentions into real change.\n\nTherapy can be a powerful place to explore these ideas. It offers room to slow down and reflect on what you want, what has been getting in the way, and how you can move forward with intention and confidence. With the right support, you can step into the new year feeling more grounded, more focused, and more connected to your own sense of direction.\n\nIf you would like support as you step into the year ahead, you are welcome to reach out and schedule a free consultation. Together, we can explore whether we are a good fit and what you might need moving forward."
  },
  {
    "slug": "beginners-guide-to-ifs",
    "title": "A Beginner’s Guide to IFS and Your Inner World",
    "excerpt": "You are not one thing. Inside each of us are different parts: some protective, some wounded, some that have been running the show for years without us realizing it. Internal Family Systems is a way to finally meet them all.",
    "date": "December 22, 2025",
    "category": "Therapy Education",
    "image": "https://images.squarespace-cdn.com/content/v1/67b28b6e1f96852c768d5fd2/1764709669342-IJL8VHRIS5OXFR3CQPMD/vadim-sherbakov-osSryggkso4-unsplash.jpg",
    "content": "What if your emotions are not problems to fix, but messages you have not yet translated.\n\nThe holidays often stir up a mix of experiences. You might feel excited to be around family, hopeful to reconnect, or eager to create meaningful moments with the people you care about. Yet at the same time, another feeling may settle in. You might notice a pull toward solitude, a desire to be quiet, a heaviness in your chest, or a sadness that arrives without asking.\n\nInternal Family Systems, often called <a href=\"/services/ifs\" target=\"_blank\" rel=\"noopener noreferrer\">IFS</a>, is a therapeutic approach that helps us make sense of this emotional complexity. The model uses the language of parts to describe different inner experiences; it is a therapeutic framework, not a claim that you are literally separate people. Some parts want connection and closeness. Others want distance and safety. Some parts are confident and capable. Others carry pain, shame, or fear.\n\nThese parts are not flaws. They are responses. Some may be understood in relation to earlier experiences or ways of coping, without assuming every reaction has a single historical cause. A part that avoids conflict may have learned that arguments were dangerous. A part that works constantly may have learned that love was earned, not given. A part that feels sad may hold the weight of something unresolved.\n\nDuring the holidays, these inner parts often speak more loudly. The pressure to be cheerful can activate the parts of us that feel lonely or disconnected. The desire to belong can activate parts that fear rejection. The wish for closeness can activate parts that remember times when closeness did not feel safe.\n\nIFS offers a way to meet these experiences without getting swallowed by them. One of its simplest and most helpful practices is learning how to identify and name your parts. Instead of saying I am sad, you might say a part of me feels sad. That small shift creates space. It allows you to feel an emotion without becoming defined by it.\n\nIf you are comfortable, you can try a brief reflection while reading this. You can stop or turn attention back to the room if focusing inward increases distress. This reflection is not a substitute for treatment.\n\nTake a moment to notice what you are feeling right now. There may be something obvious or something faint. See if you can locate that feeling in your body. Is it in your chest, your stomach, your throat. Let your awareness rest there without forcing anything.\n\nNow ask yourself, with gentle curiosity, what this feeling might be trying to communicate. What does it need. What is its job. How long has it been carrying this responsibility. Does it make sense that it feels the way it does.\n\nYou do not need to fix anything. You do not need to analyze. Simply see if you can extend a small amount of understanding toward that experience. The goal is not to push it away, but to meet it with sincerity.\n\nThis simple practice can help you start to unblend from your emotions. Instead of being swept away by them, you can relate to them. Instead of collapsing into sadness, you can say a part of me feels sad because something mattered to me and something hurt.\n\nOver time, these conversations with your inner world can reveal meaningful stories. Not in a dramatic sense, but in a human one. You might notice that some parts are trying to protect you. Some are trying to prevent disappointment. Some are grieving losses that were never acknowledged.\n\nIFS is not about erasing parts or forcing positivity. It is about relationship. It is about knowing yourself with depth and compassion. The aim is a more curious relationship with your experience. It does not require accepting a particular explanation or guarantee a particular result.\n\nIf you are interested in learning how to work with your inner world in a supportive way, therapy can offer a safe place to explore these experiences. You are welcome to reach out and schedule a free consultation. Together, we can explore whether we are a good fit and what support might be helpful in the year ahead.",
    "updatedDate": "October 27, 2026"
  },
  {
    "slug": "beginners-guide-to-emdr",
    "title": "A Beginner’s Guide to EMDR: The Approach and Its Limits",
    "excerpt": "An introduction to EMDR, including assessment, preparation, memory-focused work, and questions to ask about fit.",
    "date": "December 15, 2025",
    "category": "Therapy Education",
    "image": "https://images.squarespace-cdn.com/content/v1/67b28b6e1f96852c768d5fd2/1764529256082-6V62KAWQPNAE2Z54FA98/bennie-bates-G7Iu5NDlMVY-unsplash.jpg",
    "content": "EMDR stands for Eye Movement Desensitization and Reprocessing. It is a structured psychotherapy used in treatment of PTSD. A consultation can help you ask whether an assessment for trauma-focused treatment makes sense for your concerns.\n\nWhat the approach involves\n\nEMDR includes history-taking, preparation, selecting treatment targets, and working with memories using bilateral stimulation such as guided eye movements. The eye movements are one part of a broader process, not a standalone exercise that should be assumed to treat every distressing experience.\n\nDuring processing, attention may move among a memory, associated thoughts, emotion, and physical sensations. Your therapist should explain what is proposed, discuss how to pause, and check how you are responding.\n\nPreparation is part of treatment\n\nProcessing does not have to begin in the first appointment. Assessment can consider current safety, coping, symptoms, support, and whether this method is appropriate. Some people need more preparation or a different approach.\n\nThere is no requirement to prove that an experience was serious enough before asking for help. There is also no reason to assume every current reaction comes from an unprocessed memory.\n\nWhat EMDR does not promise\n\nIt does not erase events or guarantee that you will never feel distressed by them. The mechanisms involved are still being studied. Metaphors about filing away memories or resetting the nervous system should not be presented as a complete, settled explanation.\n\nHow long treatment takes depends on the assessment, your goals, the scope of the concerns, and your response. A practice should not promise a session count or suggest that slow progress means you have done something wrong.\n\nQuestions you can bring\n\nAsk about the therapist’s training, why EMDR is being recommended, how preparation works, and what alternatives are available. For virtual care, ask about privacy, the practical setup, and what happens if the connection is interrupted.\n\nAt Bayside, a brief consultation can discuss fit and practical questions. It is not a trauma-processing session.\n\nBayside offers virtual individual therapy to adults physically in California. A free 15-minute consultation is available to discuss your concerns and whether the practice is a fit.\n\nFurther reading\n\n<a href=\"https://www.ptsd.va.gov/understand_tx/emdr.asp\" target=\"_blank\" rel=\"noopener noreferrer\">VA National Center for PTSD: EMDR for PTSD</a>",
    "updatedDate": "October 27, 2026"
  },
  {
    "slug": "mindfulness-for-anxiety",
    "title": "What Mindfulness Can and Cannot Do for Anxiety",
    "excerpt": "Mindfulness can be useful for some people and uncomfortable for others. Explore its purpose, limits, and place in a broader care plan.",
    "date": "December 8, 2025",
    "category": "Anxiety",
    "image": "/mindfulness-anxiety.jpeg",
    "content": "Mindfulness can be a way to notice an anxious thought without immediately treating it as a fact or an instruction. For some people, that pause is helpful. For others, a particular practice may feel frustrating, activating, or difficult to use.\n\nIt should not be sold as a universal solution or dismissed as merely superficial. The question is whether a practice is useful for you, for this concern, in this context.\n\nKeep the first experiment small\n\nYou might notice the room around you, the feeling of your feet on the floor, or a sound outside. An exercise does not have to involve closing your eyes, controlling your breathing, or sustaining attention for a long period.\n\nIf focusing inward increases distress, you can stop, open your eyes, or shift attention outward. Difficulty with a practice is not evidence that you are bad at therapy or not trying hard enough.\n\nAsk what the practice is intended to do\n\nIs it helping you observe worry, return to a task, or stay present during a difficult conversation? A concrete purpose makes it easier to evaluate than a vague promise to regulate your entire nervous system.\n\nMindfulness research involves different practices and programs. A finding about one structured intervention should not be turned into a guarantee about every breathing exercise or app.\n\nPlace it within a broader plan when needed\n\nPersistent anxiety may need assessment and a treatment plan that addresses avoidance, repeated reassurance, current stress, or other concerns. Trauma-focused treatment may be relevant for some people, but a difficulty meditating does not establish that EMDR must come first.\n\nTalk about the response you actually have\n\nIf a therapist suggests a practice, you can describe what happens when you try it. The plan should be open to adjustment. A useful tool supports your goals; it does not become another requirement you must endure to earn relief.\n\nBayside offers virtual individual therapy to adults physically in California. A free 15-minute consultation is available to discuss your concerns and whether the practice is a fit.\n\nFurther reading\n\n<a href=\"https://www.nccih.nih.gov/health/meditation-and-mindfulness-effectiveness-and-safety\" target=\"_blank\" rel=\"noopener noreferrer\">NCCIH: mindfulness, effectiveness, and safety</a>",
    "updatedDate": "October 27, 2026"
  },
  {
    "slug": "holiday-stress-loneliness",
    "title": "When the Holidays Don't Feel the Way They Are Supposed To",
    "excerpt": "For many people the holidays aren't the most wonderful time of the year. They're the hardest. If you're feeling heavy, lonely, or emotionally overwhelmed this season, you're not alone and you don't have to push through it.",
    "date": "December 1, 2025",
    "category": "Seasonal Support",
    "image": "https://images.squarespace-cdn.com/content/v1/67b28b6e1f96852c768d5fd2/1764018817651-U02ZML8OU74W5RX8SRF4/bryan-heng-ubrkiCBqk1g-unsplash.jpg",
    "content": "The holidays arrive with a familiar storyline. They are supposed to be bright, cheerful, warm, and full of connection. For some people, that is true. There are moments that genuinely feel comforting or joyful.\n\nBut there is another side to this season that many people carry quietly. December can bring a mix of emotions that do not match the music in stores or the cheerful tone of holiday cards. Grief returns without warning. Loneliness deepens. Old family patterns reappear with surprising strength. Even people who usually love this time of year can feel a heaviness they struggle to name.\n\nIf this feels familiar, it does not mean you are doing the holidays wrong. It simply means you are human.\n\nThere is something about this time of year that pulls emotions closer to the surface. A memory sneaks in during a quiet afternoon. A certain song opens something tender. A sense of pressure builds, telling you to be joyful even when something inside you feels unsettled. Most people do not talk about this, but many experience it.\n\nHuman emotions rarely fit into clean categories. You can miss someone and still appreciate a warm moment with a friend. You can feel grateful for what you have and still feel worn down. You can look forward to the new year and still be carrying a sadness that does not let go easily. These contradictions are not evidence of instability. They are signs that you are paying honest attention to your inner experience.\n\nThe holidays also tend to activate older emotional patterns. Family roles snap back into place. Financial worries sharpen. The absence of someone important becomes more pronounced. And underneath it all, the parts of you that learned to cope early in life begin to stir. The part that wants to please. The part that longs to belong. The part that remembers moments from past holidays that were difficult.\n\nThis is not regression. It is recognition. These parts are not trying to pull you into the past. They are trying to be acknowledged in the present.\n\nWe often hear about holiday self care in terms of candles, spa days, and treats. Those things can be soothing, but they are not the kind of care most people truly need in December. Real care is usually quieter. It looks like pausing long enough to ask yourself what is actually happening inside. It looks like noticing tension before it becomes burnout. It looks like being honest about sadness instead of sweeping it aside. It looks like allowing yourself to feel what you feel.\n\nConnection also does not need to resemble the scenes we see in movies. It does not have to be big or loud. Often the most meaningful forms of connection are simple. A slow walk with someone you trust. A short, grounding conversation. A moment where you feel seen. Sometimes real connection is giving yourself permission to step away from something overwhelming. Sometimes it is reaching out for help.\n\nIf your feelings feel unusually close to the surface right now, treat that as information rather than something to hide or judge. Loneliness might be pointing toward a desire for deeper or more authentic relationships. Sadness might be reminding you of a grief that wants space. Anxiety may be nudging you to set a boundary you have been avoiding. Tenderness might be showing you that your heart is more open than you thought.\n\nWhatever is showing up for you, it is not a sign of weakness. It is a sign that your inner world is asking for care.\n\nIf this season feels heavier or more complicated than you expected, you do not have to go through it alone. You do not need to pretend. You do not need to push through it without support. You deserve help that allows you to feel grounded and understood, not just during the holidays but in the year ahead.\n\nIf you would like support as you move through this time, you are welcome to reach out and schedule a free consultation. Together, we can explore whether we are a good fit and what you might need moving forward."
  },
  {
    "slug": "managing-holiday-stress",
    "title": "The Holiday Relationship Trap: Why Family Visits Are So Hard",
    "excerpt": "You are forty years old and successful and have built a life you are proud of. You walk into your parents' house and within twenty minutes you are sixteen again. This is not regression. It is neurology.",
    "date": "November 24, 2025",
    "category": "Relationships",
    "image": "/holiday-family.jpeg",
    "content": "The holidays have a specific kind of difficulty that is different from ordinary stress. It is not the logistics, though those are real. It is not the expense, though that accumulates. It is something more disorienting: the experience of returning to a family system and finding that something in you returns with it.\n\nYou are forty years old and successful and have built a life you are genuinely proud of. You walk into your parents' house and within twenty minutes you are sixteen again. The old dynamic is running. The familiar role has snapped back into place. You are reacting in ways you thought you had moved past.\n\nFamiliar settings can bring up old expectations and reactions. That does not mean your response has one inevitable biological explanation. And understanding it makes the holidays significantly more navigable.\n\nWhy Family Systems Pull You Back\n\nFamily systems are among the most powerful organizers of human behavior. They develop over years, even decades, and they are maintained by subtle, often invisible forces: the way certain topics get changed, the way certain people's emotions set the temperature of a room, the unspoken agreements about who plays what role and what cannot be said.\n\nWhen you leave a family system and build your own life, you develop new patterns, new responses, new ways of being in the world. Therapy, personal development, and the simple maturation of adulthood all contribute to genuine change.\n\nWhat does not automatically change is the family system itself. It has been running without you. And when you return, it does not update to reflect who you have become. It pulls you back toward the role it knows.\n\nThe oldest sibling becomes the responsible one again. The family mediator starts managing tension. The one who was always too sensitive finds their sensitivity treated as the problem. Some responses may feel automatic, while others involve choices and current pressures. Noticing the pattern can create room to consider another response.\n\nThe Specific Dynamics That Make Holidays Hard\n\nSeveral dynamics recur with particular consistency during family gatherings.\n\nTriangulation: the tendency to involve a third party in a conflict between two people. Your mother tells you about her frustration with your sibling rather than addressing it directly. You are put in the position of managing a relationship you are not actually part of. The holiday becomes organized around managing a triangle rather than having genuine connection.\n\nRole lock: the experience of being seen and responded to as the person you were rather than the person you are. Your achievements are minimized by people who still see you through an old lens. Your opinions carry less weight than they would in any other context. The identity you have built feels invisible.\n\nEmotional contagion: the way one person's unregulated emotional state spreads through a family system. One family member's anxiety, anger, or grief can set the emotional tone for everyone else. People who are sensitive to others' emotional states may spend the entire gathering managing their own response to what is circulating in the room.\n\nUnresolved history: the way old conflicts, old dynamics, and old wounds surface when the people involved are in the same room. The holidays have a particular capacity to bring up what has not been resolved because they are saturated with meaning and expectation.\n\nWhat You Can Actually Control\n\nYou cannot change the family system during a holiday visit. That is worth saying clearly, because a significant amount of pre-holiday anxiety is generated by the hope or intention to have a different kind of family gathering than history suggests is likely.\n\nWhat you can do is change your participation in the system.\n\nYou can decide in advance which roles you are not willing to play this year. You can identify your specific triggers and prepare responses rather than reactions. You can set clear limits on how long you will stay and what you will and will not engage with. You can create moments of genuine connection with the people in your family with whom connection is actually possible, rather than spending the visit trying to have connection with people who are not capable of offering it.\n\nYou can also give yourself permission to have whatever feelings the visit generates without adding a layer of judgment about having them. Grief that your family cannot be different. Frustration at being pulled back into old patterns. Sadness about what was never there and may never be. These are legitimate responses to a legitimate situation.\n\nThe Work That Actually Changes Things\n\nWork outside a family gathering can give you more time to consider what you want to do differently. Individual therapy can explore familiar expectations, roles, and responses without promising that your own changes will transform everyone else’s behavior.\n\nThis is not about blame. It is about understanding what was learned and whether it still serves you. The mediator who learned to keep the peace because conflict was genuinely dangerous can learn to let people manage their own conflicts. The sensitive one who learned to minimize their experience to avoid burdening others can learn that their experience is not a burden. The achiever whose worth was always contingent on performance can learn that they are enough without the resumé.\n\nThis work does not happen over one holiday season. It happens over time, in a consistent therapeutic relationship, one pattern at a time.\n\nIf the holidays bring up more than manageable stress, if you find yourself dreading them, or leaving them depleted in ways that take weeks to recover from, or recognizing patterns you have been carrying for decades and are ready to address, Bayside Wellness and Counseling offers individual therapy focused on exactly this kind of work. A free consultation is available.",
    "updatedDate": "October 27, 2026"
  },
  {
    "slug": "family-therapy-benefits",
    "title": "Working on Family Concerns in Individual Therapy",
    "excerpt": "How individual therapy can address family concerns, what it cannot promise, and when joint family work or specialist support may be more appropriate.",
    "date": "November 10, 2025",
    "category": "Relationships",
    "image": "/family-therapy.jpeg",
    "content": "A family concern can be approached in more than one way. Joint family therapy and individual therapy serve different purposes; neither should be described as universally better or more durable.\n\nAt Bayside, the services described are individual therapy for adults. That can include family stress, parenting concerns, or the effects of earlier relationships. It does not mean the whole family attends or that individual work can change everyone else’s behavior.\n\nWhat you can work on individually\n\nYou can explore how you respond during conflict, what you need from a relationship, and where a boundary might be necessary. You might examine a familiar role, such as mediating every disagreement, and consider what happens when you participate differently.\n\nThose choices may influence a relationship, but the response of other people remains outside your control. A difficult relationship is not proof that you have failed to do enough personal work.\n\nParents can seek support without accepting blame\n\nParenting can bring up stress, grief, anger, and uncertainty. Individual therapy can make room for those experiences and support reflection on how you respond. It should not promise that a parent’s treatment alone will resolve a child’s difficulties.\n\nA child’s needs may require their own assessment, school support, medical care, or a family-based intervention. Asking about those options can be part of responsible planning.\n\nWhen another service may fit better\n\nJoint work may be useful when the goal requires several people to participate and that format is appropriate and safe. A provider who offers family or couples therapy can assess that option. When there is coercion, violence, or abuse, safety and specialist support take priority over general communication work.\n\nKeep the focus realistic\n\nIndividual therapy can help you understand your experience and make decisions about your own participation. It cannot diagnose an absent family member or guarantee reconciliation. Sometimes a useful outcome is a clearer boundary or a more realistic expectation, rather than everyone agreeing.\n\nBayside offers virtual individual therapy to adults physically in California. A free 15-minute consultation is available to discuss your concerns and whether the practice is a fit.\n\nFurther reading\n\n<a href=\"https://www.nimh.nih.gov/health/topics/psychotherapies\" target=\"_blank\" rel=\"noopener noreferrer\">NIMH: understanding psychotherapy and choosing care</a>",
    "updatedDate": "October 27, 2026"
  },
  {
    "slug": "emdr-trauma-therapy-guide",
    "title": "What to Ask About a Course of EMDR Therapy",
    "excerpt": "What assessment, preparation, processing, and review can involve in EMDR treatment, without promising a fixed session count.",
    "date": "October 27, 2025",
    "category": "Therapy Education",
    "image": "/emdr-guide.jpeg",
    "content": "Knowing that EMDR involves eye movements does not tell you what a course of treatment will feel like. A more useful starting point is the sequence of decisions, preparation, and review that surrounds memory-focused work.\n\nAssessment and a shared plan\n\nThe first task is to understand your concerns, history, daily functioning, and goals. Current safety, symptoms, supports, and other treatment needs matter. EMDR may be an option, but that decision should follow assessment rather than a promise made from a symptom list.\n\nYou can ask why a particular memory or concern is being proposed as a focus. A plan should be understandable and open to questions.\n\nPreparation and pacing\n\nPreparation can include learning about the method, ways to remain oriented, a signal to pause, and a plan for after the session. This is part of treatment rather than an obstacle to the real work.\n\nYou do not have to push through escalating distress to demonstrate readiness. If the pace is too much, that response belongs in the clinical discussion.\n\nWorking with a selected memory\n\nWhen processing is appropriate, the therapist helps you attend to aspects of a selected memory while using bilateral stimulation. You may notice images, beliefs, feelings, or physical sensations. EMDR does not generally require a detailed spoken account of every aspect of an experience, but it can still be emotionally demanding.\n\nClosure and review\n\nThe session needs time to close, whether or not a target feels resolved. Discuss what to do if distress or new material appears afterward, what contact is available, and when more immediate support is needed. Do not assume any worsening is simply necessary processing.\n\nLater sessions review your response and the plan. That may involve continuing a target, revisiting preparation, or considering another approach or level of care.\n\nExpectations without a deadline\n\nEMDR has an established role in PTSD treatment. That does not mean every concern requires it or that every person has the same result. Treatment length varies, and claims about guaranteed relief in a particular number of appointments are not a substitute for assessment.\n\nFor remote sessions, privacy, a suitable setting, and a plan for interruptions are also part of deciding whether the format fits.\n\nBayside offers virtual individual therapy to adults physically in California. A free 15-minute consultation is available to discuss your concerns and whether the practice is a fit.\n\nFurther reading\n\n<a href=\"https://www.ptsd.va.gov/understand_tx/emdr.asp\" target=\"_blank\" rel=\"noopener noreferrer\">VA National Center for PTSD: EMDR for PTSD</a>",
    "updatedDate": "October 27, 2026"
  }
];

// ========================================
// UTILITIES
// ========================================

function useScrollReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const target = ref.current;
    if (!target || typeof IntersectionObserver === "undefined" ||
        window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) {
      setVisible(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      // Reveal tall sections as soon as they enter the viewport.
      { threshold: 0 }
    );
    observer.observe(target);
    return () => observer.disconnect();
  }, []);
  return [ref, visible];
}

// ========================================
// NAVIGATION
// ========================================

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { darkMode, toggleDarkMode } = useDarkMode();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const navLinks = [
    { name: "About", path: "/about" },
    { name: "Services", path: "/services" },
    { name: "FAQ", path: "/faq" },
    { name: "Blog", path: "/blog" },
    { name: "Contact", path: "/contact" },
  ];

  const handleNavigate = (path) => {
    navigate(path);
    setMenuOpen(false);
    window.scrollTo(0, 0);
  };

  // Dark background pages need solid nav background
  const currentPath = location.pathname;
  const darkPages = ["/about", "/contact"];
  const isDarkPage = darkPages.includes(currentPath)
    || blogPosts.some((post) => currentPath === `/blog/${post.slug}`);
  const needsSolidBg = scrolled || isDarkPage;
  
  const theme = getTheme(darkMode);

  return (
    <>
      {/* Skip to main content link for keyboard navigation */}
      <a 
        href="#main-content"
        style={{
          position: "absolute",
          left: "-9999px",
          zIndex: 999,
          padding: "8px 16px",
          background: theme.accent,
          color: darkMode ? theme.bg : colors.white,
          fontFamily: "'DM Sans', sans-serif",
          fontSize: 14,
          fontWeight: 500,
          textDecoration: "none",
          borderRadius: 2,
          transition: "all 0.3s ease",
        }}
        onFocus={(e) => {
          e.target.style.left = "16px";
          e.target.style.top = "16px";
        }}
        onBlur={(e) => {
          e.target.style.left = "-9999px";
        }}
      >
        Skip to main content
      </a>
      
      <nav className="site-nav" style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        background: needsSolidBg ? (darkMode ? "rgba(26,36,36,0.96)" : "rgba(250,247,244,0.96)") : "transparent",
        backdropFilter: needsSolidBg ? "blur(12px)" : "none",
        borderBottom: needsSolidBg ? `1px solid ${theme.border}` : "none",
        transition: "all 0.3s ease",
        padding: "0 clamp(20px, 3vw, 48px)",
    }}>
      <div className="site-nav-inner" style={{
        maxWidth: 1280, margin: "0 auto",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        gap: 24, minHeight: 88,
      }}>
        <div className="site-nav-brand" style={{ display: "flex", alignItems: "center", gap: 16, flexShrink: 0 }}>
          <Link to="/" onClick={() => window.scrollTo(0, 0)} style={{ 
            background: "none", border: "none", cursor: "pointer", padding: 0,
            display: "flex", alignItems: "center", gap: 10, textDecoration: "none", whiteSpace: "nowrap",
          }}>
            {/* Bayside Logo */}
           <img 
              src={logo} 
              alt="Bayside Wellness & Counseling"
              style={{ 
                height: 36,
                width: "auto",
                display: "block",
                filter: darkMode ? "brightness(0) invert(1)" : "none",
                transition: "filter 0.3s ease",
              }}
            />
            
            <div style={{ fontFamily: "'Cormorant Garamond', serif", color: theme.text, transition: "color 0.3s ease" }}>
              <div style={{ fontSize: 20, fontWeight: 600, letterSpacing: "0.08em", lineHeight: 1 }}>BAYSIDE</div>
            <div style={{ fontSize: 11, fontWeight: 300, letterSpacing: "0.2em", color: theme.accentMuted, transition: "color 0.3s ease" }}>WELLNESS & COUNSELING</div>
          </div>
        </Link>

        </div>

        {/* Desktop nav */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 28, flex: 1, minWidth: 0, marginLeft: 36 }} className="desktop-nav">
          <div className="site-nav-links" style={{ display: "flex", alignItems: "center", gap: 24, margin: "0 auto" }}>
          {navLinks.map(link => (
            <Link key={link.name} to={link.path} onClick={() => window.scrollTo(0, 0)} style={{
              background: "none", border: "none", cursor: "pointer",
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 15, fontWeight: 500,
              letterSpacing: "0.04em",
              color: currentPath === link.path ? theme.accent : theme.textMuted,
              textTransform: "uppercase",
              transition: "color 0.3s ease",
              borderBottom: currentPath === link.path ? `2px solid ${theme.accent}` : "2px solid transparent",
              paddingBottom: 4,
              textDecoration: "none",
              display: "inline-block", whiteSpace: "nowrap", flexShrink: 0,
            }}
            onMouseEnter={e => e.target.style.color = theme.accent}
            onMouseLeave={e => e.target.style.color = currentPath === link.path ? theme.accent : theme.textMuted}
            >{link.name}</Link>
          ))}
          </div>
          <div className="site-nav-actions" style={{ display: "flex", alignItems: "center", gap: 20, flexShrink: 0 }}>
          <a href={clientPortalUrl} target="_blank" rel="noopener noreferrer" aria-label="Client Portal (opens Jane in a new tab)" style={{
            fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 500,
            letterSpacing: "0.02em", whiteSpace: "nowrap", flexShrink: 0,
            color: theme.textMuted,
            padding: "12px 4px", textDecoration: "none", lineHeight: 1.2,
          }}>Client Portal</a>
          <button onClick={() => handleNavigate("/contact")} style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 13, fontWeight: 500,
            letterSpacing: "0.06em",
            color: darkMode ? theme.bg : colors.white,
            textTransform: "uppercase",
            background: theme.accent,
            padding: "12px 18px", whiteSpace: "nowrap", flexShrink: 0, lineHeight: 1.2,
            borderRadius: 2,
            border: "none",
            cursor: "pointer",
            transition: "all 0.3s ease",
          }}
          onMouseEnter={e => e.target.style.background = colors.tealLight}
          onMouseLeave={e => e.target.style.background = colors.teal}
          >Free Consultation</button>
          </div>
        </div>

        <div className="site-nav-utilities" style={{ display: "flex", alignItems: "center", gap: 12, flexShrink: 0 }}>
        <button
          onClick={toggleDarkMode}
          aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
          aria-pressed={darkMode}
          className="dark-mode-toggle"
          style={{
            position: "relative", width: 24, height: 40, flexShrink: 0,
            background: darkMode ? theme.accent : "#E0E0E0",
            borderRadius: 24, border: "none", cursor: "pointer",
            transition: "background 0.3s ease", padding: 0,
          }}
        >
          <div aria-hidden="true" style={{
            position: "absolute", top: darkMode ? 19 : 3,
            left: "50%", transform: "translateX(-50%)",
            width: 18, height: 18, background: "white", borderRadius: "50%",
            transition: "top 0.3s ease", boxShadow: "0 2px 4px rgba(0,0,0,0.15)",
          }} />
        </button>
        {/* Mobile menu button */}
        <button onClick={() => setMenuOpen(!menuOpen)} style={{
          display: "none", background: "none", border: "none",
          cursor: "pointer", color: theme.text, fontSize: 24,
          transition: "color 0.3s ease",
        }} className="mobile-menu-btn" aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"} aria-expanded={menuOpen} aria-controls="mobile-navigation">☰</button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div id="mobile-navigation" style={{
          background: theme.bg, borderTop: `1px solid ${theme.border}`,
          padding: "20px 40px 30px",
          transition: "all 0.3s ease",
        }}>
          {navLinks.map(link => (
            <Link key={link.name} to={link.path} onClick={() => handleNavigate(link.path)}
              style={{
                display: "block", padding: "12px 0", width: "100%",
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 14, letterSpacing: "0.1em",
                color: theme.text, background: "none", border: "none",
                textAlign: "left", cursor: "pointer",
                textTransform: "uppercase",
                borderBottom: `1px solid ${theme.border}`,
                textDecoration: "none",
                transition: "all 0.3s ease",
              }}>
              {link.name}
            </Link>
          ))}
          <a href={clientPortalUrl} target="_blank" rel="noopener noreferrer" onClick={() => setMenuOpen(false)} aria-label="Client Portal (opens Jane in a new tab)" style={{
            display: "block", padding: "14px 0", width: "100%",
            fontFamily: "'DM Sans', sans-serif", fontSize: 14,
            letterSpacing: "0.1em", textTransform: "uppercase",
            color: theme.accent, textDecoration: "none", borderBottom: `1px solid ${theme.border}`,
          }}>Client Portal</a>
          <button onClick={() => handleNavigate("/contact")}
            style={{
              display: "block", padding: "12px 0", width: "100%",
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 14, letterSpacing: "0.1em",
              color: theme.text, background: "none", border: "none",
              textAlign: "left", cursor: "pointer",
              textTransform: "uppercase",
              transition: "color 0.3s ease",
            }}>
            Book Free Consult
          </button>
        </div>
      )}
    </nav>
    </>
  );
}

// ========================================
// FOOTER
// ========================================

function Footer() {
  const { darkMode } = useDarkMode();
  const background = darkMode ? "#182525" : "#223333";
  const ink = "#EFF4F1";
  const muted = "#B4C7C3";
  const accent = "#8BC9C0";
  const line = "rgba(180,199,195,0.18)";
  const footerLink = { display: "block", width: "fit-content", padding: "5px 0", color: muted, textDecoration: "none", fontSize: 14, lineHeight: 1.6 };
  const heading = { fontSize: 11, fontWeight: 500, letterSpacing: "0.16em", textTransform: "uppercase", color: accent, margin: "4px 0 18px" };
  const locations = [
    { label: "Therapy in Oakland", path: "/therapy-oakland" },
    { label: "Therapy in San Francisco", path: "/therapy-san-francisco" },
    { label: "Therapy in Berkeley", path: "/therapy-berkeley" },
    { label: "Therapy in San Jose", path: "/therapy-san-jose" },
    { label: "Therapy in Palo Alto", path: "/therapy-palo-alto" },
    { label: "EMDR Therapy Oakland", path: "/emdr-therapy-oakland" },
    { label: "IFS Therapy Oakland", path: "/ifs-therapy-oakland" },
    { label: "Anxiety Therapy Oakland", path: "/anxiety-therapy-oakland" },
    { label: "Trauma Therapy Oakland", path: "/trauma-therapy-oakland" },
  ];

  return (
    <footer className="site-footer" style={{ background, color: ink, fontFamily: "'DM Sans', sans-serif", padding: "56px clamp(24px, 4vw, 64px) 24px", borderTop: `1px solid ${line}` }}>
      <style dangerouslySetInnerHTML={{ __html: `
        .site-footer a { transition: color 0.2s ease; }
        .site-footer a:hover { color: #FFFFFF !important; text-decoration: underline !important; text-underline-offset: 4px; }
        .footer-main { display: grid; grid-template-columns: 1.4fr 1fr 0.7fr 0.9fr; gap: 48px; align-items: start; }
        .footer-main > * { min-width: 0; }
        .footer-location-links { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 4px 24px; }
        .footer-bottom { display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 12px; }
        @media (max-width: 1000px) {
          .footer-main { grid-template-columns: 1.2fr 1fr; gap: 36px 48px; }
        }
        @media (max-width: 600px) {
          .site-footer { padding-top: 36px !important; }
          .footer-main { grid-template-columns: 1fr 1fr; gap: 28px 24px; }
          .footer-brand { grid-column: 1 / -1; }
          .footer-services { grid-column: 1 / -1; }
          .footer-service-links { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 0 20px; }
          .footer-location-links { grid-template-columns: 1fr; }
          .footer-bottom { align-items: flex-start; flex-direction: column; gap: 8px; }
        }
      ` }} />
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <div className="footer-main">
          <div className="footer-brand">
            <Link to="/" onClick={() => window.scrollTo(0, 0)} style={{ display: "inline-flex", alignItems: "center", gap: 12, color: ink, textDecoration: "none", marginBottom: 18 }}>
              <img src={logo} alt="Bayside Wellness & Counseling" style={{ height: 36, width: "auto", filter: "brightness(0) invert(1)", flexShrink: 0 }} />
              <div>
                <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 22, fontWeight: 600, letterSpacing: "0.08em", lineHeight: 1.1 }}>BAYSIDE</div>
                <div style={{ fontSize: 9, letterSpacing: "0.19em", color: accent, marginTop: 4 }}>WELLNESS & COUNSELING</div>
              </div>
            </Link>
            <p style={{ color: muted, fontSize: 14, lineHeight: 1.8, maxWidth: 300, margin: "0 0 18px" }}>Virtual individual therapy for adults and young adults across California.</p>
            <p style={{ fontSize: 13, lineHeight: 1.8, margin: "0 0 14px", color: ink }}>Marcus Ghiasi, LMFT<br />Licensed Marriage and Family Therapist<br />California license #158475</p>
            <a href="tel:+14158575799" style={{ ...footerLink, color: ink }}>415-857-5799</a>
          </div>

          <div className="footer-services">
            <h2 style={heading}>Services</h2>
            <div className="footer-service-links">
              {services.map((service) => <Link key={service.slug} to={`/services/${service.slug}`} onClick={() => window.scrollTo(0, 0)} style={footerLink}>{service.name}</Link>)}
            </div>
          </div>

          <div>
            <h2 style={heading}>Practice</h2>
            {[
              { name: "About Marcus", path: "/about" },
              { name: "FAQ", path: "/faq" },
              { name: "Blog", path: "/blog" },
              { name: "Contact", path: "/contact" },
            ].map((item) => <Link key={item.path} to={item.path} onClick={() => window.scrollTo(0, 0)} style={footerLink}>{item.name}</Link>)}
          </div>

          <div className="footer-resources">
            <h2 style={heading}>Resources</h2>
            <a href={clientPortalUrl} target="_blank" rel="noopener noreferrer" aria-label="Client Portal (opens Jane in a new tab)" style={{ ...footerLink, color: ink }}>Client Portal ↗</a>
            <Link to="/crisis-resources" onClick={() => window.scrollTo(0, 0)} style={footerLink}>Crisis Resources</Link>
            <Link to="/contact" onClick={() => window.scrollTo(0, 0)} style={footerLink}>Free Consultation</Link>
          </div>
        </div>

        <details style={{ borderTop: `1px solid ${line}`, borderBottom: `1px solid ${line}`, marginTop: 36, padding: "18px 0", color: muted }}>
          <summary style={{ cursor: "pointer", fontSize: 13, lineHeight: 1.6, color: ink }}>Serving California · Explore locations and services</summary>
          <div className="footer-location-links" style={{ paddingTop: 16 }}>
            {locations.map((item) => <Link key={item.path} to={item.path} onClick={() => window.scrollTo(0, 0)} style={footerLink}>{item.label}</Link>)}
          </div>
        </details>

        <div className="footer-bottom" style={{ paddingTop: 22, color: muted, fontSize: 12, lineHeight: 1.7 }}>
          <p style={{ margin: 0 }}>© 2026 Bayside Wellness & Counseling</p>
          <p style={{ margin: 0 }}>Oakland-based · Virtual sessions throughout California</p>
        </div>
        <p style={{ margin: "10px 0 0", fontSize: 11, color: muted, lineHeight: 1.7 }}>Mailing address: 2323 Broadway, Oakland, CA 94612 · All rights reserved</p>
      </div>
    </footer>
  );
}

// ========================================
// HOME PAGE
// ========================================

function HomePage() {
  const { darkMode } = useDarkMode();
  const theme = getTheme(darkMode);
  const bookingUrl = "https://baysidewellnessandcounseling.janeapp.com/#/staff_member/1/treatment/1";
  const verificationRef = useRef(null);

  // React does not execute scripts inserted through JSX. Mount the supplied
  // Psychology Today badge script after hydration, and clean up on navigation.
  useEffect(() => {
    const container = verificationRef.current;
    if (!container) return;
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src = "https://member.psychologytoday.com/verified-seal.js";
    script.async = true;
    script.setAttribute("data-badge", "14");
    script.setAttribute("data-id", "1134128");
    script.setAttribute("data-code", "aHR0cHM6Ly93d3cucHN5Y2hvbG9neXRvZGF5LmNvbS9hcGkvdmVyaWZpZWQtc2VhbC9zZWFscy8xNC9wcm9maWxlLzExMzQxMjg/Y2FsbGJhY2s9c3hjYWxsYmFjaw==");
    container.appendChild(script);
    return () => script.remove();
  }, []);

  const concerns = [
    { title: "Anxiety and self-criticism", text: "Overthinking decisions, replaying conversations, avoiding situations, or finding that your expectations leave little room to rest." },
    { title: "Trauma and difficult experiences", text: "Distressing memories, reminders, or reactions that continue to affect your daily life and relationships." },
    { title: "Depression and disconnection", text: "Feeling low, losing interest, or struggling to find energy and connection in things that once mattered." },
    { title: "Relationships and life changes", text: "Recurring conflict, difficulty expressing your needs, or uncertainty during changes in work, school, family, and identity." },
  ];
  const steps = [
    { title: "Understand what is happening.", text: "Explore your concerns, the circumstances around them, and what you have already tried." },
    { title: "Choose a direction together.", text: "Discuss what you want to change and how the recommended approach connects to those goals." },
    { title: "Keep the work useful.", text: "Make room for practical steps, deeper exploration, and honest conversations about what is helping or needs adjusting." },
  ];

  const ConsultationLink = () => (
    <a className="home-primary" href={bookingUrl} target="_blank" rel="noopener noreferrer" aria-label="Book a free 15-minute consultation (opens Jane in a new tab)">
      Book a Free 15-Minute Consultation <span aria-hidden="true">↗</span>
    </a>
  );

  return (
    <div className="bayside-home" style={{
      "--home-bg": theme.bg, "--home-alt": theme.bgAlt, "--home-soft": theme.bgLighter,
      "--home-text": theme.text, "--home-muted": theme.textMuted,
      "--home-accent": theme.accent, "--home-border": theme.border,
      "--home-button-text": darkMode ? theme.bg : colors.white,
    }}>
      <SEO metadata={mainPages.home} />
      <style dangerouslySetInnerHTML={{ __html: `
        .bayside-home { color: var(--home-text); background: var(--home-bg); font-family: 'DM Sans', sans-serif; }
        .bayside-home section { padding: 84px 32px; }
        .bayside-home .home-inner { max-width: 1120px; margin: 0 auto; }
        .bayside-home .home-eyebrow { color: var(--home-accent); font-size: 12px; font-weight: 500; letter-spacing: .16em; text-transform: uppercase; margin-bottom: 20px; }
        .bayside-home h2 { font-family: 'Cormorant Garamond', serif; font-size: clamp(34px, 3.8vw, 48px); font-weight: 400; line-height: 1.15; margin: 0 0 20px; }
        .bayside-home p { font-size: 16px; line-height: 1.8; color: var(--home-muted); margin: 0 0 18px; }
        .bayside-home a { text-underline-offset: 5px; }
        .bayside-home a:focus-visible { outline: 2px solid var(--home-accent); outline-offset: 5px; }
        .bayside-home .home-text-link { color: var(--home-accent); font-size: 14px; font-weight: 500; line-height: 1.6; text-decoration: underline; display: inline-block; }
        .bayside-home .home-primary { display: inline-flex; align-items: center; justify-content: center; gap: 10px; padding: 17px 26px; background: var(--home-accent); color: var(--home-button-text); border: 1px solid var(--home-accent); border-radius: 2px; font-size: 14px; font-weight: 500; line-height: 1.5; text-align: center; text-decoration: none; transition: opacity .2s ease; }
        .bayside-home .home-primary:hover { opacity: .88; }
        .bayside-home .home-hero { position: relative; overflow: hidden; padding-top: 164px; padding-bottom: 86px; background: radial-gradient(ellipse at 85% 10%, ${darkMode ? colors.darkBgLighter : colors.tealPale} 0%, transparent 60%); }
        .bayside-home .home-hero .home-inner { max-width: 900px; text-align: center; }
        .bayside-home h1 { font-family: 'Cormorant Garamond', serif; font-size: clamp(44px, 5.6vw, 76px); font-weight: 400; line-height: 1.06; letter-spacing: -.02em; margin: 0 0 28px; }
        .bayside-home h1 span { display: block; }
        .bayside-home h1 em { color: var(--home-accent); font-weight: 400; }
        .bayside-home .home-summary { max-width: 730px; margin: 0 auto 18px; font-size: 19px; line-height: 1.6; color: var(--home-text); }
        .bayside-home .home-intro { max-width: 650px; margin: 0 auto 30px; }
        .bayside-home .home-hero-actions { display: flex; align-items: center; justify-content: center; flex-wrap: wrap; gap: 18px 28px; }
        .bayside-home .home-trust { margin: 24px 0 0; font-size: 12px; line-height: 1.7; color: var(--home-muted); }
        .bayside-home .home-section-intro { max-width: 650px; margin-bottom: 36px; }
        .bayside-home .home-concerns { background: var(--home-alt); }
        .bayside-home .home-concern-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 24px 48px; margin-bottom: 30px; }
        .bayside-home .home-concern { border-top: 1px solid var(--home-border); padding-top: 25px; }
        .bayside-home h3 { font-size: 18px; line-height: 1.4; font-weight: 500; margin: 0 0 12px; color: var(--home-text); }
        .bayside-home .home-concern p { max-width: 480px; }
        .bayside-home .home-step-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 34px; margin: 38px 0 30px; }
        .bayside-home .home-step-number { display: block; color: var(--home-accent); font-size: 12px; letter-spacing: .12em; margin-bottom: 14px; }
        .bayside-home .home-methods { border-top: 1px solid var(--home-border); padding-top: 28px; max-width: 820px; }
        .bayside-home .home-methods p a { color: var(--home-accent); }
        .bayside-home .home-founder { background: var(--home-alt); }
        .bayside-home .home-founder-grid { display: grid; grid-template-columns: minmax(0, .8fr) minmax(0, 1.2fr); gap: 72px; align-items: center; }
        .bayside-home .home-founder-photo { width: 100%; height: auto; max-width: 360px; aspect-ratio: 3 / 4; object-fit: cover; border-radius: 60px 3px 60px 3px; display: block; background: var(--home-soft); }
        .bayside-home .home-founder-name { font-size: 22px; color: var(--home-text); margin-bottom: 4px; }
        .bayside-home .home-credentials { font-size: 13px; margin-bottom: 24px; }
        .bayside-home .home-founder-links { display: flex; flex-wrap: wrap; align-items: center; gap: 14px 26px; margin-top: 24px; }
        .bayside-home .home-psychology-verification { display: inline-flex; align-items: center; max-width: 100%; }
        .bayside-home .home-psychology-verification a { display: inline-block; max-width: 100%; color: var(--home-accent); font-size: 14px; }
        .bayside-home .home-psychology-verification img { max-width: 100%; height: auto; }
        .bayside-home .home-details-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 34px; margin: 36px 0 26px; }
        .bayside-home .home-detail { border-top: 1px solid var(--home-border); padding-top: 24px; }
        .bayside-home .home-rates { color: var(--home-text); font-size: 18px; }
        .bayside-home .home-next { text-align: center; background: var(--home-alt); border-top: 1px solid var(--home-border); }
        .bayside-home .home-next .home-inner { max-width: 720px; }
        .bayside-home .home-next .home-primary { margin-top: 12px; }
        .bayside-home .home-booking-note { font-size: 12px; margin: 18px 0 0; }
        @media (max-width: 900px) {
          .bayside-home .home-founder-grid { gap: 40px; }
          .bayside-home .home-step-grid, .bayside-home .home-details-grid { gap: 24px; }
        }
        @media (max-width: 680px) {
          .bayside-home section { padding: 58px 24px; }
          .bayside-home .home-hero { padding-top: 126px; padding-bottom: 60px; }
          .bayside-home .home-eyebrow { font-size: 10px; letter-spacing: .1em; }
          .bayside-home .home-summary { font-size: 17px; }
          .bayside-home .home-concern-grid, .bayside-home .home-step-grid, .bayside-home .home-founder-grid, .bayside-home .home-details-grid { grid-template-columns: 1fr; gap: 24px; }
          .bayside-home .home-founder-photo { max-width: 300px; margin: 0 auto; }
          .bayside-home .home-primary { max-width: 100%; font-size: 13px; padding: 15px 18px; }
          .bayside-home .home-trust { max-width: 260px; margin-left: auto; margin-right: auto; }
        }
        @media (prefers-reduced-motion: reduce) { .bayside-home .home-primary { transition: none; } }
      ` }} />

      <section className="home-hero" aria-labelledby="home-heading">
        <div className="home-inner">
          <p className="home-eyebrow">Oakland-based · Virtual therapy across California</p>
          <h1 id="home-heading"><span>A place for healing.</span><span><em>Room for change.</em></span></h1>
          <p className="home-summary">Individual therapy for adults navigating anxiety, trauma, depression, relationship challenges, and life transitions.</p>
          <p className="home-intro">You do not need to have everything figured out before starting. Bayside Wellness &amp; Counseling offers space to understand what you’re experiencing, work through what feels difficult, and take steps toward changes that matter to you.</p>
          <div className="home-hero-actions"><ConsultationLink /><Link className="home-text-link" to="/services" onClick={() => window.scrollTo(0, 0)}>Explore Therapy Services</Link></div>
          <p className="home-trust">Adults 18+ · Online appointments · California licensed</p>
        </div>
      </section>

      <section className="home-concerns" aria-labelledby="home-concerns-heading">
        <div className="home-inner">
          <h2 id="home-concerns-heading">Start with what brings you here.</h2>
          <p className="home-section-intro">Therapy can begin with a specific concern or a pattern you want to understand.</p>
          <div className="home-concern-grid">{concerns.map(item => <div className="home-concern" key={item.title}><h3>{item.title}</h3><p>{item.text}</p></div>)}</div>
          <Link className="home-text-link" to="/services" onClick={() => window.scrollTo(0, 0)}>Find Support for Your Concerns <span aria-hidden="true">→</span></Link>
        </div>
      </section>

      <section className="home-approach" aria-labelledby="home-approach-heading">
        <div className="home-inner">
          <h2 id="home-approach-heading">Care that connects understanding with action.</h2>
          <p className="home-section-intro">At Bayside, you and your therapist work together to give therapy a clear focus while leaving room for what emerges.</p>
          <div className="home-step-grid">{steps.map((item, index) => <div key={item.title}><span className="home-step-number" aria-hidden="true">0{index + 1}</span><h3>{item.title}</h3><p>{item.text}</p></div>)}</div>
          <div className="home-methods">
            <p>Care may draw on <Link to="/services/emdr" onClick={() => window.scrollTo(0, 0)}>EMDR</Link>, <Link to="/services/ifs" onClick={() => window.scrollTo(0, 0)}>Internal Family Systems</Link>, <Link to="/services/cbt" onClick={() => window.scrollTo(0, 0)}>Cognitive Behavioral Therapy</Link>, and <Link to="/services/psychodynamic" onClick={() => window.scrollTo(0, 0)}>psychodynamic therapy</Link>. You do not need to choose a method before reaching out.</p>
            <Link className="home-text-link" to="/services" onClick={() => window.scrollTo(0, 0)}>Explore Our Therapy Approaches <span aria-hidden="true">→</span></Link>
          </div>
        </div>
      </section>

      <section className="home-founder" aria-labelledby="home-founder-heading">
        <div className="home-inner"><div className="home-founder-grid">
          <img className="home-founder-photo" src={marcusHeadshot} alt="Marcus Ghiasi, LMFT, founder and therapist at Bayside Wellness & Counseling" loading="lazy" width="600" height="800" />
          <div>
            <p className="home-eyebrow">The person behind the practice</p>
            <h2 id="home-founder-heading">Meet Bayside’s founder.</h2>
            <p className="home-founder-name">Marcus Ghiasi, LMFT</p>
            <p className="home-credentials">Founder &amp; Therapist · California license #158475</p>
            <p>Marcus founded Bayside Wellness &amp; Counseling as a place for thoughtful, individualized care. A Bay Area native and second-generation Persian American, he works with adults navigating anxiety, trauma-related concerns, low mood, and relationship patterns, with a particular focus on men and young adults.</p>
            <p>Therapy at Bayside is currently provided by Marcus. Learn about his background and approach to see whether working together feels right for you.</p>
            <div className="home-founder-links"><Link className="home-text-link" to="/about" onClick={() => window.scrollTo(0, 0)}>Meet Marcus <span aria-hidden="true">→</span></Link><span className="home-psychology-verification" ref={verificationRef}><a href="https://www.psychologytoday.com/profile/1134128" className="sx-verified-seal" target="_blank" rel="noopener noreferrer" aria-label="View Marcus Ghiasi on Psychology Today (opens in a new tab)">Psychology Today</a></span></div>
          </div>
        </div></div>
      </section>

      <section className="home-practical" aria-labelledby="home-practical-heading">
        <div className="home-inner">
          <h2 id="home-practical-heading">Know what to expect before you begin.</h2>
          <div className="home-details-grid">
            <div className="home-detail"><h3>Virtual individual therapy</h3><p>Attend from a private, suitable setting. Clients must be physically in California for each appointment.</p></div>
            <div className="home-detail"><h3>Session fees</h3><p className="home-rates">$210 for 45 minutes<br />$280 for 60 minutes</p></div>
            <div className="home-detail"><h3>Private-pay care</h3><p>Bayside does not bill insurance directly. A superbill is available for possible out-of-network reimbursement; coverage depends on your plan.</p></div>
          </div>
          <Link className="home-text-link" to="/faq" onClick={() => window.scrollTo(0, 0)}>Questions About Fees, Insurance, or Getting Started? <span aria-hidden="true">→</span></Link>
        </div>
      </section>

      <section className="home-next" aria-labelledby="home-next-heading">
        <div className="home-inner">
          <h2 id="home-next-heading">Your next step can be a conversation.</h2>
          <p>A free 15-minute consultation gives you time to share what brings you to therapy, ask questions, and discuss availability, fees, and whether Bayside fits your needs.</p>
          <p>You do not need to prepare a detailed personal history or commit to ongoing sessions during the call.</p>
          <ConsultationLink />
          <p className="home-booking-note">Choose an available time through our booking calendar. Opens in a new tab.</p>
        </div>
      </section>
    </div>
  );
}

// ========================================
// ABOUT PAGE
// ========================================

function AboutPage() {
  const [ref, visible] = useScrollReveal();
  const navigate = useNavigate();
  const { darkMode } = useDarkMode();
  const theme = getTheme(darkMode);

  return (
    <>
      <SEO metadata={mainPages.about} />
      <section ref={ref} style={{
      background: darkMode ? colors.darkBgLight : colors.charcoal,
      padding: "160px 40px 120px",
      minHeight: "100vh",
      opacity: visible ? 1 : 0,
      transform: visible ? "none" : "translateY(30px)",
      transition: "all 0.3s ease",
    }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }}>
        <div>
          <div style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 12, fontWeight: 500,
            letterSpacing: "0.25em", textTransform: "uppercase",
            color: theme.accentMuted, marginBottom: 24,
            display: "flex", alignItems: "center", gap: 12,
            transition: "color 0.3s ease",
          }}>
            <span style={{ width: 32, height: 1, background: theme.accentMuted, display: "inline-block", transition: "background 0.3s ease" }} />
            About Marcus
          </div>
          <h1 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(36px, 4vw, 56px)",
            fontWeight: 300, lineHeight: 1.15,
            color: colors.white, margin: "0 0 32px",
          }}>
            Marcus Ghiasi, LMFT<br />
            <em style={{ color: darkMode ? colors.darkTeal : colors.tealLight, fontStyle: "italic", transition: "color 0.3s ease" }}>A collaborative approach.</em>
          </h1>
          <p style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 16, fontWeight: 300,
            lineHeight: 1.9, color: darkMode ? colors.darkTextMuted : "#A8B8B8",
            margin: "0 0 24px",
            transition: "color 0.3s ease",
          }}>
            I'm Marcus Ghiasi, a California Licensed Marriage and Family Therapist, license #158475, and the founder of Bayside Wellness & Counseling. I am a Bay Area native and second-generation Persian American. Curiosity, creativity, and connection shape how I approach the work, while your experience determines what we explore together.
          </p>
          <p style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 16, fontWeight: 300,
            lineHeight: 1.9, color: darkMode ? colors.darkTextMuted : "#A8B8B8",
            margin: "0 0 24px",
            transition: "color 0.3s ease",
          }}>
            I work individually with adults, including young adults, on anxiety, low mood, trauma-related concerns, anger, and relationship patterns. We can connect practical changes with a better understanding of what makes them difficult. I explain my recommendations and welcome questions about the approach, pace, and fit.
          </p>
          <p style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 16, fontWeight: 300,
            lineHeight: 1.9, color: darkMode ? colors.darkTextMuted : "#A8B8B8",
            margin: "0 0 40px",
          }}>
            You can bring uncertainty, hesitation, or a previous experience of therapy that did not help. You do not need to prove readiness or find the perfect words. My role is to work with you on a plan, listen to feedback, and revisit it when something needs to change.
          </p>

          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, margin: "0 0 32px" }}><a href="https://search.dca.ca.gov/" target="_blank" rel="noopener noreferrer" style={{ color: theme.accent }}>Verify California license #158475 through the Department of Consumer Affairs</a></p>

          {/* Who I work with */}
          <div style={{ marginBottom: 40 }}>
            <div style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase",
              color: theme.accentMuted, marginBottom: 16,
              transition: "color 0.3s ease",
            }}>I work with</div>
            {[
              "Men working on anger, relationships, and emotional expression",
              "Individuals struggling with relationship patterns or conflicts (individual sessions)",
"Young adults navigating identity, career transitions, and the disorientation of early adulthood",
      "Adults dealing with trauma, anxiety, or depression",
              "People struggling with self-criticism, perfectionism, or feeling stuck",
              "First-time therapy clients who are curious but unsure where to start",
            ].map((item, i) => (
              <div key={i} style={{
                display: "flex", gap: 12, alignItems: "flex-start",
                marginBottom: 10,
              }}>
                <span style={{ color: theme.accent, marginTop: 4, flexShrink: 0, transition: "color 0.3s ease" }}>—</span>
                <span style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 14, fontWeight: 300,
                  color: darkMode ? colors.darkTextMuted : "#A8B8B8", lineHeight: 1.7,
                  transition: "color 0.3s ease",
                }}>{item}</span>
              </div>
            ))}
          </div>

          {/* Affirming statement */}
          <div style={{
            background: darkMode ? "rgba(77, 189, 183, 0.12)" : "rgba(61, 158, 154, 0.08)",
            border: `1px solid ${theme.accent}33`,
            borderRadius: 2,
            padding: "20px 24px",
            marginBottom: 32,
            transition: "all 0.3s ease",
          }}>
            <p style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 14, fontWeight: 400,
              color: darkMode ? colors.darkTeal : colors.tealLight,
              lineHeight: 1.7,
              margin: 0,
              letterSpacing: "0.02em",
              transition: "color 0.3s ease",
            }}>
              Bayside Wellness & Counseling is LGBTQ+ and BIPOC affirming. All identities, experiences, and backgrounds are welcomed here.
            </p>
          </div>

          {/* Buttons Row - Work With Marcus + Psychology Today */}
          <div className="about-buttons" style={{ display: 'flex', gap: 16, alignItems: 'stretch' }}>
            <a href="/contact" onClick={(e) => { e.preventDefault(); navigate("/contact"); }} style={{ textDecoration: "none",
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 13, fontWeight: 500,
              letterSpacing: "0.12em", textTransform: "uppercase",
              color: colors.white, background: "transparent",
              border: `1px solid ${theme.accent}`, cursor: "pointer",
              padding: "14px 32px", borderRadius: 2,
              transition: "all 0.3s ease",
              flex: 1,
              minHeight: 48,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onMouseEnter={e => { e.target.style.background = theme.accent; }}
            onMouseLeave={e => { e.target.style.background = "transparent"; }}
            >Work With Marcus</a>

            <a 
              href="https://www.psychologytoday.com/profile/1134128"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 13, fontWeight: 500,
                letterSpacing: "0.12em", textTransform: "uppercase",
                color: theme.accent, background: "transparent",
                border: `1px solid ${theme.accent}66`, cursor: "pointer",
                padding: "14px 32px", borderRadius: 2,
                transition: "all 0.3s ease",
                flex: 1,
                minHeight: 48,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                textDecoration: 'none',
              }}
              onMouseEnter={e => { 
                e.target.style.background = darkMode ? 'rgba(77, 189, 183, 0.15)' : 'rgba(61, 158, 154, 0.1)'; 
                e.target.style.borderColor = theme.accent;
              }}
              onMouseLeave={e => { 
                e.target.style.background = "transparent"; 
                e.target.style.borderColor = `${theme.accent}66`;
              }}
                                   >Psychology Today →</a>
          </div>
        <div style={{ marginTop: 20 }}>
          <a href="https://www.marcusghiasitherapy.com" target="_blank" rel="noopener noreferrer" style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 13, fontWeight: 300,
            color: theme.accentMuted, textDecoration: "none",
            letterSpacing: "0.05em",
            borderBottom: `1px solid ${theme.accentMuted}44`,
            paddingBottom: 2,
            transition: "color 0.3s ease",
          }}
          onMouseEnter={e => e.target.style.color = darkMode ? colors.darkTeal : colors.tealLight}
          onMouseLeave={e => e.target.style.color = theme.accentMuted}
          >Visit marcusghiasitherapy.com →</a>
        </div>
        </div>
        <div style={{ position: "relative" }}>
          <div style={{
            width: "100%", aspectRatio: "3/4",
            background: darkMode ? colors.darkBgLighter : colors.tealPale,
            borderRadius: "80px 2px 80px 2px",
            overflow: "hidden",
            transition: "background 0.3s ease",
          }}>
            <img
              src={marcusHeadshot}
              alt="Marcus Ghiasi, LMFT - Licensed Marriage and Family Therapist"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>

                              {/* Psychology Today seal and CAMFT badge, below the photo */}
          <div style={{ marginTop: 20, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 20, flexWrap: 'wrap' }}>
            <div style={{ transform: 'scale(1.4)', transformOrigin: 'left center', marginRight: 30 }}>
            <a
              href="https://www.psychologytoday.com/profile/1134128"
              className="sx-verified-seal"
              target="_blank"
              rel="noopener noreferrer"
            ></a>
            <script
              type="text/javascript"
              src="https://member.psychologytoday.com/verified-seal.js"
              data-badge="13"
              data-id="1134128"
              data-code="aHR0cHM6Ly93d3cucHN5Y2hvbG9neXRvZGF5LmNvbS9hcGkvdmVyaWZpZWQtc2VhbC9zZWFscy8xMy9wcm9maWxlLzExMzQxMjg/Y2FsbGJhY2s9c3hjYWxsYmFjaw=="
            ></script>
            </div>
            <img
              src={camftLogo}
              alt="Member of the California Association of Marriage & Family Therapists"
              style={{ height: 76, width: 'auto' }}
            />
          </div>
        </div>
      </div>
    </section>
    </>
  );
}

// ========================================
// SERVICES HUB PAGE
// ========================================

function ServicesPage() {
  const navigate = useNavigate();
  const { darkMode } = useDarkMode();
  const theme = getTheme(darkMode);

  return (
    <>
      <SEO metadata={mainPages.services} />
      <section style={{
        background: theme.bg,
        padding: "140px 40px 60px",
        minHeight: "auto",
        display: "flex",
        alignItems: "center",
        transition: "background 0.3s ease",
      }}>
        <div style={{ maxWidth: 900, margin: "0 auto", textAlign: "center" }}>
          <div style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 12, letterSpacing: "0.25em", textTransform: "uppercase",
            color: theme.accentMuted, marginBottom: 24,
            transition: "color 0.3s ease",
          }}>Our Services</div>
          <h1 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(48px, 6vw, 72px)",
            fontWeight: 300, lineHeight: 1.1,
            color: theme.text, margin: "0 0 32px",
            transition: "color 0.3s ease",
          }}>
            Individual therapy<br />
            <em style={{ color: theme.accent, fontStyle: "italic", transition: "color 0.3s ease" }}>shaped around your goals.</em>
          </h1>
          <p style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 17, fontWeight: 300,
            color: theme.textMuted, lineHeight: 1.8,
            margin: "0 auto",
            maxWidth: 640,
            transition: "color 0.3s ease",
          }}>
            Explore the approaches below, then ask about fit in a free consultation. Each offers a different way to work; a recommendation depends on your concerns, history, preferences, and clinical needs. All listed services are virtual individual therapy for adults in California.
          </p>
        </div>
      </section>

      <section style={{
        background: theme.bgAlt,
        padding: "80px 40px 120px",
        transition: "background 0.3s ease",
      }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div className="services-grid" style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))",
            gap: 40,
          }}>
            {services.map((service, i) => (
              <a href={`/services/${service.slug}`}
                key={service.slug}
                onClick={(e) => { e.preventDefault(); navigate(`/services/${service.slug}`); }}
                style={{ textDecoration: "none",
                  background: theme.bg,
                  padding: "40px 36px",
                  borderRadius: 4,
                  border: `1px solid ${theme.border}`,
                  transition: "all 0.3s ease",
                  cursor: "pointer",
                  textAlign: "left",
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = "translateY(-8px)";
                  e.currentTarget.style.boxShadow = darkMode ? "0 16px 48px rgba(77,189,183,0.2)" : "0 16px 48px rgba(46,125,122,0.15)";
                  e.currentTarget.style.borderColor = theme.accent;
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = "none";
                  e.currentTarget.style.boxShadow = "none";
                  e.currentTarget.style.borderColor = theme.border;
                }}
              >
                <div style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: 32, fontWeight: 500,
                  color: theme.text,
                  marginBottom: 12,
                  lineHeight: 1.2,
                  transition: "color 0.3s ease",
                }}>{service.name}</div>
                <div style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 13, fontWeight: 500,
                  letterSpacing: "0.08em",
                  color: theme.accent,
                  textTransform: "uppercase",
                  marginBottom: 20,
                  transition: "color 0.3s ease",
                }}>{service.shortDesc}</div>
                <p style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 15, fontWeight: 300,
                  color: theme.textMuted,
                  lineHeight: 1.8,
                  margin: "0 0 24px",
                  transition: "color 0.3s ease",
                }}>{service.desc}</p>
                <div style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 13, fontWeight: 500,
                  letterSpacing: "0.1em",
                  color: theme.accent,
                  textTransform: "uppercase",
                  transition: "color 0.3s ease",
                }}>Learn More →</div>
              </a>
                                    ))}
    </div>

  </div>
</section>

      {/* CTA */}
      <section style={{
        background: darkMode ? colors.darkBgLight : colors.charcoal,
        padding: "100px 40px",
        transition: "background 0.3s ease",
      }}>
        <div style={{ maxWidth: 800, margin: "0 auto", textAlign: "center" }}>
          <h2 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(36px, 4vw, 56px)",
            fontWeight: 300, lineHeight: 1.15,
            color: colors.white, margin: "0 0 24px",
          }}>
            Not sure which approach<br />
            <em style={{ color: darkMode ? colors.darkTeal : colors.tealLight, transition: "color 0.3s ease" }}>is right for you?</em>
          </h2>
          <p style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 16, fontWeight: 300,
            color: darkMode ? colors.darkTextMuted : "#A8B8B8", lineHeight: 1.8,
            margin: "0 0 40px", maxWidth: 560, marginLeft: "auto", marginRight: "auto",
            transition: "color 0.3s ease",
          }}>
            You don't need to figure it out alone. During your free consultation, we'll discuss what you're experiencing and recommend the best path forward.
          </p>
          <a href="/contact" onClick={(e) => { e.preventDefault(); navigate("/contact"); }} style={{ textDecoration: "none",
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 13, fontWeight: 500,
            letterSpacing: "0.12em", textTransform: "uppercase",
            color: darkMode ? theme.bg : colors.white, border: "none", cursor: "pointer",
            background: theme.accent,
            padding: "16px 40px", borderRadius: 2,
            transition: "all 0.3s ease",
          }}
          onMouseEnter={e => e.target.style.opacity = "0.9"}
          onMouseLeave={e => e.target.style.opacity = "1"}
          >Schedule Free Consultation</a>
        </div>
      </section>
    </>
  );
}

// ========================================
// SERVICE DETAIL PAGE
// ========================================

function ServiceDetailPage({ slug }) {
  const [ref, visible] = useScrollReveal();
  const navigate = useNavigate();
  const { darkMode } = useDarkMode();
  const theme = getTheme(darkMode);
  const service = services.find(s => s.slug === slug);
  const details = serviceDetails[slug];

  if (!service) return <NotFoundPage />;
  
  // Add safety check for details
  if (!details) {
    return (
      <div style={{ 
        background: theme.bg, 
        padding: "160px 40px", 
        textAlign: "center",
        minHeight: "60vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}>
        <div>
          <h1 style={{ 
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 48,
            color: theme.text,
            marginBottom: 24
          }}>Service details coming soon</h1>
          <a href="/services" onClick={(e) => { e.preventDefault(); navigate("/services"); }} style={{ textDecoration: "none",
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 13,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: theme.accent,
            background: "transparent",
            border: `1px solid ${theme.accent}`,
            padding: "14px 32px",
            borderRadius: 2,
            cursor: "pointer"
          }}>← Back to Services</a>
        </div>
      </div>
    );
  }

 // Get metadata directly using slug - keys now match
  const pageMetadata = servicePages[slug];

  return (
    <>
      <SEO metadata={pageMetadata} />
      <section style={{
        background: theme.bg,
        padding: "160px 40px 80px",
        minHeight: "60vh",
        display: "flex",
        alignItems: "center",
        transition: "background 0.3s ease",
      }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <a href="/services" onClick={(e) => { e.preventDefault(); navigate("/services"); }} style={{ textDecoration: "none",
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 12, letterSpacing: "0.1em", textTransform: "uppercase",
            color: theme.accentMuted, background: "none", border: "none",
            cursor: "pointer", padding: 0,
            display: "inline-flex", alignItems: "center", gap: 8,
            marginBottom: 32,
            transition: "color 0.3s ease",
          }}>
            ← Back to Services
          </a>
          <div style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 12, letterSpacing: "0.25em", textTransform: "uppercase",
            color: theme.accent, marginBottom: 24,
            fontWeight: 500,
            transition: "color 0.3s ease",
          }}>{service.shortDesc}</div>
          <h1 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(48px, 6vw, 72px)",
            fontWeight: 300, lineHeight: 1.1,
            color: theme.text, margin: "0 0 32px",
            transition: "color 0.3s ease",
          }}>{service.name}</h1>
          <p style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 19, fontWeight: 300,
            color: theme.textMuted, lineHeight: 1.8,
            margin: 0,
            maxWidth: 740,
            transition: "color 0.3s ease",
          }}>{service.desc}</p>
        </div>
      </section>

      <section ref={ref} style={{
        background: theme.bgAlt,
        padding: "100px 40px",
        opacity: visible ? 1 : 0,
        transform: visible ? "none" : "translateY(30px)",
        transition: "all 0.3s ease",
      }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          {details.intro && (
            <p style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 19, fontWeight: 300,
              color: theme.text,
              lineHeight: 1.8,
              margin: "0 0 48px",
              transition: "color 0.3s ease",
            }}>
              {details.intro}
            </p>
          )}

          <div style={{ marginBottom: 48 }}>
            <h3 style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 18, fontWeight: 500,
              color: theme.text,
              margin: "0 0 16px",
              letterSpacing: "0.02em",
              transition: "color 0.3s ease",
            }}>What This Looks Like</h3>
            <p style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 16, fontWeight: 300,
              color: theme.textMuted,
              lineHeight: 1.8,
              margin: 0,
              transition: "color 0.3s ease",
            }}>
              {details.howItWorks}
            </p>
          </div>

          <div style={{ marginBottom: 48 }}>
            <h3 style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 18, fontWeight: 500,
              color: theme.text,
              margin: "0 0 16px",
              letterSpacing: "0.02em",
              transition: "color 0.3s ease",
            }}>Who This Is For</h3>
            <p style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 16, fontWeight: 300,
              color: theme.textMuted,
              lineHeight: 1.8,
              margin: 0,
              transition: "color 0.3s ease",
            }}>
              {details.whoThisHelps}
            </p>
          </div>
          <div style={{ marginBottom: 40, fontFamily: "'DM Sans', sans-serif", color: theme.textMuted, fontSize: 15, lineHeight: 1.8 }}>
            <p>Virtual individual sessions with Marcus Ghiasi, LMFT, California license #158475. Sessions are $210 for 45 minutes or $280 for 60 minutes. A superbill is available for possible out-of-network reimbursement; coverage depends on your plan.</p>
            <a href={slug === "emdr" ? "https://www.ptsd.va.gov/understand_tx/emdr.asp" : "https://www.nimh.nih.gov/health/topics/psychotherapies"} target="_blank" rel="noopener noreferrer" style={{ color: theme.accent, textDecoration: "underline" }}>
              {slug === "emdr" ? "Read the VA overview of EMDR for PTSD" : "Read NIMH guidance on psychotherapy and choosing care"}
            </a>
          </div>

         <div style={{
            background: darkMode ? `${theme.accent}15` : colors.tealPale,
            padding: "40px",
            borderRadius: 4,
            border: `1px solid ${theme.accent}30`,
            textAlign: "center",
            transition: "all 0.3s ease",
          }}>
            <h3 style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 28, fontWeight: 500,
              color: theme.text,
              margin: "0 0 16px",
              transition: "color 0.3s ease",
            }}>{details.ctaHeading}</h3>
            <p style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 15, fontWeight: 300,
              color: theme.textMuted,
              lineHeight: 1.7,
              margin: "0 0 28px",
              transition: "color 0.3s ease",
            }}>
              {details.ctaText}
            </p>
            <a href="/contact" onClick={(e) => { e.preventDefault(); navigate("/contact"); }} style={{ textDecoration: "none",
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 13, fontWeight: 500,
              letterSpacing: "0.12em", textTransform: "uppercase",
              color: darkMode ? theme.bg : colors.white, border: "none", cursor: "pointer",
              background: theme.accent,
              padding: "14px 32px", borderRadius: 2,
              transition: "all 0.3s ease",
            }}
            onMouseEnter={e => e.target.style.opacity = "0.9"}
            onMouseLeave={e => e.target.style.opacity = "1"}
            >Book Free Consultation</a>
          </div>
        </div>
      </section>
    </>
  );
}

// ========================================
// FAQ PAGE
// ========================================

function FAQPage() {
  const [ref, visible] = useScrollReveal();
  const [openIndex, setOpenIndex] = useState(null);
  const navigate = useNavigate();
  const { darkMode } = useDarkMode();
  const theme = getTheme(darkMode);

  // FAQ Schema for AI search
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.a
      }
    }))
  };

  return (
    <>
      <SEO metadata={mainPages.faq} />
      {/* FAQ Schema for AI Search */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      
      <section style={{
        background: theme.bg,
        padding: "160px 40px 80px",
        minHeight: "50vh",
        display: "flex",
        alignItems: "center",
        transition: "background 0.3s ease",
      }}>
        <div style={{ maxWidth: 900, margin: "0 auto", textAlign: "center" }}>
          <div style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 12, letterSpacing: "0.25em", textTransform: "uppercase",
            color: theme.accentMuted, marginBottom: 24,
            transition: "color 0.3s ease",
          }}>Common Questions</div>
          <h1 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(48px, 6vw, 72px)",
            fontWeight: 300, lineHeight: 1.1,
            color: theme.text, margin: "0 0 32px",
            transition: "color 0.3s ease",
          }}>
            Frequently Asked<br />
            <em style={{ color: theme.accent, fontStyle: "italic", transition: "color 0.3s ease" }}>Questions</em>
          </h1>
        </div>
      </section>

      <section ref={ref} style={{
        background: theme.bgAlt,
        padding: "60px 40px 120px",
        opacity: visible ? 1 : 0,
        transform: visible ? "none" : "translateY(30px)",
        transition: "all 0.3s ease",
      }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          {faqs.map((faq, i) => (
            <div key={i} style={{
              borderBottom: `1px solid ${theme.border}`,
              paddingBottom: 32, marginBottom: 32,
              transition: "border-color 0.3s ease",
            }}>
              <button
                type="button"
                id={`faq-question-${i}`}
                aria-expanded={openIndex === i}
                aria-controls={`faq-answer-${i}`}
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                style={{
                  width: "100%",
                  background: "none",
                  border: "none",
                  padding: 0,
                  cursor: "pointer",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  textAlign: "left",
                  marginBottom: openIndex === i ? 20 : 0,
                }}
              >
                <h3 style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: 24, fontWeight: 500,
                  color: theme.text,
                  margin: 0,
                  flex: 1,
                  transition: "color 0.3s ease",
                }}>{faq.q}</h3>
                <span style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 24,
                  color: theme.accent,
                  marginLeft: 16,
                  transition: "transform 0.3s, color 0.3s ease",
                  transform: openIndex === i ? "rotate(45deg)" : "none",
                }}>+</span>
              </button>
                <p id={`faq-answer-${i}`} aria-labelledby={`faq-question-${i}`} hidden={openIndex !== i} style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 15, fontWeight: 300,
                  color: theme.textMuted, lineHeight: 1.8,
                  margin: 0,
                  transition: "color 0.3s ease",
                }}>{faq.a}</p>
            </div>
          ))}

          <div style={{
            background: theme.bg,
            padding: "40px",
            borderRadius: 4,
            marginTop: 60,
            textAlign: "center",
            transition: "background 0.3s ease",
          }}>
            <h3 style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 28, fontWeight: 500,
              color: theme.text,
              margin: "0 0 16px",
              transition: "color 0.3s ease",
            }}>Have more questions?</h3>
            <p style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 15, fontWeight: 300,
              color: theme.textMuted,
              lineHeight: 1.7,
              margin: "0 0 28px",
              transition: "color 0.3s ease",
            }}>
              Let's talk. Schedule a free 15-minute consultation and we can discuss anything else on your mind.
            </p>
            <a href="/contact" onClick={(e) => { e.preventDefault(); navigate("/contact"); }} style={{ textDecoration: "none",
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 13, fontWeight: 500,
              letterSpacing: "0.12em", textTransform: "uppercase",
              color: darkMode ? theme.bg : colors.white, border: "none", cursor: "pointer",
              background: theme.accent,
              padding: "14px 32px", borderRadius: 2,
              transition: "all 0.3s ease",
            }}
            onMouseEnter={e => e.target.style.opacity = "0.9"}
            onMouseLeave={e => e.target.style.opacity = "1"}
            >Schedule Consultation</a>
          </div>
        </div>
      </section>
    </>
  );
}

// ========================================
// CONTACT PAGE
// ========================================

function ContactPage() {
  const { darkMode } = useDarkMode();
  const theme = getTheme(darkMode);
  const bookingUrl = "https://baysidewellnessandcounseling.janeapp.com/#/staff_member/1/treatment/1";
  const bodyStyle = { fontFamily: "'DM Sans', sans-serif", fontSize: 16, lineHeight: 1.8, color: theme.textMuted };
  const cardStyle = { background: theme.bgAlt, border: `1px solid ${theme.border}`, borderRadius: 4, padding: "clamp(24px, 5vw, 40px)" };

  return (
    <>
      <SEO metadata={mainPages.contact} />
      <section style={{ background: theme.bg, color: theme.text, padding: "160px 24px 100px", minHeight: "80vh", transition: "background 0.3s ease" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <div style={{ maxWidth: 740, margin: "0 auto 48px", textAlign: "center" }}>
            <p style={{ ...bodyStyle, fontSize: 12, letterSpacing: "0.2em", textTransform: "uppercase", color: theme.accent, marginBottom: 20 }}>Get Started</p>
            <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(44px, 6vw, 68px)", fontWeight: 300, lineHeight: 1.15, marginBottom: 24 }}>Let’s talk about what you need.</h1>
            <p style={bodyStyle}>Schedule a free 15-minute consultation with Marcus Ghiasi, LMFT, or call with a question about fit and availability. Individual therapy sessions are virtual for adults physically in California.</p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 280px), 1fr))", gap: 24 }}>
            <div style={cardStyle}>
              <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 34, fontWeight: 400, marginBottom: 16 }}>Book a free consultation</h2>
              <p style={{ ...bodyStyle, marginBottom: 24 }}>Choose an available time through Jane, the practice’s booking platform. The consultation is a chance to discuss your concerns, ask questions, and consider whether working together is a fit.</p>
              <a href={bookingUrl} target="_blank" rel="noopener noreferrer" style={{ display: "inline-block", padding: "16px 24px", borderRadius: 2, fontFamily: "'DM Sans', sans-serif", fontSize: 14, fontWeight: 500, background: theme.accent, color: darkMode ? theme.bg : colors.white, textDecoration: "none", textAlign: "center" }}>See Available Times →</a>
              <p style={{ ...bodyStyle, fontSize: 13, marginTop: 16 }}>Opens Jane in a new tab. No commitment to ongoing therapy.</p>
            </div>

            <div style={cardStyle}>
              <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 34, fontWeight: 400, marginBottom: 16 }}>Prefer to call?</h2>
              <p style={{ ...bodyStyle, marginBottom: 20 }}>You can call with a brief question about availability or the practice. If you leave a voicemail, include your name, callback number, and a good time to reach you.</p>
              <a href="tel:+14158575799" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 24, color: theme.accent, textDecoration: "underline" }}>415-857-5799</a>
              <p style={{ ...bodyStyle, fontSize: 14, marginTop: 20 }}>Please keep voicemail details brief. A detailed personal or clinical history can wait until you speak with Marcus.</p>
            </div>
          </div>

          <div style={{ ...cardStyle, marginTop: 32 }}>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 30, fontWeight: 400, marginBottom: 12 }}>What happens next?</h2>
            <p style={bodyStyle}>During the consultation, we can discuss what brings you to therapy, the approach, scheduling, and fees. Sessions are $210 for 45 minutes or $280 for 60 minutes. Bayside is a private-pay practice; a superbill is available for possible out-of-network reimbursement, depending on your plan.</p>
          </div>
          <p style={{ ...bodyStyle, fontSize: 14, marginTop: 28, textAlign: "center" }}>Bayside does not provide emergency response through routine calls or booking. If you need immediate support, visit the <a href="/crisis-resources" style={{ color: theme.accent, textDecoration: "underline" }}>crisis resources page</a>.</p>
        </div>
      </section>
    </>
  );
}

// ========================================
// BLOG PAGE
// ========================================

function BlogPage() {
  const navigate = useNavigate();
  const { darkMode } = useDarkMode();
  const theme = getTheme(darkMode);

  return (
    <>
      <SEO metadata={mainPages.blog} />
      <section style={{
        background: theme.bg,
        padding: "160px 40px 80px",
        minHeight: "50vh",
        display: "flex",
        alignItems: "center",
        transition: "background 0.3s ease",
      }}>
        <div style={{ maxWidth: 900, margin: "0 auto", textAlign: "center" }}>
          <div style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 12, letterSpacing: "0.25em", textTransform: "uppercase",
            color: theme.accentMuted, marginBottom: 24,
            transition: "color 0.3s ease",
          }}>Insights & Resources</div>
          <h1 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(48px, 6vw, 72px)",
            fontWeight: 300, lineHeight: 1.1,
            color: theme.text, margin: "0 0 32px",
            transition: "color 0.3s ease",
          }}>
            The Bayside<br />
            <em style={{ color: theme.accent, fontStyle: "italic", transition: "color 0.3s ease" }}>Blog</em>
          </h1>
          <p style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 17, fontWeight: 300,
            color: theme.textMuted, lineHeight: 1.8,
            margin: "0 auto",
            maxWidth: 640,
            transition: "color 0.3s ease",
          }}>
            Practical insights on therapy, mental health, and personal growth.
          </p>
        </div>
      </section>

      <section style={{
        background: theme.bgAlt,
        padding: "80px 40px 120px",
        transition: "background 0.3s ease",
      }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          {blogPosts.map((post, i) => (
            <a href={`/blog/${post.slug}`}
              key={post.slug}
              onClick={(e) => { e.preventDefault(); navigate(`/blog/${post.slug}`); }}
              className="blog-post-item"
              style={{ textDecoration: "none",
                width: "100%",
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: "40px 0",
                borderBottom: `1px solid ${theme.border}`,
                textAlign: "left",
                display: "grid",
                gridTemplateColumns: "240px 1fr",
                gap: 32,
                alignItems: "center",
                transition: "border-color 0.3s ease",
              }}
            >
              {/* Image thumbnail */}
              <div style={{
                width: "100%",
                aspectRatio: "16/10",
                borderRadius: 4,
                overflow: "hidden",
                background: theme.border,
                transition: "background 0.3s ease",
              }}>
                <img 
                  src={post.image} 
                  alt={post.title}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    transition: "transform 0.3s ease",
                  }}
                  onMouseEnter={e => e.target.style.transform = "scale(1.05)"}
                  onMouseLeave={e => e.target.style.transform = "scale(1)"}
                />
              </div>
              
              {/* Content */}
              <div>
                <div style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase",
                  color: theme.accent, marginBottom: 12,
                  fontWeight: 500,
                  transition: "color 0.3s ease",
                }}>{post.category}</div>
                <h2 style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: 32, fontWeight: 500,
                  color: theme.text,
                  margin: "0 0 12px",
                  transition: "color 0.3s ease",
                }}
                onMouseEnter={e => e.target.style.color = theme.accent}
                onMouseLeave={e => e.target.style.color = theme.text}
                >{post.title}</h2>
                <p style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 15, fontWeight: 300,
                  color: theme.textMuted,
                  lineHeight: 1.7,
                  margin: "0 0 12px",
                  transition: "color 0.3s ease",
                }}>{post.excerpt}</p>
                <div style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 13,
                  color: darkMode ? colors.darkTextMuted : colors.warmGray,
                  transition: "color 0.3s ease",
                }}>{post.date}</div>
              </div>
            </a>
          ))}
        </div>
      </section>
    </>
  );
}

// ========================================
// BLOG POST PAGE
// ========================================

// Parses blog post content (plain text, blank-line-separated) into real
// paragraph and heading elements. A block is treated as a heading when it's
// short, reasonably brief in word count, and has no terminal punctuation -
// this reliably distinguishes real section titles ("What Boundaries Actually
// Are") from short standalone sentences that happen to be brief ("You are
// not alone!"), since genuine headings never end in . ? ! , ; or :
function renderBlogContent(content, theme) {
  if (!content) return null;
  const blocks = content.split(/\n\s*\n/).map(b => b.trim()).filter(Boolean);
  
  const isHeading = (block) => {
    if (block.length > 80) return false;
    if (block.split(/\s+/).length > 12) return false;
    const lastChar = block[block.length - 1];
    if (".?!,;:".includes(lastChar)) return false;
    return true;
  };

  return blocks.map((block, i) => {
    if (isHeading(block)) {
      return (
        <h3 key={i} style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: 28, fontWeight: 500,
          color: theme.text,
          margin: "40px 0 16px",
          lineHeight: 1.3,
          transition: "color 0.3s ease",
        }}>{block}</h3>
      );
    }
        return (
      <p
        key={i}
        className="seo-body-link"
        style={{ margin: "0 0 24px", "--link-accent": theme.accent }}
        dangerouslySetInnerHTML={{ __html: block }}
      />
    );
  });
}
// Related page shown at the end of each blog post, keyed by post slug
const blogRelatedLinks = {
  "what-your-anger-is-actually-telling-you": { text: "If anger is costing you in your relationships or at work, here is how I approach it in individual therapy.", label: "Individual therapy for anger", to: "/anger-therapy-oakland" },
  "how-to-find-a-therapist-who-fits": { text: "Curious whether we would be a good fit? Read about my practice and book a free 15-minute consultation.", label: "Therapy in Oakland", to: "/therapy-oakland" },
  "why-anxiety-gets-worse-at-night": { text: "Explore how individual therapy can assess anxiety and help you consider care options.", label: "Anxiety therapy in Oakland", to: "/anxiety-therapy-oakland" },
  "burnout-is-not-a-scheduling-problem": { text: "Explore support for stress, competing demands, and the expectations you carry.", label: "Therapy in San Francisco", to: "/therapy-san-francisco" },
  "signs-you-need-therapy": { text: "If any of this sounded familiar, you can start with a free 15-minute consultation.", label: "Therapy in Oakland", to: "/therapy-oakland" },
  "cost-of-constant-exposure-desensitization": { text: "Persistent numbness can have several contributors. A consultation can help you discuss appropriate assessment and care.", label: "Trauma therapy in Oakland", to: "/trauma-therapy-oakland" },
  "master-trauma-or-die-trying": { text: "If you are always the one holding everyone else together, EMDR and IFS can help with what you carry.", label: "Trauma therapy in San Francisco", to: "/trauma-therapy-san-francisco" },
  "understanding-depression": { text: "Explore individual therapy for low mood and depression, including how we can discuss goals and care options.", label: "Depression therapy in Oakland", to: "/depression-therapy-oakland" },
  "the-5-lies-suicide-tells-us": { text: "If you or someone you know is struggling right now, support is available at any hour.", label: "Crisis resources", to: "/crisis-resources" },
  "ai-and-therapy": { text: "Want to know how I actually work with clients?", label: "About Marcus", to: "/about" },
  "rupture-and-repair": { text: "If conflict in your close relationships keeps repeating, individual therapy can help you understand the pattern.", label: "Therapy in Berkeley", to: "/therapy-berkeley" },
  "mens-mental-health": { text: "If you have been thinking about therapy and putting it off, here is how I work with men.", label: "Men's therapy in San Francisco", to: "/mens-therapy-san-francisco" },
  "valentines-day-and-men": { text: "If relationship pressure is weighing on you, this is the kind of work men's therapy focuses on.", label: "Men's therapy in Berkeley", to: "/mens-therapy-berkeley" },
  "attachment-styles-in-relationships": { text: "Read about exploring recurring relationship patterns in individual therapy.", label: "Psychodynamic therapy", to: "/services/psychodynamic" },
  "beginning-again": { text: "If you are ready to start something new, a free consultation is an easy first step.", label: "Therapy in Oakland", to: "/therapy-oakland" },
  "rethinking-therapy-2026": { text: "See the approaches I use and how to choose between them.", label: "Services", to: "/services" },
  "setting-boundaries-in-relationships": { text: "People-pleasing and weak boundaries often come from internal parts that learned to keep the peace. IFS works with those parts directly.", label: "IFS therapy in San Francisco", to: "/ifs-therapy-san-francisco" },
  "low-mood-depression": { text: "If low mood has been heavy for weeks, it is worth getting support.", label: "Depression therapy in San Francisco", to: "/depression-therapy-san-francisco" },
  "dream-bigger-2026": { text: "If you are working out what you want next, here is how I work with young adults.", label: "Young adults therapy in San Francisco", to: "/young-adults-therapy-san-francisco" },
  "starting-new-year-with-intention": { text: "If you want support with the year ahead, start with a free consultation.", label: "Therapy in Oakland", to: "/therapy-oakland" },
  "mindfulness-for-anxiety": { text: "If mindfulness has not been enough for your anxiety, CBT and EMDR work at a different level.", label: "Anxiety therapy in Berkeley", to: "/anxiety-therapy-berkeley" },
  "beginners-guide-to-ifs": { text: "Interested in parts work? Here is how IFS therapy works in practice.", label: "IFS therapy in Oakland", to: "/ifs-therapy-oakland" },
  "beginners-guide-to-emdr": { text: "Curious about EMDR? Here is what the process looks like and who it helps.", label: "EMDR therapy in Oakland", to: "/emdr-therapy-oakland" },
  "holiday-stress-loneliness": { text: "If this season is heavier than you expected, sessions are available online from anywhere in California.", label: "Online therapy in Oakland", to: "/online-therapy-oakland" },
  "managing-holiday-stress": { text: "If family visits leave you drained, individual therapy can change how you show up in them.", label: "Online therapy in San Francisco", to: "/online-therapy-san-francisco" },
  "family-therapy-benefits": { text: "Read about individual support for family stress, boundaries, and relationship patterns.", label: "Therapy in San Jose", to: "/therapy-san-jose" },
  "emdr-trauma-therapy-guide": { text: "Want to know if EMDR fits what you are carrying?", label: "EMDR therapy in San Francisco", to: "/emdr-therapy-san-francisco" },
  "when-labor-doesnt-go-according-to-plan": { text: "If a hard birth is still sitting with you, EMDR and trauma-focused therapy can help.", label: "Trauma therapy in Berkeley", to: "/trauma-therapy-berkeley" },
};

function articleDateToISOString(value) {
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const parts = /^([A-Za-z]+)\s+(\d{1,2}),\s+(\d{4})$/.exec(value);
  const month = months.indexOf(parts?.[1]);
  if (!parts || month < 0) throw new Error(`Invalid article date: ${value}`);
  return new Date(Date.UTC(Number(parts[3]), month, Number(parts[2]))).toISOString();
}

function BlogPostPage({ slug }) {
  const [ref, visible] = useScrollReveal();
  const navigate = useNavigate();
  const { darkMode } = useDarkMode();
  const theme = getTheme(darkMode);
  const post = blogPosts.find(p => p.slug === slug);

  if (!post) return <NotFoundPage />;

  // Article Schema for AI search
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": post.title,
    "description": post.excerpt,
    "image": post.image.startsWith("http") ? post.image : `https://baysidewellnessandcounseling.com${post.image}`,
    "datePublished": articleDateToISOString(post.date),
    "dateModified": articleDateToISOString(post.updatedDate || post.date),
    "author": {
      "@type": "Person",
      "name": "Marcus Ghiasi",
      "jobTitle": "Licensed Marriage and Family Therapist",
      "credential": "LMFT"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Bayside Wellness & Counseling",
      "logo": {
        "@type": "ImageObject",
        "url": "https://baysidewellnessandcounseling.com/og-image-square.jpg"
      }
    },
    "articleSection": post.category,
    "url": `https://baysidewellnessandcounseling.com/blog/${slug}`
  };

  return (
    <>
      <SEO metadata={generateBlogMeta(post)} />
      {/* Article Schema for AI Search */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      
      <section style={{
        background: theme.bg,
        padding: "160px 40px 60px",
        transition: "background 0.3s ease",
      }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <a href="/blog" onClick={(e) => { e.preventDefault(); navigate("/blog"); }} style={{ textDecoration: "none",
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 12, letterSpacing: "0.1em", textTransform: "uppercase",
            color: theme.accentMuted, background: "none", border: "none",
            cursor: "pointer", padding: 0,
            display: "inline-flex", alignItems: "center", gap: 8,
            marginBottom: 32,
            transition: "color 0.3s ease",
          }}>
            ← Back to Blog
          </a>
          <div style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase",
            color: theme.accent, marginBottom: 24,
            fontWeight: 500,
            transition: "color 0.3s ease",
          }}>{post.category} · {post.date}{post.updatedDate ? ` · Updated ${post.updatedDate}` : ""}</div>
          <h1 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(40px, 5vw, 56px)",
            fontWeight: 400, lineHeight: 1.2,
            color: theme.text, margin: "0",
            transition: "color 0.3s ease",
          }}>{post.title}</h1>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: theme.textMuted, marginTop: 20 }}>By <a href="/about" style={{ color: theme.accent }}>Marcus Ghiasi, LMFT</a> · California license #158475</p>
        </div>
      </section>

      {/* Hero Image */}
      <section style={{
        background: theme.bgAlt,
        padding: "0 40px 60px",
        transition: "background 0.3s ease",
      }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <div style={{
            width: "100%",
            aspectRatio: "16/9",
            borderRadius: 4,
            overflow: "hidden",
            background: theme.border,
            transition: "background 0.3s ease",
          }}>
            <img 
              src={post.image} 
              alt={post.title}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          </div>
        </div>
      </section>

      <section ref={ref} style={{
        background: theme.bgAlt,
        padding: "0 40px 120px",
        opacity: visible ? 1 : 0,
        transform: visible ? "none" : "translateY(30px)",
        transition: "all 0.3s ease",
      }}>
        <div style={{ maxWidth: 700, margin: "0 auto" }}>
          <div style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 17, fontWeight: 300,
            color: theme.textMuted,
            lineHeight: 1.9,
            transition: "color 0.3s ease",
          }}>
            {post.content ? (
              // Display full blog content, parsed into real headings and paragraphs
              renderBlogContent(post.content, theme)
            ) : (
              // Placeholder if content not yet added
              <>
                <p style={{ margin: "0 0 24px" }}>
                  {post.excerpt}
                </p>
                <p style={{ margin: "0 0 24px", fontStyle: "italic", color: darkMode ? colors.darkTextMuted : colors.warmGray, transition: "color 0.3s ease" }}>
                  Full blog post content will be added here. For now, check out the original post on your current site.
                </p>
              </>
            )}
          </div>

          {blogRelatedLinks[slug] && (
            <div style={{
              marginTop: 56,
              padding: "24px 28px",
              background: theme.bg,
              borderLeft: `3px solid ${theme.accent}`,
              borderRadius: 2,
              transition: "all 0.3s ease",
            }}>
              <p style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 16, fontWeight: 300,
                color: theme.textMuted,
                lineHeight: 1.8,
                margin: 0,
                transition: "color 0.3s ease",
              }}>
                {blogRelatedLinks[slug].text}{" "}
                <Link to={blogRelatedLinks[slug].to} style={{
                  color: theme.accent,
                  fontWeight: 500,
                  textDecoration: "underline",
                  textUnderlineOffset: 2,
                }}>{blogRelatedLinks[slug].label} →</Link>
              </p>
            </div>
          )}
          <div style={{
            background: theme.bg,
            padding: "40px",
            borderRadius: 4,
            marginTop: 80,
            textAlign: "center",
            transition: "background 0.3s ease",
          }}>
            <h3 style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 28, fontWeight: 500,
              color: theme.text,
              margin: "0 0 16px",
              transition: "color 0.3s ease",
            }}>Want to learn more?</h3>
            <p style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 15, fontWeight: 300,
              color: theme.textMuted,
              lineHeight: 1.7,
              margin: "0 0 28px",
              transition: "color 0.3s ease",
            }}>
              Schedule a free consultation to discuss how therapy can help you.
            </p>
            <a href="/contact" onClick={(e) => { e.preventDefault(); navigate("/contact"); }} style={{ textDecoration: "none",
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 13, fontWeight: 500,
              letterSpacing: "0.12em", textTransform: "uppercase",
              color: darkMode ? theme.bg : colors.white, border: "none", cursor: "pointer",
              background: theme.accent,
              padding: "14px 32px", borderRadius: 2,
              transition: "all 0.3s ease",
            }}
            onMouseEnter={e => e.target.style.opacity = "0.9"}
            onMouseLeave={e => e.target.style.opacity = "1"}
            >Get Started</a>
          </div>
        </div>
      </section>
    </>
  );
}

// ========================================
// SEO LANDING PAGE
// ========================================

function NotFoundPage() {
  const { darkMode } = useDarkMode();
  const theme = getTheme(darkMode);
    return (
      <>
        <SEO metadata={mainPages.notFound} noindex />
        <section style={{
          background: theme.bg,
          padding: "160px 40px",
          minHeight: "60vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "background 0.3s ease",
        }}>
          <div style={{ maxWidth: 600, margin: "0 auto", textAlign: "center" }}>
            <h1 style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(48px, 6vw, 72px)",
              fontWeight: 300,
              color: theme.text,
              margin: "0 0 24px",
              transition: "color 0.3s ease",
            }}>Page Not Found</h1>
            <p style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 17,
              color: theme.textMuted,
              lineHeight: 1.8,
              margin: "0 0 40px",
              transition: "color 0.3s ease",
            }}>
              The page you're looking for doesn't exist.
            </p>
            <a href="/" style={{ textDecoration: "none",
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 13, fontWeight: 500,
              letterSpacing: "0.12em", textTransform: "uppercase",
              color: darkMode ? theme.bg : colors.white,
              background: theme.accent,
              border: "none", cursor: "pointer",
              padding: "16px 40px", borderRadius: 2,
              transition: "all 0.3s ease",
            }}
            onMouseEnter={e => e.target.style.opacity = "0.9"}
            onMouseLeave={e => e.target.style.opacity = "1"}
            >Return Home</a>
          </div>
        </section>
      </>
    );
}

function SEOLandingPage({ slug }) {
  const navigate = useNavigate();
  const { darkMode } = useDarkMode();
  const theme = getTheme(darkMode);
  const pageData = seoPages[slug];

  if (!pageData) return <NotFoundPage />;

  return (
    <>
      <SEO metadata={generateSEOPageMeta(pageData)} />
      {/* Hero Section */}
      <section style={{
        background: theme.bg,
        padding: "160px 40px 80px",
        minHeight: "60vh",
        display: "flex",
        alignItems: "center",
        transition: "background 0.3s ease",
      }}>
        <div style={{ maxWidth: 900, margin: "0 auto", textAlign: "center" }}>
          <div style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 12, letterSpacing: "0.25em", textTransform: "uppercase",
            color: theme.accentMuted, marginBottom: 24,
            transition: "color 0.3s ease",
          }}>{pageData.city}, {pageData.state}</div>
          <h1 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(48px, 6vw, 72px)",
            fontWeight: 300, lineHeight: 1.1,
            color: theme.text, margin: "0 0 32px",
            transition: "color 0.3s ease",
          }}>{pageData.h1}</h1>
          <p style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 19, fontWeight: 300,
            color: theme.textMuted, lineHeight: 1.8,
            margin: "0 auto 40px",
            maxWidth: 700,
            transition: "color 0.3s ease",
          }}>{pageData.intro}</p>
          <a href="/contact" onClick={(e) => { e.preventDefault(); navigate("/contact"); }} style={{ textDecoration: "none",
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 13, fontWeight: 500,
            letterSpacing: "0.12em", textTransform: "uppercase",
            color: darkMode ? theme.bg : colors.white, border: "none", cursor: "pointer",
            background: theme.accent,
            padding: "16px 40px", borderRadius: 2,
            transition: "all 0.3s ease",
          }}
          onMouseEnter={e => e.target.style.opacity = "0.9"}
          onMouseLeave={e => e.target.style.opacity = "1"}
          >Book Free Consultation</a>
        </div>
      </section>

      {/* Local Content */}
{/* Local Content */}
<section style={{
  background: theme.bgAlt,
  padding: "100px 40px",
}}>
  <div style={{ maxWidth: 900, margin: "0 auto" }}>

    {/* Intro local content */}
    <p style={{
      fontFamily: "'DM Sans', sans-serif",
      fontSize: 17, fontWeight: 300,
      color: theme.textMuted,
      lineHeight: 1.9,
      margin: "0 0 80px",
      textAlign: "center",
      maxWidth: 700,
      marginLeft: "auto",
      marginRight: "auto",
      transition: "color 0.3s ease",
    }}>{pageData.localContent}</p>

    {/* Unique city/service content */}
    {pageData.uniqueContent && (
      <div style={{ marginBottom: 80 }}>
        <h2 style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: "clamp(32px, 4vw, 44px)",
          fontWeight: 400,
          color: theme.text,
          margin: "0 0 32px",
          textAlign: "center",
          transition: "color 0.3s ease",
        }}>{pageData.contentHeading || pageData.title}</h2>
        <div style={{ maxWidth: 700, margin: "0 auto" }}>
          {pageData.uniqueContent.map((para, i) => (
              <p key={i} className="seo-body-link" style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 16, fontWeight: 300,
              color: theme.textMuted,
              lineHeight: 1.9,
              margin: "0 0 24px",
              transition: "color 0.3s ease",
              "--link-accent": theme.accent,
            }} dangerouslySetInnerHTML={{ __html: para }} />
          ))}
        </div>
      </div>
    )}

    {/* Why Choose */}
    <h2 style={{
      fontFamily: "'Cormorant Garamond', serif",
      fontSize: "clamp(36px, 4vw, 48px)",
      fontWeight: 400,
      color: theme.text,
      margin: "0 0 40px",
      textAlign: "center",
      transition: "color 0.3s ease",
    }}>Practical Details About Care</h2>

    <div style={{
      display: "grid",
      gridTemplateColumns: "repeat(2, 1fr)",
      gap: 32,
      marginBottom: 80,
    }}>
      {pageData.whyChoose.map((item, i) => (
        <div key={i} style={{
          background: theme.bg,
          padding: "32px 28px",
          borderRadius: 4,
          border: `1px solid ${theme.border}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: 120,
          transition: "all 0.3s ease",
        }}>
          <p style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 15, fontWeight: 400,
            color: theme.text,
            lineHeight: 1.7,
            margin: 0,
            textAlign: "center",
            transition: "color 0.3s ease",
          }}>{item}</p>
        </div>
      ))}
    </div>

    {/* What to Expect */}
    <div style={{ marginBottom: 80 }}>
      <h2 style={{
        fontFamily: "'Cormorant Garamond', serif",
        fontSize: "clamp(36px, 4vw, 48px)",
        fontWeight: 400,
        color: theme.text,
        margin: "0 0 32px",
        textAlign: "center",
        transition: "color 0.3s ease",
      }}>What to Expect in Therapy</h2>
      <div style={{ maxWidth: 700, margin: "0 auto" }}>
        {pageData.uniqueWhatToExpect ? (
          pageData.uniqueWhatToExpect.map((para, i) => (
              <p key={i} className="seo-body-link" style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 16, fontWeight: 300,
              color: theme.textMuted,
              lineHeight: 1.9,
              margin: "0 0 20px",
              transition: "color 0.3s ease",
              "--link-accent": theme.accent,
            }} dangerouslySetInnerHTML={{ __html: para }} />
          ))
        ) : (
          <>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 16, fontWeight: 300, color: theme.textMuted, lineHeight: 1.9, margin: "0 0 20px", transition: "color 0.3s ease" }}>
              Starting therapy can feel uncertain. Here's what the process actually looks like: We'll begin with a free 15-minute consultation to discuss what brings you to therapy and whether we're a good fit. No commitment, no pressure.
            </p>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 16, fontWeight: 300, color: theme.textMuted, lineHeight: 1.9, margin: "0 0 20px", transition: "color 0.3s ease" }}>
              If you decide to move forward, we'll schedule your first full session. In that first meeting, we'll dive deeper into what you're experiencing, your goals for therapy, and which approach might work best.
            </p>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 16, fontWeight: 300, color: theme.textMuted, lineHeight: 1.9, margin: 0, transition: "color 0.3s ease" }}>
              Sessions are 45 or 60 minutes and can be scheduled weekly or biweekly. All sessions are virtual via secure telehealth.
            </p>
          </>
        )}
      </div>
    </div>

    {/* FAQ */}
    <div style={{ marginBottom: 80 }}>
      <h2 style={{
        fontFamily: "'Cormorant Garamond', serif",
        fontSize: "clamp(36px, 4vw, 48px)",
        fontWeight: 400,
        color: theme.text,
        margin: "0 0 40px",
        textAlign: "center",
        transition: "color 0.3s ease",
      }}>Frequently Asked Questions</h2>
      <div style={{ maxWidth: 700, margin: "0 auto", display: "grid", gap: 32 }}>
        {(pageData.uniqueFaqs || [
      { q: "How much does therapy cost?", a: "Sessions are $210 for 45 minutes or $280 for 60 minutes. I can provide a superbill for potential out-of-network reimbursement." },          
      { q: "Do you take insurance?", a: "I don't accept insurance directly, but I can provide a superbill you can submit to your insurance for potential reimbursement." },
          { q: "Are sessions really virtual?", a: "Yes. All sessions are conducted via secure telehealth video from anywhere private in California." },
          { q: "How do I know if we're a good fit?", a: "That's what the free 15-minute consultation is for. No commitment, no pressure." },
        ]).map((faq, i) => (
          <div key={i}>
            <h3 style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 17, fontWeight: 500,
              color: theme.text,
              margin: "0 0 12px",
              transition: "color 0.3s ease",
            }}>{faq.q}</h3>
            <p style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 15, fontWeight: 300,
              color: theme.textMuted,
              lineHeight: 1.8,
              margin: 0,
              transition: "color 0.3s ease",
            }}>{faq.a}</p>
          </div>
        ))}
      </div>
    </div>

    {/* How to Get Started */}
    <div style={{ marginBottom: 80 }}>
      <h2 style={{
        fontFamily: "'Cormorant Garamond', serif",
        fontSize: "clamp(36px, 4vw, 48px)",
        fontWeight: 400,
        color: theme.text,
        margin: "0 0 24px",
        textAlign: "center",
        transition: "color 0.3s ease",
      }}>How to Get Started</h2>
      <div style={{ maxWidth: 700, margin: "0 auto 40px" }}>
        <p style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: 16, fontWeight: 300,
          color: theme.textMuted,
          lineHeight: 1.9,
          margin: "0 0 20px",
          textAlign: "center",
          transition: "color 0.3s ease",
        }}>
          Start with a free 15-minute consultation through the booking calendar, or call 415-857-5799 with a brief question about fit and availability. The contact page has both options.
        </p>
        <div style={{ textAlign: "center" }}>
          <a href="/contact" onClick={(e) => { e.preventDefault(); navigate("/contact"); }} style={{ textDecoration: "none",
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 13, fontWeight: 500,
            letterSpacing: "0.12em", textTransform: "uppercase",
            color: darkMode ? theme.bg : colors.white,
            border: "none", cursor: "pointer",
            background: theme.accent,
            padding: "16px 40px", borderRadius: 2,
            transition: "all 0.3s ease",
          }}
          onMouseEnter={e => e.target.style.opacity = "0.9"}
          onMouseLeave={e => e.target.style.opacity = "1"}
          >Book Free Consultation</a>
        </div>
      </div>
    </div>

    {/* Services Grid */}
    <h2 style={{
      fontFamily: "'Cormorant Garamond', serif",
      fontSize: "clamp(36px, 4vw, 48px)",
      fontWeight: 400,
      color: theme.text,
      margin: "0 0 40px",
      textAlign: "center",
      transition: "color 0.3s ease",
    }}>Therapy Services in {pageData.city}</h2>

    <div style={{
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
      gap: 24,
    }}>
      {services.map((service) => (
        <a href={`/services/${service.slug}`}
          key={service.slug}
          onClick={(e) => { e.preventDefault(); navigate(`/services/${service.slug}`); }}
          style={{ textDecoration: "none",
            background: theme.bg,
            padding: "28px 24px",
            borderRadius: 4,
            border: `1px solid ${theme.border}`,
            transition: "all 0.3s ease",
            cursor: "pointer",
            textAlign: "left",
          }}
          onMouseEnter={e => {
            e.currentTarget.style.transform = "translateY(-4px)";
            e.currentTarget.style.boxShadow = darkMode ? "0 12px 40px rgba(77,189,183,0.15)" : "0 12px 40px rgba(46,125,122,0.12)";
            e.currentTarget.style.borderColor = theme.accent;
          }}
          onMouseLeave={e => {
            e.currentTarget.style.transform = "none";
            e.currentTarget.style.boxShadow = "none";
            e.currentTarget.style.borderColor = theme.border;
          }}
        >
          <div style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 24, fontWeight: 500,
            color: theme.text,
            marginBottom: 8,
            transition: "color 0.3s ease",
          }}>{service.name}</div>
          <div style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 12, fontWeight: 500,
            letterSpacing: "0.08em",
            color: theme.accent,
            textTransform: "uppercase",
            transition: "color 0.3s ease",
          }}>Learn More →</div>
        </a>
           ))}
    </div>

    {getTopicClusterLinks(slug, pageData.city).length > 0 && (
      <div style={{ marginTop: 48 }}>
        <h3 style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: "clamp(24px, 3vw, 30px)",
          fontWeight: 400,
          color: theme.text,
          margin: "0 0 24px",
          textAlign: "center",
          transition: "color 0.3s ease",
        }}>More Ways We Can Help in {pageData.city}</h3>
        <div style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: 10,
        }}>
            {getTopicClusterLinks(slug, pageData.city).map((link) => (
            <a key={link.slug}
              href={`/${link.slug}`}
              onClick={(e) => { e.preventDefault(); navigate(`/${link.slug}`); }}
              style={{ textDecoration: "none",
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 12, fontWeight: 400,
                padding: "8px 16px",
                border: `1px solid ${theme.border}`,
                borderRadius: 2,
                color: theme.textMuted,
                transition: "all 0.3s ease",
              }}
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    )}

    {getNearbyCityLinks(pageData.city, slug).length > 0 && (
      <div style={{ marginTop: 40 }}>
        <h2 style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: "clamp(32px, 4vw, 44px)",
          fontWeight: 400,
          color: theme.text,
          margin: "0 0 32px",
          textAlign: "center",
          transition: "color 0.3s ease",
        }}>Also Serving Nearby Areas</h2>
        <div style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: 12,
        }}>
            {getNearbyCityLinks(pageData.city, slug).map((nearby) => (
            <a key={nearby.slug}
              href={`/${nearby.slug}`}
              onClick={(e) => { e.preventDefault(); navigate(`/${nearby.slug}`); }}
              style={{ textDecoration: "none",
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 13, fontWeight: 400,
                padding: "10px 20px",
                border: `1px solid ${theme.border}`,
                borderRadius: 2,
                color: theme.textMuted,
                transition: "all 0.3s ease",
              }}
            >
              Therapy in {nearby.city}
            </a>
          ))}
        </div>
      </div>
    )}

  </div>
</section>
      {/* CTA Section */}
      <section style={{
        background: darkMode ? colors.darkBgLight : colors.charcoal,
        padding: "100px 40px",
        transition: "background 0.3s ease",
      }}>
        <div style={{ maxWidth: 800, margin: "0 auto", textAlign: "center" }}>
          <h2 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(40px, 5vw, 64px)",
            fontWeight: 300, lineHeight: 1.15,
            color: colors.white, margin: "0 0 24px",
          }}>
            Ready to get started?
          </h2>
          <p style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 16, fontWeight: 300,
            color: darkMode ? colors.darkTextMuted : "#A8B8B8", lineHeight: 1.8,
            margin: "0 0 40px", maxWidth: 520, marginLeft: "auto", marginRight: "auto",
            transition: "color 0.3s ease",
          }}>
            Schedule a free 15-minute consultation. No commitment, no pressure. Just a conversation about where you are and where you'd like to go.
          </p>
          <a href="/contact" onClick={(e) => { e.preventDefault(); navigate("/contact"); }} style={{ textDecoration: "none",
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 13, fontWeight: 500,
            letterSpacing: "0.12em", textTransform: "uppercase",
            color: darkMode ? theme.bg : colors.white, border: "none", cursor: "pointer",
            background: theme.accent,
            padding: "16px 40px", borderRadius: 2,
            transition: "all 0.3s ease",
          }}
          onMouseEnter={e => e.target.style.opacity = "0.9"}
          onMouseLeave={e => e.target.style.opacity = "1"}
          >Book Free Consultation</a>
        </div>
      </section>
    </>
  );
}

// ========================================
// CRISIS RESOURCES PAGE
// ========================================

function CrisisResourcesPage() {
  const { darkMode } = useDarkMode();
  const theme = getTheme(darkMode);
  const resources = [
    { title: "988 Suicide & Crisis Lifeline", description: "Support in the United States for suicidal crisis or emotional distress. Call, text, or use the online chat.", links: [
      { label: "Call 988", href: "tel:988?oai_link_source=model_response_hotline" },
      { label: "Text 988", href: "sms:988?oai_link_source=model_response_hotline" },
      { label: "Open Lifeline chat", href: "https://988lifeline.org/chat/?oai_link_source=model_response_hotline" },
    ] },
    { title: "Relationship abuse and safety support", description: "The National Domestic Violence Hotline provides support and safety-planning information. If your device or browsing may be monitored, consider whether it is safe to open a resource.", links: [
      { label: "National Domestic Violence Hotline", href: "https://www.thehotline.org/" },
    ] },
    { title: "Finding ongoing care", description: "For non-emergency support, NIMH explains ways to find mental health care. Routine appointments and callbacks are not immediate crisis services.", links: [
      { label: "NIMH: help for mental illnesses", href: "https://www.nimh.nih.gov/health/find-help" },
    ] },
  ];
  return (
    <>
      <SEO metadata={mainPages.crisisResources} />
      <section style={{ background: theme.bg, color: theme.text, padding: "160px 24px 100px", minHeight: "75vh" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(40px, 6vw, 64px)", fontWeight: 300 }}>Immediate Support & Crisis Resources</h1>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 17, lineHeight: 1.8 }}>If you are in immediate danger or have a medical emergency, call <a href="tel:911" style={{ color: theme.accent }}>911</a> or go to the nearest emergency department. Do not wait for a reply from Bayside.</p>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 16, lineHeight: 1.8, color: theme.textMuted }}>Bayside is an outpatient individual therapy practice. Routine calls and the booking calendar are not monitored for emergency response.</p>
          <div style={{ display: "grid", gap: 24, marginTop: 32 }}>
            {resources.map((resource) => (
              <div key={resource.title} style={{ background: theme.bgAlt, border: `1px solid ${theme.border}`, borderRadius: 4, padding: 28 }}>
                <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 30, margin: "0 0 12px" }}>{resource.title}</h2>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 16, lineHeight: 1.8, color: theme.textMuted }}>{resource.description}</p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 20 }}>
                  {resource.links.map((item) => <a key={item.href} href={item.href} style={{ fontFamily: "'DM Sans', sans-serif", color: theme.accent, fontSize: 16, textDecoration: "underline" }}>{item.label}</a>)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

// ========================================
// SEO PAGES DIRECTORY (Temporary - For Testing)
// ========================================

function SEODirectory() {
  const navigate = useNavigate();

  const cityPages = Object.keys(seoPages).filter(slug => slug.startsWith("therapy-"));
  const servicePages = Object.keys(seoPages).filter(slug => !slug.startsWith("therapy-") && !slug.startsWith("anxiety-"));
  const conditionPages = Object.keys(seoPages).filter(slug => slug.startsWith("anxiety-"));

  return (
    <section style={{
      background: colors.ivory,
      padding: "160px 40px 120px",
      minHeight: "100vh",
    }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <h1 style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: 48, fontWeight: 300,
          color: colors.charcoal,
          margin: "0 0 16px",
          textAlign: "center",
        }}>SEO Landing Pages Directory</h1>
        <p style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: 14, color: colors.warmGray,
          textAlign: "center",
          marginBottom: 60,
        }}>Testing directory - Remove before going live</p>

        {/* City Pages */}
        <div style={{ marginBottom: 60 }}>
          <h2 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 32, fontWeight: 400,
            color: colors.charcoal,
            margin: "0 0 24px",
          }}>City Pages ({cityPages.length})</h2>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
            gap: 16,
          }}>
            {cityPages.map(slug => (
              <a href={`/${slug}`}
                key={slug}
                onClick={(e) => { e.preventDefault(); navigate(`/${slug}`); }}
                style={{ textDecoration: "none",
                  background: colors.white,
                  border: `1px solid ${colors.ivoryDark}`,
                  padding: "16px",
                  borderRadius: 4,
                  cursor: "pointer",
                  textAlign: "left",
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 14,
                  color: colors.teal,
                  transition: "all 0.2s",
                }}
                onMouseEnter={e => e.target.style.background = colors.tealPale}
                onMouseLeave={e => e.target.style.background = colors.white}
              >
                {seoPages[slug].title}
              </a>
            ))}
          </div>
        </div>

        {/* Service + City Pages */}
        <div style={{ marginBottom: 60 }}>
          <h2 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 32, fontWeight: 400,
            color: colors.charcoal,
            margin: "0 0 24px",
          }}>Service + City Pages ({servicePages.length})</h2>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
            gap: 16,
          }}>
            {servicePages.map(slug => (
              <a href={`/${slug}`}
                key={slug}
                onClick={(e) => { e.preventDefault(); navigate(`/${slug}`); }}
                style={{ textDecoration: "none",
                  background: colors.white,
                  border: `1px solid ${colors.ivoryDark}`,
                  padding: "16px",
                  borderRadius: 4,
                  cursor: "pointer",
                  textAlign: "left",
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 14,
                  color: colors.teal,
                  transition: "all 0.2s",
                }}
                onMouseEnter={e => e.target.style.background = colors.tealPale}
                onMouseLeave={e => e.target.style.background = colors.white}
              >
                {seoPages[slug].title}
              </a>
            ))}
          </div>
        </div>

        {/* Condition + City Pages */}
        {conditionPages.length > 0 && (
          <div style={{ marginBottom: 60 }}>
            <h2 style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 32, fontWeight: 400,
              color: colors.charcoal,
              margin: "0 0 24px",
            }}>Condition + City Pages ({conditionPages.length})</h2>
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
              gap: 16,
            }}>
              {conditionPages.map(slug => (
                <a href={`/${slug}`}
                  key={slug}
                  onClick={(e) => { e.preventDefault(); navigate(`/${slug}`); }}
                  style={{ textDecoration: "none",
                    background: colors.white,
                    border: `1px solid ${colors.ivoryDark}`,
                    padding: "16px",
                    borderRadius: 4,
                    cursor: "pointer",
                    textAlign: "left",
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: 14,
                    color: colors.teal,
                    transition: "all 0.2s",
                  }}
                  onMouseEnter={e => e.target.style.background = colors.tealPale}
                  onMouseLeave={e => e.target.style.background = colors.white}
                >
                  {seoPages[slug].title}
                </a>
              ))}
            </div>
          </div>
        )}

        <div style={{
          background: colors.tealPale,
          padding: "32px",
          borderRadius: 4,
          textAlign: "center",
        }}>
          <p style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 15,
            color: colors.charcoal,
            margin: "0 0 20px",
          }}>
            <strong>Total SEO Pages: {Object.keys(seoPages).length}</strong>
          </p>
          <a href="/" onClick={(e) => { e.preventDefault(); navigate("/"); }} style={{ textDecoration: "none",
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 13, fontWeight: 500,
            letterSpacing: "0.12em", textTransform: "uppercase",
            color: colors.white,
            background: colors.teal,
            border: "none",
            padding: "14px 32px",
            borderRadius: 2,
            cursor: "pointer",
          }}>
            Back to Home
          </a>
        </div>
      </div>
    </section>
  );
}

// ========================================
// DYNAMIC ROUTE WRAPPERS
// ========================================

function ServiceDetailWrapper() {
  const { slug } = useParams();
  return <ServiceDetailPage slug={slug} />;
}

function BlogPostWrapper() {
  const { slug } = useParams();
  return <BlogPostPage slug={slug} />;
}

function SEOLandingWrapper() {
  const { slug } = useParams();
  return <SEOLandingPage slug={slug} />;
}

// ========================================
// SCROLL TO TOP ON ROUTE CHANGE
// ========================================

function ScrollToTop() {
  const location = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);
  
  return null;
}

// ========================================
// MAIN APP
// ========================================

export default function App() {
  // Match the prerendered light theme for the first client render.
  const [darkMode, setDarkMode] = useState(false);
  const [themeReady, setThemeReady] = useState(false);
  const themeChosenByUser = useRef(false);

  useEffect(() => {
    // An early click takes precedence over loading a saved preference.
    if (themeChosenByUser.current) return;
    let preferred = !!window.matchMedia?.('(prefers-color-scheme: dark)').matches;
    try {
      const saved = window.localStorage.getItem('darkMode');
      if (saved === 'true' || saved === 'false') preferred = saved === 'true';
    } catch {
      // Storage restrictions must not prevent the app from opening.
    }
    setDarkMode(preferred);
    setThemeReady(true);
  }, []);

  useEffect(() => {
    if (!themeReady) return;
    try {
      window.localStorage.setItem('darkMode', String(darkMode));
    } catch {
      // The theme remains usable even when a preference cannot be saved.
    }
  }, [darkMode, themeReady]);

  const toggleDarkMode = () => {
    themeChosenByUser.current = true;
    setThemeReady(true);
    setDarkMode((current) => !current);
  };

  return (
    <DarkModeContext.Provider value={{ darkMode, toggleDarkMode }}>
      <style dangerouslySetInnerHTML={{ __html: `
        ${fonts}
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { 
          background: ${darkMode ? colors.darkBg : colors.ivory}; 
          transition: background 0.3s ease;
        }
        .contact-grid { grid-template-columns: 1fr 1fr; }
        .contact-grid > div { width: 100%; }
        .seo-body-link a {
          color: var(--link-accent);
          font-weight: 500;
          text-decoration: underline;
          text-underline-offset: 2px;
          transition: opacity 0.2s ease;
        }
        .seo-body-link a:hover { opacity: 0.7; }
        @media (max-width: 360px) {
          .site-nav-brand > a { gap: 6px !important; }
          .site-nav-brand img { width: 26px !important; height: 26px !important; }
          .site-nav-brand > a > div > div:last-child { font-size: 7px !important; }
        }
        @media (max-width: 1240px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: block !important; }
        }
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: block !important; }
          .site-nav { padding: 0 18px !important; }
          .site-nav-inner { gap: 12px !important; min-height: 72px !important; }
          .site-nav-brand { gap: 10px !important; }
          .site-nav-brand > a { gap: 8px !important; }
          .site-nav-brand img { height: 30px !important; width: 30px !important; object-fit: contain; }
          .site-nav-brand > a > div > div:first-child { font-size: 18px !important; }
          .site-nav-brand > a > div > div:last-child { font-size: 8px !important; letter-spacing: 0.14em !important; }
          .site-nav-utilities { gap: 10px !important; }
          .site-nav .mobile-menu-btn { flex-shrink: 0; }
          section > div { grid-template-columns: 1fr !important; }
          .contact-grid { 
            grid-template-columns: 1fr !important;
            display: flex !important;
            flex-direction: column;
            align-items: center;
            gap: 40px;
          }
          .contact-grid > div {
            max-width: 520px;
            width: calc(100% - 40px);
          }
          .blog-post-item {
            grid-template-columns: 1fr !important;
            padding: 32px 0 !important;
            gap: 20px !important;
          }
          .blog-post-item h2 {
            font-size: 28px !important;
          }
          .services-grid {
            display: flex !important;
            flex-direction: column !important;
            align-items: center !important;
            gap: 32px !important;
          }
          .services-grid > button {
            max-width: 420px !important;
            width: 90% !important;
          }
          .about-buttons {
            flex-direction: column !important;
            width: 100% !important;
            align-items: stretch !important;
          }
          .about-buttons > button,
          .about-buttons > a {
            width: 100% !important;
            max-width: 100% !important;
            flex: 0 0 auto !important;
            min-width: 0 !important;
          }
          /* Add space between dark mode toggle and hamburger menu on mobile */
          .dark-mode-toggle {
            margin-right: 20px !important;
          }
        }
        
        /* Accessibility: Focus indicators for keyboard navigation */
        a:focus-visible,
        button:focus-visible,
        input:focus-visible,
        textarea:focus-visible,
        select:focus-visible,
        [role="button"]:focus-visible {
          outline: 2px solid #2E7D7A !important;
          outline-offset: 2px !important;
        }
        
        /* Ensure focus is visible on dark mode too */
        body.dark-mode a:focus-visible,
        body.dark-mode button:focus-visible,
        body.dark-mode input:focus-visible,
        body.dark-mode textarea:focus-visible {
          outline: 2px solid #4DBDB7 !important;
          outline-offset: 2px !important;
        }
      ` }} />
      
      <Nav />
      <ScrollToTop />
      <main id="main-content" role="main">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/services/:slug" element={<ServiceDetailWrapper />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:slug" element={<BlogPostWrapper />} />
          <Route path="/crisis-resources" element={<CrisisResourcesPage />} />
          <Route path="/contact" element={<ContactPage />} />
          {/* Local pages and missing-page fallback */}
          <Route path="/:slug" element={<SEOLandingWrapper />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <Footer />
      <Analytics />
    </DarkModeContext.Provider>
  );
}
