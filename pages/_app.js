import GlobalStyles from "../components/GlobalStyles";
import useLocalStorageState from "use-local-storage-state";
import { useState } from "react";

function MyApp({ Component, pageProps }) {
  const [projects, setProjects] = useLocalStorageState("projects", {
    defaultValue: [],
  });

  const [times, setTimes] = useLocalStorageState("times", { defaultValue: [] });

  const [editing, setEditing] = useState(false);
  const [editId, setEditId] = useState("");
  const [showForm, setShowForm] = useState(false);

  function toggleEditing() {
    setEditing(!editing);
  }

  function handleChangeEditId(editId) {
    setEditId(editId);
  }

  function toggleShowForm() {
    setShowForm(!showForm);
  }
  return (
    <>
      <GlobalStyles />
      <Component
        {...pageProps}
        editing={editing}
        toggleEditing={toggleEditing}
        showForm={showForm}
        toggleShowForm={toggleShowForm}
        onChangeEditId={handleChangeEditId}
      />
    </>
  );
}

export default MyApp;
