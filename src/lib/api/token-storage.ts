import { parseStoredToken, type TokenResponse, type StoredToken } from '../schemas/tokens';
import type { ClientType } from '../types';

const TOKEN_STORAGE_KEY = 'ct_auth';
const ANON_TOKEN_STORAGE_KEY = 'ct_anon';

export function storeTokens(tokenResponse: TokenResponse, type: ClientType): StoredToken {
  const storedToken: StoredToken = {
    ...tokenResponse,
    expiresAt: Date.now() + tokenResponse.expires_in * 1000,
  };

  const key = type === 'customer' ? TOKEN_STORAGE_KEY : ANON_TOKEN_STORAGE_KEY;
  localStorage.setItem(key, JSON.stringify(storedToken));
  return storedToken;
}

export function getStoredTokens(type: ClientType): StoredToken | null {
  const key = type === 'customer' ? TOKEN_STORAGE_KEY : ANON_TOKEN_STORAGE_KEY;
  const rawData = localStorage.getItem(key);
  if (!rawData) return null;

  try {
    return parseStoredToken(JSON.parse(rawData));
  } catch (error) {
    console.error('Failed to parse stored tokens', error);
    clearTokens(type);
    return null;
  }
}

export function clearTokens(type: ClientType) {
  const key = type === 'customer' ? TOKEN_STORAGE_KEY : ANON_TOKEN_STORAGE_KEY;
  localStorage.removeItem(key);
}

export function isTokenValid(type: ClientType) {
  const tokens = getStoredTokens(type);
  return tokens ? tokens.expiresAt > Date.now() : false;
}
