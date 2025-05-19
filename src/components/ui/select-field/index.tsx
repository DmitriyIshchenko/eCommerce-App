import type { FieldProps } from '@fluentui/react-components';
import { Field, makeStyles, Select, tokens, useId } from '@fluentui/react-components';
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

export interface Option {
  children: JSX.Element;
  value: string;
}

interface Props extends Partial<FieldProps> {
  message: string | undefined;
  name: string;
  options: Option[];
  disabled?: boolean;
}

export default function SelectField(props: Props) {
  const styles = useClasses();
  const { message, name, options, disabled } = props;
  const { register } = useFormContext();

  const selectId = useId();

  return (
    <Field
      validationState={message ? 'error' : 'none'}
      validationMessage={message}
      className={styles.field}
      {...props}
    >
      <Select
        size="large"
        className={styles.select}
        id={selectId}
        defaultValue={options[0].value}
        {...register(name)}
        disabled={disabled}
      >
        {options.map((option) => option.children)}
      </Select>
    </Field>
  );
}
