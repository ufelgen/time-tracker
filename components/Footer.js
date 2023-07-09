import styled from "styled-components";
import Link from "next/link";
import { useRouter } from "next/router";
import { GiSandsOfTime } from "react-icons/gi";

export default function Footer() {
  const { pathname } = useRouter();
  return (
    <StyledFooter>
      <Link href={"/timer"}>
        <Hourglass />
      </Link>
    </StyledFooter>
  );
}

const StyledFooter = styled.footer`
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 10vh;
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: var(--primary);
`;

const Hourglass = styled(GiSandsOfTime)`
  color: white;
  font-size: 7.7vh;
`;
