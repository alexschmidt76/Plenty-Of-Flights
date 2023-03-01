'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('flight_paths', {
      flight_path_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      aircraft_type: {
        type: Sequelize.STRING,
        allowNull: false
      },
      coords: {
        type: Sequelize.ARRAY(Sequelize.FLOAT),
        allowNull: false
      },
      date_created: {
        type: Sequelize.DATE,
        allowNull: false
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('flight_paths');
  }
};