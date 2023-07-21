import { nanoid } from "nanoid";
import { StyledForm } from "./AllStyles";
import {
  determineLuminance,
  determineTextColour,
} from "../helpers/evaluateColour";

export default function NewProjectForm({ toggleShowForm, onAddNewProject }) {
  function handleSubmit(event) {
    event.preventDefault();

    const tooDark = determineLuminance(
      event.target.elements.projectColour.value
    );
    const textColour = determineTextColour(tooDark);

    const projectName = event.target.elements.projectName.value;
    const projectColour = event.target.elements.projectColour.value;

    const newProject = {
      id: nanoid(),
      name: projectName,
      backgroundColour: projectColour,
      textColour: textColour,
      times: [],
    };
    onAddNewProject(newProject);
    toggleShowForm();
  }
  return (
    <StyledForm onSubmit={(event) => handleSubmit(event)}>
      <label htmlFor="projectName"></label>
      <input
        name="projectName"
        id="projectName"
        placeholder="Neues Projekt"
        required
      />
      <label htmlFor="projectColour"></label>
      <input type="color" name="projectColour" id="projectColour" />
      <div>
        <button type="button" onClick={toggleShowForm}>
          abbrechen
        </button>
        <button type="submit">speichern</button>
      </div>
    </StyledForm>
  );
}
