import { Title2 } from '@fluentui/react-components';
import { useCart } from '../../hooks/use-cart';
import formatPrice from '../../lib/utils/format-price';
import CartItem from './cart-item';

export default function CartContent() {
  const { cart } = useCart();

  const items = cart?.lineItems ?? [];

  return (
    <div>
      {items.map((item) => (
        <CartItem item={item} key={item.id} />
      ))}

      <Title2>Total: {formatPrice(cart?.totalPrice)}</Title2>
    </div>
  );
}
