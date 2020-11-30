module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
      uuid: '5de07dca-5073-454b-bf1a-4061ac1f7137',
      login: 'admin',
      password: '2b$10$pE23zlj8HgxfhpvwagXxmu3uPKbpx1ZNmi8Wu5rBJo1DIJvyLg.n6'
    }])
  },
  down: (queryInterface, Sequelize) => {
  }
};
