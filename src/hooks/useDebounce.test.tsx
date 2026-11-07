// @ts-nocheck
import { renderHook, act } from "@testing-library/react";
import { vi } from "vitest";
import useDebounce from "./useDebounce";

beforeEach(() => vi.useFakeTimers());
afterEach(() => vi.useRealTimers());

test("Should update the value only after the delay has passed", () => {
  const { result, rerender } = renderHook(
    ({ value }) => useDebounce(value, 300),
    { initialProps: { value: "a" } }
  );

  rerender({ value: "ab" });
  act(() => vi.advanceTimersByTime(200));
  expect(result.current).toBe("a");

  rerender({ value: "abc" });
  act(() => vi.advanceTimersByTime(200));
  expect(result.current).toBe("a");

  act(() => vi.advanceTimersByTime(100));
  expect(result.current).toBe("abc");
});
