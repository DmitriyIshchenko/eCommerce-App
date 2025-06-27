import type { Category } from '@commercetools/platform-sdk';
import {
  FlatTree,
  FlatTreeItem,
  TreeItemLayout,
  useHeadlessFlatTree_unstable,
  type HeadlessFlatTreeItemProps,
} from '@fluentui/react-components';
import { Route as RootRoute } from '../../../routes/__root';
import { InternalLink } from '../links/fui-tanstack';
import { useLocation } from '@tanstack/react-router';

interface Props {
  onClick?: () => void;
}

type CustomItem = HeadlessFlatTreeItemProps & { content: string; category: string; splat?: string };

const categoriesToTreeItems = (categories: Category[]): CustomItem[] => {
  const item: CustomItem = {
    value: 'all',
    content: 'Shop All',
    category: 'all',
  };

  const mappedCategories = categories.map((v) => {
    const name = v.name['en-US'];
    const slug = v.slug['en-US'];

    const o: CustomItem = {
      value: slug,
      content: name,
      category: slug,
    };

    if (v.parent) {
      const parent = categories.find((cat) => cat.id === v.parent?.id);

      o.parentValue = parent?.slug['en-US'];
      if (parent) {
        o.category = parent.slug['en-US'];
        o.splat = slug;
      }
    }

    return o;
  });

  return [item, ...mappedCategories];
};

export function FlatTreeMenu({ onClick }: Props) {
  const { categories } = RootRoute.useRouteContext();
  const { pathname } = useLocation();

  const treeItems = categoriesToTreeItems(categories);

  const flatTree = useHeadlessFlatTree_unstable(treeItems);

  return (
    <FlatTree {...flatTree.getTreeProps()} aria-label="Flat Tree Menu">
      {Array.from(flatTree.items(), (flatTreeItem) => {
        const { content, category, splat, ...treeItemProps } = flatTreeItem.getTreeItemProps();

        return (
          <FlatTreeItem {...treeItemProps} key={flatTreeItem.value}>
            <TreeItemLayout>
              <InternalLink
                to="/catalog/$category/$"
                params={{ category: category, _splat: splat }}
                active={splat ? pathname.includes(splat) : pathname.includes(category)}
                interactive={
                  !splat &&
                  category === pathname.split('/').slice(2, 3).join('') &&
                  pathname.split('/').length > 3
                }
                onClick={onClick}
              >
                {content}
              </InternalLink>
            </TreeItemLayout>
          </FlatTreeItem>
        );
      })}
    </FlatTree>
  );
}
