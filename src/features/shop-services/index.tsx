import { Text, makeStyles, tokens, typographyStyles } from '@fluentui/react-components';
import { ArrowRightFilled } from '@fluentui/react-icons';
import DeliveryCarIcon from '../../components/ui/icons/delivery-car';
import DispatchClockIcon from '../../components/ui/icons/dispatch-clock';
import StoreIcon from '../../components/ui/icons/store';
import ButtonLink from '../../components/ui/links/button';

const useCss = makeStyles({
  text: {
    fontSize: tokens.fontSizeBase400,
    textAlign: 'center',
    minHeight: '80px',
  },
  title: typographyStyles.subtitle1,
  card: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    lineHeight: 1.5,
    padding: '20px',
    alignItems: 'center',
    maxWidth: '320px',
  },
  wrapper: {
    backgroundColor: tokens.colorNeutralBackground5,
    padding: '20px',
    display: 'flex',
    justifyContent: 'space-around',
    '@media (max-width: 1280px)': {
      flexDirection: 'column',
      alignItems: 'center',
    },
  },
});

export default function ShopServices() {
  const css = useCss();
  return (
    <div className={css.wrapper}>
      <div className={css.card}>
        <DeliveryCarIcon width={64} height={64} strokeWidth={0.4} />
        <Text as="h2" className={css.title}>
          Free & Fast Delivery
        </Text>
        <span className={css.text}>
          A free and fully trackable 3-5 day delivery service on all orders over $150!
        </span>
        <ButtonLink
          to="/pages/delivery"
          text="learn more"
          icon={<ArrowRightFilled />}
          appearance="filled"
          inverted
        />
      </div>
      <div className={css.card}>
        <DispatchClockIcon width={64} height={64} strokeWidth={0.4} />
        <Text as="h2" className={css.title}>
          Quick Dispatch
        </Text>
        <span className={css.text}>
          We aim to have all orders processed and fulfilled in 3-5 business days.
        </span>
        <ButtonLink
          to="/pages/shipping"
          text="learn more"
          icon={<ArrowRightFilled />}
          appearance="filled"
          inverted
        />
      </div>
      <div className={css.card}>
        <StoreIcon width={64} height={64} strokeWidth={0.4} />
        <Text as="h2" className={css.title}>
          American Made
        </Text>
        <span className={css.text}>
          We&apos;re a USA based company with an international reach.
        </span>
        <ButtonLink
          to="/about"
          text="learn more"
          icon={<ArrowRightFilled />}
          appearance="filled"
          inverted
        />
      </div>
    </div>
  );
}
