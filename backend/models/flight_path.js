'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class FlightPath extends Model {
    static associate({ User }) {
      // user
      FlightPath.belongsTo(User, {
        foreignKey: "user_id",
        as: "user"
      })
    }
  }
  FlightPath.init({
    flight_path_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    user_id: {
      type:DataTypes.INTEGER,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    aircraft_type: {
      type: DataTypes.STRING,
      allowNull: false
    },
    coords: {
      type: DataTypes.ARRAY(DataTypes.GEOMETRY('POINT')),
      allowNull: false
    },
    date_created: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'FlightPath',
    tableName: 'flight_paths',
    timestamps: false
  });
  return FlightPath;
};