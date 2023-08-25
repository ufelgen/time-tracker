//this is the app's initial page. it greets the user according to the time of day and displays a random image from an unsplash collection. the hourglass icon in the footer leads to the time tracker page

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
