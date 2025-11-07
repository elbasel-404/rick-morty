"use client";

import {
  ChangeEvent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import type { Character } from "@schema";
import { fetchCharactersPage } from "@server";
import { useDebounceValue } from "../hooks/useDebounceValue";
import {
  InfiniteCharacterGrid,
  type CardVariant,
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

interface CustomDropdownProps {
  value: string;
  onChange: (value: string) => void;
  options: { label: string; value: string }[];
  disabled?: boolean;
  label: string;
}

const CustomDropdown = ({
  value,
  onChange,
  options,
  disabled = false,
  label,
}: CustomDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedOption = options.find((opt) => opt.value === value);

  return (
    <div className="relative" ref={dropdownRef}>
      <label className="flex items-center gap-2 text-base text-slate-300">
        <span className="font-medium">{label}</span>
        <button
          type="button"
          onClick={() => !disabled && setIsOpen(!isOpen)}
          disabled={disabled}
          className="min-w-40 rounded-lg border-2 border-slate-700 bg-transparent px-4 py-2.5 text-base text-slate-100 text-left focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/40 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-between"
        >
          <span>{selectedOption?.label}</span>
          <svg
            className={`w-4 h-4 transition-transform ${
              isOpen ? "rotate-180" : ""
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>
      </label>

      {isOpen && (
        <div className="absolute z-50 mt-1 w-full rounded-lg border-2 border-slate-700 bg-slate-950 shadow-lg">
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => {
                onChange(option.value);
                setIsOpen(false);
              }}
              className={`w-full px-4 py-2.5 text-left text-base hover:bg-slate-800 first:rounded-t-md last:rounded-b-md ${
                option.value === value
                  ? "bg-blue-500/20 text-blue-300"
                  : "text-slate-100"
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

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
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const requestIdRef = useRef(0);
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

  useEffect(() => {
    if (isFirstLoadRef.current) {
      isFirstLoadRef.current = false;
      return;
    }

    const fetchInitialPage = async () => {
      const requestId = requestIdRef.current + 1;
      requestIdRef.current = requestId;

      setIsFetching(true);
      setError(null);

      try {
        const result = await fetchCharactersPage({
          page: 1,
          name:
            filters.name.trim().length > 0 ? filters.name.trim() : undefined,
          status: filters.status === "all" ? undefined : filters.status,
        });

        if (requestIdRef.current !== requestId) {
          return;
        }

        if (result.error) {
          setError(result.error);
          setGridState({ characters: [], nextPage: null });
          return;
        }

        setGridState({
          characters: result.characters,
          nextPage: result.nextPage,
        });
      } catch (requestError) {
        if (requestIdRef.current !== requestId) {
          return;
        }

        const message =
          requestError instanceof Error
            ? requestError.message
            : "Unknown error while fetching characters.";
        setError(message);
        setGridState({ characters: [], nextPage: null });
      } finally {
        if (requestIdRef.current === requestId) {
          setIsFetching(false);
        }
      }
    };

    void fetchInitialPage();
  }, [filters.name, filters.status]);

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
          {isFetching
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
