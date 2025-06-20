import {
  Card,
  CardFooter,
  CardHeader,
  Image,
  Text,
  makeStyles,
  tokens,
  typographyStyles,
} from '@fluentui/react-components';
import AddyOsmaniSrc from '../../assets/images/AddyOsmani.jfif';
import BrandonEichSrc from '../../assets/images/BrandonEich.png';
import DanAbramovSrc from '../../assets/images/DanAbramov.png';
import GuillermoRauchSrc from '../../assets/images/GuillermoRauch.jpg';
import LeaVerouSrc from '../../assets/images/LeaVerou.png';
import RyanDahlSrc from '../../assets/images/RyanDahl.jpg';

const useCss = makeStyles({
  title: typographyStyles.largeTitle,
  wrapper: {
    height: '100dvh',
    overflowY: 'scroll',
    scrollSnapType: 'y mandatory',
    scrollbarWidth: 'none',
    position: 'sticky',
    top: 0,
  },
  right: {
    width: '50%',
    marginLeft: '50%',
    '> .fui-Card > .fui-CardFooter': {
      maxWidth: '640px',
    },
    '@media (max-width: 1280px)': {
      width: '100%',
      marginLeft: 0,
      '> .fui-Card > .fui-CardFooter': {
        maxWidth: '900px',
      },
    },
    lineHeight: 1.5,
  },
  left: {
    padding: '40px',
    width: '50%',
    minHeight: '100dvh',
    float: 'left',
    position: 'sticky',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    top: 0,
    gap: '16px',
    borderRight: `1px solid ${tokens.colorBrandForegroundOnLightSelected}`,
    '@media (max-width: 1280px)': {
      position: 'static',
      width: '100%',
      float: 'unset',
      minHeight: '50dvh',
      borderBottom: `1px solid ${tokens.colorBrandForegroundOnLightSelected}`,
      borderRight: 0,
    },
  },
});

export default function Testimonials() {
  const css = useCss();
  return (
    <div
      style={{
        backgroundColor: tokens.colorNeutralForeground1Static,
        color: tokens.colorNeutralForegroundStaticInverted,
      }}
    >
      <div className={css.left}>
        <Text as="h2" className={css.title}>
          Testimonials
        </Text>
        <p>Tried and True Customer Service Is Our Specialty </p>
      </div>
      <div className={css.right}>
        <Card
          style={{
            padding: 40,
            borderRadius: 0,
            backgroundColor: 'transparent',
            color: tokens.colorNeutralForegroundStaticInverted,
            borderBottom: `1px solid ${tokens.colorBrandForegroundOnLightSelected}`,
          }}
        >
          <CardHeader
            image={
              <Image src={DanAbramovSrc} alt="Dan Abramov avatar" shape="circular" width={128} />
            }
          />
          <CardFooter
            style={{
              flexDirection: 'column',
              gap: 32,
              marginTop: 32,
            }}
          >
            <blockquote
              style={{
                fontSize: tokens.fontSizeBase500,
                lineHeight: tokens.lineHeightBase500,
              }}
            >
              I&apos;m generally not a fan of new stuff trying to look old with fake stressing etc.,
              but I have to say this poster is very well printed and I believe it will give the
              appearance of real antique under glass. It&apos;s beautiful. Can&apos;t wait to frame
              it. It was packed and shipped very well.
            </blockquote>
            <div>
              <p>Dan Abramov</p>
              <p style={{ color: tokens.colorBrandBackgroundInvertedPressed }}>London, UK</p>
            </div>
          </CardFooter>
        </Card>
        <Card
          style={{
            padding: 40,
            borderRadius: 0,
            backgroundColor: 'transparent',
            color: tokens.colorNeutralForegroundStaticInverted,
            borderBottom: `1px solid ${tokens.colorBrandForegroundOnLightSelected}`,
          }}
        >
          <CardHeader
            image={<Image src={LeaVerouSrc} alt="Leah Verou avatar" shape="circular" width={128} />}
          />
          <CardFooter
            style={{
              flexDirection: 'column',
              gap: 32,
              marginTop: 32,
            }}
          >
            <blockquote
              style={{
                fontSize: tokens.fontSizeBase500,
                lineHeight: tokens.lineHeightBase500,
              }}
            >
              I&apos;m so in love with my new artwork! Celestia Art was so accommodating and really
              helped me pick out the ideal option. This will be perfect for the space required and
              the quality is sooooo goooood.
            </blockquote>
            <div>
              <p>Leah Verou</p>
              <p style={{ color: tokens.colorBrandBackgroundInvertedPressed }}>
                Cambridge, Massachusetts
              </p>
            </div>
          </CardFooter>
        </Card>
        <Card
          style={{
            padding: 40,
            borderRadius: 0,
            backgroundColor: 'transparent',
            color: tokens.colorNeutralForegroundStaticInverted,
            borderBottom: `1px solid ${tokens.colorBrandForegroundOnLightSelected}`,
          }}
        >
          <CardHeader
            image={<Image src={RyanDahlSrc} alt="Ryan Dahl avatar" shape="circular" width={128} />}
          />
          <CardFooter
            style={{
              flexDirection: 'column',
              gap: 32,
              marginTop: 32,
            }}
          >
            <blockquote
              style={{
                fontSize: tokens.fontSizeBase500,
                lineHeight: tokens.lineHeightBase500,
              }}
            >
              The print was the perfect gift for my father who worked for years in the JFK terminal.
              It came super protected in a tube and plastic covering. It was more than what I had
              hoped for.
            </blockquote>
            <div>
              <p>Ryan Dahl</p>
              <p style={{ color: tokens.colorBrandBackgroundInvertedPressed }}>
                San Diego, California
              </p>
            </div>
          </CardFooter>
        </Card>
        <Card
          style={{
            padding: 40,
            borderRadius: 0,
            backgroundColor: 'transparent',
            color: tokens.colorNeutralForegroundStaticInverted,
            borderBottom: `1px solid ${tokens.colorBrandForegroundOnLightSelected}`,
          }}
        >
          <CardHeader
            image={
              <Image src={BrandonEichSrc} alt="Brandon Eich avatar" shape="circular" width={128} />
            }
          />
          <CardFooter
            style={{
              flexDirection: 'column',
              gap: 32,
              marginTop: 32,
            }}
          >
            <blockquote
              style={{
                fontSize: tokens.fontSizeBase500,
                lineHeight: tokens.lineHeightBase500,
              }}
            >
              This shop is amazing, very responsive and if there is the slightest issue will take
              care of it right away. The poster was top quality and a great addition to my gallery
              wall.
            </blockquote>
            <div>
              <p>Brandon Eich</p>
              <p style={{ color: tokens.colorBrandBackgroundInvertedPressed }}>
                San Francisco, California
              </p>
            </div>
          </CardFooter>
        </Card>
        <Card
          style={{
            padding: 40,
            borderRadius: 0,
            backgroundColor: 'transparent',
            color: tokens.colorNeutralForegroundStaticInverted,
            borderBottom: `1px solid ${tokens.colorBrandForegroundOnLightSelected}`,
          }}
        >
          <CardHeader
            image={
              <Image
                src={GuillermoRauchSrc}
                alt="Guillermo Rauch avatar"
                shape="circular"
                width={128}
              />
            }
          />
          <CardFooter
            style={{
              flexDirection: 'column',
              gap: 32,
              marginTop: 32,
            }}
          >
            <blockquote
              style={{
                fontSize: tokens.fontSizeBase500,
                lineHeight: tokens.lineHeightBase500,
              }}
            >
              Honestly, I was expecting this to be good, but it shipped faster than a Next.js build,
              and the print quality was edge-first level perfect. The team here really cares about
              what they’re making. Definitely ordering from them again.
            </blockquote>
            <div>
              <p>Guillermo Rauch</p>
              <p style={{ color: tokens.colorBrandBackgroundInvertedPressed }}>
                San Francisco, California
              </p>
            </div>
          </CardFooter>
        </Card>
        <Card
          style={{
            padding: 40,
            borderRadius: 0,
            backgroundColor: 'transparent',
            color: tokens.colorNeutralForegroundStaticInverted,
          }}
        >
          <CardHeader
            image={<Image src={AddyOsmaniSrc} alt="Addy Osmani" shape="circular" width={128} />}
          />
          <CardFooter
            style={{
              flexDirection: 'column',
              gap: 32,
              marginTop: 32,
            }}
          >
            <blockquote
              style={{
                fontSize: tokens.fontSizeBase500,
                lineHeight: tokens.lineHeightBase500,
              }}
            >
              I have a pretty high bar when it comes to print quality and color accuracy, and I was
              genuinely impressed with how sharp and vibrant this poster turned out. Shipping was
              super fast too. As someone who obsesses over performance... this definitely delivered
              100%.
            </blockquote>
            <div>
              <p>Addy Osmani</p>
              <p style={{ color: tokens.colorBrandBackgroundInvertedPressed }}>
                San Francisco, California
              </p>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
