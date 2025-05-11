/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { describe, expect, test } from "vitest";
import { countSum } from "./example-function";


describe("simple test", () => {

  test("must correctly add 1 and 2", () => {
    expect(countSum(1,2)).toBe(3);
  });
  test("must correctly add 2 and 2", () => {
    expect(countSum(2,2)).toBe(4);
  });

});