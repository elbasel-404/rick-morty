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
      return "bg-emerald-500/20 text-emerald-300 ring-1 ring-inset ring-emerald-500/40";
    case "Dead":
      return "bg-rose-500/20 text-rose-300 ring-1 ring-inset ring-rose-500/40";
    default:
      return "bg-slate-600/30 text-slate-200 ring-1 ring-inset ring-slate-500/40";
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

  return (
    <article
      className={cn(
        "flex h-full flex-col gap-8",
        isModal ? null : "md:flex-row-reverse md:items-start md:gap-12"
      )}
    >
      <div
        className={cn(
          "relative w-full overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/40",
          isModal
            ? "mx-auto aspect-5/6 max-w-xs sm:max-w-sm"
            : "aspect-4/5 md:aspect-3/4 md:max-w-md md:shrink-0 lg:max-w-lg"
        )}
      >
        <Image
          src={character.image}
          alt={character.name}
          fill
          sizes="(max-width: 768px) 100vw, 40vw"
          className="object-cover"
          priority
        />
      </div>

      <div className={cn("flex flex-col gap-8", isModal ? null : "md:flex-1")}>
        <header className="flex flex-col gap-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <h1 className="text-4xl font-semibold text-white sm:text-5xl">
              {character.name}
            </h1>
            <span
              className={cn(
                "inline-flex items-center rounded-full px-4 py-1.5 text-base font-medium uppercase tracking-wide",
                getStatusBadgeClassName(character.status)
              )}
            >
              {character.status}
            </span>
          </div>
          <p className="text-lg text-slate-300">Character ID #{character.id}</p>
        </header>

        <section
          className={cn(
            "grid gap-5 text-slate-100",
            isModal ? "grid-cols-1" : "grid-cols-1 md:grid-cols-2"
          )}
        >
          {primaryFacts.map((fact) => (
            <dl
              key={fact.label}
              className="rounded-2xl border border-slate-800/80 bg-slate-900/60 p-5"
            >
              <dt className="text-base font-semibold uppercase tracking-wide text-slate-300">
                {fact.label}
              </dt>
              <dd className="mt-3 text-xl leading-relaxed text-slate-100">
                {fact.value}
              </dd>
            </dl>
          ))}
        </section>

        <section className="rounded-3xl border border-slate-800/80 bg-slate-900/60 p-5 text-slate-100">
          <h2 className="text-2xl font-semibold text-white md:text-3xl">
            Episode appearances
          </h2>
          <p className="mt-2 text-lg text-slate-300">
            Appears in {character.episode.length} episode
            {character.episode.length === 1 ? "" : "s"}.
          </p>

          <ul className="mt-5 flex flex-col gap-4">
            {episodeEntries.map((episode) => (
              <li
                key={episode.id}
                className="flex items-center justify-between gap-4 rounded-2xl border border-slate-800/80 bg-slate-950/80 px-5 py-4"
              >
                <span className="text-lg font-semibold text-slate-100">
                  {episode.name}
                </span>
                {episode.code ? (
                  <span className="rounded-full border border-slate-700/70 bg-slate-900/80 px-4 py-1 text-sm font-semibold uppercase tracking-wide text-slate-300">
                    {episode.code}
                  </span>
                ) : null}
              </li>
            ))}
          </ul>
          {remainingEpisodes > 0 ? (
            <p className="mt-5 text-base text-slate-400">
              +{remainingEpisodes} more episode
              {remainingEpisodes === 1 ? "" : "s"} beyond the first five.
            </p>
          ) : null}
        </section>
      </div>
    </article>
  );
};
