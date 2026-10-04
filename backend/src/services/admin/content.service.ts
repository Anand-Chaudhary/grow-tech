import prisma from '../../db/prisma';

// Packages
export const listPackages = async () => prisma.package.findMany({ where: { isActive: true }, orderBy: { sortOrder: 'asc' } });
export const createPackage = async (data: any) => prisma.package.create({ data });
export const getPackage = async (id: string) => prisma.package.findUnique({ where: { id } });
export const updatePackage = async (id: string, data: any) => prisma.package.update({ where: { id }, data });
export const deletePackage = async (id: string) => prisma.package.delete({ where: { id } });

// Services
export const listServices = async () => prisma.service.findMany({ where: { isActive: true }, orderBy: { sortOrder: 'asc' } });
export const createService = async (data: any) => prisma.service.create({ data });
export const getService = async (id: string) => prisma.service.findUnique({ where: { id } });
export const updateService = async (id: string, data: any) => prisma.service.update({ where: { id }, data });
export const deleteService = async (id: string) => prisma.service.delete({ where: { id } });

// FAQs
export const listFaqs = async () => prisma.faq.findMany({ where: { isActive: true }, orderBy: { sortOrder: 'asc' } });
export const createFaq = async (data: any) => prisma.faq.create({ data });
export const getFaq = async (id: string) => prisma.faq.findUnique({ where: { id } });
export const updateFaq = async (id: string, data: any) => prisma.faq.update({ where: { id }, data });
export const deleteFaq = async (id: string) => prisma.faq.delete({ where: { id } });

// Testimonials
export const listTestimonials = async () => prisma.testimonial.findMany({ where: { isPublished: true }, orderBy: { sortOrder: 'asc' } });
export const createTestimonial = async (data: any) => prisma.testimonial.create({ data });
export const getTestimonial = async (id: string) => prisma.testimonial.findUnique({ where: { id } });
export const updateTestimonial = async (id: string, data: any) => prisma.testimonial.update({ where: { id }, data });
export const deleteTestimonial = async (id: string) => prisma.testimonial.delete({ where: { id } });

// Case Studies
export const listCaseStudies = async (page = 1, limit = 20) => {
  const skip = (page - 1) * limit;
  const [data, total] = await Promise.all([
    prisma.caseStudy.findMany({ where: { isPublished: true }, orderBy: [{ sortOrder: 'asc' }, { publishedAt: 'desc' }], skip, take: limit }),
    prisma.caseStudy.count({ where: { isPublished: true } }),
  ]);
  const totalPages = Math.ceil(total / limit);
  return { data, meta: { page, limit, total, totalPages } };
};
export const createCaseStudy = async (data: any) => prisma.caseStudy.create({ data });
export const getCaseStudy = async (id: string) => prisma.caseStudy.findUnique({ where: { id } });
export const updateCaseStudy = async (id: string, data: any) => prisma.caseStudy.update({ where: { id }, data });
export const deleteCaseStudy = async (id: string) => prisma.caseStudy.delete({ where: { id } });

// Posts
export const listPosts = async (page = 1, limit = 20) => {
  const skip = (page - 1) * limit;
  const [data, total] = await Promise.all([
    prisma.post.findMany({ where: { status: 'PUBLISHED' }, orderBy: { publishedAt: 'desc' }, skip, take: limit }),
    prisma.post.count({ where: { status: 'PUBLISHED' } }),
  ]);
  const totalPages = Math.ceil(total / limit);
  return { data, meta: { page, limit, total, totalPages } };
};
export const createPost = async (data: any) => prisma.post.create({ data });
export const getPost = async (id: string) => prisma.post.findUnique({ where: { id } });
export const updatePost = async (id: string, data: any) => prisma.post.update({ where: { id }, data });
export const deletePost = async (id: string) => prisma.post.delete({ where: { id } });
export const publishPost = async (id: string, publishedAt?: string) => prisma.post.update({
  where: { id },
  data: { status: 'PUBLISHED', publishedAt: publishedAt ? new Date(publishedAt) : new Date() },
});
export const unpublishPost = async (id: string) => prisma.post.update({
  where: { id },
  data: { status: 'DRAFT', publishedAt: null },
});
