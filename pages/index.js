import { getGreeting } from "../helpers/getGreeting";
import Footer from "../components/Footer";
import { BaseMain } from "../components/AllStyles";
import RandomImage from "../components/RandomImage";

export default function Home() {
  const greeting = getGreeting();

  return (
    <>
      <BaseMain>
        <h1>{greeting}</h1>

        <RandomImage />
      </BaseMain>
      <Footer />
    </>
  );
}
