import { Lead } from '../generated/prisma/client';

export const toLeadDto = (lead: Lead) => ({
  id: lead.id,
  status: lead.status,
  receivedAt: lead.createdAt,
});
