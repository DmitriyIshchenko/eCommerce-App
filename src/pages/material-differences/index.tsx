import { Image, makeStyles, tokens, typographyStyles } from '@fluentui/react-components';
import { ArrowLeftFilled, ArrowRightFilled } from '@fluentui/react-icons';
import { useLocation } from '@tanstack/react-router';
import difSrc from '../../assets/images/difference_between_giclee_and_photo_rag.webp';
import gicleeSrc from '../../assets/images/material-giclee.webp';
import photoRagSrc from '../../assets/images/material-photorag.webp';
import compareSrc from '../../assets/images/paper-comp.webp';
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
const ARTICLE_TITLE = 'Differences Between Giclée and Photo Rag Paper';
const BASE_URL = 'https://celestia-art.netlify.app';

export default function MaterialDifferencesPage() {
  const { pathname } = useLocation();
  const css = useCss();

  return (
    <div>
      <main className={css.wrapper} style={{ viewTransitionName: 'main-content' }}>
        <div className={css.left}>
          <Image src={difSrc} fit="cover" block />
          <div className={css.overlay}>
            <h1 className={css.pageTitle}>{ARTICLE_TITLE}</h1>
          </div>
        </div>
        <div className={css.right}>
          <article className={css.articleContainer}>
            <h2 className={css.title}>{ARTICLE_TITLE}</h2>
            <p>
              One of the most common inquiries we receive is what is the difference between the
              Giclée archival prints and Photo Rag fine art paper we offer. This query is then
              almost always followed up with, which paper type do you recommend. The answer for us
              is simple, Photo Rag.&nbsp;However, it is always difficult for us to make this
              decision for our clients personally, but we always encourage them to make the decision
              based on their budget. If you can afford to spend more on a higher quality paper, then
              Photo Rag is our clear recommendation for a fine art paper print.
            </p>
            <p>
              Regardless, we hope the&nbsp;information we review below&nbsp;will help give a
              more&nbsp;defined&nbsp;picture of the paper differences and the distinguishing
              characteristics&nbsp;between the giclée we offer and the Photo Rag we print on.
            </p>
            <h2 className={css.title}>Giclée</h2>
            <p>
              Our giclée printing is one of the best print reproduction methods available. It is a
              process that uses a 12 color inkjet printer, acid-free papers, and pigment-based
              archival inks. Giclée printing is meant to produce a product at a higher quality and
              with a longer lifespan than the basic photo paper most other companies print on.
              Regular photo paper is not a giclée. All giclées are acid-free and are an archival
              paper, meaning that the inks and color fade slower over a longer period of time.
            </p>
            <Image src={gicleeSrc} fit="cover" block />
            <h2 className={css.title}>What is the Definition of a Giclée?</h2>
            <p>Giclée was a French word coined by Jack Duganne, a printmaker at Nash Editions.</p>
            <p>
              It&nbsp;comes from the French words gicleur and gicler. Gicleur is the inkjet nozzle
              and gicler means to spray, spout, or squirt. Giclée was a made-up word invented by
              Duganne to mean the thing that got sprayed.
            </p>
            <p>
              The name was first used to describe prints made by using an Iris printer (an inkjet
              printer introduced in 1985). But today, artists, galleries, and print shops use giclée
              to mean any high-quality inkjet print on fine art material.
            </p>
            <h2 className={css.title}>What Comprises a Giclée?</h2>
            <p>Typically, giclées follow these important principles:</p>
            <ul>
              <li>
                Superior Inkjet Printer: Standard photo paper inkjet prints are made using dye-based
                inks. Giclées are instead made using pigment-based inks.
              </li>
              <li>
                Color and Sharpness:&nbsp;Giclées&nbsp;have the highest resolution and sharpest
                detail, showcasing a complete color spectrum. Giclées are capable of capturing every
                shade of an artwork.
              </li>
              <li>
                Paper Quality: The paper or surface used must be acid-free and the quality is
                archival to ensure dependability. Giclées we print are 192 gsm in paper weight
                or&nbsp;more and have a paper thickness of 10.3 mil or more.
              </li>
            </ul>
            <p>
              The protocols mentioned above are what make giclées high-quality prints that are
              strongly resistant to yellowing and fading as well as offering a beautiful print once
              completed.
            </p>
            <h2 className={css.title}>What Type of Paper is a Giclée?</h2>
            <p>
              Giclée&apos;s are a fine art paper typically in a matte, semi-matte or canvas material
              that as mentioned above are acid-free, archival quality and typically 192 gsm and up
              in paper weight. Thickness of our giclée is usually 10.3 mil or more allowing for the
              pigment inks to absorb richly into the paper.
            </p>
            <h2 className={css.title}>Is Giclée Paper Textured?</h2>
            <p>
              Giclées used by us are not textured and all our giclée prints have a flat/smooth
              finish.
            </p>
            <h2 className={css.title}>Is Giclée Paper Waterproof?</h2>
            <p>
              Although inkjet giclées have much higher archival properties than traditional prints,
              they typically aren’t waterproof. You should handle them like you would an original
              painting as any water that comes into contact with the paper can lead to inks
              bleeding, smearing and smudging.
            </p>
            <h2 className={css.title}>What Is The Light Fastness of Giclée?</h2>
            <p>
              If kept in darkness and under particular environmental controls, pigment-based inks
              used on a giclée can last quite a long period.
            </p>
            <p>
              Under normal light conditions, such as in a home or office, without sunlight, you can
              expect a giclée printed print in a frame to last up to 65 years without any noticeable
              fading. For canvas material giclées, you can expect it to last 45 to 60 years without
              any noticeable fading.
            </p>
            <p>
              It is important to note that any artwork exposed to sunlight will fade. It is next to
              impossible to prevent ink fading, but the use of a UV protectant or a UV coated glass
              to cover the prevent will go a long way in ensuring the quality and color richness of
              the print for years to come.
            </p>
            <h2 className={css.title}>Photo Rag</h2>
            <p>
              Our Photo Rag paper is a 100% cotton rag fiber paper with a smooth surface texture.
              With its premium, matt inkjet coating Photo Rag meets the highest industry standards
              regarding density, color gamut, color graduation, and image sharpness while preserving
              the special touch and feel of genuine art paper.
            </p>
            <p>
              Our Photo Rag prints are higher quality than Giclée in that the Photo Rag paper is
              100% cotton rag. This allows for the inks to absorb richer and deeper into the paper
              than any other substrate available in our inventory. Photo Rag paper is the highest
              quality paper you will find anywhere on the market for large format digital artwork,
              it simply does not get better than this from our perspective.
            </p>
            <p>
              Photo Rag paper is the ultimate, you get what you&nbsp;pay for, kind of decision. It
              is the Bugatti of the paper world and the price offered dictates this. If you were to
              go to a photography exhibition or to a museum, the photographer or artist more than
              likely would have used Photo Rag paper to display their work. If there is an artwork
              you like in a home that has been designed with an interior designer, this is the paper
              of choice they have most likely had framed for their client.
            </p>
            <p>
              If your order is going to be placed in a room with direct sunlight, then Photo Rag
              paper is the better decision due to the paper&apos;s ability to hold light fastness
              stronger and for it&apos;s UV properties in comparison to other papers.
            </p>
            <p>
              Photo Rag&apos;s superior quality&nbsp;lends itself to being one of the highest age
              resistance materials used for wall art.
            </p>
            <Image src={photoRagSrc} fit="cover" block />
            <h2 className={css.title}>What is Photo Rag Paper?</h2>
            <p>
              Photo Rag is a versatile paper that produces crisp colorful prints with deep blacks
              and subtle shadings. There is no better paper on the market for fine art prints
              produced on large format supreme inkjet prints using pigment-based or dyed inks. It is
              the diamond of the paper world.
            </p>
            <h2 className={css.title}>What Comprises Photo Rag Paper?</h2>
            <p>Typically, Photo Rag paper follows these important principles:</p>
            <ul>
              <li>
                Superior Inkjet Printer: Large format premium inkjet prints are made using pigment
                and dye-based inks. Our Photo Rag prints are made strictly using top of the line
                pigment-based inks.
              </li>
              <li>
                Color and Sharpness: Photo Rag paper has the highest resolution and sharpest detail
                on the market (significantly more-so than standard giclées). Photo Rag demands the
                full-color spectrum and then some in its ability to absorb inks at a much more
                intense level, this, in turn, provides a vastness and depth to shading and
                highlights that other paper materials on the market just can&apos;t compete with.
              </li>
              <li>
                Paper Quality: The paper or surface used must be acid-free and the quality is
                archival to ensure dependability and Photo Rag meets these requirements and then
                some again. Read below for more information about Photo Rag.
              </li>
            </ul>
            <h2 className={css.title}>Can You Tell Me More About Photo Rag?</h2>
            <p>
              The white cotton artist’s paper, with its characteristic, wonderfully soft feel,
              boasts a lightly defined felt structure, lending each artwork a three-dimensional
              appearance and impressive pictorial depth. Combined with the matt premium inkjet
              coating, this paper produces outstanding prints that feature brilliant colors, deep
              blacks, striking contrasts and perfect reproduction of detail. This acid- and
              lignin-free classic meets the most exacting requirements for age resistance and is
              specially designed for fine art print applications. Photo Rag paper is the ideal
              combination of structure, print quality, and weight makes it one of the most versatile
              and sought after papers by interior designers and photographers.
            </p>
            <h2 className={css.title}>What Type of Paper is a Photo Rag?</h2>
            <p>
              Photo Rag is a museum grade professional 100% cotton rag paper. Our Photo Rag comes in
              a matte finish with a smooth subtle texture that is acid-free, archival quality and
              typically 308 gsm and up in paperweight (compared to 192 gsm for giclée paperweight).
              Thickness is usually 19 mil or more with Photo Rag paper, compared to 10.3 mil with
              giclée paper. If paperweight and thickness is important to you, as it should be, Photo
              Rag is the clear winner in the feel and durability of it compared to giclée.
            </p>
            <h2 className={css.title}>Is Photo Rag Textured?</h2>
            <p>
              Yes, the 100% cotton rag pulp is blended into the paper when created allowing for the
              inks to absorb deeper and richer. Therefore, more ink is applied to the paper than any
              other paper materials (Giclée, etc.) allowing for an overall higher quality appearance
              and finish.
            </p>
            <h2 className={css.title}>Is Photo Rag Waterproof?</h2>
            <p>
              Like any material that is paper, pulp or rag-based, it will not be waterproof,
              however, Photo Rag paper is very water-resistant, however, for finished prints, we do
              advise keeping the artwork free of moisture and water to prevent bleeding of the inks.
            </p>
            <h2 className={css.title}>What Is The Light Fastness of Photo Rag?</h2>
            <p>
              Photo Rag has one of the strongest lightfastness ratings of any paper available. This
              means your print is very unlikely to begin any fading in color until after 100 years
              have passed as long as the artwork does not have direct exposure to sunlight. In a
              normal home or business setting, Photo Rag paper outperforms any other paper type.
              Should you have a space that does receive direct sunlight, Photo Rag would be
              suggested over giclée, however, no matter the paper type, the harshness of direct
              sunlight will impact any paper.
            </p>
            <h2 className={css.title}>Summary</h2>
            <p>
              If your budget permits, Photo Rag paper is the recommendation we make to all clients.
              However, no matter the allure and quality of Photo Rag, the price does dictate its
              luxuriousness. Please budget accordingly as we do not allow returns on our Photo Rag
              paper prints.
            </p>
            <p>
              If you are considering giclée paper, please know you are getting a very beautiful
              paper material as well. Giclées are a premium paper and Photo Rag is a luxury paper.
              Both papers deliver on their strengths. Our strength as a company lies in that we
              complete our prints on two of the finest papers in giclée and Photo Rag the options we
              provide in these two materials is already A and A+ in quality.
            </p>
            <p>
              Overall it is difficult to compare giclée and Photo Rag because they are outstanding
              options, but the price discrepancy between the two is wide. Think of giclée paper as
              the Mercedes of the paper world and Photo Rag as the Ferrari. Either option you choose
              will be a fine art print that we will make sure is handled with care and expertise
              from the time it is printed to the time it is shipped out to you.
            </p>
            <Image src={compareSrc} fit="cover" block />
          </article>
          <div
            style={{
              display: 'flex',
              gap: tokens.spacingHorizontalXS,
              alignItems: 'center',
              marginTop: 12,
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
              href={`https://pinterest.com/pin/create/button/?url=${BASE_URL}${pathname}&media=${difSrc}?description=${encodeURIComponent(ARTICLE_TITLE)}`}
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
        <InternalLink to="/pages/where-to-buy-frames" viewTransition={{ types: ['slide-right'] }}>
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
        <InternalLink to="/pages/style-differences" viewTransition={{ types: ['slide-left'] }}>
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
