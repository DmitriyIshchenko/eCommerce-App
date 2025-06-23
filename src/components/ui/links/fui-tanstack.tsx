import {
  Link as FluentLink,
  type LinkProps as FluentLinkProps,
  makeStyles,
  mergeClasses,
  tokens,
} from '@fluentui/react-components';
import { type LinkComponent, createLink } from '@tanstack/react-router';
import { forwardRef } from 'react';
import { customTheme } from '../../../styles/theme';

const useCss = makeStyles({
  base: {
    ':hover': { textDecoration: 'none' },
    ':active': { textDecoration: 'none' },
    fontSize: tokens.fontSizeBase400,
    textDecoration: 'none',
    userSelect: 'none',
    display: 'inline-block',
    lineHeight: 1.1,
    '[data-fui-focus-visible]': {
      textDecoration: 'none',
      '::after': {
        width: '100%',
        height: '2px',
      },
    },
  },
  stick: {
    '::after': {
      marginTop: '1px',
      height: '1px',
      display: 'block',
      content: '""',
      width: 0,
      transition: `width ${tokens.durationFast} linear`,
      alignSelf: 'start',
    },
    ':hover::after': { width: '100%' },
  },
  staticStick: {
    '::after': { width: '100%' },
  },
  straight: {
    '::after': {
      backgroundColor: tokens.colorNeutralForeground3Hover,
    },
    color: tokens.colorNeutralForeground1,
    ':hover': {
      color: tokens.colorNeutralForeground3Hover,
    },
    ':active': { color: tokens.colorNeutralForeground4 },
  },
  inverted: {
    '::after': {
      backgroundColor: customTheme.colorBrandForeground1,
    },
    color: customTheme.colorBrandForeground1,
    ':hover': {
      color: customTheme.colorBrandForeground1,
    },
    ':active': { color: customTheme.colorBrandForeground1 },
  },
  muted: {
    color: tokens.colorNeutralForeground4,
    ':hover': {
      color: tokens.colorNeutralForeground3Hover,
    },
    ':active': { color: tokens.colorNeutralForeground1 },
  },
  stickless: {
    color: tokens.colorNeutralForeground1,
    ':hover': {
      color: tokens.colorNeutralForeground3Hover,
    },
    ':active': { color: tokens.colorNeutralForeground4 },
  },
  accent: {
    fontWeight: tokens.fontWeightMedium,
    color: tokens.colorNeutralForeground1,
  },
  notInteractive: {
    pointerEvents: 'none',
  },
  interactive: {
    pointerEvents: 'auto',
  },
  block: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: tokens.spacingHorizontalS,
    paddingRight: tokens.spacingHorizontalS,
    height: '32px',
    minWidth: '32px',
    lineHeight: '1',
    paddingTop: '1px',
  },
  disabled: {
    opacity: 0.5,
  },
  active: {
    pointerEvents: 'none',
    fontWeight: tokens.fontWeightMedium,
    color: tokens.colorNeutralForeground1,
    '::after': { width: '100%', height: '1px' },
  },
});

type StyledLinkProps = Omit<FluentLinkProps, 'appearance' | 'as'> &
  Omit<React.ComponentPropsWithoutRef<'a'>, 'type'> &
  Partial<{
    appearance: 'straight' | 'inverted' | 'muted' | 'stickless';
    as: 'a';
    accent: boolean;
    asBlock: boolean;
    notInteractive: boolean;
    active: boolean;
    interactive: boolean;
    staticStick: boolean;
  }>;

export const ExternalLink = forwardRef<HTMLAnchorElement, StyledLinkProps>(
  (
    {
      appearance = 'straight',
      accent,
      active,
      asBlock,
      notInteractive,
      interactive,
      disabled,
      staticStick,
      ...props
    },
    ref,
  ) => {
    const css = useCss();

    return (
      <FluentLink
        {...props}
        ref={ref}
        as="a"
        appearance="default"
        disabled={disabled}
        aria-current={active ? 'page' : undefined}
        className={mergeClasses(
          css.base,
          appearance === 'straight' && css.straight,
          appearance === 'straight' && css.stick,
          appearance === 'inverted' && css.inverted,
          appearance === 'inverted' && css.stick,
          appearance === 'muted' && css.muted,
          appearance === 'stickless' && css.stickless,
          staticStick && css.staticStick,
          asBlock && css.block,
          accent && css.accent,
          notInteractive && css.notInteractive,
          disabled && css.disabled,
          active && css.active,
          interactive && css.interactive,
          props.className,
        )}
      >
        {props.children}
      </FluentLink>
    );
  },
);

ExternalLink.displayName = 'FluentLink';

const CreatedLinkComponent = createLink(ExternalLink);

export const InternalLink: LinkComponent<typeof ExternalLink> = (props) => {
  return <CreatedLinkComponent preload="intent" {...props} />;
};
