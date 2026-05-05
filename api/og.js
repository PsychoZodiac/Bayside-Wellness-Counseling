export const config = { runtime: "edge" };

const SITE_URL = "https://baysidewellnessandcounseling.com";
const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.jpg`;
const DEFAULT_TITLE = "Bayside Wellness & Counseling | Licensed Therapist Oakland, CA";
const DEFAULT_DESCRIPTION =
  "Compassionate, evidence-based virtual therapy for adults, teens, and families across California. EMDR, IFS, CBT, and more. Free 15-minute consultation.";

const BLOG_POSTS = {
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
