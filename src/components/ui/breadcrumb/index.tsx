import {
  Breadcrumb,
  BreadcrumbDivider,
  BreadcrumbItem,
  isTruncatableBreadcrumbContent,
  makeStyles,
  tokens,
  truncateBreadcrumbLongName,
} from '@fluentui/react-components';
import { InternalLink } from '../links/fui-tanstack';
import { Fragment } from 'react/jsx-runtime';
import type { Link } from '../../../lib/types';
import StyledTooltip from '../tooltips/styled';

interface Props {
  links?: Link[];
  truncate?: number;
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

const Item = ({
  text,
  to,
  className,
  isLast,
}: {
  className?: string;
  to: string;
  isLast?: boolean;
  text: string;
}) => (
  <Fragment>
    <BreadcrumbDivider className={className} />
    <InternalLink to={to} appearance="muted" asBlock accent={isLast} notInteractive={isLast}>
      {text}
    </InternalLink>
  </Fragment>
);

const TruncatedItem = ({
  text,
  to,
  className,
  isLast,
  truncateTo,
}: {
  className?: string;
  to: string;
  isLast?: boolean;
  text: string;
  truncateTo: number;
}) => (
  <Fragment>
    <BreadcrumbDivider className={className} />
    <StyledTooltip contentChildren={text}>
      <div>
        <InternalLink to={to} appearance="muted" asBlock accent={isLast} notInteractive={isLast}>
          {truncateBreadcrumbLongName(text, truncateTo)}
        </InternalLink>
      </div>
    </StyledTooltip>
  </Fragment>
);

export default function CustomBreadcrumb({ links, truncate }: Props) {
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
            {truncate && isTruncatableBreadcrumbContent(v.text, truncate) ? (
              <TruncatedItem
                text={v.text}
                to={v.to}
                truncateTo={truncate}
                className={styles.divider}
                isLast={isLast}
              />
            ) : (
              <Item text={v.text} to={v.to} className={styles.divider} isLast={isLast} />
            )}
          </Fragment>
        );
      })}
    </Breadcrumb>
  );
}
