"use client";
import { useMemo, useRef } from "react";

import { useUnmount } from "./useUnmount";
import { debounce, type DebounceOptions, type DebouncedFunction } from "@util";

type ControlFunctions<T extends (...args: any) => any> = {
  cancel: () => void;
  flush: () => ReturnType<T> | undefined;
  isPending: () => boolean;
};

export type DebouncedState<T extends (...args: any) => any> = ((
  ...args: Parameters<T>
) => ReturnType<T> | undefined) &
  ControlFunctions<T>;

export function useDebounceCallback<T extends (...args: any) => any>(
  func: T,
  delay = 500,
  options?: DebounceOptions
): DebouncedState<T> {
  const debouncedFunc = useRef<DebouncedFunction<T> | null>(null);

  useUnmount(() => {
    if (debouncedFunc.current) {
      debouncedFunc.current.cancel();
    }
  });

  const debounced = useMemo(() => {
    debouncedFunc.current?.cancel();

    const debouncedFuncInstance = debounce(func, delay, options);
    debouncedFunc.current = debouncedFuncInstance;

    const wrappedFunc: DebouncedState<T> = (...args: Parameters<T>) => {
      return debouncedFuncInstance(...args);
    };

    wrappedFunc.cancel = debouncedFuncInstance.cancel;
    wrappedFunc.flush = debouncedFuncInstance.flush;
    wrappedFunc.isPending = debouncedFuncInstance.isPending;

    return wrappedFunc;
  }, [func, delay, options]);

  return debounced;
}
