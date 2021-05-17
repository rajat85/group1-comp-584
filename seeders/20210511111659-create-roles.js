'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('roles', [{
      id: 1,
      name: "user",
      createdAt: Sequelize.literal('CURRENT_TIMESTAMP'),
      updatedAt: Sequelize.literal('CURRENT_TIMESTAMP')
    }, {
      id: 2,
      name: "moderator",
      createdAt: Sequelize.literal('CURRENT_TIMESTAMP'),
      updatedAt: Sequelize.literal('CURRENT_TIMESTAMP')
    }, {
      id: 3,
      name: "admin",
      createdAt: Sequelize.literal('CURRENT_TIMESTAMP'),
      updatedAt: Sequelize.literal('CURRENT_TIMESTAMP')
    }]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('roles', [{
      id: 1
    }, {
      id: 2
    }, {
      id: 3
    }]);
  }
};
