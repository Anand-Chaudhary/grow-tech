# Grow Tech: Landing Page Design Document, Market Research and SEO Content

Oct 2, 2026 · @Aakash

## Summary and positioning

Grow Tech should present itself as the premium but plain-spoken web partner for small businesses that are scaling: sites built like products, priced in the open, and fully owned by the client. The landing page has to prove this itself, because a web company's own site is its first case study.

- **Audience:** owners and marketing leads of growing small businesses whose DIY or template site has become a bottleneck.
- **Promise:** “Websites that grow when you do.”
- **Primary conversion:** book a free 20-minute site review. **Secondary:** see published package prices.
- **Tone:** confident, specific, no agency jargon.

Assumptions to confirm:

- No target country was given, so cost benchmarks are USD figures from US-oriented sources.
- No portfolio, testimonials, prices or client names were supplied, so every proof element in the copy is a \[bracketed placeholder\]. Add only what is real.
- Keyword search volumes were not checked, because no keyword tool was available. Keyword choices are hypotheses until validated in Google Search Console or a keyword planner.

## Market research

Small businesses buy a website to get enquiries, not pages, and they distrust agencies that hide price or hold their accounts. Most of the sources below are agency blogs with a sales motive and second-hand statistics, so treat the numbers as directional and validate them with five conversations with target customers.

| Finding | Evidence | What Grow Tech does with it |
| --- | --- | --- |
| Typical budget is $1,000 to $10,000; small agencies quote $3,000 to $15,000 | A Clutch survey cited by [TechLion](https://www.techlion.dev/blog/how-much-does-a-website-cost-small-business) puts the median near $5,000; [Website Setup](https://websitesetup.org/website-cost/) gives the agency range | Place packages inside the agency band. Premium must come from outcomes and craft, not a higher sticker. |
| The top complaint is a site that “did not generate business” | [FormGrid](https://formgrid.dev/blog/how-much-does-a-small-business-website-cost-in-2026) says enquiry handling is the most important part of a small business site | Sell lead flow, not page counts. Show a path to enquiry in every section. |
| Most agencies hide pricing | [Nano Globals](https://nanoglobals.com/marketing-agency-websites/) singles out Hook Agency for publishing prices as a differentiator | Publish “from” prices on the page. |
| Template sites often convert about as well as custom ones for simple needs | [DEV Community](https://dev.to/allenarduino/how-much-does-a-small-business-website-cost-in-2026-2i0k) | Do not sell “custom” as looks alone. Sell speed, ownership, and room to grow. |
| A dark, portfolio-only homepage can hurt agencies that win on trust and process | [Indie Hackers](https://www.indiehackers.com/post/premium-or-transparent-the-real-decision-behind-every-agency-website-redesign-7136f6133c) | Premium look, but put process, price and proof above the fold. |
| Landing page conversion averages 2.35%; top quartile is 5.31% or higher | [Wavespace](https://www.wavespace.agency/blog/best-landing-page-design-agencies) citing WordStream, across all industries | Treat 2 to 3% as a baseline and 5% as a stretch. Set your own baseline after four weeks of traffic. |
| Lock-in worries buyers: domain, hosting or code held by the builder | Recurring theme in [TechLion's selection guide](https://www.techlion.dev/blog/how-to-choose-a-web-designer-nj-2026) | Make “you own everything” a headline promise. |

**Buying triggers and objections** (my synthesis, not sourced; confirm in interviews):

- *Triggers:* the site is slow or broken on phones; a competitor suddenly looks better; the business is expanding or raising prices; leads dropped after a redesign or platform change; the DIY builder can't do what's needed.
- *Objections:* “I can do it on Wix”; “agencies are expensive”; “what if you disappear or hold my site hostage”; “how long will it take”; “will it actually bring customers”.

## Differentiation

Grow Tech wins by being the option that is visibly better built than a freelancer's template and more transparent than a typical agency. The three claims that carry this are performance you can verify, prices you can read, and ownership you can keep.

| Option | Strength | Weak spot for a growing business | Grow Tech's answer |
| --- | --- | --- | --- |
| DIY builder | Cheap, fast to start | Speed, custom features and search control hit a ceiling | Honest advice on when a builder is enough, and a clean upgrade path when it isn't |
| Freelancer | Personal, affordable | One person, uneven process, risk of vanishing | Documented process, a team, and a care plan |
| Typical small agency | Strategy and polish | Hidden pricing, retainers, account lock-in | Published starting prices, written scope, client-owned accounts |

**Three pillars for the page:**

1. **Built like a product.** Performance budget, accessibility checks and a public scorecard on Grow Tech's own page.
2. **Priced in the open.** Package prices and what is included, written before work starts.
3. **Yours, completely.** Domain, hosting, repository and content sit in accounts the client owns.

Proof beats adjectives. Every pillar needs one real artefact beside it: a measured score, a price table, a handover checklist.

## Design direction

**Direction: warm editorial minimalism.** A cream canvas, flat tonal tiles, one serif-plus-sans headline pairing, and a single bright accent used sparingly on dark surfaces. Premium comes from restraint and precision, so nothing glows, blurs or fades into anything else. **Every fill, border, shadow and text colour is a solid colour. No gradients anywhere.**

### What we take from the two references

| Reference | Take | Change or avoid |
| --- | --- | --- |
| Page anatomy diagram | Section order and rules: one primary CTA in the hero, three benefits, who it's for, no more than six features, testimonials, tools and integrations, pricing with one highlighted plan, at least five FAQs, a closing footer | It is a SaaS template with orange gradients, diagonal bands and soft glows. Drop all of those. “Features” become services and “integrations” become our tech stack. |
| Flowblox-style page | Cream canvas; headline set in a serif line over a bold sans line; pill navigation with a black pill button; a curved strip across the hero; bento tiles in sand, taupe and olive; three benefits in hairline-divided columns | Replace stock-style portraits with screens of real client sites. Remove photo overlays: small light text on a photo tile (as in its chat tile) is hard to read. |

### Colour: exact values, all solid

Contrast ratios were computed with the WCAG 2.x relative-luminance formula; AA needs 4.5:1 for body text.

| Token | Hex | Use | Contrast |
| --- | --- | --- | --- |
| Cream | #FAF6EC | Page background | Ink on Cream 17.16:1 |
| Sand | #EFE8D8 | Cards and tiles, Launch plan | Ink 15.17:1, Graphite 6.06:1 |
| Stone | #D8CDB6 | At most one tile per grid | Ink 11.75:1 (use Ink only; Graphite is 4.70:1) |
| Sage | #CFD8C4 | Tiles | Ink 12.58:1, Graphite 5.03:1 |
| Forest | #243629 | Brand colour, dark sections, highlighted plan, hover on Ink buttons | Cream 11.90:1 |
| Ink | #16130F | Headlines, body text, primary buttons, footer | Cream on Ink 17.16:1 |
| Graphite | #5A554C | Secondary text on Cream, Sand or Sage | 6.86:1 on Cream |
| Mist | #C9D1C3 | Secondary text on Forest | 8.19:1 on Forest |
| Leaf | #C8F169 | The only accent: dots, underlines, key numbers, badges. Use on Forest or Ink only, never on Cream or Sand. | 9.94:1 on Forest, 14.32:1 on Ink |
| Line | #E2D9C6 | 1px dividers and borders. Decorative only: 1.30:1 on Cream, so never the sole cue. | n/a |

```css
:root {
  --cream: #FAF6EC;  --sand: #EFE8D8;  --stone: #D8CDB6;  --sage: #CFD8C4;
  --forest: #243629; --ink: #16130F;   --graphite: #5A554C; --mist: #C9D1C3;
  --leaf: #C8F169;   --line: #E2D9C6;
}
```

**Interactive states:** primary button is an Ink fill with Cream text, pill shape, 48px high; hover turns it Forest. Secondary button is a 1px Ink outline; hover fills Sand. On Forest or Ink sections the primary button is a Leaf fill with Ink text. Focus ring is 2px Ink on light surfaces and 2px Leaf on dark, with a 2px offset. Body links are Ink with a 1px underline.

**Banned, so the flat rule holds:** gradient backgrounds, gradient text, gradient borders, glow or blurred shadows, glassmorphism, image scrims or overlays, shimmer and animated gradients.

### Type

| Style | Font and weight | Size and spacing |
| --- | --- | --- |
| H1 line 1 (“Websites that grow,”) | Instrument Serif 400 | clamp(2.25rem, 5.6vw, 4.4rem), line-height 1.0 |
| H1 line 2 (“when you do.”) | Geist 600 | clamp(2.75rem, 7vw, 5.5rem), line-height 1.0, letter-spacing -0.02em |
| H2 | Geist 600 | clamp(2rem, 4.2vw, 3.25rem), line-height 1.08, letter-spacing -0.02em |
| Tile title (H3) | Geist 600 | 22px, line-height 1.25 |
| Body | Geist 400 | 18px on desktop, 17px on mobile, line-height 1.6 |
| Small | Geist 400 | 14px, line-height 1.5 |
| Label | Geist Mono 400 | 12px, uppercase, letter-spacing 0.08em |

Self-host Latin-subset woff2 files, font-display swap, and preload only the H1 faces.

### Layout and shape

- Container 1200px max; side padding 24px on mobile and 40px on desktop; 12 columns with a 24px gutter.
- Spacing scale: 4, 8, 12, 16, 24, 32, 48, 64, 96, 128px. Section padding 128px on desktop, 80px on mobile.
- Radius: tiles 24px, screenshot frames 16px, buttons and nav pill fully rounded.
- Breakpoints at 640, 1024 and 1280px.
- No box-shadow anywhere. Depth comes from tonal tiles and 1px Line borders.

### Hero

A floating pill nav (56px high, Cream fill, 1px Line border): links left, wordmark centre, “Contact” and the Ink pill button right. Below it sit the eyebrow, the two-line H1, the subhead and the two buttons. Under that, a curved strip of five to seven screens of real client sites, each tilted 12 to 20 degrees on the Y axis with CSS perspective, framed in 1px Line borders with 16px radius. Beneath the strip, three one-line benefits in columns split by 1px Line dividers: built like a product, priced in the open, yours completely. The H1 text, not an image, is the LCP element; load the first three screens eagerly at small sizes and lazy-load the rest; animate with transform only.

### Bento grid for services

Twelve columns, 16px gap, 360px tile height on desktop, stacked on mobile. Text sits on flat tile areas, never over a screenshot.

| Position | Tile | Fill | Text |
| --- | --- | --- | --- |
| Row 1, 8 columns | Business websites, with a cropped real screenshot | Sand | Ink |
| Row 1, 4 columns | Online stores | Forest | Cream, Mist |
| Row 2, 4 columns | Booking and lead systems | Sage | Ink |
| Row 2, 8 columns | Care and growth plans, with the live scorecard numbers in Leaf | Ink | Cream |

### Pricing, testimonials and the rest

Pricing cards use Sand for Launch and Scale, and Forest for Growth with a Leaf “Recommended” badge, so one plan is highlighted. Testimonials sit on a full-width Forest panel with Cream text and real portraits. The footer is Ink with Cream links.

### Imagery

No stock photography. Use real browser and phone mockups of client work in flat frames, real team portraits, and a single growth line drawn as SVG: a 2px solid stroke in Ink on light surfaces and Leaf on Forest.

### Motion

200 to 400ms ease-out. The growth line draws once on load. Sections fade and rise 12px on scroll. Hover lifts a tile 2px, with no shadow change. No parallax, no auto-rotating carousels, no animated colour changes. Honour prefers-reduced-motion by turning all of it off.

## Page structure

The page runs problem, proof, price, process, then action, with the same primary call to action repeated at four points. Each section has one job.

| # | Section | Job | Key element |
| --- | --- | --- | --- |
| 1 | Navigation | Orient and convert | Logo, 4 links, “Book a free review” button; sticky on mobile |
| 2 | Hero | Promise and first action | Two-line headline, subhead, two CTAs, curved strip of client site screens, three one-line benefits |
| 3 | Proof strip | Early trust | Client logos or review score (real ones only) |
| 4 | Problem | Make the visitor nod | Three pains: slow, leaky, locked in |
| 5 | What we build | Scope | Four-tile bento grid |
| 6 | Why Grow Tech | Differentiate | Three pillars |
| 7 | Work | Evidence | Two or three case studies with real results |
| 8 | Process | Reduce fear | Four steps with typical timeline |
| 9 | Packages | Qualify and anchor | Three tiers with starting prices |
| 10 | Scorecard | Show craft | Live Core Web Vitals numbers for this page |
| 11 | Testimonials | Social proof | Named quotes with photos |
| 12 | FAQ | Remove objections | Six questions |
| 13 | Final CTA | Convert | Four-field form |
| 14 | Footer | Navigate and legitimise | Links, contact, legal |

**Two additions from the anatomy reference:** a “Who it's for” row of four audience tiles after Why Grow Tech, and a “Tech and integrations” logo row before Packages. Copy for both is in the Landing page copy section. The testimonial and pricing treatments are in Design direction.

**Conversion rules:**

- One primary CTA (“Book a free site review”); the only secondary action is “See packages”.
- The form has four fields or fewer. Every extra field costs enquiries.
- Every claim sits next to its proof, or it is removed.
- Confirm the reply-time and timeline promises in the copy before publishing them.

## The site as proof

A web development company that ships a slow page loses the argument before the first scroll, so performance, accessibility and polish are part of the pitch. Google's “good” thresholds for Core Web Vitals, measured at the 75th percentile of real visits, are the public yardstick ([web.dev](https://web.dev/articles/defining-core-web-vitals-thresholds)).

| Metric | Google “good” threshold | Suggested internal goal |
| --- | --- | --- |
| Largest Contentful Paint | 2.5 s or less | Under 1.8 s in lab tests on throttled mobile |
| Interaction to Next Paint | 200 ms or less | Under 150 ms |
| Cumulative Layout Shift | 0.1 or less | 0 |
| Initial JavaScript | not defined by Google | Under 150 KB gzipped |

The internal goals are suggestions to make the page clearly better than “good”, not published standards.

**Build choices:**

- Next.js with static generation, TypeScript and Tailwind, served from a CDN. Fonts via next/font, images as AVIF or WebP with explicit dimensions.
- Load analytics and any chat widget after first interaction. Third-party tags are a frequent cause of poor INP and CLS ([Agile Brand Guide](https://www.agilebrandguide.com/wiki/metrics/core-web-vitals-cwv/)).
- The form is a server action with a honeypot or Turnstile check, and a clear success and error state.
- WCAG 2.2 AA: keyboard-navigable, visible focus rings, semantic landmarks, alt text, reduced-motion support.
- Security headers and HTTPS everywhere.

**Details that signal engineering:** a live scorecard section fed by Lighthouse CI on each deploy, smooth page transitions that never block input, a dark and light theme, a per-page generated social image, and a short friendly note in the HTML source for the people who view it.

**Honesty rule:** publish only scores that were measured. A new domain has no field data for several weeks, so show lab numbers labelled as lab until real-user data accrues. Core Web Vitals are a modest ranking factor at best ([PPC Land](https://ppc.land/core-web-vitals/)), so justify the work as user experience and conversion, not as an SEO shortcut.

## SEO strategy

One landing page can rank well for one core intent, so this page targets “web development company for small businesses” and its close variants, while supporting pages capture the long tail. All volumes and difficulty are unverified; validate in Search Console or a keyword tool before committing.

| Intent | Target phrase | Where it goes |
| --- | --- | --- |
| Primary | web development company for small businesses | Title tag, eyebrow above H1, first paragraph, one H2 |
| Secondary | small business website design; custom website for small business; website development for growing businesses | H2s, service cards, meta description |
| Cost research | small business website cost; web design packages | Packages section, and a dedicated cost article |
| Differentiators | fast website for small business; SEO-friendly website design | Pillars, scorecard section |
| Local (only if Grow Tech serves a place) | \[city\] web development company | Footer, contact block, Google Business Profile |

**On-page spec:**

- **Title tag (56 characters):** Grow Tech | Web Development for Growing Small Businesses
- **Meta description:** Fast, premium websites for small businesses that are scaling. Clear prices, you own everything, free site review. Book yours today.
- **H1:** Websites that grow when you do. The target phrase sits in the eyebrow line directly above it and in the subhead. If you prefer a keyword-led H1, use “Web development for small businesses ready to grow”, at some cost to brand voice.
- **Structure:** one H1, descriptive H2s that read as the section jobs, H3s for cards. Short paragraphs, plain words.
- **URL and canonical:** one canonical homepage URL, HTTPS, no query-string duplicates.

**Technical:**

- XML sitemap and robots.txt, submitted in Google Search Console.
- Open Graph and Twitter tags with a real preview image.
- Server-render all content and structured data into the HTML.
- Descriptive alt text and file names; internal links from the landing page to pricing, process and case studies.

**Structured data:** Organization on the homepage (name, URL, logo, social profiles). Use ProfessionalService, a LocalBusiness type, only if there is a real address or service area to publish. BreadcrumbList on inner pages. Markup must match what is visible on the page. FAQ rich results stopped appearing in Google Search on May 7, 2026 ([Search Engine Journal](https://www.searchenginejournal.com/google-drops-faq-rich-results-from-search/574429/)), so write the FAQ for buyers, not for a snippet. Keeping FAQPage markup is harmless.

**Supporting content plan (in order):**

1. How much does a small business website cost (uses Grow Tech's own package prices).
2. Template vs custom website: when each makes sense.
3. Website launch checklist for small businesses.
4. One case-study page per finished project.
5. Service pages: web design, online stores, care plans.

**Off-page and measurement:** claim Google Business Profile if there is a local presence; list on Clutch and GoodFirms once there are real reviews; track CTA clicks and form submits as events; review Search Console queries monthly and rewrite titles for pages with impressions but low clicks.

## Landing page copy

Ready to paste. Anything in \[brackets\] is a placeholder for a real fact. Do not publish a promise, number or logo that Grow Tech cannot back.

### Hero

**Eyebrow:** Web development for growing small businesses

**H1:** Websites that grow when you do.

**Subhead:** Grow Tech designs and builds fast, premium websites for small businesses on the rise. Clear prices, no lock-in, and a site that turns visitors into enquiries.

**Buttons:** Book a free site review · See packages

**Microcopy:** 20 minutes. No pitch deck. You leave with a prioritised list of fixes.

**Proof strip:** \[Real client logos, review score or years trading\]

### Problem

**H2:** Your business grew. Your website didn't.

- **It's slow where it counts.** Visitors on phones leave before they see your offer.
- **Enquiries leak.** The next step is unclear, the form is buried, and nothing is tracked.
- **You're stuck.** The person who built it holds the logins, and every small change takes a week.

### What we build

**H2:** Everything your site needs to carry a growing business

- **Business websites.** Fast, search-ready sites that explain what you do and make the next step obvious.
- **Online stores.** Catalogues, payments and inventory that hold up as orders grow.
- **Booking and lead systems.** Forms, bookings and CRM connections so no enquiry slips through.
- **Care and growth plans.** Hosting, security, updates and monthly improvements so your site keeps up with you.

### Why Grow Tech

**H2:** A web company that holds its own site to the standard

- **Built like a product.** Every page has a performance budget and is tested before launch. Our own site scores \[LCP / INP / CLS\] and we show you the numbers.
- **Priced in the open.** Packages and starting prices are below. Scope is written down before work begins.
- **Yours, completely.** Domain, hosting, code and content live in accounts you own. If you ever leave, you leave with everything.

### Who it's for

**H2:** Built for businesses that are growing

Four tiles, each with a one-line benefit. Pick the audiences Grow Tech actually serves; these are examples:

- **Local service businesses.** Be found, look established, and make booking a call effortless.
- **Clinics and studios.** Clear services, online booking and a site patients trust.
- **Shops and online stores.** A fast catalogue and checkout that keeps up with orders.
- **Professional services.** Credibility, case studies and a steady flow of qualified enquiries.

### Work

**H2:** Recent work

For each of two or three projects: \[Client name and industry\] · **Challenge:** \[one sentence\] · **What we built:** \[one sentence\] · **Result:** \[a real, measured outcome\] · \[Link to the case study\]

### Process

**H2:** From first call to launch in four steps

1. **Review.** A free 20-minute call. We look at your current site and where the business is heading.
2. **Plan and design.** Scope, sitemap and a design you approve before we build.
3. **Build and test.** Code, content, then performance and accessibility checks.
4. **Launch and grow.** Go-live, full handover, and an optional care plan.

Typical timeline: \[X to Y weeks, depending on content readiness\].

### Tech and integrations

**H2:** Built on modern tools, connected to the ones you already use

**Body:** We build on Next.js and connect your site to the tools your business runs on. \[Logo row: list only the platforms Grow Tech has actually integrated, for example payments, e-commerce, analytics, CRM and email.\]

### Packages

**H2:** Clear packages. Real prices.

| Package | Best for | Includes | Price |
| --- | --- | --- | --- |
| Launch | New or small businesses | Up to \[5\] pages, mobile-first design, on-page SEO setup, contact form, analytics, handover | From \[$ \] |
| Growth | Businesses ready to generate leads | \[10 to 15\] pages, blog or CMS, lead capture and CRM connection, performance and SEO foundations, \[30\] days of support | From \[$ \] |
| Scale | Stores, bookings, web apps | Custom scope, integrations, ongoing development | Custom quote |

Prices exclude \[hosting, domain, third-party tools\]. Fixed quote after your free review.

### Scorecard

**H2:** We publish our own scorecard

Largest Contentful Paint: \[x.x s\] (Google's good threshold: 2.5 s or less). Interaction to Next Paint: \[xxx ms\] (200 ms or less). Cumulative Layout Shift: \[0.0x\] (0.1 or less). Test this page yourself on PageSpeed Insights.

### Testimonials

**H2:** What clients say

&#91;Two or three real, named quotes with photo, role and company\]

### FAQ

**H2:** Questions owners ask before they hire us

**How much does a website cost?** It depends on pages and features. Packages start at \[$ \], and after your free review you get a fixed quote. Nothing is added later unless you ask for it.

**Why not Wix or Squarespace?** Builders are fine for a first site. Growing businesses usually hit limits on speed, custom features, search performance and ownership. If a builder suits you, we'll tell you.

**Will I own my website?** Yes. Domain, hosting, code and content are in your accounts from day one.

**How long does it take?** Most projects take \[X to Y weeks\]. Having your content ready is the biggest factor.

**Will it rank on Google?** We build in the foundations: speed, structure, metadata and structured data, and we can plan content. No one can honestly promise rankings.

**What happens after launch?** You get a full handover. Many clients add a care plan for hosting, security, updates and monthly improvements.

### Final call to action

**H2:** Let's look at your site together.

**Subhead:** Tell us where your business is heading. We'll send a short, prioritised review within \[2\] working days.

**Form:** Name · Work email · Website address (optional) · What are you hoping to grow?

**Button:** Get my free site review

**Privacy line:** We use your details only to reply to this request.

### Footer

Links: Services · Work · Process · Packages · FAQ. Contact: \[email, phone, location\]. © Grow Tech \[year\]. Privacy policy · Terms.

## Build and launch checklist

- [ ] Confirm target country, currency and whether Grow Tech serves a specific city
- [ ] Replace every \[placeholder\] with a real fact; delete any element Grow Tech cannot prove
- [ ] Set real package prices, timeline and reply-time promises
- [ ] Write one to three case studies with measured results
- [ ] Validate keyword targets in Search Console or a keyword tool
- [ ] Build the page, then run Lighthouse and PageSpeed Insights on a throttled mobile profile
- [ ] Check contrast, keyboard navigation and reduced-motion behaviour
- [ ] Test the form end to end, including spam protection and failure states
- [ ] Add Organization schema, sitemap, robots.txt and Open Graph tags; validate in Google's Rich Results Test
- [ ] Verify the site in Google Search Console and submit the sitemap
- [ ] Set up CTA-click and form-submit events
- [ ] Publish the cost article and two more supporting pieces within the first month
- [ ] Review conversion rate and queries after four weeks

## Sources

As of Oct 2, 2026. Opened and read in full: [web.dev, how Core Web Vitals thresholds were defined](https://web.dev/articles/defining-core-web-vitals-thresholds) and [Search Engine Journal on FAQ rich results](https://www.searchenginejournal.com/google-drops-faq-rich-results-from-search/574429/). The rest were read as search-result excerpts only and not opened, so their figures are unverified: [TechLion cost guide](https://www.techlion.dev/blog/how-much-does-a-website-cost-small-business), [TechLion selection guide](https://www.techlion.dev/blog/how-to-choose-a-web-designer-nj-2026), [Website Setup](https://websitesetup.org/website-cost/), [FormGrid](https://formgrid.dev/blog/how-much-does-a-small-business-website-cost-in-2026), [DEV Community](https://dev.to/allenarduino/how-much-does-a-small-business-website-cost-in-2026-2i0k), [Nano Globals](https://nanoglobals.com/marketing-agency-websites/), [Indie Hackers](https://www.indiehackers.com/post/premium-or-transparent-the-real-decision-behind-every-agency-website-redesign-7136f6133c), [Wavespace](https://www.wavespace.agency/blog/best-landing-page-design-agencies), [Agile Brand Guide](https://www.agilebrandguide.com/wiki/metrics/core-web-vitals-cwv/), [PPC Land](https://ppc.land/core-web-vitals/).
