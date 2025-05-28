import {
  Link,
  Menu,
  MenuItem,
  MenuList,
  MenuPopover,
  MenuSplitGroup,
  MenuTrigger,
} from '@fluentui/react-components';
import { ChevronDownFilled } from '@fluentui/react-icons';
import { createLink, useNavigate } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import { getCategories } from '../../../lib/api/get-categories';
import type { Category } from '@commercetools/platform-sdk';

export function CatalogMenu() {
  const CustomLink = createLink(Link);
  const navigate = useNavigate();
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    getCategories()
      .then((data) => setCategories(data))
      .catch(() => setCategories([]));
  }, []);

  const handleNavigateCategory = async (slug: string) => {
    await navigate({ to: '/catalog/$category', params: { category: slug } });
  };

  const handleNavigateSubcategory = async (slugCat: string, slugSubCat: string) => {
    await navigate({
      to: '/catalog/$category/$subcategory',
      params: { category: slugCat, subcategory: slugSubCat },
    });
  };

  const getSubcategories = (parentId: string) => {
    return categories.filter((subcat) => subcat.parent?.id === parentId);
  };

  const renderCategoryMenuItem = (category: Category) => {
    const subcategories = getSubcategories(category.id);
    const name = category.name['en-US'];
    const slug = category.slug['en-US'];

    if (subcategories.length > 0) {
      return (
        <Menu key={category.id}>
          <MenuSplitGroup>
            <MenuItem onClick={() => void handleNavigateCategory(slug)}>{name}</MenuItem>
            <MenuTrigger disableButtonEnhancement>
              <MenuItem aria-label="Open submenu" />
            </MenuTrigger>
          </MenuSplitGroup>
          <MenuPopover>
            <MenuList>
              {subcategories.map((subcat) => (
                <MenuItem
                  key={subcat.id}
                  onClick={() => void handleNavigateSubcategory(slug, subcat.slug['en-US'])}
                >
                  {subcat.name['en-US']}
                </MenuItem>
              ))}
            </MenuList>
          </MenuPopover>
        </Menu>
      );
    }

    return (
      <MenuItem key={category.id} onClick={() => void handleNavigateCategory(slug)}>
        {name}
      </MenuItem>
    );
  };

  const parentCategories = categories.filter((cat) => !cat.parent);

  return (
    <Menu openOnHover>
      <MenuTrigger disableButtonEnhancement>
        <CustomLink to="/catalog/$category" params={{ category: 'all' }}>
          Catalog <ChevronDownFilled />
        </CustomLink>
      </MenuTrigger>
      <MenuPopover>
        <MenuList>{parentCategories.map(renderCategoryMenuItem)}</MenuList>
      </MenuPopover>
    </Menu>
  );
}
