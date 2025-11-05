import Link from "next/link";
import { getCharactersList } from "./server/getCharactersList";
import { JSON } from "./components/Json";

const HomePage = async () => {
  const charactersData = await getCharactersList({ page: "1" });

  return (
    <main>
      <h1>Homepage</h1>
      {/* <pre>{JSON.stringify(charactersData, null, 2)}</pre> */}
      <JSON data={charactersData} defaultExpanded={false} />
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
