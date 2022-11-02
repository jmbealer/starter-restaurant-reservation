function isAfterCurrentTime(date, time) {
  let dateNums = date.split("-");
  let timeNums = time.split(":");
  const today = new Date();
  let reservationDate = new Date(
    dateNums[0],
    dateNums[1] - 1,
    dateNums[2],
    timeNums[0],
    timeNums[1]
  );

  return reservationDate > today;
}

function isValidTime(req, res, next) {
  const { data: { reservation_time, reservation_date } = {} } = req.body;
  let [hours, minutes] = reservation_time.split(":");

  if (
    !hours ||
    !minutes ||
    hours < 0 ||
    hours > 23 ||
    minutes < 0 ||
    minutes > 59
  ) {
    next({ status: 400, message: `reservation_time is not a valid time` });
  } else if (!isAfterCurrentTime(reservation_date, reservation_time)) {
    next({
      status: 400,
      message: `reservation_time must be after the current time`,
    });
  } else if (Number(hours + minutes) < 1030 || Number(hours + minutes) > 2130) {
    next({
      status: 400,
      message: `reservation_time must be between 10:30AM and 9:30PM`,
    });
  } else next();
}

module.exports = isValidTime;
