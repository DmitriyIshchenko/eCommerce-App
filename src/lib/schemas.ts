import { z } from 'zod';

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, 'Required')
    .regex(/^(\S|$)/, 'Must not contain leading whitespace(s)')
    .regex(/.*\S$|^$/, 'Must not contain trailing whitespace(s)')
    .regex(/\b(?:[a-z0-9-]+\.)+[a-z]{2,}\b/, 'Must contain a domain name (e.g., example.com)')
    .regex(/^[^@]+@[^@]+$/, "Must contain an separating '@' symbol")
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
