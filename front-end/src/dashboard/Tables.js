import React from "react";
import { finishTable } from "../utils/api";

function Tables({ table, loadDashboard }) {

  // when a reservation completes the meal and leaves the table, this clears out the table making it available again
  function handleFinish() {
    if (
      window.confirm(
        "Is this table ready to seat new guests? This cannot be undone."
      )
    ) {
      finishTable(table.table_id)
        .then(loadDashboard)
        .catch((error) => console.log("error", error));
    }
  }

  return (
    <>
      <tr key={table.table_id}>
        <td className="rowBorder">{table.table_name}</td>
        <td className="rowBorder">{table.capacity}</td>
        <td className="rowBorder" data-table-id-status={table.table_id}>
          {table.reservation_id ? "Occupied" : "Free"}
        </td>
      </tr>
      <tr>
        {table.reservation_id ? (
          <td colSpan="3">
            <button
            type="button"
            className="btn btn-outline-success btn-block"
            data-table-id-finish={table.table_id}
            onClick={handleFinish}
          >
            <span className="oi oi-account-logout"></span>
            &nbsp;&nbsp;&nbsp;Finish
            </button>
          </td>
        ) : (
          <td colSpan="3"></td>
        )}
      </tr>
    </>
  );
}

export default Tables;
