const { Sequelize, DataTypes, Model } = require('sequelize')
const User = require('./user')
const sequelize = new Sequelize(process.env.DATABASE_URL)

class FlightPath extends Model{}

FlightPath.belongsTo(User, {
    foreignKey: 'userId',
    as: 'user'
})

FlightPath.init({
    flightPath_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    }
}, {
    sequelize,
    modelName: 'FlightPath',
    tableName: 'flightPath',
    timestamps: false
})

module.exports = FlightPath