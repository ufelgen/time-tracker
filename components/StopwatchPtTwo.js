//central component which renders the stopwatch within the project

import useLocalStorageState from "use-local-storage-state";
import { nanoid } from "nanoid";
import {
  BsPauseCircleFill,
  BsFillPlayCircleFill,
  BsStopCircleFill,
  BsFillArrowLeftCircleFill,
  BsFillCheckCircleFill,
} from "react-icons/bs";
import {
  storeStart,
  storePause,
  determineTimeDifferenceNew,
} from "../helpers/timeCalculations";
import { StopwatchContainer, SaveTimeForm } from "./AllStyles";

export default function StopwatchPtTwo({
  project,
  onAddTime,
  saveEntry,
  handleSaveEntryId,
}) {
  //'startStopArray' and 'running' arrays with corresponding setter functions are retrieved from local storage
  const [startStopArray, setStartStopArray] =
    useLocalStorageState("startStopArray");
  if (!startStopArray) {
    return null;
  }
  const [running, setRunning] = useLocalStorageState("running");
  if (!running) {
    return null;
  }

  //function called upon clicking the timer's stop button: calls storePause to store the stop time in the startStopArray and also calls the function for saving the subtask in the correct array
  function storeStop(id) {
    handleSaveEntryId(id);
    storePause(setStartStopArray, setRunning, startStopArray, running, project);
  }

  //hands the information for saving the new subtask's total time and description to the handleAddTime function within pages\timer\index.js
  function handleSaveEntry(event, project) {
    event.preventDefault();

    const projectInStartStopArray = startStopArray.find(
      (object) => object.id === project.id
    );

    const totalTimeArray = projectInStartStopArray.array.map((time) =>
      determineTimeDifferenceNew(time.start, time.stop)
    );
    let totalTimeInMilliseconds = 0;

    for (let i = 0; i < totalTimeArray.length; i++) {
      totalTimeInMilliseconds += totalTimeArray[i];
    }

    const newEntry = {
      projectName: project.name,
      timeObject: {
        id: nanoid(),
        time: totalTimeInMilliseconds,
        description: event.target.elements.description.value,
      },
    };

    onAddTime(newEntry);
    handleSaveEntryId(0);
    setStartStopArray(
      startStopArray.filter((object) => object.id !== project.id)
    );
  }

  //determines timer status to display "timer running" or "timer paused" within a project
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
      } else if (
        projectInStartStopArray &&
        lastPosition.start &&
        saveEntry !== project.id
      ) {
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
        {saveEntry === project.id ? (
          <SaveTimeForm onSubmit={(event) => handleSaveEntry(event, project)}>
            <label htmlFor="description"></label>
            <input
              name="description"
              id="description"
              placeholder="Beschreibung"
              autoFocus
              required
            />
            <button type="button" onClick={() => handleSaveEntryId(0)}>
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
          </SaveTimeForm>
        ) : (
          <>
            <button
              type="button"
              onClick={() =>
                storePause(
                  setStartStopArray,
                  setRunning,
                  startStopArray,
                  running,
                  project
                )
              }
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
              onClick={() =>
                storeStart(
                  setStartStopArray,
                  setRunning,
                  startStopArray,
                  running,
                  project
                )
              }
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
              onClick={() => storeStop(project.id)}
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
