import {
  Divider,
  Label,
  Menu,
  MenuItem,
  MenuList,
  MenuPopover,
  MenuTrigger,
  Text,
  makeStyles,
  tokens,
  typographyStyles,
} from '@fluentui/react-components';
import { ChevronDownRegular } from '@fluentui/react-icons';
import { US } from 'country-flag-icons/react/3x2';
import { customTokens } from '../../styles/theme';
import CustomButton from '../ui/buttons/custom';
import AmazonIcon from '../ui/icons/amazon';
import AmericanExpressIcon from '../ui/icons/american-express';
import ApplePayIcon from '../ui/icons/apple-pay';
import DinersClubIcon from '../ui/icons/diners-club';
import DiscoverIcon from '../ui/icons/discover';
import FacebookIcon from '../ui/icons/facebook';
import GooglePayIcon from '../ui/icons/google-pay';
import InstagramIcon from '../ui/icons/instagram';
import MasterCardIcon from '../ui/icons/master-card';
import PayPalIcon from '../ui/icons/pay-pal';
import PinterestIcon from '../ui/icons/pinterest';
import ShopifyPayIcon from '../ui/icons/shopify-pay';
import VisaIcon from '../ui/icons/visa';
import XIcon from '../ui/icons/x';
import { ExternalLink, InternalLink } from '../ui/links/fui-tanstack';
import StyledTooltip from '../ui/tooltips/styled';

const quickLinks = [
  { href: '/about', text: 'Contact us' },
  { href: '/catalog/all', text: 'Shop' },
  { href: '/about', text: 'About' },
  { href: '/pages/terms-of-service', text: 'Terms & conditions' },
  { href: '', text: 'Shipping & returns' },
  { href: '', text: 'Privacy policy' },
  { href: '/pages/search', text: 'Search' },
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
    backgroundColor: customTokens.tokenA,
    width: '100%',
    boxSizing: 'border-box',
    minHeight: '100dvh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  links: {
    padding: '40px',
    display: 'flex',
    gap: '40px',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
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
                style={{ width: 'fit-content' }}
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
                style={{ width: 'fit-content' }}
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
              style={{ width: 'fit-content' }}
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
              style={{ width: 'fit-content' }}
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
              style={{ width: 'fit-content' }}
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
              style={{ width: 'fit-content' }}
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
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <Label style={{ fontSize: tokens.fontSizeBase400 }}>Country / Currency</Label>
              <Menu>
                <MenuTrigger disableButtonEnhancement>
                  <div>
                    <CustomButton
                      appearance="transparent"
                      outlined
                      shape="square"
                      icon={<ChevronDownRegular />}
                      iconPosition="after"
                      style={{
                        minWidth: 138,
                        justifyContent: 'space-between',
                        fontSize: tokens.fontSizeBase400,
                        height: 40,
                        paddingRight: 12,
                      }}
                    >
                      United States (USD $)
                    </CustomButton>
                  </div>
                </MenuTrigger>
                <MenuPopover>
                  <MenuList>
                    <MenuItem style={{ fontSize: tokens.fontSizeBase400 }}>
                      <span style={{ display: 'flex', gap: 8 }}>
                        <US width={24} /> United States (USD $)
                      </span>
                    </MenuItem>
                  </MenuList>
                </MenuPopover>
              </Menu>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4, marginLeft: 'auto' }}>
              <div style={{ display: 'flex', gap: 4 }}>
                <StyledTooltip contentChildren={'Amazon'}>
                  <div>
                    <AmazonIcon />
                  </div>
                </StyledTooltip>
                <StyledTooltip contentChildren={'American express'}>
                  <div>
                    <AmericanExpressIcon />
                  </div>
                </StyledTooltip>
                <StyledTooltip contentChildren={'Apple Pay'}>
                  <div>
                    <ApplePayIcon />
                  </div>
                </StyledTooltip>
                <StyledTooltip contentChildren={'Diners'}>
                  <div>
                    <DinersClubIcon />
                  </div>
                </StyledTooltip>
                <StyledTooltip contentChildren={'Discover'}>
                  <div>
                    <DiscoverIcon />
                  </div>
                </StyledTooltip>
                <StyledTooltip contentChildren={'Google Pay'}>
                  <div>
                    <GooglePayIcon />
                  </div>
                </StyledTooltip>
                <StyledTooltip contentChildren={'Master Card'}>
                  <div>
                    <MasterCardIcon />
                  </div>
                </StyledTooltip>
                <StyledTooltip contentChildren={'Pay Pal'}>
                  <div>
                    <PayPalIcon />
                  </div>
                </StyledTooltip>
                <StyledTooltip contentChildren={'Shopify Pay'}>
                  <div>
                    <ShopifyPayIcon />
                  </div>
                </StyledTooltip>
                <StyledTooltip contentChildren={'Visa'}>
                  <div>
                    <VisaIcon />
                  </div>
                </StyledTooltip>
              </div>
              <Text className={classes.copyRight}>© 2025 Celestia Art</Text>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
