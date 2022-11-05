import React, { useEffect, useState } from "react";
import { listReservations, listTables } from "../utils/api";
import { previous, next, today } from "../utils/date-time";
import { useHistory } from "react-router-dom";
import Tables from "./Tables";
import Reservations from "./Reservations";
import ErrorAlert from "../layout/ErrorAlert";

/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
function Dashboard({ date }) {
  const [reservations, setReservations] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);
  const [tables, setTables] = useState([]);
  const [tablesError, setTablesError] = useState(null);
  const history = useHistory();

  useEffect(loadDashboard, [date]);

  function loadDashboard() {
    const abortController = new AbortController();
    setReservationsError(null);
    listReservations({ date }, abortController.signal)
      .then(setReservations)
      .catch(setReservationsError);
    setTablesError(null);
    listTables(abortController.signal).then(setTables).catch(setTablesError);
    return () => abortController.abort();
  }

  // Previous, Today and Next button functionality
  const handlePrevious = (event) => {
    event.preventDefault();
    history.push(`/dashboard?date=${previous(date)}`);
  };

  const handleNext = (event) => {
    event.preventDefault();
    history.push(`/dashboard?date=${next(date)}`);
  };

  const handleToday = (event) => {
    event.preventDefault();
    history.push(`/dashboard?date=${today()}`);
  };

  const tableList = tables.map((table) => (
    <Tables loadDashboard={loadDashboard} key={table.table_id} table={table} />
  ));

  const reservationList = reservations.map((reservation) => (
    <Reservations
      reservations={reservation}
      key={reservation.reservation_id}
      loadDashboard={loadDashboard}
    />
  ));

  return (
    <main>
      <fieldset>
        <div className="container">
          <h1 className="row dashHeading">Dashboard</h1>
        </div>
        <div>
          <h4 className="row dashHeading">Reservations for {date}</h4>
        </div>
      </fieldset>
      <div className="row">
        <div className="btn-group col" role="group" aria-label="Basic example">
          <button
            type="button"
            className="btn btn-info"
            onClick={handlePrevious}
          >
            <span className="oi oi-chevron-left"></span>
            &nbsp;Previous
          </button>
          <button type="button" className="btn btn-info" onClick={handleToday}>
            Today
          </button>
          <button type="button" className="btn btn-info" onClick={handleNext}>
            Next&nbsp;
            <span className="oi oi-chevron-right"></span>
          </button>
        </div>
      </div>
      <div className="d-md-flex">
        <div className="container">
          <ErrorAlert error={reservationsError} />
          <div className="row">
            <div>
              <div>
                <fieldset className="reservations">
                  <table className="table">
                    <thead>
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">NAME</th>
                        <th scope="col">PHONE</th>
                        <th scope="col">DATE</th>
                        <th scope="col">TIME</th>
                        <th scope="col">PEOPLE</th>
                        <th scope="cold">STATUS</th>
                      </tr>
                    </thead>
                    <tbody>{reservationList}</tbody>
                  </table>
                </fieldset>
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <ErrorAlert error={tablesError} />
          <fieldset className="tables">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">TABLE NAME</th>
                  <th scope="col">CAPACITY</th>
                  <th scope="col">STATUS</th>
                </tr>
              </thead>
              <tbody>{tableList}</tbody>
            </table>
          </fieldset>
        </div>
      </div>
    </main>
  );
}

export default Dashboard;
