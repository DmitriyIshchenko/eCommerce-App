import { Label, type LabelProps, makeStyles, Text, tokens } from '@fluentui/react-components';

interface Props extends LabelProps {
  title: string;
  content: string | undefined;
}

const useStyles = makeStyles({
  box: {
    display: 'grid',
    gap: tokens.spacingVerticalXS,
    marginBottom: tokens.spacingVerticalM,
  },
});

export default function LabelBox(props: Props) {
  const styles = useStyles();
  const { title, content } = props;

  return (
    <div className={styles.box}>
      <Label {...props}>{title}</Label>
      <Text>{content}</Text>
    </div>
  );
}
