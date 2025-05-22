import { z } from "zod";
import { countries } from "../components/registration-form/country-options";

const MIN_AGE = 13;

export const loginSchema = z.object({
	email: z
		.string()
		.min(1, "required")
		.regex(/^(\S|$)/, "must not contain leading whitespace(s)")
		.regex(/.*\S$|^$/, "must not contain trailing whitespace(s)")
		.regex(
			/\b(?:[a-z0-9-]+\.)+[a-z]{2,}\b/,
			"must contain a domain name (e.g., mail.io)",
		)
		.regex(/^[^@]+@[^@]+$/, "must contain an separating '@' symbol")
		.email("must be properly formatted (e.g., e@mail.io)"),
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

const addressSchema = z
	.object({
		street: z
			.string()
			.min(1, "required")
			.regex(/^[A-Za-z]*$/, "must contain only English letters"),
		city: z
			.string()
			.min(1, "required")
			.regex(/^[A-Za-z]*$/, "must contain only English letters"),
		zip: z.string().min(1, "required"),
		country: z
			.string({ message: "required" })
			.min(1, "required")
			.refine(
				(c) => c in countries,
				"must be a valid country from a predefined list",
			),
		default: z.boolean(),
	})
	.superRefine((data, ctx) => {
		if (!new RegExp(countries[data.country]?.zipRegex).test(data.zip)) {
			ctx.addIssue({
				path: ["zip"],
				code: z.ZodIssueCode.custom,
				message: `must follow the format for ${countries[data.country].country ?? "the country"} ${countries[data.country].zipFormat ?? ""}`,
			});
		}
	});

const dateStringSchema = z.preprocess(
	(arg) => {
		if (typeof arg === "string" || arg instanceof Date) {
			const d = new Date(arg);
			return Number.isNaN(d.getTime()) ? undefined : d;
		}
		return undefined;
	},
	z.date({ message: "required" }),
);

export const registrationSchema = z.object({
	personal: z.object({
		email: z
			.string()
			.min(1, "required")
			.regex(/^(\S|$)/, "must not contain leading whitespace(s)")
			.regex(/.*\S$|^$/, "must not contain trailing whitespace(s)")
			.regex(
				/\b(?:[a-z0-9-]+\.)+[a-z]{2,}\b/,
				"must contain a domain name (e.g., mail.io)",
			)
			.regex(/^[^@]+@[^@]+$/, "must contain an separating '@' symbol")
			.email("must be properly formatted (e.g., e@mail.io)"),
		password: z
			.string()
			.min(8, "at least 8 characters long")
			.regex(/[A-Z]/g, "at least one uppercase letter (A-Z)")
			.regex(/[a-z]/g, "at least one lowercase letter (a-z)")
			.regex(/[0-9]/g, "at least one digit (0-9)")
			.regex(/[!@#$%^&*]/g, "at least one special character (e.g., !@#$%^&*)")
			.regex(/^(\S|$)/, "must not contain leading whitespace(s)")
			.regex(/.*\S$|^$/, "must not contain trailing whitespace(s)"),
		firstName: z
			.string()
			.min(1, "required")
			.regex(/^[A-Za-z]*$/, "must contain only English letters"),
		lastName: z
			.string()
			.min(1, "required")
			.regex(/^[A-Za-z]*$/, "must contain only English letters"),
		dateOfBirth: dateStringSchema.refine(
			(d) => {
				if (!d) return false;
				const now = new Date();
				const dY = now.getFullYear() - d.getFullYear();
				const dM = now.getMonth() - d.getMonth();
				const dD = now.getDate() - d.getDate();
				return dY > MIN_AGE || (dY === MIN_AGE && (dM || (!dM && dD >= 0)));
			},
			{ message: `you must be at least ${MIN_AGE} years old` },
		),
	}),
	shipping: z.array(addressSchema).min(1, "required"),
	billing: z.array(addressSchema),
	id: z.number().default(101).optional(),
});

export type RegistrationSchema = z.input<typeof registrationSchema>;
export type AddressSchema = z.input<typeof addressSchema>;
