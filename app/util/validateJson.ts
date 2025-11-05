import { type ZodType, ZodError, flattenError } from "zod";
import { logError } from "./logError";

/**
 * Validates data against a Zod schema and returns formatted errors.
 *
 * @param data - The data to validate
 * @param schema - The Zod schema to validate against
 * @returns Object containing validation result with parsedData or formatted errors
 */
export const validateJson = <T>(
  json: unknown,
  schema: ZodType<T>
): {
  valid: boolean;
  data?: T;
  errors?: {
    formErrors: string[];
    fieldErrors: Record<string, string[] | undefined>;
  };
} => {
  try {
    const data = schema.parse(json);
    return { valid: true, data };
  } catch (error) {
    if (error instanceof ZodError) {
      const flattened = flattenError(error);
      logError({
        errorTitle: `Data validation failed while validating ${schema.constructor.name}`,
        errorContent: JSON.stringify(flattened, null, 2),
      });
      return {
        valid: false,
        errors: {
          formErrors: flattened.formErrors,
          fieldErrors: flattened.fieldErrors,
        },
      };
    }
    logError({
      errorTitle: `Data validation failed while validating ${schema.constructor.name}`,
      errorContent: "N/A",
    });
    return {
      valid: false,
      errors: {
        formErrors: ["Unknown validation error"],
        fieldErrors: {},
      },
    };
  }
};
