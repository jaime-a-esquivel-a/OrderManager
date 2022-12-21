const sequelize = require('../config/connection');
const modelempty = require('../models/index.js');

const seedAll = async () => {
    await sequelize.sync({ force: true });
    console.log('\n----- DATABASE SYNCED -----\n');

    modelempty.sync();
  
    process.exit(0);
};
  
seedAll();