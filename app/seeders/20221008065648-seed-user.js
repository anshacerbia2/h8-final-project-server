'use strict';
const bcrypt = require('bcryptjs');
let data = require('../data/superadmin.json');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    data.forEach(el => {
      el.password = bcrypt.hashSync(el.password, 10)
      el.createdAt = el.updatedAt = new Date()
    })
    await queryInterface.bulkInsert('Users', data, {})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
