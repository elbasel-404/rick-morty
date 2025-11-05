type ReturnType<T> = Record<keyof T, Exclude<T[keyof T], undefined>>;

/**
 * Filters out undefined values from an object, returning a clean object with only defined values.
 *
 * This is particularly useful for cleaning up query parameters or API payloads
 * where optional fields should be omitted rather than sent as undefined.
 *
 * @template T - A generic type that extends Record<string, unknown>
 * @param obj - The object to filter (can be undefined)
 * @returns The filtered object with only defined values, or undefined if input is undefined
 *
 */
export const filterObject = <T extends Record<string, unknown>>(
  obj: T | undefined
) => {
  if (!obj) return;
  return Object.fromEntries(
    Object.entries(obj).filter(([, value]) => value !== undefined)
  ) as ReturnType<T>;
};
