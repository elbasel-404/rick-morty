import { filterObject } from "./filterObject";
import { getApiRootUrl } from "./getApiRootUrl";

interface BuildFetchUrlParams {
  endpointUrl: string; // The API endpoint path
  queryParams?: Record<string, string | undefined>; // Optional query parameters
}

/**
 * Builds a complete URL for API requests by combining base URL, endpoint, and query parameters.
 *
 * This utility:
 * - Retrieves the API root URL from configuration
 * - Normalizes the endpoint path (removes leading slashes)
 * - Filters out undefined query parameters
 * - Constructs a properly formatted URL with query string
 *
 * @param params - URL building parameters
 * @param params.endpointUrl - The endpoint path (e.g., "/character" or "character")
 * @param params.queryParams - Optional query parameters (undefined values are filtered out)
 * @returns The complete URL ready for fetch requests
 *
 */
export const buildFetchUrl = ({
  endpointUrl,
  queryParams,
}: BuildFetchUrlParams) => {
  const baseUrl = getApiRootUrl();

  // Clean leading slash to prevent double slashes in the final URL
  // in case the endpoint url starts with "/"
  const cleanEndpointUrl = endpointUrl.startsWith("/")
    ? endpointUrl.replace("/", "")
    : endpointUrl;

  // Return simple URL if no query parameters
  if (!queryParams) return `${baseUrl}/${cleanEndpointUrl}`;

  // Filter out undefined parameters and build query string
  const filteredParams = filterObject(queryParams);
  const queryString = new URLSearchParams(filteredParams);

  const fullUrl = `${baseUrl}/${cleanEndpointUrl}?${queryString}`;
  return fullUrl;
};
