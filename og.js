export const config = { runtime: "edge" };

const SITE_URL = "https://baysidewellnessandcounseling.com";
const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.png`;
const DEFAULT_TITLE = "Bayside Wellness & Counseling | Virtual Therapy in California";
const DEFAULT_DESCRIPTION =
  "Compassionate, evidence-based virtual therapy for adults, teens, and families across California. EMDR, IFS, CBT, and more. Free 15-minute consultation.";

// All 14 blog posts with their actual image paths from App.jsx
const BLOG_POSTS = {
  "cost-of-constant-exposure-desensitization": {
    title: "The Cost of Constant Exposure: Understanding Desensitization",
    // Local image — served from Bayside's own public folder
    image: `${SITE_URL}/desensitization-blog.jpg`,
    description:
      "What happens when we become desensitized to the constant stream of distressing content in our lives.",
  },
  "master-trauma-or-die-trying": {
    title: "Master Trauma, or Die Trying",
    image:
      "https://images.squarespace-cdn.com/content/v1/67b28b6e1f96852c768d5fd2/1771904315221-1TRU8WPW6AVCLPYZOTW4/unsplash-image-1VNw8-5cs54.jpg",
    description:
      "A direct look at what it actually takes to work through trauma rather than around it.",
  },
  "the-5-lies-suicide-tells-us": {
    title: "The 5 Lies of Suicide",
    image:
      "https://images.squarespace-cdn.com/content/v1/67b28b6e1f96852c768d5fd2/1771902287761-KLHR5ENYZWG25WB9JNUD/unsplash-image-hluOJZjLVXc.jpg",
    description:
      "Suicide distorts thinking in predictable ways. Understanding those distortions can save lives.",
  },
  "ai-and-therapy": {
    title: "AI vs Therapist!",
    image:
      "https://images.squarespace-cdn.com/content/v1/67b28b6e1f96852c768d5fd2/1771310087865-4QXZO9GM1Y8EASO3RBMK/unsplash-image-6UDansS-rPI.jpg",
    description:
      "What artificial intelligence can and cannot do in the therapeutic space.",
  },
  "rupture-and-repair": {
    title: "Rupture and Repair: How Relationships Actually Heal",
    image:
      "https://images.squarespace-cdn.com/content/v1/67b28b6e1f96852c768d5fd2/1766355365248-ZHLYJ0YHVJF1HJPOMXFK/unsplash-image-qb85Joj59lw.jpg",
    description:
      "How relationships break and heal — and why repair is more important than avoiding conflict.",
  },
  "valentines-day-and-men": {
    title: "Valentine's Day and the Emotional Expectations Men Carry",
    image:
      "https://images.squarespace-cdn.com/content/v1/67b28b6e1f96852c768d5fd2/1766354837947-4XS5RWRIXZP97CJ1XJYS/unsplash-image-O8-KhBqqI4Y.jpg",
    description:
      "What Valentine's Day reveals about how men relate to love, vulnerability, and connection.",
  },
  "rethinking-therapy-2026": {
    title: "Rethinking Therapy and Mental Health in 2026",
    image:
      "https://images.squarespace-cdn.com/content/v1/67b28b6e1f96852c768d5fd2/1766352334066-T1QVIJH3AB4HFOYU5Q5R/unsplash-image-F9DFuJoS9EU.jpg",
    description:
      "How therapy is evolving and what that means for people seeking help today.",
  },
  "beginning-again": {
    title: "Beginning Again in Your Own Time",
    image:
      "https://images.squarespace-cdn.com/content/v1/67b28b6e1f96852c768d5fd2/1766351301449-IMHYUW94L99RR3KEVHSL/unsplash-image-G_lwAp0TF38.jpg",
    description:
      "On starting over — what it requires and what it makes possible.",
  },
  "low-mood-depression": {
    title: "Low Mood vs Depression",
    image:
      "https://images.squarespace-cdn.com/content/v1/67b28b6e1f96852c768d5fd2/1766348432461-CLU9B3CYYK6LCYFWHXBK/unsplash-image-ZnLprInKM7s.jpg",
    description:
      "Understanding the difference between feeling down and clinical depression.",
  },
  "dream-bigger-2026": {
    title: "Dreaming Big in 2026",
    image:
      "https://images.squarespace-cdn.com/content/v1/67b28b6e1f96852c768d5fd2/1764700039859-HVX3VR21TGNM05TDONQ0/unsplash-image-PSnkh76C-Z8.jpg",
    description:
      "Why setting meaningful intentions matters more than resolutions.",
  },
  "starting-new-year-with-intention": {
    title: "Beginning Again: Stepping Into a New Year With Intention",
    image:
      "https://images.squarespace-cdn.com/content/v1/67b28b6e1f96852c768d5fd2/1764023078154-CEA4CMD323KA6YW3TZND/unsplash-image-LLcAJbEh1_Q.jpg",
    description:
      "How to approach a new year with clarity and purpose rather than pressure.",
  },
  "beginners-guide-to-ifs": {
    title: "A Beginner's Guide to IFS and Understanding Your Inner World",
    image:
      "https://images.squarespace-cdn.com/content/v1/67b28b6e1f96852c768d5fd2/1764709669342-IJL8VHRIS5OXFR3CQPMD/vadim-sherbakov-osSryggkso4-unsplash.jpg",
    description:
      "Internal Family Systems therapy explained simply and honestly.",
  },
  "beginners-guide-to-emdr": {
    title: "A Beginner's Guide to EMDR: What It Is and How It Helps",
    image:
      "https://images.squarespace-cdn.com/content/v1/67b28b6e1f96852c768d5fd2/1764529256082-6V62KAWQPNAE2Z54FA98/bennie-bates-G7Iu5NDlMVY-unsplash.jpg",
    description:
      "What EMDR is, how it works, and whether it might be right for you.",
  },
  "holiday-stress-loneliness": {
    title: "When the Holidays Don't Feel the Way They Are Supposed To",
    image:
      "https://images.squarespace-cdn.com/content/v1/67b28b6e1f96852c768d5fd2/1764018817651-U02ZML8OU74W5RX8SRF4/bryan-heng-ubrkiCBqk1g-unsplash.jpg",
    description:
      "Why the holidays are hard for so many people and what actually helps.",
  },
};

export default async function handler(req) {
  const url = new URL(req.url);
  const pathname = url.searchParams.get("path") || "/";

  let title = DEFAULT_TITLE;
  let description = DEFAULT_DESCRIPTION;
  let ogImage = DEFAULT_OG_IMAGE;
  let canonicalUrl = `${SITE_URL}${pathname}`;

  // Match /blog/:slug
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

  // Build a minimal HTML shell directly — no fetch, no loop.
  // Browsers ignore this shell and render via the JS bundle.
  // Social crawlers read the OG tags and stop there.
  const html = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${escapeHtml(title)}</title>
    <meta name="description" content="${escapeHtml(description)}" />

    <!-- Open Graph -->
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="Bayside Wellness &amp; Counseling" />
    <meta property="og:url" content="${escapeHtml(canonicalUrl)}" />
    <meta property="og:title" content="${escapeHtml(title)}" />
    <meta property="og:description" content="${escapeHtml(description)}" />
    <meta property="og:image" content="${escapeHtml(ogImage)}" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />

    <!-- Twitter -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${escapeHtml(title)}" />
    <meta name="twitter:description" content="${escapeHtml(description)}" />
    <meta name="twitter:image" content="${escapeHtml(ogImage)}" />

    <!-- Canonical -->
    <link rel="canonical" href="${escapeHtml(canonicalUrl)}" />

    <!-- Favicon -->
    <link rel="icon" type="image/png" href="/favicon.png" />

    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=DM+Sans:wght@300;400;500;600&display=swap" rel="stylesheet" />

    <!-- Google Analytics -->
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
