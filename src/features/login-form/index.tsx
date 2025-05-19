import { KeyRegular, MailRegular } from '@fluentui/react-icons';
import {
  Button,
  Link,
  Toast,
  ToastBody,
  ToastTitle,
  tokens,
  useToastController,
  type ToastIntent,
} from '@fluentui/react-components';
import { makeStyles } from '@fluentui/react-components';
import { createLink } from '@tanstack/react-router';
import InputField from '../../components/ui/input-field';
import ShowHideButton from '../../components/ui/buttons/show-hide';
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema, type LoginSchema } from '../../lib/schemas/user';
import { login } from '../../lib/api/login';
import { useUser } from '../../hooks/use-user';
import { TOASTER_ID } from '../../lib/constants';
import Confetti from 'react-confetti';
import { parseLoginError } from '../../lib/api/parse-login-error';

const useClasses = makeStyles({
  buttonContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: tokens.spacingHorizontalXL,
  },
  eye: {
    padding: `${tokens.spacingVerticalNone} ${tokens.spacingHorizontalNone}`,
  },
  confetti: {
    width: '100%',
    height: '100%',
  },
});

interface notifyOptions {
  title: string;
  content: string;
  intent: ToastIntent;
  timeout: number;
}

export default function LoginForm() {
  const classes = useClasses();
  const CustomLink = createLink(Link);
  const [show, setShow] = useState(false);

  const methods = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
  });
  const {
    handleSubmit,
    formState: { errors },
    setError,
  } = methods;

  const { authorized, setAuthorized } = useUser();

  const { dispatchToast } = useToastController(TOASTER_ID);

  const notify = ({ title, content, intent, timeout }: notifyOptions) => {
    dispatchToast(
      <Toast>
        <ToastTitle>{title}</ToastTitle>
        <ToastBody>{content}</ToastBody>
      </Toast>,
      { intent: intent, timeout: timeout },
    );
  };

  const onSubmit = async (data: LoginSchema) => {
    try {
      const response = await login(data);
      setAuthorized(true);
      notify({
        title: `Hello, ${response.body.firstName}! 😄`,
        content: 'You have been successfully logged in',
        intent: 'success',
        timeout: 4000,
      });
    } catch (error) {
      const errorType = parseLoginError(error);

      if (errorType === 'invalid_credentials') {
        const message = 'Invalid login credentials. Please try again.';
        setError('email', {
          type: 'manual',
          message,
        });
        setError('password', {
          type: 'manual',
          message,
        });
      } else {
        notify({
          title: 'Oops...',
          content: 'Something went wrong. Please try again later. 😔',
          intent: 'error',
          timeout: 4000,
        });
      }
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={(e) => void handleSubmit(onSubmit)(e)}>
        <InputField
          label="Email"
          placeholder="you@example.com"
          contentBefore={<MailRegular />}
          message={errors.email?.message}
          name="email"
          type="text"
        />

        <InputField
          label="Password"
          placeholder="••••••••"
          contentBefore={<KeyRegular />}
          contentAfter={
            <ShowHideButton className={classes.eye} onClick={() => setShow(!show)} show={show} />
          }
          message={errors.password?.message}
          name="password"
          type={show ? 'text' : 'password'}
        />

        <div className={classes.buttonContainer}>
          <Button type="submit" size="large" appearance="primary" shape="circular">
            Login
          </Button>
          <div>
            New customer? <CustomLink to="/">Sign up</CustomLink>
          </div>
        </div>

        {authorized && (
          <Confetti
            className={classes.confetti}
            width={window.innerWidth}
            height={window.innerHeight}
            recycle={false}
            numberOfPieces={512}
            gravity={0.2}
            initialVelocityY={20}
            tweenDuration={2000}
            colors={['#ff49a5', '#e449ff', '#5795ff']}
          />
        )}
      </form>
    </FormProvider>
  );
}
