import {
  InteractionTag,
  InteractionTagPrimary,
  InteractionTagSecondary,
  TagGroup,
  makeStyles,
} from '@fluentui/react-components';
import {
  ColorRegular,
  MoneyHandRegular,
  PipelineRegular,
  TextBulletListCheckmarkRegular,
} from '@fluentui/react-icons';
import type { ProductSearchSchema } from '../../../lib/schemas/products-search';
import StyledTooltip from '../tooltips/styled';

const useStyles = makeStyles({
  tagGroup: {
    flexWrap: 'wrap',
    gap: '5px',
  },
  remove: {
    '> svg': {
      pointerEvents: 'none',
    },
  },
  tag: {
    pointerEvents: 'none',
    '> span:nth-child(2)': {
      padding: 0,
    },
  },
});

export interface DismissTagProps {
  tags: ProductSearchSchema;
  onDismiss?: (name: string, value: string | number) => void;
}

const icons = {
  color: <ColorRegular />,
  material: <PipelineRegular />,
  price: <MoneyHandRegular />,
  category: <TextBulletListCheckmarkRegular />,
};

interface Data {
  name: string;
  value: string;
}

export default function DismissWithInteractionTags({ tags, onDismiss }: DismissTagProps) {
  const styles = useStyles();
  const { minPrice, maxPrice, color, material } = tags;
  const price = !minPrice || !maxPrice ? undefined : `$${minPrice} - $${maxPrice}`;
  const computedTags = {
    color,
    material,
    price,
  };
  const dataArr: Data[] = [];
  for (const [key, value] of Object.entries(computedTags)) {
    if (Array.isArray(value)) {
      for (const v of value) {
        if (typeof v === 'string') dataArr.push({ name: key, value: v });
      }
    } else if (typeof value === 'string') {
      dataArr.push({ name: key, value });
    }
  }

  return (
    <>
      <TagGroup
        className={styles.tagGroup}
        onDismiss={(e, d) => {
          if ('dataset' in e.target && 'name' in (e.target.dataset as object) && onDismiss) {
            const name = (e.target.dataset as { name: string }).name;
            const value = d.value;
            if (value) {
              onDismiss(name, value);
            }
          }
        }}
      >
        {dataArr.map((data) => (
          <InteractionTag
            key={data.name + data.value}
            shape="circular"
            size="small"
            value={data.value}
          >
            <InteractionTagPrimary
              icon={icons[data.name as keyof typeof icons]}
              hasSecondaryAction
              className={styles.tag}
            >
              {data.value}
            </InteractionTagPrimary>
            <StyledTooltip text="remove">
              <InteractionTagSecondary
                aria-label="remove"
                data-name={data.name}
                className={styles.remove}
              />
            </StyledTooltip>
          </InteractionTag>
        ))}
      </TagGroup>
    </>
  );
}
