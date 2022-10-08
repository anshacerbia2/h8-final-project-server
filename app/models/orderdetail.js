'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class OrderDetail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  OrderDetail.init({
    sellerId: DataTypes.INTEGER,
    sellerName: DataTypes.STRING,
    response: DataTypes.STRING,
    amount: DataTypes.INTEGER,
    orderLists: DataTypes.TEXT,
    OrderId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'OrderDetail',
  });
  return OrderDetail;
};