import GlobalStyles from "../components/GlobalStyles";
import useLocalStorageState from "use-local-storage-state";
import { useState } from "react";

function MyApp({ Component, pageProps }) {
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

  const [editId, setEditId] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [newTimeForm, setNewTimeForm] = useState(0);
  const [editTimeId, setEditTimeId] = useState(0);
  const [celebration, setCelebration] = useState(false);
  const [saveEntry, setSaveEntry] = useState(0);
  const [showOverview, setShowOverview] = useState(false);

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
      />
    </>
  );
}

export default MyApp;
