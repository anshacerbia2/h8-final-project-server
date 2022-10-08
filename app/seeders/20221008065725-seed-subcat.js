'use strict';
const data = require('../data/subcategories.json');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    data.forEach(el => {
      delete el.id
      el.createdAt = el.updatedAt = new Date()
    })
    await queryInterface.bulkInsert('SubCategories', data, {})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('SubCategories', null, {});
  }
};
