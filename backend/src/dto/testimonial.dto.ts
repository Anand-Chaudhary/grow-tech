import { Testimonial } from '../generated/prisma/client';

export const toTestimonialDto = (t: Testimonial) => ({
  id: t.id,
  authorName: t.authorName,
  authorRole: t.authorRole ?? null,
  company: t.company ?? null,
  quote: t.quote,
  avatarUrl: t.avatarUrl ?? null,
  caseStudySlug: t.caseStudy?.slug ?? null,
});
