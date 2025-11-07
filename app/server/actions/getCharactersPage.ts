"use server";

import { getCharactersList } from "../getCharactersList";
import { extractNextPage } from "@util";
import { type Character } from "@schema";

interface FetchCharactersPageParams {
  page: number;
  name?: string;
  status?: string;
}

export interface FetchCharactersResult {
  characters: Character[];
  hasMore: boolean;
  nextPage: number | null;
  error: string | null;
}

export const fetchCharactersPage = async ({
  page,
  name,
  status,
}: FetchCharactersPageParams): Promise<FetchCharactersResult> => {
  const result = await getCharactersList({
    page: page.toString(),
    name,
    status,
  });

  if (!result.characters) {
    return {
      characters: [],
      hasMore: false,
      nextPage: null,
      error: result.error ?? "Unable to load more characters.",
    } satisfies FetchCharactersResult;
  }

  const nextPage = extractNextPage(result.info?.next ?? null);

  return {
    characters: result.characters,
    hasMore: Boolean(result.info?.next),
    nextPage,
    error: null,
  } satisfies FetchCharactersResult;
};
