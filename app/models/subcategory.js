'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SubCategory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      SubCategory.belongsTo(models.Category)
      SubCategory.hasMany(models.Product)
    }
  }
  SubCategory.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: `SubCategory name is required`
        },
        notNull: {
          msg: `SubCategory name is required`
        }
      }
    },
    CategoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: `Category id is required`
        },
        notNull: {
          msg: `Category id is required`
        }
      }
    }
  }, {
    sequelize,
    modelName: 'SubCategory',
  });
  return SubCategory;
};