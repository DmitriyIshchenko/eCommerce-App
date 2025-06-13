import {
  InfoLabel,
  makeStyles,
  mergeClasses,
  tokens,
  type InfoLabelProps,
} from '@fluentui/react-components';

const useCss = makeStyles({
  info: {
    '> button': {
      ':hover': {
        color: tokens.colorPaletteRoyalBlueForeground2,
      },
      '> svg:nth-child(2)': {
        width: '100%',
        height: '100%',
      },
      '> svg:nth-child(1)': {
        width: '100%',
        height: '100%',
      },
    },
    '> div': {
      fontSize: 'inherit',
      lineHeight: 'inherit',
      maxWidth: '320px',
    },
  },
});

export default function CustomInfoLabel(props: InfoLabelProps) {
  const css = useCss();
  return <InfoLabel {...props} className={mergeClasses(css.info, props.className)} size="medium" />;
}
