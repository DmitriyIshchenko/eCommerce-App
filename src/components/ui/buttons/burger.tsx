import {
  Button,
  type TooltipProps,
  makeStyles,
  mergeClasses,
  tokens,
} from '@fluentui/react-components';
import BurgerIcon from '../icons/burger';
import StyledTooltip from '../tooltips/styled';
import type { CustomButtonProps } from './custom';

const useCss = makeStyles({
  animate: {
    color: tokens.colorNeutralForeground1,
    '> span > svg': {
      '> path:nth-child(1)': {
        transform: 'scaleX(0.75)',
        transformOrigin: '1.25px',
        transition: `transform ${tokens.durationFast} linear`,
      },
      '> path:nth-child(3)': {
        transformOrigin: '1.25px',
        transform: 'scaleX(0.5)',
        transition: `transform ${tokens.durationFast} linear`,
      },
    },
    ':hover': {
      color: tokens.colorNeutralForeground1Hover,
      '> span > svg': {
        '> path:nth-child(1)': {
          transform: 'scaleX(1)',
        },
        '> path:nth-child(3)': {
          transform: 'scaleX(1)',
        },
      },
      ':active': {
        color: 'colorNeutralForeground1Pressed',
      },
    },
  },
  tooltip: {
    paddingBottom: tokens.spacingHorizontalXS,
  },
});

export default function BurgerButton(
  props: Omit<CustomButtonProps, 'icon' | 'appearance' | 'size'> & {
    tooltipPositioning?: TooltipProps['positioning'];
  },
) {
  const css = useCss();
  const { tooltipPositioning, className } = props;
  return (
    <StyledTooltip text="Menu" positioning={tooltipPositioning}>
      <Button
        {...props}
        size="large"
        icon={<BurgerIcon width={24} height={24} />}
        appearance="transparent"
        className={mergeClasses(css.animate, className)}
      />
    </StyledTooltip>
  );
}
