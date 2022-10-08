'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Product.belongsTo(models.SubCategory)
      Product.belongsTo(models.User)
      Product.hasMany(models.Cart) // cek ulang
      Product.hasOne(models.Location)
      Product.hasMany(models.Image)
    }
  }
  Product.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: `Name is required`
        },
        notNull: {
          msg: `Name is required`
        }
      }
    },
    slug: DataTypes.STRING,
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: `Description is required`
        },
        notNull: {
          msg: `Description is required`
        }
      }
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: `Price is required`
        },
        notEmpty: {
          msg: `Price is required`
        }
      }
    },
    mainImg: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: `Main Image is required`
        },
        notNull: {
          msg: `Main Image is required`
        }
      }
    },
    harvestDate: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notNull: {
          msg: `Harvest date is required`
        },
        notEmpty: {
          msg: `Harvest date is required`
        }
      }
    },
    unit: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: `Unit is required`
        },
        notNull: {
          msg: `Unit is required`
        }
      }
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: `Stock is required`
        },
        notEmpty: {
          msg: `Stock is required`
        }
      }
    },
    SubCategoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: `SubCategory is required`
        },
        notEmpty: {
          msg: `SubCategory is required`
        }
      }
    },
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: `User Id is required`
        },
        notEmpty: {
          msg: `User Id is required`
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Product',
  });
  Product.beforeCreate((value) => {
    value.slug = value.name.replaceAll(' ', '-')
  })

  return Product;
};