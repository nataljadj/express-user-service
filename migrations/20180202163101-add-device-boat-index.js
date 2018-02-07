'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addIndex('device_boats',
      ['device_id'],
      {
        indexName: 'fk_device_boat_device1_idx',
        indicesType: 'UNIQUE'
      })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeIndex('device_boats',
      ['device_id'],
      {
        indexName: 'fk_device_boat_device1_idx',
        indicesType: 'UNIQUE'
      })
  }
};
