import Link from "next/link";
import { getCharactersList } from "./server/getCharactersList";
import {
  JsonViewer,
  CharacterCard,
  CharacterCardII,
  CharacterCardIII,
  CharacterCardIIII,
} from "@component";

interface HomePageProps {
  searchParams: Promise<{
    cardNumber?: string;
  }>;
}

const HomePage = async ({ searchParams }: HomePageProps) => {
  const params = await searchParams;
  const cardNumber = params.cardNumber || "1";

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
      ? CharacterCardIIII
      : CharacterCard;

  return (
    <main className="min-h-screen px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <h1 className="text-3xl font-bold mb-8">Rick and Morty Characters</h1>

        <div className="mb-8 flex flex-wrap items-center gap-3">
          <span className="font-semibold text-lg">Card Style:</span>
          {[1, 2, 3, 4, 5].map((num) => (
            <Link
              href={`/?cardNumber=${num}`}
              key={num}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                cardNumber === String(num)
                  ? "bg-blue-500 text-white shadow-lg scale-105"
                  : "bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 hover:scale-105"
              }`}
            >
              {num}
            </Link>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6 auto-rows-fr">
          {charactersData.map((c) => {
            return (
              <div className="hoverable-card" key={c.id}>
                <CardComponent character={c} />
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
};

export default HomePage;
