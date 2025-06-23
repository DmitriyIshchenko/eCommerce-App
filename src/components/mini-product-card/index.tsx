import {
  Body1Strong,
  Caption1,
  Card,
  CardHeader,
  makeStyles,
  tokens,
} from '@fluentui/react-components';
import type { MiniProductCardProps } from '../../lib/types';
import { InternalLink } from '../ui/links/fui-tanstack';
import { getSizedImageUrl } from '../../lib/utils/get-sized-image-url';
import defaultImage from '../../assets/images/default-image.jpg';

const useStyles = makeStyles({
  card: {
    padding: `${tokens.spacingVerticalXXXL} ${tokens.spacingHorizontalL}`,
  },
});

export function MiniProductCard(props: MiniProductCardProps) {
  const styles = useStyles();

  return (
    <Card className={styles.card}>
      <InternalLink
        to="/catalog/$category/$subcategory/$slug"
        appearance="stickless"
        viewTransition
        params={{
          slug: props.slug,
          category: props.category,
          subcategory: props.subCategory,
        }}
        onClick={props.onClick}
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
      <CardHeader
        image={
          <img
            src={props.image ? getSizedImageUrl(props.image, 'thumb') : defaultImage}
            alt={props.value}
            style={{ width: '50px' }}
          />
        }
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
