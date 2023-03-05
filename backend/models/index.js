/**
 * In order to use the sequelize cli to perform migrations, a config.json file needs to be present in a config folder
 * Run 'sequelize init:config' in the backend folder
 * Populate the 'development' property of the config object with the database credentials
 * Run 'sequelize db:migrate:undo:all' to empty the database
 * Make any neccessary changes to the model files AND the migration files
 * Run 'sequelize db:migrate' to implement the changes you made
 * NOTE: This process will delete all information currently stored in the database
 */

'use strict';
require('dotenv').config()
const Sequelize = require('sequelize');
const { DataTypes } = Sequelize
const db = {};

// sequelize connection
const sequelize = new Sequelize(process.env.DATABASE_URL);

/* MODEL CREATIONS FROM MODEL FILES */

// FlightPath model
const FlightPath = require('./flight_path')(sequelize, DataTypes)
db[FlightPath.name] = FlightPath

// User model
const User = require('./user')(sequelize, DataTypes)
db[User.name] = User

// Associate models with eachother
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;

module.exports = db;