'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('Doors', {
      uuid: {
        primaryKey: true,
        type: Sequelize.STRING(36),
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      openAt: {
        type: Sequelize.STRING,
      },
      closeAt: {
        type: Sequelize.STRING,
      },
      createdAt: {
        type: Sequelize.DATE,
      },
      updatedAt: {
        type: Sequelize.DATE,
      },
    })
  },
  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Doors');
  }
};
