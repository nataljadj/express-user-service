'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addIndex('user_devices',
      ['device_id'],
      {
        indexName: 'fk_user_device_device1_idx',
        indicesType: 'UNIQUE'
      })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeIndex('user_devices',
      ['device_id'],
      {
        indexName: 'fk_user_device_device1_idx',
        indicesType: 'UNIQUE'
      })
  }
};
