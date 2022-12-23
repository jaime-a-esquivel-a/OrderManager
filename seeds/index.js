const modelempty = require('../models/index.js');
const seedUsers = require('./seeds-user');
const sequelize = require('../config/connection');

const seedAll = async () => {

    await sequelize.sync({ force: true });
    console.log('\n----- DATABASE SYNCED -----\n');

    await seedUsers();
    console.log('\n----- USERS CREATED -----\n');

    //modelempty.sync();
  
    process.exit(0);
};
  
seedAll();