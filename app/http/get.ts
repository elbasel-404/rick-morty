import { apiResponseSchema } from "@schema";
import type { Endpoint } from "@type";
import { buildFetchUrl, filterObject, logError, validateJson } from "@util";
import { flattenError, type ZodError, type ZodType } from "zod";

/**
 * Discriminated union type for HTTP GET request results.
 * Ensures type-safe handling of success and error cases.
 */
type GetDataResult<T> =
  | { success: true; data: T[]; error: null }
  | { success: false; data: T[] | null; error: string };

/**
 * Parameters for performing a typed HTTP GET request.
 */
interface GetDataParams<T> {
  endpoint: Endpoint<T>; // Endpoint configuration with URL and schema
  queryParams?: Record<string, string | undefined>; // Optional query parameters
}

/**
 * Performs an HTTP GET request with automatic validation and type safety.
 *
 * This function handles the complete request lifecycle:
 * 1. Builds the URL with query parameters
 * 2. Fetches data from the API
 * 3. Validates the API response structure
 * 4. Validates the result data against the endpoint schema
 * 5. Returns type-safe validated data or detailed error information
 *
 * All validation errors are logged with detailed debugging information.
 *
 * @template T - The expected type of the result data
 * @param params - The request parameters
 * @param params.endpoint - Endpoint configuration with URL and validation schema
 * @param params.queryParams - Optional query parameters (undefined values filtered out)
 * @returns A promise resolving to either success with validated data or failure with error message
 *
 * @example
 * ```ts
 * const result = await get({
 *   endpoint: CHARACTER_ENDPOINT,
 *   queryParams: { page: "1", status: "alive" }
 * });
 *
 * if (result.success) {
 *   console.log(result.data); // Type-safe character data
 * } else {
 *   console.error(result.error);
 * }
 * ```
 */
export const get = async <T>({
  endpoint,
  queryParams,
}: GetDataParams<T>): Promise<GetDataResult<T>> => {
  const { url, schema } = endpoint;

  // Build the complete URL with query parameters
  const queryUrl = buildQueryUrl(url, queryParams);

  // Fetch data from the API
  const fetchResult = await fetchData(queryUrl, url);
  if (!fetchResult.success) {
    return { ...fetchResult, data: fetchResult.data as T[] };
  }

  // Validate the general API response structure
  const responseValidation = validateJson(fetchResult.data, apiResponseSchema);
  if (!responseValidation.valid) {
    return handleValidationError({
      url,
      itemSchema: null,
      receivedData: null,
      validationError: responseValidation.error,
    });
  }

  // Validate the result data against the endpoint-specific schema
  const resultValidation = validateJson(
    responseValidation.data.results,
    schema,
  );
  if (!resultValidation.valid) {
    return handleValidationError({
      url,
      itemSchema: schema,
      receivedData: responseValidation.data.results as T[],
      validationError: resultValidation.error,
    });
  }

  return { success: true, data: resultValidation.data as T[], error: null };
};

/**
 * Builds the complete query URL with filtered query parameters.
 * Removes undefined values before constructing the URL.
 *
 * @param url - The base endpoint URL
 * @param queryParams - Optional query parameters (undefined values will be filtered out)
 * @returns The complete URL with query string
 */
const buildQueryUrl = (
  url: string,
  queryParams?: Record<string, string | undefined>,
): string => {
  const filteredQueryParams = filterObject(queryParams);
  return buildFetchUrl({
    endpointUrl: url,
    queryParams: filteredQueryParams,
  });
};

/**
 * Fetches data from the specified URL and handles network/HTTP errors.
 *
 * Performs error handling for:
 * - Network failures (connection issues, timeouts, etc.)
 * - HTTP errors (4xx, 5xx status codes)
 * - JSON parsing errors
 *
 * @param queryUrl - The complete URL to fetch from
 * @param endpointUrl - The base endpoint URL (for error logging)
 * @returns A result object containing either the parsed JSON or error details
 */
const fetchData = async (
  queryUrl: string,
  endpointUrl: string,
): Promise<GetDataResult<unknown>> => {
  try {
    const response = await fetch(queryUrl, {
      method: "GET",
    });

    // Handle HTTP errors (4xx, 5xx status codes)
    if (!response.ok) {
      const errorMessage = `HTTP error! status: ${response.status}`;
      logError({
        errorTitle: `Fetch failed at endpoint: ${endpointUrl}`,
        errorContent: errorMessage,
      });
      return {
        success: false,
        error: errorMessage,
        data: null, // Include response body for debugging
      };
    }

    // Parse JSON response
    const json = await response.json();
    return { success: true, data: json, error: null };
  } catch (error) {
    // Handle network errors, timeouts, or JSON parsing errors
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    logError({
      errorTitle: `Network error at endpoint: ${endpointUrl}`,
      errorContent: errorMessage,
    });
    return {
      success: false,
      error: `Network error: ${errorMessage}`,
      data: null,
    };
  }
};

/**
 * Parameters for handling validation errors with detailed debugging.
 */
interface HandleValidationErrorParams<T> {
  url: string; // The endpoint URL that failed
  validationError: Record<string, string[]>; // Field-level validation errors
  receivedData: T[] | null; // The data that failed validation
  itemSchema: ZodType<T> | null; // Schema for individual item validation
}

/**
 * Handles validation errors with comprehensive logging and debugging information.
 *
 * This function:
 * 1. Logs the validation error with field-level details
 * 2. Identifies specific items that failed validation (if schema provided)
 * 3. Prints each invalid item with its specific error and data
 * 4. Returns a structured error result
 *
 * The detailed logging helps developers quickly identify and fix schema mismatches.
 *
 * @template T - The expected data type
 * @param params - Error handling parameters
 * @returns A failed result object with error details and received data
 */
const handleValidationError = <T>({
  url,
  validationError,
  receivedData,
  itemSchema,
}: HandleValidationErrorParams<T>): GetDataResult<T> => {
  const errorMessage = JSON.stringify(validationError, null, 2);
  console.log(typeof receivedData);

  // Find specific items that failed validation (if schema and data provided)
  const invalidData =
    itemSchema && receivedData
      ? receivedData
          ?.filter((item) => !itemSchema.safeParse(item).success)
          .map((item) => ({
            error: Object.entries(
              flattenError(itemSchema.safeParse(item).error as ZodError)
                .fieldErrors,
            )[0].join(": "),
            ...item,
          }))
      : [];

  // Log the main validation error
  logError({
    errorTitle: `Data validation failed for endpoint: ${url}`,
    errorContent: errorMessage,
  });

  // Log each invalid item with detailed information
  invalidData.forEach((d) => {
    const { error, ...rest } = d;
    // Print error in red
    console.log("\x1b[31m%s\x1b[0m", "error:", `${error}\n`);
    // Extract the field name from error message
    const key =
      typeof error === "string" ? error.split(":")[0].trim() : String(error);
    // Show the specific field value that caused the error
    console.log(`\`${key}\`: `, rest[key as keyof typeof rest]);
    // Print full item data
    console.log(JSON.stringify(rest, null, 2));
    console.log("\n--------\n");
  });

  // Summary information
  console.log(`${url} fetched and validated`);
  console.log(`Found ${invalidData.length} invalid items:`);

  return { success: false, error: errorMessage, data: receivedData as T[] };
};
