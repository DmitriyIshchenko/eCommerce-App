import { makeStyles, Persona, Tag, Text, tokens } from '@fluentui/react-components';
import GitHubIcon from '../../components/ui/icons/github';

export interface TeamMemberData {
  name: string;
  role: string;
  imageSrc: string;
  bio: string;
  responsibilities: string[];
  githubLink: string;
}

const useStyles = makeStyles({
  member: {
    display: 'grid',
    gap: tokens.spacingVerticalM,
    borderBottom: `1px solid ${tokens.colorNeutralStroke1}`,
    paddingInline: tokens.spacingHorizontalXXXL,
    paddingBlock: tokens.spacingVerticalXXXL,
  },
  responsibilities: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: tokens.spacingHorizontalM,
  },

  header: {
    display: 'flex',
    gap: tokens.spacingHorizontalM,
  },

  link: {
    '&:hover': {
      filter: 'brightness(3)',
      transition: 'filter .3s',
    },
  },
});

export default function TeamMember({
  name,
  role,
  imageSrc,
  bio,
  responsibilities,
  githubLink,
}: TeamMemberData) {
  const styles = useStyles();
  return (
    <article className={styles.member}>
      <header className={styles.header}>
        <Persona
          size="huge"
          name={name}
          secondaryText={role}
          avatar={{
            image: {
              src: imageSrc,
            },
          }}
        />

        <a href={githubLink} target="_blank" rel="noreferrer" className={styles.link}>
          <GitHubIcon />
        </a>
      </header>

      <Text block size={400}>
        {bio}
      </Text>

      <div className={styles.responsibilities}>
        {responsibilities.map((item) => (
          <Tag key={item} appearance="brand" size="small" shape="circular">
            {item}
          </Tag>
        ))}
      </div>
    </article>
  );
}
