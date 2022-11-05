import React, { useState } from "react";
import { createTable } from "../utils/api";
import { useHistory } from "react-router-dom";
import TableForm from "./TableForm";
import "../App.css";
import ErrorAlert from "../layout/ErrorAlert";

const initialTable = {
  table_name: "",
  capacity: "",
};

function NewTable() {
  const [newTable, setNewTable] = useState({
    ...initialTable,
  });
  const [tableErrors, setTableErrors] = useState([]);
  const history = useHistory();

  const handleChange = (event) => {
    setNewTable({
      ...newTable,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formatTable = {
      ...newTable,
      capacity: Number(newTable.capacity),
    };
    setTableErrors([]);
    const errors = [];
    if (newTable.table_name.length < 2) {
      errors.push({ message: `Table name must be at least 2 characters` });
    }
    if (newTable.capacity < 1) {
      errors.push({ message: `Capacity must be at least 1` });
    }

    setTableErrors(errors);
    const abortController = new AbortController();

    !errors.length &&
      createTable(formatTable, abortController.signal)
        .then((_) =>history.push(`/dashboard`))
        .catch((error) => console.log(error));
    return () => abortController.abort();
  };

  let showErrors = tableErrors.map((error) => (
    <ErrorAlert key={error.message} error={error} />
  ));

  return (
    <div>
    <div className="container">
        <h1 className="row dashHeading">New Table</h1>
      </div>
      {showErrors}
      <TableForm
        formName="New Table"
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        tables={newTable}
      />
    </div>
  );
}

export default NewTable;
