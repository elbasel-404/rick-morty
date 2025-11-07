import { axiosClient } from "@http";
import { type Character, characterSchema } from "@schema";
import { handleAxiosError, logError, validateJson } from "@util";

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
  const requestConfig = {
    method: "get" as const,
    url: endpointUrl,
  };

  try {
    const { data } = await axiosClient.request(requestConfig);
    const validation = validateJson(data, characterSchema);

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
    const errorMessage = handleAxiosError({
      error,
      requestConfig,
      errorMessagePrefix: `Failed to fetch character with id ${id}`,
      fallbackMessage: FETCH_ERROR_MESSAGE,
    });

    return {
      character: null,
      error: errorMessage,
    } satisfies CharacterByIdResult;
  }
};
