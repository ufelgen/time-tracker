import useLocalStorageState from "use-local-storage-state/src/useLocalStorageState";
import {
  BsFillCheckCircleFill,
  BsFillArrowLeftCircleFill,
} from "react-icons/bs";
import { OverviewPopup } from "./AllStyles";
import {
  addTimesInProjects,
  addAllTimesPerDay,
} from "../helpers/timeCalculations";

export default function Overview({ finishDay, toggleShowOverview }) {
  const [projects] = useLocalStorageState("projects");
  if (!projects) {
    return null;
  }

  const projectsWithAddedTimes = addTimesInProjects(projects);
  const totalTime = addAllTimesPerDay(projectsWithAddedTimes);

  return (
    <OverviewPopup>
      {projectsWithAddedTimes.map((project) => (
        <div key={project.id}>
          <span>{project.name}: </span>
          <span>
            {("0" + Math.floor((project.times / 3600000) % 60)).slice(-2)}:
          </span>
          <span>
            {("0" + Math.floor((project.times / 60000) % 60)).slice(-2)}
          </span>
        </div>
      ))}
      <div>
        <span>Gesamte Arbeitszeit: </span>
        <span>{("0" + Math.floor((totalTime / 3600000) % 60)).slice(-2)}:</span>
        <span>{("0" + Math.floor((totalTime / 60000) % 60)).slice(-2)}</span>
      </div>
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
