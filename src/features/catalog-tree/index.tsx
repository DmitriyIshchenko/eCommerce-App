import {
  FlatTree,
  FlatTreeItem,
  makeStyles,
  tokens,
  TreeItemLayout,
  useHeadlessFlatTree_unstable,
  type HeadlessFlatTreeItemProps,
} from '@fluentui/react-components';
import { useNavigate, useRouteContext } from '@tanstack/react-router';
import { useMemo, useState } from 'react';

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
  const { categories } = useRouteContext({
    from: '__root__',
  });

  const navigate = useNavigate();

  const [category, setCategory] = useState('Catalog');

  const items: CustomItem[] = useMemo(() => {
    const root: CustomItem = {
      value: '',
      content: 'Catalog',
    };
    const mappedCategories: CustomItem[] = categories.map((category) => {
      const name = category.name['en-US'];
      const slug = category.slug['en-US'];
      const parent = category.parent?.id
        ? categories.find((cat) => cat.id === category.parent?.id)
        : null;

      const value = parent ? `${parent.slug['en-US']}/${slug}` : slug;

      const item = {
        value,
        content: name,
        parentValue: parent ? parent.slug['en-US'] : '',
      };

      return item;
    });
    return [root, ...mappedCategories];
  }, [categories]);

  const handleCategoryChange = (id: string) => {
    setCategory(id);
    const [category, subcategory] = id.split('/');
    void navigate({
      to: '/catalog/$category/$',
      params: {
        category: category,
        _splat: subcategory,
      },
    });
  };

  const flatTree = useHeadlessFlatTree_unstable(items, {
    selectionMode: 'single',
  });

  return (
    <FlatTree
      {...flatTree.getTreeProps()}
      aria-label="Selection"
      checkedItems={[category]}
      onCheckedChange={(_, d) => {
        handleCategoryChange(String(d.value));
      }}
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
