/**
 * Result type for consistent error handling across the application
 */
export type Result<T, E = string> =
  | { success: true; data: T; error: null }
  | { success: false; data: null; error: E };

export const success = <T>(data: T): Result<T, never> => ({
  success: true,
  data,
  error: null,
});

export const failure = <E = string>(error: E): Result<never, E> => ({
  success: false,
  data: null,
  error,
});

/**
 * Safely execute an async operation and return a Result
 */
export const tryCatch = async <T>(
  fn: () => Promise<T>,
  errorMessage?: string
): Promise<Result<T, string>> => {
  try {
    const data = await fn();
    return success(data);
  } catch (error) {
    const message =
      errorMessage ||
      (error instanceof Error ? error.message : "Unknown error occurred");
    return failure(message);
  }
};
