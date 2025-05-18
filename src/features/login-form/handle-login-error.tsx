import type { UseFormSetError } from 'react-hook-form';
import type { LoginSchema } from '../../lib/schemas/login-schema';
import type { ToastIntent } from '@fluentui/react-components';

type Notify = (options: {
  title: string;
  content: string;
  intent: ToastIntent;
  timeout: number;
}) => void;

export function handleLoginError(
  error: unknown,
  setError: UseFormSetError<LoginSchema>,
  notify: Notify,
) {
  if (error instanceof Error && 'body' in error) {
    const body = error.body;

    if (typeof body === 'object' && body && 'statusCode' in body) {
      const statusCode = body.statusCode;

      if (statusCode === 400) {
        const message = 'Invalid login credentials. Please try again.';
        setError('email', {
          type: 'manual',
          message,
        });
        setError('password', {
          type: 'manual',
          message,
        });
      }
    }
  } else {
    notify({
      title: 'Oops...',
      content: 'Something went wrong. Please try again later. 😔',
      intent: 'error',
      timeout: 4000,
    });
  }
}
