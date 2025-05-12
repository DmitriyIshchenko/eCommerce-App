import type { FieldProps, InputProps } from '@fluentui/react-components';
import { Field, Input, makeStyles } from '@fluentui/react-components';
import { useFormContext } from 'react-hook-form';

const useClasses = makeStyles({
  field: {
    marginBottom: '30px',
  },
  input: {
    minWidth: '200px',
    height: '54px',
    borderRadius: '0',
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
        type={type}
        placeholder={placeholder}
        contentBefore={contentBefore}
        contentAfter={contentAfter}
        {...register(name)}
      />
    </Field>
  );
}
