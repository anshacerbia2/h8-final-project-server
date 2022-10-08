'use strict';
const data = require('../data/locations.json');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    data.forEach(el => {
      el.createdAt = el.updatedAt = new Date()
    })
    await queryInterface.bulkInsert('Locations', data, {})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Locations', null, {});
  }
};
