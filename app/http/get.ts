import type { Endpoint } from "@type";
import { logError, validateJson } from "@util";

export interface GetDataReturn<T> {
  error: string;
  result: T | null;
}

export interface GetDataParams<T> {
  endpoint: Endpoint<T>;
}

export const get = async <T>({
  endpoint,
}: GetDataParams<T>): Promise<GetDataReturn<T>> => {
  const { url, schema } = endpoint;

  // let result: GetDataReturn<T> = {
  //   result: null,
  //   error: "",
  // };

  const response = await fetch(url, {
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
  const { valid, errors, data } = validateJson(json, schema);

  // return result;
};
