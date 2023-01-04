//const modelempty = require('../models/index.js');
const seedUsers = require('./seeds-user');
const seedClients = require('./seeds-client');
const seedMaterials = require('./seeds-material');
const seedOrderStatus = require('./seeds-orderstatus');
const seedOrderHeaders = require('./seeds-orderheader');
const seedOrderItems = require('./seeds-orderitem');
const sequelize = require('../config/connection');

const seedAll = async () => {

    await sequelize.sync({ force: true });
    console.log('\n----- DATABASE SYNCED -----\n');

    await seedUsers();
    console.log('\n----- USERS CREATED -----\n');

    await seedClients();
    console.log('\n----- CLIENTS CREATED -----\n');

    await seedMaterials();
    console.log('\n----- MATERIALS CREATED -----\n');

    await seedOrderStatus();
    console.log('\n----- ORDER STATUS CREATED -----\n');

    await seedOrderHeaders();
    console.log('\n----- ORDER HEADER CREATED -----\n');

    await seedOrderItems();
    console.log('\n----- ORDER ITEM CREATED -----\n');

    //modelempty.sync();
  
    process.exit(0);
};
  
seedAll();