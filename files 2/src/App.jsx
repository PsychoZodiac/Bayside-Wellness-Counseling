import { useState, useEffect, useRef } from "react";
import logo from './assets/bayside-logo.png';

// ========================================
// DESIGN SYSTEM
// ========================================

const colors = {
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
};

const fonts = `
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=DM+Sans:wght@300;400;500;600&display=swap');
`;

// ========================================
// DATA
// ========================================

const services = [
  { 
    name: "EMDR Therapy", 
    slug: "emdr", 
    shortDesc: "Evidence-based trauma processing",
    desc: "Eye Movement Desensitization and Reprocessing (EMDR) is an evidence-based therapy that helps people heal from trauma and distressing life experiences. It works by helping the brain process stuck memories so they no longer feel overwhelming." 
  },
  { 
    name: "IFS Therapy (Parts Work)", 
    slug: "ifs", 
    shortDesc: "Individual therapy for internal healing",
    desc: "Internal Family Systems (IFS) is a compassionate approach to individual therapy that helps you understand the different 'parts' of yourself, including parts that protect you and parts that carry old wounds. It's powerful for trauma, anxiety, and building a healthier relationship with yourself." 
  },
  { 
    name: "Cognitive Behavioral Therapy", 
    slug: "cbt", 
    shortDesc: "Practical thought pattern work",
    desc: "CBT helps you identify and shift thought patterns that contribute to anxiety, depression, and stress. It's practical, structured, and one of the most well-researched approaches in mental health care." 
  },
  { 
    name: "Psychodynamic Therapy", 
    slug: "psychodynamic", 
    shortDesc: "Exploring root causes",
    desc: "Psychodynamic therapy explores how your past experiences, relationships, and unconscious patterns shape how you feel and behave today. It's a deeper approach that gets at root causes rather than surface symptoms." 
  },
  { 
    name: "Family Therapy", 
    slug: "family", 
    shortDesc: "Healing family relationships",
    desc: "Family therapy helps parents, teens, and families improve communication, resolve conflicts, and strengthen relationships. Whether you're navigating parenting challenges, supporting a college-aged student through transitions, or working through family dynamics, we create healthier patterns together." 
  },
  { 
    name: "Men's Therapy", 
    slug: "mens", 
    shortDesc: "A space built for men",
    desc: "Men's therapy provides a judgment-free space to work on anger, relationships, career stress, and emotional expression. Many men struggle silently with expectations to 'have it together.' Here, you can be honest about what's actually going on and develop healthier ways to cope, communicate, and show up in your life." 
  },
];

// Detailed content for individual service pages
const serviceDetails = {
  emdr: {
    howItWorks: "EMDR works by using bilateral stimulation (typically eye movements, but sometimes tapping or sounds) while you recall distressing memories. This helps your brain reprocess stuck traumatic material in a way that reduces its emotional charge. During a session, we'll identify a target memory, notice what comes up in your body and mind, and use bilateral stimulation to help your brain move through it. Most people describe feeling relief after just a few sessions, though complex trauma may take longer.",
    whoThisHelps: "EMDR is especially effective for single-incident trauma (car accidents, assaults, sudden loss), PTSD, phobias, panic attacks, and performance anxiety. It's also helpful for people who feel 'stuck' on a particular memory or event that keeps replaying. If you've tried talk therapy but still feel triggered by specific memories, EMDR might be the right fit.",
    ctaHeading: "Ready to move forward?",
    ctaText: "If you're tired of feeling stuck on what happened, let's talk about whether EMDR is right for you."
  },
  ifs: {
    howItWorks: "IFS is individual therapy focused on your internal world. In IFS, we work with the different 'parts' of you (not your actual family). We all have parts that protect us (like the inner critic or the people-pleaser) and parts that carry pain from the past. Rather than trying to get rid of these parts, we help them feel safe enough to relax. Sessions involve identifying which parts are active, understanding what they're trying to protect you from, and helping them trust that you (your 'Self') can handle things. It's gentle, curious, and surprisingly powerful.",
    whoThisHelps: "IFS is ideal for people struggling with internal conflict (feeling pulled in different directions), self-criticism, perfectionism, or patterns that feel hard to change. It's also effective for complex trauma, eating disorders, addiction, and anyone who feels like they're at war with themselves. If you've ever said 'part of me wants this, but another part feels terrified,' IFS can help. Note: This is individual therapy about your internal parts, not therapy with your actual family members.",
    ctaHeading: "Curious about parts work?",
    ctaText: "Schedule a consultation and we can explore whether IFS is the right approach for you."
  },
  cbt: {
    howItWorks: "CBT focuses on the connection between thoughts, feelings, and behaviors. We identify thought patterns that keep you stuck (like catastrophizing, black-and-white thinking, or mind-reading), examine the evidence for and against these thoughts, and practice more balanced ways of thinking. You'll also learn practical skills like behavioral activation (doing things even when you don't feel like it) and exposure (gradually facing feared situations). CBT is structured, goal-oriented, and often includes homework between sessions.",
    whoThisHelps: "CBT is one of the most researched approaches and works well for depression, generalized anxiety, social anxiety, panic disorder, OCD, and insomnia. It's especially helpful if you want a structured, skill-based approach with clear progress markers. If you're someone who likes frameworks, tools, and actionable steps, CBT might be a great fit.",
    ctaHeading: "Want a practical approach?",
    ctaText: "If you're looking for structured, skill-based therapy with clear steps forward, let's discuss if CBT is right for you."
  },
  psychodynamic: {
    howItWorks: "Psychodynamic therapy explores the connection between your past and present. We look at patterns in your relationships, recurring themes in your life, and unconscious beliefs that shape how you see yourself and others. Sessions are less structured than CBT. We follow what comes up for you, notice patterns together, and explore how early experiences influence your current struggles. It's a deeper dive that takes time but gets at root causes rather than just managing symptoms.",
    whoThisHelps: "This approach works well for people dealing with relationship patterns that keep repeating, chronic feelings of emptiness or dissatisfaction, difficulty understanding their own reactions, or a sense that something deeper is driving their struggles. It's also effective for personality-related issues and for people who want more than symptom relief. They want to understand themselves at a deeper level.",
    ctaHeading: "Looking for deeper understanding?",
    ctaText: "If you're interested in exploring the 'why' behind your patterns, book a consultation to see if this approach fits."
  },
  family: {
    howItWorks: "Family therapy involves bringing together the people in your relational system to work on communication, conflict resolution, and connection. Sessions might include you and your teen, you and your college-aged child, or your whole family. We create a safe space where everyone can be heard, explore patterns that aren't working, and practice new ways of relating. I help facilitate conversations that might feel impossible to have on your own. Sometimes I'll see individuals separately, other times we'll work together as a unit. For teens and college students, this often focuses on navigating transitions, family communication, and building healthier dynamics during critical developmental phases.",
    whoThisHelps: "Family therapy is effective for parents communicating with teens and college students around identity, autonomy, mental health, or life direction. It's valuable for families dealing with grief, addiction concerns, or simply wanting to improve how they relate to each other. I work with teens (high school age and up) and college students, focusing on relational and emotional issues rather than learning or developmental assessments. If your family relationships feel stuck or strained, this approach can help everyone move forward together.",
    ctaHeading: "Ready to work on it together?",
    ctaText: "Whether it's your family or your teen, let's discuss how therapy can help you reconnect."
  },
  mens: {
    howItWorks: "Men's therapy is a space where you don't have to perform or have all the answers. We work on whatever's getting in your way: anger that's hurting your relationships, stress that's affecting your performance, difficulty expressing emotions beyond frustration, or patterns that keep repeating. Sessions are direct, practical, and focused on real change. We use a blend of approaches depending on what fits: CBT for managing anger and stress, EMDR for processing past experiences, IFS for internal conflict, and psychodynamic work for understanding patterns. No fluff, no judgment, just honest work.",
    whoThisHelps: "This is for men who are tired of pretending everything is fine. It helps with anger issues (explosive reactions, passive aggression, resentment that builds), relationship problems (communication breakdown, emotional unavailability, conflict patterns), career and performance stress (burnout, imposter syndrome, work-life balance), and difficulty expressing emotions beyond anger. It's also effective for men dealing with transitions (fatherhood, divorce, career changes), trauma, or simply feeling stuck. If you're ready to do the work but want someone who gets it, this is for you.",
    ctaHeading: "Ready to do the work?",
    ctaText: "No judgment, no fluff. Let's have a real conversation about what's getting in your way."
  }
};

// SEO Landing Pages Data
const seoPages = {
  // ===== EXISTING PAGES =====
  "therapy-oakland": {
    city: "Oakland",
    state: "CA",
    slug: "therapy-oakland",
    title: "Therapy in Oakland, CA",
    metaTitle: "Oakland Therapist | LMFT | $240/session | EMDR, CBT, IFS | Free Consultation",
    metaDescription: "Licensed Oakland therapist (LMFT). Virtual EMDR, IFS, CBT, family therapy. $240/45min, $320/60min. Free 15-minute consultation. Serving all East Bay.",
    h1: "Licensed Therapist in Oakland, CA | LMFT | Virtual Therapy",
    intro: "If you're looking for a therapist in Oakland, you're in the right place. Bayside Wellness & Counseling offers virtual therapy to adults, teens, and families throughout Oakland and the greater Bay Area.",
    localContent: "Whether you're in Temescal, Lake Merritt, Rockridge, or anywhere else in Oakland, our telehealth platform makes it easy to access quality mental health care from wherever you are. No commute, no parking hassles. Just effective therapy that fits your schedule.",
    whyChoose: [
      "Licensed California therapist (LMFT)",
      "Flexible telehealth sessions across California",
      "Evidence-based approaches tailored to your needs",
      "Free 15-minute consultation call",
    ],
  },
  "emdr-therapy-san-francisco": {
    city: "San Francisco",
    state: "CA",
    slug: "emdr-therapy-san-francisco",
    title: "EMDR Therapy in San Francisco, CA",
    metaTitle: "EMDR Therapist San Francisco | LMFT | $240/session | Free Consultation",
    metaDescription: "Licensed EMDR therapist in San Francisco (LMFT). EMDR training for trauma, PTSD, anxiety. $240/45min. Free 15-minute consultation.",
    h1: "EMDR Therapist in San Francisco, CA | LMFT | Trauma Treatment",
    intro: "Looking for EMDR therapy in San Francisco? We help adults process trauma, reduce anxiety, and move past experiences that feel stuck. EMDR is one of the most researched and effective treatments for PTSD, single-incident trauma, and anxiety disorders.",
    localContent: "Serving clients throughout San Francisco, from the Mission to Pacific Heights, from SOMA to the Sunset. Our telehealth platform means you can access specialized EMDR treatment without navigating SF traffic or finding parking. Whether you're dealing with a specific traumatic event or ongoing anxiety, EMDR offers a path forward.",
    whyChoose: [
      "Licensed LMFT with EMDR training",
      "Effective for PTSD, phobias, panic attacks, and performance anxiety",
      "Often brings relief faster than traditional talk therapy",
      "Free 15-minute consultation call",
    ],
  },
  "anxiety-therapy-berkeley": {
    city: "Berkeley",
    state: "CA",
    slug: "anxiety-therapy-berkeley",
    title: "Anxiety Therapy in Berkeley, CA",
    metaTitle: "Anxiety Therapist Berkeley | LMFT | $240/session | Free Consultation",
    metaDescription: "Licensed anxiety therapist in Berkeley (LMFT). CBT, EMDR for anxiety, panic, social anxiety. $240/45min. Serving UC Berkeley students. Free consultation.",
    h1: "Anxiety Therapist in Berkeley, CA | LMFT | Treatment for Anxiety",
    intro: "If anxiety is running your life, you're not alone. Many people in Berkeley struggle with constant worry, social anxiety, panic attacks, or feeling on edge. We use evidence-based approaches like CBT and EMDR to help you understand what's driving your anxiety and build real tools to manage it.",
    localContent: "We work with clients throughout Berkeley, including UC Berkeley students, professionals in Downtown Berkeley, and families in North Berkeley and the Berkeley Hills. Telehealth makes it easy to fit therapy into your schedule without the stress of commuting or finding time between work and life.",
    whyChoose: [
      "Licensed LMFT specializing in anxiety treatment",
      "CBT, EMDR, and other evidence-based approaches",
      "Experience working with students, professionals, and families",
      "Free 15-minute consultation call",
    ],
  },

  // ===== SAN FRANCISCO =====
  "therapy-san-francisco": {
    city: "San Francisco",
    state: "CA",
    slug: "therapy-san-francisco",
    title: "Therapy in San Francisco, CA",
    metaTitle: "San Francisco Therapist | LMFT | $240/session | EMDR, CBT, IFS | Free Consultation",
    metaDescription: "Licensed SF therapist (LMFT). Virtual EMDR, IFS, CBT, family therapy. $240/45min. Free 15-minute consultation. Serving all San Francisco neighborhoods.",
    h1: "Licensed Therapist in San Francisco | LMFT | Virtual Therapy",
    intro: "Finding a therapist in San Francisco shouldn't add to your stress. Bayside Wellness & Counseling offers virtual therapy to adults, teens, and families across all SF neighborhoods.",
    localContent: "From the Marina to the Mission, Nob Hill to the Outer Sunset, our telehealth platform brings quality mental health care directly to you. No Muni delays, no parking nightmares. Just effective therapy that works with your SF lifestyle.",
    whyChoose: [
      "Licensed California therapist (LMFT)",
      "EMDR, IFS, CBT, and family therapy approaches",
      "Virtual sessions across all of California",
      "Free 15-minute consultation call",
    ],
  },

  // ===== EAST BAY =====
  "therapy-berkeley": {
    city: "Berkeley",
    state: "CA",
    slug: "therapy-berkeley",
    title: "Therapy in Berkeley, CA",
    metaTitle: "Berkeley Therapist | LMFT | $240/session | EMDR, CBT, IFS | Free Consultation",
    metaDescription: "Licensed Berkeley therapist (LMFT). Virtual therapy for UC Berkeley students and East Bay residents. $240/45min. Free 15-minute consultation. Book today.",
    h1: "Licensed Therapist in Berkeley, CA | LMFT | Virtual Therapy",
    intro: "Looking for a therapist in Berkeley? We provide virtual therapy to students, professionals, and families throughout Berkeley and the East Bay.",
    localContent: "Whether you're near UC Berkeley, in the Elmwood District, or up in the Berkeley Hills, our telehealth services make it easy to access quality mental health care. Work with a therapist who understands the unique pressures of living in Berkeley.",
    whyChoose: [
      "Licensed LMFT with UC Berkeley student experience",
      "Evidence-based therapy for anxiety, depression, and trauma",
      "Flexible scheduling around classes and work",
      "Free 15-minute consultation call",
    ],
  },
  "therapy-alameda": {
    city: "Alameda",
    state: "CA",
    slug: "therapy-alameda",
    title: "Therapy in Alameda, CA",
    metaTitle: "Alameda Therapist | LMFT | $240/session | Virtual Therapy | Free Consultation",
    metaDescription: "Licensed Alameda therapist (LMFT). Virtual EMDR, CBT, family therapy. $240/45min. Serving the island and East Bay. Free consultation. Book today.",
    h1: "Licensed Therapist in Alameda, CA | LMFT | Virtual Therapy",
    intro: "Alameda residents deserve accessible, quality mental health care. Bayside Wellness & Counseling provides virtual therapy to adults, teens, and families on the island and beyond.",
    localContent: "From the West End to Bay Farm Island, our telehealth platform brings therapy to your home. No bridge traffic, no searching for parking. Just effective mental health support when you need it.",
    whyChoose: [
      "Licensed California LMFT",
      "EMDR, IFS, and CBT for trauma, anxiety, and depression",
      "Family therapy for parents and teens",
      "Free 15-minute consultation call",
    ],
  },
  "therapy-emeryville": {
    city: "Emeryville",
    state: "CA",
    slug: "therapy-emeryville",
    title: "Therapy in Emeryville, CA",
    metaTitle: "Emeryville Therapist | LMFT | $240/session | Virtual Therapy | Free Consultation",
    metaDescription: "Licensed Emeryville therapist (LMFT). Virtual EMDR, CBT, family therapy. $240/45min. Serving East Bay professionals. Free consultation.",
    h1: "Licensed Therapist in Emeryville, CA | LMFT | Virtual Therapy",
    intro: "Looking for therapy in Emeryville? We offer virtual mental health services to professionals, families, and individuals throughout Emeryville and the surrounding East Bay.",
    localContent: "Whether you work at one of Emeryville's tech companies or live near the Marina, telehealth therapy fits seamlessly into your schedule. Quality mental health care without the commute.",
    whyChoose: [
      "Licensed LMFT with work stress expertise",
      "Trauma therapy using EMDR and other evidence-based methods",
      "Flexible scheduling for busy professionals",
      "Free 15-minute consultation call",
    ],
  },
  "therapy-piedmont": {
    city: "Piedmont",
    state: "CA",
    slug: "therapy-piedmont",
    title: "Therapy in Piedmont, CA",
    metaTitle: "Piedmont Therapist | LMFT | $240/session | Teen & Family Therapy | Free Consultation",
    metaDescription: "Licensed Piedmont therapist (LMFT). Virtual teen therapy, family therapy, anxiety treatment. $240/45min. Free 15-minute consultation. Book today.",
    h1: "Licensed Therapist in Piedmont, CA | LMFT | Virtual Therapy",
    intro: "Piedmont families deserve compassionate, effective mental health support. We provide virtual therapy to teens, adults, and families throughout Piedmont and the Oakland hills.",
    localContent: "Our telehealth platform makes it easy for Piedmont residents to access quality therapy without leaving home. Whether you're working on family dynamics, teen anxiety, or personal growth, we're here to help.",
    whyChoose: [
      "Licensed LMFT specializing in family therapy",
      "Experience with academic pressure and achievement stress",
      "EMDR for trauma and anxiety disorders",
      "Free 15-minute consultation call",
    ],
  },
  "therapy-san-leandro": {
    city: "San Leandro",
    state: "CA",
    slug: "therapy-san-leandro",
    title: "Therapy in San Leandro, CA",
    metaTitle: "San Leandro Therapist | LMFT | $240/session | Virtual Therapy | Free Consultation",
    metaDescription: "Licensed San Leandro therapist (LMFT). Virtual EMDR, CBT, family therapy. $240/45min. Serving East Bay residents. Free consultation.",
    h1: "Licensed Therapist in San Leandro, CA | LMFT | Virtual Therapy",
    intro: "San Leandro residents looking for therapy have options. Bayside Wellness & Counseling provides virtual mental health services to adults, teens, and families throughout the East Bay.",
    localContent: "Whether you're in the Manor, Bay-O-Vista, or anywhere in San Leandro, our telehealth platform brings quality therapy to you. No need to drive to Oakland or San Francisco for good mental health care.",
    whyChoose: [
      "Licensed California LMFT",
      "Treatment for anxiety, depression, and relationship issues",
      "Men's therapy and family therapy available",
      "Free 15-minute consultation call",
    ],
  },
  "therapy-hayward": {
    city: "Hayward",
    state: "CA",
    slug: "therapy-hayward",
    title: "Therapy in Hayward, CA",
    metaTitle: "Hayward Therapist | LMFT | $240/session | EMDR, CBT | Free Consultation",
    metaDescription: "Licensed Hayward therapist (LMFT). Virtual EMDR, CBT, family therapy. $240/45min. Serving East Bay residents. Free 15-minute consultation.",
    h1: "Licensed Therapist in Hayward, CA | LMFT | Virtual Therapy",
    intro: "Finding the right therapist in Hayward matters. We provide virtual therapy to adults, teens, and families throughout Hayward and the greater East Bay.",
    localContent: "From Downtown Hayward to the Southgate area, our telehealth services make mental health care accessible. Work with a licensed therapist from the comfort of your own home.",
    whyChoose: [
      "Licensed LMFT serving East Bay",
      "EMDR training for processing difficult experiences",
      "Family therapy and teen counseling",
      "Free 15-minute consultation call",
    ],
  },
  "therapy-fremont": {
    city: "Fremont",
    state: "CA",
    slug: "therapy-fremont",
    title: "Therapy in Fremont, CA",
    metaTitle: "Fremont Therapist | LMFT | $240/session | Virtual Therapy | Free Consultation",
    metaDescription: "Licensed Fremont therapist (LMFT). Virtual EMDR, CBT, family therapy. $240/45min. Culturally responsive care. Free 15-minute consultation.",
    h1: "Licensed Therapist in Fremont, CA | LMFT | Virtual Therapy",
    intro: "Fremont is a diverse, thriving community, and mental health support should be accessible to everyone. We provide virtual therapy to adults, teens, and families across Fremont.",
    localContent: "Whether you're in Niles, Mission San Jose, or Warm Springs, telehealth makes therapy convenient. Quality mental health care that fits into your South Bay lifestyle.",
    whyChoose: [
      "Licensed LMFT with culturally responsive approach",
      "Treatment for anxiety, depression, and work stress",
      "Teen therapy and family counseling",
      "Free 15-minute consultation call",
    ],
  },
  "therapy-pleasanton": {
    city: "Pleasanton",
    state: "CA",
    slug: "therapy-pleasanton",
    title: "Therapy in Pleasanton, CA",
    metaTitle: "Pleasanton Therapist | LMFT | $240/session | Family & Teen Therapy | Free Consultation",
    metaDescription: "Licensed Pleasanton therapist (LMFT). Virtual family therapy, teen counseling, anxiety treatment. $240/45min. Serving Tri-Valley. Free consultation.",
    h1: "Licensed Therapist in Pleasanton, CA | LMFT | Virtual Therapy",
    intro: "Pleasanton families and professionals deserve accessible mental health support. We offer virtual therapy for adults, teens, and families throughout the Tri-Valley.",
    localContent: "From Downtown Pleasanton to Ruby Hill, our telehealth platform brings quality therapy to you. Work with a licensed therapist without the drive to Oakland or San Francisco.",
    whyChoose: [
      "Licensed LMFT specializing in family therapy",
      "Treatment for achievement stress and performance anxiety",
      "EMDR for trauma and difficult life transitions",
      "Free 15-minute consultation call",
    ],
  },
  "therapy-walnut-creek": {
    city: "Walnut Creek",
    state: "CA",
    slug: "therapy-walnut-creek",
    title: "Therapy in Walnut Creek, CA",
    metaTitle: "Walnut Creek Therapist | LMFT | $240/session | EMDR, CBT, IFS | Free Consultation",
    metaDescription: "Licensed Walnut Creek therapist (LMFT). Virtual EMDR, IFS, CBT therapy. $240/45min. Serving Contra Costa County. Free 15-minute consultation.",
    h1: "Licensed Therapist in Walnut Creek, CA | LMFT | Virtual Therapy",
    intro: "Looking for therapy in Walnut Creek? We provide virtual mental health services to adults, teens, and families throughout Walnut Creek and Contra Costa County.",
    localContent: "Whether you're in Downtown Walnut Creek, Northgate, or Rudgear Estates, telehealth makes therapy accessible. Quality mental health care without the hassle of finding parking or fighting traffic.",
    whyChoose: [
      "Licensed LMFT serving Contra Costa County",
      "EMDR, IFS, and CBT for various mental health concerns",
      "Men's therapy and family counseling",
      "Free 15-minute consultation call",
    ],
  },
  "therapy-concord": {
    city: "Concord",
    state: "CA",
    slug: "therapy-concord",
    title: "Therapy in Concord, CA",
    metaTitle: "Concord Therapist | LMFT | $240/session | Virtual Therapy | Free Consultation",
    metaDescription: "Licensed Concord therapist (LMFT). Virtual EMDR, CBT, family therapy. $240/45min. Serving Contra Costa County. Free 15-minute consultation.",
    h1: "Licensed Therapist in Concord, CA | LMFT | Virtual Therapy",
    intro: "Concord residents looking for mental health support have found the right place. We offer virtual therapy to adults, teens, and families throughout Contra Costa County.",
    localContent: "From Downtown Concord to Monument Corridor, our telehealth services bring quality therapy to your home. Accessible mental health care for the entire family.",
    whyChoose: [
      "Licensed California LMFT",
      "Family therapy and teen counseling available",
      "Men's therapy specializing in anger and relationships",
      "Free 15-minute consultation call",
    ],
  },
  "therapy-richmond": {
    city: "Richmond",
    state: "CA",
    slug: "therapy-richmond",
    title: "Therapy in Richmond, CA",
    metaTitle: "Richmond Therapist | LMFT | $240/session | Virtual Therapy | Free Consultation",
    metaDescription: "Licensed Richmond therapist (LMFT). Virtual EMDR, CBT, family therapy. $240/45min. Culturally responsive care. Free 15-minute consultation.",
    h1: "Licensed Therapist in Richmond, CA | LMFT | Virtual Therapy",
    intro: "Richmond deserves accessible, quality mental health care. We provide virtual therapy to adults, teens, and families throughout Richmond and West Contra Costa County.",
    localContent: "Whether you're in Point Richmond, the Iron Triangle, or the Richmond Annex, telehealth brings therapy directly to you. Mental health support that's both affordable and effective.",
    whyChoose: [
      "Licensed LMFT with culturally responsive approach",
      "Trauma-informed care using EMDR and other approaches",
      "Family therapy and teen support",
      "Free 15-minute consultation call",
    ],
  },
  "therapy-pleasant-hill": {
    city: "Pleasant Hill",
    state: "CA",
    slug: "therapy-pleasant-hill",
    title: "Therapy in Pleasant Hill, CA",
    metaTitle: "Pleasant Hill Therapist | LMFT | $240/session | Family Therapy | Free Consultation",
    metaDescription: "Licensed Pleasant Hill therapist (LMFT). Virtual family therapy, anxiety treatment, depression counseling. $240/45min. Free 15-minute consultation.",
    h1: "Licensed Therapist in Pleasant Hill, CA | LMFT | Virtual Therapy",
    intro: "Pleasant Hill residents looking for therapy can access quality mental health care from home. We provide virtual therapy to adults, teens, and families throughout Contra Costa County.",
    localContent: "Our telehealth platform makes therapy convenient for Pleasant Hill families. Whether you're dealing with anxiety, relationship issues, or life transitions, we're here to help.",
    whyChoose: [
      "Licensed LMFT specializing in family therapy",
      "Treatment for anxiety, depression, and stress",
      "EMDR for trauma and difficult experiences",
      "Free 15-minute consultation call",
    ],
  },

  // ===== PENINSULA/SOUTH BAY =====
  "therapy-san-jose": {
    city: "San Jose",
    state: "CA",
    slug: "therapy-san-jose",
    title: "Therapy in San Jose, CA",
    metaTitle: "San Jose Therapist | LMFT | $240/session | EMDR, CBT, IFS | Free Consultation",
    metaDescription: "Licensed San Jose therapist (LMFT). Virtual EMDR, CBT, family therapy. $240/45min. Serving Silicon Valley. Free 15-minute consultation. Book today.",
    h1: "Licensed Therapist in San Jose, CA | LMFT | Virtual Therapy",
    intro: "San Jose is the heart of Silicon Valley, and the pressure can be intense. We provide virtual therapy to adults, teens, and families throughout San Jose and the South Bay.",
    localContent: "From Willow Glen to Almaden Valley, Rose Garden to Evergreen, our telehealth platform brings quality mental health care to you. Work with a therapist who understands the unique challenges of living in the tech capital.",
    whyChoose: [
      "Licensed LMFT with tech industry experience",
      "Treatment for anxiety, depression, and work-life balance",
      "Family therapy and teen counseling",
      "Free 15-minute consultation call",
    ],
  },
  "therapy-palo-alto": {
    city: "Palo Alto",
    state: "CA",
    slug: "therapy-palo-alto",
    title: "Therapy in Palo Alto, CA",
    metaTitle: "Palo Alto Therapist | LMFT | $240/session | Stanford Students | Free Consultation",
    metaDescription: "Licensed Palo Alto therapist (LMFT). Virtual therapy for Stanford students and professionals. $240/45min. EMDR, CBT, IFS. Free consultation. Book today.",
    h1: "Licensed Therapist in Palo Alto, CA | LMFT | Virtual Therapy",
    intro: "Palo Alto is known for excellence, but the pressure to perform can take a toll. We provide virtual therapy to students, professionals, and families throughout Palo Alto and the mid-Peninsula.",
    localContent: "Whether you're near Stanford, in Old Palo Alto, or in the Midtown area, our telehealth services make mental health care accessible. Work with a therapist who understands achievement stress and its impact.",
    whyChoose: [
      "Licensed LMFT with Stanford student experience",
      "Treatment for anxiety, perfectionism, and burnout",
      "Teen therapy and family counseling",
      "Free 15-minute consultation call",
    ],
  },
  "therapy-mountain-view": {
    city: "Mountain View",
    state: "CA",
    slug: "therapy-mountain-view",
    title: "Therapy in Mountain View, CA",
    metaTitle: "Mountain View Therapist | LMFT | $240/session | Virtual Therapy | Free Consultation",
    metaDescription: "Licensed Mountain View therapist (LMFT). Virtual therapy for tech professionals. $240/45min. EMDR, CBT, IFS. Serving Silicon Valley. Free consultation.",
    h1: "Licensed Therapist in Mountain View, CA | LMFT | Virtual Therapy",
    intro: "Mountain View professionals and families deserve accessible mental health support. We offer virtual therapy to adults, teens, and families throughout Mountain View and the mid-Peninsula.",
    localContent: "From Downtown Mountain View to Moffett Field, our telehealth platform brings quality therapy to you. Mental health care that fits into your Silicon Valley lifestyle.",
    whyChoose: [
      "Licensed LMFT with tech burnout experience",
      "Evidence-based therapy for anxiety and depression",
      "Flexible scheduling for busy professionals",
      "Free 15-minute consultation call",
    ],
  },
  "therapy-sunnyvale": {
    city: "Sunnyvale",
    state: "CA",
    slug: "therapy-sunnyvale",
    title: "Therapy in Sunnyvale, CA",
    metaTitle: "Sunnyvale Therapist | LMFT | $240/session | Virtual Therapy | Free Consultation",
    metaDescription: "Licensed Sunnyvale therapist (LMFT). Virtual EMDR, CBT, family therapy. $240/45min. Serving Silicon Valley. Free 15-minute consultation.",
    h1: "Licensed Therapist in Sunnyvale, CA | LMFT | Virtual Therapy",
    intro: "Sunnyvale is home to tech workers, families, and students who all deserve quality mental health support. We provide virtual therapy across Sunnyvale and the South Bay.",
    localContent: "Whether you're in Murphy Ranch, the Heritage District, or near Moffett Park, telehealth makes therapy convenient. Quality mental health care without the commute.",
    whyChoose: [
      "Licensed California LMFT",
      "Family therapy and relationship counseling",
      "EMDR for trauma and anxiety disorders",
      "Free 15-minute consultation call",
    ],
  },
  "therapy-redwood-city": {
    city: "Redwood City",
    state: "CA",
    slug: "therapy-redwood-city",
    title: "Therapy in Redwood City, CA",
    metaTitle: "Redwood City Therapist | LMFT | $240/session | EMDR, CBT | Free Consultation",
    metaDescription: "Licensed Redwood City therapist (LMFT). Virtual EMDR, CBT, family therapy. $240/45min. Serving the Peninsula. Free 15-minute consultation.",
    h1: "Licensed Therapist in Redwood City, CA | LMFT | Virtual Therapy",
    intro: "Redwood City residents deserve accessible, compassionate mental health care. We offer virtual therapy to adults, teens, and families throughout Redwood City and the Peninsula.",
    localContent: "From Downtown Redwood City to Emerald Hills, our telehealth platform brings quality therapy to your home. Mental health support that works with your Peninsula lifestyle.",
    whyChoose: [
      "Licensed LMFT serving the Peninsula",
      "Treatment for anxiety, depression, and trauma",
      "Family therapy for parents and teens",
      "Free 15-minute consultation call",
    ],
  },
  "therapy-san-mateo": {
    city: "San Mateo",
    state: "CA",
    slug: "therapy-san-mateo",
    title: "Therapy in San Mateo, CA",
    metaTitle: "San Mateo Therapist | LMFT | $240/session | Virtual Therapy | Free Consultation",
    metaDescription: "Licensed San Mateo therapist (LMFT). Virtual EMDR, CBT, family therapy. $240/45min. Serving the Peninsula. Free 15-minute consultation.",
    h1: "Licensed Therapist in San Mateo, CA | LMFT | Virtual Therapy",
    intro: "San Mateo families and professionals need mental health support that's both effective and convenient. We provide virtual therapy to adults, teens, and families throughout San Mateo County.",
    localContent: "Whether you're in Downtown San Mateo, Hillsdale, or Baywood, our telehealth services make therapy accessible. Quality mental health care without fighting Peninsula traffic.",
    whyChoose: [
      "Licensed LMFT serving San Mateo County",
      "EMDR, CBT, and family therapy approaches",
      "Treatment for anxiety, depression, and relationship issues",
      "Free 15-minute consultation call",
    ],
  },
  "therapy-san-carlos": {
    city: "San Carlos",
    state: "CA",
    slug: "therapy-san-carlos",
    title: "Therapy in San Carlos, CA",
    metaTitle: "San Carlos Therapist | LMFT | $240/session | Family Therapy | Free Consultation",
    metaDescription: "Licensed San Carlos therapist (LMFT). Virtual family therapy, teen counseling, anxiety treatment. $240/45min. Free 15-minute consultation.",
    h1: "Licensed Therapist in San Carlos, CA | LMFT | Virtual Therapy",
    intro: "San Carlos is a close-knit community, and mental health matters here. We offer virtual therapy to adults, teens, and families throughout San Carlos and the mid-Peninsula.",
    localContent: "Our telehealth platform makes it easy for San Carlos residents to access quality therapy. Whether you're working on family dynamics, teen anxiety, or personal growth, we're here to help.",
    whyChoose: [
      "Licensed LMFT specializing in family therapy",
      "Treatment for anxiety, depression, and life transitions",
      "EMDR for trauma processing",
      "Free 15-minute consultation call",
    ],
  },
  "therapy-burlingame": {
    city: "Burlingame",
    state: "CA",
    slug: "therapy-burlingame",
    title: "Therapy in Burlingame, CA",
    metaTitle: "Burlingame Therapist | LMFT | $240/session | Virtual Therapy | Free Consultation",
    metaDescription: "Licensed Burlingame therapist (LMFT). Virtual EMDR, CBT, family therapy. $240/45min. Serving the Peninsula. Free 15-minute consultation.",
    h1: "Licensed Therapist in Burlingame, CA | LMFT | Virtual Therapy",
    intro: "Burlingame residents deserve quality mental health support close to home. We provide virtual therapy to adults, teens, and families throughout Burlingame and the Peninsula.",
    localContent: "Whether you're near Broadway or in the neighborhoods surrounding Burlingame Avenue, telehealth brings therapy to you. Accessible mental health care for Peninsula families.",
    whyChoose: [
      "Licensed LMFT serving San Mateo County",
      "Evidence-based treatment for anxiety and depression",
      "Family therapy and teen counseling",
      "Free 15-minute consultation call",
    ],
  },
  "therapy-millbrae": {
    city: "Millbrae",
    state: "CA",
    slug: "therapy-millbrae",
    title: "Therapy in Millbrae, CA",
    metaTitle: "Millbrae Therapist | LMFT | $240/session | Virtual Therapy | Free Consultation",
    metaDescription: "Licensed Millbrae therapist (LMFT). Virtual therapy for diverse communities. $240/45min. EMDR, CBT, family therapy. Free consultation.",
    h1: "Licensed Therapist in Millbrae, CA | LMFT | Virtual Therapy",
    intro: "Millbrae is a diverse community where mental health support should be accessible to everyone. We offer virtual therapy to adults, teens, and families throughout Millbrae.",
    localContent: "Our telehealth platform makes therapy convenient for Millbrae residents. Quality mental health care that respects your time and cultural background.",
    whyChoose: [
      "Licensed LMFT with culturally responsive approach",
      "Treatment for anxiety, depression, and relationship issues",
      "Family therapy and teen support",
      "Free 15-minute consultation call",
    ],
  },
  "therapy-pacifica": {
    city: "Pacifica",
    state: "CA",
    slug: "therapy-pacifica",
    title: "Therapy in Pacifica, CA",
    metaTitle: "Pacifica Therapist | LMFT | $240/session | Virtual Therapy | Free Consultation",
    metaDescription: "Licensed Pacifica therapist (LMFT). Virtual EMDR, CBT, family therapy. $240/45min. Serving the coast. Free 15-minute consultation.",
    h1: "Licensed Therapist in Pacifica, CA | LMFT | Virtual Therapy",
    intro: "Pacifica's coastal community deserves mental health support that's both accessible and effective. We provide virtual therapy to adults, teens, and families throughout Pacifica.",
    localContent: "From Linda Mar to Sharp Park, our telehealth services bring quality therapy to the coast. Mental health care without the drive over the hill.",
    whyChoose: [
      "Licensed California LMFT",
      "EMDR for trauma and difficult experiences",
      "Family therapy and relationship counseling",
      "Free 15-minute consultation call",
    ],
  },
  "therapy-daly-city": {
    city: "Daly City",
    state: "CA",
    slug: "therapy-daly-city",
    title: "Therapy in Daly City, CA",
    metaTitle: "Daly City Therapist | LMFT | $240/session | Virtual Therapy | Free Consultation",
    metaDescription: "Licensed Daly City therapist (LMFT). Culturally responsive virtual therapy. $240/45min. EMDR, CBT, family therapy. Free 15-minute consultation.",
    h1: "Licensed Therapist in Daly City, CA | LMFT | Virtual Therapy",
    intro: "Daly City is one of the most diverse cities in California, and mental health support should reflect that. We offer virtual therapy to adults, teens, and families throughout Daly City.",
    localContent: "Whether you're in Westlake, Serramonte, or St. Francis Heights, our telehealth platform brings quality therapy to you. Culturally sensitive mental health care for all.",
    whyChoose: [
      "Licensed LMFT with culturally responsive approach",
      "Treatment for anxiety, depression, and trauma",
      "Family therapy and teen counseling",
      "Free 15-minute consultation call",
    ],
  },
  "therapy-south-san-francisco": {
    city: "South San Francisco",
    state: "CA",
    slug: "therapy-south-san-francisco",
    title: "Therapy in South San Francisco, CA",
    metaTitle: "South SF Therapist | LMFT | $240/session | Virtual Therapy | Free Consultation",
    metaDescription: "Licensed South SF therapist (LMFT). Virtual therapy for biotech professionals. $240/45min. EMDR, CBT, family therapy. Free consultation.",
    h1: "Licensed Therapist in South San Francisco | LMFT | Virtual Therapy",
    intro: "South San Francisco is the biotech capital, and we know the pressure that comes with that. We provide virtual therapy to professionals, families, and individuals throughout South City.",
    localContent: "From Downtown to Brentwood, our telehealth platform makes mental health care accessible. Quality therapy without adding to your commute.",
    whyChoose: [
      "Licensed LMFT with biotech industry experience",
      "Treatment for anxiety, burnout, and work-life balance",
      "Family therapy and relationship counseling",
      "Free 15-minute consultation call",
    ],
  },
  "therapy-menlo-park": {
    city: "Menlo Park",
    state: "CA",
    slug: "therapy-menlo-park",
    title: "Therapy in Menlo Park, CA",
    metaTitle: "Menlo Park Therapist | LMFT | $240/session | Virtual Therapy | Free Consultation",
    metaDescription: "Licensed Menlo Park therapist (LMFT). Virtual therapy for entrepreneurs and families. $240/45min. EMDR, CBT, IFS. Free 15-minute consultation.",
    h1: "Licensed Therapist in Menlo Park, CA | LMFT | Virtual Therapy",
    intro: "Menlo Park is home to innovators, entrepreneurs, and families navigating high-pressure environments. We provide virtual therapy to adults, teens, and families throughout Menlo Park.",
    localContent: "From Downtown Menlo Park to Sharon Heights, our telehealth services bring quality mental health care to you. Work with a therapist who understands Silicon Valley culture.",
    whyChoose: [
      "Licensed LMFT with startup stress experience",
      "Treatment for anxiety, perfectionism, and burnout",
      "Teen therapy for academic pressure",
      "Free 15-minute consultation call",
    ],
  },
  "therapy-los-altos": {
    city: "Los Altos",
    state: "CA",
    slug: "therapy-los-altos",
    title: "Therapy in Los Altos, CA",
    metaTitle: "Los Altos Therapist | LMFT | $240/session | Family Therapy | Free Consultation",
    metaDescription: "Licensed Los Altos therapist (LMFT). Virtual family therapy, teen therapy, anxiety treatment. $240/45min. Free 15-minute consultation.",
    h1: "Licensed Therapist in Los Altos, CA | LMFT | Virtual Therapy",
    intro: "Los Altos families deserve mental health support that matches the quality of their community. We offer virtual therapy to adults, teens, and families throughout Los Altos.",
    localContent: "Our telehealth platform makes therapy convenient for Los Altos residents. Whether you're working on family dynamics, teen stress, or personal growth, we're here to help.",
    whyChoose: [
      "Licensed LMFT specializing in family therapy",
      "Treatment for academic pressure and perfectionism",
      "EMDR for anxiety and trauma",
      "Free 15-minute consultation call",
    ],
  },

  // ===== NORTH BAY =====
  "therapy-san-rafael": {
    city: "San Rafael",
    state: "CA",
    slug: "therapy-san-rafael",
    title: "Therapy in San Rafael, CA",
    metaTitle: "San Rafael Therapist | LMFT | $240/session | EMDR, CBT | Free Consultation",
    metaDescription: "Licensed San Rafael therapist (LMFT). Virtual EMDR, CBT, family therapy. $240/45min. Serving Marin County. Free 15-minute consultation.",
    h1: "Licensed Therapist in San Rafael, CA | LMFT | Virtual Therapy",
    intro: "San Rafael is the heart of Marin County, and mental health support should be accessible to everyone. We provide virtual therapy to adults, teens, and families throughout San Rafael.",
    localContent: "From Downtown San Rafael to Terra Linda, our telehealth platform brings quality therapy to you. Mental health care that fits into Marin County living.",
    whyChoose: [
      "Licensed LMFT serving Marin County",
      "Treatment for anxiety, depression, and life transitions",
      "Family therapy and teen counseling",
      "Free 15-minute consultation call",
    ],
  },
  "therapy-sausalito": {
    city: "Sausalito",
    state: "CA",
    slug: "therapy-sausalito",
    title: "Therapy in Sausalito, CA",
    metaTitle: "Sausalito Therapist | LMFT | $240/session | Virtual Therapy | Free Consultation",
    metaDescription: "Licensed Sausalito therapist (LMFT). Virtual EMDR, CBT therapy. $240/45min. Serving southern Marin County. Free 15-minute consultation.",
    h1: "Licensed Therapist in Sausalito, CA | LMFT | Virtual Therapy",
    intro: "Sausalito's waterfront community deserves accessible mental health support. We offer virtual therapy to adults, teens, and families throughout Sausalito and southern Marin.",
    localContent: "Our telehealth platform makes therapy convenient for Sausalito residents. Quality mental health care without the commute to San Francisco.",
    whyChoose: [
      "Licensed LMFT serving Marin County",
      "Treatment for anxiety, depression, and relationship issues",
      "EMDR for trauma processing",
      "Free 15-minute consultation call",
    ],
  },
  "therapy-mill-valley": {
    city: "Mill Valley",
    state: "CA",
    slug: "therapy-mill-valley",
    title: "Therapy in Mill Valley, CA",
    metaTitle: "Mill Valley Therapist | LMFT | $240/session | Family Therapy | Free Consultation",
    metaDescription: "Licensed Mill Valley therapist (LMFT). Virtual family therapy, anxiety treatment, teen counseling. $240/45min. Free 15-minute consultation.",
    h1: "Licensed Therapist in Mill Valley, CA | LMFT | Virtual Therapy",
    intro: "Mill Valley is known for its natural beauty and strong community. We provide virtual therapy that honors both, serving adults, teens, and families throughout Mill Valley.",
    localContent: "Whether you're in downtown Mill Valley or up on the slopes of Mount Tam, telehealth brings quality therapy to you. Mental health support that fits Marin living.",
    whyChoose: [
      "Licensed LMFT specializing in family therapy",
      "Treatment for anxiety, stress, and life balance",
      "Teen therapy and parent support",
      "Free 15-minute consultation call",
    ],
  },
  "therapy-novato": {
    city: "Novato",
    state: "CA",
    slug: "therapy-novato",
    title: "Therapy in Novato, CA",
    metaTitle: "Novato Therapist | LMFT | $240/session | Virtual Therapy | Free Consultation",
    metaDescription: "Licensed Novato therapist (LMFT). Virtual EMDR, CBT, family therapy. $240/45min. Serving North Marin County. Free 15-minute consultation.",
    h1: "Licensed Therapist in Novato, CA | LMFT | Virtual Therapy",
    intro: "Novato families and professionals deserve accessible mental health care. We offer virtual therapy to adults, teens, and families throughout Novato and North Marin.",
    localContent: "From Downtown Novato to Bel Marin Keys, our telehealth services make therapy convenient. Quality mental health support without the drive to San Rafael or SF.",
    whyChoose: [
      "Licensed LMFT serving North Marin",
      "Evidence-based therapy for anxiety, depression, and trauma",
      "Family therapy and teen support",
      "Free 15-minute consultation call",
    ],
  },
  "therapy-vallejo": {
    city: "Vallejo",
    state: "CA",
    slug: "therapy-vallejo",
    title: "Therapy in Vallejo, CA",
    metaTitle: "Vallejo Therapist | LMFT | $240/session | Virtual Therapy | Free Consultation",
    metaDescription: "Licensed Vallejo therapist (LMFT). Culturally responsive virtual therapy. $240/45min. EMDR, CBT, family therapy. Free 15-minute consultation.",
    h1: "Licensed Therapist in Vallejo, CA | LMFT | Virtual Therapy",
    intro: "Vallejo is a diverse, resilient community that deserves quality mental health support. We provide virtual therapy to adults, teens, and families throughout Vallejo and Solano County.",
    localContent: "Whether you're in Downtown Vallejo, near the waterfront, or in the Glen Cove area, our telehealth platform brings therapy to you. Accessible mental health care for all.",
    whyChoose: [
      "Licensed LMFT with culturally responsive approach",
      "Trauma-informed care using EMDR and other approaches",
      "Family therapy and teen counseling",
      "Free 15-minute consultation call",
    ],
  },
  "therapy-petaluma": {
    city: "Petaluma",
    state: "CA",
    slug: "therapy-petaluma",
    title: "Therapy in Petaluma, CA",
    metaTitle: "Petaluma Therapist | LMFT | $240/session | Virtual Therapy | Free Consultation",
    metaDescription: "Licensed Petaluma therapist (LMFT). Virtual EMDR, CBT, family therapy. $240/45min. Serving Sonoma County. Free 15-minute consultation.",
    h1: "Licensed Therapist in Petaluma, CA | LMFT | Virtual Therapy",
    intro: "Petaluma blends small-town charm with modern challenges. We provide virtual therapy to adults, teens, and families throughout Petaluma and southern Sonoma County.",
    localContent: "Our telehealth platform makes mental health care accessible to Petaluma residents. Quality therapy without the drive to Santa Rosa or SF.",
    whyChoose: [
      "Licensed California LMFT",
      "Family therapy and teen support",
      "EMDR for trauma processing",
      "Free 15-minute consultation call",
    ],
  },
  "therapy-marin-city": {
    city: "Marin City",
    state: "CA",
    slug: "therapy-marin-city",
    title: "Therapy in Marin City, CA",
    metaTitle: "Marin City Therapist | LMFT | $240/session | Virtual Therapy | Free Consultation",
    metaDescription: "Licensed Marin City therapist (LMFT). Culturally responsive virtual therapy. $240/45min. EMDR, CBT, family therapy. Free consultation.",
    h1: "Licensed Therapist in Marin City, CA | LMFT | Virtual Therapy",
    intro: "Marin City deserves mental health support that's both accessible and culturally responsive. We provide virtual therapy to adults, teens, and families throughout the community.",
    localContent: "Our telehealth platform makes quality therapy accessible to Marin City residents. Mental health care that understands and respects your community.",
    whyChoose: [
      "Licensed LMFT with culturally responsive approach",
      "Treatment for trauma, anxiety, and stress",
      "Family therapy and teen counseling",
      "Free 15-minute consultation call",
    ],
  },

  // ===== SERVICE + CITY COMBOS (Top 5 Cities) =====
  
  // EMDR Therapy
  "emdr-therapy-oakland": {
    city: "Oakland", state: "CA", slug: "emdr-therapy-oakland",
    title: "EMDR Therapy in Oakland, CA", metaTitle: "EMDR Therapist Oakland | LMFT | $240/session | Trauma Treatment | Free Consultation", metaDescription: "Licensed EMDR therapist in Oakland (LMFT). EMDR training for trauma, PTSD, anxiety. $240/45min. Serving East Bay. Free 15-minute consultation.",
    h1: "EMDR Therapist in Oakland, CA | LMFT | Trauma Treatment", intro: "EMDR helps Oakland residents process trauma and reduce anxiety. Whether you're dealing with a specific traumatic event or ongoing PTSD symptoms, EMDR offers a research-backed path forward.", localContent: "Serving clients throughout Oakland from Temescal to Lake Merritt. Our telehealth platform means you can access EMDR therapy without navigating East Bay traffic.",
    whyChoose: ["Licensed LMFT with EMDR training", "Effective for PTSD, phobias, and panic attacks", "Often faster than traditional talk therapy", "Free 15-minute consultation call"],
  },
  "emdr-therapy-san-jose": {
    city: "San Jose", state: "CA", slug: "emdr-therapy-san-jose",
    title: "EMDR Therapy in San Jose, CA", metaTitle: "EMDR Therapist San Jose | LMFT | $240/session | Trauma Treatment | Free Consultation", metaDescription: "Licensed EMDR therapist in San Jose (LMFT). EMDR training for trauma, PTSD, performance anxiety. $240/45min. Serving Silicon Valley. Free consultation.",
    h1: "EMDR Therapist in San Jose, CA | LMFT | Trauma Treatment", intro: "San Jose professionals and families struggling with trauma can find relief through EMDR. This evidence-based approach helps process traumatic memories and reduce their emotional impact.", localContent: "From Willow Glen to Almaden Valley, our telehealth services bring specialized EMDR treatment to Silicon Valley residents.",
    whyChoose: ["Licensed LMFT with EMDR training", "Treatment for work-related trauma and stress", "Effective for PTSD and performance anxiety", "Free 15-minute consultation call"],
  },
  "emdr-therapy-berkeley": {
    city: "Berkeley", state: "CA", slug: "emdr-therapy-berkeley",
    title: "EMDR Therapy in Berkeley, CA", metaTitle: "EMDR Therapist Berkeley | LMFT | $240/session | Trauma Treatment | Free Consultation", metaDescription: "Licensed EMDR therapist in Berkeley (LMFT). EMDR training for trauma, PTSD, anxiety. $240/45min. Serving UC Berkeley students and East Bay. Free consultation.",
    h1: "EMDR Therapist in Berkeley, CA | LMFT | Trauma Treatment", intro: "Berkeley residents dealing with trauma, PTSD, or stuck memories can benefit from EMDR. This research-backed approach helps your brain reprocess difficult experiences.", localContent: "Whether you're a UC Berkeley student or Berkeley professional, our telehealth platform brings EMDR therapy directly to you.",
    whyChoose: ["Licensed LMFT with EMDR training", "Effective for single-incident and complex trauma", "Works well alongside other therapies", "Free 15-minute consultation call"],
  },
  "emdr-therapy-palo-alto": {
    city: "Palo Alto", state: "CA", slug: "emdr-therapy-palo-alto",
    title: "EMDR Therapy in Palo Alto, CA", metaTitle: "EMDR Therapist Palo Alto | LMFT | $240/session | Trauma Treatment | Free Consultation", metaDescription: "Licensed EMDR therapist in Palo Alto (LMFT). EMDR training for trauma, PTSD, performance anxiety. $240/45min. Serving Stanford and Peninsula. Free consultation.",
    h1: "EMDR Therapist in Palo Alto, CA | LMFT | Trauma Treatment", intro: "EMDR helps Palo Alto residents process trauma and reduce performance anxiety. Whether you're dealing with a specific event or ongoing anxiety, EMDR offers relief.", localContent: "Serving Stanford students and Palo Alto professionals through convenient telehealth sessions.",
    whyChoose: ["Licensed LMFT with EMDR training", "Effective for performance and achievement anxiety", "Research-backed trauma treatment", "Free 15-minute consultation call"],
  },

  // IFS Therapy
  "ifs-therapy-san-francisco": {
    city: "San Francisco", state: "CA", slug: "ifs-therapy-san-francisco",
    title: "IFS Therapy in San Francisco, CA", metaTitle: "IFS Therapist San Francisco | LMFT | $240/session | Parts Work | Free Consultation", metaDescription: "Licensed IFS therapist in San Francisco (LMFT). Individual therapy for internal conflict, self-criticism, perfectionism. $240/45min. Free consultation.",
    h1: "IFS Therapist in San Francisco, CA | LMFT | Parts Work Therapy", intro: "IFS (Internal Family Systems) helps SF residents work with their internal parts. This is individual therapy about your inner world, not family therapy. Effective for self-criticism, perfectionism, and feeling at war with yourself.", localContent: "From the Mission to Pacific Heights, our telehealth platform brings IFS therapy to San Francisco residents dealing with internal conflict.",
    whyChoose: ["Licensed LMFT specializing in IFS", "Effective for self-criticism and perfectionism", "Gentle approach to complex trauma", "Free 15-minute consultation call"],
  },
  "ifs-therapy-oakland": {
    city: "Oakland", state: "CA", slug: "ifs-therapy-oakland",
    title: "IFS Therapy in Oakland, CA", metaTitle: "IFS Therapist Oakland | LMFT | $240/session | Parts Work | Free Consultation", metaDescription: "Licensed IFS therapist in Oakland (LMFT). Individual therapy for internal conflict, perfectionism, complex trauma. $240/45min. Free consultation.",
    h1: "IFS Therapist in Oakland, CA | LMFT | Parts Work Therapy", intro: "IFS helps Oakland residents understand their internal parts and reduce self-criticism. This individual therapy approach is powerful for people who feel pulled in different directions.", localContent: "Serving Oakland from Rockridge to Fruitvale through convenient telehealth sessions.",
    whyChoose: ["Licensed LMFT specializing in IFS", "Effective for perfectionism and self-criticism", "Helpful for complex trauma", "Free 15-minute consultation call"],
  },
  "ifs-therapy-san-jose": {
    city: "San Jose", state: "CA", slug: "ifs-therapy-san-jose",
    title: "IFS Therapy in San Jose, CA", metaTitle: "IFS Therapist San Jose | LMFT | $240/session | Parts Work | Free Consultation", metaDescription: "Licensed IFS therapist in San Jose (LMFT). Individual therapy for internal conflict, perfectionism. $240/45min. Serving Silicon Valley. Free consultation.",
    h1: "IFS Therapist in San Jose, CA | LMFT | Parts Work Therapy", intro: "San Jose professionals struggling with perfectionism or internal conflict can benefit from IFS. This individual therapy helps you work with your protective parts and wounded parts.", localContent: "From Willow Glen to Evergreen, telehealth brings IFS therapy to Silicon Valley residents.",
    whyChoose: ["Licensed LMFT with IFS expertise", "Effective for tech industry perfectionism", "Gentle approach to self-criticism", "Free 15-minute consultation call"],
  },
  "ifs-therapy-berkeley": {
    city: "Berkeley", state: "CA", slug: "ifs-therapy-berkeley",
    title: "IFS Therapy in Berkeley, CA", metaTitle: "IFS Therapist Berkeley | LMFT | $240/session | Parts Work | Free Consultation", metaDescription: "Licensed IFS therapist in Berkeley (LMFT). Individual therapy for internal conflict, self-criticism. $240/45min. Serving UC Berkeley students. Free consultation.",
    h1: "IFS Therapist in Berkeley, CA | LMFT | Parts Work Therapy", intro: "IFS helps Berkeley residents work with their internal parts. Effective for self-criticism, perfectionism, and feeling at war with yourself. This is individual therapy, not family therapy.", localContent: "Whether you're a UC Berkeley student or Berkeley professional, our telehealth platform brings parts work therapy to you.",
    whyChoose: ["Licensed LMFT specializing in IFS", "Helpful for academic perfectionism", "Effective for complex trauma", "Free 15-minute consultation call"],
  },
  "ifs-therapy-palo-alto": {
    city: "Palo Alto", state: "CA", slug: "ifs-therapy-palo-alto",
    title: "IFS Therapy in Palo Alto, CA", metaTitle: "IFS Therapist Palo Alto | LMFT | $240/session | Parts Work | Free Consultation", metaDescription: "Licensed IFS therapist in Palo Alto (LMFT). Individual therapy for perfectionism, internal conflict. $240/45min. Serving Stanford. Free consultation.",
    h1: "IFS Therapist in Palo Alto, CA | LMFT | Parts Work Therapy", intro: "Palo Alto residents struggling with perfectionism and self-criticism can benefit from IFS. This individual therapy helps you understand your protective parts and build self-compassion.", localContent: "Serving Stanford students and Palo Alto professionals through convenient telehealth sessions.",
    whyChoose: ["Licensed LMFT with IFS training", "Effective for perfectionism and self-doubt", "Gentle approach to internal conflict", "Free 15-minute consultation call"],
  },

  // CBT Therapy
  "cbt-therapy-san-francisco": {
    city: "San Francisco", state: "CA", slug: "cbt-therapy-san-francisco",
    title: "CBT Therapy in San Francisco, CA", metaTitle: "CBT Therapist San Francisco | LMFT | $240/session | Free Consultation", metaDescription: "Licensed CBT therapist in San Francisco (LMFT). Cognitive behavioral therapy for anxiety, depression, OCD. $240/45min. Free 15-minute consultation.",
    h1: "CBT Therapist in San Francisco, CA | LMFT | Cognitive Behavioral Therapy", intro: "CBT helps San Francisco residents change thought patterns that fuel anxiety and depression. This structured, goal-oriented approach provides practical tools you can use right away.", localContent: "From SOMA to the Sunset, our telehealth platform brings evidence-based CBT to SF residents.",
    whyChoose: ["Licensed LMFT with CBT expertise", "Effective for anxiety, depression, and OCD", "Learn practical tools and skills", "Free 15-minute consultation call"],
  },
  "cbt-therapy-oakland": {
    city: "Oakland", state: "CA", slug: "cbt-therapy-oakland",
    title: "CBT Therapy in Oakland, CA", metaTitle: "CBT Therapist Oakland | LMFT | $240/session | Free Consultation", metaDescription: "Licensed CBT therapist in Oakland (LMFT). Cognitive behavioral therapy for anxiety, depression, panic. $240/45min. Serving East Bay. Free consultation.",
    h1: "CBT Therapist in Oakland, CA | LMFT | Cognitive Behavioral Therapy", intro: "Oakland residents dealing with anxiety or depression can benefit from CBT's structured approach. Learn to identify unhelpful thoughts and build practical coping skills.", localContent: "Serving Oakland from Lake Merritt to Montclair through convenient telehealth sessions.",
    whyChoose: ["Licensed LMFT specializing in CBT", "Structured approach with clear progress", "Practical skills and homework", "Free 15-minute consultation call"],
  },
  "cbt-therapy-san-jose": {
    city: "San Jose", state: "CA", slug: "cbt-therapy-san-jose",
    title: "CBT Therapy in San Jose, CA", metaTitle: "CBT Therapist San Jose | LMFT | $240/session | Free Consultation", metaDescription: "Licensed CBT therapist in San Jose (LMFT). Cognitive behavioral therapy for anxiety, depression, work stress. $240/45min. Serving Silicon Valley. Free consultation.",
    h1: "CBT Therapist in San Jose, CA | LMFT | Cognitive Behavioral Therapy", intro: "San Jose professionals struggling with anxiety or work stress can benefit from CBT's practical approach. Learn tools to manage anxious thoughts and change unhelpful patterns.", localContent: "From Downtown to Almaden, telehealth brings structured CBT therapy to Silicon Valley residents.",
    whyChoose: ["Licensed LMFT with CBT training", "Effective for work anxiety and stress", "Clear structure and progress tracking", "Free 15-minute consultation call"],
  },
  "cbt-therapy-berkeley": {
    city: "Berkeley", state: "CA", slug: "cbt-therapy-berkeley",
    title: "CBT Therapy in Berkeley, CA", metaTitle: "CBT Therapist Berkeley | LMFT | $240/session | Free Consultation", metaDescription: "Licensed CBT therapist in Berkeley (LMFT). Cognitive behavioral therapy for anxiety, depression, social anxiety. $240/45min. Serving UC Berkeley students. Free consultation.",
    h1: "CBT Therapist in Berkeley, CA | LMFT | Cognitive Behavioral Therapy", intro: "Berkeley residents dealing with anxiety or social anxiety can benefit from CBT. This evidence-based approach helps you challenge anxious thoughts and build confidence.", localContent: "Whether you're a UC Berkeley student or Berkeley professional, our telehealth platform brings structured CBT to you.",
    whyChoose: ["Licensed LMFT specializing in CBT", "Effective for social anxiety and panic", "Practical tools you can use immediately", "Free 15-minute consultation call"],
  },
  "cbt-therapy-palo-alto": {
    city: "Palo Alto", state: "CA", slug: "cbt-therapy-palo-alto",
    title: "CBT Therapy in Palo Alto, CA", metaTitle: "CBT Therapist Palo Alto | LMFT | $240/session | Free Consultation", metaDescription: "Licensed CBT therapist in Palo Alto (LMFT). Cognitive behavioral therapy for anxiety, depression, perfectionism. $240/45min. Serving Stanford. Free consultation.",
    h1: "CBT Therapist in Palo Alto, CA | LMFT | Cognitive Behavioral Therapy", intro: "Palo Alto residents struggling with anxiety or perfectionism can benefit from CBT's structured approach. Learn to challenge unhelpful thoughts and build healthier patterns.", localContent: "Serving Stanford students and Palo Alto professionals through convenient telehealth sessions.",
    whyChoose: ["Licensed LMFT with CBT expertise", "Effective for performance anxiety", "Practical skills and clear progress", "Free 15-minute consultation call"],
  },

  // Psychodynamic Therapy
  "psychodynamic-therapy-san-francisco": {
    city: "San Francisco", state: "CA", slug: "psychodynamic-therapy-san-francisco",
    title: "Psychodynamic Therapy in San Francisco, CA", metaTitle: "Psychodynamic Therapist San Francisco | LMFT | $240/session | Free Consultation", metaDescription: "Licensed psychodynamic therapist in San Francisco (LMFT). Explore patterns, relationships, root causes. $240/45min. Free 15-minute consultation.",
    h1: "Psychodynamic Therapist in San Francisco, CA | LMFT", intro: "Psychodynamic therapy helps SF residents understand recurring patterns in relationships and life. This approach explores how your past shapes your present, getting at root causes rather than just managing symptoms.", localContent: "From the Marina to the Mission, our telehealth platform brings deeper therapeutic work to San Francisco residents.",
    whyChoose: ["Licensed LMFT with psychodynamic training", "Less structured, follows what emerges", "Effective for chronic dissatisfaction", "Free 15-minute consultation call"],
  },
  "psychodynamic-therapy-oakland": {
    city: "Oakland", state: "CA", slug: "psychodynamic-therapy-oakland",
    title: "Psychodynamic Therapy in Oakland, CA", metaTitle: "Psychodynamic Therapist Oakland | LMFT | $240/session | Free Consultation", metaDescription: "Licensed psychodynamic therapist in Oakland (LMFT). Understand patterns and relationships. $240/45min. Serving East Bay. Free consultation.",
    h1: "Psychodynamic Therapist in Oakland, CA | LMFT", intro: "Oakland residents interested in understanding their patterns can benefit from psychodynamic therapy. This approach explores how past experiences shape current relationships and struggles.", localContent: "Serving Oakland from Temescal to Montclair through convenient telehealth sessions.",
    whyChoose: ["Licensed LMFT specializing in psychodynamic work", "Effective for relationship issues", "Focus on root causes", "Free 15-minute consultation call"],
  },
  "psychodynamic-therapy-san-jose": {
    city: "San Jose", state: "CA", slug: "psychodynamic-therapy-san-jose",
    title: "Psychodynamic Therapy in San Jose, CA", metaTitle: "Psychodynamic Therapist San Jose | LMFT | $240/session | Free Consultation", metaDescription: "Licensed psychodynamic therapist in San Jose (LMFT). Explore patterns and relationships. $240/45min. Serving Silicon Valley. Free consultation.",
    h1: "Psychodynamic Therapist in San Jose, CA | LMFT", intro: "San Jose residents wanting to understand recurring patterns can benefit from psychodynamic therapy. This approach gets at why you keep repeating the same relationship dynamics.", localContent: "From Willow Glen to Evergreen, telehealth brings depth-oriented therapy to Silicon Valley residents.",
    whyChoose: ["Licensed LMFT with psychodynamic expertise", "Effective for relationship struggles", "Explores root causes", "Free 15-minute consultation call"],
  },
  "psychodynamic-therapy-berkeley": {
    city: "Berkeley", state: "CA", slug: "psychodynamic-therapy-berkeley",
    title: "Psychodynamic Therapy in Berkeley, CA", metaTitle: "Psychodynamic Therapist Berkeley | LMFT | $240/session | Free Consultation", metaDescription: "Licensed psychodynamic therapist in Berkeley (LMFT). Explore patterns and relationships. $240/45min. Serving UC Berkeley students. Free consultation.",
    h1: "Psychodynamic Therapist in Berkeley, CA | LMFT", intro: "Berkeley residents interested in deeper self-understanding can benefit from psychodynamic therapy. This approach explores how your history shapes your current struggles.", localContent: "Whether you're a student or professional, our telehealth platform brings psychodynamic therapy to Berkeley.",
    whyChoose: ["Licensed LMFT specializing in psychodynamic work", "Effective for relationship patterns", "Deeper than symptom management", "Free 15-minute consultation call"],
  },
  "psychodynamic-therapy-palo-alto": {
    city: "Palo Alto", state: "CA", slug: "psychodynamic-therapy-palo-alto",
    title: "Psychodynamic Therapy in Palo Alto, CA", metaTitle: "Psychodynamic Therapist Palo Alto | LMFT | $240/session | Free Consultation", metaDescription: "Licensed psychodynamic therapist in Palo Alto (LMFT). Understand patterns and root causes. $240/45min. Serving Stanford. Free consultation.",
    h1: "Psychodynamic Therapist in Palo Alto, CA | LMFT", intro: "Palo Alto residents seeking deeper understanding can benefit from psychodynamic therapy. This approach explores why patterns keep repeating and what drives your struggles.", localContent: "Serving Stanford students and Palo Alto professionals through convenient telehealth sessions.",
    whyChoose: ["Licensed LMFT with psychodynamic training", "Effective for chronic issues", "Gets at root causes", "Free 15-minute consultation call"],
  },

  // Family Therapy
  "family-therapy-san-francisco": {
    city: "San Francisco", state: "CA", slug: "family-therapy-san-francisco",
    title: "Family Therapy in San Francisco, CA", metaTitle: "Family Therapist San Francisco | LMFT | $240/session | Parent-Teen | Free Consultation", metaDescription: "Licensed family therapist in San Francisco (LMFT). Parent-teen counseling, family communication. High school age+. $240/45min. Free consultation.",
    h1: "Family Therapist in San Francisco, CA | LMFT | Parent-Teen Counseling", intro: "SF families struggling with communication can benefit from family therapy. We work with parents and teens (high school age+) to improve relationships and resolve conflicts. This is not couples therapy.", localContent: "From the Richmond to the Mission, our telehealth platform brings family therapy to San Francisco families.",
    whyChoose: ["Licensed LMFT specializing in family therapy", "Improve communication and dynamics", "Support for college students and families", "Free 15-minute consultation call"],
  },
  "family-therapy-oakland": {
    city: "Oakland", state: "CA", slug: "family-therapy-oakland",
    title: "Family Therapy in Oakland, CA", metaTitle: "Family Therapist Oakland | LMFT | $240/session | Parent-Teen | Free Consultation", metaDescription: "Licensed family therapist in Oakland (LMFT). Parent-teen counseling, family communication. High school age+. $240/45min. Serving East Bay. Free consultation.",
    h1: "Family Therapist in Oakland, CA | LMFT | Parent-Teen Counseling", intro: "Oakland families struggling with teen communication can benefit from family therapy. We work with parents and high school or college-aged children to improve relationships.", localContent: "Serving Oakland families from Rockridge to the Hills through convenient telehealth sessions.",
    whyChoose: ["Licensed LMFT specializing in family therapy", "Improve family communication", "Support through transitions", "Free 15-minute consultation call"],
  },
  "family-therapy-san-jose": {
    city: "San Jose", state: "CA", slug: "family-therapy-san-jose",
    title: "Family Therapy in San Jose, CA", metaTitle: "Family Therapist San Jose | LMFT | $240/session | Parent-Teen | Free Consultation", metaDescription: "Licensed family therapist in San Jose (LMFT). Parent-teen counseling, family dynamics. High school age+. $240/45min. Serving Silicon Valley. Free consultation.",
    h1: "Family Therapist in San Jose, CA | LMFT | Parent-Teen Counseling", intro: "San Jose families dealing with parent-teen conflict can benefit from family therapy. We help families improve communication and navigate transitions together.", localContent: "From Willow Glen to Evergreen, telehealth brings family therapy to Silicon Valley families.",
    whyChoose: ["Licensed LMFT with family therapy expertise", "Navigate academic pressure together", "Improve family communication", "Free 15-minute consultation call"],
  },
  "family-therapy-berkeley": {
    city: "Berkeley", state: "CA", slug: "family-therapy-berkeley",
    title: "Family Therapy in Berkeley, CA", metaTitle: "Family Therapist Berkeley | LMFT | $240/session | Parent-Teen | Free Consultation", metaDescription: "Licensed family therapist in Berkeley (LMFT). Parent-teen counseling, family communication. High school age+. $240/45min. Serving UC Berkeley families. Free consultation.",
    h1: "Family Therapist in Berkeley, CA | LMFT | Parent-Teen Counseling", intro: "Berkeley families navigating parent-teen relationships can benefit from family therapy. We work with high school and college-aged students and their families.", localContent: "Whether your teen attends Berkeley High or UC Berkeley, our telehealth platform brings family therapy to you.",
    whyChoose: ["Licensed LMFT specializing in family therapy", "Navigate academic stress together", "Improve family dynamics", "Free 15-minute consultation call"],
  },
  "family-therapy-palo-alto": {
    city: "Palo Alto", state: "CA", slug: "family-therapy-palo-alto",
    title: "Family Therapy in Palo Alto, CA", metaTitle: "Family Therapist Palo Alto | LMFT | $240/session | Parent-Teen | Free Consultation", metaDescription: "Licensed family therapist in Palo Alto (LMFT). Parent-teen counseling, family communication. High school age+. $240/45min. Serving Stanford families. Free consultation.",
    h1: "Family Therapist in Palo Alto, CA | LMFT | Parent-Teen Counseling", intro: "Palo Alto families dealing with achievement pressure can benefit from family therapy. We help parents and teens improve communication and navigate high-pressure environments together.", localContent: "Serving Palo Alto and Stanford families through convenient telehealth sessions.",
    whyChoose: ["Licensed LMFT with family therapy expertise", "Navigate achievement pressure", "Improve family communication", "Free 15-minute consultation call"],
  },

  // Men's Therapy
  "mens-therapy-san-francisco": {
    city: "San Francisco", state: "CA", slug: "mens-therapy-san-francisco",
    title: "Men's Therapy in San Francisco, CA", metaTitle: "Men's Therapist San Francisco | LMFT | $240/session | Free Consultation", metaDescription: "Licensed men's therapist in San Francisco (LMFT). Direct approach for anger, relationships, emotional expression. $240/45min. Free 15-minute consultation.",
    h1: "Men's Therapist in San Francisco, CA | LMFT | Counseling for Men", intro: "SF men struggling with anger, relationships, or emotional expression have a space built for them. No fluff, no judgment. Just direct, practical work on what's getting in your way.", localContent: "From SOMA to the Sunset, our telehealth platform brings men's therapy to San Francisco.",
    whyChoose: ["Licensed LMFT specializing in men's therapy", "Work on anger and relationships", "Practical tools and honest work", "Free 15-minute consultation call"],
  },
  "mens-therapy-oakland": {
    city: "Oakland", state: "CA", slug: "mens-therapy-oakland",
    title: "Men's Therapy in Oakland, CA", metaTitle: "Men's Therapist Oakland | LMFT | $240/session | Free Consultation", metaDescription: "Licensed men's therapist in Oakland (LMFT). Direct approach for anger, relationships, work stress. $240/45min. Serving East Bay. Free consultation.",
    h1: "Men's Therapist in Oakland, CA | LMFT | Counseling for Men", intro: "Oakland men tired of pretending everything is fine can get real help. We work on anger, relationship problems, and emotional expression with a direct, practical approach.", localContent: "Serving Oakland men from Lake Merritt to the Hills through convenient telehealth sessions.",
    whyChoose: ["Licensed LMFT specializing in men's therapy", "Work on anger and communication", "Practical, direct approach", "Free 15-minute consultation call"],
  },
  "mens-therapy-san-jose": {
    city: "San Jose", state: "CA", slug: "mens-therapy-san-jose",
    title: "Men's Therapy in San Jose, CA", metaTitle: "Men's Therapist San Jose | LMFT | $240/session | Free Consultation", metaDescription: "Licensed men's therapist in San Jose (LMFT). Direct approach for anger, work stress, relationships. $240/45min. Serving Silicon Valley. Free consultation.",
    h1: "Men's Therapist in San Jose, CA | LMFT | Counseling for Men", intro: "San Jose men dealing with work stress, anger, or relationship problems can get direct, practical help. No judgment, no fluff. Just real work on what matters.", localContent: "From Downtown to Almaden, telehealth brings men's therapy to Silicon Valley.",
    whyChoose: ["Licensed LMFT specializing in men's therapy", "Work on anger and stress management", "Practical tools for relationships", "Free 15-minute consultation call"],
  },
  "mens-therapy-berkeley": {
    city: "Berkeley", state: "CA", slug: "mens-therapy-berkeley",
    title: "Men's Therapy in Berkeley, CA", metaTitle: "Men's Therapist Berkeley | LMFT | $240/session | Free Consultation", metaDescription: "Licensed men's therapist in Berkeley (LMFT). Direct approach for anger, relationships, emotional expression. $240/45min. Serving East Bay. Free consultation.",
    h1: "Men's Therapist in Berkeley, CA | LMFT | Counseling for Men", intro: "Berkeley men struggling with anger, relationships, or emotional expression can get practical help. Direct, honest work without the BS.", localContent: "Whether you're a student or professional, our telehealth platform brings men's therapy to Berkeley.",
    whyChoose: ["Licensed LMFT specializing in men's therapy", "Work on anger and relationships", "No judgment, just honest work", "Free 15-minute consultation call"],
  },
  "mens-therapy-palo-alto": {
    city: "Palo Alto", state: "CA", slug: "mens-therapy-palo-alto",
    title: "Men's Therapy in Palo Alto, CA", metaTitle: "Men's Therapist Palo Alto | LMFT | $240/session | Free Consultation", metaDescription: "Licensed men's therapist in Palo Alto (LMFT). Direct approach for work stress, anger, relationships. $240/45min. Serving Stanford. Free consultation.",
    h1: "Men's Therapist in Palo Alto, CA | LMFT | Counseling for Men", intro: "Palo Alto men dealing with work pressure, anger, or relationship problems can get direct, practical help. A space where you don't have to perform.", localContent: "Serving Stanford and Palo Alto men through convenient telehealth sessions.",
    whyChoose: ["Licensed LMFT specializing in men's therapy", "Work on anger and emotional expression", "Practical tools for stress and relationships", "Free 15-minute consultation call"],
  },

  // ===== CONDITION + CITY COMBOS (Top 5 Cities) =====
  
  // Anxiety Therapy (adding 4 more - Berkeley already exists)
  "anxiety-therapy-san-francisco": {
    city: "San Francisco", state: "CA", slug: "anxiety-therapy-san-francisco",
    title: "Anxiety Therapy in San Francisco, CA", metaTitle: "Anxiety Therapist San Francisco | LMFT | $240/session | Free Consultation", metaDescription: "Licensed anxiety therapist in San Francisco (LMFT). CBT, EMDR for generalized anxiety, social anxiety, panic. $240/45min. Free 15-minute consultation.",
    h1: "Anxiety Therapist in San Francisco, CA | LMFT | Treatment for Anxiety", intro: "Anxiety is one of the most common struggles SF residents face. Whether it's constant worry, social anxiety, panic attacks, or feeling on edge, we use evidence-based approaches like CBT and EMDR to help you manage it.", localContent: "From the Financial District to the Outer Sunset, our telehealth platform brings anxiety treatment to San Francisco residents. Quality care without adding commute stress to your day.",
    whyChoose: ["Licensed LMFT specializing in anxiety treatment", "Treatment for social anxiety and panic", "Practical tools you can use immediately", "Free 15-minute consultation call"],
  },
  "anxiety-therapy-oakland": {
    city: "Oakland", state: "CA", slug: "anxiety-therapy-oakland",
    title: "Anxiety Therapy in Oakland, CA", metaTitle: "Anxiety Therapist Oakland | LMFT | $240/session | Free Consultation", metaDescription: "Licensed anxiety therapist in Oakland (LMFT). CBT, EMDR for anxiety, panic, worry. $240/45min. Serving East Bay. Free 15-minute consultation.",
    h1: "Anxiety Therapist in Oakland, CA | LMFT | Treatment for Anxiety", intro: "Oakland residents struggling with anxiety don't have to manage it alone. We use CBT and EMDR to help you understand what's driving your anxiety and build real tools to manage it.", localContent: "From Downtown to the Oakland Hills, our telehealth services bring anxiety treatment directly to you.",
    whyChoose: ["Licensed LMFT with anxiety expertise", "CBT and EMDR approaches", "Effective for panic and social anxiety", "Free 15-minute consultation call"],
  },
  "anxiety-therapy-san-jose": {
    city: "San Jose", state: "CA", slug: "anxiety-therapy-san-jose",
    title: "Anxiety Therapy in San Jose, CA", metaTitle: "Anxiety Therapist San Jose | LMFT | $240/session | Free Consultation", metaDescription: "Licensed anxiety therapist in San Jose (LMFT). CBT, EMDR for work anxiety, social anxiety, panic. $240/45min. Serving Silicon Valley. Free consultation.",
    h1: "Anxiety Therapist in San Jose, CA | LMFT | Treatment for Anxiety", intro: "San Jose professionals and families dealing with anxiety can find relief. We use evidence-based approaches to help you manage worry, panic, and social anxiety.", localContent: "From Willow Glen to Evergreen, telehealth brings anxiety treatment to Silicon Valley residents without adding to your stress.",
    whyChoose: ["Licensed LMFT specializing in anxiety", "CBT and EMDR for anxiety disorders", "Practical tools for managing panic", "Free 15-minute consultation call"],
  },
  "anxiety-therapy-palo-alto": {
    city: "Palo Alto", state: "CA", slug: "anxiety-therapy-palo-alto",
    title: "Anxiety Therapy in Palo Alto, CA", metaTitle: "Anxiety Therapist Palo Alto | LMFT | $240/session | Free Consultation", metaDescription: "Licensed anxiety therapist in Palo Alto (LMFT). CBT, EMDR for performance anxiety, social anxiety. $240/45min. Serving Stanford. Free consultation.",
    h1: "Anxiety Therapist in Palo Alto, CA | LMFT | Treatment for Anxiety", intro: "Palo Alto residents dealing with performance anxiety, social anxiety, or constant worry can get help. We use CBT and EMDR to target what's driving your anxiety.", localContent: "Serving Stanford students and Palo Alto professionals through convenient telehealth sessions.",
    whyChoose: ["Licensed LMFT with anxiety specialization", "Treatment for performance and achievement anxiety", "Effective for social anxiety", "Free 15-minute consultation call"],
  },

  // Depression Therapy
  "depression-therapy-san-francisco": {
    city: "San Francisco", state: "CA", slug: "depression-therapy-san-francisco",
    title: "Depression Therapy in San Francisco, CA", metaTitle: "Depression Therapist San Francisco | LMFT | $240/session | Free Consultation", metaDescription: "Licensed depression therapist in San Francisco (LMFT). CBT, psychodynamic therapy for depression. $240/45min. Free 15-minute consultation.",
    h1: "Depression Therapist in San Francisco, CA | LMFT | Treatment for Depression", intro: "If you're struggling with depression in San Francisco, you don't have to push through it alone. We use evidence-based approaches like CBT and psychodynamic therapy to help you understand what's keeping you stuck and build a path forward.", localContent: "From the Mission to Pacific Heights, our telehealth platform brings depression treatment to SF residents. Quality mental health care without the commute.",
    whyChoose: ["Licensed LMFT specializing in depression", "CBT and psychodynamic approaches", "Address root causes, not just symptoms", "Free 15-minute consultation call"],
  },
  "depression-therapy-oakland": {
    city: "Oakland", state: "CA", slug: "depression-therapy-oakland",
    title: "Depression Therapy in Oakland, CA", metaTitle: "Depression Therapist Oakland | LMFT | $240/session | Free Consultation", metaDescription: "Licensed depression therapist in Oakland (LMFT). CBT, psychodynamic therapy for depression. $240/45min. Serving East Bay. Free 15-minute consultation.",
    h1: "Depression Therapist in Oakland, CA | LMFT | Treatment for Depression", intro: "Oakland residents struggling with depression can find help. We use CBT and psychodynamic therapy to help you understand what's keeping you stuck and build momentum toward change.", localContent: "Serving Oakland from Temescal to the Hills through convenient telehealth sessions.",
    whyChoose: ["Licensed LMFT with depression expertise", "Evidence-based CBT and psychodynamic work", "Address underlying patterns", "Free 15-minute consultation call"],
  },
  "depression-therapy-san-jose": {
    city: "San Jose", state: "CA", slug: "depression-therapy-san-jose",
    title: "Depression Therapy in San Jose, CA", metaTitle: "Depression Therapist San Jose | LMFT | $240/session | Free Consultation", metaDescription: "Licensed depression therapist in San Jose (LMFT). CBT, psychodynamic therapy for depression. $240/45min. Serving Silicon Valley. Free consultation.",
    h1: "Depression Therapist in San Jose, CA | LMFT | Treatment for Depression", intro: "San Jose residents dealing with depression deserve effective help. We use evidence-based approaches to help you understand what's contributing to your depression and build practical tools for change.", localContent: "From Downtown to Almaden, telehealth brings depression treatment to Silicon Valley residents.",
    whyChoose: ["Licensed LMFT specializing in depression", "CBT for skill-building and behavioral activation", "Psychodynamic work for deeper patterns", "Free 15-minute consultation call"],
  },
  "depression-therapy-berkeley": {
    city: "Berkeley", state: "CA", slug: "depression-therapy-berkeley",
    title: "Depression Therapy in Berkeley, CA", metaTitle: "Depression Therapist Berkeley | LMFT | $240/session | Free Consultation", metaDescription: "Licensed depression therapist in Berkeley (LMFT). CBT, psychodynamic therapy for depression. $240/45min. Serving UC Berkeley students. Free consultation.",
    h1: "Depression Therapist in Berkeley, CA | LMFT | Treatment for Depression", intro: "Berkeley residents struggling with depression can find support. We use CBT and psychodynamic therapy to help you understand what's contributing to your depression and build tools to move forward.", localContent: "Whether you're a UC Berkeley student or Berkeley professional, our telehealth platform brings depression treatment to you.",
    whyChoose: ["Licensed LMFT with depression specialization", "CBT and psychodynamic approaches", "Support for students and professionals", "Free 15-minute consultation call"],
  },
  "depression-therapy-palo-alto": {
    city: "Palo Alto", state: "CA", slug: "depression-therapy-palo-alto",
    title: "Depression Therapy in Palo Alto, CA", metaTitle: "Depression Therapist Palo Alto | LMFT | $240/session | Free Consultation", metaDescription: "Licensed depression therapist in Palo Alto (LMFT). CBT, psychodynamic therapy for depression. $240/45min. Serving Stanford. Free consultation.",
    h1: "Depression Therapist in Palo Alto, CA | LMFT | Treatment for Depression", intro: "Palo Alto residents dealing with depression can get effective help. We use evidence-based therapy to help you understand what's keeping you stuck and build a path toward feeling better.", localContent: "Serving Stanford students and Palo Alto professionals through convenient telehealth sessions.",
    whyChoose: ["Licensed LMFT specializing in depression", "CBT and psychodynamic work", "Address achievement burnout and disconnection", "Free 15-minute consultation call"],
  },

  // Trauma Therapy
  "trauma-therapy-san-francisco": {
    city: "San Francisco", state: "CA", slug: "trauma-therapy-san-francisco",
    title: "Trauma Therapy in San Francisco, CA", metaTitle: "Trauma Therapist San Francisco | LMFT | $240/session | EMDR | Free Consultation", metaDescription: "Licensed trauma therapist in San Francisco (LMFT). EMDR, trauma-informed approaches for PTSD, complex trauma. $240/45min. Free 15-minute consultation.",
    h1: "Trauma Therapist in San Francisco, CA | LMFT | EMDR Treatment", intro: "SF residents dealing with trauma, whether from a single event or ongoing experiences, can find relief. We use EMDR and trauma-informed approaches to help you process what happened and move forward.", localContent: "From SOMA to the Sunset, our telehealth platform brings specialized trauma treatment to San Francisco residents.",
    whyChoose: ["Licensed LMFT with EMDR training for trauma", "Treatment for PTSD and complex trauma", "Trauma-informed, safe approach", "Free 15-minute consultation call"],
  },
  "trauma-therapy-oakland": {
    city: "Oakland", state: "CA", slug: "trauma-therapy-oakland",
    title: "Trauma Therapy in Oakland, CA", metaTitle: "Trauma Therapist Oakland | LMFT | $240/session | EMDR | Free Consultation", metaDescription: "Licensed trauma therapist in Oakland (LMFT). EMDR, trauma-informed approaches for PTSD, complex trauma. $240/45min. Serving East Bay. Free consultation.",
    h1: "Trauma Therapist in Oakland, CA | LMFT | EMDR Treatment", intro: "Oakland residents dealing with trauma can find effective treatment. We use EMDR and trauma-informed approaches to help you process difficult experiences and reduce their impact.", localContent: "Serving Oakland from Lake Merritt to the Hills through convenient telehealth sessions.",
    whyChoose: ["Licensed LMFT specializing in trauma work", "EMDR for trauma processing", "Culturally responsive, trauma-informed care", "Free 15-minute consultation call"],
  },
  "trauma-therapy-san-jose": {
    city: "San Jose", state: "CA", slug: "trauma-therapy-san-jose",
    title: "Trauma Therapy in San Jose, CA", metaTitle: "Trauma Therapist San Jose | LMFT | $240/session | EMDR | Free Consultation", metaDescription: "Licensed trauma therapist in San Jose (LMFT). EMDR, trauma-informed approaches for PTSD. $240/45min. Serving Silicon Valley. Free consultation.",
    h1: "Trauma Therapist in San Jose, CA | LMFT | EMDR Treatment", intro: "San Jose residents struggling with trauma can get specialized help. We use EMDR and other evidence-based approaches to help you process traumatic experiences and move forward.", localContent: "From Willow Glen to Evergreen, telehealth brings trauma treatment to Silicon Valley residents.",
    whyChoose: ["Licensed LMFT with trauma expertise", "Treatment for single-incident and complex trauma", "Trauma-informed approach", "Free 15-minute consultation call"],
  },
  "trauma-therapy-berkeley": {
    city: "Berkeley", state: "CA", slug: "trauma-therapy-berkeley",
    title: "Trauma Therapy in Berkeley, CA", metaTitle: "Trauma Therapist Berkeley | LMFT | $240/session | EMDR | Free Consultation", metaDescription: "Licensed trauma therapist in Berkeley (LMFT). EMDR, trauma-informed approaches for PTSD. $240/45min. Serving UC Berkeley students. Free consultation.",
    h1: "Trauma Therapist in Berkeley, CA | LMFT | EMDR Treatment", intro: "Berkeley residents dealing with trauma can find effective treatment. We use EMDR and trauma-informed approaches to help you process difficult experiences safely.", localContent: "Whether you're a UC Berkeley student or Berkeley professional, our telehealth platform brings trauma treatment to you.",
    whyChoose: ["Licensed LMFT specializing in trauma", "EMDR for trauma processing", "Safe, trauma-informed approach", "Free 15-minute consultation call"],
  },
  "trauma-therapy-palo-alto": {
    city: "Palo Alto", state: "CA", slug: "trauma-therapy-palo-alto",
    title: "Trauma Therapy in Palo Alto, CA", metaTitle: "Trauma Therapist Palo Alto | LMFT | $240/session | EMDR | Free Consultation", metaDescription: "Licensed trauma therapist in Palo Alto (LMFT). EMDR, trauma-informed approaches for PTSD. $240/45min. Serving Stanford. Free consultation.",
    h1: "Trauma Therapist in Palo Alto, CA | LMFT | EMDR Treatment", intro: "Palo Alto residents dealing with trauma can get specialized treatment. We use EMDR and trauma-informed approaches to help you process what happened and reduce its impact.", localContent: "Serving Stanford students and Palo Alto professionals through convenient telehealth sessions.",
    whyChoose: ["Licensed LMFT with EMDR training", "Treatment for PTSD and trauma", "Safe, evidence-based approach", "Free 15-minute consultation call"],
  },

  // Anger Management Therapy
  "anger-therapy-san-francisco": {
    city: "San Francisco", state: "CA", slug: "anger-therapy-san-francisco",
    title: "Anger Management Therapy in San Francisco, CA", metaTitle: "Anger Management Therapist San Francisco | LMFT | $240/session | Free Consultation", metaDescription: "Licensed anger management therapist in San Francisco (LMFT). Direct, practical approach for men and adults. $240/45min. Free 15-minute consultation.",
    h1: "Anger Management Therapist in San Francisco, CA | LMFT | Treatment for Anger Management", intro: "If anger is hurting your relationships or career in SF, you're not alone. We use a direct, practical approach to help you understand what's driving your anger and build healthier ways to express it.", localContent: "From the Financial District to the Outer Sunset, our telehealth platform brings anger management therapy to San Francisco residents.",
    whyChoose: ["Licensed LMFT specializing in anger management", "Understand triggers and build tools", "Men's therapy specialization", "Free 15-minute consultation call"],
  },
  "anger-therapy-oakland": {
    city: "Oakland", state: "CA", slug: "anger-therapy-oakland",
    title: "Anger Management Therapy in Oakland, CA", metaTitle: "Anger Management Therapist Oakland | LMFT | $240/session | Free Consultation", metaDescription: "Licensed anger management therapist in Oakland (LMFT). Direct, practical approach for men and adults. $240/45min. Serving East Bay. Free consultation.",
    h1: "Anger Management Therapist in Oakland, CA | LMFT | Treatment for Anger Management", intro: "Oakland residents struggling with anger can get real help. We use a direct, no-BS approach to help you understand what's fueling your anger and change how you express it.", localContent: "Serving Oakland from Downtown to the Hills through convenient telehealth sessions.",
    whyChoose: ["Licensed LMFT with anger management expertise", "Understand what drives explosive reactions", "Men's therapy specialization", "Free 15-minute consultation call"],
  },
  "anger-therapy-san-jose": {
    city: "San Jose", state: "CA", slug: "anger-therapy-san-jose",
    title: "Anger Management Therapy in San Jose, CA", metaTitle: "Anger Management Therapist San Jose | LMFT | $240/session | Free Consultation", metaDescription: "Licensed anger management therapist in San Jose (LMFT). Direct, practical approach for men and adults. $240/45min. Serving Silicon Valley. Free consultation.",
    h1: "Anger Management Therapist in San Jose, CA | LMFT | Treatment for Anger Management", intro: "San Jose residents whose anger is affecting work or relationships can find help. We use a practical approach to help you understand your triggers and build healthier responses.", localContent: "From Downtown to Almaden, telehealth brings anger management therapy to Silicon Valley residents.",
    whyChoose: ["Licensed LMFT specializing in anger work", "Work on explosive anger and resentment", "Build communication skills", "Free 15-minute consultation call"],
  },
  "anger-therapy-berkeley": {
    city: "Berkeley", state: "CA", slug: "anger-therapy-berkeley",
    title: "Anger Management Therapy in Berkeley, CA", metaTitle: "Anger Management Therapist Berkeley | LMFT | $240/session | Free Consultation", metaDescription: "Licensed anger management therapist in Berkeley (LMFT). Direct, practical approach for men and adults. $240/45min. Serving East Bay. Free consultation.",
    h1: "Anger Management Therapist in Berkeley, CA | LMFT | Treatment for Anger Management", intro: "Berkeley residents struggling with anger can get practical help. We use a direct approach to help you understand what's driving your reactions and build healthier ways to express frustration.", localContent: "Whether you're a student or professional, our telehealth platform brings anger management therapy to Berkeley.",
    whyChoose: ["Licensed LMFT with anger management focus", "Understand triggers and patterns", "Men's therapy specialization", "Free 15-minute consultation call"],
  },
  "anger-therapy-palo-alto": {
    city: "Palo Alto", state: "CA", slug: "anger-therapy-palo-alto",
    title: "Anger Management Therapy in Palo Alto, CA", metaTitle: "Anger Management Therapist Palo Alto | LMFT | $240/session | Free Consultation", metaDescription: "Licensed anger management therapist in Palo Alto (LMFT). Direct approach for men and adults. $240/45min. Serving Stanford. Free consultation.",
    h1: "Anger Management Therapist in Palo Alto, CA | LMFT | Treatment for Anger Management", intro: "Palo Alto residents whose anger is affecting relationships or work can get help. We use a practical, direct approach to help you understand what's fueling your anger and change how you respond.", localContent: "Serving Stanford students and Palo Alto professionals through convenient telehealth sessions.",
    whyChoose: ["Licensed LMFT specializing in anger work", "Work on anger and stress management", "Build healthier communication patterns", "Free 15-minute consultation call"],
  },

  // Teen Therapy
  "teen-therapy-san-francisco": {
    city: "San Francisco", state: "CA", slug: "teen-therapy-san-francisco",
    title: "Teen Therapy in San Francisco, CA", metaTitle: "Teen Therapist San Francisco | LMFT | $240/session | Free Consultation", metaDescription: "Licensed teen therapist in San Francisco (LMFT). High school age+. Anxiety, depression, identity, relationships. $240/45min. Free consultation.",
    h1: "Teen Therapist in San Francisco, CA | LMFT | Counseling for Teens", intro: "SF teens (high school age and up) dealing with anxiety, depression, identity questions, or relationship struggles can find support. We specialize in helping teens navigate the unique pressures of adolescence and young adulthood.", localContent: "Serving teens throughout San Francisco through convenient telehealth sessions. No need to miss school or navigate SF traffic.",
    whyChoose: ["Licensed LMFT specializing in teen therapy", "Focus on identity, relationships, and transitions", "High school age and up", "Free 15-minute consultation call"],
  },
  "teen-therapy-oakland": {
    city: "Oakland", state: "CA", slug: "teen-therapy-oakland",
    title: "Teen Therapy in Oakland, CA", metaTitle: "Teen Therapist Oakland | LMFT | $240/session | Free Consultation", metaDescription: "Licensed teen therapist in Oakland (LMFT). High school age+. Anxiety, depression, identity, transitions. $240/45min. Free consultation.",
    h1: "Teen Therapist in Oakland, CA | LMFT | Counseling for Teens", intro: "Oakland teens (high school age and up) navigating anxiety, depression, identity, or family dynamics can get help. We work with teens on emotional and relational issues, not learning assessments.", localContent: "Serving Oakland teens from Piedmont High to Skyline through convenient telehealth sessions.",
    whyChoose: ["Licensed LMFT with teen experience", "Focus on emotional and relational issues", "Family therapy available for parent-teen work", "Free 15-minute consultation call"],
  },
  "teen-therapy-san-jose": {
    city: "San Jose", state: "CA", slug: "teen-therapy-san-jose",
    title: "Teen Therapy in San Jose, CA", metaTitle: "Teen Therapist San Jose | LMFT | $240/session | Free Consultation", metaDescription: "Licensed teen therapist in San Jose (LMFT). High school age+. Anxiety, depression, academic pressure. $240/45min. Free consultation.",
    h1: "Teen Therapist in San Jose, CA | LMFT | Counseling for Teens", intro: "San Jose teens (high school age and up) dealing with academic pressure, anxiety, or identity questions can find support. We help teens navigate the unique challenges of growing up in Silicon Valley.", localContent: "Serving teens throughout San Jose through convenient telehealth sessions that work around school schedules.",
    whyChoose: ["Licensed LMFT specializing in teen therapy", "Teen anxiety and depression specialization", "Family therapy available", "Free 15-minute consultation call"],
  },
  "teen-therapy-berkeley": {
    city: "Berkeley", state: "CA", slug: "teen-therapy-berkeley",
    title: "Teen Therapy in Berkeley, CA", metaTitle: "Teen Therapist Berkeley | LMFT | $240/session | Free Consultation", metaDescription: "Licensed teen therapist in Berkeley (LMFT). High school age+. Anxiety, depression, identity. $240/45min. Free consultation.",
    h1: "Teen Therapist in Berkeley, CA | LMFT | Counseling for Teens", intro: "Berkeley teens (high school age and up) navigating anxiety, depression, identity, or family dynamics can get help. We specialize in helping teens work through emotional and relational challenges.", localContent: "Serving Berkeley High students and East Bay teens through convenient telehealth sessions.",
    whyChoose: ["Licensed LMFT with teen expertise", "Focus on identity and life transitions", "Family therapy for parent-teen work", "Free 15-minute consultation call"],
  },
  "teen-therapy-palo-alto": {
    city: "Palo Alto", state: "CA", slug: "teen-therapy-palo-alto",
    title: "Teen Therapy in Palo Alto, CA", metaTitle: "Teen Therapist Palo Alto | LMFT | $240/session | Free Consultation", metaDescription: "Licensed teen therapist in Palo Alto (LMFT). High school age+. Anxiety, depression, achievement pressure. $240/45min. Free consultation.",
    h1: "Teen Therapist in Palo Alto, CA | LMFT | Counseling for Teens", intro: "Palo Alto teens (high school age and up) dealing with achievement pressure, anxiety, or identity questions can find support. We help teens navigate the intense academic and social pressures of the Peninsula.", localContent: "Serving Palo Alto High, Gunn, and Peninsula teens through convenient telehealth sessions.",
    whyChoose: ["Licensed LMFT specializing in teen therapy", "Teen anxiety and perfectionism specialization", "Family therapy available", "Free 15-minute consultation call"],
  },

  // College Student Therapy
  "college-student-therapy-san-francisco": {
    city: "San Francisco", state: "CA", slug: "college-student-therapy-san-francisco",
    title: "College Student Therapy in San Francisco, CA", metaTitle: "College Student Therapist San Francisco | LMFT | $240/session | Free Consultation", metaDescription: "Licensed therapist for college students in San Francisco (LMFT). Anxiety, depression, identity, transitions. $240/45min. Free consultation.",
    h1: "Therapist for College Students in San Francisco, CA | LMFT", intro: "SF college students dealing with anxiety, depression, identity questions, or life transitions can find support. We understand the unique pressures of college life and help students navigate this critical time.", localContent: "Serving SFSU, USF, and other SF college students through flexible telehealth sessions.",
    whyChoose: ["Licensed LMFT with college student experience", "Treatment for anxiety, depression, identity issues", "Flexible scheduling around classes", "Free 15-minute consultation call"],
  },
  "college-student-therapy-oakland": {
    city: "Oakland", state: "CA", slug: "college-student-therapy-oakland",
    title: "College Student Therapy in Oakland, CA", metaTitle: "College Student Therapist Oakland | LMFT | $240/session | Free Consultation", metaDescription: "Licensed therapist for college students in Oakland (LMFT). Anxiety, depression, transitions. $240/45min. Free consultation.",
    h1: "Therapist for College Students in Oakland, CA | LMFT", intro: "Oakland college students navigating anxiety, depression, or life transitions can get help. We work with students on the emotional and relational challenges of college life.", localContent: "Serving Mills College, Oakland college students, and commuters through convenient telehealth sessions.",
    whyChoose: ["Licensed LMFT specializing in college transitions", "Treatment for student anxiety and depression", "Flexible virtual appointments", "Free 15-minute consultation call"],
  },
  "college-student-therapy-san-jose": {
    city: "San Jose", state: "CA", slug: "college-student-therapy-san-jose",
    title: "College Student Therapy in San Jose, CA", metaTitle: "College Student Therapist San Jose | LMFT | $240/session | Free Consultation", metaDescription: "Licensed therapist for college students in San Jose (LMFT). Anxiety, depression, academic stress. $240/45min. Free consultation.",
    h1: "Therapist for College Students in San Jose, CA | LMFT", intro: "San Jose college students dealing with academic pressure, anxiety, or identity questions can find support. We help students navigate the challenges of college life in Silicon Valley.", localContent: "Serving SJSU and other San Jose area college students through flexible telehealth sessions.",
    whyChoose: ["Licensed LMFT with college experience", "Treatment for academic pressure and anxiety", "Flexible scheduling around classes", "Free 15-minute consultation call"],
  },
  "college-student-therapy-berkeley": {
    city: "Berkeley", state: "CA", slug: "college-student-therapy-berkeley",
    title: "College Student Therapy in Berkeley, CA", metaTitle: "College Student Therapist Berkeley | LMFT | $240/session | Free Consultation", metaDescription: "Licensed therapist for college students in Berkeley (LMFT). Anxiety, depression, identity. $240/45min. Free consultation.",
    h1: "Therapist for College Students in Berkeley, CA | LMFT", intro: "UC Berkeley students and other Berkeley college students navigating anxiety, depression, or academic pressure can get help. We specialize in helping students work through the unique challenges of college life.", localContent: "Serving UC Berkeley students and East Bay college students through convenient telehealth sessions.",
    whyChoose: ["Licensed LMFT with UC Berkeley student experience", "Treatment for academic anxiety and perfectionism", "Flexible scheduling around exams and classes", "Free 15-minute consultation call"],
  },
  "college-student-therapy-palo-alto": {
    city: "Palo Alto", state: "CA", slug: "college-student-therapy-palo-alto",
    title: "College Student Therapy in Palo Alto, CA", metaTitle: "College Student Therapist Palo Alto | LMFT | $240/session | Free Consultation", metaDescription: "Licensed therapist for college students in Palo Alto (LMFT). Anxiety, depression, achievement stress. $240/45min. Free consultation.",
    h1: "Therapist for College Students in Palo Alto, CA | LMFT", intro: "Stanford students and Palo Alto area college students dealing with achievement pressure, anxiety, or identity questions can find support. We help students navigate the intense academic culture of the Peninsula.", localContent: "Serving Stanford and Peninsula college students through flexible telehealth sessions.",
    whyChoose: ["Licensed LMFT with Stanford student experience", "Treatment for achievement pressure and perfectionism", "Flexible scheduling", "Free 15-minute consultation call"],
  },

  // LGBTQ+ Affirming Therapy
  "lgbtq-therapy-san-francisco": {
    city: "San Francisco", state: "CA", slug: "lgbtq-therapy-san-francisco",
    title: "LGBTQ+ Affirming Therapy in San Francisco, CA", metaTitle: "LGBTQ+ Therapist San Francisco | LMFT | $240/session | Free Consultation", metaDescription: "LGBTQ+ affirming therapy in San Francisco. Identity, relationships, transition support. Licensed therapist. Telehealth available.",
    h1: "LGBTQ+ Affirming Therapist in San Francisco, CA | LMFT", intro: "San Francisco's LGBTQ+ community deserves mental health support that fully affirms who you are. We provide therapy for identity exploration, relationship issues, family dynamics, and life transitions in an affirming space.", localContent: "Serving the Castro, SOMA, the Mission, and all SF neighborhoods through telehealth sessions.",
    whyChoose: ["Licensed LMFT with LGBTQ+ affirming practice", "Support for identity, relationships, and transitions", "Trauma-informed care", "Free 15-minute consultation call"],
  },
  "lgbtq-therapy-oakland": {
    city: "Oakland", state: "CA", slug: "lgbtq-therapy-oakland",
    title: "LGBTQ+ Affirming Therapy in Oakland, CA", metaTitle: "LGBTQ+ Therapist Oakland | LMFT | $240/session | Free Consultation", metaDescription: "LGBTQ+ affirming therapist in Oakland (LMFT). Gender identity, coming out, relationship issues. $240/45min. Free consultation.",
    h1: "LGBTQ+ Affirming Therapist in Oakland, CA | LMFT", intro: "Oakland's LGBTQ+ community can find affirming mental health support. We work with individuals on identity, relationships, family dynamics, and transitions in a fully affirming space.", localContent: "Serving Oakland's diverse LGBTQ+ community through convenient telehealth sessions.",
    whyChoose: ["Licensed LMFT with LGBTQ+ affirming therapy", "Support for identity and relationship issues", "Family therapy for coming out and family dynamics", "Free 15-minute consultation call"],
  },
  "lgbtq-therapy-san-jose": {
    city: "San Jose", state: "CA", slug: "lgbtq-therapy-san-jose",
    title: "LGBTQ+ Affirming Therapy in San Jose, CA", metaTitle: "LGBTQ+ Therapist San Jose | LMFT | $240/session | Free Consultation", metaDescription: "LGBTQ+ affirming therapist in San Jose (LMFT). Gender identity, coming out, relationships. $240/45min. Free consultation.",
    h1: "LGBTQ+ Affirming Therapist in San Jose, CA | LMFT", intro: "San Jose's LGBTQ+ community deserves mental health care that affirms who you are. We provide therapy for identity exploration, relationship issues, and life transitions in a safe, affirming space.", localContent: "Serving Silicon Valley's LGBTQ+ community through convenient telehealth sessions.",
    whyChoose: ["Licensed LMFT with LGBTQ+ affirming practice", "Support for identity and relationships", "Trauma-informed, culturally responsive care", "Free 15-minute consultation call"],
  },
  "lgbtq-therapy-berkeley": {
    city: "Berkeley", state: "CA", slug: "lgbtq-therapy-berkeley",
    title: "LGBTQ+ Affirming Therapy in Berkeley, CA", metaTitle: "LGBTQ+ Therapist Berkeley | LMFT | $240/session | Free Consultation", metaDescription: "LGBTQ+ affirming therapist in Berkeley (LMFT). Gender identity, coming out, relationship issues. $240/45min. Free consultation.",
    h1: "LGBTQ+ Affirming Therapist in Berkeley, CA | LMFT", intro: "Berkeley's LGBTQ+ community, including UC Berkeley students, can find affirming mental health support. We work on identity, relationships, family dynamics, and transitions in a fully affirming space.", localContent: "Serving Berkeley's LGBTQ+ community and UC Berkeley students through telehealth sessions.",
    whyChoose: ["Licensed LMFT with LGBTQ+ affirming therapy", "Support for students and adults", "Identity exploration and relationship work", "Free 15-minute consultation call"],
  },
  "lgbtq-therapy-palo-alto": {
    city: "Palo Alto", state: "CA", slug: "lgbtq-therapy-palo-alto",
    title: "LGBTQ+ Affirming Therapy in Palo Alto, CA", metaTitle: "LGBTQ+ Therapist Palo Alto | LMFT | $240/session | Free Consultation", metaDescription: "LGBTQ+ affirming therapist in Palo Alto (LMFT). Gender identity, coming out, relationships. $240/45min. Free consultation.",
    h1: "LGBTQ+ Affirming Therapist in Palo Alto, CA | LMFT", intro: "Palo Alto's LGBTQ+ community, including Stanford students, can find affirming mental health care. We provide therapy for identity, relationships, and life transitions in a safe, affirming space.", localContent: "Serving Stanford and Peninsula LGBTQ+ community through convenient telehealth sessions.",
    whyChoose: ["Licensed LMFT with LGBTQ+ affirming practice", "Support for students and professionals", "Identity and relationship work", "Free 15-minute consultation call"],
  },

  // Relationship Therapy (for individuals, not couples)
  "relationship-therapy-san-francisco": {
    city: "San Francisco", state: "CA", slug: "relationship-therapy-san-francisco",
    title: "Relationship Therapy in San Francisco, CA", metaTitle: "Relationship Therapist San Francisco | LMFT | $240/session | Free Consultation", metaDescription: "Relationship therapy for individuals in San Francisco. Work on relationship patterns and communication. Not couples therapy. Licensed therapist.",
    h1: "Relationship Therapist in San Francisco, CA | LMFT | Individual Therapy", intro: "If you're struggling in your relationship, individual therapy can help. We don't offer couples therapy, but we help individuals understand their relationship patterns, improve communication, and work through what they bring to relationships.", localContent: "Serving San Francisco residents working on relationship issues through individual telehealth sessions.",
    whyChoose: ["Licensed LMFT for individual relationship therapy", "Understand patterns and communication", "Psychodynamic and IFS approaches", "Free 15-minute consultation call"],
  },
  "relationship-therapy-oakland": {
    city: "Oakland", state: "CA", slug: "relationship-therapy-oakland",
    title: "Relationship Therapy in Oakland, CA", metaTitle: "Relationship Therapist Oakland | LMFT | $240/session | Free Consultation", metaDescription: "Licensed relationship therapist in Oakland (LMFT). Individual therapy for relationship patterns. Not couples therapy. $240/45min. Free consultation.",
    h1: "Relationship Therapist in Oakland, CA | LMFT | Individual Therapy", intro: "Oakland residents struggling with relationship issues can work on them individually. We help you understand your patterns, improve communication skills, and work through what you bring to relationships. This is individual therapy, not couples work.", localContent: "Serving Oakland through convenient telehealth sessions for individual relationship work.",
    whyChoose: ["Licensed LMFT specializing in relationship work", "Understand patterns and triggers", "Men's therapy for relationship issues", "Free 15-minute consultation call"],
  },
  "relationship-therapy-san-jose": {
    city: "San Jose", state: "CA", slug: "relationship-therapy-san-jose",
    title: "Relationship Therapy in San Jose, CA", metaTitle: "Relationship Therapist San Jose | LMFT | $240/session | Free Consultation", metaDescription: "Licensed relationship therapist in San Jose (LMFT). Individual therapy for relationship issues. Not couples therapy. $240/45min. Free consultation.",
    h1: "Relationship Therapist in San Jose, CA | LMFT | Individual Therapy", intro: "San Jose residents struggling in relationships can work on them individually. We help you understand your communication patterns, work through relationship conflicts, and build healthier dynamics. Individual sessions, not couples therapy.", localContent: "Serving Silicon Valley through telehealth sessions for individual relationship work.",
    whyChoose: ["Licensed LMFT for individual relationship therapy", "Work on communication and patterns", "Psychodynamic and men's therapy approaches", "Free 15-minute consultation call"],
  },
  "relationship-therapy-berkeley": {
    city: "Berkeley", state: "CA", slug: "relationship-therapy-berkeley",
    title: "Relationship Therapy in Berkeley, CA", metaTitle: "Relationship Therapist Berkeley | LMFT | $240/session | Free Consultation", metaDescription: "Licensed relationship therapist in Berkeley (LMFT). Individual therapy for relationship patterns. Not couples therapy. $240/45min. Free consultation.",
    h1: "Relationship Therapist in Berkeley, CA | LMFT | Individual Therapy", intro: "Berkeley residents and UC Berkeley students struggling with relationship issues can work on them individually. We help you understand your patterns, improve communication, and work through what you bring to relationships.", localContent: "Serving Berkeley and UC Berkeley students through telehealth sessions for individual relationship work.",
    whyChoose: ["Licensed LMFT with relationship expertise", "Understand attachment and patterns", "Support for students and adults", "Free 15-minute consultation call"],
  },
  "relationship-therapy-palo-alto": {
    city: "Palo Alto", state: "CA", slug: "relationship-therapy-palo-alto",
    title: "Relationship Therapy in Palo Alto, CA", metaTitle: "Relationship Therapist Palo Alto | LMFT | $240/session | Free Consultation", metaDescription: "Licensed relationship therapist in Palo Alto (LMFT). Individual therapy for relationship issues. Not couples therapy. $240/45min. Free consultation.",
    h1: "Relationship Therapist in Palo Alto, CA | LMFT | Individual Therapy", intro: "Palo Alto residents and Stanford students struggling with relationship issues can work on them individually. We help you understand your patterns, work through conflicts, and build healthier relationship dynamics.", localContent: "Serving Stanford and Peninsula residents through telehealth sessions for individual relationship work.",
    whyChoose: ["Licensed LMFT for individual relationship therapy", "Understand patterns and communication", "Psychodynamic approach", "Free 15-minute consultation call"],
  },

  // ===== ONLINE THERAPY PAGES (High-Volume Searches) =====
  "online-therapy-san-francisco": {
    city: "San Francisco", state: "CA", slug: "online-therapy-san-francisco",
    title: "Online Therapy in San Francisco, CA", metaTitle: "Online Therapist San Francisco | LMFT | $240/session | Free Consultation", metaDescription: "Licensed online therapist in San Francisco (LMFT). EMDR, CBT, IFS virtual therapy. $240/45min. Free 15-min consultation. Book today.",
    h1: "Online Therapist in San Francisco, CA | LMFT", intro: "Looking for online therapy in San Francisco? As a licensed therapist (LMFT), I provide virtual therapy to SF residents across all neighborhoods. Telehealth means you get quality mental health care without commuting, parking, or leaving your home.", localContent: "Whether you're in the Financial District, the Mission, Pacific Heights, or the Outer Sunset, online therapy brings professional mental health support directly to you. I specialize in EMDR, IFS, CBT, and family therapy for adults, teens, and families dealing with anxiety, depression, trauma, and relationship issues.",
    whyChoose: ["Licensed California therapist (LMFT)", "EMDR, IFS, CBT, and family therapy", "Virtual sessions eliminate SF commute stress", "Free 15-minute consultation"],
  },
  "online-therapy-oakland": {
    city: "Oakland", state: "CA", slug: "online-therapy-oakland",
    title: "Online Therapy in Oakland, CA", metaTitle: "Online Therapist Oakland | LMFT | $240/session | Free Consultation", metaDescription: "Licensed online therapist in Oakland (LMFT). Virtual EMDR, CBT, IFS therapy. $240/45min. Free 15-min consultation. Serving East Bay.",
    h1: "Online Therapist in Oakland, CA | LMFT", intro: "Online therapy in Oakland provides professional mental health support without the commute. As a licensed therapist (LMFT) serving Oakland residents, I offer virtual therapy for anxiety, depression, trauma, and relationship issues.", localContent: "From Temescal to Lake Merritt, Rockridge to the Oakland Hills, online therapy brings quality mental health care to you. Telehealth sessions mean no parking hassles, no traffic, and therapy that fits your East Bay lifestyle.",
    whyChoose: ["Licensed California LMFT", "EMDR, IFS, CBT virtual therapy", "Serving all Oakland neighborhoods", "Free 15-minute consultation call"],
  },
  "online-therapy-berkeley": {
    city: "Berkeley", state: "CA", slug: "online-therapy-berkeley",
    title: "Online Therapy in Berkeley, CA", metaTitle: "Online Therapist Berkeley | LMFT | $240/session | Free Consultation", metaDescription: "Licensed online therapist in Berkeley (LMFT). Virtual therapy for UC Berkeley students and East Bay residents. EMDR, CBT, IFS. Book today.",
    h1: "Online Therapist in Berkeley, CA | LMFT", intro: "Berkeley residents and UC Berkeley students can access quality online therapy from a licensed therapist (LMFT). Virtual sessions provide professional mental health support for anxiety, depression, academic stress, and more.", localContent: "Whether you're a UC Berkeley student in the dorms, a professional in Downtown Berkeley, or a family in the Berkeley Hills, online therapy eliminates commute time and brings therapy directly to you.",
    whyChoose: ["Licensed LMFT serving Berkeley", "Experience with UC Berkeley students", "Virtual EMDR, CBT, and IFS therapy", "Free 15-minute consultation"],
  },
  "online-therapy-san-jose": {
    city: "San Jose", state: "CA", slug: "online-therapy-san-jose",
    title: "Online Therapy in San Jose, CA", metaTitle: "Online Therapist San Jose | LMFT | $240/session | Free Consultation", metaDescription: "Licensed online therapist in San Jose (LMFT). Virtual therapy for Silicon Valley professionals. EMDR, CBT, IFS. $240/45min. Book today.",
    h1: "Online Therapist in San Jose, CA | LMFT", intro: "San Jose professionals and families can access online therapy from a licensed therapist (LMFT) who understands Silicon Valley stress. Virtual sessions provide effective mental health support without adding to your commute.", localContent: "From Willow Glen to Almaden Valley, Downtown to Evergreen, online therapy brings professional mental health care to San Jose residents. Work with a licensed therapist who gets the unique pressures of working in tech.",
    whyChoose: ["Licensed California LMFT", "Experience with tech industry stress", "Virtual EMDR, CBT, IFS sessions", "Free 15-minute consultation"],
  },
  "online-therapy-palo-alto": {
    city: "Palo Alto", state: "CA", slug: "online-therapy-palo-alto",
    title: "Online Therapy in Palo Alto, CA", metaTitle: "Online Therapist Palo Alto | LMFT | $240/session | Free Consultation", metaDescription: "Licensed online therapist in Palo Alto (LMFT). Virtual therapy for Stanford students and Peninsula residents. EMDR, CBT, IFS. Book today.",
    h1: "Online Therapist in Palo Alto, CA | LMFT", intro: "Palo Alto residents and Stanford students can access online therapy from a licensed therapist (LMFT) specializing in achievement stress, anxiety, and academic pressure. Virtual sessions eliminate the need to find parking or commute.", localContent: "Whether you're near Stanford, in Old Palo Alto, or in the Midtown area, online therapy provides professional mental health support that fits your schedule. Work with a therapist who understands Peninsula culture.",
    whyChoose: ["Licensed LMFT serving Palo Alto", "Experience with Stanford students", "Virtual sessions for busy schedules", "Free 15-minute consultation"],
  },
  "online-therapy-fremont": {
    city: "Fremont", state: "CA", slug: "online-therapy-fremont",
    title: "Online Therapy in Fremont, CA", metaTitle: "Online Therapist Fremont | LMFT | $240/session | Free Consultation", metaDescription: "Licensed online therapist in Fremont (LMFT). Virtual therapy for South Bay residents. EMDR, CBT, IFS. $240/45min. Book today.",
    h1: "Online Therapist in Fremont, CA | LMFT", intro: "Fremont residents can access quality online therapy from a licensed therapist (LMFT). Virtual sessions provide professional mental health support for anxiety, depression, family issues, and more without the commute.", localContent: "From Niles to Mission San Jose, Warm Springs to Central Fremont, online therapy brings licensed mental health care directly to you. Culturally sensitive therapy for Fremont's diverse community.",
    whyChoose: ["Licensed California LMFT", "Culturally responsive online therapy", "Virtual EMDR, CBT, IFS sessions", "Free 15-minute consultation"],
  },
  "online-therapy-hayward": {
    city: "Hayward", state: "CA", slug: "online-therapy-hayward",
    title: "Online Therapy in Hayward, CA", metaTitle: "Online Therapist Hayward | LMFT | $240/session | Free Consultation", metaDescription: "Licensed online therapist in Hayward (LMFT). Virtual therapy for East Bay residents. EMDR, CBT, family therapy. Book free consultation.",
    h1: "Online Therapist in Hayward, CA | LMFT", intro: "Hayward residents can access licensed online therapy (LMFT) for anxiety, depression, trauma, and family issues. Virtual sessions bring quality mental health care to you without the drive to Oakland or San Francisco.", localContent: "From Downtown Hayward to the Southgate area, online therapy provides professional mental health support that's accessible and convenient. Telehealth eliminates transportation barriers.",
    whyChoose: ["Licensed LMFT serving Hayward", "Virtual EMDR, CBT, family therapy", "No commute required", "Free 15-minute consultation"],
  },
  "online-therapy-walnut-creek": {
    city: "Walnut Creek", state: "CA", slug: "online-therapy-walnut-creek",
    title: "Online Therapy in Walnut Creek, CA", metaTitle: "Online Therapist Walnut Creek | LMFT | $240/session | Free Consultation", metaDescription: "Licensed online therapist in Walnut Creek (LMFT). Virtual therapy for Contra Costa County. EMDR, CBT, IFS. Book free consultation.",
    h1: "Online Therapist in Walnut Creek, CA | LMFT", intro: "Walnut Creek residents can access online therapy from a licensed therapist (LMFT) serving Contra Costa County. Virtual sessions provide professional mental health support without the hassle of downtown parking.", localContent: "Whether you're in Downtown Walnut Creek, Northgate, or Rudgear Estates, online therapy brings licensed mental health care to you. Work on anxiety, depression, relationship issues, and more from home.",
    whyChoose: ["Licensed California LMFT", "Virtual sessions across Contra Costa County", "EMDR, CBT, IFS therapy", "Free 15-minute consultation"],
  },
  "online-therapy-san-mateo": {
    city: "San Mateo", state: "CA", slug: "online-therapy-san-mateo",
    title: "Online Therapy in San Mateo, CA", metaTitle: "Online Therapist San Mateo | LMFT | $240/session | Free Consultation", metaDescription: "Licensed online therapist in San Mateo (LMFT). Virtual therapy for Peninsula residents. EMDR, CBT, family therapy. Book today.",
    h1: "Online Therapist in San Mateo, CA | LMFT", intro: "San Mateo residents and families can access online therapy from a licensed therapist (LMFT). Virtual sessions provide professional mental health support without fighting Peninsula traffic.", localContent: "From Downtown San Mateo to Hillsdale and Baywood, online therapy brings quality mental health care to you. Work with a licensed therapist on anxiety, depression, family issues, and more.",
    whyChoose: ["Licensed LMFT serving San Mateo County", "Virtual EMDR, CBT, family therapy", "No Peninsula traffic or parking hassles", "Free 15-minute consultation"],
  },
  "online-therapy-redwood-city": {
    city: "Redwood City", state: "CA", slug: "online-therapy-redwood-city",
    title: "Online Therapy in Redwood City, CA", metaTitle: "Online Therapist Redwood City | LMFT | $240/session | Free Consultation", metaDescription: "Licensed online therapist in Redwood City (LMFT). Virtual therapy for Peninsula families. EMDR, CBT, IFS. Book free consultation.",
    h1: "Online Therapist in Redwood City, CA | LMFT", intro: "Redwood City residents can access licensed online therapy (LMFT) for anxiety, depression, trauma, and family issues. Virtual sessions eliminate the commute and bring therapy to your home.", localContent: "From Downtown Redwood City to Emerald Hills, online therapy provides professional mental health support that fits Peninsula living. Work with a licensed therapist from the comfort of home.",
    whyChoose: ["Licensed California LMFT", "Virtual sessions for Peninsula residents", "EMDR, CBT, family therapy", "Free 15-minute consultation"],
  },
  "online-therapy-mountain-view": {
    city: "Mountain View", state: "CA", slug: "online-therapy-mountain-view",
    title: "Online Therapy in Mountain View, CA", metaTitle: "Online Therapist Mountain View | LMFT | $240/session | Free Consultation", metaDescription: "Licensed online therapist in Mountain View (LMFT). Virtual therapy for Silicon Valley professionals. EMDR, CBT, IFS. Book today.",
    h1: "Online Therapist in Mountain View, CA | LMFT", intro: "Mountain View professionals can access online therapy from a licensed therapist (LMFT) who understands tech industry stress. Virtual sessions provide mental health support that fits your Silicon Valley schedule.", localContent: "From Downtown Mountain View to Moffett Field, online therapy brings licensed mental health care directly to you. No commute, no parking, just effective therapy for work stress, anxiety, and burnout.",
    whyChoose: ["Licensed LMFT with tech industry experience", "Virtual EMDR, CBT, IFS sessions", "Flexible scheduling for professionals", "Free 15-minute consultation"],
  },
  "online-therapy-sunnyvale": {
    city: "Sunnyvale", state: "CA", slug: "online-therapy-sunnyvale",
    title: "Online Therapy in Sunnyvale, CA", metaTitle: "Online Therapist Sunnyvale | LMFT | $240/session | Free Consultation", metaDescription: "Licensed online therapist in Sunnyvale (LMFT). Virtual therapy for Silicon Valley residents. EMDR, CBT, family therapy. Book today.",
    h1: "Online Therapist in Sunnyvale, CA | LMFT", intro: "Sunnyvale residents can access licensed online therapy (LMFT) for anxiety, work stress, family issues, and more. Virtual sessions eliminate the commute and bring professional mental health care to you.", localContent: "Whether you're in Murphy Ranch, the Heritage District, or near Moffett Park, online therapy provides convenient mental health support for Silicon Valley residents and families.",
    whyChoose: ["Licensed California LMFT", "Experience with tech industry burnout", "Virtual family and individual therapy", "Free 15-minute consultation"],
  },
  "online-therapy-daly-city": {
    city: "Daly City", state: "CA", slug: "online-therapy-daly-city",
    title: "Online Therapy in Daly City, CA", metaTitle: "Online Therapist Daly City | LMFT | $240/session | Free Consultation", metaDescription: "Licensed online therapist in Daly City (LMFT). Virtual therapy for diverse communities. EMDR, CBT, family therapy. Book free consultation.",
    h1: "Online Therapist in Daly City, CA | LMFT", intro: "Daly City residents can access culturally responsive online therapy from a licensed therapist (LMFT). Virtual sessions provide professional mental health support for one of California's most diverse communities.", localContent: "From Westlake to Serramonte and St. Francis Heights, online therapy brings licensed mental health care to you. Culturally sensitive therapy for anxiety, depression, family issues, and trauma.",
    whyChoose: ["Licensed LMFT serving Daly City", "Culturally responsive online therapy", "Virtual EMDR, CBT, family sessions", "Free 15-minute consultation"],
  },
  "online-therapy-alameda": {
    city: "Alameda", state: "CA", slug: "online-therapy-alameda",
    title: "Online Therapy in Alameda, CA", metaTitle: "Online Therapist Alameda | LMFT | $240/session | Free Consultation", metaDescription: "Licensed online therapist in Alameda (LMFT). Virtual therapy for island residents. EMDR, CBT, family therapy. Book free consultation.",
    h1: "Online Therapist in Alameda, CA | LMFT", intro: "Alameda residents can access licensed online therapy (LMFT) without leaving the island. Virtual sessions provide professional mental health support for anxiety, depression, family issues, and trauma.", localContent: "From the West End to Bay Farm Island, online therapy brings quality mental health care to Alameda residents. No bridge traffic, no parking hassles, just effective therapy from home.",
    whyChoose: ["Licensed California LMFT", "Virtual sessions eliminate bridge traffic", "EMDR, CBT, family therapy", "Free 15-minute consultation"],
  },
  "online-therapy-san-rafael": {
    city: "San Rafael", state: "CA", slug: "online-therapy-san-rafael",
    title: "Online Therapy in San Rafael, CA", metaTitle: "Online Therapist San Rafael | LMFT | $240/session | Free Consultation", metaDescription: "Licensed online therapist in San Rafael (LMFT). Virtual therapy for Marin County. EMDR, CBT, family therapy. Book free consultation.",
    h1: "Online Therapist in San Rafael, CA | LMFT", intro: "San Rafael residents can access licensed online therapy (LMFT) for anxiety, depression, family issues, and life transitions. Virtual sessions bring professional mental health care to Marin County without the drive to SF.", localContent: "From Downtown San Rafael to Terra Linda, online therapy provides convenient mental health support for Marin County residents. Work with a licensed therapist from the comfort of home.",
    whyChoose: ["Licensed LMFT serving Marin County", "Virtual EMDR, CBT, family therapy", "No need to drive to San Francisco", "Free 15-minute consultation"],
  },
};

const faqs = [
  { q: "Are you accepting new clients?", a: "Yes! I'm currently accepting new clients and would love to hear what brings you to therapy. Schedule a free consultation so we can discuss whether we're a good fit and go over current availability." },
  { q: "Do you offer in-person sessions?", a: "No. Bayside Wellness & Counseling is a fully virtual practice, offering telehealth sessions to clients across California. This makes quality therapy accessible wherever you are." },
  { q: "How much does therapy cost?", a: "45-minute sessions are $240 and 60-minute sessions are $320. All sessions are virtual and available to anyone in California. I can provide a superbill that you can submit to your insurance company for potential out-of-network reimbursement." },
  { q: "Do you take insurance?", a: "I don't accept insurance directly or participate in insurance networks. However, I can provide a superbill (detailed receipt) at the end of each month that you can submit to your insurance company for potential reimbursement if you have a PPO plan, HSA, or FSA." },
  { q: "How do I know which therapy approach is right for me?", a: "You don't need to know. That's my job. During your consultation we'll discuss what you're experiencing and recommend the approach most likely to help." },
  { q: "Do you work with teens?", a: "Yes. I work with teens (high school age and up) and college students, specializing in anxiety, depression, trauma, identity, relationships, and life transitions. My focus is on emotional and relational issues rather than learning assessments or developmental disorders like ADD/ADHD." },
];

const blogPosts = [
  {
    slug: "master-trauma-or-die-trying",
    title: "Master Trauma, or Die Trying",
    excerpt: "If the news feels like background noise and you can't remember the last time something truly moved you, you may not be broken. You may be desensitized. Here's what that means and how to find your way back.",
    date: "March 2, 2026",
    category: "Mental Health",
    image: "https://images.squarespace-cdn.com/content/v1/67b28b6e1f96852c768d5fd2/1771904315221-1TRU8WPW6AVCLPYZOTW4/unsplash-image-1VNw8-5cs54.jpg",
  },
  {
    slug: "the-5-lies-suicide-tells-us",
    title: "The 5 Lies of Suicide",
    excerpt: "Suicide is one of the most misunderstood topics in mental health. The myths surrounding it don't just spread misinformation. They cost lives. Here are five lies suicide tells us, and the five truths that can break through them.",
    date: "February 24, 2026",
    category: "Mental Health",
    image: "https://images.squarespace-cdn.com/content/v1/67b28b6e1f96852c768d5fd2/1771902287761-KLHR5ENYZWG25WB9JNUD/unsplash-image-hluOJZjLVXc.jpg",
  },
  {
    slug: "ai-and-therapy",
    title: "AI vs Therapist!",
    excerpt: "AI can answer questions, track your mood, and be available at 3am when your therapist isn't. But can it actually help you heal? A therapist weighs in on what technology can and cannot replace in the therapy room.",
    date: "February 17, 2026",
    category: "Therapy Insights",
    image: "https://images.squarespace-cdn.com/content/v1/67b28b6e1f96852c768d5fd2/1771310087865-4QXZO9GM1Y8EASO3RBMK/unsplash-image-6UDansS-rPI.jpg",
  },
  {
    slug: "rupture-and-repair",
    title: "Rupture and Repair: How Relationships Actually Heal",
    excerpt: "No relationship is conflict-free. The couples and friendships that last aren't the ones that never fight. They're the ones that know how to find their way back to each other. Here's how rupture and repair actually works.",
    date: "February 9, 2026",
    category: "Relationships",
    image: "https://images.squarespace-cdn.com/content/v1/67b28b6e1f96852c768d5fd2/1766355365248-ZHLYJ0YHVJF1HJPOMXFK/unsplash-image-qb85Joj59lw.jpg",
  },
  {
    slug: "valentines-day-and-men",
    title: "Valentine's Day and the Emotional Expectations Men Carry",
    excerpt: "For many men, Valentine's Day isn't just about flowers and dinner. It's a minefield of unspoken expectations, self-doubt, and pressure to get it right. Here's what's really going on beneath the surface, and how to talk about it.",
    date: "February 2, 2026",
    category: "Men's Mental Health",
    image: "https://images.squarespace-cdn.com/content/v1/67b28b6e1f96852c768d5fd2/1766354837947-4XS5RWRIXZP97CJ1XJYS/unsplash-image-O8-KhBqqI4Y.jpg",
  },
  {
    slug: "rethinking-therapy-2026",
    title: "Rethinking Therapy and Mental Health in 2026",
    excerpt: "Therapy has changed. The couch, the notepad, the awkward silences? That's not what it looks like anymore. If stigma or outdated ideas have kept you from getting support, here's a clearer picture of what therapy in 2026 actually is.",
    date: "January 26, 2026",
    category: "Mental Health Education",
    image: "https://images.squarespace-cdn.com/content/v1/67b28b6e1f96852c768d5fd2/1766352334066-T1QVIJH3AB4HFOYU5Q5R/unsplash-image-F9DFuJoS9EU.jpg",
  },
  {
    slug: "beginning-again",
    title: "Beginning Again in Your Own Time",
    excerpt: "Not every new beginning announces itself. Sometimes change happens quietly, in the small decisions, the pauses, the moments when you finally stop pushing and start listening. Here's a different way to think about starting over.",
    date: "January 19, 2026",
    category: "Personal Growth",
    image: "https://images.squarespace-cdn.com/content/v1/67b28b6e1f96852c768d5fd2/1766351301449-IMHYUW94L99RR3KEVHSL/unsplash-image-G_lwAp0TF38.jpg",
  },
  {
    slug: "low-mood-depression",
    title: "Low Mood, Depression, and the Space Between",
    excerpt: "There's a space between feeling fine and being depressed, and a lot of people live there without knowing what to call it. If you've been feeling low but aren't sure it 'counts,' this post is for you.",
    date: "January 12, 2026",
    category: "Depression and Mood",
    image: "https://images.squarespace-cdn.com/content/v1/67b28b6e1f96852c768d5fd2/1766348432461-CLU9B3CYYK6LCYFWHXBK/unsplash-image-ZnLprInKM7s.jpg",
  },
  {
    slug: "dream-bigger-2026",
    title: "Dreaming Big in 2026",
    excerpt: "Most people don't lack ambition. They lack clarity. If you've been going through the motions but sensing there's something more, this post is about what it looks like to actually build the life you've been imagining.",
    date: "January 5, 2026",
    category: "Personal Growth",
    image: "https://images.squarespace-cdn.com/content/v1/67b28b6e1f96852c768d5fd2/1764700039859-HVX3VR21TGNM05TDONQ0/unsplash-image-PSnkh76C-Z8.jpg",
  },
  {
    slug: "starting-new-year-with-intention",
    title: "Beginning Again: Stepping Into a New Year With Intention",
    excerpt: "Resolutions fade. Intentions stick. The difference isn't willpower. It's how you approach change from the start. Here's how to step into the new year with more clarity and less pressure.",
    date: "December 29, 2025",
    category: "Personal Growth",
    image: "https://images.squarespace-cdn.com/content/v1/67b28b6e1f96852c768d5fd2/1764023078154-CEA4CMD323KA6YW3TZND/unsplash-image-LLcAJbEh1_Q.jpg",
  },
  {
    slug: "beginners-guide-to-ifs",
    title: "A Beginners Guide to IFS and Understanding Your Inner World",
    excerpt: "You are not one thing. Inside each of us are different parts: some protective, some wounded, some that have been running the show for years without us realizing it. Internal Family Systems is a way to finally meet them all.",
    date: "December 22, 2025",
    category: "Therapy Education",
    image: "https://images.squarespace-cdn.com/content/v1/67b28b6e1f96852c768d5fd2/1764709669342-IJL8VHRIS5OXFR3CQPMD/vadim-sherbakov-osSryggkso4-unsplash.jpg",
  },
  {
    slug: "beginners-guide-to-emdr",
    title: "A Beginners Guide to EMDR: What It Is and How It Helps",
    excerpt: "Most people have heard of EMDR but few know how it actually works. It's not hypnosis. It's not just eye movements. It's one of the most evidence-based trauma treatments available, and it might be exactly what you've been looking for.",
    date: "December 15, 2025",
    category: "Therapy Education",
    image: "https://images.squarespace-cdn.com/content/v1/67b28b6e1f96852c768d5fd2/1764529256082-6V62KAWQPNAE2Z54FA98/bennie-bates-G7Iu5NDlMVY-unsplash.jpg",
  },
  {
    slug: "holiday-stress-loneliness",
    title: "When the Holidays Don't Feel the Way They Are Supposed To",
    excerpt: "For many people the holidays aren't the most wonderful time of the year. They're the hardest. If you're feeling heavy, lonely, or emotionally overwhelmed this season, you're not alone and you don't have to push through it.",
    date: "December 1, 2025",
    category: "Seasonal Support",
    image: "https://images.squarespace-cdn.com/content/v1/67b28b6e1f96852c768d5fd2/1764018817651-U02ZML8OU74W5RX8SRF4/bryan-heng-ubrkiCBqk1g-unsplash.jpg",
  },
];

// ========================================
// UTILITIES
// ========================================

function useScrollReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return [ref, visible];
}

// ========================================
// NAVIGATION
// ========================================

function Nav({ currentPage, setCurrentPage }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const navLinks = [
    { name: "About", page: "about" },
    { name: "Services", page: "services" },
    { name: "FAQ", page: "faq" },
    { name: "Blog", page: "blog" },
    { name: "Contact", page: "contact" },
  ];

  const navigate = (page) => {
    setCurrentPage(page);
    setMenuOpen(false);
    window.scrollTo(0, 0);
  };

  // Dark background pages need solid nav background
  const darkPages = ["about", "contact"];
  const isDarkPage = darkPages.includes(currentPage) || currentPage.startsWith("blog-");
  const needsSolidBg = scrolled || isDarkPage;

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      background: needsSolidBg ? "rgba(250,247,244,0.96)" : "transparent",
      backdropFilter: needsSolidBg ? "blur(12px)" : "none",
      borderBottom: needsSolidBg ? `1px solid ${colors.ivoryDark}` : "none",
      transition: "all 0.4s ease",
      padding: "0 40px",
    }}>
      <div style={{
        maxWidth: 1200, margin: "0 auto",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        height: 72,
      }}>
        <button onClick={() => navigate("home")} style={{ 
          background: "none", border: "none", cursor: "pointer", padding: 0,
          display: "flex", alignItems: "center", gap: 12,
        }}>
          {/* Bayside Logo */}
          <img 
            src={logo} 
            alt="Bayside Wellness & Counseling"
            style={{ 
              height: 42,
              width: "auto",
              display: "block",
            }}
          />
          
          <div style={{ fontFamily: "'Cormorant Garamond', serif", color: colors.charcoal }}>
            <div style={{ fontSize: 20, fontWeight: 600, letterSpacing: "0.08em", lineHeight: 1 }}>BAYSIDE</div>
            <div style={{ fontSize: 11, fontWeight: 300, letterSpacing: "0.2em", color: colors.tealMuted }}>WELLNESS & COUNSELING</div>
          </div>
        </button>

        {/* Desktop nav */}
        <div style={{ display: "flex", alignItems: "center", gap: 40 }} className="desktop-nav">
          {navLinks.map(link => (
            <button key={link.name} onClick={() => navigate(link.page)} style={{
              background: "none", border: "none", cursor: "pointer",
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 13, fontWeight: 400,
              letterSpacing: "0.12em",
              color: currentPage === link.page ? colors.teal : colors.charcoalLight,
              textTransform: "uppercase",
              transition: "color 0.2s",
              borderBottom: currentPage === link.page ? `2px solid ${colors.teal}` : "2px solid transparent",
              paddingBottom: 4,
            }}
            onMouseEnter={e => e.target.style.color = colors.teal}
            onMouseLeave={e => e.target.style.color = currentPage === link.page ? colors.teal : colors.charcoalLight}
            >{link.name}</button>
          ))}
          <button onClick={() => navigate("contact")} style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 12, fontWeight: 500,
            letterSpacing: "0.12em",
            color: colors.white,
            textTransform: "uppercase",
            background: colors.teal,
            padding: "10px 22px",
            borderRadius: 2,
            border: "none",
            cursor: "pointer",
            transition: "background 0.2s",
          }}
          onMouseEnter={e => e.target.style.background = colors.tealLight}
          onMouseLeave={e => e.target.style.background = colors.teal}
          >Book Free Consult</button>
        </div>

        {/* Mobile menu button */}
        <button onClick={() => setMenuOpen(!menuOpen)} style={{
          display: "none", background: "none", border: "none",
          cursor: "pointer", color: colors.charcoal, fontSize: 24,
        }} className="mobile-menu-btn">☰</button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div style={{
          background: colors.ivory, borderTop: `1px solid ${colors.ivoryDark}`,
          padding: "20px 40px 30px",
        }}>
          {navLinks.map(link => (
            <button key={link.name} onClick={() => navigate(link.page)}
              style={{
                display: "block", padding: "12px 0", width: "100%",
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 14, letterSpacing: "0.1em",
                color: colors.charcoal, background: "none", border: "none",
                textAlign: "left", cursor: "pointer",
                textTransform: "uppercase",
                borderBottom: `1px solid ${colors.ivoryDark}`,
              }}>
              {link.name}
            </button>
          ))}
          <button onClick={() => navigate("contact")}
            style={{
              display: "block", padding: "12px 0", width: "100%",
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 14, letterSpacing: "0.1em",
              color: colors.charcoal, background: "none", border: "none",
              textAlign: "left", cursor: "pointer",
              textTransform: "uppercase",
            }}>
            Book Free Consult
          </button>
        </div>
      )}
    </nav>
  );
}

// ========================================
// FOOTER
// ========================================

function Footer({ setCurrentPage }) {
  const navigate = (page) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  return (
    <footer style={{
      background: "#1E2A2A",
      padding: "40px 40px 30px",
      borderTop: `1px solid ${colors.teal}22`,
    }}>
      <div style={{ maxWidth: 1400, margin: "0 auto" }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "1.5fr 2fr 1fr 1fr",
          gap: 60, marginBottom: 32,
          alignItems: "start",
        }}>
          <div>
            <button onClick={() => navigate("home")} style={{ 
              background: "none", border: "none", cursor: "pointer", padding: 0, textAlign: "left",
              display: "flex", alignItems: "center", gap: 10, marginBottom: 12,
            }}>
              <img 
                src={logo} 
                alt="Bayside Wellness & Counseling"
                style={{ 
                  height: 36,
                  width: "auto",
                  display: "block",
                  filter: "brightness(0) invert(1)",
                }}
              />
              <div>
                <div style={{ fontFamily: "'Cormorant Garamond', serif", color: colors.white, fontSize: 18, fontWeight: 600, letterSpacing: "0.08em" }}>BAYSIDE</div>
                <div style={{ fontFamily: "'DM Sans', sans-serif", color: colors.tealMuted, fontSize: 10, letterSpacing: "0.2em" }}>WELLNESS & COUNSELING</div>
              </div>
            </button>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: "#6A8080", lineHeight: 1.6, margin: "0 0 12px" }}>
              Virtual therapy for adults, teens, and families across California.
            </p>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: "#4A6060", margin: 0 }}>
              2323 Broadway, Oakland, CA 94612
            </p>
          </div>
          
          {/* Services in 2 columns */}
          <div>
            <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: colors.tealMuted, marginBottom: 16 }}>Services</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px 24px" }}>
              {services.map(s => (
                <button key={s.slug} onClick={() => navigate(`service-${s.slug}`)} style={{ 
                  background: "none", border: "none", cursor: "pointer", padding: 0,
                  fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: "#6A8080", textAlign: "left"
                }}
                onMouseEnter={e => e.target.style.color = colors.tealLight}
                onMouseLeave={e => e.target.style.color = "#6A8080"}
                >{s.name}</button>
              ))}
            </div>
          </div>
          
          <div>
            <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: colors.tealMuted, marginBottom: 16 }}>Practice</div>
            {[
              { name: "About Marcus", page: "about" },
              { name: "FAQ", page: "faq" },
              { name: "Blog", page: "blog" },
              { name: "Contact", page: "contact" },
            ].map(link => (
              <div key={link.name} style={{ marginBottom: 8 }}>
                <button onClick={() => navigate(link.page)} style={{ 
                  background: "none", border: "none", cursor: "pointer", padding: 0,
                  fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: "#6A8080", textAlign: "left"
                }}
                onMouseEnter={e => e.target.style.color = colors.tealLight}
                onMouseLeave={e => e.target.style.color = "#6A8080"}
                >{link.name}</button>
              </div>
            ))}
          </div>
          
          <div>
            <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: colors.tealMuted, marginBottom: 16 }}>Resources</div>
            <div style={{ marginBottom: 8 }}>
              <button onClick={() => navigate("crisis-resources")} style={{ 
                background: "none", border: "none", cursor: "pointer", padding: 0,
                fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: "#6A8080", textAlign: "left"
              }}
                onMouseEnter={e => e.target.style.color = colors.tealLight}
                onMouseLeave={e => e.target.style.color = "#6A8080"}
              >Crisis Resources</button>
            </div>
          </div>
        </div>
        
        <div style={{
          borderTop: `1px solid ${colors.teal}22`,
          paddingTop: 20,
          textAlign: "center",
        }}>
          <p style={{ 
            fontFamily: "'DM Sans', sans-serif", 
            fontSize: 14, 
            color: colors.charcoal, 
            margin: "0 0 12px",
            fontWeight: 500,
          }}>
            <a href="tel:415-857-5799" style={{
              color: colors.teal,
              textDecoration: "none",
            }}>415-857-5799</a>
          </p>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: "#4A6060", margin: 0 }}>
            © 2026 Bayside Wellness & Counseling · All rights reserved
          </p>
        </div>
      </div>
    </footer>
  );
}

// ========================================
// HOME PAGE
// ========================================

function HomePage({ setCurrentPage }) {
  const [ref, visible] = useScrollReveal();

  const navigate = (page) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  return (
    <>
      {/* Hero */}
      <section style={{
        minHeight: "100vh",
        background: colors.ivory,
        display: "flex", alignItems: "center",
        position: "relative", overflow: "hidden",
        paddingTop: 72,
      }}>
        {/* Background texture */}
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: `radial-gradient(circle at 70% 50%, ${colors.tealPale} 0%, transparent 60%)`,
          opacity: 0.6,
        }} />
        
        {/* Decorative circle */}
        <div style={{
          position: "absolute", right: "-10%", top: "10%",
          width: 600, height: 600,
          borderRadius: "50%",
          border: `1px solid ${colors.teal}15`,
          background: `radial-gradient(circle, ${colors.tealPale}40 0%, transparent 70%)`,
        }} />

        <div style={{ 
          maxWidth: 800, 
          margin: "0 auto", 
          padding: "0 40px",
          position: "relative", 
          zIndex: 1,
          textAlign: "center",
        }}>
          <div style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 12, fontWeight: 500,
            letterSpacing: "0.25em", textTransform: "uppercase",
            color: colors.teal, marginBottom: 24,
            display: "flex", alignItems: "center", gap: 12,
            justifyContent: "center",
          }}>
            <span style={{ width: 32, height: 1, background: colors.teal, display: "inline-block" }} />
            Oakland, CA · Telehealth Across California
          </div>

          <h1 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(48px, 6vw, 80px)",
            fontWeight: 300,
            lineHeight: 1.1,
            color: colors.charcoal,
            margin: "0 0 32px",
            letterSpacing: "-0.01em",
          }}>
            Therapy that<br />
            <em style={{ color: colors.teal, fontStyle: "italic" }}>meets you</em><br />
            where you are.
          </h1>

          <p style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 17, fontWeight: 300,
            lineHeight: 1.8, color: colors.charcoalLight,
            margin: "0 auto 48px",
            maxWidth: 600,
          }}>
            Compassionate, evidence-based therapy for adults, teens, and families navigating trauma, anxiety, depression, and life's hardest moments.
          </p>

          <div style={{ display: "flex", gap: 16, flexWrap: "wrap", justifyContent: "center" }}>
            <button onClick={() => navigate("contact")} style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 13, fontWeight: 500,
              letterSpacing: "0.12em", textTransform: "uppercase",
              color: colors.white, border: "none", cursor: "pointer",
              background: colors.teal,
              padding: "16px 40px", borderRadius: 2,
              transition: "background 0.2s",
            }}
            onMouseEnter={e => e.target.style.background = colors.tealLight}
            onMouseLeave={e => e.target.style.background = colors.teal}
            >Book Free Consultation</button>
            <button onClick={() => navigate("about")} style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 13, fontWeight: 500,
              letterSpacing: "0.12em", textTransform: "uppercase",
              color: colors.teal, background: "transparent",
              border: `1px solid ${colors.teal}`, cursor: "pointer",
              padding: "16px 40px", borderRadius: 2,
              transition: "all 0.2s",
            }}
            onMouseEnter={e => { e.target.style.background = colors.tealPale; }}
            onMouseLeave={e => { e.target.style.background = "transparent"; }}
            >Learn More</button>
          </div>
        </div>
      </section>

      {/* Quick Services Overview */}
      <section ref={ref} style={{
        background: colors.white,
        padding: "100px 40px",
        opacity: visible ? 1 : 0,
        transform: visible ? "none" : "translateY(30px)",
        transition: "all 0.8s ease",
      }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", textAlign: "center" }}>
          <div style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 12, letterSpacing: "0.25em", textTransform: "uppercase",
            color: colors.tealMuted, marginBottom: 24,
          }}>Our Approach</div>
          <h2 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(36px, 4vw, 56px)",
            fontWeight: 300, lineHeight: 1.2,
            color: colors.charcoal, margin: "0 0 24px",
          }}>
            Evidence-based therapies<br />
            <em style={{ color: colors.teal, fontStyle: "italic" }}>tailored to you.</em>
          </h2>
          <p style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 16, fontWeight: 300,
            color: colors.charcoalLight, lineHeight: 1.8,
            margin: "0 auto 60px",
            maxWidth: 600,
          }}>
            I blend EMDR, IFS, and CBT to create a personalized approach that addresses both the symptoms you're experiencing and the deeper patterns keeping you stuck.
          </p>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: 32,
          }}>
            {services.map((service, i) => (
              <button
                key={service.slug}
                onClick={() => navigate(`service-${service.slug}`)}
                style={{
                  background: colors.ivory,
                  padding: "36px 32px",
                  borderRadius: 4,
                  border: `1px solid ${colors.ivoryDark}`,
                  transition: "all 0.3s ease",
                  cursor: "pointer",
                  textAlign: "left",
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = "translateY(-4px)";
                  e.currentTarget.style.boxShadow = "0 12px 40px rgba(46,125,122,0.12)";
                  e.currentTarget.style.borderColor = colors.teal;
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = "none";
                  e.currentTarget.style.boxShadow = "none";
                  e.currentTarget.style.borderColor = colors.ivoryDark;
                }}
              >
                <div style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: 26, fontWeight: 500,
                  color: colors.charcoal,
                  marginBottom: 12,
                }}>{service.name}</div>
                <div style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 13, fontWeight: 500,
                  letterSpacing: "0.08em",
                  color: colors.teal,
                  textTransform: "uppercase",
                  marginBottom: 16,
                }}>{service.shortDesc}</div>
                <p style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 14, fontWeight: 300,
                  color: colors.charcoalLight,
                  lineHeight: 1.7,
                  margin: 0,
                }}>{service.desc}</p>
                <div style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 12, fontWeight: 500,
                  letterSpacing: "0.1em",
                  color: colors.teal,
                  textTransform: "uppercase",
                  marginTop: 20,
                }}>Learn More →</div>
              </button>
            ))}
          </div>

          <div style={{ marginTop: 60 }}>
            <button onClick={() => navigate("services")} style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 13, fontWeight: 500,
              letterSpacing: "0.12em", textTransform: "uppercase",
              color: colors.teal, background: "transparent",
              border: `1px solid ${colors.teal}`, cursor: "pointer",
              padding: "14px 32px", borderRadius: 2,
              transition: "all 0.2s",
            }}
            onMouseEnter={e => { e.target.style.background = colors.tealPale; }}
            onMouseLeave={e => { e.target.style.background = "transparent"; }}
            >View All Services</button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={{
        background: colors.charcoal,
        padding: "100px 40px",
      }}>
        <div style={{ maxWidth: 800, margin: "0 auto", textAlign: "center" }}>
          <h2 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(40px, 5vw, 64px)",
            fontWeight: 300, lineHeight: 1.15,
            color: colors.white, margin: "0 0 24px",
          }}>
            Ready to take<br />
            <em style={{ color: colors.tealLight }}>the first step?</em>
          </h2>
          <p style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 16, fontWeight: 300,
            color: "#A8B8B8", lineHeight: 1.8,
            margin: "0 0 40px", maxWidth: 520, marginLeft: "auto", marginRight: "auto",
          }}>
            Schedule a free 15-minute consultation. No commitment, no pressure. Just a conversation about where you are and where you'd like to go.
          </p>
          
          {/* Jane App booking embed */}
          <div style={{
            background: "rgba(255,255,255,0.05)",
            border: `1px solid ${colors.teal}44`,
            borderRadius: 4, padding: "40px",
            marginBottom: 24,
            display: "inline-block",
          }}>
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
              <iframe 
                frameBorder='0' 
                height='28' 
                scrolling='no' 
                src='https://baysidewellnessandcounseling.janeapp.com/embed/book_online/1' 
                width='177'
                style={{ border: "none" }}
              ></iframe>
            </div>
          </div>
          
          <div>
            <button onClick={() => navigate("contact")} style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 12, fontWeight: 400,
              letterSpacing: "0.08em",
              color: colors.tealLight, border: "none", cursor: "pointer",
              background: "transparent",
              textDecoration: "underline",
              transition: "color 0.2s",
            }}
            onMouseEnter={e => e.target.style.color = colors.white}
            onMouseLeave={e => e.target.style.color = colors.tealLight}
            >Or visit our contact page →</button>
          </div>
        </div>
      </section>
    </>
  );
}

// ========================================
// ABOUT PAGE
// ========================================

function AboutPage({ setCurrentPage }) {
  const [ref, visible] = useScrollReveal();

  return (
    <section ref={ref} style={{
      background: colors.charcoal,
      padding: "160px 40px 120px",
      minHeight: "100vh",
      opacity: visible ? 1 : 0,
      transform: visible ? "none" : "translateY(30px)",
      transition: "all 0.8s ease",
    }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }}>
        <div>
          <div style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 12, fontWeight: 500,
            letterSpacing: "0.25em", textTransform: "uppercase",
            color: colors.tealMuted, marginBottom: 24,
            display: "flex", alignItems: "center", gap: 12,
          }}>
            <span style={{ width: 32, height: 1, background: colors.tealMuted, display: "inline-block" }} />
            About & Team
          </div>
          <h2 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(36px, 4vw, 56px)",
            fontWeight: 300, lineHeight: 1.15,
            color: colors.white, margin: "0 0 32px",
          }}>
            Healing happens<br />
            <em style={{ color: colors.tealLight, fontStyle: "italic" }}>on multiple levels.</em>
          </h2>
          <p style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 16, fontWeight: 300,
            lineHeight: 1.9, color: "#A8B8B8",
            margin: "0 0 24px",
          }}>
            I'm Marcus Ghiasi, a Licensed Marriage and Family Therapist, founder of Bayside Wellness & Counseling, and a Bay Area native. As a second-generation Persian American, I value curiosity, creativity, and connection as tools for healing.
          </p>
          <p style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 16, fontWeight: 300,
            lineHeight: 1.9, color: "#A8B8B8",
            margin: "0 0 24px",
          }}>
            I tailor my approach based on what you're dealing with, drawing from EMDR, IFS, CBT, and psychodynamic work. Whether it's trauma, anxiety, relationship patterns, or anger that's hurting your life, the goal is the same: understand what's keeping you stuck and build changes that actually last.
          </p>
          <p style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 16, fontWeight: 300,
            lineHeight: 1.9, color: "#A8B8B8",
            margin: "0 0 40px",
          }}>
            Therapy works when you're honest about what's going on and willing to do something different. My job is to help you see what you can't see on your own and give you tools to move forward.
          </p>

          {/* Who I work with */}
          <div style={{ marginBottom: 40 }}>
            <div style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase",
              color: colors.tealMuted, marginBottom: 16,
            }}>I work with</div>
            {[
              "Men working on anger, relationships, and emotional expression",
              "Individuals struggling with relationship patterns or conflicts (individual sessions)",
              "Parents and teens improving communication and family dynamics",
              "Adults dealing with trauma, anxiety, or depression",
              "People struggling with self-criticism, perfectionism, or feeling stuck",
              "First-time therapy clients who are curious but unsure where to start",
            ].map((item, i) => (
              <div key={i} style={{
                display: "flex", gap: 12, alignItems: "flex-start",
                marginBottom: 10,
              }}>
                <span style={{ color: colors.teal, marginTop: 4, flexShrink: 0 }}>—</span>
                <span style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 14, fontWeight: 300,
                  color: "#A8B8B8", lineHeight: 1.7,
                }}>{item}</span>
              </div>
            ))}
          </div>

          {/* Affirming statement */}
          <div style={{
            background: "rgba(61, 158, 154, 0.08)",
            border: `1px solid ${colors.teal}33`,
            borderRadius: 2,
            padding: "20px 24px",
            marginBottom: 32,
          }}>
            <p style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 14, fontWeight: 400,
              color: colors.tealLight,
              lineHeight: 1.7,
              margin: 0,
              letterSpacing: "0.02em",
            }}>
              Bayside Wellness & Counseling is LGBTQ+ and BIPOC affirming. All identities, experiences, and backgrounds are welcomed here.
            </p>
          </div>

          <button onClick={() => setCurrentPage("contact")} style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 13, fontWeight: 500,
            letterSpacing: "0.12em", textTransform: "uppercase",
            color: colors.white, background: "transparent",
            border: `1px solid ${colors.teal}`, cursor: "pointer",
            padding: "14px 32px", borderRadius: 2,
            transition: "all 0.2s",
          }}
          onMouseEnter={e => { e.target.style.background = colors.teal; }}
          onMouseLeave={e => { e.target.style.background = "transparent"; }}
          >Work With Marcus</button>
          <div style={{ marginTop: 20 }}>
            <a href="https://www.marcusghiasitherapy.com" target="_blank" rel="noopener noreferrer" style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 13, fontWeight: 300,
              color: colors.tealMuted, textDecoration: "none",
              letterSpacing: "0.05em",
              borderBottom: `1px solid ${colors.tealMuted}44`,
              paddingBottom: 2,
              transition: "color 0.2s",
            }}
            onMouseEnter={e => e.target.style.color = colors.tealLight}
            onMouseLeave={e => e.target.style.color = colors.tealMuted}
            >Visit marcusghiasitherapy.com →</a>
          </div>
        </div>
        <div style={{ position: "relative" }}>
          <div style={{
            width: "100%", aspectRatio: "3/4",
            background: colors.tealPale,
            borderRadius: "80px 2px 80px 2px",
            overflow: "hidden",
          }}>
            <img
              src="https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=800&q=80"
              alt="Marcus Ghiasi, LMFT"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>
        </div>
      </div>
    </section>

    {/* Book Online Section */}
    <section style={{
      background: colors.ivory,
      padding: "100px 40px",
    }}>
      <div style={{ maxWidth: 600, margin: "0 auto", textAlign: "center" }}>
        <div style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: 12, letterSpacing: "0.25em", textTransform: "uppercase",
          color: colors.tealMuted, marginBottom: 24,
        }}>Start Today</div>
        
        <h2 style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: "clamp(36px, 4vw, 52px)",
          fontWeight: 300, lineHeight: 1.2,
          color: colors.charcoal, margin: "0 0 24px",
        }}>
          Ready to take<br />
          <em style={{ color: colors.teal, fontStyle: "italic" }}>the first step?</em>
        </h2>
        
        <p style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: 16, fontWeight: 300,
          color: colors.charcoalLight, lineHeight: 1.8,
          margin: "0 auto 48px",
          maxWidth: 520,
        }}>
          Schedule a free 15-minute consultation to see if we're a good fit. No commitment, no pressure.
        </p>

        <div style={{ 
          background: colors.white,
          border: `1px solid ${colors.teal}33`,
          borderRadius: 4, 
          padding: "48px 40px",
          textAlign: "center",
        }}>
          <div style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 13,
            color: colors.tealMuted,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            marginBottom: 20,
          }}>
            View Available Times
          </div>
          <a
            href="https://baysidewellnessandcounseling.janeapp.com/#/staff_member/1/treatment/1"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-block",
              padding: "16px 40px",
              background: colors.teal,
              color: colors.white,
              textDecoration: "none",
              borderRadius: 2,
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 14,
              fontWeight: 500,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => { e.target.style.background = colors.tealLight; }}
            onMouseLeave={(e) => { e.target.style.background = colors.teal; }}
          >
            See Available Times →
          </a>
          <p style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 12,
            color: "#8A9898",
            marginTop: 20,
            lineHeight: 1.6,
          }}>
            Opens in new tab • Real-time availability
          </p>
        </div>
      </div>
    </section>
    </>
  );
}

// ========================================
// SERVICES HUB PAGE
// ========================================

function ServicesPage({ setCurrentPage }) {
  const [ref, visible] = useScrollReveal();

  const navigate = (page) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  return (
    <>
      <section style={{
        background: colors.ivory,
        padding: "160px 40px 80px",
        minHeight: "60vh",
        display: "flex",
        alignItems: "center",
      }}>
        <div style={{ maxWidth: 900, margin: "0 auto", textAlign: "center" }}>
          <div style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 12, letterSpacing: "0.25em", textTransform: "uppercase",
            color: colors.tealMuted, marginBottom: 24,
          }}>Our Services</div>
          <h1 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(48px, 6vw, 72px)",
            fontWeight: 300, lineHeight: 1.1,
            color: colors.charcoal, margin: "0 0 32px",
          }}>
            Evidence-based therapy<br />
            <em style={{ color: colors.teal, fontStyle: "italic" }}>that works.</em>
          </h1>
          <p style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 17, fontWeight: 300,
            color: colors.charcoalLight, lineHeight: 1.8,
            margin: "0 auto",
            maxWidth: 640,
          }}>
            Every person is different. That's why I offer multiple therapeutic approaches and create a personalized plan based on your unique needs, goals, and what you're experiencing.
          </p>
        </div>
      </section>

      <section ref={ref} style={{
        background: colors.white,
        padding: "80px 40px 120px",
        opacity: visible ? 1 : 0,
        transform: visible ? "none" : "translateY(30px)",
        transition: "all 0.8s ease",
      }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))",
            gap: 40,
          }}>
            {services.map((service, i) => (
              <button
                key={service.slug}
                onClick={() => navigate(`service-${service.slug}`)}
                style={{
                  background: colors.ivory,
                  padding: "40px 36px",
                  borderRadius: 4,
                  border: `1px solid ${colors.ivoryDark}`,
                  transition: "all 0.3s ease",
                  cursor: "pointer",
                  textAlign: "left",
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = "translateY(-8px)";
                  e.currentTarget.style.boxShadow = "0 16px 48px rgba(46,125,122,0.15)";
                  e.currentTarget.style.borderColor = colors.teal;
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = "none";
                  e.currentTarget.style.boxShadow = "none";
                  e.currentTarget.style.borderColor = colors.ivoryDark;
                }}
              >
                <div style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: 32, fontWeight: 500,
                  color: colors.charcoal,
                  marginBottom: 12,
                  lineHeight: 1.2,
                }}>{service.name}</div>
                <div style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 13, fontWeight: 500,
                  letterSpacing: "0.08em",
                  color: colors.teal,
                  textTransform: "uppercase",
                  marginBottom: 20,
                }}>{service.shortDesc}</div>
                <p style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 15, fontWeight: 300,
                  color: colors.charcoalLight,
                  lineHeight: 1.8,
                  margin: "0 0 24px",
                }}>{service.desc}</p>
                <div style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 13, fontWeight: 500,
                  letterSpacing: "0.1em",
                  color: colors.teal,
                  textTransform: "uppercase",
                }}>Learn More →</div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{
        background: colors.charcoal,
        padding: "100px 40px",
      }}>
        <div style={{ maxWidth: 800, margin: "0 auto", textAlign: "center" }}>
          <h2 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(36px, 4vw, 56px)",
            fontWeight: 300, lineHeight: 1.15,
            color: colors.white, margin: "0 0 24px",
          }}>
            Not sure which approach<br />
            <em style={{ color: colors.tealLight }}>is right for you?</em>
          </h2>
          <p style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 16, fontWeight: 300,
            color: "#A8B8B8", lineHeight: 1.8,
            margin: "0 0 40px", maxWidth: 560, marginLeft: "auto", marginRight: "auto",
          }}>
            You don't need to figure it out alone. During your free consultation, we'll discuss what you're experiencing and recommend the best path forward.
          </p>
          <button onClick={() => navigate("contact")} style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 13, fontWeight: 500,
            letterSpacing: "0.12em", textTransform: "uppercase",
            color: colors.white, border: "none", cursor: "pointer",
            background: colors.teal,
            padding: "16px 40px", borderRadius: 2,
            transition: "background 0.2s",
          }}
          onMouseEnter={e => e.target.style.background = colors.tealLight}
          onMouseLeave={e => e.target.style.background = colors.teal}
          >Schedule Free Consultation</button>
        </div>
      </section>
    </>
  );
}

// ========================================
// SERVICE DETAIL PAGE
// ========================================

function ServiceDetailPage({ slug, setCurrentPage }) {
  const [ref, visible] = useScrollReveal();
  const service = services.find(s => s.slug === slug);
  const details = serviceDetails[slug];

  if (!service) return <div>Service not found</div>;

  return (
    <>
      <section style={{
        background: colors.ivory,
        padding: "160px 40px 80px",
        minHeight: "60vh",
        display: "flex",
        alignItems: "center",
      }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <button onClick={() => setCurrentPage("services")} style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 12, letterSpacing: "0.1em", textTransform: "uppercase",
            color: colors.tealMuted, background: "none", border: "none",
            cursor: "pointer", padding: 0,
            display: "inline-flex", alignItems: "center", gap: 8,
            marginBottom: 32,
          }}>
            ← Back to Services
          </button>
          <div style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 12, letterSpacing: "0.25em", textTransform: "uppercase",
            color: colors.teal, marginBottom: 24,
            fontWeight: 500,
          }}>{service.shortDesc}</div>
          <h1 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(48px, 6vw, 72px)",
            fontWeight: 300, lineHeight: 1.1,
            color: colors.charcoal, margin: "0 0 32px",
          }}>{service.name}</h1>
          <p style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 19, fontWeight: 300,
            color: colors.charcoalLight, lineHeight: 1.8,
            margin: 0,
            maxWidth: 740,
          }}>{service.desc}</p>
        </div>
      </section>

      <section ref={ref} style={{
        background: colors.white,
        padding: "100px 40px",
        opacity: visible ? 1 : 0,
        transform: visible ? "none" : "translateY(30px)",
        transition: "all 0.8s ease",
      }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <h2 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(32px, 4vw, 48px)",
            fontWeight: 400,
            color: colors.charcoal,
            margin: "0 0 40px",
          }}>What to Expect</h2>
          
          <div style={{ marginBottom: 48 }}>
            <h3 style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 18, fontWeight: 500,
              color: colors.charcoal,
              margin: "0 0 16px",
              letterSpacing: "0.02em",
            }}>How It Works</h3>
            <p style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 16, fontWeight: 300,
              color: colors.charcoalLight,
              lineHeight: 1.8,
              margin: 0,
            }}>
              {details.howItWorks}
            </p>
          </div>

          <div style={{ marginBottom: 48 }}>
            <h3 style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 18, fontWeight: 500,
              color: colors.charcoal,
              margin: "0 0 16px",
              letterSpacing: "0.02em",
            }}>Who This Helps</h3>
            <p style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 16, fontWeight: 300,
              color: colors.charcoalLight,
              lineHeight: 1.8,
              margin: 0,
            }}>
              {details.whoThisHelps}
            </p>
          </div>

          <div style={{
            background: colors.tealPale,
            padding: "40px",
            borderRadius: 4,
            border: `1px solid ${colors.teal}30`,
          }}>
            <h3 style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 28, fontWeight: 500,
              color: colors.charcoal,
              margin: "0 0 16px",
            }}>{details.ctaHeading}</h3>
            <p style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 15, fontWeight: 300,
              color: colors.charcoalLight,
              lineHeight: 1.7,
              margin: "0 0 28px",
            }}>
              {details.ctaText}
            </p>
            <button onClick={() => setCurrentPage("contact")} style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 13, fontWeight: 500,
              letterSpacing: "0.12em", textTransform: "uppercase",
              color: colors.white, border: "none", cursor: "pointer",
              background: colors.teal,
              padding: "14px 32px", borderRadius: 2,
              transition: "background 0.2s",
            }}
            onMouseEnter={e => e.target.style.background = colors.tealLight}
            onMouseLeave={e => e.target.style.background = colors.teal}
            >Book Free Consultation</button>
          </div>
        </div>
      </section>
    </>
  );
}

// ========================================
// FAQ PAGE
// ========================================

function FAQPage({ setCurrentPage }) {
  const [ref, visible] = useScrollReveal();
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <>
      <section style={{
        background: colors.ivory,
        padding: "160px 40px 80px",
        minHeight: "50vh",
        display: "flex",
        alignItems: "center",
      }}>
        <div style={{ maxWidth: 900, margin: "0 auto", textAlign: "center" }}>
          <div style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 12, letterSpacing: "0.25em", textTransform: "uppercase",
            color: colors.tealMuted, marginBottom: 24,
          }}>Common Questions</div>
          <h1 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(48px, 6vw, 72px)",
            fontWeight: 300, lineHeight: 1.1,
            color: colors.charcoal, margin: "0 0 32px",
          }}>
            Frequently Asked<br />
            <em style={{ color: colors.teal, fontStyle: "italic" }}>Questions</em>
          </h1>
        </div>
      </section>

      <section ref={ref} style={{
        background: colors.white,
        padding: "60px 40px 120px",
        opacity: visible ? 1 : 0,
        transform: visible ? "none" : "translateY(30px)",
        transition: "all 0.8s ease",
      }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          {faqs.map((faq, i) => (
            <div key={i} style={{
              borderBottom: `1px solid ${colors.ivoryDark}`,
              paddingBottom: 32, marginBottom: 32,
            }}>
              <button
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
                  color: colors.charcoal,
                  margin: 0,
                  flex: 1,
                }}>{faq.q}</h3>
                <span style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 24,
                  color: colors.teal,
                  marginLeft: 16,
                  transition: "transform 0.3s",
                  transform: openIndex === i ? "rotate(45deg)" : "none",
                }}>+</span>
              </button>
              {openIndex === i && (
                <p style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 15, fontWeight: 300,
                  color: colors.charcoalLight, lineHeight: 1.8,
                  margin: 0,
                }}>{faq.a}</p>
              )}
            </div>
          ))}

          <div style={{
            background: colors.ivory,
            padding: "40px",
            borderRadius: 4,
            marginTop: 60,
            textAlign: "center",
          }}>
            <h3 style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 28, fontWeight: 500,
              color: colors.charcoal,
              margin: "0 0 16px",
            }}>Have more questions?</h3>
            <p style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 15, fontWeight: 300,
              color: colors.charcoalLight,
              lineHeight: 1.7,
              margin: "0 0 28px",
            }}>
              Let's talk. Schedule a free 15-minute consultation and we can discuss anything else on your mind.
            </p>
            <button onClick={() => setCurrentPage("contact")} style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 13, fontWeight: 500,
              letterSpacing: "0.12em", textTransform: "uppercase",
              color: colors.white, border: "none", cursor: "pointer",
              background: colors.teal,
              padding: "14px 32px", borderRadius: 2,
              transition: "background 0.2s",
            }}
            onMouseEnter={e => e.target.style.background = colors.tealLight}
            onMouseLeave={e => e.target.style.background = colors.teal}
            >Schedule Consultation</button>
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
  const [ref, visible] = useScrollReveal();
  const [formSubmitted, setFormSubmitted] = useState(false);

  // For Formspree, we'll use traditional form submission
  // The success message will be handled by checking the URL
  useEffect(() => {
    // Check if we're returning from a successful Formspree submission
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('success') === 'true') {
      setFormSubmitted(true);
      setTimeout(() => setFormSubmitted(false), 5000);
      // Clean up URL
      window.history.replaceState({}, '', window.location.pathname);
    }
  }, []);

  return (
    <section ref={ref} style={{
      background: colors.charcoal,
      padding: "160px 40px 120px",
      minHeight: "100vh",
      opacity: visible ? 1 : 0,
      transform: visible ? "none" : "translateY(30px)",
      transition: "all 0.8s ease",
    }}>
      <div style={{ maxWidth: 1000, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 60 }}>
          <div style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 12, letterSpacing: "0.25em", textTransform: "uppercase",
            color: colors.tealMuted, marginBottom: 24,
          }}>Get Started</div>
          <h2 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(40px, 5vw, 64px)",
            fontWeight: 300, lineHeight: 1.15,
            color: colors.white, margin: "0 0 24px",
          }}>
            Ready to take<br />
            <em style={{ color: colors.tealLight }}>the first step?</em>
          </h2>
          <p style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 16, fontWeight: 300,
            color: "#A8B8B8", lineHeight: 1.8,
            margin: "0 auto", maxWidth: 520,
          }}>
            Schedule a free 15-minute consultation or send us a message. No commitment, no pressure.
          </p>
        </div>

        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 40,
          marginBottom: 40,
        }}>
          {/* Jane App Booking */}
          <div style={{
            background: "rgba(255,255,255,0.05)",
            border: `1px solid ${colors.teal}44`,
            borderRadius: 4, 
            padding: "40px",
          }}>
            <h3 style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 28, fontWeight: 500,
              color: colors.white,
              margin: "0 0 16px",
            }}>Book Online</h3>
            <p style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 14, fontWeight: 300,
              color: "#A8B8B8",
              lineHeight: 1.7,
              margin: "0 0 32px",
            }}>
              Schedule your free 15-minute consultation directly through our calendar.
            </p>
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: 120 }}>
              <iframe 
                frameBorder='0' 
                height='28' 
                scrolling='no' 
                src='https://baysidewellnessandcounseling.janeapp.com/embed/book_online/1' 
                width='177'
                style={{ border: "none" }}
              ></iframe>
            </div>
            <p style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 12,
              color: colors.tealMuted,
              marginTop: 24,
              textAlign: "center",
            }}>Powered by Jane App</p>
          </div>

          {/* Contact Form */}
          <div style={{
            background: "rgba(255,255,255,0.05)",
            border: `1px solid ${colors.teal}44`,
            borderRadius: 4, 
            padding: "40px",
          }}>
            <h3 style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 28, fontWeight: 500,
              color: colors.white,
              margin: "0 0 16px",
            }}>Send a Message</h3>
            <p style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 14, fontWeight: 300,
              color: "#A8B8B8",
              lineHeight: 1.7,
              margin: "0 0 32px",
            }}>
              Have questions? Reach out and we'll get back to you within 1-2 business days.
            </p>

            {formSubmitted ? (
              <div style={{
                background: colors.tealPale,
                border: `1px solid ${colors.teal}`,
                borderRadius: 4,
                padding: "20px",
                textAlign: "center",
              }}>
                <p style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 15,
                  color: colors.teal,
                  margin: 0,
                }}>✓ Message sent! We'll be in touch soon.</p>
              </div>
            ) : (
              <form 
                action="https://formspree.io/f/mykngokr" 
                method="POST"
              >
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name *"
                  required
                  style={{
                    width: "100%",
                    padding: "12px 16px",
                    marginBottom: 16,
                    background: "rgba(255,255,255,0.08)",
                    border: `1px solid ${colors.teal}33`,
                    borderRadius: 2,
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: 14,
                    color: colors.white,
                  }}
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email *"
                  required
                  style={{
                    width: "100%",
                    padding: "12px 16px",
                    marginBottom: 16,
                    background: "rgba(255,255,255,0.08)",
                    border: `1px solid ${colors.teal}33`,
                    borderRadius: 2,
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: 14,
                    color: colors.white,
                  }}
                />
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone (optional)"
                  style={{
                    width: "100%",
                    padding: "12px 16px",
                    marginBottom: 16,
                    background: "rgba(255,255,255,0.08)",
                    border: `1px solid ${colors.teal}33`,
                    borderRadius: 2,
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: 14,
                    color: colors.white,
                  }}
                />
                <textarea
                  name="message"
                  placeholder="Your Message *"
                  required
                  rows="4"
                  style={{
                    width: "100%",
                    padding: "12px 16px",
                    marginBottom: 20,
                    background: "rgba(255,255,255,0.08)",
                    border: `1px solid ${colors.teal}33`,
                    borderRadius: 2,
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: 14,
                    color: colors.white,
                    resize: "vertical",
                  }}
                />
                <button
                  type="submit"
                  style={{
                    width: "100%",
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: 13, fontWeight: 500,
                    letterSpacing: "0.12em", textTransform: "uppercase",
                    color: colors.white,
                    background: colors.teal,
                    border: "none",
                    padding: "14px 32px",
                    borderRadius: 2,
                    cursor: "pointer",
                    transition: "background 0.2s",
                  }}
                  onMouseEnter={e => e.target.style.background = colors.tealLight}
                  onMouseLeave={e => e.target.style.background = colors.teal}
                >
                  Send Message
                </button>
              </form>
            )}
          </div>
        </div>

        <p style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: 13, color: colors.tealMuted,
          textAlign: "center",
        }}>
          Or email us directly at{" "}
          <a href="mailto:info@baysidewellnessandcounseling.com" style={{ color: colors.tealLight }}>
            info@baysidewellnessandcounseling.com
          </a>
        </p>
      </div>
    </section>
  );
}

// ========================================
// BLOG PAGE
// ========================================

function BlogPage({ setCurrentPage }) {
  return (
    <>
      <section style={{
        background: colors.ivory,
        padding: "160px 40px 80px",
        minHeight: "50vh",
        display: "flex",
        alignItems: "center",
      }}>
        <div style={{ maxWidth: 900, margin: "0 auto", textAlign: "center" }}>
          <div style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 12, letterSpacing: "0.25em", textTransform: "uppercase",
            color: colors.tealMuted, marginBottom: 24,
          }}>Insights & Resources</div>
          <h1 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(48px, 6vw, 72px)",
            fontWeight: 300, lineHeight: 1.1,
            color: colors.charcoal, margin: "0 0 32px",
          }}>
            The Bayside<br />
            <em style={{ color: colors.teal, fontStyle: "italic" }}>Blog</em>
          </h1>
          <p style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 17, fontWeight: 300,
            color: colors.charcoalLight, lineHeight: 1.8,
            margin: "0 auto",
            maxWidth: 640,
          }}>
            Practical insights on therapy, mental health, and personal growth.
          </p>
        </div>
      </section>

      <section style={{
        background: colors.white,
        padding: "80px 40px 120px",
      }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          {blogPosts.map((post, i) => (
            <button
              key={post.slug}
              onClick={() => setCurrentPage(`blog-${post.slug}`)}
              style={{
                width: "100%",
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: "40px 0",
                borderBottom: `1px solid ${colors.ivoryDark}`,
                textAlign: "left",
                display: "grid",
                gridTemplateColumns: "240px 1fr",
                gap: 32,
                alignItems: "center",
              }}
            >
              {/* Image thumbnail */}
              <div style={{
                width: "100%",
                aspectRatio: "16/10",
                borderRadius: 4,
                overflow: "hidden",
                background: colors.ivoryDark,
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
                  color: colors.teal, marginBottom: 12,
                  fontWeight: 500,
                }}>{post.category}</div>
                <h2 style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: 32, fontWeight: 500,
                  color: colors.charcoal,
                  margin: "0 0 12px",
                  transition: "color 0.2s",
                }}
                onMouseEnter={e => e.target.style.color = colors.teal}
                onMouseLeave={e => e.target.style.color = colors.charcoal}
                >{post.title}</h2>
                <p style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 15, fontWeight: 300,
                  color: colors.charcoalLight,
                  lineHeight: 1.7,
                  margin: "0 0 12px",
                }}>{post.excerpt}</p>
                <div style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 13,
                  color: colors.warmGray,
                }}>{post.date}</div>
              </div>
            </button>
          ))}
        </div>
      </section>
    </>
  );
}

// ========================================
// BLOG POST PAGE
// ========================================

function BlogPostPage({ slug, setCurrentPage }) {
  const [ref, visible] = useScrollReveal();
  const post = blogPosts.find(p => p.slug === slug);

  if (!post) return <div>Post not found</div>;

  return (
    <>
      <section style={{
        background: colors.ivory,
        padding: "160px 40px 60px",
      }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <button onClick={() => setCurrentPage("blog")} style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 12, letterSpacing: "0.1em", textTransform: "uppercase",
            color: colors.tealMuted, background: "none", border: "none",
            cursor: "pointer", padding: 0,
            display: "inline-flex", alignItems: "center", gap: 8,
            marginBottom: 32,
          }}>
            ← Back to Blog
          </button>
          <div style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase",
            color: colors.teal, marginBottom: 24,
            fontWeight: 500,
          }}>{post.category} · {post.date}</div>
          <h1 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(40px, 5vw, 56px)",
            fontWeight: 400, lineHeight: 1.2,
            color: colors.charcoal, margin: "0",
          }}>{post.title}</h1>
        </div>
      </section>

      {/* Hero Image */}
      <section style={{
        background: colors.white,
        padding: "0 40px 60px",
      }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <div style={{
            width: "100%",
            aspectRatio: "16/9",
            borderRadius: 4,
            overflow: "hidden",
            background: colors.ivoryDark,
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
        background: colors.white,
        padding: "0 40px 120px",
        opacity: visible ? 1 : 0,
        transform: visible ? "none" : "translateY(30px)",
        transition: "all 0.8s ease",
      }}>
        <div style={{ maxWidth: 700, margin: "0 auto" }}>
          <div style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 17, fontWeight: 300,
            color: colors.charcoalLight,
            lineHeight: 1.9,
          }}>
            {post.content ? (
              // Display full blog content if available
              <div style={{ whiteSpace: "pre-wrap" }}>{post.content}</div>
            ) : (
              // Placeholder if content not yet added
              <>
                <p style={{ margin: "0 0 24px" }}>
                  {post.excerpt}
                </p>
                <p style={{ margin: "0 0 24px", fontStyle: "italic", color: colors.warmGray }}>
                  Full blog post content will be added here. For now, check out the original post on your current site.
                </p>
              </>
            )}
          </div>

          <div style={{
            background: colors.ivory,
            padding: "40px",
            borderRadius: 4,
            marginTop: 80,
            textAlign: "center",
          }}>
            <h3 style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 28, fontWeight: 500,
              color: colors.charcoal,
              margin: "0 0 16px",
            }}>Want to learn more?</h3>
            <p style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 15, fontWeight: 300,
              color: colors.charcoalLight,
              lineHeight: 1.7,
              margin: "0 0 28px",
            }}>
              Schedule a free consultation to discuss how therapy can help you.
            </p>
            <button onClick={() => setCurrentPage("contact")} style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 13, fontWeight: 500,
              letterSpacing: "0.12em", textTransform: "uppercase",
              color: colors.white, border: "none", cursor: "pointer",
              background: colors.teal,
              padding: "14px 32px", borderRadius: 2,
              transition: "background 0.2s",
            }}
            onMouseEnter={e => e.target.style.background = colors.tealLight}
            onMouseLeave={e => e.target.style.background = colors.teal}
            >Get Started</button>
          </div>
        </div>
      </section>
    </>
  );
}

// ========================================
// SEO LANDING PAGE
// ========================================

function SEOLandingPage({ slug, setCurrentPage }) {
  const [ref, visible] = useScrollReveal();
  const pageData = seoPages[slug];

  if (!pageData) return <div>Page not found</div>;

  const navigate = (page) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  return (
    <>
      {/* Hero Section */}
      <section style={{
        background: colors.ivory,
        padding: "160px 40px 80px",
        minHeight: "60vh",
        display: "flex",
        alignItems: "center",
      }}>
        <div style={{ maxWidth: 900, margin: "0 auto", textAlign: "center" }}>
          <div style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 12, letterSpacing: "0.25em", textTransform: "uppercase",
            color: colors.tealMuted, marginBottom: 24,
          }}>{pageData.city}, {pageData.state}</div>
          <h1 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(48px, 6vw, 72px)",
            fontWeight: 300, lineHeight: 1.1,
            color: colors.charcoal, margin: "0 0 32px",
          }}>{pageData.h1}</h1>
          <p style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 19, fontWeight: 300,
            color: colors.charcoalLight, lineHeight: 1.8,
            margin: "0 auto 40px",
            maxWidth: 700,
          }}>{pageData.intro}</p>
          <button onClick={() => navigate("contact")} style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 13, fontWeight: 500,
            letterSpacing: "0.12em", textTransform: "uppercase",
            color: colors.white, border: "none", cursor: "pointer",
            background: colors.teal,
            padding: "16px 40px", borderRadius: 2,
            transition: "background 0.2s",
          }}
          onMouseEnter={e => e.target.style.background = colors.tealLight}
          onMouseLeave={e => e.target.style.background = colors.teal}
          >Book Free Consultation</button>
        </div>
      </section>

      {/* Local Content */}
      <section ref={ref} style={{
        background: colors.white,
        padding: "100px 40px",
        opacity: visible ? 1 : 0,
        transform: visible ? "none" : "translateY(30px)",
        transition: "all 0.8s ease",
      }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <p style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 17, fontWeight: 300,
            color: colors.charcoalLight,
            lineHeight: 1.9,
            margin: "0 0 60px",
            textAlign: "center",
            maxWidth: 700,
            marginLeft: "auto",
            marginRight: "auto",
          }}>{pageData.localContent}</p>

          {/* Why Choose Us */}
          <h2 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(36px, 4vw, 48px)",
            fontWeight: 400,
            color: colors.charcoal,
            margin: "0 0 40px",
            textAlign: "center",
          }}>Why Choose Bayside Wellness</h2>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: 32,
            marginBottom: 60,
          }}>
            {pageData.whyChoose.map((item, i) => (
              <div key={i} style={{
                background: colors.ivory,
                padding: "32px 28px",
                borderRadius: 4,
                border: `1px solid ${colors.ivoryDark}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                minHeight: 120,
              }}>
                <p style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 15, fontWeight: 400,
                  color: colors.charcoal,
                  lineHeight: 1.7,
                  margin: 0,
                  textAlign: "center",
                }}>{item}</p>
              </div>
            ))}
          </div>

          {/* What to Expect Section */}
          <div style={{ marginBottom: 80 }}>
            <h2 style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(36px, 4vw, 48px)",
              fontWeight: 400,
              color: colors.charcoal,
              margin: "0 0 24px",
              textAlign: "center",
            }}>What to Expect in Therapy</h2>
            <div style={{
              maxWidth: 700,
              margin: "0 auto",
            }}>
              <p style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 16, fontWeight: 300,
                color: colors.charcoalLight,
                lineHeight: 1.9,
                margin: "0 0 20px",
              }}>
                Starting therapy can feel uncertain. Here's what the process actually looks like: We'll begin with a free 15-minute consultation to discuss what brings you to therapy and whether we're a good fit. No commitment, no pressure.
              </p>
              <p style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 16, fontWeight: 300,
                color: colors.charcoalLight,
                lineHeight: 1.9,
                margin: "0 0 20px",
              }}>
                If you decide to move forward, we'll schedule your first full session. In that first meeting, we'll dive deeper into what you're experiencing, your goals for therapy, and which approach might work best. Some people know exactly what they want to work on; others just know something needs to change. Both are fine.
              </p>
              <p style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 16, fontWeight: 300,
                color: colors.charcoalLight,
                lineHeight: 1.9,
                margin: 0,
              }}>
                Sessions are 45 or 60 minutes and can be scheduled weekly or biweekly, depending on what works for you. All sessions are virtual via secure telehealth, so you can meet from wherever you're comfortable. The length of therapy varies—some people come for a few months to work through a specific issue, while others find ongoing support helpful.
              </p>
            </div>
          </div>

          {/* FAQ Section */}
          <div style={{ marginBottom: 80 }}>
            <h2 style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(36px, 4vw, 48px)",
              fontWeight: 400,
              color: colors.charcoal,
              margin: "0 0 40px",
              textAlign: "center",
            }}>Frequently Asked Questions</h2>
            <div style={{
              maxWidth: 700,
              margin: "0 auto",
              display: "grid",
              gap: 32,
            }}>
              {[
                { q: "How much does therapy cost?", a: "Sessions are $240 for 45 minutes or $320 for 60 minutes. I can provide a superbill that you can submit to your insurance company for potential out-of-network reimbursement if you have a PPO plan, HSA, or FSA." },
                { q: "Do you take insurance?", a: "I don't accept insurance directly, but I can provide a superbill (detailed receipt) at the end of each month that you can submit to your insurance for potential reimbursement." },
                { q: "Are sessions really virtual?", a: "Yes. All sessions are conducted via secure telehealth video. This means you can meet from your home, office, or anywhere private in California. Virtual therapy is just as effective as in-person therapy and eliminates commute time." },
                { q: "How do I know if we're a good fit?", a: "That's what the free 15-minute consultation is for. We'll discuss what you're looking for and I'll let you know if I think I can help. If I'm not the right fit, I'll do my best to point you in the right direction." },
              ].map((faq, i) => (
                <div key={i}>
                  <h3 style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: 17, fontWeight: 500,
                    color: colors.charcoal,
                    margin: "0 0 12px",
                  }}>{faq.q}</h3>
                  <p style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: 15, fontWeight: 300,
                    color: colors.charcoalLight,
                    lineHeight: 1.8,
                    margin: 0,
                  }}>{faq.a}</p>
                </div>
              ))}
            </div>
          </div>

          {/* How to Get Started */}
          <div style={{ marginBottom: 60 }}>
            <h2 style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(36px, 4vw, 48px)",
              fontWeight: 400,
              color: colors.charcoal,
              margin: "0 0 24px",
              textAlign: "center",
            }}>How to Get Started</h2>
            <div style={{
              maxWidth: 700,
              margin: "0 auto 40px",
            }}>
              <p style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 16, fontWeight: 300,
                color: colors.charcoalLight,
                lineHeight: 1.9,
                margin: "0 0 20px",
                textAlign: "center",
              }}>
                Getting started is simple. Click the button below to schedule a free 15-minute consultation, or use the contact form to reach out with questions. I typically respond within 1-2 business days.
              </p>
              <div style={{ textAlign: "center" }}>
                <button onClick={() => navigate("contact")} style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 13, fontWeight: 500,
                  letterSpacing: "0.12em", textTransform: "uppercase",
                  color: colors.white, border: "none", cursor: "pointer",
                  background: colors.teal,
                  padding: "16px 40px", borderRadius: 2,
                  transition: "background 0.2s",
                }}
                onMouseEnter={e => e.target.style.background = colors.tealLight}
                onMouseLeave={e => e.target.style.background = colors.teal}
                >Book Free Consultation</button>
              </div>
            </div>
          </div>

          {/* Services Offered */}
          <h2 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(36px, 4vw, 48px)",
            fontWeight: 400,
            color: colors.charcoal,
            margin: "0 0 40px",
            textAlign: "center",
          }}>Therapy Services in {pageData.city}</h2>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: 24,
          }}>
            {services.map((service) => (
              <button
                key={service.slug}
                onClick={() => navigate(`service-${service.slug}`)}
                style={{
                  background: colors.ivory,
                  padding: "28px 24px",
                  borderRadius: 4,
                  border: `1px solid ${colors.ivoryDark}`,
                  transition: "all 0.3s ease",
                  cursor: "pointer",
                  textAlign: "left",
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = "translateY(-4px)";
                  e.currentTarget.style.boxShadow = "0 12px 40px rgba(46,125,122,0.12)";
                  e.currentTarget.style.borderColor = colors.teal;
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = "none";
                  e.currentTarget.style.boxShadow = "none";
                  e.currentTarget.style.borderColor = colors.ivoryDark;
                }}
              >
                <div style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: 24, fontWeight: 500,
                  color: colors.charcoal,
                  marginBottom: 8,
                }}>{service.name}</div>
                <div style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 12, fontWeight: 500,
                  letterSpacing: "0.08em",
                  color: colors.teal,
                  textTransform: "uppercase",
                }}>Learn More →</div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={{
        background: colors.charcoal,
        padding: "100px 40px",
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
            color: "#A8B8B8", lineHeight: 1.8,
            margin: "0 0 40px", maxWidth: 520, marginLeft: "auto", marginRight: "auto",
          }}>
            Schedule a free 15-minute consultation. No commitment, no pressure. Just a conversation about where you are and where you'd like to go.
          </p>
          <button onClick={() => navigate("contact")} style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 13, fontWeight: 500,
            letterSpacing: "0.12em", textTransform: "uppercase",
            color: colors.white, border: "none", cursor: "pointer",
            background: colors.teal,
            padding: "16px 40px", borderRadius: 2,
            transition: "background 0.2s",
          }}
          onMouseEnter={e => e.target.style.background = colors.tealLight}
          onMouseLeave={e => e.target.style.background = colors.teal}
          >Book Free Consultation</button>
        </div>
      </section>
    </>
  );
}

// ========================================
// CRISIS RESOURCES PAGE
// ========================================

function CrisisResourcesPage({ setCurrentPage }) {
  const [ref, visible] = useScrollReveal();

  return (
    <>
      {/* Hero */}
      <section style={{
        background: colors.ivory,
        padding: "160px 40px 80px",
        minHeight: "50vh",
        display: "flex",
        alignItems: "center",
      }}>
        <div style={{ maxWidth: 900, margin: "0 auto", textAlign: "center" }}>
          <div style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 12, letterSpacing: "0.25em", textTransform: "uppercase",
            color: colors.tealMuted, marginBottom: 24,
          }}>Emergency Support</div>
          <h1 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(48px, 6vw, 72px)",
            fontWeight: 300, lineHeight: 1.1,
            color: colors.charcoal, margin: "0 0 32px",
          }}>Crisis Resources</h1>
          <p style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 17, fontWeight: 300,
            color: colors.charcoalLight, lineHeight: 1.8,
            margin: "0 auto",
            maxWidth: 640,
          }}>
            If you're in crisis, you're not alone. Help is available 24/7.
          </p>
        </div>
      </section>

      {/* Resources */}
      <section ref={ref} style={{
        background: colors.white,
        padding: "80px 40px 120px",
        opacity: visible ? 1 : 0,
        transform: visible ? "none" : "translateY(30px)",
        transition: "all 0.8s ease",
      }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          
          {/* Immediate Emergency */}
          <div style={{
            background: "#FFF4E6",
            border: "2px solid #FF6B6B",
            padding: "32px",
            borderRadius: 4,
            marginBottom: 60,
            textAlign: "center",
          }}>
            <h2 style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 32, fontWeight: 500,
              color: colors.charcoal,
              margin: "0 0 16px",
            }}>If You're in Immediate Danger</h2>
            <p style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 17, fontWeight: 400,
              color: colors.charcoal,
              lineHeight: 1.7,
              margin: "0 0 24px",
            }}>
              Call 911 or go to your nearest emergency room
            </p>
            <a href="tel:911" style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 24, fontWeight: 700,
              color: "#FF6B6B",
              textDecoration: "none",
            }}>Call 911</a>
          </div>

          {/* National Crisis Lines */}
          <h2 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 40, fontWeight: 400,
            color: colors.charcoal,
            margin: "0 0 32px",
          }}>24/7 National Crisis Lines</h2>

          <div style={{ display: "grid", gap: 24, marginBottom: 60 }}>
            {[
              { name: "988 Suicide & Crisis Lifeline", phone: "988", text: "Text 988", description: "Free, confidential support 24/7 for people in distress", url: "https://988lifeline.org" },
              { name: "Crisis Text Line", phone: "", text: "Text HOME to 741741", description: "24/7 crisis support via text message", url: "https://www.crisistextline.org" },
              { name: "Trevor Project (LGBTQ+ Youth)", phone: "1-866-488-7386", text: "Text START to 678678", description: "24/7 crisis support for LGBTQ+ young people", url: "https://www.thetrevorproject.org" },
              { name: "National Domestic Violence Hotline", phone: "1-800-799-7233", text: "Text START to 88788", description: "24/7 support for domestic violence survivors", url: "https://www.thehotline.org" },
              { name: "SAMHSA National Helpline", phone: "1-800-662-4357", text: "", description: "Substance abuse and mental health referrals", url: "https://www.samhsa.gov" },
            ].map((resource, i) => (
              <div key={i} style={{
                background: colors.ivory,
                padding: "28px 32px",
                borderRadius: 4,
                border: `1px solid ${colors.ivoryDark}`,
              }}>
                <h3 style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: 24, fontWeight: 500,
                  color: colors.charcoal,
                  margin: "0 0 12px",
                }}>{resource.name}</h3>
                <p style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 15, fontWeight: 300,
                  color: colors.charcoalLight,
                  lineHeight: 1.7,
                  margin: "0 0 16px",
                }}>{resource.description}</p>
                <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
                  {resource.phone && (
                    <a href={`tel:${resource.phone.replace(/[^0-9]/g, '')}`} style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: 16, fontWeight: 500,
                      color: colors.teal,
                      textDecoration: "none",
                    }}>Call: {resource.phone}</a>
                  )}
                  {resource.text && (
                    <span style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: 16, fontWeight: 500,
                      color: colors.teal,
                    }}>{resource.text}</span>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Bay Area Resources */}
          <h2 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 40, fontWeight: 400,
            color: colors.charcoal,
            margin: "0 0 32px",
          }}>Bay Area Crisis Resources</h2>

          <div style={{ display: "grid", gap: 24, marginBottom: 60 }}>
            {[
              { name: "Alameda County Crisis Support Services", phone: "1-800-309-2131", description: "24/7 crisis line for Alameda County residents", location: "Alameda County" },
              { name: "San Francisco Suicide Prevention", phone: "1-415-781-0500", description: "24/7 crisis line for SF residents", location: "San Francisco" },
              { name: "Santa Clara County Mental Health Crisis Line", phone: "1-855-278-4204", description: "24/7 crisis support for Santa Clara County", location: "Santa Clara County" },
              { name: "Contra Costa Crisis Center", phone: "1-800-833-2900", description: "24/7 crisis intervention for Contra Costa County", location: "Contra Costa County" },
              { name: "Marin County Crisis Stabilization Unit", phone: "1-415-473-6666", description: "24/7 crisis services for Marin County", location: "Marin County" },
              { name: "San Mateo County Crisis Line", phone: "1-650-579-0350", description: "24/7 crisis support for San Mateo County", location: "San Mateo County" },
            ].map((resource, i) => (
              <div key={i} style={{
                background: colors.ivory,
                padding: "28px 32px",
                borderRadius: 4,
                border: `1px solid ${colors.ivoryDark}`,
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
                  <h3 style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: 24, fontWeight: 500,
                    color: colors.charcoal,
                    margin: 0,
                  }}>{resource.name}</h3>
                  <span style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: 12, fontWeight: 500,
                    color: colors.teal,
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                  }}>{resource.location}</span>
                </div>
                <p style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 15, fontWeight: 300,
                  color: colors.charcoalLight,
                  lineHeight: 1.7,
                  margin: "0 0 16px",
                }}>{resource.description}</p>
                <a href={`tel:${resource.phone.replace(/[^0-9]/g, '')}`} style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 16, fontWeight: 500,
                  color: colors.teal,
                  textDecoration: "none",
                }}>Call: {resource.phone}</a>
              </div>
            ))}
          </div>

          {/* Additional Support */}
          <h2 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 40, fontWeight: 400,
            color: colors.charcoal,
            margin: "0 0 32px",
          }}>Additional Support</h2>

          <div style={{ display: "grid", gap: 24 }}>
            {[
              { name: "Warmline (Non-Crisis Support)", phone: "1-855-845-7415", description: "Peer support for when you need to talk but it's not an emergency" },
              { name: "Veterans Crisis Line", phone: "988 (Press 1)", text: "Text 838255", description: "24/7 crisis support for veterans and their families" },
              { name: "Disaster Distress Helpline", phone: "1-800-985-5990", text: "Text TalkWithUs to 66746", description: "Crisis counseling for disaster survivors" },
            ].map((resource, i) => (
              <div key={i} style={{
                background: colors.ivory,
                padding: "28px 32px",
                borderRadius: 4,
                border: `1px solid ${colors.ivoryDark}`,
              }}>
                <h3 style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: 24, fontWeight: 500,
                  color: colors.charcoal,
                  margin: "0 0 12px",
                }}>{resource.name}</h3>
                <p style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 15, fontWeight: 300,
                  color: colors.charcoalLight,
                  lineHeight: 1.7,
                  margin: "0 0 16px",
                }}>{resource.description}</p>
                <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
                  <a href={`tel:${resource.phone.replace(/[^0-9]/g, '')}`} style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: 16, fontWeight: 500,
                    color: colors.teal,
                    textDecoration: "none",
                  }}>Call: {resource.phone}</a>
                  {resource.text && (
                    <span style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: 16, fontWeight: 500,
                      color: colors.teal,
                    }}>{resource.text}</span>
                  )}
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

function SEODirectory({ setCurrentPage }) {
  const navigate = (page) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

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
              <button
                key={slug}
                onClick={() => navigate(`seo-${slug}`)}
                style={{
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
              </button>
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
              <button
                key={slug}
                onClick={() => navigate(`seo-${slug}`)}
                style={{
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
              </button>
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
                <button
                  key={slug}
                  onClick={() => navigate(`seo-${slug}`)}
                  style={{
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
                </button>
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
          <button onClick={() => navigate("home")} style={{
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
          </button>
        </div>
      </div>
    </section>
  );
}

// ========================================
// MAIN APP
// ========================================

export default function App() {
  const [currentPage, setCurrentPage] = useState("home");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  let PageComponent;
  
  if (currentPage === "home") {
    PageComponent = <HomePage setCurrentPage={setCurrentPage} />;
  } else if (currentPage === "about") {
    PageComponent = <AboutPage setCurrentPage={setCurrentPage} />;
  } else if (currentPage === "services") {
    PageComponent = <ServicesPage setCurrentPage={setCurrentPage} />;
  } else if (currentPage.startsWith("service-")) {
    const slug = currentPage.replace("service-", "");
    PageComponent = <ServiceDetailPage slug={slug} setCurrentPage={setCurrentPage} />;
  } else if (currentPage === "faq") {
    PageComponent = <FAQPage setCurrentPage={setCurrentPage} />;
  } else if (currentPage === "blog") {
    PageComponent = <BlogPage setCurrentPage={setCurrentPage} />;
  } else if (currentPage.startsWith("blog-")) {
    const slug = currentPage.replace("blog-", "");
    PageComponent = <BlogPostPage slug={slug} setCurrentPage={setCurrentPage} />;
  } else if (currentPage === "seo-directory") {
    PageComponent = <SEODirectory setCurrentPage={setCurrentPage} />;
  } else if (currentPage.startsWith("seo-")) {
    const slug = currentPage.replace("seo-", "");
    PageComponent = <SEOLandingPage slug={slug} setCurrentPage={setCurrentPage} />;
  } else if (currentPage === "crisis-resources") {
    PageComponent = <CrisisResourcesPage setCurrentPage={setCurrentPage} />;
  } else if (currentPage === "contact") {
    PageComponent = <ContactPage />;
  }

  return (
    <>
      <style>{`
        ${fonts}
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { background: ${colors.ivory}; }
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: block !important; }
          section > div { grid-template-columns: 1fr !important; }
          footer > div > div:first-child { grid-template-columns: 1fr !important; }
        }
      `}</style>
      
      <Nav currentPage={currentPage} setCurrentPage={setCurrentPage} />
      {PageComponent}
      <Footer setCurrentPage={setCurrentPage} />
    </>
  );
}
