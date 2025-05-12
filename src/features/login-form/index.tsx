import { KeyRegular, MailRegular } from '@fluentui/react-icons';
import { Button, tokens } from '@fluentui/react-components';
import { makeStyles } from '@fluentui/react-components';
import { Link } from '@tanstack/react-router';
import InputField from '../../components/ui/input-field';
import ShowHideButton from '../../components/ui/buttons/show-hide';
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

const useStyles = makeStyles({
  buttonContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: '20px',
  },
  button: {
    border: '2px solid #00000000',
    borderRadius: '25px',
    padding: '15px 30px',
    backgroundColor: tokens.colorNeutralForeground1,
    color: tokens.colorNeutralForegroundInverted,
  },
});

export default function LoginForm() {
  const classes = useStyles();
  const [show, setShow] = useState(false);

  const methods = useForm();

  return (
    <FormProvider {...methods}>
      <form>
        <InputField type="text" placeholder="Email" contentBefore={<MailRegular />} name="email" />

        <InputField
          placeholder="Password"
          contentBefore={<KeyRegular />}
          contentAfter={<ShowHideButton onClick={() => setShow(!show)} show={show} />}
          type={show ? 'text' : 'password'}
          name="password"
        />

        <div className={classes.buttonContainer}>
          <Button className={classes.button} type="submit">
            LOGIN
          </Button>
          <div>
            New customer? <Link to="/">Sign up</Link>
          </div>
        </div>
      </form>
    </FormProvider>
  );
}
