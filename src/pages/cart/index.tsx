import { LargeTitle } from '@fluentui/react-components';
import { useCart } from '../../hooks/use-cart';

import { useColumnsStyles } from '../../styles/columns-layout';
import EmptyCartMessage from '../../features/cart/empty-cart-message';
import ClearCartDialog from '../../features/cart/clear-cart-dialog';
import CartContent from '../../features/cart/cart-content';
import AddPromoDialog from '../../features/cart/add-promo-dialog';

export default function CartPage() {
  const styles = useColumnsStyles();
  const { isCartEmpty } = useCart();

  return (
    <div>
      <div className={styles.left}>
        <LargeTitle as="h1" align="center">
          Shopping cart
        </LargeTitle>

        {!isCartEmpty() && (
          <>
            <AddPromoDialog />
            <ClearCartDialog />
          </>
        )}
      </div>
      <div className={styles.right}>{isCartEmpty() ? <EmptyCartMessage /> : <CartContent />}</div>
    </div>
  );
}
