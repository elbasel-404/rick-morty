import Image from "next/image";
import type { Character, Episode } from "@schema";
import { cn } from "@util";

type CharacterDetailVariant = "page" | "modal";

interface CharacterDetailProps {
  character: Character;
  variant?: CharacterDetailVariant;
  episodes?: Episode[];
}

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
  const isModal = variant === "modal";

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
            "font-semibold text-foreground leading-relaxed",
            compact ? "mt-1.5 text-sm sm:text-base" : "mt-2 sm:mt-3 text-base sm:text-lg"
          )}
        >
          {fact.value}
        </dd>
      </dl>
    );
  };

  if (isModal) {
    return (
      <article className="flex h-full flex-col gap-4 sm:gap-5">
        <div className="relative mx-auto w-full overflow-hidden rounded-2xl border border-border bg-card shadow-sm aspect-5/6 max-w-xs sm:max-w-sm">
          <Image
            src={character.image || "/placeholder.svg"}
            alt={character.name}
            fill
            sizes="(max-width: 768px) 100vw, 45vw"
            className="object-cover"
            priority
          />
        </div>

        <div className="flex flex-col gap-4 sm:gap-5">
          <header className="flex flex-col gap-2 sm:gap-3">
            <div className="flex flex-wrap items-start sm:items-center justify-between gap-2.5">
              <h1 className="text-3xl sm:text-4xl font-bold text-foreground leading-tight">
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

          <section className="grid gap-2 sm:gap-3 text-foreground grid-cols-1 sm:grid-cols-2">
            {primaryFacts.map((fact) => renderFact(fact, { compact: true }))}
          </section>

          <section className="rounded-xl border border-border bg-card p-3 sm:p-4 text-foreground shadow-sm">
            <h2 className="text-xl sm:text-2xl font-bold text-foreground">
              Episode appearances
            </h2>
            <p className="mt-1.5 text-sm text-muted-foreground sm:text-base">
              Appears in {character.episode.length} episode
              {character.episode.length === 1 ? "" : "s"}.
            </p>

            <ul className="mt-3 sm:mt-4 flex flex-col gap-2.5 sm:gap-3">
              {episodeEntries.map((episode) => (
                <li
                  key={episode.id}
                  className="flex items-center justify-between gap-2.5 rounded-lg border border-border bg-secondary/50 hover:bg-secondary transition-colors px-3 py-2.5"
                >
                  <span className="text-sm sm:text-base font-medium text-foreground">
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
              <p className="mt-3 text-xs sm:text-sm text-muted-foreground">
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
        <div className="order-2 flex flex-col gap-6 sm:gap-8 lg:order-1">
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

          <section className="hidden gap-3 sm:gap-4 text-foreground lg:grid lg:grid-cols-2">
            {factsBelowImage.map((fact) => renderFact(fact))}
          </section>
        </div>
      </div>

      <section className="grid gap-3 sm:gap-4 text-foreground lg:hidden grid-cols-2">
        {primaryFacts.map((fact) => renderFact(fact))}
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
    </article>
  );
};
