import Link from "next/link";
import { StyledFooter, Hourglass } from "./AllStyles";

export default function Footer() {
  return (
    <StyledFooter>
      <Link href={"/timer"}>
        <Hourglass />
      </Link>
    </StyledFooter>
  );
}
