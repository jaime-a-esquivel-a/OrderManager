const router = require('express').Router();

const apiRoutes = require('./api');
const homeRoutes = require('./home-routes.js');
const materialsRoutes = require('./materials-routes.js');
const clientsRoutes = require('./clients-routes.js');
const ordersRoutes = require('./orders-routes.js');

router.use('/', homeRoutes);
router.use('/api', apiRoutes);
router.use('/material', materialsRoutes);
router.use('/client', clientsRoutes);
router.use('/order', ordersRoutes);

module.exports = router;