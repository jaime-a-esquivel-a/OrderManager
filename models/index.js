const User = require('./User');
const Material = require('./Material');
const Client = require('./Client');
const OrderHeader = require('./OrderHeader');
const OrderItem = require('./OrderItem');
const OrderStatus = require('./OrderStatus');


User.hasMany(OrderHeader, {
  foreignKey: 'user_id',
});

Client.hasMany(OrderHeader, {
    foreignKey: 'client_id',
});

OrderHeader.hasMany(OrderItem, {
    foreignKey: 'order_id',
});

OrderItem.belongsTo(OrderHeader, {
    foreignKey: 'order_id',
});
OrderHeader.belongsToMany(Material,{
    through: OrderItem,
    foreignKey: 'material_id',
});
Material.belongsToMany(OrderHeader, {
    through: OrderItem,
    foreignKey: 'order_id',
});

module.exports = { User, Material, Client, OrderHeader, OrderStatus, OrderItem };
