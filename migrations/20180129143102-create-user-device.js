'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('user_devices', {
      user_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        foreignKey: true,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id'
        }
      },
      device_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        foreignKey: true,
        allowNull: false,
        references: {
          model: 'devices',
          key: 'id'
        }
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('user_devices');
  }
};