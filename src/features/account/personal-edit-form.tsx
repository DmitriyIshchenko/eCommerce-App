import { FormProvider, useForm } from 'react-hook-form';
import { personalSchemaNoPassword, type PersonalSchemaNoPassword } from '../../lib/schemas/user';
import { zodResolver } from '@hookform/resolvers/zod';
import { MailRegular, PersonRegular } from '@fluentui/react-icons';
import DatePickerField from '../../components/ui/date-picker-field';
import { useUser } from '../../hooks/use-user';
import ControlledInputField from '../../components/ui/controlled-input';
import {
  Spinner,
  Toast,
  ToastBody,
  ToastTitle,
  useId,
  useToastController,
  type ToastIntent,
} from '@fluentui/react-components';
import { useLoading } from '../../hooks/use-loading';
import { useNavigate } from '@tanstack/react-router';
import { TOASTER_ID } from '../../lib/constants';
import CustomButton from '../../components/ui/buttons/custom';
import { useFormStyles } from '../../styles/forms';

interface NotifyOptions {
  title: string;
  content: string;
  intent: ToastIntent | 'progress';
  timeout: number;
}

export default function PersonalEditForm() {
  const styles = useFormStyles();
  const { customer, updateInfo } = useUser();
  const { setLoading } = useLoading();
  const navigate = useNavigate({ from: '/account/edit' });
  const progressToastId = useId('progress');
  const { dispatchToast, dismissToast } = useToastController(TOASTER_ID);

  const methods = useForm<PersonalSchemaNoPassword>({
    resolver: zodResolver(personalSchemaNoPassword),

    defaultValues: {
      firstName: customer?.firstName,
      lastName: customer?.lastName,
      email: customer?.email,
      dateOfBirth: new Date(customer?.dateOfBirth ?? ''),
    },
  });

  const { handleSubmit } = methods;

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

  const onSubmit = async (data: PersonalSchemaNoPassword) => {
    try {
      setLoading(true);
      notify({
        title: 'Updating...',
        intent: 'progress',
        content: 'Will take a second!',
        timeout: -1,
      });

      await updateInfo(data);

      notify({
        title: `Success!`,
        content: 'Your info was successfully updated!',
        intent: 'success',
        timeout: 4000,
      });

      setLoading(false);
      dismissToast(progressToastId);

      setTimeout(() => void navigate({ to: '/account' }), 2000);
    } catch (error) {
      setLoading(false);
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
      <form onSubmit={(e) => void handleSubmit(onSubmit)(e)} className={styles.form}>
        <ControlledInputField
          label="First name"
          placeholder="Walter"
          name="firstName"
          type="text"
          contentBefore={<PersonRegular />}
        />

        <ControlledInputField
          label="Last name"
          placeholder="White"
          name="lastName"
          type="text"
          contentBefore={<PersonRegular />}
        />

        <ControlledInputField
          label="Email"
          type="text"
          placeholder="email@example.com"
          contentBefore={<MailRegular />}
          name="email"
        />

        <DatePickerField<PersonalSchemaNoPassword>
          name="dateOfBirth"
          label="Date of birth"
          placeholder="Select a date"
        />

        <CustomButton type="submit" shape="circular" size="large">
          Save
        </CustomButton>
      </form>
    </FormProvider>
  );
}
