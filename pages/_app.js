import GlobalStyles from "../components/GlobalStyles";
import useLocalStorageState from "use-local-storage-state";
import { useState } from "react";

function MyApp({ Component, pageProps }) {
  const [projects, setProjects] = useLocalStorageState("projects", {
    defaultValue: [],
  });

  const [editId, setEditId] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [showPopup, setShowPopup] = useState("");
  const [stopwatch, setStopwatch] = useState(false);

  function handleChangeEditId(editId) {
    setEditId(editId);
    console.log(editId);
  }

  function toggleShowForm() {
    setShowForm(!showForm);
  }

  function handleShowPopup(popupId) {
    setShowPopup(popupId);
  }

  function handleShowStopwatch(stopwatchId) {
    setStopwatch(stopwatchId);
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
        showPopup={showPopup}
        onShowPopup={handleShowPopup}
        stopwatch={stopwatch}
        onShowStopwatch={handleShowStopwatch}
      />
    </>
  );
}

export default MyApp;
