import { episodeSchema, type Episode } from "@schema";
import { buildFetchUrl, logError, validateJson } from "@util";

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
  const requestUrl = buildFetchUrl({ endpointUrl });

  try {
    const response = await fetch(requestUrl, {
      method: "GET",
      next: { revalidate: 300 },
    });

    if (!response.ok) {
      const errorMessage = `Episode request failed with status ${response.status}.`;
      logError({
        errorTitle: `Failed to fetch episodes with ids ${sanitizedIds.join(
          ","
        )}`,
        errorContent: errorMessage,
      });

      return {
        episodes: [],
        error: FETCH_ERROR_MESSAGE,
      } satisfies EpisodesByIdsResult;
    }

    const json = await response.json();
    const validation = validateJson(json, episodeSchema);

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
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error occurred.";

    logError({
      errorTitle: `Unexpected error while fetching episodes ${sanitizedIds.join(
        ","
      )}`,
      errorContent: errorMessage,
    });

    return {
      episodes: [],
      error: FETCH_ERROR_MESSAGE,
    } satisfies EpisodesByIdsResult;
  }
};
