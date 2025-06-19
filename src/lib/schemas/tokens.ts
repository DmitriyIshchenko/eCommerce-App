import { z } from 'zod';

const TokenSchema = z.object({
  access_token: z.string(),
  token_type: z.literal('Bearer'),
  expires_in: z.number().positive(),
  scope: z.string(),
  refresh_token: z.string().optional(),
});

const StoredTokenSchema = TokenSchema.extend({
  expiresAt: z.number().positive(),
});

export type TokenResponse = z.infer<typeof TokenSchema>;
export type StoredToken = z.infer<typeof StoredTokenSchema>;

export function parseTokenResponse(data: unknown): TokenResponse {
  return TokenSchema.parse(data);
}

export function parseStoredToken(data: unknown): StoredToken {
  return StoredTokenSchema.parse(data);
}
