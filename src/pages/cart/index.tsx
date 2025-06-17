import {
  Button,
  Dialog,
  DialogActions,
  DialogBody,
  DialogContent,
  DialogSurface,
  DialogTitle,
  DialogTrigger,
  LargeTitle,
  makeStyles,
  Title2,
  tokens,
} from '@fluentui/react-components';
import CartItem from '../../features/cart/cart-item';
import { useCart } from '../../hooks/use-cart';
import formatPrice from '../../lib/utils/format-price';

import { useColumnsStyles } from '../../styles/columns-layout';
import { InternalLink } from '../../components/ui/links/fui-tanstack';

const useCartPageStyles = makeStyles({
  message: {
    height: '100%',
    display: 'grid',
    gap: tokens.spacingVerticalXXXL,
    placeContent: 'center',
    textAlign: 'center',
  },

  clear: { marginTop: tokens.spacingVerticalL },
});

export default function CartPage() {
  const columnsStyles = useColumnsStyles();
  const cartStyles = useCartPageStyles();
  const { cart, clearCart, isCartEmpty } = useCart();

  const items = cart?.lineItems ?? [];

  const emptyMessage = (
    <div className={cartStyles.message}>
      <LargeTitle>Your cart is empty!</LargeTitle>
      <InternalLink to="/catalog/$category/$" params={{ category: 'all' }}>
        Continue shopping
      </InternalLink>
    </div>
  );

  const renderedCart = (
    <div>
      {items.map((item) => (
        <CartItem item={item} key={item.id} />
      ))}

      <Title2>Total: {formatPrice(cart?.totalPrice)}</Title2>
    </div>
  );

  const clearConfirmationPrompt = (
    <Dialog>
      <DialogTrigger disableButtonEnhancement>
        <Button size="large" shape="circular" className={cartStyles.clear}>
          Empty cart
        </Button>
      </DialogTrigger>
      <DialogSurface>
        <DialogBody>
          <DialogTitle>Are you sure you want to clear your cart?</DialogTitle>
          <DialogContent>This action cannot be undone.</DialogContent>
          <DialogActions>
            <DialogTrigger disableButtonEnhancement>
              <Button appearance="primary" onClick={() => void clearCart()}>
                Clear cart
              </Button>
            </DialogTrigger>
            <DialogTrigger disableButtonEnhancement>
              <Button appearance="secondary">Close</Button>
            </DialogTrigger>
          </DialogActions>
        </DialogBody>
      </DialogSurface>
    </Dialog>
  );

  return (
    <div className={columnsStyles.page}>
      <div className={columnsStyles.title}>
        <LargeTitle as="h1" align="center">
          Shopping cart
        </LargeTitle>

        {!isCartEmpty() && clearConfirmationPrompt}
      </div>
      <div className={columnsStyles.content}>{isCartEmpty() ? emptyMessage : renderedCart}</div>
    </div>
  );
}
