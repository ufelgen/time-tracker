import { getGreeting } from "../helpers/getGreeting";
import Footer from "../components/Footer";
import { BaseMain } from "../components/AllStyles";
import RandomImage from "../components/RandomImage";
import format from "date-fns/format";
import { determineTimeDifference } from "../helpers/timeCalculations";

export default function Home() {
  const greeting = getGreeting();

  const testDifference = determineTimeDifference("09:45", "10:15");
  console.log("testDifference", testDifference);

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
