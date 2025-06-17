import { type TooltipProps, makeStyles, mergeClasses, tokens } from '@fluentui/react-components';
import type { CSSProperties, ReactNode } from 'react';
import CustomButton from '../buttons/custom';
import BagCartIcon from '../icons/bag-cart';
import PlusIcon from '../icons/plus';
import CustomSpinner from '../spinners/custom';
import StyledTooltip from '../tooltips/styled';

const useClasses = makeStyles({
  data: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 550,
    fontSize: '44cqw',
  },
  plus: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  animatedColor: {
    animationName: {
      '0%': {
        color: tokens.colorNeutralForeground3,
      },
      '25%': {
        color: tokens.colorNeutralForeground4,
      },
      '50%': {
        color: tokens.colorPaletteRoyalBlueBorderActive,
      },
    },
    animationDuration: '1s',
    animationTimingFunction: 'linear',
    animationIterationCount: 'infinite',
    animationDirection: 'alternate',
  },
  button: {
    padding: '5%',
    minWidth: 'auto',
    '& .data': {
      opacity: 1,
      transition: `transform ${tokens.durationNormal}, opacity ${tokens.durationNormal}`,
      transform: 'scale(1)',
      willChange: 'transform',
    },
    '& .plus': {
      opacity: 0,
      transition: `transform ${tokens.durationNormal}, opacity ${tokens.durationNormal}`,
      transform: 'scale(0)',
      willChange: 'transform',
    },
    ':hover': {
      '& .data': { transform: 'scale(0)', opacity: 0 },
      '& .plus': { transform: 'scale(1)', opacity: 1 },
    },
  },
});

export default function CartButton({
  goods = 0,
  onClick,
  loading,
  tooltipPositioning,
  tooltipContent,
  style,
}: {
  goods?: number;
  size?: number;
  onClick: () => void;
  loading?: boolean;
  tooltipPositioning?: TooltipProps['positioning'];
  tooltipContent: ReactNode;
  style?: CSSProperties;
}) {
  const classes = useClasses();
  return (
    <StyledTooltip contentChildren={tooltipContent} positioning={tooltipPositioning}>
      <div>
        <CustomButton
          disabled={loading}
          appearance="transparent"
          style={style}
          onClick={onClick}
          className={mergeClasses(loading && classes.animatedColor, classes.button)}
        >
          <div
            style={{
              position: 'relative',
              width: '100%',
              aspectRatio: 1,
              containerType: 'inline-size',
            }}
          >
            <BagCartIcon
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
              }}
              strokeWidth={0.5}
            />
            <div className={mergeClasses(classes.data, 'data')}>
              {loading ? <CustomSpinner /> : goods || '0'}
            </div>
            <div className={mergeClasses(classes.plus, 'plus')}>
              <PlusIcon strokeWidth={1} width={'60%'} height={'60%'} />
            </div>
          </div>
        </CustomButton>
      </div>
    </StyledTooltip>
  );
}
