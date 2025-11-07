import { CHARACTER_ENDPOINT } from "@endpoint";
import { get } from "@http";
import type { apiResponseSchema, Character } from "@schema";
import type { z } from "zod";

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
type ApiInfo = z.infer<typeof apiResponseSchema>["info"];

export interface CharacterListResult {
  characters: Character[] | null;
  info: ApiInfo | null;
  error: string | null;
}

export const getCharactersList = async ({
  page,
  name,
  status,
}: GetCharacterListParams): Promise<CharacterListResult> => {
  const result = await get<Character>({
    endpoint: CHARACTER_ENDPOINT,
    queryParams: { page, name, status },
  });

  if (!result.success) {
    return {
      characters: result.data,
      info: null,
      error: result.error,
    };
  }

  return {
    characters: result.data,
    info: result.info,
    error: null,
  };
};
