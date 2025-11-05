import { type ZodType, type ZodError, flattenError } from "zod";

// * separate types for success and failure to create a discriminated union
interface ValidationSuccess<T> {
  valid: true;
  data: T;
  error?: never;
}

interface ValidationFailure {
  valid: false;
  data?: never;
  error: Record<string, string[] | undefined>;
}

type ValidationResult<T> = ValidationSuccess<T> | ValidationFailure;

/**
 * Validates JSON data against a Zod schema and returns a type-safe result.
 *
 * This function attempts to parse and validate the provided JSON data using the given
 * Zod schema. It returns a discriminated union that either contains the validated data
 * or detailed error information.
 *
 * @template T - The expected type of the validated data
 * @param json - The unknown data to validate (typically parsed JSON)
 * @param schema - The Zod schema to validate against
 * @returns A validation result object with either `valid: true` and parsed data,
 *          or `valid: false` with form and field-level errors
 */
export const validateJson = <T>(
  json: unknown,
  schema: ZodType<T>
): ValidationResult<T> => {
  const { data, error } = schema.safeParse(json);

  if (error) return handleValidationError<T>(error);
  return {
    valid: true,
    data,
  };
};

const handleValidationError = <T>(error: ZodError): ValidationFailure => {
  const flattened = flattenError(error);

  return {
    valid: false,
    error: flattened.fieldErrors,
  };
};
