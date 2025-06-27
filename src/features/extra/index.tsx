import { Image, makeStyles, mergeClasses, tokens } from '@fluentui/react-components';
import trainSrc from '../../assets/images/cleanworn.webp';
import materialDifSrc from '../../assets/images/difference_between_giclee_and_photo_rag.webp';
import framesSrc from '../../assets/images/frames-birds.webp';
import padikSrc from '../../assets/images/shop.webp';
import { InternalLink } from '../../components/ui/links/fui-tanstack';

const useCss = makeStyles({
  container: {
    display: 'flex',
    scrollSnapAlign: 'start',
    backgroundColor: tokens.colorNeutralBackground1,
    '> div > img': {
      transition: `transform ${tokens.durationSlow}`,
    },
    ':hover': {
      backgroundColor: tokens.colorNeutralBackground1Hover,
      '> div span': {
        '::after': {
          width: '100%',
        },
      },
      '> div > img': {
        transform: 'scale(1.05)',
      },
    },
    '@media (max-width: 1280px)': {
      flexDirection: 'column',
    },
  },
  left: {
    padding: '40px',
    flexBasis: '50%',
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '5%',
    '@media (max-width: 1280px)': {
      display: 'none',
    },
  },
  right: {
    flexBasis: '50%',
    flexGrow: 1,
    position: 'relative',
    overflow: 'hidden',
    lineHeight: 0,
  },
  overlay: {
    position: 'absolute',
    insetBlock: 0,
    zIndex: 1,
    padding: '40px',
    display: 'none',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    gap: '5%',
    color: tokens.colorNeutralForegroundStaticInverted,
    backgroundColor: tokens.colorBackgroundOverlay,
    '@media (max-width: 1280px)': {
      display: 'flex',
    },
  },
  text: {
    fontSize: tokens.fontSizeBase400,
    '@media (max-width: 1280px)': { textAlign: 'center' },
  },
  stick: {
    lineHeight: 1.1,
    '::after': {
      display: 'block',
      height: '1px',
      content: '""',
      width: '0px',
      transition: `width ${tokens.durationNormal} linear`,
      alignSelf: 'start',
      backgroundColor: tokens.colorNeutralForeground1,
      '@media (max-width: 1280px)': {
        backgroundColor: 'white',
      },
    },
  },
});

export default function ExtraBlock() {
  const css = useCss();
  return (
    <>
      <InternalLink
        to="/pages/material-differences"
        appearance="stickless"
        style={{ width: '100%' }}
        resetScroll={true}
        viewTransition
      >
        <div className={css.container}>
          <div className={css.left}>
            <span
              className={mergeClasses(css.stick, css.text)}
              style={{ viewTransitionName: 'material-dif-title' }}
            >
              Differences Between Giclée and Photo Rag Paper
            </span>
          </div>
          <div className={css.right}>
            <Image
              src={materialDifSrc}
              block
              fit="cover"
              style={{ viewTransitionName: 'material-dif-img' }}
            />
            <div className={css.overlay}>
              <span className={mergeClasses(css.stick, css.text)}>
                Differences Between Giclee and Photo Rag Paper
              </span>
            </div>
          </div>
        </div>
      </InternalLink>
      <InternalLink to="/pages/style-differences" appearance="stickless" style={{ width: '100%' }}>
        <div className={css.container}>
          <div className={css.left}>
            <span className={mergeClasses(css.stick, css.text)}>
              Differences Between Our Clean and Worn Styles
            </span>
          </div>
          <div className={css.right}>
            <Image
              src={trainSrc}
              block
              fit="cover"
              style={{ viewTransitionName: 'styles-dif-img' }}
            />
            <div className={css.overlay}>
              <span
                className={mergeClasses(css.stick, css.text)}
                style={{ viewTransitionName: 'styles-dif-title' }}
              >
                Differences Between Our Clean and Worn Styles
              </span>
            </div>
          </div>
        </div>
      </InternalLink>
      <InternalLink to="/pages/custom-framing" appearance="stickless" style={{ width: '100%' }}>
        <div className={css.container}>
          <div className={css.left}>
            <span className={mergeClasses(css.stick, css.text)}>Custom Framing</span>
          </div>
          <div className={css.right}>
            <Image src={framesSrc} block fit="cover" />
            <div className={css.overlay}>
              <span className={mergeClasses(css.stick, css.text)}>Custom Framing</span>
            </div>
          </div>
        </div>
      </InternalLink>
      <InternalLink
        to="/pages/where-to-buy-frames"
        appearance="stickless"
        style={{ width: '100%' }}
      >
        <div className={css.container}>
          <div className={css.left}>
            <span className={mergeClasses(css.stick, css.text)}>
              Where To Buy Frames For Your Wall Art
            </span>
          </div>
          <div className={css.right}>
            <Image src={padikSrc} block fit="cover" />
            <div className={css.overlay}>
              <span className={mergeClasses(css.stick, css.text)}>
                Where To Buy Frames For Your Wall Art
              </span>
            </div>
          </div>
        </div>
      </InternalLink>
    </>
  );
}
