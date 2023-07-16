import styled from "styled-components";
import useLocalStorageState from "use-local-storage-state";
import { nanoid } from "nanoid";
import {
  BsPauseCircleFill,
  BsFillPlayCircleFill,
  BsStopCircleFill,
  BsFillArrowLeftCircleFill,
  BsFillCheckCircleFill,
} from "react-icons/bs";
import format from "date-fns/format";
import { determineTimeDifference } from "../helpers/timeCalculations";

export default function StopwatchPtTwo({
  project,
  onAddTime,
  saveEntry,
  toggleSaveEntry,
}) {
  const [startStopArray, setStartStopArray] =
    useLocalStorageState("startStopArray");
  const [running, setRunning] = useLocalStorageState("running");

  function storeStart() {
    if (running[0]) {
      alert(
        "Es läuft bereits ein Timer in einem anderen Projekt. Bitte pausiere oder stoppe diesen, bevor du einen neuen Timer startest."
      );
    } else {
      const now = format(new Date(), "HH:mm");
      const projectInStartStopArray = startStopArray.find(
        (object) => object.id === project.id
      );

      if (projectInStartStopArray) {
        setStartStopArray(
          startStopArray.map((object) =>
            object.id === project.id
              ? { ...object, array: [...object.array, now] }
              : object
          )
        );
      } else {
        setStartStopArray([
          ...startStopArray,
          { id: project.id, array: [now] },
        ]);
      }

      setRunning([...running, project.id]);
    }
  }

  function storePause() {
    const now = format(new Date(), "HH:mm");
    const projectInStartStopArray = startStopArray.find(
      (object) => object.id === project.id
    );

    const arrayLength = projectInStartStopArray.array.length;

    const newTimePair = {
      start: projectInStartStopArray.array[arrayLength - 1],
      stop: now,
    };

    const shortenedArray = projectInStartStopArray.array.slice(
      0,
      arrayLength - 1
    );

    setStartStopArray(
      startStopArray.map((object) =>
        object.id === project.id
          ? { ...object, array: [...shortenedArray, newTimePair] }
          : object
      )
    );

    setRunning(running.filter((id) => id !== project.id));
  }

  function storeStop() {
    toggleSaveEntry();
    storePause();
  }

  function handleSaveEntry(event, project) {
    event.preventDefault();

    const projectInStartStopArray = startStopArray.find(
      (object) => object.id === project.id
    );

    const totalTimeArray = projectInStartStopArray.array.map((time) =>
      determineTimeDifference(time.start, time.stop)
    );
    let totalTimeInMinutes = 0;

    for (let i = 0; i < totalTimeArray.length; i++) {
      totalTimeInMinutes += totalTimeArray[i];
    }
    console.log("totalTimeInMinutes", totalTimeInMinutes);

    const totalTimeInMilliseconds = totalTimeInMinutes * 60000;

    const newEntry = {
      projectName: project.name,
      timeObject: {
        id: nanoid(),
        time: totalTimeInMilliseconds,
        description: event.target.elements.description.value,
      },
    };

    onAddTime(newEntry);
    toggleSaveEntry();
    setStartStopArray(
      startStopArray.filter((object) => object.id !== project.id)
    );
  }

  function determineTimerStatus() {
    const projectInStartStopArray = startStopArray.find(
      (object) => object.id === project.id
    );

    if (!projectInStartStopArray) {
      return;
    } else {
      const arrayLength = projectInStartStopArray.array.length;
      const lastPosition = projectInStartStopArray.array[arrayLength - 1];

      if (projectInStartStopArray && !lastPosition.start) {
        const status = "running";
        return status;
      } else if (projectInStartStopArray && lastPosition.start) {
        const status = "paused";
        return status;
      } else {
        return;
      }
    }
  }

  const timerStatus = determineTimerStatus();

  return (
    <StopwatchContainer>
      <div>
        {saveEntry ? (
          <form onSubmit={(event) => handleSaveEntry(event, project)}>
            <label htmlFor="description"></label>
            <input
              name="description"
              id="description"
              placeholder="Beschreibung"
            />
            <button type="button" onClick={toggleSaveEntry}>
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
            <button
              type="button"
              onClick={storePause}
              disabled={!running.includes(project.id)}
            >
              <BsPauseCircleFill
                fontSize="5vh"
                color={
                  running.includes(project.id) ? project.textColour : "grey"
                }
              />
            </button>
            <button
              type="button"
              onClick={storeStart}
              disabled={running.includes(project.id)}
            >
              <BsFillPlayCircleFill
                fontSize="5vh"
                color={
                  !running.includes(project.id) ? project.textColour : "grey"
                }
              />
            </button>
            <button
              type="button"
              onClick={storeStop}
              disabled={!running.includes(project.id)}
            >
              <BsStopCircleFill
                fontSize="5vh"
                color={
                  running.includes(project.id) ? project.textColour : "grey"
                }
              />
            </button>
          </>
        )}
      </div>
      {timerStatus === "running" && <p>Timer läuft</p>}
      {timerStatus === "paused" && <p>Timer pausiert</p>}
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
