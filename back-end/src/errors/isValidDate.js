function isFutureDate(date) {
  let [year, month, day] = date.split("-");

  const reservationDate = new Date(year, month - 1, day, 0, 0, 0);
  const today = new Date();

  return reservationDate >= today;
}

function isValidDate(req, res, next) {
  const { data: { reservation_date } = {} } = req.body;

  const dateToCheck = new Date(reservation_date);
  
  let dateNums = reservation_date.split("-");
  let day = new Date(dateNums[0], dateNums[1] - 1, dateNums[2]).getDay();

  if (isNaN(dateToCheck.getDate())) {
    next({ status: 400, message: `reservation_date is not a valid date` });
  } else if (!isFutureDate(reservation_date)) {
    next({
      status: 400,
      message: `reservation_date must be a date in the future`,
    });
  } else if (day === 2) {
    next({
      status: 400,
      message: `reservation_date is closed becaus it falls on a Tuesday`,
    });
  } else next();
}

module.exports = isValidDate;
