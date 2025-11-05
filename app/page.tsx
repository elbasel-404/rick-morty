import Link from "next/link";
import { getCharactersList } from "./server/getCharactersList";
import { JsonViewer } from "./components/JsonViewer";

const HomePage = async () => {
  const charactersData = await getCharactersList({ page: "1" });

  return (
    <main>
      <h1>Homepage</h1>
      <JsonViewer data={charactersData} defaultExpanded={false} />
      <div>
        {[1, 2, 3, 4, 5].map((num) => (
          <Link href={`/characters/${num}`} key={num}>
            {num}
          </Link>
        ))}
      </div>
    </main>
  );
};

export default HomePage;
