import { z } from 'zod';

export const categorySchema = z.object({
  category: z.string(),
});

export const subcategorySchema = categorySchema.extend({
  subcategory: z.string(),
});

export const productSchema = z.object({
  category: z.string(),
  subcategory: z.string(),
  color: z.string(),
  material: z.string(),
  price: z.number(),
  id: z.number(),
});

export type Product = z.infer<typeof productSchema>;

export const productsSchema = z.array(productSchema);

const categoriesSchema = z.object({
  id: z.string(),
  parent: z.object({ id: z.string() }).optional(),
  ancestors: z.array(z.object({ id: z.string() })),
  name: z.string(),
});

export type Category = z.infer<typeof categoriesSchema>;

export const fakeProductResponseSchema = z.object({
  products: productsSchema,
  totalPages: z.number(),
  minPrice: z.number(),
  maxPrice: z.number(),
  categories: z.array(categoriesSchema),
});

const fakeCategories = ['first', 'second', 'third'];
const fakeSubcategories = ['first', 'second', 'third'];
const fakeColors = ['red', 'orange', 'light-green'];
const fakeMaterials = ['canvas', 'giclee', 'photorag'];

export const fakeProducts: Product[] = [...Array(210).keys()].map((i) => ({
  category: fakeCategories[Math.floor(Math.random() * fakeCategories.length)],
  subcategory: fakeSubcategories[Math.floor(Math.random() * fakeSubcategories.length)],
  color: fakeColors[Math.floor(Math.random() * fakeColors.length)],
  material: fakeMaterials[Math.floor(Math.random() * fakeMaterials.length)],
  price: Math.round(Math.random() * 5000),
  id: i + 1,
}));
