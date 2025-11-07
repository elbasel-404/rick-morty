import { characterSchema, type Character } from "@schema";
import { buildFetchUrl, logError, validateJson } from "@util";

interface GetCharacterByIdParams {
  id: string;
}

export interface CharacterByIdResult {
  character: Character | null;
  error: string | null;
}

const FETCH_ERROR_MESSAGE = "Unable to fetch character details.";

export const getCharacterById = async ({
  id,
}: GetCharacterByIdParams): Promise<CharacterByIdResult> => {
  const endpointUrl = `/character/${id}`;
  const requestUrl = buildFetchUrl({ endpointUrl });

  try {
    const response = await fetch(requestUrl, {
      method: "GET",
      next: { revalidate: 120 },
    });

    if (!response.ok) {
      const errorMessage = `Character request failed with status ${response.status}.`;
      logError({
        errorTitle: `Failed to fetch character with id ${id}`,
        errorContent: errorMessage,
      });

      return {
        character: null,
        error: FETCH_ERROR_MESSAGE,
      } satisfies CharacterByIdResult;
    }

    const json = await response.json();
    const validation = validateJson(json, characterSchema);

    if (!validation.valid) {
      logError({
        errorTitle: `Invalid character payload for id ${id}`,
        errorContent: JSON.stringify(validation.error, null, 2),
      });

      return {
        character: null,
        error: FETCH_ERROR_MESSAGE,
      } satisfies CharacterByIdResult;
    }

    return {
      character: validation.data,
      error: null,
    } satisfies CharacterByIdResult;
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error occurred.";

    logError({
      errorTitle: `Unexpected error while fetching character ${id}`,
      errorContent: errorMessage,
    });

    return {
      character: null,
      error: FETCH_ERROR_MESSAGE,
    } satisfies CharacterByIdResult;
  }
};
