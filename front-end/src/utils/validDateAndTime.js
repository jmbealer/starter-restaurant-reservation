import { today } from "./date-time";

export function isDuringBusinessHours(time) {
  const newTime = Number(time.replace(":", ""));
  return newTime >= 1030 && newTime <= 2130;
}

export function isFutureDate(date) {
  let [year, month, day] = date.split("-");
  let [todayYear, todayMonth, todayDay] = today().split("-");

  const reservationDate = new Date(year, month - 1, day, 0, 0, 0);
  const todayWithTime = new Date(todayYear, todayMonth - 1, todayDay, 0, 0, 0);

  return reservationDate >= todayWithTime;
}

export function isFutureTime(date, time) {
  let dateNums = date.split("-");
  let timeNums = time.split(":");
  const todaysDate = new Date();
  let reservationDate = new Date(
    dateNums[0],
    dateNums[1] - 1,
    dateNums[2],
    timeNums[0],
    timeNums[1]
  );

  return reservationDate > todaysDate;
}

export function isNotTuesday(date) {
  const dateNums = date.split("-");
  let day = new Date(
    dateNums[0],
    dateNums[1] - 1,
    dateNums[2]
  ).getDay();
  return !(day === 2);
}
