import {
  Link,
  makeStyles,
  Menu,
  MenuItem,
  MenuList,
  MenuPopover,
  MenuSplitGroup,
  MenuTrigger,
  tokens,
} from '@fluentui/react-components';
import { ChevronDownFilled } from '@fluentui/react-icons';
import { createLink, useNavigate } from '@tanstack/react-router';
import type { Category } from '@commercetools/platform-sdk';
import { Route } from '../../routes/__root';

const useStyles = makeStyles({
  link: {
    color: tokens.colorNeutralForeground1,
    fontSize: '1.2rem',
  },
});

export function CatalogMenu() {
  const styles = useStyles();
  const CustomLink = createLink(Link);
  const navigate = useNavigate();
  const categories = Route.useLoaderData();

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
    const id = category.id;
    const name = category.name['en-US'];
    const slug = category.slug['en-US'];

    if (subcategories.length > 0) {
      return (
        <Menu openOnHover={false} closeOnScroll key={id}>
          <MenuSplitGroup>
            <MenuItem onClick={() => void handleNavigateCategory(slug)}>{name}</MenuItem>
            <MenuTrigger disableButtonEnhancement>
              <MenuItem />
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
    <Menu closeOnScroll>
      <MenuSplitGroup>
        <MenuItem>
          <CustomLink className={styles.link} to="/catalog/$category" params={{ category: 'all' }}>
            Catalog
          </CustomLink>
        </MenuItem>

        <MenuTrigger disableButtonEnhancement>
          <MenuItem aria-label="Open menu">
            <ChevronDownFilled />
          </MenuItem>
        </MenuTrigger>
      </MenuSplitGroup>

      <MenuPopover>
        <MenuList aria-label="Catalog categories">
          {parentCategories.map(renderCategoryMenuItem)}
        </MenuList>
      </MenuPopover>
    </Menu>
  );
}
