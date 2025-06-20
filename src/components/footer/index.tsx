import { Image, Link, Text, makeStyles, tokens } from '@fluentui/react-components';
import { InternalLink } from '../ui/links/fui-tanstack';
import { customTokens } from '../../styles/theme';

const links = [
  { href: '', text: 'Search' },
  { href: '', text: 'Shop' },
  { href: '', text: 'Contact us' },
  { href: '', text: 'About' },
  { href: '', text: 'Terms & conditions' },
  { href: '', text: 'Shipping & returns' },
  { href: '', text: 'Privacy policy' },
  { href: '', text: 'FAQs' },
];

const useClasses = makeStyles({
  footer: {
    display: 'flex',
    justifyContent: 'center',
    padding: tokens.spacingVerticalXXL,
    backgroundColor: customTokens.tokenA,
    width: '100%',
    boxSizing: 'border-box',
    minHeight: '100dvh',
  },
  footerContainer: {
    width: '100%',
    maxWidth: '1440px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  authorsContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  author: {
    fontSize: '1.2rem',
    textDecoration: 'none',
    color: tokens.colorNeutralForeground3,
    '&:hover': {
      textDecoration: 'underline',
      color: tokens.colorNeutralForeground3Hover,
    },
  },
  text: {
    fontSize: '1.2rem',
    textDecoration: 'none',
    color: tokens.colorNeutralForeground3,
  },
});

export function Footer() {
  const classes = useClasses();
  return (
    <footer className={classes.footer}>
      <nav className={classes.footerContainer}>
        <Link
          className={classes.text}
          target="_blank"
          href="https://rs.school/courses/javascript-preschool-ru"
        >
          <Image
            src="https://rs.school/_next/static/media/rss-logo.c19ce1b4.svg"
            alt="RSShool"
            height={50}
            width={50}
          />
        </Link>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          {links.map((link, index) => (
            <InternalLink
              to={link.href}
              key={index}
              appearance="inverted"
              style={{ width: 'fit-content' }}
            >
              {link.text}
            </InternalLink>
          ))}
        </div>
        <Text className={classes.text}>2025</Text>
      </nav>
    </footer>
  );
}
