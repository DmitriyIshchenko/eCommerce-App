import { LargeTitle } from '@fluentui/react-components';
import { useCart } from '../../hooks/use-cart';

import { useColumnsStyles } from '../../styles/columns-layout';
import EmptyCartMessage from '../../features/cart/empty-cart-message';
import ClearCartDialog from '../../features/cart/clear-cart-dialog';
import CartContent from '../../features/cart/cart-content';

export default function CartPage() {
  const styles = useColumnsStyles();
  const { isCartEmpty } = useCart();

  return (
    <div className={styles.page}>
      <div className={styles.title}>
        <LargeTitle as="h1" align="center">
          Shopping cart
        </LargeTitle>

        {!isCartEmpty() && <ClearCartDialog />}
      </div>
      <div className={styles.content}>{isCartEmpty() ? <EmptyCartMessage /> : <CartContent />}</div>
    </div>
  );
}
