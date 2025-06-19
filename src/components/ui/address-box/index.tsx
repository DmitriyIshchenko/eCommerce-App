import type { Address } from '@commercetools/platform-sdk';
import LabelBox from '../label-box';
import { Label, makeStyles } from '@fluentui/react-components';

interface Props {
  title: string;
  address: Address;
}

const useStyles = makeStyles({
  address: {
    display: 'flex',
    justifyContent: 'space-between',

    '@media (max-width: 768px)': {
      display: 'grid',
    },
  },
});

export default function AddressBox({
  title,
  address: { city, streetName, postalCode, country },
}: Props) {
  const styles = useStyles();
  return (
    <>
      <Label weight="semibold" size="large">
        {title}
      </Label>

      <div className={styles.address}>
        <LabelBox weight="semibold" title="City" content={city} />
        <LabelBox weight="semibold" title="Street" content={streetName} />
        <LabelBox weight="semibold" title="Postal code" content={postalCode} />
        <LabelBox weight="semibold" title="Country" content={country} />
      </div>
    </>
  );
}
