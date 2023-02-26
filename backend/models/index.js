'use strict';
require('dotenv').config()
const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const { DataTypes } = Sequelize
const process = require('process');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')['development'];
const db = {};

/* let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}  */

const sequelize = new Sequelize(process.env.DATABASE_URL);

const FlightPath = require('./flight_path')(sequelize, DataTypes)
db[FlightPath.name] = FlightPath

const User = require('./user')(sequelize, DataTypes)
db[User.name] = User

/* fs
  .readdirSync(__dirname) 
  .filter(file => {
    console.log(file, basename)
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    console.log(model)
    db[model.name] = model;
  }); */

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
//db.Sequelize = sequelize;

module.exports = db;
