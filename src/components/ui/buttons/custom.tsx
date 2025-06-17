import { Button, type ButtonProps, mergeClasses } from '@fluentui/react-components';
import { useCustomButtonCss } from './styles';

export type CustomButtonProps = Omit<ButtonProps, 'appearance' | 'as'> &
  Omit<React.ComponentPropsWithoutRef<'button'>, 'type'> &
  Partial<{
    as: 'button';
    type: 'button' | 'submit' | 'reset';
    appearance: 'straight' | 'inverted' | 'subtle' | 'transparent';
  }>;

export default function CustomButton(props: CustomButtonProps) {
  const css = useCustomButtonCss();
  const { className, appearance, children, size = 'large', ...rest } = props;

  return (
    <Button
      as="button"
      appearance={'primary'}
      size={size}
      className={mergeClasses(
        css.base,
        appearance === 'inverted' && css.inverted,
        appearance === 'subtle' && css.subtle,
        appearance === 'transparent' && css.transparent,
        size === 'small' && css.small,
        className,
      )}
      {...rest}
    >
      {children}
    </Button>
  );
}
