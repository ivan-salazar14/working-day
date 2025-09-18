import { z } from 'zod';

export const BusinessDateRequestSchema = z.object({
  days: z.number().positive().optional(),
  hours: z.number().positive().optional(),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z$/, 'Date must be in ISO 8601 UTC format with Z suffix').optional(),
}).refine((data) => data.days !== undefined || data.hours !== undefined, {
  message: 'At least one of days or hours must be provided',
});

export type BusinessDateRequest = z.infer<typeof BusinessDateRequestSchema>;