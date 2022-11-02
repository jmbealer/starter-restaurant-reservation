export default function isFutureTime(date, time) {
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
