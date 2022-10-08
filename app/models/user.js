'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Product)
      User.hasMany(models.Order)
      User.hasMany(models.Cart)
    }
  }
  User.init({
    fName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: `Fullname is Required` 
        },
        notEmpty: {
          msg: `Fullname is Required` 
        },
      }
    },
    lName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: `Lastname is Required` 
        },
        notEmpty: {
          msg: `Lastname is Required` 
        },
      }
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        notNull: {
          msg: `Email is Required` 
        },
        notEmpty: {
          msg: `Email is Required` 
        },
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: `Password is Required` 
        },
        notEmpty: {
          msg: `Password is Required` 
        },
      }
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: `Phone Number is Required` 
        },
        notEmpty: {
          msg: `Phone Number is Required` 
        },
      }
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: `Role is Required` 
        },
        notEmpty: {
          msg: `Role is Required` 
        },
      }
    },
    userImg: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: `User Image is Required` 
        },
        notEmpty: {
          msg: `User Image is Required` 
        },
      }
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};