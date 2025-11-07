import axios, { type AxiosRequestConfig } from "axios";
import type { Endpoint } from "@type";
import { filterObject, logError, validateJson } from "@util";
import { apiResponseSchema } from "@schema";
import { flattenError, type ZodError, type ZodType, type z } from "zod";

import { axiosClient } from "./axiosClient";

/**
 * Discriminated union type for HTTP GET request results.
 * Ensures type-safe handling of success and error cases.
 */
type ApiResponseInfo = z.infer<typeof apiResponseSchema>["info"];

interface GetSuccessResult<T> {
  success: true;
  data: T[];
  info: ApiResponseInfo;
  error: null;
}

interface GetErrorResult<T> {
  success: false;
  data: T[] | null;
  info: null;
  error: string;
}

type GetDataResult<T> = GetSuccessResult<T> | GetErrorResult<T>;

interface FetchSuccessResult {
  success: true;
  data: unknown;
  error: null;
}

interface FetchErrorResult {
  success: false;
  data: null;
  error: string;
}

type FetchResult = FetchSuccessResult | FetchErrorResult;

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

  const sanitizedParams = filterObject(queryParams);

  // Fetch data from the API
  const fetchResult = await fetchData({
    endpointUrl: url,
    queryParams: sanitizedParams,
  });
  if (!fetchResult.success) {
    return {
      success: false,
      data: null,
      info: null,
      error: fetchResult.error,
    } satisfies GetErrorResult<T>;
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
    schema
  );
  if (!resultValidation.valid) {
    return handleValidationError({
      url,
      itemSchema: schema,
      receivedData: responseValidation.data.results as T[],
      validationError: resultValidation.error,
    });
  }

  return {
    success: true,
    data: resultValidation.data as T[],
    info: responseValidation.data.info as ApiResponseInfo,
    error: null,
  } satisfies GetSuccessResult<T>;
};

type FetchDataParams = {
  endpointUrl: string;
  queryParams?: Record<string, string>;
};

/**
 * Executes an Axios GET request and normalizes the result.
 *
 * Handles:
 * - HTTP errors (4xx, 5xx status codes)
 * - Network failures/timeouts
 * - Axios specific error shapes
 */
const fetchData = async (params: FetchDataParams): Promise<FetchResult> => {
  const { endpointUrl, queryParams } = params;
  const requestConfig: AxiosRequestConfig = {
    method: "get",
    url: endpointUrl,
    ...(queryParams ? { params: queryParams } : {}),
  };

  try {
    const response = await axiosClient.request(requestConfig);
    return { success: true, data: response.data, error: null };
  } catch (error) {
    const requestUrl = axiosClient.getUri(requestConfig);

    if (axios.isAxiosError(error)) {
      if (error.response) {
        const status = error.response.status;
        const errorMessage = `HTTP error! status: ${status}`;

        const responsePayload = error.response.data;
        const serializedPayload =
          typeof responsePayload === "string"
            ? responsePayload
            : (() => {
                try {
                  return JSON.stringify(responsePayload, null, 2);
                } catch {
                  return "Unable to serialize error response.";
                }
              })();

        logError({
          errorTitle: `Axios request failed at endpoint: ${requestUrl}`,
          errorContent: serializedPayload ?? errorMessage,
        });

        return {
          success: false,
          error: errorMessage,
          data: null,
        } satisfies FetchErrorResult;
      }

      const errorMessage = error.message ?? "Unknown error";
      logError({
        errorTitle: `Network error at endpoint: ${requestUrl}`,
        errorContent: errorMessage,
      });

      return {
        success: false,
        error: `Network error: ${errorMessage}`,
        data: null,
      } satisfies FetchErrorResult;
    }

    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    logError({
      errorTitle: `Unexpected error at endpoint: ${requestUrl}`,
      errorContent: errorMessage,
    });

    return {
      success: false,
      error: `Network error: ${errorMessage}`,
      data: null,
    } satisfies FetchErrorResult;
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
                .fieldErrors
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
    console.log("\x1b[31m%s\x1b[0m", "error:", error + "\n");
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

  return {
    success: false,
    error: errorMessage,
    data: receivedData as T[],
    info: null,
  };
};
