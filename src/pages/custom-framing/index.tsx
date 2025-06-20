import { Image, makeStyles, tokens, typographyStyles } from '@fluentui/react-components';
import { ArrowLeftFilled, ArrowRightFilled } from '@fluentui/react-icons';
import { useLocation } from '@tanstack/react-router';
import frameBirdsSrc from '../../assets/images/frames-birds.webp';
import FacebookIcon from '../../components/ui/icons/facebook';
import PinterestIcon from '../../components/ui/icons/pinterest';
import XIcon from '../../components/ui/icons/x';
import { ExternalLink, InternalLink } from '../../components/ui/links/fui-tanstack';

const useCss = makeStyles({
  wrapper: {
    display: 'flex',
    '@media (max-width: 1280px)': {
      flexDirection: 'column',
    },
  },
  pageTitle: {
    color: tokens.colorNeutralForegroundStaticInverted,
    ...typographyStyles.title1,
  },
  title: {
    color: tokens.colorPaletteRoyalBlueForeground2,
    fontWeight: tokens.fontWeightMedium,
    fontSize: tokens.fontSizeBase400,
    marginBottom: tokens.spacingVerticalS,
  },
  right: {
    flexBasis: '50%',
    padding: '40px',
    paddingBottom: '0',
  },
  articleContainer: {
    maxWidth: '1280px',
    '> p': {
      marginBottom: tokens.spacingVerticalL,
    },
    '> ul': {
      marginLeft: '20px',
      marginBottom: tokens.spacingVerticalL,
      '> li': {
        marginBottom: tokens.spacingVerticalS,
      },
    },
    '> img': {
      marginBottom: tokens.spacingVerticalS,
    },
  },
  left: {
    flexBasis: '50%',
    height: '100dvh',
    position: 'sticky',
    top: 0,
    lineHeight: 0,
    '@media (max-width: 1280px)': {
      position: 'relative',
      height: 'auto',
    },
  },
  overlay: {
    position: 'absolute',
    insetBlock: 0,
    zIndex: 1,
    padding: '40px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    color: tokens.colorNeutralForegroundStaticInverted,
    backgroundColor: tokens.colorBackgroundOverlay,
  },
});
const ARTICLE_TITLE = 'Custom Framing';
const BASE_URL = 'https://celestia-art.netlify.app';

export default function CustomFramingPage() {
  const { pathname } = useLocation();
  const css = useCss();
  return (
    <div>
      <main className={css.wrapper} style={{ viewTransitionName: 'main-content' }}>
        <div className={css.left}>
          <Image src={frameBirdsSrc} fit="cover" block />
          <div className={css.overlay}>
            <h1 className={css.pageTitle}>{ARTICLE_TITLE}</h1>
          </div>
        </div>
        <div className={css.right}>
          <article className={css.articleContainer}>
            <h2 className={css.title}>Custom framing advices for all sizes:</h2>
            <p>
              We recommend a minimum of 3/4&quot; width moulding with a minimum of 1&quot; profile,
              set-back style or Matted with a 1/4&quot; border reveal (we recommend a mat opening
              that is slightly larger than the image area to allow a white border reveal between the
              image and the mat – a border reveal adds depth to the overall framed piece and will
              avoid any potential damage a mat can cause by making contact with the image area.
              Works on paper (such as our prints) are hydroscopic: the paper is made of cotton
              fibers that absorb and release humidity, meaning that large prints may occasionally
              wrinkle inside the frame with changes in humidity. This is normal and if a print is
              framed properly, will relax back to flat as the humidity decreases (framing with a mat
              will minimize this effect). It’s best not to hang artwork in kitchens and bathrooms
              due to the effects of increased humidity.&nbsp; Make sure you’re using a reputable
              framer who understands the nature of archival quality framing of large, limited
              edition artwork. The print should be fixed on acid free rag board using acid free
              adhesives, be loosely hinged, and the acrylic should not be tight fitted–this enables
              everything to expand and contract without causing damage to the print.
            </p>
            <p>
              Framing style is a personal preference, so feel free to frame your print however you
              like. These are only intended to be our framing recommendations for those looking for
              assistance.
            </p>
          </article>
          <div
            style={{
              display: 'flex',
              gap: tokens.spacingHorizontalXS,
              alignItems: 'center',
            }}
          >
            <span style={{ lineHeight: 1, fontSize: tokens.fontSizeBase400 }}>Share:</span>
            <ExternalLink
              href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(ARTICLE_TITLE)}&url=${BASE_URL}${pathname}`}
              appearance="stickless"
              style={{ fontSize: tokens.fontSizeBase600, lineHeight: 1 }}
              target="_blank"
              asBlock
            >
              <XIcon />
            </ExternalLink>
            <ExternalLink
              href={`https://www.facebook.com/sharer.php?u=${BASE_URL}${pathname}`}
              appearance="stickless"
              style={{ fontSize: tokens.fontSizeBase600, lineHeight: 1 }}
              target="_blank"
              asBlock
            >
              <FacebookIcon />
            </ExternalLink>
            <ExternalLink
              href={`https://pinterest.com/pin/create/button/?url=${BASE_URL}${pathname}&media=${frameBirdsSrc}?description=${encodeURIComponent(ARTICLE_TITLE)}`}
              appearance="stickless"
              style={{ fontSize: tokens.fontSizeBase600, lineHeight: 1 }}
              target="_blank"
              asBlock
            >
              <PinterestIcon />
            </ExternalLink>
          </div>
        </div>
      </main>
      <div style={{ padding: 40, display: 'flex', gap: 24, flexWrap: 'wrap' }}>
        <InternalLink to="/pages/style-differences" viewTransition={{ types: ['slide-right'] }}>
          <span
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              width: 'fit-content',
              fontWeight: tokens.fontWeightMedium,
              fontSize: tokens.fontSizeBase300,
            }}
          >
            <ArrowLeftFilled />
            Previous article
          </span>
        </InternalLink>
        <InternalLink to="/pages/where-to-buy-frames" viewTransition={{ types: ['slide-left'] }}>
          <span
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              width: 'fit-content',
              fontWeight: tokens.fontWeightMedium,
              fontSize: tokens.fontSizeBase300,
            }}
          >
            Next article
            <ArrowRightFilled />
          </span>
        </InternalLink>
      </div>
    </div>
  );
}
