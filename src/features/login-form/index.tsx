import { KeyRegular, MailRegular } from '@fluentui/react-icons';
import {
  Spinner,
  Text,
  Toast,
  ToastBody,
  ToastTitle,
  tokens,
  useId,
  useToastController,
  type ToastIntent,
} from '@fluentui/react-components';
import { makeStyles } from '@fluentui/react-components';
import { useNavigate } from '@tanstack/react-router';
import InputField from '../../components/ui/input-field';
import ShowHideButton from '../../components/ui/buttons/show-hide';
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema, type LoginSchema } from '../../lib/schemas/user';
import { useUser } from '../../hooks/use-user';
import { TOASTER_ID } from '../../lib/constants';
import Confetti from 'react-confetti';
import { useLoading } from '../../hooks/use-loading';
import CustomButton from '../../components/ui/buttons/custom';
import { InternalLink } from '../../components/ui/links/fui-tanstack';

interface notifyOptions {
  title: string;
  content: string;
  intent: ToastIntent | 'progress';
  timeout: number;
}

const useStyles = makeStyles({
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

export default function LoginForm() {
  const styles = useStyles();
  const [show, setShow] = useState(false);
  const { authorized, login } = useUser();
  const { loading, setLoading } = useLoading();
  const progressToastId = useId('progress');
  const navigate = useNavigate({ from: '/login' });

  const methods = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
  });
  const {
    handleSubmit,
    formState: { errors },
  } = methods;

  const { dispatchToast, dismissToast } = useToastController(TOASTER_ID);

  const notify = ({ title, content, intent, timeout }: notifyOptions) => {
    switch (intent) {
      case 'progress':
        dispatchToast(
          <Toast>
            <ToastTitle media={<Spinner size="tiny" />}>{title}</ToastTitle>
            <ToastBody>{content}</ToastBody>
          </Toast>,
          { toastId: progressToastId },
        );
        break;
      default:
        dispatchToast(
          <Toast>
            <ToastTitle>{title}</ToastTitle>
            <ToastBody>{content}</ToastBody>
          </Toast>,
          { intent, timeout },
        );
    }
  };

  const onSubmit = async (data: LoginSchema) => {
    try {
      setLoading(true);
      notify({
        title: 'Loading...',
        intent: 'progress',
        content: 'Will take a second!',
        timeout: -1,
      });

      const response = await login(data);

      notify({
        title: `Hello, ${response?.body.firstName}! 😄`,
        content: 'You have been successfully logged in',
        intent: 'success',
        timeout: 4000,
      });

      setLoading(false);
      dismissToast(progressToastId);

      setTimeout(() => void navigate({ to: '/' }), 2000);
    } catch (error) {
      setLoading(false);
      dismissToast(progressToastId);

      if (error instanceof Error) {
        notify({
          title: 'Oops...',
          content: `${error.message} Please try again. 😔`,
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
            <ShowHideButton className={styles.eye} onClick={() => setShow(!show)} show={show} />
          }
          message={errors.password?.message}
          name="password"
          type={show ? 'text' : 'password'}
        />

        <div className={styles.buttonContainer}>
          <CustomButton
            type="submit"
            size="large"
            shape="circular"
            disabled={loading || authorized}
          >
            Login
          </CustomButton>
          <div>
            <Text
              size={400}
              style={{
                color: tokens.colorNeutralForeground4,
                marginRight: tokens.spacingHorizontalSNudge,
              }}
            >
              New customer?
            </Text>
            <InternalLink to="/register">Sign up</InternalLink>
          </div>
        </div>

        {authorized && (
          <Confetti
            className={styles.confetti}
            width={window.innerWidth}
            height={window.innerHeight}
            recycle={false}
            numberOfPieces={512}
            gravity={0.4}
            initialVelocityY={20}
            tweenDuration={1000}
            colors={['#ff49a5', '#e449ff', '#5795ff']}
          />
        )}
      </form>
    </FormProvider>
  );
}
