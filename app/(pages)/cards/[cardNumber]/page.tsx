import Link from "next/link";
import { notFound } from "next/navigation";
import { getCharactersList } from "@server";
import { CharacterExplorer } from "@component";
import type { CardVariant } from "@component";
import { cn, extractNextPage } from "@util";

type CardPageParams = {
  cardNumber: string;
};

interface CardPageProps {
  params: CardPageParams | Promise<CardPageParams>;
}

export const generateStaticParams = () => {
  return [{ cardNumber: "1" }, { cardNumber: "2" }, { cardNumber: "3" }];
};

const CardPage = async ({ params }: CardPageProps) => {
  const { cardNumber } = await params;

  // Validate card number
  if (!["1", "2", "3"].includes(cardNumber)) {
    notFound();
  }

  const characterResult = await getCharactersList({ page: cardNumber });
  if (!characterResult.characters || characterResult.characters.length === 0) {
    return <div>No data available</div>;
  }

  const nextPage = extractNextPage(characterResult.info?.next ?? null);
  const cardVariant = cardNumber as CardVariant;

  return (
    <main className="min-h-screen bg-black">
      <div className="px-4 py-6 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold mb-6 text-white">
          Rick and Morty Characters
        </h1>

        <CardSwitcher cardNumber={cardNumber} />
        <div className="z-50">
          <CharacterExplorer
            initialCharacters={characterResult.characters}
            initialNextPage={nextPage}
            cardVariant={cardVariant}
          />
        </div>
      </div>
    </main>
  );
};

export default CardPage;

const CardSwitcher = ({ cardNumber = "1" }) => {
  return (
    <div className="mb-6 flex flex-wrap items-center gap-3">
      <span className="font-semibold text-lg text-white">Card Style:</span>
      {[1, 2, 3].map((num) => (
        <Link
          href={`/cards/${num}`}
          key={num}
          className={cn(
            "px-4 py-2 rounded-lg font-medium",
            cardNumber === String(num)
              ? "bg-blue-500 text-white shadow-lg"
              : "bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600"
          )}
        >
          {num}
        </Link>
      ))}
    </div>
  );
};
