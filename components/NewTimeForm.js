import styled from "styled-components";
import {
  BsFillCheckCircleFill,
  BsFillArrowLeftCircleFill,
} from "react-icons/bs";
import { nanoid } from "nanoid";

export default function NewTimeForm({
  project,
  onAddTime,
  onShowNewTimeForm,
  time = {},
  onChangeEditTimeId,
  onEditTime,
  editTimeId,
}) {
  const timeHours = ("0" + Math.floor((time.time / 3600000) % 60)).slice(-2);
  const timeMinutes = ("0" + Math.floor((time.time / 60000) % 60)).slice(-2);

  function addTimeManually(event, project) {
    event.preventDefault();
    const hours = event.target.elements.hours.value;
    const minutes = event.target.elements.minutes.value;
    const timeInMilliseconds = hours * 60 * 60 * 1000 + minutes * 60 * 1000;

    const newEntry = {
      projectName: project.name,
      timeObject: {
        id: nanoid(),
        time: timeInMilliseconds,
        description: event.target.elements.description.value,
      },
    };

    if (time.id !== editTimeId) {
      onAddTime(newEntry);
      onShowNewTimeForm(0);
    } else {
      onEditTime(time.id, newEntry);
      onChangeEditTimeId(0);
    }
  }

  function returnFromForm() {
    onShowNewTimeForm(false);
    onChangeEditTimeId(0);
  }
  return (
    <AddTimeManuallyForm onSubmit={(event) => addTimeManually(event, project)}>
      <label htmlFor="description">Beschreibung: </label>
      <input
        name="description"
        id="description"
        className="spanTwo"
        defaultValue={time?.description}
        required
      />
      <label htmlFor="hours">Zeit: </label>
      <input
        type="number"
        name="hours"
        id="hours"
        placeholder="HH"
        defaultValue={timeHours}
        required
      />
      <input
        type="number"
        name="minutes"
        id="minutes"
        placeholder="MM"
        defaultValue={timeMinutes}
        required
      />
      <div>
        <button type="submit">
          <BsFillCheckCircleFill fontSize="5vh" color={project.textColour} />
        </button>
        <button type="button" onClick={returnFromForm}>
          <BsFillArrowLeftCircleFill
            fontSize="5vh"
            color={project.textColour}
          />
        </button>
      </div>
    </AddTimeManuallyForm>
  );
}

const AddTimeManuallyForm = styled.form`
  width: 90%;
  display: grid;

  button {
    height: 5vh;
    background-color: transparent;
    border: none;
    margin: 5px;
  }
`;
