import { Field, makeStyles, tokens } from '@fluentui/react-components';
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

interface Props<T extends FieldValues> extends UseControllerProps<T> {
  label: string;
  placeholder?: string;
}

export default function DatePickerField<T extends FieldValues>({
  name,
  label,
  placeholder,
}: Props<T>) {
  const styles = useStyles();

  const { control } = useFormContext<T>();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
        <Field label={label} validationMessage={error?.message} className={styles.picker}>
          <DatePicker
            size="large"
            className={styles.picker}
            onSelectDate={(date) => onChange(date)}
            onBlur={onBlur}
            placeholder={placeholder}
            value={value || null}
          />
        </Field>
      )}
    />
  );
}
