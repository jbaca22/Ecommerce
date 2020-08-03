// import important parts of sequelize library
const { Model, DataTypes, INTEGER, DECIMAL } = require('sequelize');
// import our database connection from config.js
const sequelize = require('../config/connection');
const { values } = require('sequelize/types/lib/operators');

// Initialize Product model (table) by extending off Sequelize's Model class
class Product extends Model {}

// set up fields and rules for Product model
Product.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
  },
    product_name: {
      type:DataTypes.STRING,
      allowNull: false
    },
    price: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      validate: {
        customValidator(value) {
          if (value !== DECIMAL) {
            throw new Error ("please enter a proper decimal value");
          }
        }
      }
    },
    stock: {
      type:DataTypes.INTEGER,
      allowNull: false,
      set: values.INTEGER,
      defaultValue: 10,
      validate: {
        customValidator(value) {
          if (value === null && value !== INTEGER) {
            throw new Error("please enter a numeric value");
          }
        }
      }
    },
    category_id: {
      type:DataTypes.INTEGER,
      references: {
        model: 'category',
        key: 'id'
      }
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'product',
  }
);

module.exports = Product;
