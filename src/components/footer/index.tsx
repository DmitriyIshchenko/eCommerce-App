import { Divider, makeStyles, tokens, typographyStyles } from '@fluentui/react-components';
import FacebookIcon from '../ui/icons/facebook';
import InstagramIcon from '../ui/icons/instagram';
import PinterestIcon from '../ui/icons/pinterest';
import XIcon from '../ui/icons/x';
import { ExternalLink, InternalLink } from '../ui/links/fui-tanstack';
import { customTheme } from '../../styles/theme';

const quickLinks = [
  { href: '/about', text: 'Contact us' },
  { href: '/catalog/all', text: 'Shop' },
  { href: '/about', text: 'About' },
  { href: '/pages/terms-of-service', text: 'Terms & conditions' },
  { href: '', text: 'Shipping & returns' },
  { href: '', text: 'Privacy policy' },
  { href: '/catalog/all', text: 'Search' },
  { href: '', text: 'FAQs' },
];
const shopLinks = [
  { href: '/catalog/all', text: 'Shop All' },
  { href: '/catalog/astronomy', text: 'Astronomy' },
  { href: '/catalog/architecture', text: 'Architecture' },
  { href: '/catalog/fine-art', text: 'Fine Art' },
];

const useClasses = makeStyles({
  footer: {
    backgroundColor: customTheme.colorBackground,
    width: '100%',
    boxSizing: 'border-box',
    minHeight: '100dvh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  links: {
    padding: `var(--spacingVerticalXXXL)`,
    display: 'flex',
    gap: '40px',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    color: customTheme.colorCompoundBrandStroke,
  },
  wideColumn: {
    width: '320px',
  },
  column: {
    width: '192px',
  },
  text: {
    fontSize: tokens.fontSizeBase400,
    textDecoration: 'none',
    color: tokens.colorNeutralForeground3,
  },
  copyRight: {
    fontSize: tokens.fontSizeBase200,
    textDecoration: 'none',
    color: tokens.colorNeutralForeground3,
    alignSelf: 'end',
  },
  title: {
    ...typographyStyles.subtitle1,
    color: tokens.colorNeutralForeground3,
    fontWeight: tokens.fontWeightMedium,
    marginBottom: tokens.spacingVerticalM,
  },
});

export function Footer() {
  const classes = useClasses();
  return (
    <footer className={classes.footer}>
      <div className={classes.links}>
        <div className={classes.wideColumn}>
          <h3 className={classes.title}>American Made | Texas Based</h3>
          <span className={classes.text}>
            We&apos;re a luxury fine art shop selling framed and unframed art. We don&apos;t skimp
            on quality or craftsmanship. We only use museum-grade, 100% cotton rag paper and real
            hardwood frames
          </span>
        </div>
        <div className={classes.column}>
          <h3 className={classes.title}>Quick Links</h3>
          <nav style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            {quickLinks.map((link, index) => (
              <InternalLink
                to={link.href}
                key={index}
                appearance="inverted"
                style={{ width: 'fit-content', color: customTheme.colorBrandForeground1 }}
              >
                {link.text}
              </InternalLink>
            ))}
          </nav>
        </div>
        <div className={classes.column}>
          <h3 className={classes.title}>Shop Links</h3>
          <nav style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            {shopLinks.map((link, index) => (
              <InternalLink
                to={link.href}
                key={index}
                appearance="inverted"
                style={{ width: 'fit-content', color: customTheme.colorBrandForeground1 }}
              >
                {link.text}
              </InternalLink>
            ))}
          </nav>
        </div>
        <div className={classes.column}>
          <h3 className={classes.title}>Follow Us</h3>
          <nav style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <ExternalLink
              href="https://twitter.com/celestia-art"
              target="_blank"
              appearance="inverted"
              style={{ width: 'fit-content', color: customTheme.colorBrandForeground1 }}
            >
              <span style={{ display: 'flex', gap: 8 }}>
                <XIcon />
                Twitter
              </span>
            </ExternalLink>
            <ExternalLink
              href="https://fb.me/celestia-art"
              target="_blank"
              appearance="inverted"
              style={{ width: 'fit-content', color: customTheme.colorBrandForeground1 }}
            >
              <span style={{ display: 'flex', gap: 8 }}>
                <FacebookIcon />
                Facebook
              </span>
            </ExternalLink>
            <ExternalLink
              href="https://pinterest.com/celestia-art"
              target="_blank"
              appearance="inverted"
              style={{ width: 'fit-content', color: customTheme.colorBrandForeground1 }}
            >
              <span style={{ display: 'flex', gap: 8 }}>
                <PinterestIcon />
                Pinterest
              </span>
            </ExternalLink>
            <ExternalLink
              href="https://instagram.com/celestia-art"
              target="_blank"
              appearance="inverted"
              style={{ width: 'fit-content', color: customTheme.colorBrandForeground1 }}
            >
              <span style={{ display: 'flex', gap: 8 }}>
                <InstagramIcon />
                Instagram
              </span>
            </ExternalLink>
          </nav>
        </div>
      </div>
      <div>
        <Divider />
        <div style={{ padding: 40 }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 20,
              flexWrap: 'wrap',
            }}
          ></div>
        </div>
      </div>
    </footer>
  );
}
