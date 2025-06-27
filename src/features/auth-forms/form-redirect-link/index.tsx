import { Text, tokens } from '@fluentui/react-components';
import { InternalLink } from '../../../components/ui/links/fui-tanstack';

interface Props {
  messageText: string;
  linkText: string;
  to: string;
}

export default function FormRedirectLink({ messageText, linkText, to }: Props) {
  return (
    <div>
      <Text
        size={400}
        style={{
          color: tokens.colorNeutralForeground4,
          marginRight: tokens.spacingHorizontalSNudge,
        }}
      >
        {messageText}
      </Text>
      <InternalLink to={to}>{linkText}</InternalLink>
    </div>
  );
}
