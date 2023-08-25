//component displaying an overview of the day including total times spent working within projects and overall

import useLocalStorageState from "use-local-storage-state/src/useLocalStorageState";
import {
  BsFillCheckCircleFill,
  BsFillArrowLeftCircleFill,
} from "react-icons/bs";
import { OverviewPopup, StyledWarning, ProjectSpan } from "./AllStyles";
import {
  addTimesInProjects,
  addAllTimesPerDay,
} from "../helpers/timeCalculations";

export default function Overview({ finishDay, toggleShowOverview }) {
  const [projects] = useLocalStorageState("projects");
  if (!projects) {
    return null;
  }

  const [startStopArray] = useLocalStorageState("startStopArray");
  if (!startStopArray) {
    return null;
  }

  const projectsWithAddedTimes = addTimesInProjects(projects);
  const totalTime = addAllTimesPerDay(projectsWithAddedTimes);

  return (
    <OverviewPopup>
      {startStopArray[0] && (
        <StyledWarning>Ein Timer läuft noch oder ist pausiert.</StyledWarning>
      )}
      {projectsWithAddedTimes.map((project) => (
        <div key={project.id}>
          <ProjectSpan>{project.name}: </ProjectSpan>
          <span>
            {("0" + Math.floor((project.times / 3600000) % 60)).slice(-2)}:
          </span>
          <span>
            {("0" + Math.floor((project.times / 60000) % 60)).slice(-2)}
          </span>
        </div>
      ))}
      <div>
        <ProjectSpan>Gesamte Arbeitszeit: </ProjectSpan>
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
      <StyledWarning>
        Achtung: Wenn du auf den Haken zum Bestätigen klickst, werden alle
        Zeiten aus deinen Projekten gelöscht!
      </StyledWarning>
    </OverviewPopup>
  );
}
