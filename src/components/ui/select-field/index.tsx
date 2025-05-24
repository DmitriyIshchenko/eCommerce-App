import type { FieldProps } from '@fluentui/react-components';
import { Field, makeStyles, Select, tokens, useId } from '@fluentui/react-components';
import {
  useFormContext,
  Controller,
  type FieldValues,
  type UseControllerProps,
} from 'react-hook-form';

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

interface Props<T extends FieldValues>
  extends UseControllerProps<T>,
    Omit<FieldProps, 'defaultValue'> {
  options: Option[];
  disabled?: boolean;
}

export default function SelectField<T extends FieldValues>(props: Props<T>) {
  const styles = useClasses();
  const { name, options, disabled } = props;
  const { control } = useFormContext<T>();
  const selectId = useId();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Field
          validationState={fieldState.error ? 'error' : 'none'}
          validationMessage={fieldState.error?.message}
          className={styles.field}
          {...props}
        >
          <Select
            size="large"
            className={styles.select}
            id={selectId}
            value={field.value || options[0].value}
            onBlur={field.onBlur}
            onChange={(_, data) => field.onChange(data.value)}
            disabled={disabled}
          >
            {options.map((option) => option.children)}
          </Select>
        </Field>
      )}
    />
  );
}
