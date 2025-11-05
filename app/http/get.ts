import type { Endpoint } from "@type";
import { buildFetchUrl, filterObject, logError, validateJson } from "@util";
import { apiResponseSchema } from "../schema/apiResponseSchema";

export interface GetDataReturn<T> {
  error: string | null;
  result: T | null;
}

export interface GetDataParams<T> {
  endpoint: Endpoint<T>;
  queryParams?: Record<string, string | undefined>;
}

export const get = async <T>({
  endpoint,
  queryParams,
}: GetDataParams<T>): Promise<GetDataReturn<T>> => {
  const { url, schema } = endpoint;
  const filteredQueryParams = filterObject(queryParams);
  const queryUrl = buildFetchUrl({
    endpointUrl: url,
    queryParams: filteredQueryParams,
  });

  const response = await fetch(queryUrl, {
    method: "GET",
  });

  if (!response.ok) {
    logError({
      errorContent: `HTTP error! status: ${response.status}`,
      errorTitle: `Fetch failed at endpoint: ${url}`,
    });
    return { result: null, error: `HTTP error! status: ${response.status}` };
  }

  const json = await response.json();
  const {
    valid: responseValid,
    error: responseError,
    data: responseData,
  } = validateJson(json, apiResponseSchema);

  const {
    valid: resultValid,
    error: resultError,
    data: resultData,
  } = validateJson(responseData, schema);

  if (!responseValid) {
    logError({
      errorTitle: `Data validation failed for endpoint: ${url}`,
      errorContent: JSON.stringify(responseError, null, 2),
    });
    console.debug(`Received data: ${JSON.stringify(json, null, 2)}`);
    return { result: null, error: JSON.stringify(responseError) };
  }

  if (!resultValid) {
    logError({
      errorTitle: `Result validation failed for endpoint: ${url}`,
      errorContent: JSON.stringify(resultError, null, 2),
    });
    console.debug(`Received data: ${JSON.stringify(json, null, 2)}`);
    return { result: null, error: JSON.stringify(resultError) };
  }

  return { result: resultData, error: null };
};
