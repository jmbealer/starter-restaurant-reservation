import React, { useState } from "react";
import { createReservation } from "../utils/api";
import { useHistory } from "react-router-dom";
import ReservationForm from "./ReservationForm";
import ErrorAlert from "../layout/ErrorAlert";

const initialReservation = {
  first_name: "",
  last_name: "",
  mobile_number: "",
  reservation_date: "",
  reservation_time: "",
  people: 1,
  status: "booked",
};

function NewReservation() {
  const [newReservation, setNewReservation] = useState({
    ...initialReservation,
  });
  const history = useHistory();

  const [reservationErrors, setReservationErrors] = useState([]);

  const handleChange = (event) => {
    setNewReservation({
      ...newReservation,
      [event.target.name]: event.target.value,
    });
  };

  // submit for the reservation creation
  const handleSubmit = (event) => {
    event.preventDefault();
    const abortController = new AbortController();

    // validations and errors
    setReservationErrors([]);
    const errors = [];
    const reservationDate = new Date(
      `${newReservation.reservation_date}T${newReservation.reservation_time}:00`
    );
    const [hours, minutes] = newReservation.reservation_time.split(":");
    newReservation.people = Number(newReservation.people);

    if (Date.now() > Date.parse(reservationDate)) {
      errors.push({ message: `The reservation cannot be in the past` });
    }
    if (reservationDate.getDay() === 2) {
      errors.push({ message: `The restaurant is closed on Tuesdays` });
    }
    if ((hours <= 10 && minutes < 30) || hours <= 9) {
      errors.push({ message: `We open at 10:30am` });
    }
    if ((hours >= 21 && minutes > 30) || hours >= 22) {
      errors.push({ message: `We stop accepting reservations after 9:30pm` });
    }
    if (newReservation.people < 1) {
      errors.push({ message: `Reservations must have at least 1 person` });
    }

    setReservationErrors(errors);

    !errors.length &&
      createReservation(newReservation, abortController.signal)
        .then((_) =>
          history.push(`/dashboard?date=${newReservation.reservation_date}`)
        )
        .catch((error) => console.log(error));
    return () => abortController.abort();
  };

  let displayErrors = reservationErrors.map((error) => (
    <ErrorAlert key={error.message} error={error} />
  ));

  return (
    <div>
      <div className="container">
        <h1 className="row dashHeading">Create Reservation</h1>
      </div>
      {displayErrors}
      <ReservationForm
        formName="New Reservation"
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        reservation={newReservation}
      />
    </div>
  );
}

export default NewReservation;
