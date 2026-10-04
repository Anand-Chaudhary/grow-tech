import { z } from 'zod';

export const leadSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email().max(254),
  websiteUrl: z.string().url().max(2048).optional(),
  goal: z.string().min(10).max(1000),
  packageTier: z.enum(['LAUNCH', 'GROWTH', 'SCALE', 'NOT_SURE']).optional(),
  utm: z.object({
    source: z.string().max(200).optional(),
    medium: z.string().max(200).optional(),
    campaign: z.string().max(200).optional(),
    term: z.string().max(200).optional(),
    content: z.string().max(200).optional(),
    referrer: z.string().max(200).optional(),
    landingPath: z.string().max(200).optional(),
  }).optional(),
  hp: z.string().max(0).optional(), // honeypot must be empty
});
