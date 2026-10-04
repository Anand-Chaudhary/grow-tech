import prisma from '../db/prisma';
import { Lead } from '../generated/prisma/client';

const duplicateMap = new Map<string, number>(); // email -> timestamp (ms)
const DUPLICATE_WINDOW_MS = 10 * 60 * 1000; // 10 minutes

export const createLead = async (data: {
  name: string;
  email: string;
  websiteUrl?: string;
  goal: string;
  packageTier?: string;
  utm?: any;
}) => {
  const now = Date.now();
  const existing = duplicateMap.get(data.email);
  if (existing && now - existing < DUPLICATE_WINDOW_MS) {
    const err: any = new Error('Duplicate lead submission');
    err.status = 409;
    throw err;
  }

  const lead = await prisma.lead.create({
    data: {
      name: data.name,
      email: data.email,
      websiteUrl: data.websiteUrl,
      goal: data.goal,
      packageTier: data.packageTier,
      utm: data.utm,
    },
  });

  duplicateMap.set(data.email, now);
  // Cleanup stale entries
  duplicateMap.forEach((ts, email) => {
    if (now - ts > DUPLICATE_WINDOW_MS) duplicateMap.delete(email);
  });

  return lead;
};
