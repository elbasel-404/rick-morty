import { get } from "@http";
import { CHARACTER_ENDPOINT } from "@endpoint";

interface GetCharacterListParams {
  page?: string;
  name?: string;
  status?: string;
}

export const getCharactersList = async ({
  page,
  name,
  status,
}: GetCharacterListParams) => {
  const { data } = await get({
    endpoint: CHARACTER_ENDPOINT,
    queryParams: { page, name, status },
  });
  return data;
};
