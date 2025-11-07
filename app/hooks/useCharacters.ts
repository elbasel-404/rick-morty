"use client";

import { axiosClient } from "@http";
import { apiResponseSchema, type Character, characterSchema } from "@schema";
import { filterObject, validateJson } from "@util";
import axios from "axios";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

interface UseCharactersParams {
  page?: number;
  name?: string;
  status?: string;
  species?: string;
}

interface UseCharactersResult {
  data: Character[] | null;
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

interface NormalizedParams {
  page: number;
  name?: string;
  status?: string;
  species?: string;
}

const DEFAULT_ERROR_MESSAGE = "Unable to load characters.";

const normalizeParams = (
  params: UseCharactersParams = {}
): NormalizedParams => ({
  page: params.page && params.page > 0 ? params.page : 1,
  name: params.name?.trim() || undefined,
  status: params.status?.trim() || undefined,
  species: params.species?.trim() || undefined,
});

export const useCharacters = (
  params: UseCharactersParams = {}
): UseCharactersResult => {
  const [data, setData] = useState<Character[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Abort pending requests so the UI never shows stale responses.
  const abortControllerRef = useRef<AbortController | null>(null);
  // Sequence number to avoid race conditions: only apply the latest response
  const seqRef = useRef(0);
  const isMountedRef = useRef(true);
  const normalizedParams = useMemo(
    () => normalizeParams(params),
    [params.page, params.name, params.species, params.status, params]
  );
  const latestParamsRef = useRef<NormalizedParams>(normalizedParams);

  useEffect(() => {
    latestParamsRef.current = normalizedParams;
  }, [normalizedParams]);

  useEffect(() => {
    return () => {
      isMountedRef.current = false;
      abortControllerRef.current?.abort();
    };
  }, []);

  const fetchCharacters = useCallback(async (nextParams?: NormalizedParams) => {
    const activeParams = nextParams ?? latestParamsRef.current;
    latestParamsRef.current = activeParams;

    // bump sequence
    const seq = seqRef.current + 1;
    seqRef.current = seq;

    abortControllerRef.current?.abort();
    const controller = new AbortController();
    abortControllerRef.current = controller;

    if (!isMountedRef.current) return;

    setIsLoading(true);
    setError(null);

    const queryParams = filterObject({
      page: activeParams.page.toString(),
      name: activeParams.name,
      status: activeParams.status,
      species: activeParams.species,
    });

    try {
      const response = await axiosClient.request({
        method: "get",
        url: "/character",
        params: queryParams,
        signal: controller.signal,
      });

      const responseValidation = validateJson(response.data, apiResponseSchema);

      if (!responseValidation.valid) {
        console.error("Character response schema mismatch", {
          params: activeParams,
          error: responseValidation.error,
        });
        if (isMountedRef.current) {
          setError("Received malformed character response. Please try again.");
          setData(null);
        }
        return;
      }

      const charactersValidation = validateJson(
        responseValidation.data.results,
        characterSchema
      );

      if (!charactersValidation.valid) {
        console.error("Character payload validation failed", {
          params: activeParams,
          error: charactersValidation.error,
        });
        if (isMountedRef.current) {
          setError("Character payload failed validation. Please try again.");
          setData(null);
        }
        return;
      }

      if (!isMountedRef.current) {
        return;
      }

      const characters = Array.isArray(charactersValidation.data)
        ? charactersValidation.data
        : [charactersValidation.data];

      // only apply if this is still the latest request
      if (seqRef.current === seq && isMountedRef.current) {
        setData(characters);
        setError(null);
      }
    } catch (requestError) {
      if (axios.isCancel(requestError)) {
        return;
      }

      const message = axios.isAxiosError(requestError)
        ? requestError.response
          ? `Request failed with status ${requestError.response.status}.`
          : requestError.message || DEFAULT_ERROR_MESSAGE
        : DEFAULT_ERROR_MESSAGE;

      console.error("Failed to fetch characters", {
        params: activeParams,
        error: requestError,
      });

      if (isMountedRef.current && seqRef.current === seq) {
        setError(message);
        setData(null);
      }
    } finally {
      if (isMountedRef.current && seqRef.current === seq) {
        setIsLoading(false);
      }
    }
  }, []);

  useEffect(() => {
    void fetchCharacters(normalizedParams);
  }, [fetchCharacters, normalizedParams]);

  const refetch = useCallback(async () => {
    await fetchCharacters();
  }, [fetchCharacters]);

  return {
    data,
    isLoading,
    error,
    refetch,
  };
};
