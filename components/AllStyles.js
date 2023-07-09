import styled from "styled-components";

export const BaseMain = styled.main`
  height: 100vh;
  margin-top: 0;
  background: var(--background-gradient);
  max-width: 800px;
  margin: 0 auto !important;
  position: relative;

  h1,
  h2 {
    margin: 0;
    padding: 1rem;
    text-align: center;
    color: white;
  }
`;

export const StyledForm = styled.form`
  position: absolute;
  height: auto;
  width: 80vw;
  top: 30vh;
  //left: 10vw;

  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: var(--primary);
  background-color: white;
  border-radius: 5px;
  z-index: 5;

  input {
    width: 90%;
  }

  button {
    background-color: var(--primary);
    color: white;
    border: none;
    border-radius: 5px;
    padding: 0.5rem;
    margin: 0.5rem;
  }
`;
