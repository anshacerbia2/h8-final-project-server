'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Location extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Location.belongsTo(models.Product)
    }
  }
  Location.init({
    address: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: `Address is required`
        },
        notNull: {
          msg: `Address is required`
        }
      }
    },
    province: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: `Province is required`
        },
        notNull: {
          msg: `Province is required`
        }
      }
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: `City is required`
        },
        notNull: {
          msg: `City is required`
        }
      }
    },
    postalCode: {
      type: DataTypes.INTEGER,
      allowNull: false,
      notEmpty: {
        msg: `Postal Code is required`
      },
      notNull: {
        msg: `Postal Code is required`
      }
    },
    cityId: DataTypes.INTEGER,
    provId: DataTypes.INTEGER,
    ProductId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      notEmpty: {
        msg: `Postal Code is required`
      },
      notNull: {
        msg: `Postal Code is required`
      }
    }
  }, {
    sequelize,
    modelName: 'Location',
  });
  return Location;
};