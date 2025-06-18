import {
  Body1Strong,
  Button,
  Caption1,
  Card,
  CardHeader,
  CardPreview,
  InfoLabel,
  makeStyles,
} from '@fluentui/react-components';
import type { ProductCardProps } from '../../lib/types';
import BagCartIcon from '../ui/icons/bag-cart';
import { InternalLink } from '../ui/links/fui-tanstack';

const useStyles = makeStyles({
  card: {
    width: '100%',
    borderRadius: 0,
  },
});

export function ProductCard(props: ProductCardProps) {
  const styles = useStyles();

  const onButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
  };

  return (
    <Card className={styles.card}>
      <InternalLink
        to="/catalog/$category/$subcategory/$id"
        appearance="stickless"
        viewTransition
        params={{
          id: props.id,
          category: props.category,
          subcategory: props.subCategory,
        }}
        style={{
          position: 'absolute',
          display: 'block',
          width: '100%',
          height: '100%',
          top: 0,
          left: 0,
          zIndex: 1,
        }}
      />
      <CardPreview>
        <img src={props.image} alt={props.value} />
      </CardPreview>
      <CardHeader
        header={
          <div onClick={(e) => e.stopPropagation()}>
            <Body1Strong>{props.name}</Body1Strong>
            <InfoLabel info={`${props.description?.slice(0, 200)}...`} />
          </div>
        }
        description={
          <div>
            {props.discount ? (
              <div>
                <Caption1>From </Caption1>
                <Caption1 style={{ marginRight: '5px' }}>{props.discount}</Caption1>
                <Caption1 strikethrough>{props.price}</Caption1>
              </div>
            ) : (
              <div>
                <Caption1>From {props.price}</Caption1>
              </div>
            )}
          </div>
        }
        action={
          <Button
            size="large"
            appearance="transparent"
            icon={<BagCartIcon strokeWidth={0.8} />}
            aria-label="Cart"
            onClick={onButtonClick}
          />
        }
      />
    </Card>
  );
}
