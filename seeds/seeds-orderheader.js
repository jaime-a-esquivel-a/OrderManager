const { OrderHeader } = require('../models');

const OrderHeaderData = [
    {
        user_id: 1,
        client_id: 1,
        status_id: 1,
        date: 'January 03, 2022 17:00:00'
    },
    {
        user_id: 2,
        client_id: 2,
        status_id: 1,
        date: 'January 04, 2022 17:00:00'
    },
    {
        user_id: 3,
        client_id: 3,
        status_id: 1,
        date: 'January 05, 2022 17:00:00'
    },
    {
        user_id: 4,
        client_id: 4,
        status_id: 1,
        date: 'January 06, 2022 17:00:00'
    }
];

const seedOrderHeaders = () => OrderHeader.bulkCreate(OrderHeaderData);

module.exports = seedOrderHeaders;