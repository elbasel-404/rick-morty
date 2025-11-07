"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Character, Episode } from "@schema";
import { cn, logError } from "@util";

type CharacterDetailVariant = "page" | "modal";

interface CharacterDetailProps {
  character: Character;
  variant?: CharacterDetailVariant;
  episodes?: Episode[];
}

type ViewedCharacter = Pick<Character, "id" | "name" | "image">;
type StoredViewedCharacter = {
  id: number;
  name: string;
  image?: string | null;
};

const RECENTLY_VIEWED_STORAGE_KEY = "recentlyViewedCharacters";

const formatField = (value: string | undefined | null) => {
  if (!value || value.trim().length === 0) {
    return "Unknown";
  }

  return value;
};

const formatEpisodeLabel = (episodeUrl: string) => {
  const episodeId = episodeUrl.split("/").pop();
  if (!episodeId) return episodeUrl;

  return `Episode ${episodeId}`;
};

const getStatusBadgeClassName = (status: Character["status"]) => {
  switch (status) {
    case "Alive":
      return "bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 ring-1 ring-inset ring-emerald-300 dark:ring-emerald-500/50 border border-emerald-200 dark:border-emerald-500/30";
    case "Dead":
      return "bg-rose-500/15 text-rose-700 dark:text-rose-400 ring-1 ring-inset ring-rose-300 dark:ring-rose-500/50 border border-rose-200 dark:border-rose-500/30";
    default:
      return "bg-slate-500/10 text-slate-700 dark:text-slate-300 ring-1 ring-inset ring-slate-300 dark:ring-slate-500/40 border border-slate-200 dark:border-slate-500/30";
  }
};

export const CharacterDetail = ({
  character,
  variant = "page",
  episodes,
}: CharacterDetailProps) => {
  const [recentCharacters, setRecentCharacters] = useState<ViewedCharacter[]>(
    []
  );
  const isModal = variant === "modal";

  // Persist the last five viewed characters so they can be surfaced quickly on future visits.
  useEffect(() => {
    const storedValue = window.localStorage.getItem(
      RECENTLY_VIEWED_STORAGE_KEY
    );

    let parsedValue: ViewedCharacter[] = [];

    if (storedValue) {
      try {
        const parsed = JSON.parse(storedValue);
        if (Array.isArray(parsed)) {
          parsedValue = parsed
            .filter(
              (item): item is StoredViewedCharacter =>
                typeof item === "object" &&
                item !== null &&
                typeof item.id === "number" &&
                typeof item.name === "string"
            )
            .map((item) => ({
              id: item.id,
              name: item.name,
              image:
                typeof item.image === "string" && item.image.length > 0
                  ? item.image
                  : "",
            }))
            .slice(0, 5);
        }
      } catch (error) {
        logError({
          errorTitle: "Failed to parse recently viewed characters",
          errorContent: error instanceof Error ? error.message : String(error),
        });
      }
    }

    const currentCharacter: ViewedCharacter = {
      id: character.id,
      name: character.name,
      image: character.image ?? "",
    };

    const dedupedEntries = parsedValue.filter(
      (entry) => entry.id !== currentCharacter.id
    );

    const updatedEntries = [currentCharacter, ...dedupedEntries].slice(0, 5);

    window.localStorage.setItem(
      RECENTLY_VIEWED_STORAGE_KEY,
      JSON.stringify(updatedEntries)
    );

    setRecentCharacters(updatedEntries);
  }, [character.id, character.image, character.name]);

  const primaryFacts = [
    { label: "Species", value: formatField(character.species) },
    { label: "Type", value: formatField(character.type) },
    { label: "Gender", value: formatField(character.gender) },
    { label: "Origin", value: formatField(character.origin?.name) },
    {
      label: "Last known location",
      value: formatField(character.location?.name),
    },
    {
      label: "First appeared",
      value:
        character.episode.length > 0
          ? episodes?.[0]?.name ?? formatEpisodeLabel(character.episode[0]!)
          : "Unknown",
    },
    {
      label: "Total episodes",
      value: character.episode.length.toString(),
    },
    {
      label: "Most recent episode",
      value:
        character.episode.length > 0
          ? formatEpisodeLabel(character.episode[character.episode.length - 1]!)
          : "Unknown",
    },
  ];

  const episodeUrls = character.episode.slice(0, 5);
  const episodeEntries = episodeUrls.map((episodeUrl, index) => {
    const episode = episodes?.[index];
    return {
      id: episode?.id ?? episodeUrl,
      name: episode?.name ?? formatEpisodeLabel(episodeUrl),
      code: episode?.episode,
    };
  });
  const remainingEpisodes = Math.max(
    character.episode.length - episodeEntries.length,
    0
  );

  const factsLeftColumn = primaryFacts.slice(0, 6);
  const factsBelowImage = primaryFacts.slice(6);

  const renderFact = (
    fact: { label: string; value: string },
    options?: { compact?: boolean }
  ) => {
    const compact = options?.compact ?? false;

    return (
      <dl
        key={fact.label}
        className={cn(
          "group rounded-xl border border-border bg-card hover:bg-card/80 transition-all duration-200",
          compact ? "p-3 sm:p-4" : "p-4 sm:p-5"
        )}
      >
        <dt
          className={cn(
            "font-bold uppercase tracking-widest text-muted-foreground group-hover:text-primary transition-colors",
            compact ? "text-[0.65rem] sm:text-xs" : "text-xs sm:text-sm"
          )}
        >
          {fact.label}
        </dt>
        <dd
          className={cn(
            "font-semibold leading-relaxed text-foreground",
            compact
              ? "mt-1.5 text-sm sm:text-base"
              : "mt-2 sm:mt-3 text-base sm:text-lg"
          )}
        >
          {fact.value}
        </dd>
      </dl>
    );
  };

  if (isModal) {
    return (
      <article className="flex h-full w-full overflow-hidden -mt-6">
        <div className="flex h-full shrink-0 basis-[45vw] justify-center sm:basis-[300px] md:basis-[340px] lg:basis-[380px]">
          <div className="relative h-full w-full overflow-hidden rounded-2xl bg-card shadow-sm sm:rounded-none sm:border-0">
            <Image
              src={character.image || "/placeholder.svg"}
              alt={character.name}
              fill
              sizes="(min-width: 1024px) 380px, (min-width: 768px) 340px, (min-width: 640px) 300px, 70vw"
              className="object-cover rounded-lg"
              priority
            />
          </div>
        </div>

        <div className="flex flex-1 flex-col gap-4 overflow-y-auto bg-slate-950/20 p-4 sm:gap-6 sm:p-6">
          <header className="flex flex-col gap-3 border-b border-border pb-4">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div className="flex flex-col gap-2">
                <div className="flex gap-2">
                  <h1 className="text-3xl font-bold leading-tight text-foreground sm:text-4xl">
                    {character.name}
                  </h1>
                  <button
                    onClick={() => {
                      window.location.reload();
                    }}
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-sky-500 via-blue-500 to-indigo-500 text-white shadow-lg shadow-sky-500/30 ring-2 ring-slate-900/40 transition-transform hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-sky-400"
                    aria-label="Refresh character details"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      className="h-4 w-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25"
                      />
                    </svg>
                  </button>
                </div>
                <p className="text-sm text-muted-foreground sm:text-base">
                  Character ID #{character.id}
                </p>
              </div>
              <div className="flex items-center gap-3 pr-18">
                <span
                  className={cn(
                    "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide whitespace-nowrap sm:px-4 sm:py-1.5 sm:text-sm",
                    getStatusBadgeClassName(character.status)
                  )}
                >
                  {character.status}
                </span>
              </div>
            </div>
          </header>

          <section className="grid grid-cols-1 gap-3 text-foreground sm:grid-cols-2">
            {primaryFacts.map((fact) => renderFact(fact, { compact: true }))}
          </section>

          <section className="rounded-xl border border-border bg-card p-4 text-foreground shadow-sm sm:p-5">
            <h2 className="text-xl font-bold text-foreground sm:text-2xl">
              Episode appearances
            </h2>
            <p className="mt-2 text-sm text-muted-foreground sm:text-base">
              Appears in {character.episode.length} episode
              {character.episode.length === 1 ? "" : "s"}.
            </p>

            <ul className="mt-4 flex flex-col gap-3">
              {episodeEntries.map((episode) => (
                <li
                  key={episode.id}
                  className="flex items-center justify-between gap-3 rounded-lg border border-border bg-secondary/50 px-3 py-2.5 transition-colors hover:bg-secondary sm:px-4"
                >
                  <span className="text-sm font-medium text-foreground sm:text-base">
                    {episode.name}
                  </span>
                  {episode.code ? (
                    <span className="rounded-full border border-border bg-card px-2.5 py-1 text-[0.65rem] font-semibold uppercase tracking-wide text-muted-foreground sm:text-xs">
                      {episode.code}
                    </span>
                  ) : null}
                </li>
              ))}
            </ul>
            {remainingEpisodes > 0 ? (
              <p className="mt-3 text-xs text-muted-foreground sm:text-sm">
                +{remainingEpisodes} more episode
                {remainingEpisodes === 1 ? "" : "s"} beyond the first five.
              </p>
            ) : null}
          </section>
        </div>
      </article>
    );
  }

  return (
    <article className="flex h-full flex-col gap-8 sm:gap-10">
      <div className="flex flex-col gap-8 sm:gap-10 lg:grid lg:grid-cols-[1fr_minmax(300px,450px)] lg:items-start lg:gap-12">
        <div className="order-2 flex flex-col gap-6 sm:gap-8 lg:order-1 w-full">
          <header className="flex flex-col gap-3 sm:gap-4">
            <div className="flex flex-wrap items-start sm:items-center justify-between gap-3">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground leading-tight max-w-2xl">
                {character.name}
              </h1>
              <span
                className={cn(
                  "inline-flex items-center rounded-full px-3 sm:px-4 py-1 sm:py-1.5 text-xs sm:text-sm font-semibold uppercase tracking-wide whitespace-nowrap shrink-0",
                  getStatusBadgeClassName(character.status)
                )}
              >
                {character.status}
              </span>
            </div>
            <p className="text-sm sm:text-base text-muted-foreground">
              Character ID #{character.id}
            </p>
          </header>

          <section className="hidden gap-3 sm:gap-4 text-foreground lg:grid lg:grid-cols-2">
            {factsLeftColumn.map((fact) => renderFact(fact))}
          </section>
        </div>

        <div className="order-1 flex flex-col gap-4 sm:gap-6 lg:order-2">
          <div className="relative mx-auto w-full max-w-xs overflow-hidden rounded-2xl border border-border bg-card shadow-sm aspect-3/4 sm:max-w-sm lg:max-w-md">
            <Image
              src={character.image || "/placeholder.svg"}
              alt={character.name}
              fill
              sizes="(max-width: 768px) 100vw, 28vw"
              className="object-cover"
              priority
            />
          </div>
        </div>
      </div>

      <section className="grid gap-3 sm:gap-4 text-foreground lg:hidden grid-cols-2">
        {primaryFacts.map((fact) => renderFact(fact))}
      </section>

      <section className="hidden gap-3 sm:gap-4 text-foreground lg:grid lg:grid-cols-2">
        {factsBelowImage.map((fact) => renderFact(fact))}
      </section>
      <section className="rounded-xl border border-border bg-card p-4 sm:p-6 text-foreground shadow-sm">
        <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
          Episode appearances
        </h2>
        <p className="mt-2 text-sm sm:text-base text-muted-foreground">
          Appears in {character.episode.length} episode
          {character.episode.length === 1 ? "" : "s"}.
        </p>

        <ul className="mt-4 sm:mt-5 flex flex-col gap-3 sm:gap-4">
          {episodeEntries.map((episode) => (
            <li
              key={episode.id}
              className="flex items-center justify-between gap-3 rounded-lg border border-border bg-secondary/50 hover:bg-secondary transition-colors px-4 py-3"
            >
              <span className="text-sm sm:text-base font-medium text-foreground">
                {episode.name}
              </span>
              {episode.code ? (
                <span className="rounded-full border border-border bg-card px-3 py-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  {episode.code}
                </span>
              ) : null}
            </li>
          ))}
        </ul>
        {remainingEpisodes > 0 ? (
          <p className="mt-4 text-xs sm:text-sm text-muted-foreground">
            +{remainingEpisodes} more episode
            {remainingEpisodes === 1 ? "" : "s"} beyond the first five.
          </p>
        ) : null}
      </section>

      {variant === "page" && recentCharacters.length > 0 ? (
        <section className="rounded-xl border border-border bg-card p-4 sm:p-6 text-foreground shadow-sm">
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
            Recently viewed
          </h2>
          <p className="mt-2 text-sm sm:text-base text-muted-foreground">
            Jump back to characters you explored earlier.
          </p>

          <div className="mt-4 grid gap-3 sm:gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-5">
            {recentCharacters.map((entry) => (
              <Link
                key={entry.id}
                href={`/characters/${entry.id}`}
                className="group flex items-center gap-3 rounded-lg border border-border bg-secondary/40 px-3 py-3 transition-colors hover:bg-secondary"
                prefetch
              >
                <div className="relative h-12 w-12 overflow-hidden rounded-lg border border-border">
                  <Image
                    src={entry.image || "/placeholder.svg"}
                    alt={entry.name}
                    fill
                    sizes="(max-width: 768px) 20vw, 80px"
                    className="object-cover"
                  />
                </div>
                <span className="text-sm font-medium text-foreground transition-colors group-hover:text-primary sm:text-base">
                  {entry.name}
                </span>
              </Link>
            ))}
          </div>
        </section>
      ) : null}
    </article>
  );
};
