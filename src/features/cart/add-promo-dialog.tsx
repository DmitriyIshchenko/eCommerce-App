import {
  Dialog,
  DialogActions,
  DialogBody,
  DialogContent,
  DialogSurface,
  DialogTitle,
  DialogTrigger,
  Input,
  makeStyles,
  Spinner,
  Toast,
  ToastBody,
  ToastTitle,
  tokens,
  useId,
  useToastController,
  type ToastIntent,
} from '@fluentui/react-components';
import { useCart } from '../../hooks/use-cart';
import CustomButton from '../../components/ui/buttons/custom';
import { TextPercentRegular } from '@fluentui/react-icons';
import { useRef } from 'react';
import { TOASTER_ID } from '../../lib/constants';
import { useLoading } from '../../hooks/use-loading';

interface NotifyOptions {
  title: string;
  content: string;
  intent: ToastIntent | 'progress';
  timeout: number;
}

const useStyles = makeStyles({
  input: {
    padding: `${tokens.spacingVerticalM} ${tokens.spacingHorizontalS}`,
    borderRadius: tokens.borderRadiusNone,
  },
  triggerButton: { marginTop: tokens.spacingVerticalL },
});

export default function AddPromoDialog() {
  const styles = useStyles();
  const inputRef = useRef<HTMLInputElement>(null);
  const { setLoading } = useLoading();
  const { addDiscountCode, removeDiscountCode } = useCart();
  const progressToastId = useId('progress');
  const { dispatchToast, dismissToast } = useToastController(TOASTER_ID);

  const notify = ({ title, content, intent, timeout }: NotifyOptions) => {
    switch (intent) {
      case 'progress':
        dispatchToast(
          <Toast>
            <ToastTitle media={<Spinner size="tiny" />}>{title}</ToastTitle>
            <ToastBody>{content}</ToastBody>
          </Toast>,
          { toastId: progressToastId },
        );
        break;
      default:
        dispatchToast(
          <Toast>
            <ToastTitle>{title}</ToastTitle>
            <ToastBody>{content}</ToastBody>
          </Toast>,
          { intent, timeout },
        );
    }
  };

  const handleAddPromo = async () => {
    const promo = inputRef.current?.value.trim();

    if (!promo) return;

    try {
      setLoading(true);
      notify({
        title: 'Loading...',
        intent: 'progress',
        content: 'Will take a second!',
        timeout: -1,
      });

      const updatedCart = await addDiscountCode(promo);

      if (updatedCart?.discountCodes?.length) {
        const invalidCode = updatedCart.discountCodes.find(
          (code) => code.state === 'DoesNotMatchCart',
        );

        if (invalidCode?.discountCode?.id) {
          await removeDiscountCode(invalidCode.discountCode.id);
          throw new Error('The promo code is not valid for the current items.');
        }
      }

      notify({
        title: `Discount added to your cart! 😄`,
        content: 'Great art, even greater price — your cart is now more inspiring.',
        intent: 'success',
        timeout: 4000,
      });

      setLoading(false);
      dismissToast(progressToastId);
    } catch (error) {
      setLoading(false);
      dismissToast(progressToastId);

      if (error instanceof Error) {
        notify({
          title: 'Oops...',
          content: `${error.message} 😔`,
          intent: 'error',
          timeout: 4000,
        });
      }
    }
  };

  return (
    <Dialog>
      <DialogTrigger disableButtonEnhancement>
        <CustomButton shape="circular" className={styles.triggerButton}>
          Add promo code
        </CustomButton>
      </DialogTrigger>
      <DialogSurface>
        <DialogBody>
          <DialogTitle>Add your promo code!</DialogTitle>
          <DialogContent style={{ display: 'flex', flexDirection: 'column' }}>
            <Input
              className={styles.input}
              size="large"
              placeholder="Enter a promo code"
              contentBefore={<TextPercentRegular />}
              ref={inputRef}
            />
          </DialogContent>
          <DialogActions>
            <DialogTrigger disableButtonEnhancement>
              <CustomButton shape="circular" onClick={() => void handleAddPromo()}>
                Apply
              </CustomButton>
            </DialogTrigger>
            <DialogTrigger disableButtonEnhancement>
              <CustomButton appearance="subtle" outlined shape="circular">
                Cancel
              </CustomButton>
            </DialogTrigger>
          </DialogActions>
        </DialogBody>
      </DialogSurface>
    </Dialog>
  );
}
