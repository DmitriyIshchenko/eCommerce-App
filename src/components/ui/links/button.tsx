import { makeStyles, mergeClasses, shorthands, tokens } from '@fluentui/react-components';
import type { ReactNode } from 'react';
import { InternalLink } from './fui-tanstack';

const useCss = makeStyles({
  button: {
    padding: '16px 28px',
    borderRadius: '2rem',
    textTransform: 'uppercase',
    display: 'flex',
    alignItems: 'center',
    fontWeight: '500',
    width: 'fit-content',
    ':hover': {
      textDecoration: 'none',
      '&>div': {
        transform: 'scaleX(1)',
        width: '28px',
        opacity: '1',
        paddingLeft: '0.5rem',
      },
    },
    ':active': {
      textDecoration: 'none',
    },
  },
  icon: {
    transform: 'scaleX(0)',
    paddingLeft: '0',
    display: 'flex',
    transition: `transform ${tokens.durationSlow}, width ${tokens.durationSlow}, opacity ${tokens.durationNormal}, padding-left ${tokens.durationSlow}`,
    width: '0',
    opacity: '0',
  },
  outline: {
    ...shorthands.borderWidth('2px'),
    ...shorthands.borderStyle('solid'),
  },
  outlineStraight: {
    color: tokens.colorNeutralForeground1,
    ...shorthands.borderColor(tokens.colorNeutralForeground1),
    ':hover': {
      color: tokens.colorNeutralForeground1,
    },
  },
  outlineInverted: {
    color: tokens.colorNeutralBackground1,
    ...shorthands.borderColor(tokens.colorNeutralBackground1),
    ':hover': {
      color: tokens.colorNeutralBackground1,
      ':active': {
        color: tokens.colorNeutralBackground1,
      },
    },
  },
  filledStraight: {
    color: tokens.colorNeutralForeground1,
    backgroundColor: tokens.colorNeutralBackground1,
    ...shorthands.borderColor(tokens.colorNeutralBackground1),
    ':hover': {
      color: tokens.colorNeutralForeground1,
      ':active': {
        color: tokens.colorNeutralForeground1,
      },
    },
  },
  filledInverted: {
    color: tokens.colorNeutralBackground1,
    backgroundColor: tokens.colorNeutralForeground1,
    ...shorthands.borderColor(tokens.colorNeutralForeground1),
    ':hover': {
      color: tokens.colorNeutralBackground1,
      ':active': {
        color: tokens.colorNeutralBackground1,
      },
    },
  },
});

export default function ButtonLink({
  to,
  text,
  icon,
  appearance = 'outline',
  inverted = false,
}: {
  to: string;
  text: string;
  icon?: ReactNode;
  appearance?: 'outline' | 'filled';
  inverted?: boolean;
}) {
  const css = useCss();
  return (
    <InternalLink
      to={to}
      className={mergeClasses(
        css.button,
        css.outline,
        appearance === 'filled' && !inverted && css.filledStraight,
        appearance === 'filled' && inverted && css.filledInverted,
        appearance === 'outline' && css.outline,
        appearance === 'outline' && !inverted && css.outlineStraight,
        appearance === 'outline' && inverted && css.outlineInverted,
      )}
      appearance="muted"
    >
      <p style={{ margin: 0, padding: 2 }}>{text}</p>
      <div className={css.icon}>{icon}</div>
    </InternalLink>
  );
}
