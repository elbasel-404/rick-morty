import { useEffect, useMemo, useRef, useState } from "react";

import {
  useDebounceCallback,
  type DebouncedState,
} from "./useDebounceCalllback";
import { type DebounceOptions } from "@util";

type UseDebounceValueOptions<T> = DebounceOptions & {
  equalityFn?: (left: T, right: T) => boolean;
};

const defaultEquality = <T>(left: T, right: T) => Object.is(left, right);

type SetStateDebounced<T> = DebouncedState<
  React.Dispatch<React.SetStateAction<T>>
>;

export function useDebounceValue<T>(
  valueOrInitializer: T | (() => T),
  delay: number,
  options: UseDebounceValueOptions<T> = {}
): [T, SetStateDebounced<T>] {
  const resolveValue = useMemo(
    () =>
      typeof valueOrInitializer === "function"
        ? (valueOrInitializer as () => T)
        : () => valueOrInitializer,
    [valueOrInitializer]
  );

  const [debouncedValue, setDebouncedValue] = useState<T>(() => resolveValue());
  const previousValueRef = useRef<T>(debouncedValue);

  const equalityFn = options.equalityFn ?? defaultEquality;

  const updateDebouncedValue = useDebounceCallback(
    setDebouncedValue,
    delay,
    options
  );

  useEffect(() => {
    const nextValue = resolveValue();
    if (!equalityFn(previousValueRef.current, nextValue)) {
      updateDebouncedValue(nextValue);
      previousValueRef.current = nextValue;
    }
  }, [resolveValue, equalityFn, updateDebouncedValue]);

  return [debouncedValue, updateDebouncedValue];
}
