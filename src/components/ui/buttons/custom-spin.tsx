import {
  makeStyles,
  mergeClasses,
  SpinButton,
  type SpinButtonProps,
} from '@fluentui/react-components';

const useClasses = makeStyles({
  base: {
    height: '40px',
    width: '138px',
    paddingLeft: '1rem',
    '> button': {
      height: '20px',
    },
    ':before': {
      borderRadius: '0px',
    },
  },
});

export default function CustomSpinButton(props: SpinButtonProps) {
  const css = useClasses();
  const { className, ...rest } = props;
  return <SpinButton {...rest} className={mergeClasses(css.base, className)} />;
}
