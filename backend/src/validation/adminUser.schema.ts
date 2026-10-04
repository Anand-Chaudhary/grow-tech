import { z } from 'zod';

export const adminUserPatchSchema = z.object({
  name: z.string().min(2).max(100).optional(),
  role: z.enum(['OWNER', 'EDITOR']).optional(),
  isActive: z.boolean().optional(),
});
