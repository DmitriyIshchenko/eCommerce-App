import z from 'zod';

export const productSearchSchema = z.object({
  q: z.string().catch(''),
});

export type ProductSearchSchema = z.infer<typeof productSearchSchema>;
