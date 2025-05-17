import {
  City24Regular,
  Home24Regular,
  KeyRegular,
  Mail24Regular,
  MailRegular,
} from '@fluentui/react-icons';
import { Button, tokens } from '@fluentui/react-components';
import { makeStyles } from '@fluentui/react-components';
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerSchema, type RegisterSchema } from '../../lib/schemas/registerSchema';
import { Person24Regular } from '@fluentui/react-icons/fonts';

import InputField from '../../components/ui/input-field';
import ShowHideButton from '../../components/ui/buttons/show-hide';
import SelectField from '../../components/ui/select-field';
import DatePickerField from '../../components/ui/date-picker-field';

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
});

type Country = 'USA' | 'Canada';

export default function RegisterForm() {
  const styles = useStyles();
  const [show, setShow] = useState(false);

  const allowedCountries: Country[] = ['USA', 'Canada'];

  const methods = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
  });
  const {
    handleSubmit,
    formState: { errors },
  } = methods;

  const onSubmit = (data: RegisterSchema) => {
    return data;
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
          required
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
          required
        />

        <InputField
          label="First name"
          placeholder="Walter"
          name="firstName"
          type="text"
          contentBefore={<Person24Regular />}
          message={errors.firstName?.message}
          required
        />

        <InputField
          label="Last name"
          placeholder="White"
          name="lastName"
          type="text"
          contentBefore={<Person24Regular />}
          message={errors.lastName?.message}
          required
        />

        <DatePickerField<RegisterSchema>
          name="dateOfBirth"
          label="Date of birth"
          placeholder="Select a date"
          required
        />

        <InputField
          label="City"
          placeholder="Albuquerque"
          name="city"
          type="text"
          contentBefore={<City24Regular />}
          message={errors.city?.message}
          required
        />

        <InputField
          label="Street"
          placeholder="308 Negra Arroyo Lane"
          name="street"
          type="text"
          contentBefore={<Home24Regular />}
          message={errors.street?.message}
          required
        />

        <InputField
          label="Postal Code"
          placeholder="Postal code in your country"
          name="postalCode"
          type="text"
          contentBefore={<Mail24Regular />}
          message={errors.postalCode?.message}
          required
        />

        <SelectField
          label="Country"
          name="country"
          options={allowedCountries}
          message={errors.country?.message}
          required
        />

        <div className={styles.buttonContainer}>
          <Button type="submit" size="large" appearance="primary" shape="circular">
            Create
          </Button>
        </div>
      </form>
    </FormProvider>
  );
}
