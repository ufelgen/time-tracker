import styled from "styled-components";

export default function BeProud() {
  return (
    <StyledDiv>
      <p>Du hast es geschafft!</p>
    </StyledDiv>
  );
}

const StyledDiv = styled.div`
  position: absolute;
  height: auto;
  width: 80vw;
  top: 30vh;
  left: 10vw;

  @media (min-width: 500px) {
    left: auto;
  }

  background-color: lightgoldenrodyellow;
  color: var(--primary);
  font-weight: bold;
  font-size: 1.5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0.5rem;

  z-index: 10;
`;
