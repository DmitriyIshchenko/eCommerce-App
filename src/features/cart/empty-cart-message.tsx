import { LargeTitle, makeStyles } from '@fluentui/react-components';
import ButtonLink from '../../components/ui/links/button';
import { Cart24Regular } from '@fluentui/react-icons';

const useStyles = makeStyles({
  message: {
    position: 'relative',

    height: '100%',
    display: 'grid',
    placeContent: 'center',
    textAlign: 'center',

    '& > a': {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translateX(-50%)',
      marginTop: '70px',
      width: 'max-content',
    },
  },
});

export default function EmptyCartMessage() {
  const styles = useStyles();
  return (
    <div className={styles.message}>
      <LargeTitle align="center">Your cart is empty!</LargeTitle>

      <ButtonLink
        text="Continue shopping"
        to="/catalog/$category/$"
        params={{ category: 'all' }}
        icon={<Cart24Regular />}
      />
    </div>
  );
}
