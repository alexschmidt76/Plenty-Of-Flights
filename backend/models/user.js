const { Sequelize, DataTypes, Model } = require('sequelize')
const FlightPath = require('./flightPath')
const sequelize = new Sequelize(process.env.DATABASE_URL)

class User extends Model{}

User.hasMany(FlightPath, { as: 'flightPaths'})

User.init({
    user_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'User',
    tableName: 'user',
    timestamps: false
})

module.exports = User