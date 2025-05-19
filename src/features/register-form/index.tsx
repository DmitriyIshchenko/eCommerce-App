import { KeyRegular, MailRegular } from '@fluentui/react-icons';
import {
  Button,
  Link,
  Spinner,
  Toast,
  ToastBody,
  ToastTitle,
  tokens,
  useId,
  useToastController,
  type CheckboxProps,
  type ToastIntent,
} from '@fluentui/react-components';
import { makeStyles } from '@fluentui/react-components';
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerSchema, type RegisterSchema } from '../../lib/schemas/user';
import { Person24Regular } from '@fluentui/react-icons/fonts';

import InputField from '../../components/ui/input-field';
import ShowHideButton from '../../components/ui/buttons/show-hide';
import DatePickerField from '../../components/ui/date-picker-field';
import { createCustomer } from '../../lib/api/create-customer';
import { TOASTER_ID } from '../../lib/constants';
import { useUser } from '../../hooks/use-user';
import { createLink, useNavigate } from '@tanstack/react-router';
import AddressFieldset from '../../components/ui/address-fieldset';

interface NotifyOptions {
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

export default function RegisterForm() {
  const styles = useStyles();
  const [show, setShow] = useState(false);
  const [isDefaultShippingAddress, setIsDefaultShippingAddress] =
    useState<CheckboxProps['checked']>(false);

  const [isDefaultBillingAddress, setIsDefaultBillingAddress] =
    useState<CheckboxProps['checked']>(false);

  const { isLoading, setIsLoading, setAuthorized } = useUser();
  const progressToastId = useId('progress');

  const CustomLink = createLink(Link);
  const navigate = useNavigate({ from: '/register' });

  const methods = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
  });

  const {
    handleSubmit,
    formState: { errors },
  } = methods;

  const { dispatchToast, dismissToast } = useToastController(TOASTER_ID);

  const notify = ({ title, content, intent, timeout }: NotifyOptions) => {
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

  const onSubmit = async (data: RegisterSchema) => {
    try {
      setIsLoading(true);
      notify({
        title: 'Creating an account for you...',
        intent: 'progress',
        content: 'Will take a second!',
        timeout: -1,
      });

      const response = await createCustomer(
        data,
        isDefaultShippingAddress,
        isDefaultBillingAddress,
      );
      notify({
        title: `Hello, ${response.body.customer.firstName}! 😄`,
        content: 'Your account was successfully created!',
        intent: 'success',
        timeout: 4000,
      });

      setIsLoading(false);
      setAuthorized(true);
      dismissToast(progressToastId);

      await navigate({ to: '/' });
    } catch (error) {
      setIsLoading(false);
      dismissToast(progressToastId);
      if (error instanceof Error) {
        notify({
          title: 'Oops...',
          content: `Something went wrong: ${error.message} Please try again. 😔`,
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
          type="text"
          placeholder="email@example.com"
          contentBefore={<MailRegular />}
          name="email"
          message={errors.email?.message}
        />

        <InputField
          label="Password"
          contentBefore={<KeyRegular />}
          message={errors.password?.message}
          contentAfter={
            <ShowHideButton className={styles.eye} onClick={() => setShow(!show)} show={show} />
          }
          type={show ? 'text' : 'password'}
          name="password"
          placeholder="Create a strong password"
        />

        <InputField
          label="First name"
          placeholder="Walter"
          name="firstName"
          type="text"
          contentBefore={<Person24Regular />}
          message={errors.firstName?.message}
        />

        <InputField
          label="Last name"
          placeholder="White"
          name="lastName"
          type="text"
          contentBefore={<Person24Regular />}
          message={errors.lastName?.message}
        />

        <DatePickerField<RegisterSchema>
          name="dateOfBirth"
          label="Date of birth"
          placeholder="Select a date"
        />

        <AddressFieldset
          variant="shipping"
          isDefaultAddress={isDefaultShippingAddress}
          setIsDefaultAddress={setIsDefaultShippingAddress}
        />

        <AddressFieldset
          variant="billing"
          isDefaultAddress={isDefaultBillingAddress}
          setIsDefaultAddress={setIsDefaultBillingAddress}
        />

        <div className={styles.buttonContainer}>
          <Button
            type="submit"
            size="large"
            appearance="primary"
            shape="circular"
            disabled={isLoading}
          >
            Submit
          </Button>

          <div>
            Already have an account? <CustomLink to="/login">Sign in</CustomLink>
          </div>
        </div>
      </form>
    </FormProvider>
  );
}
