import Link from "next/link";
import { notFound } from "next/navigation";
import { CharacterDetail, SlideInModal } from "@component";
import { getCharacterById, getEpisodesByIds } from "@server";

type CharacterModalParams = {
  cardNumber: string;
  characterId: string;
};

interface CharacterModalPageProps {
  params: CharacterModalParams | Promise<CharacterModalParams>;
}

const CharacterModalPage = async ({ params }: CharacterModalPageProps) => {
  const { cardNumber, characterId } = await params;

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
    <SlideInModal
      title={`${result.character.name}`}
      returnHref={`/cards/${cardNumber}`}
    >
      <div className="flex flex-col gap-6">
        <div className="flex justify-end"></div>
        <CharacterDetail
          character={result.character}
          variant="modal"
          episodes={episodeResult.episodes}
        />
      </div>
    </SlideInModal>
  );
};

export default CharacterModalPage;
