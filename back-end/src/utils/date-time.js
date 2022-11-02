// returns date formatted as YYYY-MM-DD
function asDateString(date) {
  return `${date.getFullYear().toString(10)}-${(date.getMonth() + 1)
    .toString(10)
    .padStart(2, "0")}-${date.getDate().toString(10).padStart(2, "0")}`;
}

// returns today's date formatted as YYYY-MM-DD
function today() {
  return asDateString(new Date());
}

module.exports = today;
