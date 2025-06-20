import { Image, makeStyles, mergeClasses, tokens } from '@fluentui/react-components';
import blueprintSrc from '../../assets/images/architecture-blueprint.jpg';
import handDrownSrc from '../../assets/images/architecture-hand-drown.jpg';
import earthSrc from '../../assets/images/astronomy-earth.jpg';
import moonSrc from '../../assets/images/astronomy-moon.jpg';
import noveltySrc from '../../assets/images/astronomy-novelty.jpg';
import botanicalSrc from '../../assets/images/fine-art-botanical.jpg';
import colorTheorySrc from '../../assets/images/fine-art-color-theory.png';
import curiositiesSrc from '../../assets/images/fine-art-curiosities.jpg';
import photographsSrc from '../../assets/images/fine-art-photographs.jpg';
import technicalSrc from '../../assets/images/fine-art-technical.jpg';
import zoologySrc from '../../assets/images/fine-art-zoology.jpg';
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
    '@media (max-width: 768px)': {
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
    '@media (max-width: 768px)': {
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
    '@media (max-width: 768px)': {
      display: 'flex',
    },
  },
  text: {
    fontSize: tokens.fontSizeBase400,
    '@media (max-width: 768px)': { textAlign: 'center' },
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
      '@media (max-width: 768px)': {
        backgroundColor: 'white',
      },
    },
  },
});

export default function CollectionsOverview() {
  const css = useCss();

  return (
    <>
      <InternalLink
        to="/catalog/$category/$"
        params={{ category: 'astronomy', _splat: 'art' }}
        appearance="stickless"
        style={{ width: '100%' }}
      >
        <div className={css.container}>
          <div className={css.left}>
            <span className={mergeClasses(css.stick, css.text)}>Astronomy - Art</span>
          </div>
          <div className={css.right}>
            <Image src={earthSrc} block fit="cover" />
            <div className={css.overlay}>
              <span className={mergeClasses(css.stick, css.text)}>Astronomy - Art</span>
            </div>
          </div>
        </div>
      </InternalLink>
      <InternalLink
        to="/catalog/$category/$"
        params={{ category: 'astronomy', _splat: 'novelty' }}
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
              Astronomy - Novelty
            </span>
          </div>
          <div className={css.right}>
            <Image
              src={noveltySrc}
              block
              fit="cover"
              style={{ viewTransitionName: 'material-dif-img' }}
            />
            <div className={css.overlay}>
              <span className={mergeClasses(css.stick, css.text)}>Astronomy - Novelty</span>
            </div>
          </div>
        </div>
      </InternalLink>
      <InternalLink
        to="/catalog/$category/$"
        params={{ category: 'astronomy', _splat: 'moon' }}
        appearance="stickless"
        style={{ width: '100%' }}
      >
        <div className={css.container}>
          <div className={css.left}>
            <span className={mergeClasses(css.stick, css.text)}>Astronomy - Moon</span>
          </div>
          <div className={css.right}>
            <Image src={moonSrc} block fit="cover" />
            <div className={css.overlay}>
              <span className={mergeClasses(css.stick, css.text)}>Astronomy - Moon</span>
            </div>
          </div>
        </div>
      </InternalLink>
      <InternalLink
        to="/catalog/$category/$"
        params={{ category: 'architecture', _splat: 'blueprints' }}
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
              Architecture - Blueprints
            </span>
          </div>
          <div className={css.right}>
            <Image
              src={blueprintSrc}
              block
              fit="cover"
              style={{ viewTransitionName: 'material-dif-img' }}
            />
            <div className={css.overlay}>
              <span className={mergeClasses(css.stick, css.text)}>Architecture - Blueprints</span>
            </div>
          </div>
        </div>
      </InternalLink>
      <InternalLink
        to="/catalog/$category/$"
        params={{ category: 'architecture', _splat: 'hand-drown' }}
        appearance="stickless"
        style={{ width: '100%' }}
      >
        <div className={css.container}>
          <div className={css.left}>
            <span className={mergeClasses(css.stick, css.text)}>Architecture - Hand Drawn</span>
          </div>
          <div className={css.right}>
            <Image
              src={handDrownSrc}
              block
              fit="cover"
              style={{ viewTransitionName: 'styles-dif-img' }}
            />
            <div className={css.overlay}>
              <span
                className={mergeClasses(css.stick, css.text)}
                style={{ viewTransitionName: 'styles-dif-title' }}
              >
                Architecture - Hand Drawn
              </span>
            </div>
          </div>
        </div>
      </InternalLink>
      <InternalLink
        to="/catalog/$category/$"
        params={{ category: 'fine-art', _splat: 'zoology' }}
        appearance="stickless"
        style={{ width: '100%' }}
      >
        <div className={css.container}>
          <div className={css.left}>
            <span className={mergeClasses(css.stick, css.text)}>Fine Art - Zoology</span>
          </div>
          <div className={css.right}>
            <Image src={zoologySrc} block fit="cover" />
            <div className={css.overlay}>
              <span className={mergeClasses(css.stick, css.text)}>Fine Art - Zoology</span>
            </div>
          </div>
        </div>
      </InternalLink>
      <InternalLink
        to="/catalog/$category/$"
        params={{ category: 'fine-art', _splat: 'curiosities' }}
        appearance="stickless"
        style={{ width: '100%' }}
      >
        <div className={css.container}>
          <div className={css.left}>
            <span className={mergeClasses(css.stick, css.text)}>Fine Art - Curiosities</span>
          </div>
          <div className={css.right}>
            <Image
              src={curiositiesSrc}
              block
              fit="cover"
              style={{ viewTransitionName: 'styles-dif-img' }}
            />
            <div className={css.overlay}>
              <span
                className={mergeClasses(css.stick, css.text)}
                style={{ viewTransitionName: 'styles-dif-title' }}
              >
                Fine Art - Curiosities
              </span>
            </div>
          </div>
        </div>
      </InternalLink>
      <InternalLink
        to="/catalog/$category/$"
        params={{ category: 'fine-art', _splat: 'photographs' }}
        appearance="stickless"
        style={{ width: '100%' }}
      >
        <div className={css.container}>
          <div className={css.left}>
            <span className={mergeClasses(css.stick, css.text)}>Fine Art - Photographs</span>
          </div>
          <div className={css.right}>
            <Image src={photographsSrc} block fit="cover" />
            <div className={css.overlay}>
              <span className={mergeClasses(css.stick, css.text)}>Fine Art - Photographs</span>
            </div>
          </div>
        </div>
      </InternalLink>
      <InternalLink
        to="/catalog/$category/$"
        params={{ category: 'fine-art', _splat: 'color-theory' }}
        appearance="stickless"
        style={{ width: '100%' }}
      >
        <div className={css.container}>
          <div className={css.left}>
            <span className={mergeClasses(css.stick, css.text)}>Fine Art - Color Theory</span>
          </div>
          <div className={css.right}>
            <Image src={colorTheorySrc} block fit="cover" />
            <div className={css.overlay}>
              <span className={mergeClasses(css.stick, css.text)}>Fine Art - Color Theory</span>
            </div>
          </div>
        </div>
      </InternalLink>

      <InternalLink
        to="/catalog/$category/$"
        params={{ category: 'fine-art', _splat: 'technical' }}
        appearance="stickless"
        style={{ width: '100%' }}
      >
        <div className={css.container}>
          <div className={css.left}>
            <span className={mergeClasses(css.stick, css.text)}>Fine Art - Technical</span>
          </div>
          <div className={css.right}>
            <Image src={technicalSrc} block fit="cover" />
            <div className={css.overlay}>
              <span className={mergeClasses(css.stick, css.text)}>Fine Art - Technical</span>
            </div>
          </div>
        </div>
      </InternalLink>
      <InternalLink
        to="/catalog/$category/$"
        params={{ category: 'fine-art', _splat: 'botanical' }}
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
              Fine Art - Botanical
            </span>
          </div>
          <div className={css.right}>
            <Image
              src={botanicalSrc}
              block
              fit="cover"
              style={{ viewTransitionName: 'material-dif-img' }}
            />
            <div className={css.overlay}>
              <span className={mergeClasses(css.stick, css.text)}>Fine Art - Botanical</span>
            </div>
          </div>
        </div>
      </InternalLink>
    </>
  );
}
