const { OrderStatus } = require('../models');

const orderStatusData = [

    {
        name: 'Quotation',
    },
    {
        name: 'Ordered',
    },
    {
        name: 'Build',
    },
    {
        name: 'Ready',
    },
    {
        name: 'In Transit',
    },
    {
        name: 'Delivered',
    },

];

const seedOrderStatus = () => OrderStatus.bulkCreate(orderStatusData);

module.exports = seedOrderStatus;