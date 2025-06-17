import { LargeTitle, makeStyles, tokens } from '@fluentui/react-components';
import { InternalLink } from '../../components/ui/links/fui-tanstack';

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
      <InternalLink to="/catalog/$category/$" params={{ category: 'all' }}>
        Continue shopping
      </InternalLink>
    </div>
  );
}
