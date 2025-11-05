import { filterObject } from "./filterObject";
import { getApiRootUrl } from "./getApiRootUrl";

interface BuildFetchUrlParams {
  endpointUrl: string;
  queryParams?: Record<string, string | undefined>;
}
export const buildFetchUrl = ({
  endpointUrl,
  queryParams,
}: BuildFetchUrlParams) => {
  const baseUrl = getApiRootUrl();

  //* Clean leading slash to prevent double slashes in the final URL
  //* in case the endpoint url starts with "/"
  const cleanEndpointUrl = endpointUrl.startsWith("/")
    ? endpointUrl.replace("/", "")
    : endpointUrl;

  if (!queryParams) return `${baseUrl}/${cleanEndpointUrl}`;

  const filteredParams = filterObject(queryParams);
  const queryString = new URLSearchParams(filteredParams);

  const fullUrl = `${baseUrl}/${cleanEndpointUrl}?${queryString}`;
  return fullUrl;
};
