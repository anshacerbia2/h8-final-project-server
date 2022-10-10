'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class AuctionProduct extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      AuctionProduct.belongsTo(models.User, {foreignKey: 'SellerId', as: `Seller`})
      AuctionProduct.belongsTo(models.User, {foreignKey: 'CustId', as: 'Cust'})
    }
  }
  AuctionProduct.init({
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    initPrice: DataTypes.INTEGER,
    SellerId: DataTypes.INTEGER,
    CustId: DataTypes.INTEGER,
    status: DataTypes.STRING,
    AuctionDate: DataTypes.DATE,
    lastBidPrice: DataTypes.INTEGER,
    paymentStatus: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'AuctionProduct',
  });
  return AuctionProduct;
};