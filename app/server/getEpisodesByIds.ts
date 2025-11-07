import { axiosClient } from "@http";
import { type Episode, episodeSchema } from "@schema";
import { handleAxiosError, logError, validateJson } from "@util";

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
    const schemaToUse =
      sanitizedIds.length > 1 ? z.array(episodeSchema) : episodeSchema;
    const validation = validateJson(data, schemaToUse);

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

    const episodes = Array.isArray(validation.data)
      ? validation.data
      : [validation.data];

    return {
      episodes,
      error: null,
    } satisfies EpisodesByIdsResult;
  } catch (error) {
    const errorMessage = handleAxiosError({
      error,
      requestConfig,
      errorMessagePrefix: `Failed to fetch episodes with ids ${sanitizedIds.join(",")}`,
      fallbackMessage: FETCH_ERROR_MESSAGE,
    });

    return {
      episodes: [],
      error: errorMessage,
    } satisfies EpisodesByIdsResult;
  }
};
