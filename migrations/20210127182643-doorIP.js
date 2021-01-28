'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addColumn('Doors', 'ip',{
      type: Sequelize.DataTypes.STRING
    })
  },
  down: async (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('Doors', 'ip')
  }
};
