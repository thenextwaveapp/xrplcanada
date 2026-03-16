# XRPL Canada — Editorial & Production Briefing

*This document is the complete briefing for anyone — human or AI — producing content for XRPL Canada. Read it in full before writing or building anything.*

---

## Who XRPL Canada Is

XRPL Canada is a Canadian non-profit community organization dedicated to growing the XRP Ledger ecosystem across Canada. The publication serves builders, institutions, regulators, and serious ecosystem participants — not retail speculators. The editorial mandate is to cover XRPL adoption, infrastructure development, and the Canadian context around both.

The publication is bilingual. All user-facing text on the website — titles, excerpts, navigation links — requires English and French versions. Body content is written in English.

XRPL Canada is a community partner for XRP Tokyo 2026 (April 7, Happo-en, Tokyo). This is referenced in the footer of every article until the event passes.

**Contact:** team@xrplcanada.org
**X:** @XRPLCanada

---

## Audience and Editorial Stance

The audience includes institutional decision-makers, regulators, Canadian fintech professionals, XRPL developers, and serious ecosystem participants. They do not need to be told what XRP is. They do not need hype. They need accurate, well-sourced analysis that respects their time and intelligence.

The publication does not speculate on price. It does not cheerload. When something matters, it explains precisely why — it does not declare it important and move on. When something has limitations or costs, it says so. The Samara piece said directly that DLT efficiency gains "are unlikely to be as significant as some argue." That is the editorial standard.

The Canada angle is always present but always earned. It connects Canadian institutions, regulators, and infrastructure to XRPL developments. It is never forced.

---

## Writing Standards

These are non-negotiable on every piece:

- **No choppy sentences.** Full, clear language. Ideas are developed completely before moving on.
- **No redundant sentences.** Every sentence must add something the previous one did not.
- **No negative framing as a substitute for positive framing.** Never write "it's not this, it's that." State what it is directly.
- **No inflation of significance.** Never declare something important without explaining the mechanism by which it matters.
- **Paragraphs build arguments. Bullets list discrete items.** Apply this judgment per section — not as a rule applied uniformly. If content is three distinct sequential items with clear labels, use bullets. If content is a single building argument, use paragraphs.
- **Dates on every claim where one exists.** This is a timestamped weekly publication. Every event, release, filing, and announcement gets its date.
- **Primary sources always.** Research papers, foundation disclosures, official releases, regulatory filings. Not aggregator summaries.
- **Sources section at the bottom of every piece.** Format: Publication/Organization — "Title," Date — URL

---

## Content Categories

- **Weekly Roundup** — This Week on the Ledger (title format: "This Week on the Ledger" without date)
- **Technical** — protocol developments, amendments, specifications, deep technical analysis
- **Ecosystem** — institutional adoption, partnerships, real-world deployments, case studies
- **Education** — evergreen, institutional audience, metrics-based or foundational explainers
- **Year in Review** — annual retrospectives and ecosystem summaries

---

## Target: 4 Articles Per Week

- 1 × Weekly Roundup — always the anchor
- 1 × Technical Deep Dive or Ecosystem Spotlight — the week's biggest single story in full
- 1 × Event / Narrative or Canada-specific angle
- 1 × Education or Case Study — evergreen, institutional audience

---

## Weekly Production Process

**News Sweep**
Search across five buckets every week:
- XRPL protocol — amendment votes, rippled releases, developer proposals
- Ripple corporate — partnerships, acquisitions, regulatory filings, executive statements
- Institutional / RWA — tokenized asset data, ETF flows, on-chain metrics
- Regulatory — Canada, U.S., Japan, Australia, EU — stablecoins, CBDCs, digital asset law
- Events — conferences, hackathons, community milestones

Fetch primary sources directly. Build a flat inventory, then triage: roundup items vs. standalone pieces. A story earns its own piece when there is a research paper, primary document, technical specification, or policy decision behind it.

**Draft Order**
Deep-dives and standalone pieces first. Roundup last — it references what already exists.

---

## This Week on the Ledger — Structure

**Title:** Always "This Week on the Ledger" (no date in title — date appears separately in metadata)

The roundup has a consistent structure every week:

1. **Opening paragraph** — one paragraph framing the week editorially. What kind of week was it. No bullet points. Sets the tone.
2. **Three main sections** — each covering a distinct theme. Each has a descriptive header. Format per section is determined by content: bullets where there are discrete sequential items, paragraphs where there is a building argument.
3. **In Brief** — 3–5 short items, each a bold-label entry with 2–4 sentences. Specific detail that earns each item's place — not just a headline restated.
4. **Sources** — full list at the bottom.
5. **Footer boilerplate** — XRPL Canada non-profit description + current event callout.

---

## Per-Article Checklist

- [ ] Primary sources confirmed and linked
- [ ] Dates on every claim where one exists
- [ ] Canada angle present — earned, not forced
- [ ] No sentence that exists only to say what something is not
- [ ] No redundant sentences
- [ ] Format matches content — bullets where discrete, paragraphs where argumentative
- [ ] Reading time estimated (200 words/min)
- [ ] Sources section at the bottom
- [ ] Footer boilerplate and current event callout
- [ ] **If post has featured image:** Image added to both blog post OG tags AND blog.html card

---

## Featured Image

- Dimensions: ~800–1200px width, 200px display height
- Format: JPG or PNG
- Naming: `descriptive-slug.png` (e.g., `this-week-march-15.png`)
- Save to: `/public/`
- Default OG fallback: `xrpl-canada-social-share.png`

---

## HTML File Structure

Filename: `blog/descriptive-slug.html` — kebab-case, include date for dated series

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Your Title | XRPL Canada Blog</title>

    <meta name="description" content="150-160 character description">
    <meta name="keywords" content="keyword1, keyword2, XRPL Canada">
    <link rel="canonical" href="https://xrplcanada.org/blog/your-slug.html">

    <meta property="og:type" content="article">
    <meta property="og:url" content="https://xrplcanada.org/blog/your-slug.html">
    <meta property="og:title" content="Your Title">
    <meta property="og:description" content="Social description">
    <meta property="og:image" content="https://xrplcanada.org/public/your-image.png">

    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:site" content="@XRPLCanada">
    <meta name="twitter:title" content="Your Title">
    <meta name="twitter:description" content="Twitter description">
    <meta name="twitter:image" content="https://xrplcanada.org/public/your-image.png">

    <link rel="icon" type="image/png" href="../public/xrpl-canada-icon.png">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/remixicon@3.5.0/fonts/remixicon.css" />
    <link rel="stylesheet" href="../styles/nav.css" />
    <link rel="stylesheet" href="../styles/blog-global.css">
</head>
<body>
    <div id="site-nav"></div>

    <article class="article-container">
        <a href="../blog.html" class="back-link">
            <i class="ri-arrow-left-line"></i>
            Back to All Updates
        </a>

        <header class="article-header">
            <div class="article-meta">
                <span class="category-tag">Your Category</span>
                <div class="meta-item">
                    <i class="ri-calendar-line"></i>
                    <span>March 15, 2026</span>
                </div>
                <div class="meta-item">
                    <i class="ri-time-line"></i>
                    <span>7 min read</span>
                </div>
            </div>
            <h1>Your Article Title</h1>
        </header>

        <!-- Hero image (if post has featured image) -->
        <img src="../public/your-image.png" alt="Your Title" style="width: 100%; border-radius: 12px; margin-bottom: 40px;">

        <div class="article-content">
            <p>Opening paragraph...</p>

            <h2>Section Title</h2>
            <p>Content...</p>

            <div class="info-box" style="margin-top: 48px; background: rgba(255, 23, 68, 0.05); border-left: 4px solid var(--primary-red);">
                <p style="margin-bottom: 12px;"><strong>XRPL Canada</strong> is a non-profit community organization dedicated to growing the XRP Ledger ecosystem across Canada. Have a story we should cover? Reach us at <a href="mailto:team@xrplcanada.org" style="color: var(--primary-red-light); text-decoration: none; font-weight: 600;">team@xrplcanada.org</a> or follow <a href="https://twitter.com/XRPLCanada" target="_blank" rel="noopener noreferrer" style="color: var(--primary-red-light); text-decoration: none; font-weight: 600;">@XRPLCanada</a> on X.</p>
                <p style="margin-bottom: 0;"><strong>XRPL Canada is a community partner for XRP Tokyo 2026</strong> — April 7 at Happo-en, Tokyo, hosted by XRPL Japan inside the TEAMZ Web3/AI Summit. Details on participation to follow.</p>
            </div>
        </div>

        <script type='text/javascript' src='https://platform-api.sharethis.com/js/sharethis.js#property=69478aeeb5f2d28644168c47&product=image-share-buttons' async='async'></script>
    </article>

    <div id="site-footer"></div>

    <script src="../components/nav.js"></script>
    <script src="../styles/nav-mobile.js"></script>
    <script src="../components/footer.js"></script>
    <script src="../styles/theme-toggle.js"></script>
</body>
</html>
```

---

## SEO Checklist

- [ ] Meta description: 150–160 characters, primary keyword, action-oriented
- [ ] Keywords: 5–10 terms, include "XRPL Canada", mix broad + specific
- [ ] OG image: absolute URL `https://xrplcanada.org/public/...`, 1200×630px recommended
- [ ] Canonical URL set to full `https://xrplcanada.org/blog/your-slug.html`

---

## Content Components

Standard elements: `<p>` `<h2>` `<h3>` `<ul>/<li>` `<strong>` `<a href="">`

```html
<!-- Highlight Box — red accent -->
<div class="highlight-box">
    <h3>Title</h3>
    <p>Content...</p>
</div>

<!-- Info Box — blue accent -->
<div class="info-box">
    <h3>Title</h3>
    <p>Content...</p>
</div>
```

---

## Blog Category Filter

blog.html includes a JavaScript-powered category filter at the top of the page:
- All blog posts have a `data-category` attribute matching one of the 5 categories
- Filter buttons show live post counts: e.g., "Technical (3)", "Ecosystem (3)"
- When adding or removing posts, update the count in the corresponding filter button
- Filter buttons are located around line 340 in blog.html

---

## File Paths

**In blog posts use `../` prefix:**
- `../public/image.png`
- `../styles/nav.css`
- `../blog.html`

**In `blog.html` no prefix:**
- `public/image.png`
- `blog/your-slug.html`

---

## Add to blog.html

**IMPORTANT:** Always include the featured image in the blog.html card if the post has one. The image and the card should always match.

Insert new card at top of `.blog-grid` (around line 309):

```html
<article class="blog-card">
    <!-- ALWAYS include image if post has one -->
    <a href="blog/your-slug.html" style="display: flex; justify-content: center; margin: -40px 0 20px 0;">
        <img src="public/your-image.png" alt="Your Title" style="width: calc(100% + 80px); height: 200px; object-fit: cover; object-position: center; border-radius: 20px 20px 0 0; cursor: pointer;">
    </a>

    <!-- If no image, start with meta instead -->
    <div class="blog-meta">
        <span class="blog-date">
            <i class="ri-calendar-line"></i>
            March 15, 2026
        </span>
        <span class="blog-category">Your Category</span>
    </div>

    <h2 class="blog-title">
        <span class="lang-en">Your Title</span>
        <span class="lang-fr hidden">Votre titre en français</span>
    </h2>

    <p class="blog-excerpt">
        <span class="lang-en">
            One or two sentence excerpt summarizing the post...
        </span>
        <span class="lang-fr hidden">
            Résumé en français...
        </span>
    </p>

    <a href="blog/your-slug.html" class="blog-link">
        <span class="lang-en">Read Full Story</span>
        <span class="lang-fr hidden">Lire l'histoire complète</span>
        <i class="ri-arrow-right-line"></i>
    </a>
</article>
```

---

## Update sitemap.xml

Add near top after `blog.html` entry:

```xml
<url>
  <loc>https://www.xrplcanada.org/blog/your-slug.html</loc>
  <lastmod>2026-03-15</lastmod>
  <priority>0.9</priority>
</url>
```

Update `blog.html` lastmod to today.

**Priority guidelines:**
- Homepage: `1.0`
- Blog listing: `0.9`
- Recent/important posts: `0.9`
- Older posts: `0.8`

---

## Pre-Publish Checks

**Local testing:** `file:///Users/mayowarosanwo/xrplcanada/blog/your-slug.html`

- [ ] Nav and footer load
- [ ] All links work, especially `../` relative paths
- [ ] Images display
- [ ] ShareThis buttons appear
- [ ] Theme toggle works
- [ ] Mobile responsive

**Social preview tools:**
- Facebook Debugger: https://developers.facebook.com/tools/debug/
- Twitter Card Validator: https://cards-dev.twitter.com/validator
- Google Rich Results: https://search.google.com/test/rich-results

---

## Deploy

```bash
git add blog/your-slug.html blog.html sitemap.xml public/your-image.png
git commit -m "Add [Post Title] blog post"
git push origin main
```

Auto-deploys in 1–5 minutes. Confirm live URL.

**Publishing cadence:** Deep-dives and standalone pieces mid-week. Weekly roundup Saturday for Sunday readership.

---

## Post-Publish

- [ ] Post to @XRPLCanada on X — excerpt, link, tag relevant accounts, #XRPL #XRP #Blockchain
- [ ] Verify OG image renders on live social share
- [ ] Confirm ShareThis buttons functional on live post
- [ ] Monitor analytics and engagement

---

## Production Workflow Summary

1. **News sweep** across five buckets (protocol, corporate, institutional, regulatory, events)
2. **Triage** — roundup items vs. standalone deep-dives
3. **Draft** standalone pieces first, roundup last
4. **Create HTML** file with full meta tags and structure
5. **Add card** to top of `blog.html`
6. **Update** `sitemap.xml`
7. **Test** locally (paths, images, responsive)
8. **Deploy** via git push
9. **Publish** to social and verify live

---

*Last updated: March 2026*
