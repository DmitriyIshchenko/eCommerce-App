import { LargeTitle, makeStyles, mergeClasses, tokens } from '@fluentui/react-components';
import { useColumnsStyles } from '../../styles/columns-layout';
import TeamMember from './team-member';
import { TEAM_MEMBERS } from '../../lib/constants';

import logo from '../../assets/images/rss-logo.svg';

const usePageStyles = makeStyles({
  content: {
    padding: '0',
    alignItems: 'start',

    '@media(width<768px)': {
      padding: '0',
    },
  },
  link: {
    display: 'flex',
    justifyContent: 'center',
    marginInline: 'auto',
    marginBlock: tokens.spacingVerticalL,
    width: 'min(30%, 200px)',
    '&:hover': { opacity: '0.75', transition: 'opacity .3s' },
  },
});

export default function AboutPage() {
  const columnsStyles = useColumnsStyles();
  const pageStyles = usePageStyles();

  return (
    <div className={columnsStyles.page}>
      <div className={columnsStyles.left}>
        <LargeTitle as="h1" align="center">
          Meet our team!
        </LargeTitle>
      </div>
      <div className={mergeClasses(columnsStyles.right, pageStyles.content)}>
        <div>
          {TEAM_MEMBERS.map((member) => (
            <TeamMember {...member} key={member.name} />
          ))}

          <a href="https://rs.school/" target="_blank" className={pageStyles.link} rel="noreferrer">
            <img src={logo} alt="" aria-hidden="true" />
          </a>
        </div>
      </div>
    </div>
  );
}
