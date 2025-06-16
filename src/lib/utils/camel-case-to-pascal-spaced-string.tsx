export const kebabCaseToPascalSpacedString = (s: string) =>
  s.length
    ? s
        .split('-')
        .map((v) => v[0].toUpperCase() + v.slice(1))
        .join(' ')
    : '';
