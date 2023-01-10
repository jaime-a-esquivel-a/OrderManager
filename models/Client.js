//Importar Model y DataTypes de sequelize
const { Model, DataTypes } = require('sequelize');
//Importar conexión de sequelize
const sequelize = require('../config/connection');

//Modelo Client extiende el Model de sequelize
class Client extends Model {}

//Definir columnas de la tabla client
Client.init(
  {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    rfc: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    active: {
        type: DataTypes.BOOLEAN, 
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    address: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    tel: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            isEmail: true,
        }
    },
  },
  //Definir opciones y hooks
  {
    hooks: {

        beforeCreate: async (newClientData) => { //Pasar el email a minúsculas cuando se crea un cliente

            newClientData.email = await newClientData.email.toLowerCase();

            return newClientData;

        },
        beforeUpdate: async (updatedClientData) =>{ //Pasar el email a minúsculas cuando se actualiza un cliente

            updatedClientData.email = await updatedClientData.email.toLowerCase();

            return updatedClientData;

        }
    },

    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'client',

  }
);

//Exportar modelo Client
module.exports = Client;