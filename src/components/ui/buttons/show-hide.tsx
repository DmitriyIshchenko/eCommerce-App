import { Button } from '@fluentui/react-components';
import { EyeOffRegular, EyeRegular } from '@fluentui/react-icons';

export default function ShowHideButton({
  className,
  show = false,
  onClick,
}: {
  className?: string;
  show?: boolean;
  onClick: () => void;
}) {
  return (
    <Button
      appearance="transparent"
      className={className}
      icon={show ? <EyeRegular /> : <EyeOffRegular />}
      onClick={onClick}
    />
  );
}
