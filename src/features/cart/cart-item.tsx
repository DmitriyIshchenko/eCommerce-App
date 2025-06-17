import type { Attribute, LineItem } from '@commercetools/platform-sdk';
import { Button, Image, makeStyles, Text, tokens, Body1Strong } from '@fluentui/react-components';
import { CaretDownRegular, CaretUpRegular, DeleteRegular } from '@fluentui/react-icons';
import formatPrice from '../../lib/utils/format-price';
import { InternalLink } from '../../components/ui/links/fui-tanstack';
import { useCart } from '../../hooks/use-cart';
import defaultImage from '../../assets/images/default-image.jpg';

interface ValidAttribute extends Attribute {
  value: string;
}

interface ValidAttributeMaterial extends Attribute {
  value: { key: string; label: string };
}

interface Props {
  item: LineItem;
}

function isValidMaterial(attr: ValidAttributeMaterial): attr is ValidAttributeMaterial {
  return 'label' in attr.value;
}
function isValidAttribute(attr: ValidAttribute): attr is ValidAttribute {
  return 'value' in attr;
}

const useStyles = makeStyles({
  item: {
    display: 'grid',
    gridTemplateColumns: 'auto 1fr',
    gap: tokens.spacingVerticalM,
    padding: tokens.spacingVerticalM,
    maxWidth: '600px',
    margin: '0 auto',
    marginBottom: tokens.spacingVerticalM,
  },

  image: { gridColumn: '1/2', gridRow: '1/4', maxHeight: '150px' },
  info: {
    display: 'grid',
    gap: tokens.spacingVerticalS,
  },
  price: { display: 'flex', gap: tokens.spacingHorizontalM },
  controls: {
    display: 'flex',
    placeItems: 'center',
    gridRow: '2/4',
    gap: tokens.spacingHorizontalL,
  },
  delete: {
    marginLeft: 'auto',
  },
});

export default function CartItem({ item }: Props) {
  const styles = useStyles();

  const { addItemToCart, reduceItemQuantity, deleteItem } = useCart();

  const {
    variant: { attributes, images },
    name,
    price,
    quantity,
  } = item;

  let material = '';
  let size = '';
  let color = '';

  if (attributes) {
    const [materialAttr, sizeAttr, colorAttr] = attributes;
    if (isValidMaterial(materialAttr)) material = materialAttr.value.label;
    if (colorAttr && isValidAttribute(colorAttr)) color = colorAttr.value;
    if (isValidAttribute(sizeAttr)) size = sizeAttr.value;
  }

  const imageUrl = images?.[0].url ?? defaultImage;
  const imageLabel = images?.[0].label ?? 'default image';

  const isDiscounted = 'discounted' in price;

  return (
    <article className={styles.item}>
      <Image className={styles.image} alt={imageLabel} src={imageUrl} />

      <div className={styles.info}>
        <InternalLink to="/products/$id" params={{ id: item.productId }}>
          {name['en-US']}
        </InternalLink>
        <div className={styles.price}>
          <Body1Strong strikethrough={isDiscounted} className={styles.price}>
            {formatPrice(price.value)}
          </Body1Strong>

          {isDiscounted && (
            <Body1Strong className={styles.price}>
              {formatPrice(price.discounted?.value)}
            </Body1Strong>
          )}
        </div>
        <Text className={styles.info}>
          {color ? `${color} /` : ''} {size} / {material}
        </Text>
      </div>

      <div className={styles.controls}>
        <Button
          icon={<CaretUpRegular />}
          onClick={() => void addItemToCart(item.productId, item.variant.id)}
        />
        <Text>{quantity}</Text>
        <Button icon={<CaretDownRegular />} onClick={() => void reduceItemQuantity(item.id)} />
        <Button
          className={styles.delete}
          icon={<DeleteRegular />}
          onClick={() => void deleteItem(item.id)}
        />
      </div>
    </article>
  );
}
