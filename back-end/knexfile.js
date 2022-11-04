/**
 * Knex configuration file.
 *
 * You will not need to make changes to this file.
 */

require('dotenv').config();
const path = require("path");

const {
  DATABASE_URL="postgres://gfokjeun:taXa5RmrOKKoxeGwvpqYu3WfHs0yOfZY@peanut.db.elephantsql.com/gfokjeun",
  DATABASE_URL_DEVELOPMENT="postgres://xiqzmbna:nEGxA-poRyhfs8axQkj3kOekefxo-Veo@peanut.db.elephantsql.com/xiqzmbna",
  DATABASE_URL_TEST="postgres://ahvjgjkp:AFlqDEQLlMH5rcz_e56Pqy8b2_LH8Gph@peanut.db.elephantsql.com/ahvjgjkp",
  DATABASE_URL_PREVIEW="postgres://wszhifzt:2DsVHaAd8QBL_nYSTSRYsa5P5Mtozyw-@peanut.db.elephantsql.com/wszhifzt",
  DEBUG,
} = process.env;

module.exports = {
  development: {
    client: "postgresql",
    pool: { min: 1, max: 5 },
    connection: DATABASE_URL_DEVELOPMENT,
    migrations: {
      directory: path.join(__dirname, "src", "db", "migrations"),
    },
    seeds: {
      directory: path.join(__dirname, "src", "db", "seeds"),
    },
    debug: !!DEBUG,
  },
  test: {
    client: "postgresql",
    pool: { min: 1, max: 5 },
    connection: DATABASE_URL_TEST,
    migrations: {
      directory: path.join(__dirname, "src", "db", "migrations"),
    },
    seeds: {
      directory: path.join(__dirname, "src", "db", "seeds"),
    },
    debug: !!DEBUG,
  },
  preview: {
    client: "postgresql",
    pool: { min: 1, max: 5 },
    connection: DATABASE_URL_PREVIEW,
    migrations: {
      directory: path.join(__dirname, "src", "db", "migrations"),
    },
    seeds: {
      directory: path.join(__dirname, "src", "db", "seeds"),
    },
    debug: !!DEBUG,
  },
  production: {
    client: "postgresql",
    pool: { min: 1, max: 5 },
    connection: DATABASE_URL,
    migrations: {
      directory: path.join(__dirname, "src", "db", "migrations"),
    },
    seeds: {
      directory: path.join(__dirname, "src", "db", "seeds"),
    },
    debug: !!DEBUG,
  },
};
