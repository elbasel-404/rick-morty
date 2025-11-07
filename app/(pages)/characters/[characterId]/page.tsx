import Link from "next/link";
import { notFound } from "next/navigation";
import { CharacterDetail } from "@component";
import { getCharacterById, getEpisodesByIds } from "@server";

type CharacterPageParams = {
  characterId: string;
};

interface CharacterPageProps {
  params: CharacterPageParams | Promise<CharacterPageParams>;
}

export const revalidate = 120;

const CharacterPage = async ({ params }: CharacterPageProps) => {
  const { characterId } = await params;
  const result = await getCharacterById({ id: characterId });

  if (!result.character) {
    notFound();
  }

  const episodeIds = result.character.episode
    .slice(0, 5)
    .map((episodeUrl) => episodeUrl.split("/").pop() ?? "")
    .filter((value) => value.length > 0);

  const episodeResult = await getEpisodesByIds({ ids: episodeIds });

  return (
    <main className="min-h-screen bg-black">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-8 px-4 py-10 text-white sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <Link
            href="/cards/1"
            className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-slate-300 transition hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/60"
          >
            <span aria-hidden>←</span>
            Back to cards
          </Link>
          <span className="text-xs font-semibold uppercase tracking-wide text-slate-400">
            Character #{result.character.id}
          </span>
        </div>

        <CharacterDetail
          character={result.character}
          episodes={episodeResult.episodes}
        />
      </div>
    </main>
  );
};

export default CharacterPage;
