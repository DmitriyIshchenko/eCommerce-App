import { makeStyles, tokens } from '@fluentui/react-components';

export const useCustomButtonCss = makeStyles({
  base: {
    fontWeight: tokens.fontWeightRegular,
    color: tokens.colorNeutralBackground1,
    backgroundColor: tokens.colorNeutralForeground1,
    ':hover': {
      backgroundColor: tokens.colorNeutralForeground3Hover,
      color: tokens.colorNeutralBackground1,
      ':disabled': {
        color: tokens.colorNeutralBackground1,
        backgroundColor: tokens.colorNeutralForeground1,
      },
      ':active': {
        backgroundColor: tokens.colorNeutralStrokeAccessibleHover,
        color: tokens.colorNeutralBackground1,
        ':disabled': {
          color: tokens.colorNeutralBackground1,
          backgroundColor: tokens.colorNeutralForeground1,
        },
      },
    },
  },
  inverted: {
    color: tokens.colorNeutralForeground1,
    backgroundColor: tokens.colorNeutralStroke1,
    '> span.fui-Button__icon': {
      color: tokens.colorNeutralForeground1,
    },
    ':hover': {
      color: tokens.colorNeutralForeground1,
      backgroundColor: tokens.colorNeutralStroke1Hover,
      '> span.fui-Button__icon': {
        color: tokens.colorNeutralForeground1,
      },
      ':disabled': {
        color: tokens.colorNeutralForeground1,
        backgroundColor: tokens.colorNeutralStroke1,
        '> span.fui-Button__icon': {
          color: tokens.colorNeutralForeground1,
        },
      },
      ':active': {
        color: tokens.colorNeutralForeground1,
        backgroundColor: tokens.colorNeutralStroke1Pressed,
        '> span.fui-Button__icon': {
          color: tokens.colorNeutralForeground1,
        },
        ':disabled': {
          color: tokens.colorNeutralForeground1,
          backgroundColor: tokens.colorNeutralStroke1,
          '> span.fui-Button__icon': {
            color: tokens.colorNeutralForeground1,
          },
        },
      },
    },
  },
  subtle: {
    color: tokens.colorNeutralForeground1,
    backgroundColor: 'transparent',
    ':hover': {
      color: tokens.colorNeutralForeground1,
      backgroundColor: tokens.colorSubtleBackgroundHover,
      ':disabled': {
        color: tokens.colorNeutralForeground1,
        backgroundColor: 'transparent',
      },
      ':active': {
        color: tokens.colorNeutralForeground1,
        backgroundColor: tokens.colorSubtleBackgroundPressed,
        ':disabled': {
          color: tokens.colorNeutralForeground1,
          backgroundColor: 'transparent',
        },
      },
    },
  },
  transparent: {
    color: tokens.colorNeutralForeground1,
    backgroundColor: 'transparent',
    ':hover': {
      color: tokens.colorNeutralForeground3Hover,
      backgroundColor: 'transparent',
      ':disabled': {
        color: tokens.colorNeutralForeground3Hover,
        backgroundColor: 'transparent',
      },
      ':active': {
        color: tokens.colorNeutralStrokeAccessibleHover,
        backgroundColor: 'transparent',
        ':disabled': {
          color: tokens.colorNeutralStrokeAccessibleHover,
          backgroundColor: 'transparent',
        },
      },
    },
  },
  small: {
    '> span.fui-Button__icon': {
      fontSize: '16px',
    },
  },
  outlined: {
    border: `1px solid ${tokens.colorNeutralStroke1}`,
    ':hover': {
      border: `1px solid ${tokens.colorNeutralStroke1}`,
      ':disabled': {
        border: `1px solid ${tokens.colorNeutralStroke1}`,
      },
      ':active': {
        border: `1px solid ${tokens.colorNeutralStroke1}`,
        ':disabled': {
          border: `1px solid ${tokens.colorNeutralStroke1}`,
        },
      },
    },
  },
});
