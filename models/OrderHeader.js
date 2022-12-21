const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class OrderHeader extends Model {}

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
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'orderheader',
    }
);

module.exports = OrderHeader;