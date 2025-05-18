import { City24Regular, Home24Regular, Mail24Regular } from '@fluentui/react-icons';
import InputField from '../input-field';
import { useFormContext } from 'react-hook-form';
import SelectField from '../select-field';
import type { RegisterSchema } from '../../../lib/schemas/user';
import { countryOptions } from '../../../lib/country-options';
import { Label, makeStyles, tokens } from '@fluentui/react-components';

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
  title?: string;
}

export default function AddressFieldset(props: Props) {
  const styles = useStyles();
  const {
    formState: { errors },
  } = useFormContext<RegisterSchema>();

  const { title } = props;

  return (
    <fieldset className={styles.fieldset}>
      <Label weight="semibold" size="large" className={styles.label}>
        {title}
      </Label>
      <InputField
        label="City"
        placeholder="Albuquerque"
        name="addresses.0.city"
        type="text"
        contentBefore={<City24Regular />}
        message={errors.addresses?.[0]?.city?.message}
      />

      <InputField
        label="Street"
        placeholder="308 Negra Arroyo Lane"
        name="addresses.0.streetName"
        type="text"
        contentBefore={<Home24Regular />}
        message={errors.addresses?.[0]?.streetName?.message}
      />

      <InputField
        label="Postal Code"
        placeholder="Postal code in your country"
        name="addresses.0.postalCode"
        type="text"
        contentBefore={<Mail24Regular />}
        message={errors.addresses?.[0]?.postalCode?.message}
      />

      <SelectField
        label="Country"
        name="addresses.0.country"
        options={countryOptions}
        message={errors.addresses?.[0]?.country?.message}
      />
    </fieldset>
  );
}
