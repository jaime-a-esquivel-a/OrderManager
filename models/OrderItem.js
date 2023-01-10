const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class OrderItem extends Model {}

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
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'orderitem',
    }
);

module.exports = OrderItem;