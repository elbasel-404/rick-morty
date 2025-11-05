import { buildFetchUrl } from "../util/buildFetchUrl";

const URL = "/character";

interface GetCharacterListParams {
  page?: number;
  name?: string;
  status?: string;
}

export const getCharactersList = async ({
  page,
  name,
  status,
}: GetCharacterListParams) => {
  const fetchUrl = buildFetchUrl({
    endpointUrl: URL,
    params: {
      page,
      name,
      status,
    },
  });
  const response = await fetch(fetchUrl);
  console.log({ response });
  const data = await response.json();
  console.log({ data });
  return data;
};
