import {
  CharacterCardIII,
  CharacterCardIV,
  CharacterCardV,
  CyberCard,
  SimpleCard,
} from "@component";
import { getCharactersList } from "@server";
import { cn } from "@util";
import Link from "next/link";
import { notFound } from "next/navigation";

interface CardPageProps {
  params: Promise<{
    cardNumber: string;
  }>;
}

export const generateStaticParams = () => {
  return [
    { cardNumber: "1" },
    { cardNumber: "2" },
    { cardNumber: "3" },
    { cardNumber: "4" },
    { cardNumber: "5" },
  ];
};

const CardPage = async ({ params }: CardPageProps) => {
  const { cardNumber } = await params;

  // Validate card number
  if (!["1", "2", "3", "4", "5"].includes(cardNumber)) {
    notFound();
  }

  const charactersData = await getCharactersList({ page: cardNumber });
  if (!charactersData) {
    return <div>No data available</div>;
  }

  const cardComponentMap = {
    "1": SimpleCard,
    "2": CyberCard,
    "3": CharacterCardIII,
    "4": CharacterCardIV,
    "5": CharacterCardV,
  };

  const CardComponent =
    cardComponentMap[cardNumber as keyof typeof cardComponentMap];

  return (
    <main className="min-h-screen bg-black">
      <div className="px-4 py-6 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold mb-6 text-white">
          Rick and Morty Characters
        </h1>

        <CardSwitcher cardNumber={cardNumber} />
        <CharacterGrid>
          {charactersData.map((c, index) => {
            return (
              <div key={c.id} data-index={index}>
                <CardComponent character={c} />
              </div>
            );
          })}
        </CharacterGrid>
      </div>
    </main>
  );
};

export default CardPage;

const CharacterGrid = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-2">
      {children}
    </div>
  );
};

const CardSwitcher = ({ cardNumber = "1" }) => {
  return (
    <div className="mb-6 flex flex-wrap items-center gap-3">
      <span className="font-semibold text-lg text-white">Card Style:</span>
      {[1, 2, 3, 4, 5].map((num) => (
        <Link
          href={`/cards/${num}`}
          key={num}
          className={cn(
            "px-4 py-2 rounded-lg font-medium",
            cardNumber === String(num)
              ? "bg-blue-500 text-white shadow-lg"
              : "bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600",
          )}
        >
          {num}
        </Link>
      ))}
    </div>
  );
};
