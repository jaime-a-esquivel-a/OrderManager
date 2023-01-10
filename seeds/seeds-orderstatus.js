//Importar modelo de OrderStatus
const { OrderStatus } = require('../models');

//Definir datos a llenar en la tabla orderstatus
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

const seedOrderStatus = () => OrderStatus.bulkCreate(orderStatusData); //Función para crear todas las entradas en la base de datos

module.exports = seedOrderStatus; //Exportar función para crear seeds en la tabla de orderstatus