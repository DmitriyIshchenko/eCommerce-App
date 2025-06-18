import { Button, makeStyles, mergeClasses, tokens } from '@fluentui/react-components';
import { CheckmarkFilled, CopyRegular } from '@fluentui/react-icons';
import StyledTooltip from '../tooltips/styled';

const useStyles = makeStyles({
  button: {
    padding: 0,
    color: 'white',
    ':hover': {
      color: tokens.colorNeutralBackground2Hover,
      ':active': {
        color: tokens.colorNeutralStrokeAccessibleHover,
      },
    },
  },
});

export default function CopyButton({
  text,
  className,
  copy = false,
  onClick,
}: {
  text?: string;
  className?: string;
  copy?: boolean;
  onClick: () => void;
}) {
  const styles = useStyles();
  return (
    <StyledTooltip contentChildren={copy ? 'Copied' : 'Copy'}>
      <Button
        size="small"
        appearance="transparent"
        className={mergeClasses(className, styles.button)}
        icon={
          copy ? (
            <CheckmarkFilled fontSize={tokens.fontSizeBase300} />
          ) : (
            <CopyRegular fontSize={tokens.fontSizeBase300} />
          )
        }
        onClick={onClick}
      >
        {text}
      </Button>
    </StyledTooltip>
  );
}
