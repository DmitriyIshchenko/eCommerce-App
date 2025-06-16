import { Checkbox, type CheckboxProps } from '@fluentui/react-components';
import {
  Controller,
  useFormContext,
  type FieldValues,
  type Path,
  type PathValue,
} from 'react-hook-form';
import { useCheckboxClasses } from './hooks';

interface Props<T extends FieldValues> extends CheckboxProps {
  name: Path<T>;
}

export default function FormCheckbox<T extends FieldValues>(props: Props<T>) {
  const { name } = props;
  const { control } = useFormContext<T>();
  const classes = useCheckboxClasses();
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={false as PathValue<T, typeof name>}
      render={({ field }) => (
        <Checkbox
          labelPosition="before"
          label="Use as default for shipping"
          name={name}
          checked={field.value}
          onChange={(_, d) => field.onChange(d.checked)}
          className={classes.root}
        />
      )}
    />
  );
}
