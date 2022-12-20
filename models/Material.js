const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Material extends Model {}

Material.init(
  {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    sku: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    stock: {
        type: DataTypes.DECIMAL,
        allowNull: false,
    },
    uom: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    price: {
        type: DataTypes.DECIMAL,
        allowNull: false,
    },
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'material',
  }
);

module.exports = Material;