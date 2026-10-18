import { CaseStudy, Service } from '../generated/prisma/client';

export interface ProjectItem {
  id: string;
  number: string;
  category: string;
  title: string;
  description: string;
  tags: string[];
  client: string;
  metrics: string;
  accentBg: string;
}

export interface ServiceGridItem {
  id?: string;
  number: string;
  title: string;
  description: string;
  details: string[];
  slug?: string;
}

export interface ShowcaseCard {
  id: string;
  tag: string;
  title: string;
  metric?: string;
  variant: 'analytics' | 'store' | 'system' | 'mobile' | 'editorial' | 'cloud';
}

export interface IndicatorItem {
  label: string;
  description: string;
}

export interface HeroSectionData {
  headline: string;
  highlightWord: string;
  subhead: string;
  actions?: {
    primary?: string;
    secondary?: string;
  };
  indicators: {
    social: IndicatorItem;
    scale: IndicatorItem;
    launch: IndicatorItem;
  };
  marqueeCards: ShowcaseCard[];
}

export interface NavigationSectionData {
  home?: string;
  about?: string;
  services?: string;
  portfolio?: string;
  clients?: string;
  contact?: string;
  action?: string;
}

export interface ProjectsSectionData {
  badge?: string;
  heading?: string;
  liveCaseLabel?: string;
  statusLabel?: string;
  performanceLabel?: string;
  performanceScore?: string;
}

export interface ServicesSectionData {
  heading?: string;
}

export interface ManifestoSectionData {
  heading: string;
  highlight: string;
  paragraphs: string[];
}

export interface ContactSectionData {
  badge: string;
  heading: string;
  highlight: string;
  subhead: string;
  nameLabel?: string;
  namePlaceholder?: string;
  emailLabel?: string;
  emailPlaceholder?: string;
  messageLabel?: string;
  messagePlaceholder?: string;
  submitLabel?: string;
  submittingLabel?: string;
  requiredFieldsMessage?: string;
  successHeading?: string;
  successMessage?: string;
  newInquiryLabel?: string;
}

export interface PricingSectionData {
  badge?: string;
  heading?: string;
  highlight?: string;
  subhead?: string;
}

export interface FooterSectionData {
  backToTop?: string;
  tagline?: string;
  valueProps?: string[];
}

export interface LandingResponseData {
  hero: HeroSectionData;
  navigation?: NavigationSectionData;
  projectsSection?: ProjectsSectionData;
  projects: ProjectItem[];
  servicesSection?: ServicesSectionData;
  services: ServiceGridItem[];
  pricingSection?: PricingSectionData;
  packages: any[];
  manifesto: ManifestoSectionData;
  contact: ContactSectionData;
  footer?: FooterSectionData;
  caseStudies: any[];
  testimonials: any[];
  faqs: any[];
  generatedAt: string;
}

export const DEFAULT_HERO_DATA: HeroSectionData = {
  headline: 'Websites and apps that are built to grow with your business.',
  highlightWord: 'built to grow',
  subhead:
    'Omnis enim voluptatem, omnis voluptas assumenda est omnis dolor repellendus temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe.',
  indicators: {
    social: {
      label: 'Social',
      description: 'Connected experiences that resonate across social channels and convert.',
    },
    scale: {
      label: 'Scale',
      description:
        'Omnis enim voluptatem, omnis voluptas assumenda est omnis dolor repellendus temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe.',
    },
    launch: {
      label: 'Launch',
      description: 'Rapid zero-friction deployment with guaranteed sub-second delivery.',
    },
  },
  marqueeCards: [
    {
      id: 'card-1',
      tag: 'Next.js 15',
      title: 'High Performance Web Apps',
      metric: '0.6s LCP',
      variant: 'analytics',
    },
    {
      id: 'card-2',
      tag: 'E-Commerce',
      title: 'Headless Checkout Engine',
      metric: '99.98% Uptime',
      variant: 'store',
    },
    {
      id: 'card-3',
      tag: 'Design System',
      title: 'Scalable Component Library',
      metric: '100+ Tokens',
      variant: 'system',
    },
    {
      id: 'card-4',
      tag: 'Mobile First',
      title: 'Cross-Platform Precision',
      metric: '60 FPS Fluid',
      variant: 'mobile',
    },
    {
      id: 'card-5',
      tag: 'Cloud Native',
      title: 'Global Edge & Domain CDN',
      metric: 'Sub-15ms TTFB',
      variant: 'cloud',
    },
    {
      id: 'card-6',
      tag: 'SEO & Speed',
      title: '100/100 Lighthouse Benchmark',
      metric: 'Rank #1 Ready',
      variant: 'editorial',
    },
  ],
};

export const DEFAULT_PROJECTS: ProjectItem[] = [
  {
    id: 'project-1',
    number: '01',
    category: 'WEBSITE DEVELOPMENT',
    title: 'Project 1',
    client: 'Aethel BioTech',
    description:
      'High-performance digital presence and product catalogue with sub-second loading and custom editorial layout.',
    tags: ['Next.js', 'Tailwind CSS', 'TypeScript', 'CMS Integration'],
    metrics: '100/100 Lighthouse · 0.5s LCP',
    accentBg: '#243629',
  },
  {
    id: 'project-2',
    number: '02',
    category: 'WEBSITE DEVELOPMENT',
    title: 'Project 2',
    client: 'Komorebi Design Lab',
    description:
      'Architectural portfolio and client onboarding portal featuring fluid animations and headless commerce checkouts.',
    tags: ['React 19', 'Framer Motion', 'Stripe API', 'Cloudflare Edge'],
    metrics: '+42% Enquiries · 99.99% Uptime',
    accentBg: '#1F2E22',
  },
];

export const DEFAULT_SERVICES: ServiceGridItem[] = [
  {
    number: '1',
    title: 'Website design',
    description:
      'Foundational typography, layout systems, and bespoke responsive interfaces built to convert visitors into lifelong clients.',
    details: ['Typography & Hierarchy', 'Wireframing & UI Prototypes', 'Design Token Architecture'],
  },
  {
    number: '2',
    title: 'Web development',
    description:
      'High performant web apps, interactive experiences, clean modern code with zero bloat and guaranteed sub-second load times.',
    details: ['Next.js & React 19', 'Headless CMS & APIs', 'Performance Engineering'],
  },
  {
    number: '3',
    title: 'Deployment & launch',
    description:
      'Cloud hosting, domain configuration, automated edge CDNs, and complete SEO readiness with Schema.org verification.',
    details: ['Custom Domains & DNS', 'Global Edge Cache', 'Technical SEO Verification'],
  },
  {
    number: '4',
    title: 'Mobile applications',
    description:
      'Intuitive mobile experiences and cross-platform applications engineered for buttery 60 FPS performance and offline reliability.',
    details: ['Responsive Viewports', 'Progressive Web Apps', 'Touch Gesture Precision'],
  },
];

export const DEFAULT_MANIFESTO: ManifestoSectionData = {
  heading: 'We solve problems with design and technology, and stay close while it grows.',
  highlight: 'and stay close while it grows.',
  paragraphs: [
    'Full-spectrum execution from understanding whatever hurdles your digital product faces to custom design and engineering that scales effortlessly as your audience expands.',
    'You remain completely in control throughout our discovery, architecture, and ongoing updates. Every repository, domain, and asset sits in accounts you own from day one.',
  ],
};

export const DEFAULT_CONTACT: ContactSectionData = {
  badge: 'Contact',
  heading: 'Have an idea?',
  highlight: "Let's build it.",
  subhead:
    'Tell us about your targets, timeline, and budget. We reply within one business day with plain advice and zero sales pressure.',
};

export const toProjectDto = (cs: CaseStudy, index = 0): ProjectItem => {
  const metricString = cs.metrics?.length
    ? cs.metrics.map((m) => `${m.value} ${m.label}`).join(' · ')
    : cs.resultSummary || '100/100 Lighthouse · 0.5s LCP';

  return {
    id: cs.id || `project-${index + 1}`,
    number: String(cs.sortOrder || index + 1).padStart(2, '0'),
    category: (cs.industry || 'WEBSITE DEVELOPMENT').toUpperCase(),
    title: cs.clientName ? cs.clientName : `Project ${index + 1}`,
    client: cs.clientName || `Client ${index + 1}`,
    description:
      cs.challenge || cs.solution || cs.resultSummary || 'High-performance digital presence with sub-second loading.',
    tags: cs.techStack?.length ? cs.techStack : ['Next.js', 'Tailwind CSS', 'TypeScript'],
    metrics: metricString,
    accentBg: index % 2 === 0 ? '#243629' : '#1F2E22',
  };
};

export const DEFAULT_PRICING_SECTION: PricingSectionData = {
  badge: 'Transparent Pricing',
  heading: 'Engineered packages built to scale.',
  highlight: 'built to scale.',
  subhead: 'Guaranteed sub-second speed, 100% client code ownership, and zero agency markups.',
};

export const DEFAULT_PACKAGES = [
  {
    id: 'pkg-launch',
    tier: 'LAUNCH',
    name: 'Launch Package',
    bestFor: 'Startups and fast-moving teams needing a sub-second MVP',
    features: [
      'Next.js 15 & React 19 App Router',
      'Sub-second Largest Contentful Paint (<0.8s)',
      'Responsive design & fluid viewports',
      'Technical SEO semantic structure',
      '100% code & domain ownership',
    ],
    priceFrom: 4999,
    currency: 'USD',
    priceNote: 'Fixed scope • 2-3 weeks turnaround',
    isHighlighted: false,
    isActive: true,
    sortOrder: 1,
  },
  {
    id: 'pkg-growth',
    tier: 'GROWTH',
    name: 'Growth Package',
    bestFor: 'Growing businesses demanding conversion and high-throughput stability',
    features: [
      'Everything in Launch Package',
      'Custom headless CMS or Shopify checkout integration',
      'Conversion Rate Optimization (CRO)',
      'Core Web Vitals 95+ score guarantee',
      'Automated analytics & lead pipeline',
      'Priority SLA & direct Slack channel',
    ],
    priceFrom: 9999,
    currency: 'USD',
    priceNote: 'Most popular • 4-6 weeks turnaround',
    isHighlighted: true,
    isActive: true,
    sortOrder: 2,
  },
  {
    id: 'pkg-scale',
    tier: 'SCALE',
    name: 'Scale & Enterprise',
    bestFor: 'Established brands, custom digital products, and high-load web systems',
    features: [
      'Everything in Growth Package',
      'Bespoke full-stack web applications & microservices',
      'Edge caching & high-throughput database design',
      'Role-based access control & security auditing',
      'Comprehensive QA test suite & automated CI/CD',
      'Ongoing technical advisory & SLA support',
    ],
    priceFrom: null,
    currency: 'USD',
    priceNote: 'Custom quote based on technical scope',
    isHighlighted: false,
    isActive: true,
    sortOrder: 3,
  },
];

