import { getCharactersList } from "./server/getCharactersList";

const HomePage = async () => {
  const charactersData = await getCharactersList({ page: 1 });
  return (
    <main>
      <h1>Homepage</h1>
      <pre>{JSON.stringify(charactersData, null, 2)}</pre>
    </main>
  );
};

export default HomePage;
