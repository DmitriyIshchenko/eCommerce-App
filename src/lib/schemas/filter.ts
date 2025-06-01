import { z } from "zod";

export const filterSchema = z.object({
	page: z.number().optional(),
	minPrice: z.number().optional(),
	maxPrice: z.number().optional(),
	color: z.array(z.string()).optional(),
	material: z.array(z.string()).optional(),
});

export type FilterSchema = z.infer<typeof filterSchema>;
