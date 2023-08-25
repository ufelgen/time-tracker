//central component which renders the different projects with timer and subtasks

import { IoMdTrash } from "react-icons/io";
import { BiEdit } from "react-icons/bi";
import { AiFillPlusCircle } from "react-icons/ai";
import { BsFillCheckCircleFill } from "react-icons/bs";
import NewTimeForm from "./NewTimeForm";
import StopwatchPtTwo from "./StopwatchPtTwo";
import Lottie from "lottie-react";
import penguin from "../public/Lottie/penguin.json";
import {
  ProjectsContainer,
  EditNameForm,
  AnimationContainer,
} from "./AllStyles";

export default function Projects({
  projects,
  onDeleteProject,
  onUpdateProjectName,
  editId,
  onChangeEditId,
  newTimeForm,
  onShowNewTimeForm,
  onAddTime,
  onDeleteTime,
  editTimeId,
  onChangeEditTimeId,
  onEditTime,
  today,
  saveEntry,
  handleSaveEntryId,
  running,
}) {
  if (!projects) {
    return null;
  }

  //function which sends the updated project name to the handleUpdateProjectName function within pages\timer\index.js
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
              </EditNameForm>
            ) : (
              <h2 color={project.textColour}>{project?.name}</h2>
            )}
          </div>
          {running[0] === project.id && (
            <AnimationContainer>
              <Lottie animationData={penguin} loop={true} />
            </AnimationContainer>
          )}
          <StopwatchPtTwo
            project={project}
            onAddTime={onAddTime}
            saveEntry={saveEntry}
            handleSaveEntryId={handleSaveEntryId}
          />
          {project.times.map((time) => (
            <div key={time.id}>
              {time.id === editTimeId ? (
                <NewTimeForm
                  project={project}
                  onAddTime={onAddTime}
                  onShowNewTimeForm={onShowNewTimeForm}
                  time={time}
                  onChangeEditTimeId={onChangeEditTimeId}
                  onEditTime={onEditTime}
                  editTimeId={editTimeId}
                />
              ) : (
                <>
                  <span>{time.description}: </span>
                  <span>
                    {("0" + Math.floor((time.time / 3600000) % 60)).slice(-2)}:
                  </span>
                  <span>
                    {("0" + Math.floor((time.time / 60000) % 60)).slice(-2)}
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
            <button type="button" onClick={() => onShowNewTimeForm(project.id)}>
              <AiFillPlusCircle fontSize="5vh" color={project.textColour} />
            </button>
          </section>
        </article>
      ))}
    </ProjectsContainer>
  );
}
