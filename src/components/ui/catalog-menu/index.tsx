import {
  Link,
  Menu,
  MenuItem,
  MenuList,
  MenuPopover,
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

  const handleNavigate = async (slug: string) => {
    await navigate({ to: '/catalog/$category', params: { category: slug } });
  };

  return (
    <Menu openOnHover>
      <MenuTrigger>
        <CustomLink to="/catalog">
          Catalog <ChevronDownFilled />
        </CustomLink>
      </MenuTrigger>
      <MenuPopover>
        <MenuList>
          <MenuItem onClick={() => void handleNavigate('all')}>Shop All</MenuItem>
          {categories.map((category) => (
            <MenuItem key={category.id} onClick={() => void handleNavigate(category.slug['en-US'])}>
              {category.name['en-US']}
            </MenuItem>
          ))}
        </MenuList>
      </MenuPopover>
    </Menu>
  );
}
