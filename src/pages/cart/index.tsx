import { LargeTitle, makeStyles, Title2, tokens } from '@fluentui/react-components';
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
});

export default function CartPage() {
  const columnsStyles = useColumnsStyles();
  const cartStyles = useCartPageStyles();
  const { cart } = useCart();

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

  return (
    <div className={columnsStyles.page}>
      <div className={columnsStyles.title}>
        <LargeTitle as="h1" align="center">
          Shopping cart
        </LargeTitle>
      </div>
      <div className={columnsStyles.content}>
        {items.length === 0 ? emptyMessage : renderedCart}
      </div>
    </div>
  );
}
