import prisma from '../db/prisma';
import { toPackageDto } from '../dto/package.dto';
import { toServiceDto } from '../dto/service.dto';
import { toFaqDto } from '../dto/faq.dto';
import { toTestimonialDto } from '../dto/testimonial.dto';
import { toCaseStudyDto } from '../dto/casestudy.dto';
import { toPostDto } from '../dto/post.dto';
import {
  DEFAULT_HERO_DATA,
  DEFAULT_PROJECTS,
  DEFAULT_SERVICES,
  DEFAULT_MANIFESTO,
  DEFAULT_CONTACT,
  DEFAULT_PRICING_SECTION,
  DEFAULT_PACKAGES,
  toProjectDto,
} from '../dto/landing.dto';

import * as landingService from './landing.service';

export const getLandingData = async () => {
  const [services, packages, testimonials, faqs] = await Promise.all([
    prisma.service.findMany({ where: { isActive: true }, orderBy: { sortOrder: 'asc' } }),
    prisma.package.findMany({ where: { isActive: true }, orderBy: { sortOrder: 'asc' } }),
    prisma.testimonial.findMany({ where: { isPublished: true }, orderBy: { sortOrder: 'asc' } }),
    prisma.faq.findMany({ where: { isActive: true }, orderBy: { sortOrder: 'asc' } }),
  ]);

  const caseStudies = await prisma.caseStudy.findMany({
    where: { isPublished: true },
    orderBy: [{ sortOrder: 'asc' }, { publishedAt: 'desc' }],
    take: 6,
  });

  // Map services into the new 2x2 grid structure (fallback to defaults if empty)
  const mappedServices =
    services.length > 0
      ? services.map((svc, idx) => toServiceDto(svc, idx))
      : DEFAULT_SERVICES;

  // Map case studies into project items (fallback to defaults if empty)
  const mappedProjects =
    caseStudies.length > 0
      ? caseStudies.map((cs, idx) => toProjectDto(cs, idx))
      : DEFAULT_PROJECTS;

  // Load any custom overrides saved via the admin UI. These may contain partial fields such as hero, manifesto, or contact.
  const overrides = await landingService.loadLandingOverrides();

  const mappedPackages =
    overrides.packages ??
    (packages.length > 0 ? packages.map(toPackageDto) : DEFAULT_PACKAGES);

  return {
    hero: overrides.hero ?? DEFAULT_HERO_DATA,
    navigation: overrides.navigation,
    projectsSection: overrides.projectsSection,
    projects: overrides.projects ?? mappedProjects,
    servicesSection: overrides.servicesSection,
    services: overrides.services ?? mappedServices,
    pricingSection: overrides.pricingSection ?? DEFAULT_PRICING_SECTION,
    packages: mappedPackages,
    manifesto: overrides.manifesto ?? DEFAULT_MANIFESTO,
    contact: overrides.contact ?? DEFAULT_CONTACT,
    footer: overrides.footer,
    // Preserved for backwards compatibility with other consumers
    caseStudies: caseStudies.map(toCaseStudyDto),
    testimonials: testimonials.map(toTestimonialDto),
    faqs: faqs.map(toFaqDto),
    generatedAt: new Date().toISOString(),
  };
};

export const listPackages = async () => {
  const pkgs = await prisma.package.findMany({ where: { isActive: true }, orderBy: { sortOrder: 'asc' } });
  return pkgs.map(toPackageDto);
};

export const listServices = async () => {
  const svcs = await prisma.service.findMany({ where: { isActive: true }, orderBy: { sortOrder: 'asc' } });
  return svcs.map((svc, idx) => toServiceDto(svc, idx));
};

export const listFaqs = async () => {
  const f = await prisma.faq.findMany({ where: { isActive: true }, orderBy: { sortOrder: 'asc' } });
  return f.map(toFaqDto);
};

export const listTestimonials = async () => {
  const t = await prisma.testimonial.findMany({ where: { isPublished: true }, orderBy: { sortOrder: 'asc' } });
  return t.map(toTestimonialDto);
};

export const listCaseStudies = async (page = 1, limit = 20) => {
  const skip = (page - 1) * limit;
  const [data, total] = await Promise.all([
    prisma.caseStudy.findMany({
      where: { isPublished: true },
      orderBy: [{ sortOrder: 'asc' }, { publishedAt: 'desc' }],
      skip,
      take: limit,
    }),
    prisma.caseStudy.count({ where: { isPublished: true } }),
  ]);
  const totalPages = Math.ceil(total / limit);
  return { data: data.map(toCaseStudyDto), meta: { page, limit, total, totalPages } };
};

export const getCaseStudyBySlug = async (slug: string) => {
  const cs = await prisma.caseStudy.findUnique({
    where: { slug },
    include: { testimonials: true },
  });
  if (!cs) return null;
  return { ...toCaseStudyDto(cs), testimonials: cs.testimonials.map(toTestimonialDto) };
};

export const listPosts = async (page = 1, limit = 20) => {
  const skip = (page - 1) * limit;
  const [data, total] = await Promise.all([
    prisma.post.findMany({
      where: { status: 'PUBLISHED' },
      orderBy: { publishedAt: 'desc' },
      skip,
      take: limit,
    }),
    prisma.post.count({ where: { status: 'PUBLISHED' } }),
  ]);
  const totalPages = Math.ceil(total / limit);
  return { data: data.map(toPostDto), meta: { page, limit, total, totalPages } };
};

export const getPostBySlug = async (slug: string) => {
  const p = await prisma.post.findUnique({ where: { slug, status: 'PUBLISHED' } });
  if (!p) return null;
  return toPostDto(p);
};
