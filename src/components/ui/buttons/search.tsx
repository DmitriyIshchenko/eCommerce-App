import { Button, type TooltipProps, makeStyles, tokens } from '@fluentui/react-components';
import SearchIcon from '../icons/search';
import StyledTooltip from '../tooltips/styled';
import type { CustomButtonProps } from './custom';

const useCss = makeStyles({
  animate: {
    color: tokens.colorNeutralForeground1,
    '> span > svg': {
      transition: `transform ${tokens.durationFast} linear`,
      '> path:nth-child(2)': {
        transition: `opacity ${tokens.durationSlow} ease`,
      },
    },
    ':hover': {
      color: tokens.colorNeutralForeground1Hover,
      '> span > svg': {
        transform: 'scale(1.5)',
        '> path:nth-child(2)': {
          transform: 'scale(0)',
          opacity: '0',
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

export default function SearchButton(
  props: Omit<CustomButtonProps, 'icon' | 'appearance' | 'className' | 'size'> & {
    tooltipPositioning?: TooltipProps['positioning'];
  },
) {
  const css = useCss();
  const { tooltipPositioning, ...rest } = props;
  return (
    <StyledTooltip contentChildren="Search" positioning={tooltipPositioning}>
      <Button
        {...rest}
        size="large"
        icon={<SearchIcon width={24} height={24} />}
        appearance="transparent"
        className={css.animate}
      />
    </StyledTooltip>
  );
}
