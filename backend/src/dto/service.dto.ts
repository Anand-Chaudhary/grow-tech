import { Service } from '../generated/prisma/client';

export interface ServiceGridItem {
  id?: string;
  number: string;
  title: string;
  description: string;
  details: string[];
  slug?: string;
}

const DEFAULT_SERVICE_DETAILS: Record<string, string[]> = {
  'website design': ['Typography & Hierarchy', 'Wireframing & UI Prototypes', 'Design Token Architecture'],
  'design': ['Typography & Hierarchy', 'Wireframing & UI Prototypes', 'Design Token Architecture'],
  'web development': ['Next.js & React 19', 'Headless CMS & APIs', 'Performance Engineering'],
  'development': ['Next.js & React 19', 'Headless CMS & APIs', 'Performance Engineering'],
  'deployment & launch': ['Custom Domains & DNS', 'Global Edge Cache', 'Technical SEO Verification'],
  'deployment': ['Custom Domains & DNS', 'Global Edge Cache', 'Technical SEO Verification'],
  'seo': ['Custom Domains & DNS', 'Global Edge Cache', 'Technical SEO Verification'],
  'mobile applications': ['Responsive Viewports', 'Progressive Web Apps', 'Touch Gesture Precision'],
  'marketing': ['Responsive Viewports', 'Progressive Web Apps', 'Touch Gesture Precision'],
};

export const toServiceDto = (svc: Service, index = 0): ServiceGridItem => {
  const key = (svc.title || svc.slug || '').toLowerCase();
  const details = DEFAULT_SERVICE_DETAILS[key] || [
    'Performance Engineering',
    'Tailored Architecture',
    'Zero Lock-in',
  ];

  return {
    id: svc.id,
    number: String(svc.sortOrder || index + 1),
    title: svc.title,
    description: svc.description,
    details,
    slug: svc.slug,
  };
};
