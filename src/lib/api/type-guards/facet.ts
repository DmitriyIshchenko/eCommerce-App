import type { FacetResult, TermFacetResult, RangeFacetResult } from '@commercetools/platform-sdk';

export function isTermFacetResult(facet: FacetResult): facet is TermFacetResult {
  return facet.type === 'terms';
}
export function isRangeFacetResult(facet: FacetResult): facet is RangeFacetResult {
  return facet.type === 'range';
}