import {
  Tooltip,
  type TooltipProps,
  makeStyles,
  mergeClasses,
  tokens,
} from '@fluentui/react-components';
import type { ReactNode } from 'react';

interface Props extends Partial<TooltipProps> {
  contentChildren: ReactNode;
  nonCircular?: boolean;
}

const useCss = makeStyles({
  tooltip: {
    paddingBottom: tokens.spacingVerticalXS,
    borderRadius: tokens.borderRadiusCircular,
    fontSize: tokens.fontSizeBase300,
  },
  nonCircular: {
    borderRadius: tokens.borderRadiusLarge,
  },
});

export default function StyledTooltip(props: Props) {
  const css = useCss();
  return (
    <Tooltip
      {...props}
      content={{
        children: props.contentChildren,
        className: mergeClasses(css.tooltip, props.nonCircular && css.nonCircular),
      }}
      relationship="label"
      showDelay={90}
      hideDelay={90}
    >
      {props.children}
    </Tooltip>
  );
}
