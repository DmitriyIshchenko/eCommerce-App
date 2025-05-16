import type { FieldProps } from '@fluentui/react-components';
import { Field, makeStyles, Select, tokens } from '@fluentui/react-components';
import { useFormContext } from 'react-hook-form';

const useClasses = makeStyles({
  field: {
    marginBottom: tokens.spacingVerticalL,
  },
  select: {
    '& select': {
      padding: `${tokens.spacingVerticalM} ${tokens.spacingHorizontalM}`,
      height: '100%',
      borderRadius: tokens.borderRadiusNone,
    },
  },
});

interface Props extends Partial<FieldProps> {
  message: string | undefined;
  name: string;
  options: string[];
}

export default function SelectField(props: Props) {
  const styles = useClasses();
  const { message, name, options } = props;
  const { register, getFieldState } = useFormContext();

  const getValidationState = () => {
    if (message) return 'error';
    if (getFieldState(name).isDirty) return 'success';
    return 'none';
  };

  const getValidationMessage = () => {
    if (message) return message;
  };

  return (
    <Field
      validationState={getValidationState()}
      validationMessage={getValidationMessage()}
      {...props}
      className={styles.field}
    >
      <Select size="large" className={styles.select} {...register(name)}>
        {options.map((value) => (
          <option key={value}>{value}</option>
        ))}
      </Select>
    </Field>
  );
}
