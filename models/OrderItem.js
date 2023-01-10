//Importar Model y DataTypes de sequelize
const { Model, DataTypes } = require('sequelize');
//Importar conexión de sequelize
const sequelize = require('../config/connection');

//Modelo OrderItem extiende el Model de sequelize
class OrderItem extends Model {}

//Definir columnas de la tabla orderitem
OrderItem.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        order_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'orderheader',
                key: 'id',
            }
        },
        material_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'material',
                key: 'id',
            }
        },
        qty: {
            type: DataTypes.FLOAT,
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
        modelName: 'orderitem',
    }
);

//Exportar modelo OrderItem
module.exports = OrderItem;