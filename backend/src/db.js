import { Sequelize } from "sequelize";
// import dotenv from "dotenv";
// const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME } = process.env;

// dotenv.config();

const sequelize = new Sequelize(
  `postgres://eekcprdn:rSppoemibOxXPKW9n55KEbyRZBCeB7vH@surus.db.elephantsql.com/eekcprdn`,
  {
    logging: false, // set to console.log to see the raw SQL queries
    native: false, // lets Sequelize know we can use pg-native for ~30% more speed
  }
);

export default sequelize;
