import { makeStyles, tokens } from '@fluentui/react-components';

export const useFormStyles = makeStyles({
  form: {
    width: '100%',
  },
  buttonContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: tokens.spacingHorizontalXL,
    marginTop: tokens.spacingVerticalM,
  },
  fieldsetLabel: {
    display: 'block',
    marginBlock: tokens.spacingVerticalM,
    textTransform: 'capitalize',
  },
  eye: {
    padding: `${tokens.spacingVerticalNone} ${tokens.spacingHorizontalNone}`,
  },
  confetti: {
    width: '100%',
    height: '100%',
  },
});
