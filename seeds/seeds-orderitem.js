const { OrderItem } = require('../models');

const OrderItemData = [
    {
        order_id: 1,
        material_id: 1,
        qty: 10,
        price: 10
    },
    {
        order_id: 1,
        material_id: 2,
        qty: 20,
        price: 20
    },
    {
        order_id: 2,
        material_id: 3,
        qty: 10,
        price: 10
    },
    {
        order_id: 2,
        material_id: 4,
        qty: 20,
        price: 20
    },
    {
        order_id: 3,
        material_id: 5,
        qty: 10,
        price: 10
    },
    {
        order_id: 3,
        material_id: 6,
        qty: 20,
        price: 20
    },
    {
        order_id: 4,
        material_id: 7,
        qty: 10,
        price: 10
    },
    {
        order_id: 4,
        material_id: 8,
        qty: 20,
        price: 20
    },
    
];

const seedOrderItems = () => OrderItem.bulkCreate(OrderItemData);

module.exports = seedOrderItems;