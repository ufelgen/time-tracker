import styled from "styled-components";
import useLocalStorageState from "use-local-storage-state/src/useLocalStorageState";
import { BaseMain } from "../../components/AllStyles";
import { AiFillPlusCircle } from "react-icons/ai";
import NewProjectForm from "../../components/NewProjectForm";
import Projects from "../../components/Projects";

export default function Timer({
  editing,
  onChangeEditId,
  toggleEditing,
  showForm,
  toggleShowForm,
}) {
  const [projects, setProjects] = useLocalStorageState("projects");
  if (!projects) {
    return null;
  }

  const [times, setTimes] = useLocalStorageState("times");

  function handleAddProject(newProject) {
    setProjects([...projects, newProject]);
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
      <Projects projects={projects} />
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
