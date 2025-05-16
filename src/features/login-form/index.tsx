import { KeyRegular, MailRegular } from '@fluentui/react-icons';
import { Button, Link, tokens } from '@fluentui/react-components';
import { makeStyles } from '@fluentui/react-components';
import { createLink } from '@tanstack/react-router';
import InputField from '../../components/ui/input-field';
import ShowHideButton from '../../components/ui/buttons/show-hide';
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema, type LoginSchema } from '../../lib/schemas/login';

const useStyles = makeStyles({
  buttonContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: tokens.spacingHorizontalXL,
  },
  button: {
    padding: `${tokens.spacingVerticalL} ${tokens.spacingHorizontalXXXL}`,
  },
  eye: {
    padding: `${tokens.spacingVerticalNone} ${tokens.spacingHorizontalNone}`,
  },
});

export default function LoginForm() {
  const classes = useStyles();
  const CustomLink = createLink(Link);
  const [show, setShow] = useState(false);

  const methods = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
  });
  const {
    handleSubmit,
    formState: { errors },
  } = methods;

  const onSubmit = (data: LoginSchema) => {
    return data;
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={(e) => void handleSubmit(onSubmit)(e)}>
        <InputField
          placeholder="Email"
          contentBefore={<MailRegular />}
          message={errors.email?.message}
          name="email"
          type="text"
        />

        <InputField
          placeholder="Password"
          contentBefore={<KeyRegular />}
          contentAfter={
            <ShowHideButton className={classes.eye} onClick={() => setShow(!show)} show={show} />
          }
          message={errors.password?.message}
          name="password"
          type={show ? 'text' : 'password'}
        />

        <div className={classes.buttonContainer}>
          <Button
            className={classes.button}
            type="submit"
            size="large"
            appearance="primary"
            shape="circular"
          >
            LOGIN
          </Button>
          <div>
            New customer? <CustomLink to="/">Sign up</CustomLink>
          </div>
        </div>
      </form>
    </FormProvider>
  );
}
