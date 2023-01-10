//Importar Model y DataTypes de sequelize
const { Model, DataTypes } = require('sequelize');
//Importar conexión de sequelize
const sequelize = require('../config/connection');

//Modelo Material extiende el Model de sequelize
class Material extends Model {}

//Definir columnas de la tabla material
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
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    uom: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
  },
  //Definir opciones
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'material',
  }
);

//Exportar modelo Material
module.exports = Material;