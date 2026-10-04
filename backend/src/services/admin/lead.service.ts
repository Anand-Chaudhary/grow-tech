import prisma from '../../db/prisma';
import { LeadStatus } from '../../generated/prisma/client';

interface LeadFilters {
  status?: LeadStatus;
  packageTier?: string;
  q?: string;
  from?: string;
  to?: string;
  page?: number;
  limit?: number;
}

export const listLeads = async (filters: LeadFilters) => {
  const where: any = {};
  if (filters.status) where.status = filters.status;
  if (filters.packageTier) where.packageTier = filters.packageTier;
  if (filters.q) {
    where.OR = [
      { name: { contains: filters.q, mode: 'insensitive' } },
      { email: { contains: filters.q, mode: 'insensitive' } },
      { websiteUrl: { contains: filters.q, mode: 'insensitive' } },
    ];
  }
  if (filters.from || filters.to) {
    where.createdAt = {};
    if (filters.from) where.createdAt.gte = new Date(filters.from);
    if (filters.to) where.createdAt.lte = new Date(filters.to);
  }

  const page = filters.page ?? 1;
  const limit = filters.limit ?? 20;
  const skip = (page - 1) * limit;

  const [data, total] = await Promise.all([
    prisma.lead.findMany({ where, skip, take: limit, orderBy: { createdAt: 'desc' } }),
    prisma.lead.count({ where }),
  ]);

  const totalPages = Math.ceil(total / limit);
  return { data, meta: { page, limit, total, totalPages } };
};

export const getLeadById = async (id: string) => prisma.lead.findUnique({ where: { id } });

export const updateLead = async (id: string, updates: { status?: LeadStatus; notes?: string }) => {
  const existing = await prisma.lead.findUnique({ where: { id } });
  if (!existing) {
    const err: any = new Error('Lead not found');
    err.status = 404;
    throw err;
  }
  const data: any = { ...updates };
  if (updates.status && existing.status !== updates.status && updates.status === 'CONTACTED') {
    data.contactedAt = new Date();
  }
  return prisma.lead.update({ where: { id }, data });
};

export const deleteLead = async (id: string) => prisma.lead.delete({ where: { id } });
