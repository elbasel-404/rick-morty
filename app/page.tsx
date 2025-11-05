import Link from "next/link";
import { getCharactersList } from "./server/getCharactersList";
import { JsonViewer, CharacterCard } from "@component";

const HomePage = async () => {
  const charactersData = await getCharactersList({ page: "1" });
  if (!charactersData) {
    return <div>No data available</div>;
  }

  return (
    <main>
      <h1>Homepage</h1>
      {charactersData.map((c) => {
        return <CharacterCard character={c} key={c.id} />;
      })}
      {/* <div>
        {[1, 2, 3, 4, 5].map((num) => (
          <Link href={`/characters/${num}`} key={num}>
            {num}
          </Link>
        ))}
      </div> */}
    </main>
  );
};

export default HomePage;
