import {
  Button,
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

const useStyles = makeStyles({
  clear: { marginTop: tokens.spacingVerticalL },
});

export default function ClearCartDialog() {
  const styles = useStyles();

  const { clearCart } = useCart();
  return (
    <Dialog>
      <DialogTrigger disableButtonEnhancement>
        <Button size="large" shape="circular" className={styles.clear}>
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
}
