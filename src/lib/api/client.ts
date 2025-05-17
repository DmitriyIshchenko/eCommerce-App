import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import { ClientBuilder, type Client } from '@commercetools/sdk-client-v2';
import type { LoginSchema } from '../schemas/login';

if (
  typeof import.meta.env.VITE_CTP_PROJECT_KEY !== 'string' ||
  typeof import.meta.env.VITE_CTP_CLIENT_ID !== 'string' ||
  typeof import.meta.env.VITE_CTP_CLIENT_SECRET !== 'string' ||
  typeof import.meta.env.VITE_CTP_AUTH_URL !== 'string' ||
  typeof import.meta.env.VITE_CTP_API_URL !== 'string' ||
  typeof import.meta.env.VITE_CTP_SCOPES !== 'string'
) {
  throw new Error('project key was not found');
}

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

export function createClient(data: LoginSchema) {
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
  };

  const client = new ClientBuilder()
    .withProjectKey(projectKey)
    .withPasswordFlow(options)
    .withHttpMiddleware(httpMiddlewareOptions)
    .withLoggerMiddleware()
    .build();

  return client;
}

export function getApiRoot(client: Client) {
  return createApiBuilderFromCtpClient(client).withProjectKey({ projectKey: projectKey });
}
