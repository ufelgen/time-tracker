import styled from "styled-components";
import { IoMdTrash } from "react-icons/io";
import { BiEdit } from "react-icons/bi";
import { AiFillPlusCircle } from "react-icons/ai";
import { BsFillCheckCircleFill } from "react-icons/bs";
import NewTimePopup from "./NewTimePopup";
import Stopwatch from "./Stopwatch";
import NewTimeForm from "./NewTimeForm";
import StopwatchPtTwo from "./StopwatchPtTwo";

export default function Projects({
  projects,
  onDeleteProject,
  onUpdateProjectName,
  editId,
  onChangeEditId,
  showPopup,
  onShowPopup,
  stopwatch,
  onShowStopwatch,
  newTimeForm,
  onShowNewTimeForm,
  onAddTime,
  onDeleteTime,
  editTimeId,
  onChangeEditTimeId,
  onEditTime,
  today,
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
      <h1>Heute ist der {today}</h1>
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
                    <BsFillCheckCircleFill
                      fontSize="5vh"
                      color={project.textColour}
                    />
                  </button>
                </>
              </EditNameForm>
            ) : (
              <h2 color={project.textColour}>{project?.name}</h2>
            )}
          </div>
          {/*           {stopwatch === project.id && (
            <Stopwatch project={project} onAddTime={onAddTime} />
          )} */}
          {stopwatch === project.id && (
            <StopwatchPtTwo project={project} onAddTime={onAddTime} />
          )}
          {project.times.map((time) => (
            <div key={time.id}>
              {time.id === editTimeId ? (
                <>
                  <NewTimeForm
                    project={project}
                    onAddTime={onAddTime}
                    onShowNewTimeForm={onShowNewTimeForm}
                    time={time}
                    onChangeEditTimeId={onChangeEditTimeId}
                    onEditTime={onEditTime}
                    editTimeId={editTimeId}
                  />
                </>
              ) : (
                <>
                  <span>{time.description}: </span>
                  <span>
                    {("0" + Math.floor((time.time / 3600000) % 60)).slice(-2)}:
                  </span>
                  <span>
                    {("0" + Math.floor((time.time / 60000) % 60)).slice(-2)}:
                  </span>
                  <span>
                    {("0" + Math.floor((time.time / 1000) % 60)).slice(-2)}
                  </span>
                  <span>
                    <button
                      type="button"
                      onClick={() => onDeleteTime(time.id, project.id)}
                    >
                      <IoMdTrash fontSize="3vh" color={project.textColour} />
                    </button>
                  </span>
                  <span>
                    <button
                      type="button"
                      onClick={() => onChangeEditTimeId(time.id)}
                    >
                      <BiEdit fontSize="3vh" color={project.textColour} />
                    </button>
                  </span>
                </>
              )}
            </div>
          ))}
          {newTimeForm === project.id && (
            <NewTimeForm
              project={project}
              onAddTime={onAddTime}
              onShowNewTimeForm={onShowNewTimeForm}
              onChangeEditTimeId={onChangeEditTimeId}
              onEditTime={onEditTime}
              editTimeId={editTimeId}
            />
          )}
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
                onShowNewTimeForm={onShowNewTimeForm}
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
  top: 1vh;
  bottom: 20vh;
  overflow-y: scroll;
  width: 100%;

  article {
    width: 90%;
    margin-bottom: 1rem !important;
    border-radius: 5px;
    padding: 1rem;

    h2 {
      padding: 0.5rem;
    }

    div {
      span {
        button {
          background-color: transparent;
          border: none;
          margin: 5px;
        }
      }
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
    padding-top: 1rem;

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
