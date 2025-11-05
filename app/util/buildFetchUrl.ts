import { getApiRootUrl } from "./getApiRootUrl";

interface BuildFetchUrlParams {
  endpointUrl: string;
  params: Record<string, string | number | undefined>;
}
export const buildFetchUrl = ({ endpointUrl, params }: BuildFetchUrlParams) => {
  const baseUrl = getApiRootUrl();

  //* Clean leading slash to prevent double slashes in the final URL
  //* in case the endpoint url starts with "/"
  const cleanEndpointUrl = endpointUrl.startsWith("/")
    ? endpointUrl.replace("/", "")
    : endpointUrl;

  const stringParams = Object.fromEntries(
    Object.entries(params)
      .map(([key, value]) => [key, String(value)])
      .filter(([_, value]) => value !== "undefined")
  );
  const queryString = new URLSearchParams(stringParams).toString();
  return `${baseUrl}/${cleanEndpointUrl}?${queryString}`;
};
