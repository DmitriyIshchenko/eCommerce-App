import {
  FlatTree,
  FlatTreeItem,
  makeStyles,
  tokens,
  TreeItemLayout,
  useHeadlessFlatTree_unstable,
  type HeadlessFlatTreeItemProps,
  type TreeCheckedChangeData,
} from '@fluentui/react-components';
import { useNavigate } from '@tanstack/react-router';
import { useMemo, useState } from 'react';
import { Route } from '../../routes/__root';

type CustomItem = HeadlessFlatTreeItemProps & { content: string };

const useStyles = makeStyles({
  treeItem: {
    '& .fui-Radio__indicator::after': {
      backgroundColor: tokens.colorPaletteRoyalBlueForeground2,
    },
  },
  treeItemLayout: {
    color: tokens.colorNeutralForeground1,
    fontSize: '1.2rem',
  },
});

export function CatalogTree() {
  const styles = useStyles();

  const navigate = useNavigate();

  const [category, setCategory] = useState('');
  const categories = Route.useLoaderData();

  const items: CustomItem[] = useMemo(() => {
    const root: CustomItem = {
      value: 'all',
      content: 'Catalog',
    };
    const mappedCategories: CustomItem[] = categories.map((category) => {
      const name = category.name['en-US'];
      const slug = category.slug['en-US'];
      const parentId = category.parent?.id;

      const value = parentId
        ? `${categories.find((cat) => cat.id === parentId)?.slug['en-US']}/${slug}`
        : slug;

      const item = {
        value,
        content: name,
        parentValue: parentId
          ? categories.find((cat) => cat.id === parentId)?.slug['en-US']
          : 'all',
      };

      return item;
    });
    return [root, ...mappedCategories];
  }, [categories]);

  const flatTree = useHeadlessFlatTree_unstable(items, {
    defaultOpenItems: ['all'],
    selectionMode: 'single',
  });

  const handleCheckedChange = (_: React.ChangeEvent<HTMLElement>, data: TreeCheckedChangeData) => {
    setCategory(String(data.value));
    const [category, subcategory] = String(data.value).split('/');
    if (subcategory) {
      void navigate({
        to: '/catalog/$category/$subcategory',
        params: {
          category,
          subcategory,
        },
      });
    } else {
      void navigate({
        to: '/catalog/$category',
        params: {
          category,
        },
      });
    }
  };

  return (
    <FlatTree
      {...flatTree.getTreeProps()}
      aria-label="Selection"
      checkedItems={[category]}
      onCheckedChange={handleCheckedChange}
    >
      {Array.from(flatTree.items(), (flatTreeItem) => {
        const { content, ...treeItemProps } = flatTreeItem.getTreeItemProps();
        return (
          <FlatTreeItem {...treeItemProps} key={flatTreeItem.value} className={styles.treeItem}>
            <TreeItemLayout className={styles.treeItemLayout}>{content}</TreeItemLayout>
          </FlatTreeItem>
        );
      })}
    </FlatTree>
  );
}
