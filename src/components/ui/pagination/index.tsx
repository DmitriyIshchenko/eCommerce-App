import { ChevronLeftFilled, ChevronRightFilled } from '@fluentui/react-icons';
import { InternalLink } from '../links/fui-tanstack';
import { useLocation } from '@tanstack/react-router';
import { tokens } from '@fluentui/react-components';

const LENGTH = 7;

export default function Pagination({
  searchParamName,
  total,
}: {
  searchParamName: string;
  total: number;
}) {
  const { pathname, search } = useLocation();
  const searchObj: { [searchParamName]?: unknown } = { ...search };
  const currentPage =
    typeof searchObj[searchParamName] === 'number' ? searchObj[searchParamName] : 1;
  if (total < 2) return;

  const head = [1, currentPage > 3 ? '...' : 2].slice(0, total);
  const tail =
    total > 5
      ? [currentPage < total - 3 ? '...' : total - 1, total].slice(Math.max(LENGTH - total, 0))
      : [];
  const body = [
    Math.max(3, Math.min(currentPage - 1, total - 4)),
    Math.max(4, Math.min(currentPage, total - 3)),
    Math.max(5, Math.min(currentPage + 1, total - 2)),
  ].slice(0, total - 2);
  const pages = [...head, ...body, ...tail];
  return (
    <div style={{ display: 'flex', padding: `${tokens.spacingVerticalL} 0` }}>
      <InternalLink
        asBlock
        to="/"
        search={{ [searchParamName]: currentPage - 1 }}
        disabled={currentPage === 1}
        notInteractive={currentPage === 1}
      >
        <ChevronLeftFilled />
      </InternalLink>
      {pages.map((p, i) => (
        <InternalLink
          to={pathname}
          key={i}
          asBlock
          appearance="straight"
          notInteractive={currentPage === p || p === '...'}
          accent={currentPage === p}
          search={{
            ...search,
            [searchParamName]: p,
          }}
        >
          {p}
        </InternalLink>
      ))}
      <InternalLink
        asBlock
        to={pathname}
        search={{ ...search, page: currentPage + 1 }}
        disabled={currentPage === total}
        notInteractive={currentPage === total}
      >
        <ChevronRightFilled />
      </InternalLink>
    </div>
  );
}
