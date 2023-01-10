//Importar las funciones para crear seeds en cada una de las tablas
const seedUsers = require('./seeds-user');
const seedClients = require('./seeds-client');
const seedMaterials = require('./seeds-material');
const seedOrderStatus = require('./seeds-orderstatus');
const seedOrderHeaders = require('./seeds-orderheader');
const seedOrderItems = require('./seeds-orderitem');
//Importar la conexión de sequelize
const sequelize = require('../config/connection');

//Función para llenar todas las tablas
const seedAll = async () => {

    await sequelize.sync({ force: true }); //Sincronizar modelos con la base de datos
    console.log('\n----- DATABASE SYNCED -----\n');

    await seedUsers(); //Llenar tabla de users
    console.log('\n----- USERS CREATED -----\n');

    await seedClients(); //Llenar tabla de clientes
    console.log('\n----- CLIENTS CREATED -----\n');

    await seedMaterials(); //Llenar tabla de materiales
    console.log('\n----- MATERIALS CREATED -----\n');

    await seedOrderStatus(); //Llenar tabla de status de orden
    console.log('\n----- ORDER STATUS CREATED -----\n');

    await seedOrderHeaders(); //Llenar tabla de encabezados de orden
    console.log('\n----- ORDER HEADER CREATED -----\n');

    await seedOrderItems(); //Llenar tabla de elementos de orden
    console.log('\n----- ORDER ITEM CREATED -----\n');

    process.exit(0); //Salir
};
  
seedAll(); //Llamar función para llenar todas las tablas