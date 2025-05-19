import { Link, Image, makeStyles, Text, tokens } from '@fluentui/react-components';

const useClasses = makeStyles({
  footer: {
    display: 'flex',
    justifyContent: 'center',
    padding: tokens.spacingVerticalXXL,
    backgroundColor: tokens.colorBackgroundOverlay,
    width: '100%',
    boxSizing: 'border-box',
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
        <div className={classes.authorsContainer}>
          <Link
            className={classes.author}
            target="_blank"
            href="https://github.com/DmitriyIshchenko"
          >
            DmitriyIshchenko
          </Link>
          <Link className={classes.author} target="_blank" href="https://github.com/KateGribova">
            KateGribova
          </Link>
          <Link className={classes.author} target="_blank" href="https://github.com/olydbd">
            olydbd
          </Link>
        </div>
        <Text className={classes.text}>2025</Text>
      </nav>
    </footer>
  );
}
