export function isStringifyEqual(o1: Record<string, unknown>, o2: Record<string, unknown>) {
  try {
    return JSON.stringify(o1) === JSON.stringify(o2);
  } catch {
    return false;
  }
}
