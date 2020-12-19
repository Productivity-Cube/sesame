'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addColumn('Events', 'doorId',{
      type: Sequelize.DataTypes.STRING
    })
  },
  down: async (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('Events', 'doorId')
  }
};
