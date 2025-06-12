import z from 'zod';

export const productSearchSchema = z.object({
  q: z.string().catch('').optional(),
  colors: z.array(z.string()).optional(),
  materials: z.array(z.string()).optional(),
  minPrice: z.number().optional(),
  maxPrice: z.number().optional(),
  sort: z.string().optional(),
  page: z.number().optional(),
});

export type ProductSearchSchema = z.infer<typeof productSearchSchema>;
