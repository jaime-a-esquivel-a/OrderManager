//Importar Model y DataTypes de sequelize
const { Model, DataTypes } = require('sequelize');
//Importar conexión de sequelize
const sequelize = require('../config/connection');

//Modelo OrderHeader extiende el Model de sequelize
class OrderHeader extends Model {}

//Definir columnas de la tabla orderheader
OrderHeader.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'user',
                key: 'id',
            }
        },
        client_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'client',
                key: 'id',
            }
        },
        status_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'orderstatus',
                key: 'id',
            }
        },
        date: {
            type: DataTypes.DATE,
            allowNull: false,
        }
    },
    //Definir opciones
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'orderheader',
    }
);

//Exportar modelo OrderHeader
module.exports = OrderHeader;