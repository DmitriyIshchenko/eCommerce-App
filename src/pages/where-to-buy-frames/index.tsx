import { Image, makeStyles, tokens, typographyStyles } from '@fluentui/react-components';
import { ArrowLeftFilled, ArrowRightFilled } from '@fluentui/react-icons';
import { useLocation } from '@tanstack/react-router';
import shopSrc from '../../assets/images/shop.webp';
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
const ARTICLE_TITLE = 'Where To Buy Frames For Your WaH Art';
const BASE_URL = 'https://celestia-art.netlify.app';

export default function WhereToBuyFramesPage() {
  const { pathname } = useLocation();
  const css = useCss();
  return (
    <div>
      <main className={css.wrapper} style={{ viewTransitionName: 'main-content' }}>
        <div className={css.left}>
          <Image src={shopSrc} fit="cover" block />
          <div className={css.overlay}>
            <h1 className={css.pageTitle}>{ARTICLE_TITLE}</h1>
          </div>
        </div>
        <div className={css.right}>
          <article className={css.articleContainer}>
            <h2 className={css.title}>Frame Your Prints Affordably</h2>
            <p>
              So, you&apos;ve made the big decision to purchase a print or few to hang on your wall.
              You&apos;re no longer a teenager and those posters you could once tack onto your
              bedroom wall will no longer cut it. You&apos;re refining your sense of style and
              entering the big world of interior design and to help really make you empty wall space
              come to life, you need to frame your art. Well, we have a few simple, affordable and
              hopefully useful suggestions that will go a long way in&nbsp;helping save you
              money&nbsp;as well as leading you in the right direction of purchasing picture frames
              that will compliment your design vision.
            </p>
            <p>
              We won&apos;t be making recommendations about should you&nbsp;add a mat border, should
              you go with acrylic or glass, should you have your print mounted before framing or any
              other stylistic questions. But, if we were to give one point of advice, if your budget
              allows for it, always&nbsp;frame with UV glass, especially if any of your wall art
              will have significant exposure to the sun. If you can&apos;t afford UV glass, then a
              handy trick that has been passed along to us is to purchase a can of UV spray at an
              art store and apply it to the surface of your print.
            </p>
            <p>
              We will tell you, however, of some places our customers have had success framing the
              prints they have purchased from us. Most of our customers want the Restoration
              Hardware frame look, but don&apos;t know where to purchase the frames from. So, where
              do RH get their frames from? The answer is, from a custom frame shop in Pennsylvania.
              The frames are made specifically for their artwork. When we asked RH where to purchase
              a replacement frame for one of their wall art pieces that had a damaged frame, they
              recommended the EXACT places we&apos;re recommending to you in this article, local
              craft stores.
            </p>
            <p>
              What we have found in the process of recommending frames to our clients is they are
              looking for sturdy and nicely designed frames. It seems that a lot of frame shops
              offer frames that look like the frame moldings&nbsp;that are straight from the Palace
              of Versailles or the Vatican. The ornate and gaudy frames that seemed to consume your
              eyesight when visiting a local frame shop or even an online retailer remind you of
              your Grandmother&apos;s house that hasn&apos;t been on trend for 60 years.
            </p>
            <h2 className={css.title}>Where To Frame - Affordable Options</h2>
            <p>
              We recommend&nbsp;four places that may be local to you for framing. They are{' '}
              <ExternalLink
                href="http://www.michaels.com/shop/frames/809188411"
                target="_blank"
                rel="noopener noreferrer"
                staticStick
                style={{ fontSize: tokens.fontSizeBase300 }}
              >
                Michaels
              </ExternalLink>
              {', '}
              <ExternalLink
                href="https://www.hobbylobby.com/custom-framing"
                staticStick
                style={{ fontSize: tokens.fontSizeBase300 }}
              >
                Hobby Lobby
              </ExternalLink>
              {', '}
              <ExternalLink
                href="https://www.joann.com/home-decor-and-holiday/frames-and-wall-art/picture-frames/"
                staticStick
                style={{ fontSize: tokens.fontSizeBase300 }}
              >
                Joann Fabrics
              </ExternalLink>
              {',or '}
              <ExternalLink
                href="http://www.aaronbrothers.com/custom-framing/"
                staticStick
                style={{ fontSize: tokens.fontSizeBase300 }}
              >
                Aaron Brothers Framing
              </ExternalLink>
              .
            </p>
            <p>
              Before visiting any of these local craft stores for your framing needs, always check
              online for their framing specials. Each of these places is notorious for running
              specials on their custom framing services so if there&apos;s not a deal to be had on
              one day, check the very next because the promos they run are constant.
            </p>
            <p>
              Of these places we&apos;ve mentioned so far, we really like Aaron Brother Framing,
              particularly their studio collection. If you are looking for the Restoration Hardware
              picture frames style, then definitely devote your time to the &apos;Studio&apos;
              collection they offer. We have seen nearly the exact frame styles RH offers, but in
              just a slightly lighter or darker color at Aaron Brothers.
            </p>
            <p>
              Some of our prints are sized so that you don&apos;t need a custom frame made at all.
              For these prints, simply check the premade frames aisles at the stores we&apos;ve
              recommended and you will find common frame sizes very inexpensively, particularly if
              you are just in need of a simple black frame.
            </p>
            <h2 className={css.title}>Online Picture Framers</h2>
            <p>
              In addition to places mentioned above, we do also recommend two online picture framing
              options if you do not have a Michaels, Hobby Lobby, Joanne Fabrics or Aaron
              Brothers&nbsp; near you. They are either&nbsp;
              <br />
              <ExternalLink
                rel="#external-link-overlay nofollow noopener noreferrer"
                target="_blank"
                href="http://arttoframe.com/"
                staticStick
                style={{ fontSize: tokens.fontSizeBase300 }}
              >
                arttoframe.com
              </ExternalLink>
              <br />
              <ExternalLink
                rel="#external-link-overlay nofollow noopener noreferrer"
                target="_blank"
                href="http://pictureframes.com/"
                staticStick
                style={{ fontSize: tokens.fontSizeBase300 }}
              >
                pictureframes.com
              </ExternalLink>
            </p>
            <p>
              - Each of these two online frame shops can supply nice looking frames at reasonable
              prices. If you go with one of the online framing options, may we suggest that you skip
              adding acrylic or glass to your order and simply have a local framer add this for you.
              This saves you on the shipping and insurance cost.
            </p>
            <p>
              We realize some of these suggestions require a bit of legwork, but getting a large
              frame doesn&apos;t have to be a large pain.
            </p>
            <ExternalLink
              rel="#external-link-overlay nofollow noopener noreferrer"
              target="_blank"
              href="http://pictureframes.com/"
              staticStick
              style={{ fontSize: tokens.fontSizeBase300 }}
            >
              pictureframes.com
            </ExternalLink>{' '}
            <span>
              will send you the frame unassembled and it is pretty straightforward to then put it
              together as it usually takes&nbsp;anywhere between 5 -&nbsp;20 minutes to do. Feel
              free to give pictureframes.com a call as well as they can help answer any questions
              you may have.
            </span>
            <p>
              <span>With&nbsp;</span>
              <ExternalLink
                rel="#external-link-overlay nofollow noopener noreferrer"
                target="_blank"
                href="http://pictureframes.com/"
                staticStick
                style={{ fontSize: tokens.fontSizeBase300 }}
              >
                pictureframes.com
              </ExternalLink>
              <span>
                &nbsp;if you quote code MONARCH upon placing your order, you&apos;ll receive 20% off
                the entire purchase price as an FYI.&nbsp;
              </span>
            </p>
            <h2 className={css.title}>Splurge</h2>
            <p>
              <span>
                Ok, so where to have your prints framed if budget isn&apos;t an option? Then, may we
                suggest the following places as the frames they offer are worth what you pay,
                especially if your ambition is to match the Restoration Hardware wall decor framed
                look:
              </span>
            </p>
            <div>
              <ExternalLink
                href="http://www.gill-lagodich.com/custom-replica-frames/#/project-3/"
                target="_blank"
                rel="noopener noreferrer"
                style={{ fontSize: tokens.fontSizeBase300 }}
              >
                <span>Gill Lagodich</span>
              </ExternalLink>
            </div>
            <div>
              <ExternalLink
                href="http://www.heydenryk.com/reproductions.html"
                target="_blank"
                rel="noopener noreferrer"
                style={{ fontSize: tokens.fontSizeBase300 }}
              >
                <span>House of Heydenryk</span>
              </ExternalLink>
            </div>
            <div>
              <ExternalLink
                href="https://www.lowy1907.com/framing"
                target="_blank"
                rel="noopener noreferrer"
                style={{ fontSize: tokens.fontSizeBase300 }}
              >
                <span>Lowy - Antique Frames</span>
              </ExternalLink>
            </div>
            <div>
              <ExternalLink
                href="http://creativeworksmoldings.com/"
                target="_blank"
                rel="noopener noreferrer"
                style={{ fontSize: tokens.fontSizeBase300 }}
              >
                <span>Creative Works</span>
              </ExternalLink>
            </div>
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
              href={`https://pinterest.com/pin/create/button/?url=${BASE_URL}${pathname}&media=${shopSrc}?description=${encodeURIComponent(ARTICLE_TITLE)}`}
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
        <InternalLink to="/pages/custom-framing" viewTransition={{ types: ['slide-right'] }}>
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
        <InternalLink to="/pages/material-differences" viewTransition={{ types: ['slide-left'] }}>
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
