import styled from "styled-components";
import { GiSandsOfTime } from "react-icons/gi";
import { BsPencilFill } from "react-icons/bs";

export default function NewTimePopup({
  onShowStopwatch,
  onShowPopup,
  project,
}) {
  function showStopwatch(stopwatchId) {
    onShowStopwatch(stopwatchId);
    onShowPopup("");
  }
  return (
    <PopupBox>
      <button type="button" onClick={() => showStopwatch(project.id)}>
        <GiSandsOfTime fontSize="5vh" />
      </button>
      <button type="button">
        <BsPencilFill fontSize="5vh" />
      </button>
    </PopupBox>
  );
}

const PopupBox = styled.div`
  position: absolute;
  z-index: 7;
  height: 10vh;
  width: 30%;
  background-color: white;
  border-radius: 5px;
  right: 1rem;
  bottom: 1rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  color: black;

  button {
    background-color: transparent;
  }
`;
