import styled from "styled-components";
import { IoMdTrash } from "react-icons/io";
import { BiEdit } from "react-icons/bi";
import { AiFillPlusCircle, AiFillCheckCircle } from "react-icons/ai";
import NewTimePopup from "./NewTimePopup";
import Stopwatch from "./Stopwatch";

export default function Projects({
  projects,
  onDeleteProject,
  onUpdateProjectName,
  editing,
  toggleEditing,
  editId,
  onChangeEditId,
  showPopup,
  onShowPopup,
  stopwatch,
  onShowStopwatch,
}) {
  if (!projects) {
    return null;
  }

  function handleEditProject(event, projectId) {
    event.preventDefault();

    const newProjectName = event.target.elements.projectName.value;
    onUpdateProjectName(newProjectName, projectId);
    onChangeEditId("");
  }

  return (
    <ProjectsContainer>
      {projects.map((project) => (
        <article
          key={project?.id}
          style={{
            background: project?.backgroundColour,
            color: project?.textColour,
          }}
        >
          <div className="fixedHeight">
            {editId === project.id ? (
              <EditNameForm
                onSubmit={(event) => handleEditProject(event, project.id)}
              >
                <>
                  <label htmlFor="projectName"></label>
                  <input
                    name="projectName"
                    id="projectName"
                    defaultValue={project.name}
                  />
                  <button type="submit">
                    <AiFillCheckCircle
                      fontSize="5vh"
                      color={project.textColour}
                    />
                  </button>
                </>
              </EditNameForm>
            ) : (
              <h2>{project?.name}</h2>
            )}
          </div>
          {stopwatch === project.id && <Stopwatch project={project} />}
          <section>
            <button type="button" onClick={() => onDeleteProject(project.id)}>
              <IoMdTrash fontSize="5vh" color={project.textColour} />
            </button>
            <button
              type="button"
              onClick={() => onChangeEditId(project?.id)}
              disabled={editId === project.id}
            >
              <BiEdit fontSize="5vh" color={project.textColour} />
            </button>
            <button type="button" onClick={() => onShowPopup(project.id)}>
              <AiFillPlusCircle fontSize="5vh" color={project.textColour} />
            </button>
            {showPopup === project.id && (
              <NewTimePopup
                onShowStopwatch={onShowStopwatch}
                onShowPopup={onShowPopup}
                project={project}
              />
            )}
          </section>
        </article>
      ))}
    </ProjectsContainer>
  );
}

const ProjectsContainer = styled.section`
  position: fixed;
  top: 10vh;
  bottom: 20vh;
  overflow-y: scroll;
  width: 100%;

  article {
    margin: 0.5rem;
    border-radius: 5px;

    h2 {
      padding: 0.5rem;
    }
  }

  .fixedHeigt {
    height: 4rem;
  }

  section {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    position: relative;

    button {
      height: 5vh;
      background-color: transparent;
      border: none;
      margin: 5px;
    }
  }
`;

const EditNameForm = styled.form`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0 0.5rem;

  input {
    height: 5vh;
  }

  button {
    background-color: transparent;
    border: none;
    margin: 5px;
  }
`;
