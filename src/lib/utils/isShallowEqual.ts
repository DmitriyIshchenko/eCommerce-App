export function isShallowEqual(o1: Record<string, unknown>, o2: Record<string, unknown>) {
  if (o1 === o2) return true;
  const k1 = Object.keys(o1);
  const k2 = Object.keys(o2);
  if (k1.length !== k2.length) return false;
  return k1.every((k) => Object.hasOwn(o2, k) && Object.is(o1[k], o2[k]));
}
