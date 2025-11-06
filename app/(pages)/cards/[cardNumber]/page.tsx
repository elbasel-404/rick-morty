import Link from "next/link";
import { notFound } from "next/navigation";
import { getCharactersList } from "@server";
import {
  JsonViewer,
  CharacterCardI,
  CharacterCardII,
  CharacterCardIII,
  CharacterCardIV,
  CharacterCardV,
} from "@component";

interface CardPageProps {
  params: Promise<{
    cardNumber: string;
  }>;
}

export async function generateStaticParams() {
  return [
    { cardNumber: "1" },
    { cardNumber: "2" },
    { cardNumber: "3" },
    { cardNumber: "4" },
    { cardNumber: "5" },
  ];
}

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

  const CardComponent =
    cardNumber === "2"
      ? CharacterCardII
      : cardNumber === "3"
      ? CharacterCardIII
      : cardNumber === "4"
      ? CharacterCardIV
      : cardNumber === "5"
      ? CharacterCardV
      : CharacterCardI;

  return (
    <main className="min-h-screen bg-black">
      <div className="px-4 py-6 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold mb-6 text-white">
          Rick and Morty Characters
        </h1>

        <div className="mb-6 flex flex-wrap items-center gap-3">
          <span className="font-semibold text-lg text-white">Card Style:</span>
          {[1, 2, 3, 4, 5].map((num) => (
            <Link
              href={`/cards/${num}`}
              key={num}
              className={`px-4 py-2 rounded-lg font-medium ${
                cardNumber === String(num)
                  ? "bg-blue-500 text-white shadow-lg"
                  : "bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600"
              }`}
            >
              {num}
            </Link>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-2">
          {charactersData.map((c, index) => {
            return (
              <div key={c.id} data-index={index}>
                <CardComponent character={c} />
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
};

export default CardPage;
