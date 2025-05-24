import type { FieldProps, InputProps } from '@fluentui/react-components';
import { Field, Input, makeStyles, tokens } from '@fluentui/react-components';
import { useFormContext } from 'react-hook-form';

const useClasses = makeStyles({
  field: {
    marginBottom: tokens.spacingVerticalL,
  },
  input: {
    padding: `${tokens.spacingVerticalM} ${tokens.spacingHorizontalS}`,
    borderRadius: tokens.borderRadiusNone,
  },
});

interface Props extends Partial<FieldProps> {
  message: string | undefined;
  name: string;
  type?: InputProps['type'];
  placeholder?: string;
  contentBefore?: InputProps['contentBefore'];
  contentAfter?: InputProps['contentAfter'];
  disabled?: boolean;
}

export default function InputField(props: Props) {
  const classes = useClasses();
  const { message, name, type, placeholder, contentBefore, contentAfter, disabled } = props;
  const { register } = useFormContext();

  return (
    <Field
      className={classes.field}
      validationState={message ? 'error' : 'none'}
      validationMessage={message}
      {...props}
    >
      <Input
        className={classes.input}
        size="large"
        type={type}
        placeholder={placeholder}
        contentBefore={contentBefore}
        contentAfter={contentAfter}
        disabled={disabled}
        {...register(name)}
      />
    </Field>
  );
}
