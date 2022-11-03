import React from "react";
import { useHistory } from "react-router";
import { previous, next } from "../utils/date-time";

export default function DateNav({ date }) {
  const history = useHistory();
  let prevDay = previous(date);

  return (
    <>
      <button onClick={() => history.push(`/dashboard?date=${prevDay}`)}>
        Previous
      </button>
      <button onClick={() => history.push(`/dashboard?date=${next(date)}`)}>
        Next
      </button>
    </>
  );
}
