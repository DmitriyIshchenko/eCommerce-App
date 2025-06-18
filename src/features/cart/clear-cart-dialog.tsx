import {
  Dialog,
  DialogActions,
  DialogBody,
  DialogContent,
  DialogSurface,
  DialogTitle,
  DialogTrigger,
  makeStyles,
  tokens,
} from '@fluentui/react-components';
import { useCart } from '../../hooks/use-cart';
import CustomButton from '../../components/ui/buttons/custom';

const useStyles = makeStyles({
  clear: { marginTop: tokens.spacingVerticalL },
});

export default function ClearCartDialog() {
  const styles = useStyles();
  const { clearCart } = useCart();

  return (
    <Dialog>
      <DialogTrigger disableButtonEnhancement>
        <CustomButton appearance="subtle" outlined shape="circular" className={styles.clear}>
          Empty Cart
        </CustomButton>
      </DialogTrigger>
      <DialogSurface>
        <DialogBody>
          <DialogTitle>Are you sure you want to clear your cart?</DialogTitle>
          <DialogContent>This action cannot be undone.</DialogContent>
          <DialogActions>
            <DialogTrigger disableButtonEnhancement>
              <CustomButton shape="circular" onClick={() => void clearCart()}>
                Clear cart
              </CustomButton>
            </DialogTrigger>
            <DialogTrigger disableButtonEnhancement>
              <CustomButton appearance="subtle" outlined shape="circular">
                Close
              </CustomButton>
            </DialogTrigger>
          </DialogActions>
        </DialogBody>
      </DialogSurface>
    </Dialog>
  );
}
