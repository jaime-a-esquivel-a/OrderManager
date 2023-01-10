//Importar Op de sequelize
const { Op, where } = require("sequelize");
//Importar router de express
const router = require('express').Router();
//Importar todos los modelos de la base de datos
const { OrderHeader, OrderItem, Material, User, Client, OrderStatus } = require('../models');
//Importar la función para validar autorización
const withAuth = require("../utils/auth");

//Ruta para traer todas los encabezados de órdenes
router.get('/header', withAuth, async (req, res) => {
    try{
        let userIdvar = {};
        if(req.session.super != true){ //Validar si el usuario conectado no es super user
            userIdvar = {user_id: req.session.userid}; //Crear un objeto donde se defina el user id del usuario conectado
        }
        const ordersData = await OrderHeader.findAll({ //Traer todas los encabezados de orden de la base de datos
            where: userIdvar, //Utilizar el objeto creado dependiendo del tipo de usuario conectado
            include:[
                {
                    model: OrderStatus, //Incluir modelo OrderStatus
                },
                {
                    model: User, //Incluir modelo User
                },
                {
                    model: Client, //Incluir modelo Client
                },
            ],
        });
        if (!ordersData){
            res.status(404).json({message : "No orders found in database"});
            return;
        }
        const orders = ordersData.map((order) => //Convertir los datos a plano
            order.get({ plain: true })
        );
        const statusData = await OrderStatus.findAll({}); //Traer todos los status de la base de datos
        const statusplain = statusData.map((status) => //Convertir los datos a plano
            status.get({ plain: true })
        );
        res.render('order', { //Hacer render del view order con la información necesaria
            orders,
            statusplain,
            loggedIn: req.session.loggedIn
        });
    } catch (error){
        res.status(500).json(error);
    }
});

//Ruta para traer una orden incluyendo sus items
router.get('/update/:id', withAuth, async (req, res) => {
    try {
        const orderData = await OrderHeader.findOne({ //Traer una orden de la base de datos
            where:{
                id: req.params.id, //Utilizar el id para traer la orden
            },
            include:[
                {
                    model: OrderStatus, //Incluir modelo OrderStatus
                },
                {
                    model: OrderItem, //Incluir modelo OrderItem
                },
                {
                    model: Material, //Incluir modelo Material
                },
                {
                    model: User, //Incluir modelo User
                },
                {
                    model: Client, //Incluir modelo Client
                },
            ]
        });
        if (!orderData){
            res.status(404).json({message : "No order was found in database with that id"});
            return;
        }
        const order = orderData.get({ plain: true }); //Convertir los datos a plano
        res.render('updateOrder', { //Hacer render del view updateOrder con la información necesaria
            order,
            loggedIn: req.session.loggedIn
        });
    } catch (error) {
        res.status(500).json(error);
    }
});

//Ruta para hacer render del view addOrder
router.get('/addOrder', withAuth, async (req, res) => {
    try{
        const clientsData = await Client.findAll({}); //Traer todos los clientes de la base de datos
        if(!clientsData){
            res.status(404).json({message: "No clients found in database"});
            return;
        }
        const clients = clientsData.map((client) => //Convertir los datos a plano
            client.get({ plain: true })
        );
        res.render('addOrder', { //Hacer render del view addOrder con la información necesaria
            clients,
            loggedIn: req.session.loggedIn,
            username: req.session.username,
            userid: req.session.userid,
        });
    }
    catch (error){
        res.status(500).json(error);
    }

});

//Ruta para desplegar una orden incluyendo sus items
router.get('/display/:id', withAuth, async (req, res) => {
    try {
        const orderData = await OrderHeader.findOne({ //Traer una orden de la base de datos
            where:{
                id: req.params.id, //Encontrar la orden utilizando su id 
            },
            include:[
                {
                    model: OrderStatus, //Incluir modelo OrderStatus
                },
                {
                    model: OrderItem, //Incluir modelo OrderItem
                },
                {
                    model: Material, //Incluir modelo Material
                },
                {
                    model: User, //Incluir modelo User
                },
                {
                    model: Client, //Incluir modelo Client
                },
            ]
        });
        const order = orderData.get({ plain: true }); //Convertir datos a plano
        res.render('displayOrder', { //Hacer render del view displayOrder con la información necesaria
            order,
            loggedIn: req.session.loggedIn
        });
    } catch (error) {
        res.status(500).json(error);
    }
});


//Ruta para crear una nueva orden
router.post('/', withAuth, async (req, res) => {
    try {
        const newOrder = await OrderHeader.create({ //Crear una orden en la base de datos utilizando la información del body
            user_id : req.body.user_id,
            client_id : req.body.client_id,
            status_id : req.body.status_id,
            date : req.body.date,
        });
        const orderId = newOrder.dataValues.id; //Traer el id de la orden recién creada
        req.body.items.forEach(item => { //Incluir el id de la orden en todos los items a crear para la orden
            item.order_id = orderId;
        });
        const newOrderItems = await OrderItem.bulkCreate(req.body.items); //Crear todos los items para la orden recién creada
        res.status(200).json(newOrderItems);
    } catch (error) {
        res.status(500).json(error);
    }
});

//Ruta para actualizar/modificar una orden
router.put('/:id', withAuth, async (req, res) => {
    try {
        const deletePrevItms = await OrderItem.destroy({ //Eliminar todos los items de la orden
            where: {
                order_id: req.params.id, //Utilizar el id de la orden para eliminar los items
            },
        });
        const newItems = await OrderItem.bulkCreate(req.body.items); //Crear los nuevos items de la orden
        res.status(200).json(newItems);
    } catch (error) {
        res.status(500).json(error);
    }
});

//Ruta para eliminar una orden
router.delete('/:id', withAuth, async (req, res) => {
    try {
        const deleteOrder = await OrderHeader.destroy({ //Eliminar el encabezado de la orden de la base de datos
            where : {
                id : req.params.id, //Utilizar el id de la orden para eliminarla
            },
        });
        if (!deleteOrder) {
            res.status(404).json({ message: 'No order was found with that id in database' });
            return;
        }
        res.status(200).json(deleteOrder); 
    } catch (error) {
        res.status(500).json(error);
    }
});

//Ruta para ayudar a una orden a agregar materiales
router.get('/materials/:sku', withAuth, async (req, res) => {
    try {
        const materialsData = await Material.findAll({ //Traer todos los materiales de la base de datos donde el SKU coincida total o parcialmente con el parámetro enviado
            where: {
                sku : {
                    [Op.substring]: req.params.sku //Buscar coincidencia total o parcial utilizando el parámetro de SKU
                }
            }
        });

        if (!materialsData) {
            res.status(404).json({message : "No material was found with that SKU in database"});
            return;
        }

       res.status(200).json(materialsData); //Enviar datos en la respuesta

    } catch (error) {
        res.status(500).json(error);
    }
});

//Ruta para traer un material a la orden
router.get('/onemat/:id', withAuth, async (req, res) => {
    try {
        const materialData = await Material.findOne({ //Traer un material de la base de datos
            where: {
                id : req.params.id //Utilizar el id para encontrar el material
            }
        });
        if (!materialData) {
            res.status(404).json({message : "No material was found with that ID in database"});
            return;
        }

        res.status(200).json(materialData); //Enviar datos en la respuesta

    } catch (error) {
        res.status(500).json(error);
    }
});

//Ruta para actualizar el status en la orden
router.put('/updatestatus/:id', withAuth, async (req, res) => {
    try {
        const actualStatusId = req.body.status_id; //Traer el status actual de la orden
        const nextStatusId = Number(actualStatusId) + 1; //Generar el status siguiente
        req.body.status_id = nextStatusId; //Cambiar el status_id en el body del request
        const updateOrder = await OrderHeader.update(req.body, { //Actualizar el status de la orden en su encabezado utilizando el body
            where: {
                id: req.params.id, //Emplear el id de la orden para actualizar el status
            },
        });
        if(!updateOrder[0]){
            res.status(404).json({message: "No order was found with that ID in database "});
            return;
        }
        res.status(200).json(updateOrder);
    } catch (error) {
        res.status(500).json(error);
    }
});

//Ruta para traer una orden por status
router.get('/status/:status', withAuth, async (req, res) => {
    try{
        let whereConditions = {};
        if(req.session.super != true){ //Validar si el usuario conectado no es super user
            whereConditions = {user_id: req.session.userid}; //Crear un objeto donde se defina el user id del usuario conectado
        }
        whereConditions.status_id = req.params.status; //Modificar objeto de where conditions con el status deseado
        const ordersData = await OrderHeader.findAll({ //Traer todos los encabezados de orden con cierto status id
            where: whereConditions, //Utilizar el status id y/o el user id para traer las órdenes
            include:[
                {
                    model: OrderStatus, //Traer modelo de OrderStatus
                },
                {
                    model: User, //Traer modelo de User
                },
                {
                    model: Client, //Traer modelo de Client
                },
            ],
        });
        if (!ordersData){
            res.status(404).json({message : "No orders found in database"});
            return;
        }
        const orders = ordersData.map((order) => //Convertir datos a plano
        order.get({ plain: true })
        );
        const statusData = await OrderStatus.findAll({}); //Traer todos los status de la base de datos
        const statusplain = statusData.map((status) => //Convertir datos a plano
            status.get({ plain: true })
        );
        res.render('order', { //Hacer render de view order con información necesaria
            orders,
            statusplain,
            loggedIn: req.session.loggedIn
        });

    }catch(error){
        res.status(500).json(error);
    }

});

//Exportar rutas de orden
module.exports = router;