import GlobalStyles from "../components/GlobalStyles";
import useLocalStorageState from "use-local-storage-state";
import { useState } from "react";

function MyApp({ Component, pageProps }) {
  //three arrays are stored in the browser's local storage via the useLocalStorageState React library:
  //the 'projects' array contains all the information that is displayed: projects are stored in objects with information about their name, colour, and different tasks with accompanying time (in milliseconds) and descriptions
  //the 'startStopArray' array is continually added to while a timer is running and paused. for this, it temporarily stores the times at which the timer is started, paused or stopped. upon finishing a subtask by stopping the timer and adding a description, this array is cleared.
  //the 'running' array stores the ID of the project in which a timer is currently running and is cleared when the timer is paused or stopped.
  const [projects, setProjects] = useLocalStorageState("projects", {
    defaultValue: [],
  });

  const [startStopArray, setStartStopArray] = useLocalStorageState(
    "startStopArray",
    { defaultValue: [] }
  );

  const [running, setRunning] = useLocalStorageState("running", {
    defaultValue: [],
  });

  //states needed for app logic are stored temporarily via the useState React hook.
  const [editId, setEditId] = useState(0);
  const [showForm, setShowForm] = useState(false);
  const [newTimeForm, setNewTimeForm] = useState(0);
  const [editTimeId, setEditTimeId] = useState(0);
  const [celebration, setCelebration] = useState(false);
  const [saveEntry, setSaveEntry] = useState(0);
  const [showOverview, setShowOverview] = useState(false);

  //setter functions should not be handed down to components, therefore new functions making use of the setters are defined here
  function handleChangeEditId(editId) {
    setEditId(editId);
  }

  function toggleShowForm() {
    setShowForm(!showForm);
  }

  function handleShowNewTimeForm(newTimeFormId) {
    setNewTimeForm(newTimeFormId);
  }

  function handleChangeEditTimeId(timeId) {
    setEditTimeId(timeId);
  }

  function handleSaveEntryId(id) {
    setSaveEntry(id);
  }

  function toggleShowOverview() {
    setShowOverview(!showOverview);
  }

  function clearStartStopArray() {
    setStartStopArray([]);
    setRunning([]);
  }

  return (
    <>
      <GlobalStyles />
      <Component
        {...pageProps}
        showForm={showForm}
        toggleShowForm={toggleShowForm}
        editId={editId}
        onChangeEditId={handleChangeEditId}
        onShowNewTimeForm={handleShowNewTimeForm}
        newTimeForm={newTimeForm}
        editTimeId={editTimeId}
        onChangeEditTimeId={handleChangeEditTimeId}
        celebration={celebration}
        setCelebration={setCelebration}
        saveEntry={saveEntry}
        handleSaveEntryId={handleSaveEntryId}
        showOverview={showOverview}
        toggleShowOverview={toggleShowOverview}
        clearStartStopArray={clearStartStopArray}
        running={running}
      />
    </>
  );
}

export default MyApp;
