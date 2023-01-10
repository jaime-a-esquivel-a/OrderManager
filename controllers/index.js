//Importar router de express
const router = require('express').Router();
//Importar rutas de api
const apiRoutes = require('./api');
//Importar rutas de home
const homeRoutes = require('./home-routes.js');
//Importar rutas de materiales
const materialsRoutes = require('./materials-routes.js');
//Importar rutas de clientes
const clientsRoutes = require('./clients-routes.js');
//Importar rutas de órdenes
const ordersRoutes = require('./orders-routes.js');

//Usar rutas de home con /
router.use('/', homeRoutes);
//Usar rutas de home con /api
router.use('/api', apiRoutes);
//Usar rutas de home con /material
router.use('/material', materialsRoutes);
//Usar rutas de home con /client
router.use('/client', clientsRoutes);
//Usar rutas de home con /order
router.use('/order', ordersRoutes);

//Exportar rutas
module.exports = router;