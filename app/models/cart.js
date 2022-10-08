'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cart extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Cart.belongsTo(models.Product)
      Cart.belongsTo(models.User)
    }
  }
  Cart.init({
    ProductId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: `Product Id is required`
        },
        notNull: {
          msg: `Product Id is required`
        }
      }
    },
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: `User Id is required`
        },
        notNull: {
          msg: `User Id is required`
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Cart',
  });
  return Cart;
};