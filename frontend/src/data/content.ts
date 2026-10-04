export interface ServiceItem {
  id: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  tileBg: "sand" | "forest" | "sage" | "ink";
  textColor: "ink" | "cream";
  colSpanDesktop: 8 | 4;
  features: string[];
  deliverables: string[];
  metricBadge: string;
}

export interface CaseStudy {
  id: string;
  client: string;
  industry: string;
  headline: string;
  challenge: string;
  whatWeBuilt: string;
  result: string;
  metrics: { label: string; value: string }[];
  tags: string[];
  year: string;
  accentBg: string;
}

export interface PricingPlan {
  name: string;
  price: string;
  cadence: string;
  bestFor: string;
  description: string;
  highlighted: boolean;
  tileBg: "sand" | "forest" | "ink";
  textColor: "ink" | "cream";
  features: string[];
  deliverables: string[];
  ctaText: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export const SERVICES: ServiceItem[] = [
  {
    id: "business-websites",
    title: "Business websites",
    shortDesc: "Fast, search-ready sites that explain what you do and make the next step obvious.",
    fullDesc:
      "Crafted on modern Next.js architecture with zero bloated page builders. Optimized for instantaneous page loads on mobile phones, clear editorial messaging, and an enquiry pathway engineered into every screen.",
    tileBg: "sand",
    textColor: "ink",
    colSpanDesktop: 8,
    features: [
      "Sub-second mobile loading (LCP < 1.2s)",
      "Editorial typography with custom layout hierarchy",
      "Semantic HTML & full Schema.org structured data",
      "Lead conversion pathways and frictionless forms"
    ],
    deliverables: [
      "Custom responsive interface & production Next.js code",
      "SEO metadata & Google Search Console verification",
      "Full ownership transfer of domain, hosting, and code repository",
      "Self-service CMS training walkthrough"
    ],
    metricBadge: "0.7s avg LCP"
  },
  {
    id: "online-stores",
    title: "Online stores",
    shortDesc: "Catalogues, payments and inventory that hold up as orders grow.",
    fullDesc:
      "E-commerce without sluggish plugin overhead. Headless Shopify or Stripe-powered custom checkouts with high-speed catalog filtering, sub-second product pages, and resilient inventory sync.",
    tileBg: "forest",
    textColor: "cream",
    colSpanDesktop: 4,
    features: [
      "Headless checkout with Stripe or Shopify",
      "Instant faceted search and catalog filtering",
      "Zero-latency cart drawer and one-click purchase",
      "Automated order confirmation and receipt flows"
    ],
    deliverables: [
      "Catalog and product schema integration",
      "Secure webhook event listeners for payment",
      "Taxes, shipping rate calculator, and inventory tracking",
      "Mobile checkout conversion optimization"
    ],
    metricBadge: "100% Checkout Uptime"
  },
  {
    id: "booking-lead-systems",
    title: "Booking and lead systems",
    shortDesc: "Forms, bookings and CRM connections so no enquiry slips through.",
    fullDesc:
      "Convert visitors into booked appointments and qualified leads directly on your site. Integrated with Cal.com, Calendly, HubSpot, or custom PostgreSQL databases with zero sync lag.",
    tileBg: "sage",
    textColor: "ink",
    colSpanDesktop: 4,
    features: [
      "Two-way calendar sync with automatic timezone handling",
      "Multi-step lead qualification forms",
      "Automated SMS & email booking reminders",
      "Direct CRM ingestion (HubSpot, Notion, or custom)"
    ],
    deliverables: [
      "Custom embeddable booking flow matching brand typography",
      "Spam protection with honeypots & Cloudflare Turnstile",
      "Automatic fallback notifications for unconfirmed leads",
      "Customer intake questionnaire database"
    ],
    metricBadge: "3.4x booking rate"
  },
  {
    id: "care-growth-plans",
    title: "Care and growth plans",
    shortDesc: "Hosting, security, updates and monthly improvements so your site keeps up with you.",
    fullDesc:
      "Never worry about abandoned plugins, unexpected downtime, or stale content. We actively monitor Core Web Vitals, deploy security patches, and allocate dedicated developer hours each month for iterative conversion improvements.",
    tileBg: "ink",
    textColor: "cream",
    colSpanDesktop: 8,
    features: [
      "24/7 uptime monitoring & automated health pings",
      "Monthly performance & Core Web Vitals audits",
      "Dedicated continuous engineering hours for enhancements",
      "Zero lock-in: cancel anytime, keep everything"
    ],
    deliverables: [
      "Monthly executive progress & search analytics scorecard",
      "DNS, SSL, and serverless edge maintenance",
      "Content updates and new landing page variations",
      "Direct Slack/email priority support channel"
    ],
    metricBadge: "100% CWV Score"
  }
];

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: "apex-health",
    client: "Apex Health Studio",
    industry: "Specialized Physical Therapy & Sports Rehab",
    headline: "Replacing a 7-second WordPress monolith with a 0.6s Next.js booking engine",
    challenge: "Apex was losing up to 45% of mobile ad traffic due to slow load times and a buried, multi-step booking widget.",
    whatWeBuilt: "Engineered a custom editorial Next.js web application with inline calendar triage, instant insurance verification lookup, and localized clinic routing.",
    result: "+118% increase in direct mobile consultations booked within 60 days of launch; 0.6s LCP measured in Google Search Console.",
    metrics: [
      { label: "Consultation Bookings", value: "+118%" },
      { label: "Mobile LCP", value: "0.6s" },
      { label: "Bounce Rate", value: "-41%" }
    ],
    tags: ["Next.js", "Cal.com API", "Tailwind", "Vercel Edge"],
    year: "2026",
    accentBg: "#EFE8D8"
  },
  {
    id: "terra-architectural",
    client: "Terra Architectural Supply",
    industry: "Commercial Building Materials & Specifiers",
    headline: "Turning a dense 400-item PDF catalog into an instant specification and sample ordering portal",
    challenge: "Architects and general contractors had to download 60MB PDFs and email back-and-forth for physical material samples.",
    whatWeBuilt: "Built a high-performance searchable material library with instantaneous search-as-you-type, automated spec sheet PDF generation, and one-click trade sample dispatch.",
    result: "+84% commercial lead flow; trade sample requests increased from 14/mo to 110/mo with zero manual staff intervention.",
    metrics: [
      { label: "Sample Inquiries", value: "+84%" },
      { label: "Spec Search Time", value: "< 50ms" },
      { label: "Core Web Vitals", value: "100/100" }
    ],
    tags: ["Next.js", "Algolia", "Sanity CMS", "Stripe"],
    year: "2026",
    accentBg: "#CFD8C4"
  },
  {
    id: "beacon-wealth",
    client: "Beacon Wealth Partners",
    industry: "Fiduciary Wealth Management",
    headline: "Establishing unmatched digital credibility and transparent fee calculators for high-net-worth clients",
    challenge: "Their template website looked generic, failed to establish institutional trust, and leaked prospective client inquiries.",
    whatWeBuilt: "Crafted a quiet-luxury editorial site featuring a custom interactive retirement modeling widget, transparent fee comparison breakdown, and verified client testimonials.",
    result: "$12.4M in new portfolio assets initiated via digital intake in the first quarter post-launch.",
    metrics: [
      { label: "New Assets Initiated", value: "$12.4M" },
      { label: "Intake Completion", value: "78%" },
      { label: "Lighthouse Score", value: "100" }
    ],
    tags: ["Next.js", "TypeScript", "HubSpot CRM", "Security Headers"],
    year: "2026",
    accentBg: "#D8CDB6"
  }
];

export const PRICING_PLANS: PricingPlan[] = [
  {
    name: "Launch",
    price: "$2,400",
    cadence: "one-time",
    bestFor: "New or growing businesses needing a credible, high-converting digital home",
    description: "Everything required to look established, explain your offer, and turn visitors into enquiries.",
    highlighted: false,
    tileBg: "sand",
    textColor: "ink",
    features: [
      "Up to 5 bespoke pages (Home, About, Services, Work, Contact)",
      "Mobile-first responsive architecture with 0.8s avg LCP",
      "On-page SEO setup (Schema, OpenGraph, sitemap, meta tags)",
      "High-converting contact & enquiry routing",
      "Google Search Console & GA4 analytics connection",
      "Full ownership transfer: 100% of domain, code & host"
    ],
    deliverables: [
      "Custom Figma design approved before code",
      "Production Next.js build deployed to Vercel",
      "Handover guide & video walk-through",
      "14 days post-launch warranty & tuning"
    ],
    ctaText: "Book free site review"
  },
  {
    name: "Growth",
    price: "$4,800",
    cadence: "one-time",
    bestFor: "Businesses ready to scale inbound lead generation and dominate search",
    description: "Our flagship package. Deep content architecture, CMS publishing, and custom lead generation pathways.",
    highlighted: true,
    tileBg: "forest",
    textColor: "cream",
    features: [
      "Up to 12-15 custom pages + Headless CMS setup",
      "Dynamic blog / case studies engine for SEO content",
      "Advanced lead capture (multi-step triage, calendar sync)",
      "Direct CRM integration (HubSpot, Mailchimp, or custom)",
      "Performance budget compliance (LCP < 1.0s, CLS 0)",
      "Client-owned infrastructure & zero vendor lock-in"
    ],
    deliverables: [
      "Interactive component prototypes",
      "Tailored Next.js + Tailwind + Sanity / Supabase stack",
      "Complete documentation & handover checklist",
      "30 days of priority post-launch support & tuning"
    ],
    ctaText: "Start with Growth"
  },
  {
    name: "Scale",
    price: "Custom quote",
    cadence: "tailored scope",
    bestFor: "E-commerce stores, custom booking platforms, and web applications",
    description: "Complex transactional requirements, membership portals, and bespoke integrations.",
    highlighted: false,
    tileBg: "sand",
    textColor: "ink",
    features: [
      "Custom e-commerce (Stripe / Headless Shopify)",
      "Bespoke database architecture & authentication",
      "API integrations (inventory, ERP, specialized CRMs)",
      "Role-based portals & customer dashboards",
      "Sub-second global CDN edge caching",
      "Enterprise security headers & strict WCAG 2.2 AA"
    ],
    deliverables: [
      "Technical architecture specification document",
      "Production CI/CD pipelines & automated test suite",
      "Dedicated engineering sprints & weekly progress demos",
      "Ongoing engineering care plan option"
    ],
    ctaText: "Discuss custom build"
  }
];

export const FAQS: FaqItem[] = [
  {
    question: "How much does a website cost with Grow Tech?",
    answer:
      "Our package pricing is published in the open: our Launch tier starts at $2,400, and our Growth tier starts at $4,800. For complex e-commerce, web applications, or custom portals, we provide a written, fixed-scope quote after your free 20-minute site review. We never charge surprise fees or change the price mid-project unless you explicitly add scope."
  },
  {
    question: "Why choose Grow Tech instead of Wix or Squarespace?",
    answer:
      "Website builders are great for testing a side project on day one. But as your business scales, DIY templates become a severe bottleneck: bloated script overhead leads to poor mobile speed, limited SEO control suppresses Google rankings, and you are forever locked into their proprietary hosting. We build lightweight, bespoke Next.js sites that load in under 1 second, rank cleanly, and give you 100% independent ownership."
  },
  {
    question: "Will I actually own my website?",
    answer:
      "Yes, completely and unconditionally. Domain, hosting, Git repository, database, and content live inside accounts registered under your name from day one. If you ever decide to part ways with Grow Tech, you take your entire codebase with you without needing our permission."
  },
  {
    question: "How long does a website build take from start to finish?",
    answer:
      "A typical Launch package is completed in 2 to 3 weeks. A Growth package usually takes 4 to 5 weeks depending on custom integrations and content readiness. Having your branding assets and copy outlines ready is the largest factor in accelerating launch."
  },
  {
    question: "Will my new website rank on Google?",
    answer:
      "We engineer the technical foundations that search engines reward: near-instant Core Web Vitals, semantic HTML5 landmarks, Schema.org Organization and Service markup, clean canonical URLs, and mobile responsiveness. While no honest agency can guarantee #1 placement, our sites routinely pass Google's audit with perfect 100/100 scores."
  },
  {
    question: "What happens after the website launches?",
    answer:
      "Every project concludes with a thorough recorded handover and a 14 to 30 day warranty period where any tweaks are handled immediately. Afterward, you can manage the site yourself or enroll in one of our monthly Care & Growth plans where we take care of hosting, security, backups, and monthly conversion enhancements."
  }
];

export const TESTIMONIALS = [
  {
    quote:
      "Before Grow Tech, our clinic's site took over 6 seconds to load on mobile. We were burning ad dollars without knowing why. Within three weeks of launching the new site, our direct patient inquiries doubled and we hit a 99/100 mobile speed score.",
    author: "Dr. Marcus Vance",
    role: "Founder & Clinical Director",
    company: "Apex Health Studio",
    avatar: "MV",
    verifiedMetric: "+118% Inquiries"
  },
  {
    quote:
      "Every other agency gave us murky estimates and tried to lock our code into their proprietary WordPress host. Grow Tech published their price, handed over the GitHub repo on day one, and delivered three days ahead of schedule. Rare integrity.",
    author: "Elena Rostova",
    role: "Managing Partner",
    company: "Terra Architectural Supply",
    avatar: "ER",
    verifiedMetric: "100/100 Lighthouse"
  },
  {
    quote:
      "The site paid for itself within the first 45 days. Our prospective clients constantly mention how polished, fast, and trustworthy our digital presence feels compared to our competitors.",
    author: "Julian Mercer",
    role: "Principal Advisor",
    company: "Beacon Wealth Partners",
    avatar: "JM",
    verifiedMetric: "$12.4M Pipeline"
  }
];

export const PROCESS_STEPS = [
  {
    step: "01",
    title: "Review",
    duration: "20 min call",
    desc: "A focused conversation to diagnose your current site bottlenecks, traffic drop-offs, and where your business is heading. No sales pitch decks.",
    deliverable: "Prioritised technical diagnostic & fixed quote"
  },
  {
    step: "02",
    title: "Plan & Design",
    duration: "Week 1",
    desc: "We establish the sitemap, editorial messaging hierarchy, and wireframes. You review and approve the exact visual design before code begins.",
    deliverable: "Full visual Figma prototype & approved scope"
  },
  {
    step: "03",
    title: "Build & Test",
    duration: "Weeks 2-3",
    desc: "We write clean, semantic Next.js and TypeScript. We test against stringent performance budgets, accessibility criteria, and cross-device breakpoints.",
    deliverable: "Production code with verified 100/100 CWV lab tests"
  },
  {
    step: "04",
    title: "Launch & Grow",
    duration: "Week 4+",
    desc: "Seamless DNS cutover, zero downtime switch, complete account credentials handover, and optional ongoing care plan activation.",
    deliverable: "100% client account handover & warranty"
  }
];

export const TECH_STACK = [
  { name: "Next.js", category: "Core Framework", desc: "Server-side rendering & static generation for sub-second delivery" },
  { name: "TypeScript", category: "Language", desc: "Type-safe engineering for zero runtime surprises" },
  { name: "Tailwind CSS", category: "Styling", desc: "Bespoke design systems with zero bloat or render blocking" },
  { name: "Vercel Edge", category: "Infrastructure", desc: "Global edge CDN distribution with 99.99% reliability" },
  { name: "Stripe", category: "Payments", desc: "Secure, PCI-compliant transactional checkouts" },
  { name: "Supabase / Postgres", category: "Database", desc: "Relational database backends for booking and user records" },
  { name: "Sanity CMS", category: "Content", desc: "Structured, effortless content editing for non-technical teams" },
  { name: "Google Analytics 4", category: "Analytics", desc: "Lightweight privacy-first event tracking without speed hits" }
];
