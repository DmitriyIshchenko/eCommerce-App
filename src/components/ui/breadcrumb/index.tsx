import {
  Breadcrumb,
  BreadcrumbDivider,
  BreadcrumbItem,
  makeStyles,
  tokens,
} from '@fluentui/react-components';
import { InternalLink } from '../links/fui-tanstack';
import { Fragment } from 'react/jsx-runtime';
import type { Link } from '../../../lib/types';

interface Props {
  links?: Link[];
}

const useStyles = makeStyles({
  divider: {
    color: tokens.colorNeutralForeground4,
  },
  breadcrumb: {
    '> ol': {
      flexWrap: 'wrap',
    },
  },
});

export default function CustomBreadcrumb({ links }: Props) {
  const styles = useStyles();
  return (
    <Breadcrumb aria-label="Catalog Breadcrumb" className={styles.breadcrumb}>
      <BreadcrumbItem>
        <InternalLink to="/" appearance="muted" asBlock>
          Home
        </InternalLink>
      </BreadcrumbItem>
      {links?.map((v, i, a) => {
        const isLast = i === a.length - 1;
        return (
          <Fragment key={v.to}>
            <BreadcrumbDivider className={styles.divider} />
            <InternalLink
              to={v.to}
              appearance="muted"
              asBlock
              accent={isLast}
              notInteractive={isLast}
            >
              {v.text}
            </InternalLink>
          </Fragment>
        );
      })}
    </Breadcrumb>
  );
}
