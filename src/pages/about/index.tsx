import { LargeTitle, makeStyles, mergeClasses } from '@fluentui/react-components';
import { useColumnsStyles } from '../../styles/columns-layout';
import TeamMember from './team-member';
import { TEAM_MEMBERS } from '../../lib/constants';

const usePageStyles = makeStyles({
  content: {
    padding: '0',
  },
});

export default function AboutPage() {
  const columnsStyles = useColumnsStyles();
  const pageStyles = usePageStyles();

  return (
    <div className={columnsStyles.page}>
      <div className={columnsStyles.title}>
        <LargeTitle as="h1" align="center">
          Meet our team!
        </LargeTitle>
      </div>
      <div className={mergeClasses(columnsStyles.content, pageStyles.content)}>
        {TEAM_MEMBERS.map((member) => (
          <TeamMember {...member} key={member.name} />
        ))}
      </div>
    </div>
  );
}
