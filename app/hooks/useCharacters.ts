"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import axios from "axios";
import { apiResponseSchema, characterSchema, type Character } from "@schema";
import { filterObject, validateJson } from "@util";

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

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_ROOT_URL ?? "https://rickandmortyapi.com/api";
const DEFAULT_TIMEOUT_MS = 10000;
const DEFAULT_ERROR_MESSAGE = "Unable to load characters.";

const normalizeParams = (
  params: UseCharactersParams = {}
): NormalizedParams => ({
  page: params.page && params.page > 0 ? params.page : 1,
  name: params.name?.trim() || undefined,
  status: params.status?.trim() || undefined,
  species: params.species?.trim() || undefined,
});

const axiosClient = axios.create({
  baseURL: API_BASE_URL,
  headers: { Accept: "application/json" },
  timeout: DEFAULT_TIMEOUT_MS,
});

export const useCharacters = (
  params: UseCharactersParams = {}
): UseCharactersResult => {
  const [data, setData] = useState<Character[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Abort pending requests so the UI never shows stale responses.
  const abortControllerRef = useRef<AbortController | null>(null);
  const isMountedRef = useRef(true);
  const normalizedParams = useMemo(
    () => normalizeParams(params),
    [params.page, params.name, params.species, params.status]
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

      setData(characters);
      setError(null);
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

      if (isMountedRef.current) {
        setError(message);
        setData(null);
      }
    } finally {
      if (isMountedRef.current) {
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
