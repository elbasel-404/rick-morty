import axios from "axios";
import { axiosClient } from "@http";
import { characterSchema, type Character } from "@schema";
import { logError, validateJson } from "@util";

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
    const requestUrl = axiosClient.getUri(requestConfig);

    if (axios.isAxiosError(error)) {
      if (error.response) {
        const status = error.response.status;
        const errorMessage = `Character request failed with status ${status}.`;
        const responsePayload = error.response.data;
        const serializedPayload =
          typeof responsePayload === "string"
            ? responsePayload
            : (() => {
                try {
                  return JSON.stringify(responsePayload, null, 2);
                } catch {
                  return "Unable to serialize error response.";
                }
              })();

        logError({
          errorTitle: `Failed to fetch character with id ${id}`,
          errorContent: serializedPayload ?? errorMessage,
        });

        return {
          character: null,
          error: FETCH_ERROR_MESSAGE,
        } satisfies CharacterByIdResult;
      }

      const errorMessage = error.message ?? "Unknown error occurred.";
      logError({
        errorTitle: `Network error while fetching character ${id}`,
        errorContent: errorMessage,
      });

      return {
        character: null,
        error: FETCH_ERROR_MESSAGE,
      } satisfies CharacterByIdResult;
    }

    const errorMessage =
      error instanceof Error ? error.message : "Unknown error occurred.";

    logError({
      errorTitle: `Unexpected error while fetching character ${id}`,
      errorContent: `${errorMessage} (request: ${requestUrl})`,
    });

    return {
      character: null,
      error: FETCH_ERROR_MESSAGE,
    } satisfies CharacterByIdResult;
  }
};
