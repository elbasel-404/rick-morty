"use client";

import { useState, useCallback } from "react";
import type { Result } from "@util";

interface UseAsyncOperationOptions<T> {
  onSuccess?: (data: T) => void;
  onError?: (error: string) => void;
}

export const useAsyncOperation = <T>(
  options: UseAsyncOperationOptions<T> = {}
) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<T | null>(null);

  const execute = useCallback(
    async (operation: () => Promise<Result<T>>): Promise<Result<T>> => {
      setIsLoading(true);
      setError(null);

      const result = await operation();

      setIsLoading(false);

      if (result.success) {
        setData(result.data);
        options.onSuccess?.(result.data);
      } else {
        setError(result.error);
        options.onError?.(result.error);
      }

      return result;
    },
    [options]
  );

  const reset = useCallback(() => {
    setIsLoading(false);
    setError(null);
    setData(null);
  }, []);

  return { execute, isLoading, error, data, reset };
};
