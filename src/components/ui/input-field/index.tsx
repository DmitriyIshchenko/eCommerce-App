import type { FieldProps, InputProps } from '@fluentui/react-components';
import { Field, Input, makeStyles, tokens } from '@fluentui/react-components';
import { useFormContext } from 'react-hook-form';

const useClasses = makeStyles({
  field: {
    marginBottom: tokens.spacingVerticalXXXL,
  },
  input: {
    padding: `${tokens.spacingVerticalM} ${tokens.spacingHorizontalM}`,
    borderRadius: tokens.borderRadiusNone,
  },
});

interface Props extends Partial<FieldProps> {
  name: string;
  type?: InputProps['type'];
  placeholder?: string;
  contentBefore?: InputProps['contentBefore'];
  contentAfter?: InputProps['contentAfter'];
}

export default function InputField(props: Props) {
  const classes = useClasses();
  const { name, type, placeholder, contentBefore, contentAfter } = props;
  const { register } = useFormContext();

  return (
    <Field {...props} className={classes.field}>
      <Input
        className={classes.input}
        size="large"
        type={type}
        placeholder={placeholder}
        contentBefore={contentBefore}
        contentAfter={contentAfter}
        {...register(name)}
      />
    </Field>
  );
}
