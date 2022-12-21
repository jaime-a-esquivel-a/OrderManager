const User = require('./User');
const Material = require('./Material');
const Client = require('./Client');
const OrderHeader = require('./OrderHeader');
const OrderItem = require('./OrderItem');
const OrderStatus = require('./OrderStatus');


// definitions for User & OrderHeader
User.hasMany(OrderHeader, {
  foreignKey: 'user_id',
});

OrderHeader.belongsTo(User, {
    foreignKey: 'user_id'
});

//--Client & OrderHeader

Client.hasMany(OrderHeader, {
    foreignKey: 'client_id',
});

OrderHeader.belongsTo(Client, {
    foreignKey: 'client_id'
});

//-- OrderHeader & OrderItem

OrderHeader.hasMany(OrderItem, {
    foreignKey: 'order_id',
});

OrderItem.belongsTo(OrderHeader, {
    foreignKey: 'order_id',
});

//-- OrderHeader & Material

OrderHeader.belongsToMany(Material,{
    through: OrderItem,
    foreignKey: 'order_id',
});

Material.belongsToMany(OrderHeader, {
    through: OrderItem,
    foreignKey: 'material_id',
});

module.exports = { User, Material, Client, OrderHeader, OrderStatus, OrderItem };
