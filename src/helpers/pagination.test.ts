// @ts-nocheck
import { getPageNumbers } from "./pagination";

describe("getPageNumbers", () => {
  test("Should list every page when there are 7 or fewer", () => {
    expect(getPageNumbers(1, 1)).toEqual([1]);
    expect(getPageNumbers(3, 7)).toEqual([1, 2, 3, 4, 5, 6, 7]);
  });

  test("Should keep the first pages together near the start", () => {
    expect(getPageNumbers(1, 23)).toEqual([1, 2, 3, 4, 5, "gap", 23]);
    expect(getPageNumbers(4, 23)).toEqual([1, 2, 3, 4, 5, "gap", 23]);
  });

  test("Should show the current page with its neighbours in the middle", () => {
    expect(getPageNumbers(12, 23)).toEqual([1, "gap", 11, 12, 13, "gap", 23]);
  });

  test("Should keep the last pages together near the end", () => {
    expect(getPageNumbers(23, 23)).toEqual([1, "gap", 19, 20, 21, 22, 23]);
    expect(getPageNumbers(20, 23)).toEqual([1, "gap", 19, 20, 21, 22, 23]);
  });
});
