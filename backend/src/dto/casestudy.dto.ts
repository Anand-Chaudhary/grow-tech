import { CaseStudy } from '../generated/prisma/client';

export const toCaseStudyDto = (cs: CaseStudy) => ({
  id: cs.id,
  slug: cs.slug,
  clientName: cs.clientName,
  industry: cs.industry,
  resultSummary: cs.resultSummary,
  coverImageUrl: cs.coverImageUrl ?? null,
  metrics: cs.metrics?.map(m => ({ label: m.label, value: m.value })) ?? [],
});
