import { makeStyles, tokens } from '@fluentui/react-components';

export const useCustomButtonCss = makeStyles({
  base: {
    backgroundColor: tokens.colorNeutralForeground1,
    ':hover': {
      backgroundColor: tokens.colorNeutralForeground3Hover,
      ':active': {
        backgroundColor: tokens.colorNeutralStrokeAccessibleHover,
      },
    },
  },
  inverted: {
    color: tokens.colorNeutralForeground1,
    backgroundColor: tokens.colorNeutralStroke1,
    ':hover': {
      color: tokens.colorNeutralForeground1,
      backgroundColor: tokens.colorNeutralStroke1Hover,
      ':active': {
        color: tokens.colorNeutralForeground1,
        backgroundColor: tokens.colorNeutralStroke1Pressed,
      },
    },
  },
  subtle: {
    color: tokens.colorNeutralForeground1,
    backgroundColor: 'transparent',
    ':hover': {
      color: tokens.colorNeutralForeground1,
      backgroundColor: tokens.colorSubtleBackgroundHover,
      ':active': {
        color: tokens.colorNeutralForeground1,
        backgroundColor: tokens.colorSubtleBackgroundPressed,
      },
    },
  },
});
