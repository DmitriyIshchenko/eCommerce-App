import {
  Breadcrumb,
  BreadcrumbDivider,
  BreadcrumbItem,
  isTruncatableBreadcrumbContent,
  makeStyles,
  tokens,
  truncateBreadcrumbLongName,
} from '@fluentui/react-components';
import { Fragment } from 'react/jsx-runtime';
import type { Link } from '../../../lib/types';
import { InternalLink } from '../links/fui-tanstack';
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
  wrapper: {
    width: '100%',
    padding: `${tokens.spacingVerticalL} ${tokens.spacingHorizontalXL}`,
    borderBottom: `1px solid ${tokens.colorNeutralStroke1}`,
  },
});

const Item = ({
  key,
  text,
  to,
  className,
  isLast,
}: {
  key: string;
  className?: string;
  to: string;
  isLast?: boolean;
  text: string;
}) => (
  <Fragment key={key}>
    <BreadcrumbDivider className={className} />
    <InternalLink to={to} appearance="muted" asBlock accent={isLast} notInteractive={isLast}>
      {text}
    </InternalLink>
  </Fragment>
);

const TruncatedItem = ({
  key,
  text,
  to,
  className,
  isLast,
  truncateTo,
}: {
  key: string;
  className?: string;
  to: string;
  isLast?: boolean;
  text: string;
  truncateTo: number;
}) => (
  <Fragment key={key}>
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
    <div className={styles.wrapper}>
      <Breadcrumb aria-label="Catalog Breadcrumb" className={styles.breadcrumb}>
        <BreadcrumbItem>
          <InternalLink to="/" appearance="muted" asBlock>
            Home
          </InternalLink>
        </BreadcrumbItem>
        {links?.map((v, i, a) => {
          const isLast = i === a.length - 1;
          return truncate && isTruncatableBreadcrumbContent(v.text, truncate) ? (
            <TruncatedItem
              key={v.to}
              text={v.text}
              to={v.to}
              truncateTo={truncate}
              className={styles.breadcrumb}
              isLast={isLast}
            />
          ) : (
            <Item
              key={v.to}
              text={v.text}
              to={v.to}
              className={styles.breadcrumb}
              isLast={isLast}
            />
          );
        })}
      </Breadcrumb>
    </div>
  );
}
