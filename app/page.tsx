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
    <main>
      <h1>Homepage</h1>

      <div className="mb-4 flex gap-2">
        <span className="font-semibold">Card Number:</span>
        {[1, 2, 3, 4, 5].map((num) => (
          <Link
            href={`/?cardNumber=${num}`}
            key={num}
            className={`px-3 py-1 rounded ${
              cardNumber === String(num)
                ? "bg-blue-500 text-white"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            {num}
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {charactersData.map((c) => {
          return <CardComponent character={c} key={c.id} />;
        })}
      </div>
    </main>
  );
};

export default HomePage;
