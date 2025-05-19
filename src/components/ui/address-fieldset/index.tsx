import { City24Regular, Home24Regular, Mail24Regular } from '@fluentui/react-icons';
import InputField from '../input-field';
import { useFormContext } from 'react-hook-form';
import SelectField from '../select-field';
import type { RegisterSchema } from '../../../lib/schemas/user';
import { countryOptions } from '../../../lib/country-options';
import {
  Checkbox,
  Label,
  makeStyles,
  tokens,
  type CheckboxProps,
} from '@fluentui/react-components';

const useStyles = makeStyles({
  fieldset: {
    border: 'none',
  },
  label: {
    display: 'block',
    marginBlock: tokens.spacingVerticalM,
    textTransform: 'capitalize',
  },
});

interface Props {
  variant: string;
  isDefaultAddress: CheckboxProps['checked'];
  setIsDefaultAddress: React.Dispatch<React.SetStateAction<CheckboxProps['checked']>>;
  disabled?: boolean;
}

export default function AddressFieldset(props: Props) {
  const styles = useStyles();

  const {
    formState: { errors },
  } = useFormContext<RegisterSchema>();

  const { variant, isDefaultAddress, setIsDefaultAddress, disabled } = props;

  const index = variant === 'shipping' ? 0 : 1;

  return (
    <fieldset className={styles.fieldset}>
      <Label weight="semibold" size="large" className={styles.label}>
        {variant} address
      </Label>
      <InputField
        label="City"
        placeholder="Albuquerque"
        name={`addresses.${index}.city`}
        type="text"
        contentBefore={<City24Regular />}
        message={errors.addresses?.[index]?.city?.message}
        disabled={disabled}
      />
      <InputField
        label="Street"
        placeholder="308 Negra Arroyo Lane"
        name={`addresses.${index}.streetName`}
        type="text"
        contentBefore={<Home24Regular />}
        message={errors.addresses?.[index]?.streetName?.message}
        disabled={disabled}
      />
      <InputField
        label="Postal Code"
        placeholder="Postal code in your country"
        name={`addresses.${index}.postalCode`}
        type="text"
        contentBefore={<Mail24Regular />}
        message={errors.addresses?.[index]?.postalCode?.message}
        disabled={disabled}
      />
      <SelectField
        label="Country"
        name={`addresses.${index}.country`}
        options={countryOptions}
        message={errors.addresses?.[index]?.country?.message}
        disabled={disabled}
      />

      <Checkbox
        label={`Use as default for ${variant}`}
        checked={isDefaultAddress}
        onChange={(_, data) => setIsDefaultAddress(data.checked)}
      />
    </fieldset>
  );
}
