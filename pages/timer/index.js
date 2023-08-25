//this is the time tracker page

import useLocalStorageState from "use-local-storage-state/src/useLocalStorageState";
import { BaseMain } from "../../components/AllStyles";
import { AiFillPlusCircle } from "react-icons/ai";
import NewProjectForm from "../../components/NewProjectForm";
import Projects from "../../components/Projects";
import BeProud from "../../components/BeProud";
import Overview from "../../components/Overview";
import format from "date-fns/format";
import dynamic from "next/dynamic";
import {
  StyledFixedButton,
  StyledFinishButton,
} from "../../components/AllStyles";

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
  celebration,
  setCelebration,
  saveEntry,
  handleSaveEntryId,
  showOverview,
  toggleShowOverview,
  clearStartStopArray,
  running,
}) {
  const [projects, setProjects] = useLocalStorageState("projects");
  if (!projects) {
    return null;
  }

  const today = format(new Date(), "dd. MM. yyyy");

  //functions to add, delete and edit a project in the 'projects' array
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

  //functions to add, delete and edit a task's time and/or description within the times array of the 'projects' array
  function handleAddTime(newEntry) {
    const projectEntryToUpdate = projects.find(
      (project) => project.name === newEntry.projectName
    );

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
    } else {
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

  //function to finish for the day which upon the user's confirmation clears times from projects while keeping project names and colours and displays the day overview
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

    if (showForm) {
      toggleShowForm();
    }
    onChangeEditId(0);
    onShowNewTimeForm(0);
    onChangeEditTimeId(0);
    clearStartStopArray();
    toggleShowOverview();
  }

  //needed to avoid server side rendering of confetti component, which needs the viewport's height and width to be displayed correctly
  const { height, width } = dynamic(
    () => import("../../helpers/useWindowSize"),
    {
      ssr: false,
    }
  );

  const Confetti = dynamic(() => import("react-confetti"), {
    ssr: false,
  });

  //functions to display confetti when the day is finished for 5 seconds only
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
      <StyledFinishButton onClick={toggleShowOverview}>
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
        saveEntry={saveEntry}
        handleSaveEntryId={handleSaveEntryId}
        running={running}
      />
      {showOverview && (
        <Overview
          finishDay={finishDay}
          toggleShowOverview={toggleShowOverview}
        />
      )}
    </BaseMain>
  );
}
