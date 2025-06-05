import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import { ClientBuilder, type Client, type TokenStore } from '@commercetools/sdk-client-v2';
import type { LoginSchema } from '../schemas/user';
import { getStoredTokens, storeTokens } from './token-storage';

const projectKey = import.meta.env.VITE_CTP_PROJECT_KEY;
const clientId = import.meta.env.VITE_CTP_CLIENT_ID;
const clientSecret = import.meta.env.VITE_CTP_CLIENT_SECRET;
const authUrl = import.meta.env.VITE_CTP_AUTH_URL;
const apiUrl = import.meta.env.VITE_CTP_API_URL;
const scopes = import.meta.env.VITE_CTP_SCOPES.split(' ');

const httpMiddlewareOptions = {
  host: apiUrl,
  httpClient: fetch,
};

export function createAnonymousClient() {
  const options = {
    host: authUrl,
    projectKey: projectKey,
    credentials: {
      clientId: clientId,
      clientSecret: clientSecret,
    },
    scopes: scopes,
    httpClient: fetch,
  };

  const client = new ClientBuilder()
    .withProjectKey(projectKey)
    .withAnonymousSessionFlow(options)
    .withHttpMiddleware(httpMiddlewareOptions)
    .withLoggerMiddleware()
    .build();

  return client;
}

export function createPasswordClient(data: LoginSchema) {
  const { email, password } = data;

  const options = {
    host: authUrl,
    projectKey: projectKey,
    credentials: {
      clientId: clientId,
      clientSecret: clientSecret,
      user: {
        username: email,
        password: password,
      },
    },
    scopes: scopes,
    httpClient: fetch,
    tokenCache: {
      get: () => {
        const tokens = getStoredTokens();

        return {
          token: tokens?.access_token ?? '',
          expirationTime: tokens ? tokens.expiresAt - Date.now() : 0,
        };
      },
      set: (cache: TokenStore) => {
        storeTokens({
          access_token: cache.token,
          expires_in: Math.floor(cache.expirationTime / 1000),
          token_type: 'Bearer',
          scope: scopes.join(' '),
        });
      },
    },
  };

  const client = new ClientBuilder()
    .withProjectKey(projectKey)
    .withPasswordFlow(options)
    .withHttpMiddleware(httpMiddlewareOptions)
    .withLoggerMiddleware()
    .build();

  return client;
}

export function createClientWithToken() {
  const tokens = getStoredTokens();
  if (!tokens?.access_token) throw new Error('No access token available');

  return new ClientBuilder()
    .withProjectKey(projectKey)
    .withExistingTokenFlow(`Bearer ${tokens.access_token}`, { force: true })
    .withHttpMiddleware(httpMiddlewareOptions)
    .build();
}

export function getApiRoot(client: Client) {
  return createApiBuilderFromCtpClient(client).withProjectKey({ projectKey: projectKey });
}
