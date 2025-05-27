import {
  Body1,
  Button,
  Caption1,
  Card,
  CardHeader,
  CardPreview,
  makeStyles,
} from '@fluentui/react-components';
import type { ProductCardProps } from '../../lib/types';
import { ShoppingBagAddRegular } from '@fluentui/react-icons';
import { useNavigate } from '@tanstack/react-router';

const useStyles = makeStyles({
  card: {
    minWidth: '300px',
    flex: '1 1 25%',
    borderRadius: 0,
  },
});

export function ProductCard(props: ProductCardProps) {
  const styles = useStyles();
  const navigate = useNavigate();

  const onActionCardClick = async () => {
    await navigate({ to: `products/${props.value}` });
  };

  const onButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
  };

  return (
    <Card className={styles.card} onClick={() => void onActionCardClick()} focusMode="off">
      <CardPreview>
        <img src={props.image} alt={props.value} />
      </CardPreview>
      <CardHeader
        header={
          <Body1>
            <b>{props.name}</b>
          </Body1>
        }
        description={<Caption1>{props.price}</Caption1>}
        action={
          <Button
            size="large"
            appearance="transparent"
            icon={<ShoppingBagAddRegular />}
            aria-label="Cart"
            onClick={onButtonClick}
          />
        }
      />
    </Card>
  );
}
