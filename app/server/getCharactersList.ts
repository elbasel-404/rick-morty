import { get } from "@http";
import { CHARACTER_ENDPOINT } from "@endpoint";

interface GetCharacterListParams {
  page?: string;
  name?: string;
  status?: string;
}

/**
 * Fetches a list of characters from the Rick and Morty API with optional filters.
 *
 * @param params - Optional query parameters for filtering and pagination
 * @param params.page - The page number to fetch (default: 1)
 * @param params.name - Filter results by character name
 * @param params.status - Filter results by character status
 * @returns The API response data containing characters and pagination info
 */
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
