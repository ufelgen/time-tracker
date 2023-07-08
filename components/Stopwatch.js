import styled from "styled-components";
import { useState, useEffect } from "react";
import {
  BsPauseCircleFill,
  BsFillPlayCircleFill,
  BsStopCircleFill,
} from "react-icons/bs";
import { set } from "date-fns";

export default function Stopwatch({ project }) {
  const [time, setTime] = useState(0);
  const [running, setRunning] = useState(false);

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

  console.log(time);

  function startTimer() {
    setRunning(true);
    console.log("timer started");
  }

  function stopTimer() {
    setRunning(false);
    console.log("timer stopped");
  }

  function pauseTimer() {
    setRunning(false);
    console.log("timer paused");
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
