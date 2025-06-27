export const kebabToCapitalizedSpacedString = (s: string) => {
  return s.length
    ? s
        .split('-')
        .map((v) => v[0].toUpperCase() + v.slice(1))
        .join(' ')
    : '';
};
