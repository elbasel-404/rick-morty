"use client";

import { useCallback, useState } from "react";
import { Virtuoso } from "react-virtuoso";
import type { Character } from "@schema";
import { fetchCharactersPage, type FetchCharactersResult } from "@server";
import {
  CharacterCardIII,
  CharacterCardIV,
  CharacterCardV,
  CyberCard,
  SimpleCard,
} from "./cards";

const CARD_VARIANTS = {
  "1": SimpleCard,
  "2": CyberCard,
  "3": CharacterCardIII,
  "4": CharacterCardIV,
  "5": CharacterCardV,
} as const;

const ROW_SIZE = 3;

export type CardVariant = keyof typeof CARD_VARIANTS;

type FooterContext = {
  isLoading: boolean;
  hasMore: boolean;
  error: string | null;
};

interface InfiniteCharacterGridProps {
  initialCharacters: Character[];
  initialNextPage: number | null;
  cardVariant: CardVariant;
}

export const InfiniteCharacterGrid = ({
  initialCharacters,
  initialNextPage,
  cardVariant,
}: InfiniteCharacterGridProps) => {
  const [characters, setCharacters] = useState<Character[]>(initialCharacters);
  const [nextPage, setNextPage] = useState<number | null>(initialNextPage);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const SelectedCard = CARD_VARIANTS[cardVariant];
  const hasMore = nextPage !== null;
  const rowCount = Math.ceil(characters.length / ROW_SIZE);

  const loadMore = useCallback(async () => {
    if (!nextPage || isLoading) return;

    setIsLoading(true);
    setError(null);

    try {
      const payload: FetchCharactersResult = await fetchCharactersPage({
        page: nextPage,
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

        return [...previous, ...uniqueNewCharacters];
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
  }, [isLoading, nextPage]);

  const handleEndReached = useCallback(() => {
    if (!hasMore || isLoading) return;
    void loadMore();
  }, [hasMore, isLoading, loadMore]);

  return (
    <Virtuoso
      useWindowScroll
      totalCount={rowCount}
      endReached={handleEndReached}
      increaseViewportBy={200}
      context={{ isLoading, hasMore, error }}
      components={{ Footer: LoadingFooter }}
      computeItemKey={(index) => {
        const startIndex = index * ROW_SIZE;
        const ids = characters
          .slice(startIndex, startIndex + ROW_SIZE)
          .map((character) => character.id)
          .join("-");
        return ids ? `row-${ids}` : `row-${index}`;
      }}
      itemContent={(rowIndex) => {
        const startIndex = rowIndex * ROW_SIZE;
        const rowCharacters = characters.slice(
          startIndex,
          startIndex + ROW_SIZE
        );

        if (rowCharacters.length === 0) return null;

        return (
          <div className="grid grid-cols-1 gap-2 lg:grid-cols-2 xl:grid-cols-3">
            {rowCharacters.map((character) => (
              <div key={character.id} data-character-id={character.id}>
                <SelectedCard character={character} />
              </div>
            ))}
          </div>
        );
      }}
    />
  );
};

const LoadingFooter = ({ context }: { context?: FooterContext }) => {
  if (!context) return null;

  if (context.error) {
    return (
      <div className="py-6 text-center text-sm text-red-400">
        {context.error}
      </div>
    );
  }

  if (context.isLoading) {
    return (
      <div className="py-6 text-center text-sm text-zinc-200">
        Loading more characters...
      </div>
    );
  }

  if (!context.hasMore) {
    return (
      <div className="py-6 text-center text-sm text-zinc-400">
        You&apos;ve reached the end of the list.
      </div>
    );
  }

  return null;
};
