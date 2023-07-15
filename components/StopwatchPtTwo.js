import styled from "styled-components";
import useLocalStorageState from "use-local-storage-state";
import { nanoid } from "nanoid";
import { useState } from "react";
import {
  BsPauseCircleFill,
  BsFillPlayCircleFill,
  BsStopCircleFill,
  BsFillArrowLeftCircleFill,
  BsFillCheckCircleFill,
} from "react-icons/bs";
import format from "date-fns/format";
import { determineTimeDifference } from "../helpers/timeCalculations";

export default function StopwatchPtTwo({ project, onAddTime }) {
  const [startStopArray, setStartStopArray] = useLocalStorageState(
    "startStopArray",
    { defaultValue: [] }
  );
  const [running2, setRunning2] = useLocalStorageState("running2");
  const [saveEntry2, setSaveEntry2] = useState(false);

  const now = format(new Date(), "HH:mm");
  console.log("nowbutoutside", now);

  function storeStart() {
    const now = format(new Date(), "HH:mm");
    setStartStopArray([...startStopArray, now]);
    setRunning2(true);
    console.log("now", now);
  }

  function storePause() {
    const now = format(new Date(), "HH:mm");
    const arrayLength = startStopArray.length;

    const newTimePair = { start: startStopArray[arrayLength - 1], stop: now };

    const shortenedArray = startStopArray.slice(0, arrayLength - 1);
    setStartStopArray([...shortenedArray, newTimePair]);
    setRunning2(false);
  }

  function storeStop() {
    setSaveEntry2(true);
    const now = format(new Date(), "HH:mm");
    const arrayLength = startStopArray.length;

    const newTimePair = { start: startStopArray[arrayLength - 1], stop: now };

    const shortenedArray = startStopArray.slice(0, arrayLength - 1);
    setStartStopArray([...shortenedArray, newTimePair]);

    /*     const totalTimeArray = startStopArray.map((time) =>
      determineTimeDifference(time.start, time.stop)
    ); */
    //an dieser Stelle hat die Funktion noch nicht das letzte Objekt, weil setter Funktion verzögert --> zwei Funktionen hintereinander schalten

    //Vorsicht, 1. müssen zwei Timer gleichzeitig gestartet werden können

    // 2. das startStopArray muss dem Projekt zugewiesen sein
    const totalTimeArray = startStopArray.map((time) => time.start);
    console.log("totalTimeArray", totalTimeArray);

    /*     let totalTimeInMinutes = 0;

    for (let i = 0; i < totalTimeArray.length; i++) {
      totalTimeInMinutes += totalTimeArray[i];
    }

    console.log("totalTimeInMinutes", totalTimeInMinutes); */
  }

  function handleSaveEntry(event, project) {
    event.preventDefault();

    const newEntry = {
      projectName: project.name,
      timeObject: {
        id: nanoid(),
        time: time,
        description: event.target.elements.description.value,
      },
    };

    onAddTime(newEntry);
    setSaveEntry2(false);
    setTime(0);
  }

  return (
    <StopwatchContainer>
      <div>
        {saveEntry2 ? (
          <form onSubmit={(event) => handleSaveEntry(event, project)}>
            <label htmlFor="description"></label>
            <input
              name="description"
              id="description"
              placeholder="Beschreibung"
            />
            <button type="button" onClick={() => setSaveEntry2(false)}>
              <BsFillArrowLeftCircleFill
                fontSize="5vh"
                color={project.textColour}
              />
            </button>
            <button type="submit">
              <BsFillCheckCircleFill
                fontSize="5vh"
                color={project.textColour}
              />
            </button>
          </form>
        ) : (
          <>
            <button type="button" onClick={storePause}>
              <BsPauseCircleFill fontSize="5vh" color={project.textColour} />
            </button>
            <button type="button">
              <BsFillPlayCircleFill
                onClick={storeStart}
                fontSize="5vh"
                color={project.textColour}
              />
            </button>
            <button type="button">
              <BsStopCircleFill
                onClick={storeStop}
                fontSize="5vh"
                color={project.textColour}
              />
            </button>
          </>
        )}
      </div>
    </StopwatchContainer>
  );
}

const StopwatchContainer = styled.div`
  height: 100%;
  width: 90%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0 0 1rem 0;

  button {
    background-color: transparent;
    border: none;
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
