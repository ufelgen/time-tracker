import { getGreeting } from "../helpers/getGreeting";
import styled from "styled-components";
import Footer from "../components/Footer";
import { BaseMain } from "../components/AllStyles";

export default function Home() {
  const greeting = getGreeting();
  return (
    <>
      <BaseMain>
        <h1>{greeting}</h1>
      </BaseMain>
      <Footer />
    </>
  );
}
