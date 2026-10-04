import { z } from 'zod';

export const genericCreateSchema = z.object({}).passthrough(); // Accept any fields
export const genericUpdateSchema = z.object({}).passthrough();
