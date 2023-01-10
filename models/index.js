//Importar todos los modelos
const User = require('./User');
const Material = require('./Material');
const Client = require('./Client');
const OrderHeader = require('./OrderHeader');
const OrderItem = require('./OrderItem');
const OrderStatus = require('./OrderStatus');


//Crear asociaciones entre User y OrderHeader
User.hasMany(OrderHeader, {
  foreignKey: 'user_id',
});

OrderHeader.belongsTo(User, {
    foreignKey: 'user_id',
});

//Crear asociaciones entre OrderStatus y OrderHeader
OrderStatus.hasMany(OrderHeader, {
    foreignKey: 'status_id',
  });

OrderHeader.belongsTo(OrderStatus,{
    foreignKey: 'status_id',
})

//Crear asociaciones entre Client y OrderHeader
Client.hasMany(OrderHeader, {
    foreignKey: 'client_id',
});

OrderHeader.belongsTo(Client, {
    foreignKey: 'client_id'
});

//Crear asociaciones entre OrderHeader y OrderItem

OrderHeader.hasMany(OrderItem, {
    foreignKey: 'order_id',
    onDelete: 'Cascade',
});

OrderItem.belongsTo(OrderHeader, {
    foreignKey: 'order_id',
});

//Crear asociaciones entre OrderHeader y Material

OrderHeader.belongsToMany(Material,{
    through: OrderItem,
    foreignKey: 'order_id',
    otherKey: 'material_id',
});

Material.belongsToMany(OrderHeader, {
    through: OrderItem,
    foreignKey: 'material_id',
    otherKey: 'order_id',
});

//Exportar todos los modelos con sus asociaciones
module.exports = { User, Material, Client, OrderHeader, OrderStatus, OrderItem };
