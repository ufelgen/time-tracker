import styled from "styled-components";
import { GiSandsOfTime } from "react-icons/gi";
import { BsPencilFill } from "react-icons/bs";
import useLocalStorageState from "use-local-storage-state";

export default function NewTimePopup({
  onShowStopwatch,
  onShowPopup,
  onShowNewTimeForm,
  project,
}) {
  const [running] = useLocalStorageState("running");
  const [time] = useLocalStorageState("time");

  function showStopwatch(stopwatchId) {
    if (running || (!running && time !== 0)) {
      alert(
        "Es läuft bereits ein Timer. Bitte schließe dein laufendes Projekt erst ab, bevor du ein neues startest."
      );
    } else {
      onShowStopwatch(stopwatchId);
      onShowPopup("");
    }
  }

  function inputTimeManually(addTimeId) {
    onShowNewTimeForm(addTimeId);
    onShowPopup("");
  }
  return (
    <PopupBox>
      <button type="button" onClick={() => showStopwatch(project.id)}>
        <GiSandsOfTime fontSize="5vh" />
      </button>
      <button type="button" onClick={() => inputTimeManually(project.id)}>
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
