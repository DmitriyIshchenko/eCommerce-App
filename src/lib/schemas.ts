import { z } from "zod";

export const loginSchema = z.object({
	email: z
		.string()
		.min(1, "required")
		.regex(/^(\S|$)/, "must not contain leading whitespace(s)")
		.regex(/.*\S$|^$/, "must not contain trailing whitespace(s)")
		.regex(
			/\b(?:[a-z0-9-]+\.)+[a-z]{2,}\b/,
			"must contain a domain name (e.g., mail.com)",
		)
		.regex(/^[^@]+@[^@]+$/, "must contain an separating '@' symbol")
		.email("must be properly formatted (e.g., e@mail.net)"),
	password: z
		.string()
		.min(8, "at least 8 characters long")
		.regex(/[A-Z]/g, "at least one uppercase letter (A-Z)")
		.regex(/[a-z]/g, "at least one lowercase letter (a-z)")
		.regex(/[0-9]/g, "at least one digit (0-9)")
		.regex(/[!@#$%^&*]/g, "at least one special character (e.g., !@#$%^&*)")
		.regex(/^(\S|$)/, "must not contain leading whitespace(s)")
		.regex(/.*\S$|^$/, "must not contain trailing whitespace(s)"),
	id: z.number().default(101).optional(), // jsonplaceholder возвращает ответ с полем id поэтому добавил поле чтобы парсер не бросал ошибку
});

export type LoginSchema = z.infer<typeof loginSchema>;
