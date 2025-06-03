import type { Category } from '@commercetools/platform-sdk';
import type { MenuItemUnion } from '../../components/ui/menu/split-link';

export default function adaptCategoriesToSplitLinkMenuItemProp(
  categories: Category[],
  base: string,
): MenuItemUnion[] {
  const byId = new Map(categories.map((cat) => [cat.id, cat]));

  const getAncestorChain = (category: Category): Category[] => {
    return category.ancestors.map((a) => byId.get(a.id)).filter((c): c is Category => Boolean(c));
  };

  const buildMenuItem = (category: Category): MenuItemUnion => {
    const children = categories.filter((c) => c.parent?.id === category.id).map(buildMenuItem);

    const ancestors = getAncestorChain(category);
    const root = ancestors[0] ?? category;

    const params: Record<string, string> = {
      category: root.slug['en-US'],
    };

    if (children.length > 0) {
      return {
        type: 'parent',
        name: category.name['en-US'],
        to: base,
        params,
        children,
      };
    }
    const splatParts = [...ancestors.slice(1).map((a) => a.slug['en-US']), category.slug['en-US']];
    params._splat = splatParts.join('/');
    return {
      type: 'child',
      name: category.name['en-US'],
      to: base,
      params,
    };
  };

  return categories.filter((cat) => !cat.parent).map(buildMenuItem);
}
