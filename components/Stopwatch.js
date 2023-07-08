import styled from "styled-components";
import { useState, useEffect } from "react";
import {
  BsPauseCircleFill,
  BsFillPlayCircleFill,
  BsStopCircleFill,
  BsFillArrowLeftCircleFill,
  BsFillCheckCircleFill,
} from "react-icons/bs";
import { nanoid } from "nanoid";

export default function Stopwatch({ project, onAddTime }) {
  const [time, setTime] = useState(0);
  const [running, setRunning] = useState(false);
  const [saveEntry, setSaveEntry] = useState(false);

  useEffect(() => {
    let interval;
    if (running) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 1000);
      }, 1000);
    } else if (!running) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [running]);

  function startTimer() {
    setRunning(true);
    console.log("timer started");
  }

  function stopTimer() {
    setRunning(false);
    console.log("timer stopped");
    setSaveEntry(true);
  }

  function pauseTimer() {
    setRunning(false);
    console.log("timer paused");
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
    setSaveEntry(false);
    setTime(0);
  }

  return (
    <StopwatchContainer>
      <div>
        <span color={project.textColour}>
          {("0" + Math.floor((time / 3600000) % 60)).slice(-2)}:
        </span>
        <span color={project.textColour}>
          {("0" + Math.floor((time / 60000) % 60)).slice(-2)}:
        </span>
        <span color={project.textColour}>
          {("0" + Math.floor((time / 1000) % 60)).slice(-2)}
        </span>
      </div>
      <div>
        {saveEntry ? (
          <form onSubmit={(event) => handleSaveEntry(event, project)}>
            <label htmlFor="description"></label>
            <input
              name="description"
              id="description"
              placeholder="Beschreibung"
            />
            <button type="button" onClick={() => setSaveEntry(false)}>
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
            <button type="button" onClick={pauseTimer}>
              <BsPauseCircleFill fontSize="5vh" color={project.textColour} />
            </button>
            <button type="button">
              <BsFillPlayCircleFill
                onClick={startTimer}
                fontSize="5vh"
                color={project.textColour}
              />
            </button>
            <button type="button">
              <BsStopCircleFill
                onClick={stopTimer}
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