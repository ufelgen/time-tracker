//component used to either manually add a new subtask with time and description or edit an existing substask's time and/or description

import {
  BsFillCheckCircleFill,
  BsFillArrowLeftCircleFill,
} from "react-icons/bs";
import { nanoid } from "nanoid";
import { AddTimeManuallyForm } from "./AllStyles";

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

  //function to manually add a subtask with time and description within a project
  //this function is reused for editing an existing subtask
  function addTimeManually(event) {
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
    onShowNewTimeForm(0);
    onChangeEditTimeId(0);
  }

  return (
    <AddTimeManuallyForm onSubmit={(event) => addTimeManually(event)}>
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
        min={0}
        max={24}
        required
      />
      <input
        type="number"
        name="minutes"
        id="minutes"
        placeholder="MM"
        defaultValue={timeMinutes}
        min={0}
        max={59}
        required
      />
      <div>
        <button type="button" onClick={returnFromForm}>
          <BsFillArrowLeftCircleFill
            fontSize="5vh"
            color={project.textColour}
          />
        </button>
        <button type="submit">
          <BsFillCheckCircleFill fontSize="5vh" color={project.textColour} />
        </button>
      </div>
    </AddTimeManuallyForm>
  );
}
