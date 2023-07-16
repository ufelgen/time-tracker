import styled from "styled-components";
import { Fragment } from "react";
import useLocalStorageState from "use-local-storage-state/src/useLocalStorageState";
import {
  BsFillCheckCircleFill,
  BsFillArrowLeftCircleFill,
} from "react-icons/bs";

export default function Overview({ finishDay, toggleShowOverview }) {
  const [projects] = useLocalStorageState("projects");
  if (!projects) {
    return null;
  }

  return (
    <OverviewPopup>
      {projects.map((project) => (
        <div>
          <Fragment key={project.id}>
            <h3>{project.name}</h3>
            {project.times.map((time) => (
              <div key={time.id}>
                <span>{time.description}: </span>
                <span>
                  {("0" + Math.floor((time.time / 3600000) % 60)).slice(-2)}:
                </span>
                <span>
                  {("0" + Math.floor((time.time / 60000) % 60)).slice(-2)}
                </span>
              </div>
            ))}
          </Fragment>
        </div>
      ))}
      <div>
        <button type="button" onClick={finishDay}>
          <BsFillCheckCircleFill fontSize="5vh" />
        </button>
        <button type="button" onClick={toggleShowOverview}>
          <BsFillArrowLeftCircleFill fontSize="5vh" />
        </button>
      </div>
    </OverviewPopup>
  );
}

const OverviewPopup = styled.div`
  position: absolute;
  height: 50vh;
  width: 90vw;
  left: 5vw;
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
    margin: 5px;
    color: var(--primary);
  }
`;
