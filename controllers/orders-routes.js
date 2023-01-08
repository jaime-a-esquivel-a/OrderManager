const { Op, where } = require("sequelize");
const router = require('express').Router();
const { OrderHeader, OrderItem, Material, User, Client, OrderStatus } = require('../models');

//Ruta para traer todas las órdenes (header)
router.get('/header', async (req, res) => {

    try{

        let userIdvar = {};

        if(req.session.super != true){
            userIdvar = {user_id: req.session.userid};
        }

        const ordersData = await OrderHeader.findAll({
            where: userIdvar,
            include:[
                {
                    model: OrderStatus,
                },
                {
                    model: User,
                },
                {
                    model: Client,
                },
            ],
        });
        if (!ordersData){
            res.status(404).json({message : "No orders found in database"});
            return;
        }
        const orders = ordersData.map((order) =>
            order.get({ plain: true })
        );

        const statusData = await OrderStatus.findAll({});
        const statusplain = statusData.map((status) =>
            status.get({ plain: true })
        );

        res.render('order', {
            orders,
            statusplain,
            loggedIn: req.session.loggedIn
        });
        //res.status(200).json(ordersData);
    } catch (error){
        res.status(500).json(error);
    }
});

//Ruta para traer una orden incluyendo sus items
router.get('/update/:id', async (req, res) => {
    try {
        const orderData = await OrderHeader.findOne({
            where:{
                id: req.params.id,
            },
            include:[
                {
                    model: OrderStatus,
                },
                {
                    model: OrderItem,
                },
                {
                    model: Material,
                },
                {
                    model: User,
                },
                {
                    model: Client,
                },
            ]
        });
        if (!orderData){
            res.status(404).json({message : "No order was found in database with that id"});
            return;
        }
        const order = orderData.get({ plain: true });
        res.render('updateOrder', {
            order,
            loggedIn: req.session.loggedIn
        });
        //res.status(200).json(orderData);
    } catch (error) {
        res.status(500).json(error);
    }
});

router.get('/addOrder', async (req, res) => {

    try{

        const clientsData = await Client.findAll({});

        if(!clientsData){
            res.status(404).json({message: "No clients found in database"});
            return;
        }

        const clients = clientsData.map((client) =>
            client.get({ plain: true })
        );

        res.render('addOrder', {
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

//Ruta para traer una orden incluyendo sus items
router.get('/display/:id', async (req, res) => {
    try {
        const orderData = await OrderHeader.findOne({
            where:{
                id: req.params.id,
            },
            include:[
                {
                    model: OrderStatus,
                },
                {
                    model: OrderItem,
                },
                {
                    model: Material,
                },
                {
                    model: User,
                },
                {
                    model: Client,
                },
            ]
        });
        if (!orderData){
            res.status(404).json({message : "No order was found in database with that id"});
            return;
        }
        /*const order = orderData.get({ plain: true });
        res.render('orderdetail', {
            order,
            loggedIn: req.session.loggedIn
        });*/
        res.status(200).json(orderData);
    } catch (error) {
        res.status(500).json(error);
    }
});


//Ruta para crear una nueva orden
router.post('/', async (req, res) => {

    console.log(req.body);

    try {
        const newOrder = await OrderHeader.create({
            user_id : req.body.user_id,
            client_id : req.body.client_id,
            status_id : req.body.status_id,
            date : req.body.date,
        });
        const orderId = newOrder.dataValues.id;
        console.log(req.body.items);

        req.body.items.forEach(item => {
            item.order_id = orderId;
        });
        //const newOrderItems = await OrderItem.bulkCreate([{order_id:orderId, material_id:9, qty:50, price:50},{order_id:orderId, material_id:10, qty:50, price:50}], { returning: true});
        const newOrderItems = await OrderItem.bulkCreate(req.body.items);
        res.status(200).json(newOrderItems);
    } catch (error) {
        res.status(500).json(error);
    }
});

//Ruta para actualizar/modificar una orden
router.put('/:id', async (req, res) => {
    try {
        console.log(req.body.items);
        const deletePrevItms = await OrderItem.destroy({
            where: {
                order_id: req.params.id,
            },
        });
        const newItems = await OrderItem.bulkCreate(req.body.items);
        res.status(200).json(newItems);
    } catch (error) {
        res.status(500).json(error);
    }
});

//Ruta para eliminar una orden
router.delete('/:id', async (req, res) => {
    try {
        const deleteOrder = await OrderHeader.destroy({
            where : {
                id : req.params.id,
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
router.get('/materials/:sku', async (req, res) => {

    try {
        const materialsData = await Material.findAll({
            where: {
                sku : {
                    [Op.substring]: req.params.sku
                }
            }
        });

        if (!materialsData) {
            res.status(404).json({message : "No material was found with that SKU in database"});
            return;
        }

       res.status(200).json(materialsData);

    } catch (error) {
        res.status(500).json(error);
    }
});

//Ruta para traer un material a la orden
router.get('/onemat/:id', async (req, res) => {
    try {
        const materialData = await Material.findOne({
            where: {
                id : req.params.id
            }
        });
        if (!materialData) {
            res.status(404).json({message : "No material was found with that ID in database"});
            return;
        }

        res.status(200).json(materialData);

    } catch (error) {
        res.status(500).json(error);
    }
});

//Ruta para actualizar el status en la orden
router.put('/updatestatus/:id', async (req, res) => {
    try {
        const actualStatusId = req.body.status_id;
        const nextStatusId = Number(actualStatusId) + 1;
        req.body.status_id = nextStatusId;
        console.log(req.body);
        const updateOrder = await OrderHeader.update(req.body, {
            where: {
                id: req.params.id,
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

router.get('/status/:status', async (req, res) => {

    try{

        let whereConditions = {};

        if(req.session.super != true){
            whereConditions = {user_id: req.session.userid};
        }

        whereConditions.status_id = req.params.status;

        const ordersData = await OrderHeader.findAll({
            where: whereConditions,
            include:[
                {
                    model: OrderStatus,
                },
                {
                    model: User,
                },
                {
                    model: Client,
                },
            ],
        });
        if (!ordersData){
            res.status(404).json({message : "No orders found in database"});
            return;
        }
        const orders = ordersData.map((order) =>
        order.get({ plain: true })
        );

        const statusData = await OrderStatus.findAll({});
        const statusplain = statusData.map((status) =>
            status.get({ plain: true })
        );

        res.render('order', {
            orders,
            statusplain,
            loggedIn: req.session.loggedIn
        });

    }catch(error){
        res.status(500).json(error);
    }

});

module.exports = router;