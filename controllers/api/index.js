//Importar router de express
const router = require('express').Router();

//Importar las rutas de usuarios
const userRoutes = require('./user-routes');

//Utilizar endpoint /users para las rutas de usuario
router.use('/users', userRoutes);

//Exportar router con rutas de usuarios
module.exports = router;