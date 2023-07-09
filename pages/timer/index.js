import styled from "styled-components";
import useLocalStorageState from "use-local-storage-state/src/useLocalStorageState";
import { BaseMain } from "../../components/AllStyles";
import { AiFillPlusCircle } from "react-icons/ai";
import NewProjectForm from "../../components/NewProjectForm";
import Projects from "../../components/Projects";
import BeProud from "../../components/BeProud";
import format from "date-fns/format";
import dynamic from "next/dynamic";
import { useState } from "react";

export default function Timer({
  editId,
  onChangeEditId,
  showForm,
  toggleShowForm,
  showPopup,
  onShowPopup,
  stopwatch,
  onShowStopwatch,
  newTimeForm,
  onShowNewTimeForm,
  editTimeId,
  onChangeEditTimeId,
}) {
  const [projects, setProjects] = useLocalStorageState("projects");
  if (!projects) {
    return null;
  }
  const [celebration, setCelebration] = useState(false);

  const today = format(new Date(), "dd. MM. yyyy");

  function handleAddProject(newProject) {
    setProjects([...projects, newProject]);
  }

  function handleDeleteProject(projectId) {
    const confirmation = confirm("Möchtest du dieses Projekt löschen?");
    if (confirmation) {
      setProjects(projects.filter((project) => project.id !== projectId));
    }
  }

  function handleUpdateProjectName(updatedName, projectId) {
    setProjects(
      projects.map((project) =>
        project.id === projectId ? { ...project, name: updatedName } : project
      )
    );
  }

  function handleAddTime(newEntry) {
    const projectEntryToUpdate = projects.find(
      (project) => project.name === newEntry.projectName
    );
    console.log("projectEntryToUpdate", projectEntryToUpdate);
    if (projectEntryToUpdate) {
      const updatedEntry = {
        ...projectEntryToUpdate,
        times: [...projectEntryToUpdate.times, newEntry.timeObject],
      };
      setProjects(
        projects.map((project) =>
          project.name === newEntry.projectName ? updatedEntry : project
        )
      );
      console.log("i am in if");
    } else {
      console.log("i am in else");
      return;
    }
  }

  function handleDeleteTime(timeId, projectId) {
    const confirmation = confirm("Möchtest du diesen Eintrag löschen?");
    const currentProject = projects.find((project) => project.id === projectId);

    const updatedTimesInProject = currentProject.times.filter(
      (time) => time.id !== timeId
    );

    if (confirmation) {
      setProjects(
        projects.map((project) =>
          project.id === projectId
            ? { ...project, times: updatedTimesInProject }
            : project
        )
      );
    }
  }

  function handleEditTime(timeId, updatedEntry) {
    const currentProject = projects.find(
      (project) => project.name === updatedEntry.projectName
    );

    const updatedTimesInProject = currentProject.times.map((time) =>
      time.id === timeId ? updatedEntry.timeObject : time
    );

    setProjects(
      projects.map((project) =>
        project.name === updatedEntry.projectName
          ? { ...project, times: updatedTimesInProject }
          : project
      )
    );
  }

  function finishDay() {
    const confirmation = confirm(
      "Möchtest du deinen Arbeitstag abschließen? Dies löscht alle Zeiten aus deinen Projekten!"
    );

    if (confirmation) {
      setProjects(
        projects.map((project) => {
          return { ...project, times: [] };
        })
      );
      handleCelebration();
    }
  }

  const { height, width } = dynamic(
    () => import("../../helpers/useWindowSize"),
    {
      ssr: false,
    }
  );

  const Confetti = dynamic(() => import("react-confetti"), {
    ssr: false,
  });

  function handleCelebration() {
    setCelebration(true);
    setTimeout(handleConfettiStop, 5000);
  }

  function handleConfettiStop() {
    setCelebration(false);
  }

  return (
    <BaseMain>
      {celebration && (
        <>
          <Confetti height={height} width={width} /> <BeProud />
        </>
      )}
      <StyledFixedButton onClick={toggleShowForm}>
        <AiFillPlusCircle />
      </StyledFixedButton>
      <StyledFinishButton onClick={finishDay}>
        Tag abschließen
      </StyledFinishButton>
      {showForm && (
        <NewProjectForm
          toggleShowForm={toggleShowForm}
          onAddNewProject={handleAddProject}
        />
      )}

      <Projects
        projects={projects}
        onDeleteProject={handleDeleteProject}
        onUpdateProjectName={handleUpdateProjectName}
        editId={editId}
        onChangeEditId={onChangeEditId}
        showPopup={showPopup}
        onShowPopup={onShowPopup}
        stopwatch={stopwatch}
        onShowStopwatch={onShowStopwatch}
        newTimeForm={newTimeForm}
        onShowNewTimeForm={onShowNewTimeForm}
        onAddTime={handleAddTime}
        onDeleteTime={handleDeleteTime}
        editTimeId={editTimeId}
        onChangeEditTimeId={onChangeEditTimeId}
        onEditTime={handleEditTime}
        today={today}
      />
    </BaseMain>
  );
}

const StyledFixedButton = styled.button`
  background-color: transparent;
  color: var(--primary);
  font-size: 7.7vh;
  position: absolute;
  bottom: 2vh;
  right: 1rem;
  border: none;
  z-index: 5;
`;

const StyledFinishButton = styled(StyledFixedButton)`
  left: 1rem;
  right: auto;
  font-size: 3vh;
  background-color: var(--primary);
  color: white;
  padding: 1rem;
  border-radius: 5px;
  bottom: 3vh;
`;
