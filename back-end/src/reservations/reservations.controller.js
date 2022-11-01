const service = require("./reservations.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const hasProperty = require("../errors/hasProperty");
const isValidDate = require("../errors/isValidDate");
const isValidTime = require("../errors/isValidTime");
const isVaildNumOfPeople = require("../errors/isValidNumOfPeople");

// List handler for reservation resources
async function list(req, res) {
  const { date } = req.query;
  const listOfRes = await service.list(date);

  res.json({
    data: listOfRes,
  });
}

async function create(req, res) {
  const { data } = req.body;
  const createdReservation = await service.create(data);

  res.status(201).json({
    data: createdReservation,
  });
}

module.exports = {
  list: asyncErrorBoundary(list),
  create: [
    hasProperty("first_name"),
    hasProperty("last_name"),
    hasProperty("mobile_number"),
    hasProperty("reservation_date"),
    isValidDate,
    hasProperty("reservation_time"),
    isValidTime,
    hasProperty("people"),
    isVaildNumOfPeople,
    asyncErrorBoundary(create),
  ],
};
