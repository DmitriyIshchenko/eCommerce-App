import {
  useFormContext,
  Controller,
  type FieldValues,
  type UseControllerProps,
} from 'react-hook-form';
import type { FieldProps, InputProps } from '@fluentui/react-components';
import { Field, Input, makeStyles, tokens } from '@fluentui/react-components';

const useClasses = makeStyles({
  field: {
    marginBottom: tokens.spacingVerticalL,
  },
  input: {
    padding: `${tokens.spacingVerticalM} ${tokens.spacingHorizontalS}`,
    borderRadius: tokens.borderRadiusNone,
  },
});

interface Props<T extends FieldValues>
  extends UseControllerProps<T>,
    Omit<FieldProps, 'defaultValue'> {
  type?: InputProps['type'];
  placeholder?: string;
  contentBefore?: InputProps['contentBefore'];
  contentAfter?: InputProps['contentAfter'];
  disabled?: boolean;
}

export default function ControlledInputField<T extends FieldValues>(props: Props<T>) {
  const styles = useClasses();
  const { control } = useFormContext<T>();
  const { name, type, placeholder, contentBefore, contentAfter, disabled } = props;

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Field
          className={styles.field}
          validationState={fieldState.error ? 'error' : 'none'}
          validationMessage={fieldState.error?.message}
          {...props}
        >
          <Input
            className={styles.input}
            size="large"
            type={type}
            placeholder={placeholder}
            contentBefore={contentBefore}
            contentAfter={contentAfter}
            disabled={disabled}
            {...field}
            value={field.value ?? ''}
            onChange={(e, data) => {
              field.onChange(data.value);
            }}
          />
        </Field>
      )}
    />
  );
}
