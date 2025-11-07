import axios from "axios";
import { axiosClient } from "@http";
import { episodeSchema, type Episode } from "@schema";
import { logError, validateJson } from "@util";

interface GetEpisodesByIdsParams {
  ids: string[];
}

export interface EpisodesByIdsResult {
  episodes: Episode[];
  error: string | null;
}

const FETCH_ERROR_MESSAGE = "Unable to fetch episode details.";

export const getEpisodesByIds = async ({
  ids,
}: GetEpisodesByIdsParams): Promise<EpisodesByIdsResult> => {
  if (ids.length === 0) {
    return {
      episodes: [],
      error: null,
    } satisfies EpisodesByIdsResult;
  }

  const sanitizedIds = ids.filter((id) => id.trim().length > 0);
  if (sanitizedIds.length === 0) {
    return {
      episodes: [],
      error: null,
    } satisfies EpisodesByIdsResult;
  }

  const endpointUrl = `/episode/${sanitizedIds.join(",")}`;
  const requestConfig = {
    method: "get" as const,
    url: endpointUrl,
  };

  try {
    const { data } = await axiosClient.request(requestConfig);
    const validation = validateJson(data, episodeSchema);

    if (!validation.valid) {
      logError({
        errorTitle: `Invalid episode payload for ids ${sanitizedIds.join(",")}`,
        errorContent: JSON.stringify(validation.error, null, 2),
      });

      return {
        episodes: [],
        error: FETCH_ERROR_MESSAGE,
      } satisfies EpisodesByIdsResult;
    }

    const rawEpisodes = validation.data as Episode | Episode[];
    const episodes = Array.isArray(rawEpisodes) ? rawEpisodes : [rawEpisodes];

    return {
      episodes,
      error: null,
    } satisfies EpisodesByIdsResult;
  } catch (error) {
    const requestUrl = axiosClient.getUri(requestConfig);

    if (axios.isAxiosError(error)) {
      if (error.response) {
        const status = error.response.status;
        const errorMessage = `Episode request failed with status ${status}.`;
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
          errorTitle: `Failed to fetch episodes with ids ${sanitizedIds.join(
            ","
          )}`,
          errorContent: serializedPayload ?? errorMessage,
        });

        return {
          episodes: [],
          error: FETCH_ERROR_MESSAGE,
        } satisfies EpisodesByIdsResult;
      }

      const errorMessage = error.message ?? "Unknown error occurred.";
      logError({
        errorTitle: `Network error while fetching episodes ${sanitizedIds.join(
          ","
        )}`,
        errorContent: errorMessage,
      });

      return {
        episodes: [],
        error: FETCH_ERROR_MESSAGE,
      } satisfies EpisodesByIdsResult;
    }

    const errorMessage =
      error instanceof Error ? error.message : "Unknown error occurred.";

    logError({
      errorTitle: `Unexpected error while fetching episodes ${sanitizedIds.join(
        ","
      )}`,
      errorContent: `${errorMessage} (request: ${requestUrl})`,
    });

    return {
      episodes: [],
      error: FETCH_ERROR_MESSAGE,
    } satisfies EpisodesByIdsResult;
  }
};
