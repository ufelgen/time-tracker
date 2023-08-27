//style file which stores all styled components used throughout the app
//

import styled from "styled-components";
import { GiSandsOfTime } from "react-icons/gi";

export const BaseMain = styled.main`
  height: 100vh;
  margin-top: 0;
  background: var(--background-gradient);
  max-width: 800px;
  margin: 0 auto !important;
  position: relative;

  h1 {
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
  left: 10vw;

  @media (min-width: 500px) {
    left: auto;
  }

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
    margin: 0.5rem !important;
  }

  button {
    background-color: var(--primary);
    color: white;
    border: none;
    border-radius: 5px;
    padding: 0.5rem;
    margin: 0.5rem !important;
  }
`;

export const SaveTimeForm = styled.form`
  display: flex;
  input {
    width: 70%;
  }
`;

export const AddTimeManuallyForm = styled.form`
  width: 90%;
  display: grid;

  button {
    height: 5vh;
    background-color: transparent;
    border: none;
    margin: 5px;
  }
`;

export const StyledFooter = styled.footer`
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 10vh;
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: var(--primary);
`;

export const Hourglass = styled(GiSandsOfTime)`
  color: white;
  font-size: 7.7vh;
`;

export const StyledMessage = styled.div`
  position: absolute;
  height: auto;
  width: 100vw;
  top: 30vh;
  /*   left: 10vw;

  @media (min-width: 500px) {
    left: auto;
  } */

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

export const OverviewPopup = styled.div`
  position: absolute;
  height: 50vh;
  width: 100vw;
  top: 20vh;
  overflow-y: scroll;

  background-color: lightgoldenrodyellow;
  color: var(--primary);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 0.5rem;

  z-index: 10;

  div {
    padding: 0.5rem;
  }

  button {
    height: 5vh;
    background-color: transparent;
    border: none;
    padding: 1rem 0.5rem;
    color: var(--primary);
  }
`;

export const StyledImageContainer = styled.div`
  width: 300px;
  height: 300px;
  border-color: black;
  position: relative;
`;

export const StyledImagePage = styled.section`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  button {
    background-color: black;
    color: white;
    padding: 1rem;
    border: 1px solid darkmagenta;
    border-radius: 5px;
    font-weight: bold;
    font-size: 20px;
    margin-top: 20px;
    width: 50%;
    position: absolute;
    bottom: -100px;
  }
`;

export const StopwatchContainer = styled.div`
  height: 100%;
  width: 90%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0 0 1rem 0;
  z-index: 3;

  button {
    background-color: transparent;
    border: none;
    &.disabledButton {
      color: grey;
    }
  }

  div {
    height: auto;
    width: auto;
  }

  span {
    font-size: 2rem;
    font-weight: bold;
  }
`;

export const ProjectsContainer = styled.section`
  position: fixed;
  top: 1vh;
  bottom: 20vh;
  overflow-y: scroll;
  width: 100%;

  article {
    width: 90%;
    margin-bottom: 1rem !important;
    border-radius: 5px;
    padding: 1rem;
    position: relative;

    h2 {
      padding: 0.5rem;
    }

    div {
      span {
        button {
          background-color: transparent;
          border: none;
          margin: 5px;
        }
      }
    }
  }

  .fixedHeigt {
    height: 4rem;
  }

  section {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    position: relative;
    padding-top: 1rem;

    button {
      height: 5vh;
      background-color: transparent;
      border: none;
      margin: 5px;
    }
  }
`;

export const EditNameForm = styled.form`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0 0.5rem;

  input {
    height: 5vh;
  }

  button {
    background-color: transparent;
    border: none;
    margin: 5px;
  }
`;

export const AnimationContainer = styled.div`
  position: absolute;
  top: -0.5rem;
  right: -0.5rem;
  height: 7rem;
  width: 7rem;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.2);
`;

export const StyledFixedButton = styled.button`
  background-color: transparent;
  color: var(--primary);
  font-size: 7.7vh;
  position: absolute;
  bottom: 2vh;
  right: 1rem;
  border: none;
  z-index: 5;
`;

export const StyledFinishButton = styled(StyledFixedButton)`
  left: 1rem;
  right: auto;
  font-size: 3vh;
  background-color: var(--primary);
  color: white;
  padding: 1rem;
  border-radius: 5px;
  bottom: 3vh;
`;

export const StyledWarning = styled.div`
  font-weight: bold;
  color: red;
  padding: 0.5 rem;
`;

export const ProjectSpan = styled.span`
  font-weight: bold;
`;
