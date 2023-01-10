//Importar Model y DataTypes de sequelize
const { Model, DataTypes } = require('sequelize');
//Importar conexión de sequelize
const sequelize = require('../config/connection');

//Modelo OrderStatus extiende el Model de sequelize
class OrderStatus extends Model {}

//Definir columnas de la tabla orderstatus 
OrderStatus.init(
  {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
  },
  //Definir opciones
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'orderstatus',
  }
);

//Exportar modelo OrderStatus
module.exports = OrderStatus;