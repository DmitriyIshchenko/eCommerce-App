import type { TooltipProps } from '@fluentui/react-components';
import BagCartIcon from '../icons/bag-cart';
import { InternalLink } from '../links/fui-tanstack';
import StyledTooltip from '../tooltips/styled';
import CustomSpinner from '../spinners/custom';
import type { PreloadOptions } from '../../../lib/types';

export default function CartLink({
  goods = 0,
  size = 24,
  to,
  loading,
  tooltipPositioning,
  preload = false,
}: {
  goods?: number;
  size?: number;
  to: string;
  loading?: boolean;
  tooltipPositioning?: TooltipProps['positioning'];
  preload?: PreloadOptions;
}) {
  return (
    <StyledTooltip contentChildren="Cart" positioning={tooltipPositioning}>
      <div>
        <InternalLink to={to} style={{ display: 'flex', padding: 5 }} preload={preload}>
          <div
            style={{
              display: 'grid',
              gridTemplateAreas: 'common',
            }}
          >
            <BagCartIcon style={{ gridArea: 'common' }} width={size} height={size} />
            {goods >= 0 && (
              <span
                style={{
                  gridArea: 'stack',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  fontWeight: 550,
                  height: size,
                  width: size,
                  fontSize: size / 2.7,
                }}
              >
                {loading ? <CustomSpinner /> : goods}
              </span>
            )}
          </div>
        </InternalLink>
      </div>
    </StyledTooltip>
  );
}
