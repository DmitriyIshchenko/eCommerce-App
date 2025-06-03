import {
  Button,
  makeStyles,
  Menu,
  MenuItem,
  MenuList,
  MenuPopover,
  MenuSplitGroup,
  MenuTrigger,
} from '@fluentui/react-components';
import type { ReactNode } from 'react';
import { InternalLink } from '../links/fui-tanstack';
import { ChevronDownFilled } from '@fluentui/react-icons';

const useStyles = makeStyles({
  item: {
    ':hover': {
      backgroundColor: 'transparent',
      cursor: 'auto',
      ':active': {
        backgroundColor: 'transparent',
      },
    },
  },
});

interface ItemBase {
  name: string;
  to: string;
  params: Record<string, string>;
}

interface ChildItem extends ItemBase {
  type: 'child';
}

interface ParentItem extends ItemBase {
  type: 'parent';
  children: MenuItemUnion[];
}

export type MenuItemUnion = ParentItem | ChildItem;

const Parent = ({
  to,
  params,
  ariaLabel,
  children,
  name,
}: {
  to: string;
  params?: object;
  ariaLabel?: string;
  children: ReactNode;
  name: string;
}) => {
  const styles = useStyles();
  return (
    <Menu openOnHover={false}>
      <MenuSplitGroup>
        <MenuItem className={styles.item}>
          <InternalLink to={to} params={params}>
            {name}
          </InternalLink>
        </MenuItem>
        <MenuTrigger disableButtonEnhancement>
          <MenuItem aria-label={ariaLabel} />
        </MenuTrigger>
      </MenuSplitGroup>
      <MenuPopover>
        <MenuList>{children}</MenuList>
      </MenuPopover>
    </Menu>
  );
};

const Child = ({ to, params, name }: { to: string; params?: object; name: string }) => {
  const styles = useStyles();
  return (
    <MenuItem className={styles.item}>
      <InternalLink to={to} params={params}>
        {name}
      </InternalLink>
    </MenuItem>
  );
};

const renderItem = (item: MenuItemUnion) => {
  if (item.type === 'child') {
    return <Child key={item.name} to={item.to} name={item.name} params={item.params} />;
  }
  if (item.type === 'parent') {
    return (
      <Parent key={item.name} to={item.to} name={item.name} params={item.params}>
        {item.children.map(renderItem)}
      </Parent>
    );
  }
};

export default function SplitLinkMenu({
  to,
  name,
  active,
  items,
}: {
  to: string;
  name: string;
  active?: boolean;
  items: MenuItemUnion[];
}) {
  return (
    <Menu>
      <div>
        <InternalLink to={to} active={active}>
          {name}
        </InternalLink>
        <MenuTrigger disableButtonEnhancement>
          <Button icon={<ChevronDownFilled />} appearance="transparent" />
        </MenuTrigger>
      </div>
      <MenuPopover>
        <MenuList>{items.map(renderItem)}</MenuList>
      </MenuPopover>
    </Menu>
  );
}
