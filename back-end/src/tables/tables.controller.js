const service = require("./tables.service");
const reservationService = require("../reservations/reservations.service")
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const hasProperties = require("../validations/hasProperties");
const tableIdExists = require("../validations/tableIdExists");

// validations
const REQUIRED_PROPERTIES = ["table_name", "capacity"];
const REQUIRED_PARAMETERS = ["reservation_id"];

const hasRequiredProperties = hasProperties(REQUIRED_PROPERTIES);
const hasRequiredUpdateProperties = hasProperties(REQUIRED_PARAMETERS);

function hasOnlyValidProperties(req, res, next) {
  const { data = {} } = req.body;
  const invalidStatuses = Object.keys(data).filter(
    (field) => ![...REQUIRED_PROPERTIES, "reservation_id"].includes(field)
  );
  if (invalidStatuses.length) {
    return next({
      status: 400,
      message: `Invalid field(s): ${invalidStatuses.join(", ")}`,
    });
  }
  next();
}

async function reservationIdExists(req, res, next) {
  const resId = req.body.data.reservation_id
  const reservation = await reservationService.read(resId);

  if (reservation) {
    res.locals.reservation =  reservation;
    return next();
  }
  return next({
    status: 404,
    message: `${req.body.data.reservation_id} not found`,
  });
}

function hasValidValues(req, res, next) {
  const { table_name, capacity } = req.body.data;

  if (table_name.length < 2) {
    return next({
      status: 400,
      message: "table_name must have at least 2 characters",
    });
  }

  if (typeof capacity !== "number") {
    return next({
      status: 400,
      message: "capacity must be a number",
    });
  }

  if (capacity < 1) {
    return next({
      status: 400,
      message: "capacity must be at least 1",
    });
  }
  next();
}

function validateTableIsUnoccupied(req, res, next) {
  const { people } = res.locals.reservation;
  const { reservation_id, capacity } = res.locals.tables;

  if (reservation_id != null) {
    return next({
      status: 400,
      message: "table is occupied",
    });
  }

  if (people > capacity) {
    return next({
      status: 400,
      message: "reservation is greater than table capacity",
    });
  }
  next();
}

function validateTableIsOccupied(req, res, next) {
  const occupied = res.locals.tables.reservation_id;

  if (!occupied) {
    return next({
      status: 400,
      message: "table is not occupied",
    });
  }
  next();
}

async function resIsSeated(req, res, next){
  const reservation = await reservationService.read(req.body.data.reservation_id)

  if(reservation.status === "seated"){
    return next({
      status: 400,
      message: "reservation is already seated"
    })
  }
  next();
}

// functions to list, create, and update
async function list(req, res) {
  const tables = await service.list();
  res.json({ data: tables });
}

async function create(req, res) {
  const table = await service.create(req.body.data);
  res.status(201).json({ data: table });
}

async function seat(req, res) {
  const { table_id } = req.params;
  const { reservation_id } = req.body.data;
  const data = await service.seated(reservation_id, table_id);
  res.status(200).json({ data });
}

async function finish(req, res) {
  const { table_id } = req.params;
  const { reservation_id } = res.locals.tables;
 const data =  await service.finished(table_id, reservation_id);
  res.status(200).json({ data});
}

module.exports = {
  list: [asyncErrorBoundary(list)],
  create: [
    hasOnlyValidProperties,
    hasRequiredProperties,
    hasValidValues,
    asyncErrorBoundary(create),
  ],
  seat: [
    hasRequiredUpdateProperties,
    asyncErrorBoundary(reservationIdExists),
    asyncErrorBoundary(tableIdExists),
    asyncErrorBoundary(resIsSeated),
    validateTableIsUnoccupied,
    asyncErrorBoundary(seat),
  ],
  finish: [
    asyncErrorBoundary(tableIdExists),
    validateTableIsOccupied,
    asyncErrorBoundary(finish),
  ],
};
