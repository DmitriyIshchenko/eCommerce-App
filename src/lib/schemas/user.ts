import { z } from 'zod';
import { countries } from '../country-options';

const patterns: Record<string, [RegExp, string]> = {
  ONLY_ENGLISH_LETTERS: [/^[A-Za-z]*$/, 'Must contain only English letters'],
  NO_SPECIAL_CHARS: [/^[^!@#$%^&*]*$/, 'Must contain no special characters'],
  NO_NUMBERS: [/^[^\d]*$/, 'Must contain no numbers'],
  POSTAL_CODE_US: [/^\d{5}$/, 'Must follow US postal code pattern (e.g. 12345)'],
  POSTAL_CODE_CANADA: [
    /^[A-Z]\d[A-Z] \d[A-Z]\d$/,
    'Must follow canadian postal code pattern (e.g. A1B 2C3)',
  ],
};

const MIN_AGE = 13;

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, 'Required field')
    .regex(/^(\S|$)/, 'Must not contain leading whitespace(s)')
    .regex(/.*\S$|^$/, 'Must not contain trailing whitespace(s)')
    .regex(/\b(?:[a-z0-9-]+\.)+[a-z]{2,}\b/, 'Must contain a domain name (e.g., example.com)')
    .regex(/^[^@]+@[^@]+$/, 'Must contain a separating "@" symbol')
    .email('Must be properly formatted (e.g., user@example.com)'),

  password: z
    .string()
    .min(8, 'At least 8 characters long')
    .regex(/[A-Z]/g, 'At least one uppercase letter (A-Z)')
    .regex(/[a-z]/g, 'At least one lowercase letter (a-z)')
    .regex(/[0-9]/g, 'At least one digit (0-9)')
    .regex(/[!@#$%^&*]/g, 'At least one special character (e.g., !@#$%^&*)')
    .regex(/^(\S|$)/, 'Must not contain leading whitespace(s)')
    .regex(/.*\S$|^$/, 'Must not contain trailing whitespace(s)'),
});

export type LoginSchema = z.infer<typeof loginSchema>;

const personalSchema = loginSchema.extend({
  firstName: z
    .string()
    .min(1, 'Required field')
    .regex(...patterns.NO_SPECIAL_CHARS)
    .regex(...patterns.NO_NUMBERS)
    .regex(...patterns.ONLY_ENGLISH_LETTERS),

  lastName: z
    .string()
    .min(1, 'Required field')
    .regex(...patterns.NO_SPECIAL_CHARS)
    .regex(...patterns.NO_NUMBERS)
    .regex(...patterns.ONLY_ENGLISH_LETTERS),

  dateOfBirth: z.date().refine((userDate) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const pastDate = new Date();
    pastDate.setFullYear(today.getFullYear() - MIN_AGE);
    pastDate.setHours(0, 0, 0, 1);

    return userDate.getTime() - pastDate.getTime() < 0;
  }, `You must be at least ${MIN_AGE} years old`),
});

const addressSchema = z
  .object({
    streetName: z.string().min(1, 'Required field'),
    city: z
      .string()
      .min(1, 'Required field')
      .regex(...patterns.NO_SPECIAL_CHARS)
      .regex(...patterns.NO_NUMBERS)
      .regex(...patterns.ONLY_ENGLISH_LETTERS),
    postalCode: z.string().min(1, 'Required field'),
    country: z
      .string()
      .min(1, 'Required field')
      .refine(
        (country) =>
          Object.values(countries)
            .map((c) => c.code)
            .includes(country),
        'Must be a valid country from a predefined list',
      ),
  })
  .superRefine((data, ctx) => {
    if (!new RegExp(countries[data.country]?.zipRegex).test(data.postalCode)) {
      ctx.addIssue({
        path: ['postalCode'],
        code: z.ZodIssueCode.custom,
        message: `Must follow the format for ${countries[data.country].country} ${countries[data.country].zipFormat}`,
      });
    }
  });

export const registerSchema = personalSchema.extend({
  addresses: z.array(addressSchema),
});

export type RegisterSchema = z.infer<typeof registerSchema>;
