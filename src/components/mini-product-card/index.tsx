import {
  Body1Strong,
  Caption1,
  Card,
  CardHeader,
  makeStyles,
  tokens,
} from '@fluentui/react-components';
import type { MiniProductCardProps } from '../../lib/types';
import { useNavigate } from '@tanstack/react-router';

const useStyles = makeStyles({
  card: {
    padding: `${tokens.spacingVerticalXXXL} ${tokens.spacingHorizontalL}`,
  },
});

export function MiniProductCard(props: MiniProductCardProps) {
  const styles = useStyles();
  const navigate = useNavigate();

  const onActionCardClick = async () => {
    props.onClick?.();
    if (props.id) {
      await navigate({ to: `/products/${props.id}`, params: { id: props.id } });
    }
  };

  return (
    <Card
      className={styles.card}
      onClick={() => void onActionCardClick()}
      focusMode="no-tab"
      size="small"
      role="listitem"
    >
      <CardHeader
        image={<img src={props.image} alt={props.value} style={{ width: '50px' }} />}
        header={
          <div>
            <Body1Strong>{props.name}</Body1Strong>
          </div>
        }
        description={
          <div>
            {props.discount ? (
              <div>
                <Caption1 strikethrough style={{ marginRight: '5px' }}>
                  {props.price}
                </Caption1>
                <Caption1>{props.discount}</Caption1>
              </div>
            ) : (
              <div>
                <Caption1>{props.price}</Caption1>
              </div>
            )}
          </div>
        }
      />
    </Card>
  );
}
