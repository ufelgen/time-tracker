import styled from "styled-components";
import { IoMdTrash } from "react-icons/io";
import { BiEdit } from "react-icons/bi";
import {
  BsFillPlayCircleFill,
  BsPauseCircleFill,
  BsStopCircleFill,
} from "react-icons/bs";
import { AiFillPlusCircle } from "react-icons/ai";

export default function Projects({ projects }) {
  if (!projects) {
    return null;
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
          <h2>{project?.name}</h2>
          <div>
            <button type="button">
              <IoMdTrash font-size="5vh" color={project.textColour} />
            </button>
            <button type="button">
              <BiEdit font-size="5vh" color={project.textColour} />
            </button>
            <button type="button">
              <AiFillPlusCircle font-size="5vh" color={project.textColour} />
            </button>
            <button type="button">
              <BsPauseCircleFill font-size="5vh" color={project.textColour} />
            </button>{" "}
            <button type="button">
              <BsFillPlayCircleFill
                font-size="5vh"
                color={project.textColour}
              />
            </button>{" "}
            <button type="button">
              <BsStopCircleFill font-size="5vh" color={project.textColour} />
            </button>
          </div>
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

    h2 {
      padding: 0.5rem;
    }
  }

  div {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    button {
      height: 5vh;
      background-color: transparent;
      border: none;
      margin: 5px;
    }
  }
`;
