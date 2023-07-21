import useLocalStorageState from "use-local-storage-state/src/useLocalStorageState";
import {
  BsFillCheckCircleFill,
  BsFillArrowLeftCircleFill,
} from "react-icons/bs";
import { OverviewPopup } from "./AllStyles";

export default function Overview({ finishDay, toggleShowOverview }) {
  const [projects] = useLocalStorageState("projects");
  if (!projects) {
    return null;
  }

  return (
    <OverviewPopup>
      {projects.map((project) => (
        <div key={project.id}>
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
        </div>
      ))}
      <div>
        <button type="button" onClick={toggleShowOverview}>
          <BsFillArrowLeftCircleFill fontSize="5vh" />
        </button>
        <button type="button" onClick={finishDay}>
          <BsFillCheckCircleFill fontSize="5vh" />
        </button>
      </div>
    </OverviewPopup>
  );
}
