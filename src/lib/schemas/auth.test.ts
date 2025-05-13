import { describe, test, expect } from 'vitest';
import { loginSchema } from './auth';

describe('loginSchema', () => {
  const validEmail = 'example@example.com';
  const validPassword = 'ValidPassword^3^';

  describe('Email and Password validation', () => {
    test('must accept valid email and password', () => {
      const validEmails = [
        'example@gmail.com',
        '200ok@gmail.com',
        'celestia.art@gmail.com',
        'email@subdomain.example.com',
        'you.are@awesome.com',
      ];
      const validPasswords = [
        'Password1!',
        '200OKl^-^l',
        'qwertY12345!!!!!',
        '12345678!QWERTy',
        'He11oWorld!',
      ];
      validEmails.forEach((email) => {
        const result = loginSchema.safeParse({
          email: email,
          password: validPassword,
        });
        expect(result.success).toBe(true);
      });
      validPasswords.forEach((password) => {
        const result = loginSchema.safeParse({
          email: validEmail,
          password: password,
        });
        expect(result.success).toBe(true);
      });
    });
  });

  describe('Email validation', () => {
    test('must fail if email is empty', () => {
      const result = loginSchema.safeParse({
        email: '',
        password: validPassword,
      });
      expect(result.success).toBe(false);
    });

    test('must fail if email contain leading whitespace', () => {
      const result = loginSchema.safeParse({
        email: ' example@example.com',
        password: validPassword,
      });
      expect(result.success).toBe(false);
    });

    test('must fail if email contain trailing whitespace', () => {
      const result = loginSchema.safeParse({
        email: 'example@example.com ',
        password: validPassword,
      });
      expect(result.success).toBe(false);
    });

    test('must fail if email does not contain a domain name', () => {
      const result = loginSchema.safeParse({
        email: 'example',
        password: validPassword,
      });
      expect(result.success).toBe(false);
    });

    test('must fail if email does not contain an "@" symbol separating local part and domain name', () => {
      const result = loginSchema.safeParse({
        email: 'example example.com',
        password: validPassword,
      });
      expect(result.success).toBe(false);
    });
  });

  describe('Password validation', () => {
    test('must fail if password is not at least 8 characters long', () => {
      const result = loginSchema.safeParse({
        email: validEmail,
        password: '200',
      });
      expect(result.success).toBe(false);
    });

    test('must fail if password does not contain at least one uppercase letter (A-Z)', () => {
      const result = loginSchema.safeParse({
        email: validEmail,
        password: 'password1!',
      });
      expect(result.success).toBe(false);
    });

    test('must fail if password does not contain at least one lowercase letter (a-z)', () => {
      const result = loginSchema.safeParse({
        email: validEmail,
        password: 'PASSWORD1!',
      });
      expect(result.success).toBe(false);
    });

    test('must fail if password does not contain at least one digit (0-9)', () => {
      const result = loginSchema.safeParse({
        email: validEmail,
        password: 'Password!!',
      });
      expect(result.success).toBe(false);
    });

    test('must fail if password does not contain at least one special character (e.g., !@#$%^&*)', () => {
      const result = loginSchema.safeParse({
        email: validEmail,
        password: 'Password200',
      });
      expect(result.success).toBe(false);
    });

    test('must fail if password contain leading whitespace', () => {
      const result = loginSchema.safeParse({
        email: validEmail,
        password: ' Password200!',
      });
      expect(result.success).toBe(false);
    });

    test('must fail if password contain trailing whitespace', () => {
      const result = loginSchema.safeParse({
        email: validEmail,
        password: 'Password200! ',
      });
      expect(result.success).toBe(false);
    });
  });
});
