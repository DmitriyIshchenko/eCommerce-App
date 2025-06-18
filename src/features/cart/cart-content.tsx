import { Button, makeStyles, Text, Title2, tokens } from '@fluentui/react-components';
import { useCart } from '../../hooks/use-cart';
import formatPrice from '../../lib/utils/format-price';
import CartItem from './cart-item';
import { DeleteRegular } from '@fluentui/react-icons';
import { getSumPrice } from '../../lib/utils/get-price-sum';
import StyledTooltip from '../../components/ui/tooltips/styled';

const useStyles = makeStyles({
  buttonIcon: {
    ':hover': {
      color: tokens.colorNeutralForeground2,
      ':active': {
        color: tokens.colorNeutralForeground4,
      },
    },
  },
});

export default function CartContent() {
  const styles = useStyles();
  const { cart, removeDiscountCode } = useCart();

  const totalPrice = cart?.totalPrice;
  const discountPrice = cart?.discountOnTotalPrice?.discountedAmount;
  const items = cart?.lineItems ?? [];
  const totalItems = cart?.totalLineItemQuantity;
  const promoCodeIds = cart?.discountCodes ?? [];

  const handleRemovePromoCode = async () => {
    if (promoCodeIds.length === 0) return;

    try {
      await Promise.all(
        promoCodeIds.map((promoCode) => removeDiscountCode(promoCode.discountCode.id)),
      );
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      {items.map((item) => (
        <CartItem item={item} key={item.id} />
      ))}

      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <Text>
          Products, ({totalItems} items):{' '}
          {getSumPrice(formatPrice(totalPrice), formatPrice(discountPrice))}
        </Text>

        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Text>Discount: -{formatPrice(discountPrice)}</Text>

          {promoCodeIds?.length > 0 && (
            <StyledTooltip contentChildren="Remove Discount">
              <Button
                appearance="transparent"
                size="small"
                icon={<DeleteRegular fontSize={tokens.fontSizeBase400} />}
                onClick={() => void handleRemovePromoCode()}
                className={styles.buttonIcon}
              />
            </StyledTooltip>
          )}
        </div>
      </div>

      <Title2>Total: {formatPrice(totalPrice)}</Title2>
    </div>
  );
}
