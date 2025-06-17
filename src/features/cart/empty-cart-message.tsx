import { LargeTitle, makeStyles, tokens } from '@fluentui/react-components';
import ButtonLink from '../../components/ui/links/button';
import { Cart24Regular } from '@fluentui/react-icons';

const useStyles = makeStyles({
  message: {
    height: '100%',
    display: 'grid',
    gap: tokens.spacingVerticalXXXL,
    placeContent: 'center',
    textAlign: 'center',
  },
});

export default function EmptyCartMessage() {
  const styles = useStyles();
  return (
    <div className={styles.message}>
      <LargeTitle>Your cart is empty!</LargeTitle>

      <ButtonLink
        text="Continue shopping"
        to="/catalog/$category/$"
        params={{ category: 'all' }}
        icon={<Cart24Regular />}
      />
    </div>
  );
}
