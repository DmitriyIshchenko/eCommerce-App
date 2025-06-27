import { Image, makeStyles, tokens, typographyStyles } from '@fluentui/react-components';
import { ArrowLeftFilled, ArrowRightFilled } from '@fluentui/react-icons';
import { useLocation } from '@tanstack/react-router';
import wornStyleSrc from '../../assets/images/Clean-vs-Worn-v2_2048x2048.webp';
import trainSrc from '../../assets/images/cleanworn.webp';
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
const ARTICLE_TITLE = 'Differences Between Our Clean and Worn Styles';
const BASE_URL = 'https://celestia-art.netlify.app';

export default function StyleDifferencesPage() {
  const { pathname } = useLocation();
  const css = useCss();
  return (
    <div>
      <main className={css.wrapper} style={{ viewTransitionName: 'main-content' }}>
        <div className={css.left}>
          <Image src={trainSrc} fit="cover" block />
          <div className={css.overlay}>
            <h1 className={css.pageTitle}>{ARTICLE_TITLE}</h1>
          </div>
        </div>
        <div className={css.right}>
          <article className={css.articleContainer}>
            <Image src={wornStyleSrc} block fit="cover" />
            <p>
              If you&apos;re interested in one or a few of our prints, you&apos;ve probably come
              across a listing that describes the &apos;Style&apos; as &apos;Clean&apos; or
              &apos;Worn&apos;.
            </p>
            <h2 className={css.title}>What exactly are the differences you might wonder?</h2>
            <p>
              Our &apos;Clean&apos; style is simply referencing a print that&nbsp;has solid colors
              that are very simple in appearance.&nbsp;
            </p>
            <p>
              Our &apos;Worn&apos; style has a more distressed or vintage appearance. The
              &apos;Worn&apos; style does not mean the print has a textured feel of being aged or
              distressed. It just simply means we have applied an image overlay to the print to give
              it that faux vintage&nbsp;style and aged look.
            </p>
            <p>
              The print surface of our &apos;Worn&apos; Style is just as smooth as that of our
              &apos;Clean&apos; style, however, the &apos;Worn&apos; style will have the appearance
              of a print that&nbsp;was once in the confines of an old warehouse or&nbsp;classic
              English pub.
            </p>
            <p>
              Should you opt for one of our &apos;Worn&apos; style&nbsp;prints, you can expect a
              high quality distressed looking image overlay that is still sharp in detail and
              overall appearance.
            </p>
            <p>
              Many of our customers who are uncertain about which style to go with are typically
              pointed in the direction of the &apos;Clean&apos; look print as it could be considered
              the safer of the two options. The &apos;Clean&apos; style has a sophisticated look in
              comparison to our &apos;Worn&apos; style prints which have a more vintage or aged
              characteristic.
            </p>
            <p>
              Whichever you may prefer, we think you&apos;ll be delighted with the quality and care
              that has gone in to creating our prints.
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
              href={`https://pinterest.com/pin/create/button/?url=${BASE_URL}${pathname}&media=${wornStyleSrc}?description=${encodeURIComponent(ARTICLE_TITLE)}`}
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
        <InternalLink to="/pages/material-differences" viewTransition={{ types: ['slide-right'] }}>
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
        <InternalLink to="/pages/custom-framing" viewTransition={{ types: ['slide-left'] }}>
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
