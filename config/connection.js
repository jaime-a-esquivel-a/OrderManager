//Inicializar sequelize
let Sequelize = require('sequelize');
//Importar dotenv y configurarlo
require('dotenv').config();

//Crear nueva conexión usando las variables de entorno
if (process.env.JAWSDB_URL) {
  sequelize = new Sequelize(process.env.JAWSDB_URL);
} else {
  sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
      host: 'localhost',
      dialect: 'mysql',
      port: 3306
    }
  );
}

//Exportar conexión
module.exports = sequelize;