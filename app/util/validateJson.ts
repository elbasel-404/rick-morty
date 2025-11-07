import { flattenError, type ZodError, type ZodType } from "zod";

interface ValidationSuccess<T> {
  valid: true;
  data: T;
  error?: null;
}

interface ValidationFailure {
  valid: false;
  originalInput?: unknown;
  error: Record<string, string[]>;
}

/**
 * Discriminated union type for validation results.
 * Allows type-safe handling of success/failure cases.
 */
type ValidationResult<T> = ValidationSuccess<T> | ValidationFailure;

/**
 * Validates JSON data against a Zod schema and returns a type-safe result.
 *
 * This function attempts to parse and validate the provided JSON data using the given
 * Zod schema. It returns a discriminated union that either contains the validated data
 * or detailed error information.
 *
 * Automatically handles both single objects and arrays by wrapping the schema
 * in `.array()` when the input is an array.
 *
 * @template T - The expected type of the validated data
 * @param json - The unknown data to validate (typically parsed JSON)
 * @param schema - The Zod schema to validate against
 * @returns A validation result object with either `valid: true` and parsed data,
 *          or `valid: false` with form and field-level errors
 *
 * @example
 * ```ts
 * const result = validateJson(apiData, characterSchema);
 * if (result.valid) {
 *   console.log(result.data); // Type-safe access to validated data
 * } else {
 *   console.error(result.error); // Field-level error details
 * }
 * ```
 */
export const validateJson = <T>(
  json: unknown,
  schema: ZodType<T>,
): ValidationResult<T> => {
  // Automatically wrap schema in array validator if input is an array
  const schemaToUse = Array.isArray(json) ? schema.array() : schema;
  const { data, error } = schemaToUse.safeParse(json);

  if (error) return handleValidationError(error, json);
  return {
    valid: true,
    data: data as T,
    error: null,
  };
};

/**
 * Converts Zod validation errors into a flattened, user-friendly format.
 *
 * @param error - The Zod error object from failed validation
 * @returns A validation failure object with field-specific error messages
 */
const handleValidationError = (
  error: ZodError,
  originalInput: unknown,
): ValidationFailure => {
  const flattened = flattenError(error);

  return {
    valid: false,
    error: flattened.fieldErrors,
    originalInput: originalInput,
  };
};
