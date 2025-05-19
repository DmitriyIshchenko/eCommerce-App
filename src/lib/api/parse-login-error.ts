export function parseLoginError(error: unknown) {
  if (error instanceof Error && 'body' in error) {
    const body = error.body;

    if (typeof body === 'object' && body && 'statusCode' in body) {
      const statusCode = body.statusCode;

      if (statusCode === 400) {
        return 'invalid_credentials';
      }
    }
  }
  return 'unknown';
}
