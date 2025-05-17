import { Field, makeStyles, tokens, type FieldProps } from '@fluentui/react-components';
import {
  Controller,
  useFormContext,
  type FieldValues,
  type UseControllerProps,
} from 'react-hook-form';
import { DatePicker } from '@fluentui/react-datepicker-compat';

const useStyles = makeStyles({
  field: {
    marginBottom: tokens.spacingVerticalL,
  },
  picker: {
    paddingBlock: tokens.spacingVerticalM,
    borderRadius: tokens.borderRadiusNone,
  },
});

interface Props<T extends FieldValues>
  extends UseControllerProps<T>,
    Omit<FieldProps, 'defaultValue'> {
  label: string;
  placeholder?: string;
}

export default function DatePickerField<T extends FieldValues>(props: Props<T>) {
  const styles = useStyles();

  const { name, placeholder } = props;

  const { control } = useFormContext<T>();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
        <Field validationMessage={error?.message} className={styles.picker} {...props}>
          <DatePicker
            size="large"
            className={styles.picker}
            onSelectDate={onChange}
            onBlur={onBlur}
            placeholder={placeholder}
            value={value || null}
          />
        </Field>
      )}
    />
  );
}
