import { z } from 'zod';
import { loginSchema } from './auth';

const patterns: Record<string, [RegExp, string]> = {
  NO_SPECIAL_CHARS: [/^[^!@#$%^&*]*$/, 'Must contain no special characters'],
  NO_NUMBERS: [/^[^\d]*$/, 'Must contain no numbers'],
  POSTAL_CODE_US: [/^\d{5}$/, 'Must follow US postal code pattern (e.g. 12345)'],
  POSTAL_CODE_CANADA: [
    /^[A-Z]\d[A-Z] \d[A-Z]\d$/,
    'Must follow canadian postal code pattern (e.g. A1B 2C3)',
  ],
};

const MIN_AGE = 13;

const baseSchema = loginSchema.extend({
  firstName: z
    .string()
    .min(1, 'Required field')
    .regex(...patterns.NO_SPECIAL_CHARS)
    .regex(...patterns.NO_NUMBERS),
  lastName: z
    .string()
    .min(1, 'Required field')
    .regex(...patterns.NO_SPECIAL_CHARS)
    .regex(...patterns.NO_NUMBERS),
  dateOfBirth: z.date().refine((userDate) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const pastDate = new Date();
    pastDate.setFullYear(today.getFullYear() - MIN_AGE);
    pastDate.setHours(0, 0, 0, 1);

    return userDate.getTime() - pastDate.getTime() < 0;
  }, `You must be at least ${MIN_AGE} years old`),

  street: z.string().min(1, 'Required field'),
  city: z
    .string()
    .min(1, 'Required field')
    .regex(...patterns.NO_SPECIAL_CHARS)
    .regex(...patterns.NO_NUMBERS),
});

const usaSchema = baseSchema.extend({
  country: z.literal('USA'),
  postalCode: z
    .string()
    .min(1, 'Required field')
    .regex(...patterns.POSTAL_CODE_US),
});

const canadaSchema = baseSchema.extend({
  country: z.literal('Canada'),
  postalCode: z
    .string()
    .min(1, 'Required field')
    .regex(...patterns.POSTAL_CODE_CANADA),
});

export const registerSchema = z.discriminatedUnion('country', [usaSchema, canadaSchema]);

export type RegisterSchema = z.infer<typeof registerSchema>;
