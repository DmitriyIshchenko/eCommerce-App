import z from 'zod';

export const productSearchSchema = z.object({
  q: z.string().catch('').optional(),
  color: z.string().optional(),
  material: z.string().optional(),
  minPrice: z.number().optional(),
  maxPrice: z.number().optional(),
});

export type ProductSearchSchema = z.infer<typeof productSearchSchema>;
