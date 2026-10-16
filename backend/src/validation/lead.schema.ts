import { z } from 'zod';

export const leadSchema = z
  .object({
    name: z.string().min(2).max(100),
    email: z.string().email().max(254),
    websiteUrl: z.string().url().max(2048).optional().or(z.literal('')).nullable(),
    goal: z.string().min(2).max(1000).optional(),
    message: z.string().min(2).max(1000).optional(),
    packageTier: z.enum(['LAUNCH', 'GROWTH', 'SCALE', 'NOT_SURE']).optional(),
    utm: z
      .object({
        source: z.string().max(200).optional(),
        medium: z.string().max(200).optional(),
        campaign: z.string().max(200).optional(),
        term: z.string().max(200).optional(),
        content: z.string().max(200).optional(),
        referrer: z.string().max(200).optional(),
        landingPath: z.string().max(200).optional(),
      })
      .optional(),
    hp: z.string().max(0).optional(), // honeypot must be empty
  })
  .refine((data) => Boolean(data.goal || data.message), {
    message: 'Either goal or message is required',
    path: ['message'],
  });
