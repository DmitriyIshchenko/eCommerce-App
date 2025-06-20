import { makeStyles, tokens } from '@fluentui/react-components';
import videoSrc from '../../assets/videos/logo.mp4';
import { customTokens } from '../theme/light';

const useCss = makeStyles({
  root: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: customTokens.tokenA,
    color: tokens.colorNeutralForegroundStaticInverted,
    scrollSnapAlign: 'start',
    '@media (max-width: 500px)': {
      flexDirection: 'column',
    },
  },
  video: {
    width: '250px',
    '@media (max-width: 500px)': {
      width: '100%',
    },
  },
  promo: {
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    gap: '5px',
  },
});

export default function AnnouncementBar() {
  const css = useCss();
  return (
    <div className={css.root}>
      <div className={css.promo}>
        <p>Coupon 1</p>
        <p>Coupon 2</p>
        <p>Coupon ...</p>
        <p>Coupon n</p>
      </div>
      <video autoPlay muted className={css.video}>
        <source src={videoSrc} type="video/mp4" />
      </video>
    </div>
  );
}
