import { makeStyles, tokens } from '@fluentui/react-components';
import FilterIcon from '../icons/filter';
import StyledTooltip from '../tooltips/styled';
import type { CustomButtonProps } from './custom';
import CustomButton from './custom';

const useCss = makeStyles({
  animate: {
    '> span > svg': {
      '> path:nth-child(2)': {
        transformOrigin: '1.25px',
        transition: `transform ${tokens.durationFast} linear`,
      },
      '> path:nth-child(3)': {
        transformOrigin: '1.25px',
        transition: `transform ${tokens.durationFast} linear`,
      },
      '> path:nth-child(4)': {
        transformOrigin: '1.25px',
        transition: `transform ${tokens.durationFast} linear`,
      },
    },
    ':hover': {
      '> span > svg': {
        '> path:nth-child(2)': {
          transform: 'translateY(4px)',
        },
        '> path:nth-child(3)': {
          transform: 'translateY(3px)',
        },
        '> path:nth-child(4)': {
          transform: 'translateY(-4px)',
        },
      },
    },
  },
  tooltip: {
    paddingBottom: tokens.spacingHorizontalXS,
  },
});

export default function FilterButton(
  props: Omit<CustomButtonProps, 'icon' | 'appearance' | 'className' | 'size'>,
) {
  const css = useCss();
  return (
    <StyledTooltip contentChildren="Filter and Sort">
      <div>
        <CustomButton
          {...props}
          icon={<FilterIcon width={24} height={24} />}
          shape="circular"
          className={css.animate}
        />
      </div>
    </StyledTooltip>
  );
}
