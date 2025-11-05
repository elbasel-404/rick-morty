import type { Endpoint } from "@type";
import { buildFetchUrl, filterObject, logError, validateJson } from "@util";
import { apiResponseSchema } from "@schema";
import { flattenError, formatError, ZodError, ZodType } from "zod";

// * Discriminated union for better type safety
type GetDataResult<T> =
  | { success: true; data: T; error: null }
  | { success: false; data: unknown | null; error: string };

interface GetDataParams<T> {
  endpoint: Endpoint<T>;
  queryParams?: Record<string, string | undefined>;
}

/**
 * Performs an HTTP GET request with validation.
 *
 * @template T - The expected type of the result data
 * @param params - The request parameters including endpoint and optional query params
 * @returns A promise resolving to either success with data or failure with error message
 *
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
    return { ...fetchResult, data: fetchResult.data };
  }

  // Validate the API response structure
  const responseValidation = validateJson(fetchResult.data, apiResponseSchema);
  if (!responseValidation.valid) {
    return handleValidationError({
      errorTitle: "Data validation failed",
      url,
      itemSchema: null,
      receivedData: null,
      validationError: responseValidation.error,
    });
  }

  // Validate the result data against the endpoint schema
  const resultValidation = validateJson(
    responseValidation.data.results,
    schema
  );
  if (!resultValidation.valid) {
    return handleValidationError({
      url,
      errorTitle: "Result validation failed",
      itemSchema: schema,
      receivedData: responseValidation.data.results as T[],
      validationError: resultValidation.error,
    });
  }

  return { success: true, data: resultValidation.data, error: null };
};

/**
 * Builds the complete query URL with filtered query parameters.
 */
const buildQueryUrl = (
  url: string,
  queryParams?: Record<string, string | undefined>
): string => {
  const filteredQueryParams = filterObject(queryParams);
  return buildFetchUrl({
    endpointUrl: url,
    queryParams: filteredQueryParams,
  });
};

/**
 * Fetches data from the specified URL.
 */
const fetchData = async (
  queryUrl: string,
  endpointUrl: string
): Promise<GetDataResult<unknown>> => {
  try {
    const response = await fetch(queryUrl, {
      method: "GET",
    });

    if (!response.ok) {
      const errorMessage = `HTTP error! status: ${response.status}`;
      logError({
        errorTitle: `Fetch failed at endpoint: ${endpointUrl}`,
        errorContent: errorMessage,
      });
      return {
        success: false,
        error: errorMessage,
        data: await response.text(),
      };
    }

    const json = await response.json();
    return { success: true, data: json, error: null };
  } catch (error) {
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
 * Handles validation errors with consistent logging and formatting.
 */
interface HandleValidationErrorParams<T> {
  url: string;
  errorTitle: string;
  validationError: Record<string, string[]>;
  receivedData: T[] | null;
  itemSchema: ZodType<T> | null;
}

const handleValidationError = <T>({
  url,
  errorTitle,
  validationError,
  receivedData,
  itemSchema,
}: HandleValidationErrorParams<T>): GetDataResult<T> => {
  const errorMessage = JSON.stringify(validationError, null, 2);
  console.log(typeof receivedData);
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

  logError({
    errorTitle: `${errorTitle} for endpoint: ${url}`,
    errorContent: errorMessage,
  });
  invalidData.forEach((d) => {
    const { error, ...rest } = d;
    console.log("\x1b[31m%s\x1b[0m", "error:", error + "\n");
    const key =
      typeof error === "string" ? error.split(":")[0].trim() : String(error);
    console.log(`\`${key}\`: `, rest[key as keyof typeof rest]);
    console.log(JSON.stringify(rest, null, 2));
    console.log("\n--------\n");
  });

  console.log(`${url} fetched and validated`);
  console.log(`Found ${invalidData.length} invalid items:`);

  return { success: false, error: errorMessage, data: receivedData };
};
