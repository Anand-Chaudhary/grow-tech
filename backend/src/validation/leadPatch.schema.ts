import { z } from 'zod';

export const leadPatchSchema = z.object({
  status: z.enum(['NEW', 'CONTACTED', 'QUALIFIED', 'WON', 'LOST', 'SPAM']).optional(),
  notes: z.string().max(5000).optional(),
});
