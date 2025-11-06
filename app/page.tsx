import { redirect } from "next/navigation";

const HomePage = () => {
  redirect("/cards/1");
};

export default HomePage;
