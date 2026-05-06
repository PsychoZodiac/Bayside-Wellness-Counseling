export const config = { runtime: "edge" };

const SITE_URL = "https://baysidewellnessandcounseling.com";
const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.jpg`;
const DEFAULT_TITLE = "Bayside Wellness & Counseling | Licensed Therapist Oakland, CA";
const DEFAULT_DESCRIPTION =
  "Compassionate, evidence-based virtual therapy for adults, teens, and families across California. EMDR, IFS, CBT, and more. Free 15-minute consultation.";

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

  let title = DEFAULT_TITLE;
  let description = DEFAULT_DESCRIPTION;
  let ogImage = DEFAULT_OG_IMAGE;
  let canonicalUrl = `${SITE_URL}${pathname}`;

  const blogMatch = pathname.match(/^\/blog\/([^/]+)\/?$/);
  if (blogMatch) {
    const slug = blogMatch[1];
    const post = BLOG_POSTS[slug];
    if (post) {
      title = `${post.title} | Bayside Wellness & Counseling`;
      description = post.description;
      ogImage = post.image;
    }
  }

  const html = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${escapeHtml(title)}</title>
    <meta name="description" content="${escapeHtml(description)}" />
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
    <link rel="canonical" href="${escapeHtml(canonicalUrl)}" />
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
