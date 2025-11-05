// an object without the keys that have undefined values
type ReturnType<T> = Record<keyof T, Exclude<T[keyof T], undefined>>;

/**
 * Filters out undefined values from an object.
 *
 * @template T - A generic type that extends Record<string, unknown>
 * @param {T} obj - The object to filter
 * @returns {T | undefined} - The filtered object or undefined if input is undefined
 */
export const filterObject = <T extends Record<string, unknown>>(
  obj: T | undefined
) => {
  if (!obj) return;
  return Object.fromEntries(
    Object.entries(obj).filter(([, value]) => value !== undefined)
  ) as ReturnType<T>;
};
