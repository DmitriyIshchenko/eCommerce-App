import { parseStoredToken, type TokenResponse, type StoredToken } from '../schemas/tokens';

const TOKEN_STORAGE_KEY = 'ct_auth';

export function storeTokens(tokenResponse: TokenResponse): StoredToken {
  const storedToken: StoredToken = {
    ...tokenResponse,
    expiresAt: Date.now() + tokenResponse.expires_in * 1000,
  };

  localStorage.setItem(TOKEN_STORAGE_KEY, JSON.stringify(storedToken));
  return storedToken;
}

export function getStoredTokens(): StoredToken | null {
  const rawData = localStorage.getItem(TOKEN_STORAGE_KEY);
  if (!rawData) return null;

  try {
    return parseStoredToken(JSON.parse(rawData));
  } catch (error) {
    console.error('Failed to parse stored tokens', error);
    clearTokens();
    return null;
  }
}

export function clearTokens() {
  localStorage.removeItem(TOKEN_STORAGE_KEY);
}

export function isTokenValid() {
  const tokens = getStoredTokens();
  return tokens ? tokens.expiresAt > Date.now() : false;
}
