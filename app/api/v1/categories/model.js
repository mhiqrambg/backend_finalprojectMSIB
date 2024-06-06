const { DataTypes } = require('sequelize');
const sequelize = require('../../../db');

const Categories = sequelize.define(
  'Categories',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = Categories;
