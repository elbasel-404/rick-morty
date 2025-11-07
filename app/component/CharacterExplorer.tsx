"use client";

import type { Character } from "@schema";
import { fetchCharactersPage } from "@server";
import {
  type ChangeEvent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useAsyncOperation } from "../hooks/useAsyncOperation";
import { tryCatch } from "@util";
import { useAutoRefresh } from "../hooks/useAutoRefresh";
import { useDebounceValue } from "../hooks/useDebounceValue";
import {
  type CardVariant,
  InfiniteCharacterGrid,
  type SortOption,
} from "./InfiniteCharacterGrid";

type StatusFilter = "all" | "alive" | "dead" | "unknown";

type GridState = {
  characters: Character[];
  nextPage: number | null;
};

interface CharacterExplorerProps {
  initialCharacters: Character[];
  initialNextPage: number | null;
  cardVariant: CardVariant;
}

const STATUS_OPTIONS: { label: string; value: StatusFilter }[] = [
  { label: "All statuses", value: "all" },
  { label: "Alive", value: "alive" },
  { label: "Dead", value: "dead" },
  { label: "Unknown", value: "unknown" },
];

const SORT_OPTIONS: { label: string; value: SortOption }[] = [
  { label: "Name (A → Z)", value: "name-asc" },
  { label: "Name (Z → A)", value: "name-desc" },
];

const SEARCH_DEBOUNCE_MS = 400;
const REFRESH_INTERVAL_MS = 30_000;

export const CharacterExplorer = ({
  initialCharacters,
  initialNextPage,
  cardVariant,
}: CharacterExplorerProps) => {
  const [filters, setFilters] = useState<{
    name: string;
    status: StatusFilter;
    sortOrder: SortOption;
  }>({
    name: "",
    status: "all",
    sortOrder: "name-asc",
  });
  const [searchInput, setSearchInput] = useState(() => "");
  const [debouncedSearch] = useDebounceValue(searchInput, SEARCH_DEBOUNCE_MS);
  const [gridState, setGridState] = useState<GridState>({
    characters: initialCharacters,
    nextPage: initialNextPage,
  });
  const [error, setError] = useState<string | null>(null);
  const isFirstLoadRef = useRef(true);

  useEffect(() => {
    setGridState({
      characters: initialCharacters,
      nextPage: initialNextPage,
    });
  }, [initialCharacters, initialNextPage]);

  const handleNameChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const nextName = event.target.value;

      setSearchInput((previous) =>
        previous === nextName ? previous : nextName
      );
    },
    []
  );

  const handleStatusChange = useCallback((nextStatus: string) => {
    setFilters((previous) => {
      if (previous.status === nextStatus) {
        return previous;
      }

      return {
        ...previous,
        status: nextStatus as StatusFilter,
      };
    });
  }, []);

  const handleSortChange = useCallback((nextSort: string) => {
    setFilters((previous) => {
      if (previous.sortOrder === nextSort) {
        return previous;
      }

      return {
        ...previous,
        sortOrder: nextSort as SortOption,
      };
    });
  }, []);

  useEffect(() => {
    setFilters((previous) => {
      if (previous.name === debouncedSearch) {
        return previous;
      }

      return {
        ...previous,
        name: debouncedSearch,
      };
    });
  }, [debouncedSearch]);

  const { execute, isLoading: isFetching } = useAsyncOperation<{
    characters: Character[];
    nextPage: number | null;
  }>({
    onError: (err) => console.error("Failed to fetch characters:", err),
  });

  const fetchInitialPage = useCallback(async () => {
    setError(null);

    const result = await execute(async () =>
      tryCatch(async () => {
        const payload = await fetchCharactersPage({
          page: 1,
          name:
            filters.name.trim().length > 0 ? filters.name.trim() : undefined,
          status: filters.status === "all" ? undefined : filters.status,
        });

        if (payload.error) {
          throw new Error(payload.error);
        }

        return {
          characters: payload.characters,
          nextPage: payload.nextPage,
        };
      }, "Failed to fetch characters")
    );

    if (result.success) {
      setGridState({
        characters: result.data.characters,
        nextPage: result.data.nextPage,
      });
    } else {
      setError(result.error);
      setGridState({ characters: [], nextPage: null });
    }
  }, [execute, filters.name, filters.status]);

  useEffect(() => {
    if (isFirstLoadRef.current) {
      isFirstLoadRef.current = false;
      return;
    }

    void fetchInitialPage();
  }, [fetchInitialPage]);

  const {
    timeLeftMs,
    isPaused: isAutoRefreshPaused,
    isRefreshing,
    togglePause: toggleAutoRefresh,
    refresh: handleManualRefresh,
  } = useAutoRefresh({
    intervalMs: REFRESH_INTERVAL_MS,
    onRefresh: fetchInitialPage,
    enabled: true,
  });

  const formattedSecondsLeft = useMemo(() => {
    const totalSeconds = Math.max(0, Math.ceil(timeLeftMs / 1000));
    return totalSeconds.toString().padStart(2, "0");
  }, [timeLeftMs]);

  const gridFilters = useMemo(
    () => ({
      name: filters.name.trim().length > 0 ? filters.name.trim() : undefined,
      status: filters.status === "all" ? undefined : filters.status,
      sortOrder: filters.sortOrder,
    }),
    [filters]
  );

  return (
    <section className="space-y-6">
      <Timer
        formattedSecondsLeft={formattedSecondsLeft}
        isAutoRefreshPaused={isAutoRefreshPaused}
        toggleAutoRefresh={toggleAutoRefresh}
        handleManualRefresh={handleManualRefresh}
        isFetching={isFetching}
      />

      <nav className="relative z-20 rounded-xl border-2 border-slate-700 bg-transparent p-5 backdrop-blur">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex w-full flex-col gap-3 md:max-w-md md:flex-row">
            <label className="flex flex-1 items-center gap-2 text-base text-slate-300">
              <span className="hidden font-medium md:inline">Search</span>
              <input
                type="search"
                value={searchInput}
                onChange={handleNameChange}
                placeholder="Search characters..."
                className="w-full rounded-lg border-2 border-slate-700 bg-transparent px-4 py-2.5 text-base text-slate-100 placeholder:text-slate-500 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/40"
              />
            </label>
          </div>

          <div className="flex flex-col gap-3 md:flex-row md:items-center">
            <CustomDropdown
              value={filters.status}
              onChange={handleStatusChange}
              options={STATUS_OPTIONS}
              disabled={isFetching}
              label="Filter"
            />

            <CustomDropdown
              value={filters.sortOrder}
              onChange={handleSortChange}
              options={SORT_OPTIONS}
              label="Sort"
            />
          </div>
        </div>
      </nav>

      {error ? (
        <div className="rounded-lg border-2 border-red-500 bg-transparent p-5 text-base text-red-300">
          {error}
        </div>
      ) : null}

      {gridState.characters.length === 0 && !error ? (
        <div className="rounded-lg border-2 border-slate-700 bg-transparent p-6 text-center text-base text-slate-300">
          {isFetching || isRefreshing
            ? "Loading characters..."
            : "No characters match your filters."}
        </div>
      ) : null}

      <InfiniteCharacterGrid
        initialCharacters={gridState.characters}
        initialNextPage={gridState.nextPage}
        cardVariant={cardVariant}
        filters={gridFilters}
      />
    </section>
  );
};

import { CustomDropdown, Timer } from "@component";
