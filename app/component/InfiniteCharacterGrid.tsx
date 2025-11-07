"use client";

import {
  ComponentPropsWithoutRef,
  forwardRef,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import Link from "next/link";
import { VirtuosoGrid } from "react-virtuoso";
import type { Character } from "@schema";
import { fetchCharactersPage, type FetchCharactersResult } from "@server";
import { cn } from "@util";
import {
  CharacterCardIII,
  CharacterCardV,
  CyberCard,
  SimpleCard,
} from "./cards";

const CARD_VARIANTS = {
  "1": SimpleCard,
  "2": CyberCard,
  "3": CharacterCardIII,
  "4": CharacterCardV,
} as const;

export type CardVariant = keyof typeof CARD_VARIANTS;
export type SortOption =
  | "name-asc"
  | "name-desc"
  | "created-asc"
  | "created-desc";

interface GridFilters {
  name?: string;
  status?: string;
  sortOrder: SortOption;
}

const getCreatedTimestamp = (character: Character) => {
  const createdValue = (character as { created?: string }).created;

  if (typeof createdValue === "string") {
    const timestamp = Date.parse(createdValue);
    return Number.isNaN(timestamp) ? character.id : timestamp;
  }

  return character.id;
};

type FooterContext = {
  isLoading: boolean;
  hasMore: boolean;
  error: string | null;
};

const GridList = forwardRef<HTMLDivElement, ComponentPropsWithoutRef<"div">>(
  ({ className, style, ...props }, ref) => (
    <div
      {...props}
      ref={ref}
      className={cn("grid content-start gap-4 md:gap-6", className)}
      style={{
        ...style,
        gridTemplateColumns: "repeat(auto-fit, minmax(18rem, 1fr))",
      }}
    />
  )
);

GridList.displayName = "GridList";

const GridItem = forwardRef<HTMLDivElement, ComponentPropsWithoutRef<"div">>(
  ({ className, style, ...props }, ref) => (
    <div
      {...props}
      ref={ref}
      className={cn("flex h-full", className)}
      style={style}
    />
  )
);

GridItem.displayName = "GridItem";

function LoadingFooter({ context }: { context?: FooterContext }) {
  if (!context) return null;

  if (context.error) {
    return (
      <div className="col-span-full py-6 text-center text-sm text-red-400">
        {context.error}
      </div>
    );
  }

  if (context.isLoading) {
    return (
      <div className="col-span-full py-6 text-center text-sm text-zinc-200">
        Loading more characters...
      </div>
    );
  }

  if (!context.hasMore) {
    return (
      <div className="col-span-full py-6 text-center text-sm text-zinc-400">
        You&apos;ve reached the end of the list.
      </div>
    );
  }

  return null;
}

const GRID_COMPONENTS = {
  List: GridList,
  Item: GridItem,
  Footer: LoadingFooter,
} as const;

interface InfiniteCharacterGridProps {
  initialCharacters: Character[];
  initialNextPage: number | null;
  cardVariant: CardVariant;
  filters: GridFilters;
}

export const InfiniteCharacterGrid = ({
  initialCharacters,
  initialNextPage,
  cardVariant,
  filters,
}: InfiniteCharacterGridProps) => {
  const [characters, setCharacters] = useState<Character[]>(initialCharacters);
  const [nextPage, setNextPage] = useState<number | null>(initialNextPage);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const scrollbarFadeTimeoutRef = useRef<number | null>(null);

  const SelectedCard = CARD_VARIANTS[cardVariant];
  const hasMore = nextPage !== null;

  const sortCharacters = useCallback(
    (items: Character[]) => {
      const sorted = [...items];

      switch (filters.sortOrder) {
        case "name-desc":
          return sorted.sort((a, b) => b.name.localeCompare(a.name));
        case "created-asc":
          return sorted.sort(
            (a, b) => getCreatedTimestamp(a) - getCreatedTimestamp(b)
          );
        case "created-desc":
          return sorted.sort(
            (a, b) => getCreatedTimestamp(b) - getCreatedTimestamp(a)
          );
        case "name-asc":
        default:
          return sorted.sort((a, b) => a.name.localeCompare(b.name));
      }
    },
    [filters.sortOrder]
  );

  const loadMore = useCallback(async () => {
    if (!nextPage || isLoading) return;

    setIsLoading(true);
    setError(null);

    try {
      const payload: FetchCharactersResult = await fetchCharactersPage({
        page: nextPage,
        name: filters.name,
        status: filters.status,
      });

      if (payload.error) {
        setError(payload.error);
        setNextPage(payload.nextPage);
        return;
      }

      setCharacters((previous) => {
        const existingIds = new Set(previous.map((character) => character.id));
        const uniqueNewCharacters = payload.characters.filter((character) => {
          return !existingIds.has(character.id);
        });

        return sortCharacters([...previous, ...uniqueNewCharacters]);
      });

      setNextPage(payload.nextPage);
    } catch (requestError) {
      const message =
        requestError instanceof Error
          ? requestError.message
          : "Unknown error while fetching more characters.";
      setError(message);
    } finally {
      setIsLoading(false);
    }
  }, [filters.name, filters.status, isLoading, nextPage, sortCharacters]);

  const handleEndReached = useCallback(() => {
    if (!hasMore || isLoading) return;
    void loadMore();
  }, [hasMore, isLoading, loadMore]);

  useEffect(() => {
    setCharacters(sortCharacters(initialCharacters));
    setNextPage(initialNextPage);
  }, [initialCharacters, initialNextPage, sortCharacters]);

  useEffect(() => {
    setCharacters((previous) => sortCharacters(previous));
  }, [sortCharacters]);

  useEffect(() => {
    const root = document.documentElement;

    if (isLoading) {
      if (scrollbarFadeTimeoutRef.current !== null) {
        window.clearTimeout(scrollbarFadeTimeoutRef.current);
        scrollbarFadeTimeoutRef.current = null;
      }

      root.classList.add("scrollbar-hidden");
      root.classList.remove("scrollbar-fade-in");
      return;
    }

    if (root.classList.contains("scrollbar-hidden")) {
      root.classList.remove("scrollbar-hidden");
      root.classList.add("scrollbar-fade-in");

      scrollbarFadeTimeoutRef.current = window.setTimeout(() => {
        root.classList.remove("scrollbar-fade-in");
        scrollbarFadeTimeoutRef.current = null;
      }, 300);
    }
  }, [isLoading]);

  useEffect(() => {
    return () => {
      const root = document.documentElement;

      if (scrollbarFadeTimeoutRef.current !== null) {
        window.clearTimeout(scrollbarFadeTimeoutRef.current);
      }

      root.classList.remove("scrollbar-hidden");
      root.classList.remove("scrollbar-fade-in");
    };
  }, []);

  return (
    <VirtuosoGrid
      useWindowScroll
      totalCount={characters.length}
      endReached={handleEndReached}
      increaseViewportBy={200}
      context={{ isLoading, hasMore, error }}
      components={GRID_COMPONENTS}
      computeItemKey={(index) => {
        const character = characters[index];
        return character ? `character-${character.id}` : `character-${index}`;
      }}
      itemContent={(index) => {
        const character = characters[index];

        if (!character) return null;

        return (
          <Link
            href={`/characters/${character.id}`}
            scroll={false}
            className="group flex w-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/60"
            data-character-id={character.id}
            aria-label={`View details for ${character.name}`}
          >
            <SelectedCard character={character} />
          </Link>
        );
      }}
    />
  );
};
