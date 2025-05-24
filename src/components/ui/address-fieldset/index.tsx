import { City24Regular, Home24Regular, Mail24Regular } from '@fluentui/react-icons';
import SelectField from '../select-field';
import { countryOptions } from '../../../lib/country-options';
import {
  Checkbox,
  Label,
  makeStyles,
  tokens,
  type CheckboxProps,
  type InputProps,
} from '@fluentui/react-components';
import ControlledInputField from '../controlled-input';

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

interface Props extends Partial<InputProps> {
  variant: string;
  isDefaultAddress: CheckboxProps['checked'];
  setIsDefaultAddress: React.Dispatch<React.SetStateAction<CheckboxProps['checked']>>;
}

export default function AddressFieldset(props: Props) {
  const styles = useStyles();

  const { variant, isDefaultAddress, setIsDefaultAddress, disabled } = props;

  const index = variant === 'shipping' ? 0 : 1;

  return (
    <fieldset className={styles.fieldset}>
      <Label weight="semibold" size="large" className={styles.label}>
        {variant} address
      </Label>

      <ControlledInputField
        label="City"
        placeholder="Albuquerque"
        name={`addresses.${index}.city`}
        type="text"
        contentBefore={<City24Regular />}
        disabled={disabled}
      />

      <ControlledInputField
        label="Street"
        placeholder="308 Negra Arroyo Lane"
        name={`addresses.${index}.streetName`}
        type="text"
        contentBefore={<Home24Regular />}
        disabled={disabled}
      />

      <ControlledInputField
        label="Postal Code"
        placeholder="Postal code in your country"
        name={`addresses.${index}.postalCode`}
        type="text"
        contentBefore={<Mail24Regular />}
        disabled={disabled}
      />

      <SelectField
        label="Country"
        name={`addresses.${index}.country`}
        options={countryOptions}
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
