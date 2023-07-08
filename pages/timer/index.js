import styled from "styled-components";
import useLocalStorageState from "use-local-storage-state/src/useLocalStorageState";
import { BaseMain } from "../../components/AllStyles";
import { AiFillPlusCircle } from "react-icons/ai";
import NewProjectForm from "../../components/NewProjectForm";
import Projects from "../../components/Projects";

export default function Timer({
  editing,
  toggleEditing,
  editId,
  onChangeEditId,
  showForm,
  toggleShowForm,
  showPopup,
  onShowPopup,
  stopwatch,
  onShowStopwatch,
}) {
  const [projects, setProjects] = useLocalStorageState("projects");
  if (!projects) {
    return null;
  }

  /*   const [times, setTimes] = useLocalStorageState("times");
  if (!times) {
    return null;
  } */

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
  return (
    <BaseMain>
      <StyledAddButton onClick={toggleShowForm}>
        <AiFillPlusCircle />
      </StyledAddButton>
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
        editing={editing}
        toggleEditing={toggleEditing}
        editId={editId}
        onChangeEditId={onChangeEditId}
        showPopup={showPopup}
        onShowPopup={onShowPopup}
        stopwatch={stopwatch}
        onShowStopwatch={onShowStopwatch}
      />
    </BaseMain>
  );
}

const StyledAddButton = styled.button`
  background-color: transparent;
  color: var(--primary);
  font-size: 7.7vh;
  position: fixed;
  bottom: 12vh;
  right: 1rem;
  border: none;
  z-index: 5;
`;
