import { useUser } from '../../../hooks/use-user';
import { DEFAULT_ADDRESS } from '../../../lib/constants';
import AddressBox from '../address-box';
import LabelBox from '../label-box';
import { Button, Label, makeStyles, tokens } from '@fluentui/react-components';

const useStyles = makeStyles({
  personal: {
    display: 'flex',
    justifyContent: 'space-between',

    '@media (max-width: 768px)': {
      display: 'grid',
    },
  },
  info: {
    display: 'grid',
    gap: tokens.spacingVerticalL,
  },
});

export default function AccountInfo() {
  const styles = useStyles();
  const { customer } = useUser();

  if (!customer) return;

  const shippingAddress =
    customer.addresses.find((address) => address.id === customer.defaultShippingAddressId) ??
    DEFAULT_ADDRESS;

  const billingAddress =
    customer.addresses.find((address) => address.id === customer.defaultBillingAddressId) ??
    DEFAULT_ADDRESS;

  const regularAddresses = customer.addresses.filter(
    (address) =>
      address.id !== customer.defaultShippingAddressId &&
      address.id !== customer.defaultBillingAddressId,
  );

  return (
    <div className={styles.info}>
      <Label weight="semibold" size="large">
        Personal information
      </Label>
      <div className={styles.personal}>
        <LabelBox size="large" title="First Name" content={customer.firstName} />
        <LabelBox size="large" title="Last Name" content={customer.lastName} />
        <LabelBox size="large" title="Date of birth" content={customer.dateOfBirth} />
      </div>

      <AddressBox title="Shipping Address" address={shippingAddress} />
      <AddressBox title="Billing Address" address={billingAddress} />

      {regularAddresses.map((address) => (
        <AddressBox key={address.streetName} title="Address" address={address} />
      ))}

      <Button>Edit personal info</Button>
      <Button>Manage addresses</Button>
      <Button>Change password</Button>
    </div>
  );
}
