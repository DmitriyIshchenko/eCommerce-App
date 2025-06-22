import {
  Image,
  makeStyles,
  mergeClasses,
  Text,
  tokens,
  typographyStyles,
} from '@fluentui/react-components';
import shopAllSrc from '../../assets/images/nasa-exoplanet-art-kepler-16b-3.jpg';
import fineArtSrc from '../../assets/images/gutzon-borglum-mount-rushmores-abraham-lincoln-2.jpg';
import fineArtZoologySrc from '../../assets/images/whimsical-bird-3.jpg';
import fineArtCuriositiesSrc from '../../assets/images/classic-car-ford-model-t-1911-3.jpg';
import fineArtPhotographsSrc from '../../assets/images/floating-lady-13.jpg';
import fineArtColorTheorySrc from '../../assets/images/color-wheel-10.jpg';
import fineArtTechnicalSrc from '../../assets/images/motorcycle-patent-gottschalk-harley-1901-1.jpg';
import fineArtBotanicalSrc from '../../assets/images/18th-century-french-botanical-robinia-viscosa-11.jpg';
import astronomySrc from '../../assets/images/conquest-of-space-10.jpg';
import astronomyArtSrc from '../../assets/images/astronomy-101-saturn-circa-1850s-9.jpg';
import astronomyNoveltySrc from '../../assets/images/nasa-exoplanet-art-55-cancri-e-lava-life-3.jpg';
import astronomyMoonSrc from '../../assets/images/phases-and-movements-of-the-moon-5.jpg';
import architectureSrc from '../../assets/images/18th-century-english-townhouse-rooth-house-16.jpg';
import architectureBlueprintsSrc from '../../assets/images/twa-flight-center-blueprint-17.jpg';
import architectureHandDrawnSrc from '../../assets/images/17th-century-faade-du-louvre-3.jpg';
import { InternalLink } from '../../components/ui/links/fui-tanstack';

interface CategoryCard {
  title: string;
  image: string;
  category: string;
  subcategory?: string;
}

const categoriesCards: CategoryCard[] = [
  {
    title: 'Shop All',
    image: shopAllSrc,
    category: 'all',
  },
  {
    title: 'Astronomy',
    image: astronomySrc,
    category: 'astronomy',
  },
  {
    title: 'Astronomy - Art',
    image: astronomyArtSrc,
    category: 'astronomy',
    subcategory: 'art',
  },
  {
    title: 'Astronomy - Novelty',
    image: astronomyNoveltySrc,
    category: 'astronomy',
    subcategory: 'novelty',
  },
  {
    title: 'Astronomy - Moon',
    image: astronomyMoonSrc,
    category: 'astronomy',
    subcategory: 'moon',
  },
  {
    title: 'Architecture',
    image: architectureSrc,
    category: 'architecture',
  },
  {
    title: 'Architecture - Blueprints',
    image: architectureBlueprintsSrc,
    category: 'architecture',
    subcategory: 'blueprints',
  },
  {
    title: 'Architecture - Hand-Drawn',
    image: architectureHandDrawnSrc,
    category: 'architecture',
    subcategory: 'hand-drawn',
  },
  {
    title: 'Fine Art',
    image: fineArtSrc,
    category: 'fine-art',
  },
  {
    title: 'Fine Art - Zoology',
    image: fineArtZoologySrc,
    category: 'fine-art',
    subcategory: 'zoology',
  },
  {
    title: 'Fine Art - Curiosities',
    image: fineArtCuriositiesSrc,
    category: 'fine-art',
    subcategory: 'curiosities',
  },
  {
    title: 'Fine Art - Photographs',
    image: fineArtPhotographsSrc,
    category: 'fine-art',
    subcategory: 'photographs',
  },
  {
    title: 'Fine Art - Color Theory',
    image: fineArtColorTheorySrc,
    category: 'fine-art',
    subcategory: 'color-theory',
  },
  {
    title: 'Fine Art - Technical',
    image: fineArtTechnicalSrc,
    category: 'fine-art',
    subcategory: 'technical',
  },
  {
    title: 'Fine Art - Botanical',
    image: fineArtBotanicalSrc,
    category: 'fine-art',
    subcategory: 'botanical',
  },
];

const useCss = makeStyles({
  title: typographyStyles.largeTitle,
  leftContainer: {
    padding: '40px',
    width: '50%',
    minHeight: '100vh',
    float: 'left',
    position: 'sticky',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    top: 0,
    gap: '16px',
    borderRight: `1px solid ${tokens.colorNeutralStroke1}`,
    '@media (max-width: 768px)': {
      position: 'static',
      width: '100%',
      float: 'unset',
      minHeight: '30vh',
      borderBottom: `1px solid ${tokens.colorNeutralStroke1}`,
      borderRight: 0,
    },
  },
  rightContainer: {
    width: '50%',
    marginLeft: '50%',
    '@media (max-width: 768px)': {
      width: '100%',
      marginLeft: 0,
    },
  },
  container: {
    display: 'flex',
    scrollSnapAlign: 'start',
    flexDirection: 'column',
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
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    gap: '5%',
    color: tokens.colorNeutralForegroundStaticInverted,
    backgroundColor: tokens.colorBackgroundOverlay,
  },
  text: {
    fontSize: tokens.fontSizeBase500,
    textAlign: 'center',
    textTransform: 'uppercase',
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
      backgroundColor: 'white',
    },
  },
});

export default function CatalogPage() {
  const css = useCss();

  return (
    <div>
      <div className={css.leftContainer}>
        <Text as="h2" className={css.title}>
          Catalog
        </Text>
      </div>
      <div className={css.rightContainer}>
        {categoriesCards.map((card) => (
          <InternalLink
            key={card.title}
            to="/catalog/$category/$"
            params={{ category: card.category, _splat: card.subcategory }}
            appearance="stickless"
            style={{ width: '100%' }}
          >
            <div className={css.container}>
              <div className={css.right}>
                <Image src={card.image} block fit="cover" />
                <div className={css.overlay}>
                  <span className={mergeClasses(css.stick, css.text)}>{card.title}</span>
                </div>
              </div>
            </div>
          </InternalLink>
        ))}
      </div>
    </div>
  );
}
