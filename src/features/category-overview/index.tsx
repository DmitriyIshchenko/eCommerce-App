import {
  Image,
  Text,
  makeStyles,
  mergeClasses,
  tokens,
  typographyStyles,
} from '@fluentui/react-components';
import { ArrowRightFilled } from '@fluentui/react-icons';
import { useEffect, useRef } from 'react';
import architectureSrc from '../../assets/images/1600px_-_Black_Frame_-_White_Mockup_-_Resized_Frame.webp';
import browseCollectionsSrc from '../../assets/images/cdacaa.webp';
import fineArtSrc from '../../assets/images/family-crest.webp';
import allProductsSrc from '../../assets/images/vpr.webp';
import astronomySrc from '../../assets/images/zodiackiller.webp';
import ButtonLink from '../../components/ui/links/button';

const useCss = makeStyles({
  title: typographyStyles.largeTitle,
  container: {
    display: 'flex',
    scrollSnapAlign: 'start',
    backgroundColor: tokens.colorNeutralBackground6,
    height: '100dvh',
    '@media (max-aspect-ratio: 7/8)': {
      flexDirection: 'column',
      '> div': {
        height: '50%',
        alignItems: 'center',
        '> a': {
          marginTop: '2%',
        },
      },
    },
  },
  left: {
    padding: '10%',
    flexBasis: '50%',
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    gap: '5%',
    '@media (min-aspect-ratio: 2/3) and (max-aspect-ratio: 4/3)': {
      display: 'none',
    },
  },
  odd: {
    order: 1,
    '@media (max-aspect-ratio: 7/8)': {
      order: 0,
    },
  },
  right: {
    flexBasis: '50%',
    flexGrow: 1,
    position: 'relative',
  },
  overlay: {
    position: 'absolute',
    insetBlock: 0,
    zIndex: 1,
    padding: '10%',
    display: 'none',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    gap: '5%',
    color: tokens.colorNeutralForegroundStaticInverted,
    backgroundColor: tokens.colorBackgroundOverlay,
    '@media (min-aspect-ratio: 2/3) and (max-aspect-ratio: 4/3)': {
      display: 'flex',
    },
  },
  text: {
    fontSize: tokens.fontSizeBase400,
    '@media (max-aspect-ratio: 2/3)': { textAlign: 'center' },
  },
  wide: {
    display: 'flex',
    scrollSnapAlign: 'start',
    height: '100dvh',
    position: 'relative',
  },
  wideOverlay: {
    position: 'absolute',
    insetBlock: 0,
    zIndex: 1,
    padding: '10%',
    flexDirection: 'column',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    gap: '5%',
    color: tokens.colorNeutralForegroundStaticInverted,
    backgroundColor: tokens.colorBackgroundOverlay,
  },
});

export default function CategoryOverview() {
  const css = useCss();

  const startRef = useRef(null);
  const endRef = useRef(null);

  useEffect(() => {
    const html = document.documentElement;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.target === startRef.current) {
            if (entry.intersectionRatio === 0) {
              html.style.scrollSnapType = 'y mandatory';
            }
            if (entry.isIntersecting) {
              html.style.scrollSnapType = '';
            }
          }
          if (entry.target === endRef.current) {
            if (entry.isIntersecting) {
              html.style.scrollSnapType = '';
            }
            if (
              entry.intersectionRatio === 0 &&
              entry.boundingClientRect.y > 10 &&
              entry.boundingClientRect.y < 1200
            ) {
              html.style.scrollSnapType = 'y mandatory';
            }
          }
        }
      },
      {
        threshold: 0,
        rootMargin: '0px',
      },
    );
    if (startRef.current) observer.observe(startRef.current);
    if (endRef.current) observer.observe(endRef.current);

    return () => {
      observer.disconnect();
      html.style.scrollSnapType = '';
    };
  }, []);

  const allProductsText = (
    <>
      <Text as="span" className={css.text}>
        Shop It All
      </Text>
      <Text as="h2" className={css.title}>
        All Out Products
      </Text>
      <Text as="span" className={css.text}>
        Various Artwork
      </Text>
    </>
  );
  const architectureText = (
    <>
      <Text as="span" className={css.text}>
        Construct Beautiful Decor
      </Text>
      <Text as="h2" className={css.title}>
        Architecture
      </Text>
      <Text as="span" className={css.text}>
        Gorgeous Large Format Artwork
      </Text>
    </>
  );

  const astronomyText = (
    <>
      <Text as="span" className={css.text}>
        Variety of Archival Works
      </Text>
      <Text as="h2" className={css.title}>
        Astronomy
      </Text>
      <Text as="span" className={css.text}>
        Deck The Walls With Lush Decor
      </Text>
    </>
  );
  const fineArtText = (
    <>
      <Text as="span" className={css.text}>
        Just Arrived
      </Text>
      <Text as="h2" className={css.title}>
        Fine Art
      </Text>
      <Text as="span" className={css.text}>
        Stunning Wall Decor For Any Space
      </Text>
    </>
  );
  const browseCollectionText = (
    <>
      <Text as="span" className={css.text}>
        Recent Addition
      </Text>
      <Text as="h2" className={css.title}>
        Fresh Off The Press
      </Text>
      <Text as="span" className={css.text}>
        Collections
      </Text>
    </>
  );

  return (
    <div>
      <div style={{ height: 0 }} ref={startRef} />
      <section className={css.container}>
        <div className={css.left}>
          {architectureText}
          <ButtonLink text="view it now" to="/catalog/architecture" icon={<ArrowRightFilled />} />
        </div>
        <div className={css.right}>
          <Image src={architectureSrc} block fit="cover" />
          <div className={css.overlay}>
            {architectureText}
            <ButtonLink
              text="view it now"
              to="/catalog/architecture"
              icon={<ArrowRightFilled />}
              staticWhite
            />
          </div>
        </div>
      </section>
      <section className={css.container}>
        <div className={mergeClasses(css.left, css.odd)}>
          {astronomyText}
          <ButtonLink text="see more" to="/catalog/astronomy" icon={<ArrowRightFilled />} />
        </div>
        <div className={css.right}>
          <Image src={astronomySrc} block fit="cover" />
          <div className={css.overlay}>
            {astronomyText}
            <ButtonLink
              text="see more"
              to="/catalog/astronomy"
              icon={<ArrowRightFilled />}
              staticWhite
            />
          </div>
        </div>
      </section>
      <section className={css.container}>
        <div className={css.left}>
          {fineArtText}
          <ButtonLink text="look at" to="/catalog/fine-art" icon={<ArrowRightFilled />} />
        </div>
        <div className={css.right}>
          <Image src={fineArtSrc} block fit="cover" />
          <div className={css.overlay}>
            {fineArtText}
            <ButtonLink
              text="look at"
              to="/catalog/fine-art"
              icon={<ArrowRightFilled />}
              staticWhite
            />
          </div>
        </div>
      </section>
      <section className={css.container}>
        <div className={mergeClasses(css.left, css.odd)}>
          {allProductsText}
          <ButtonLink text="explore all" to="/catalog/all" icon={<ArrowRightFilled />} />
        </div>
        <div className={css.right}>
          <Image src={allProductsSrc} block fit="cover" />
          <div className={css.overlay}>
            {allProductsText}
            <ButtonLink
              text="explore all"
              to="/catalog/all"
              icon={<ArrowRightFilled />}
              staticWhite
            />
          </div>
        </div>
      </section>
      <section className={css.wide}>
        <Image src={browseCollectionsSrc} block fit="cover" />
        <div className={css.wideOverlay}>
          {browseCollectionText}
          <ButtonLink text="browse" to="/catalog" icon={<ArrowRightFilled />} staticWhite />
        </div>
      </section>
      <div style={{ height: 0 }} ref={endRef} />
    </div>
  );
}
