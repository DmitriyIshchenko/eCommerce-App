import { makeStyles, tokens } from '@fluentui/react-components';

export const useCheckboxClasses = makeStyles({
  root: {
    alignSelf: 'end',
    marginRight: `calc(-1 * ${tokens.spacingHorizontalS})`,
  },
});
