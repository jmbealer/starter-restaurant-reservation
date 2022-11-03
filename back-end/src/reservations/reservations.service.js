const knex = require("../db/connection");

function list(date) {
  return knex("reservations")
    .select("*")
    .whereNot({ status: "finished" })
    .where({ reservation_date: date })
    .orderBy("reservation_time");
}

function read(reservationId) {
  return knex("reservations")
    .select("*")
    .where({ reservation_id: reservationId })
    .first();
}

function create(newReservation) {
  return knex("reservations")
    .insert(newReservation)
    .returning("*")
    .then((createdRecords) => createdRecords[0]);
}

function updateStatus(reservationId, status) {
  return knex("reservations")
    .where({ reservation_id: reservationId })
    .update({ status })
    .returning("*")
    .then((createdRecords) => createdRecords[0]);

}
module.exports = {
  list,
  read,
  create,
  updateStatus,
};
