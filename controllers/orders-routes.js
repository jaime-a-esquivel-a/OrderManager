const router = require('express').Router();
const { OrderHeader, OrderItem, Material, User, Client, OrderStatus } = require('../models');

//Ruta para traer todas las órdenes (header)
router.get('/header', async (req, res) => {
    try{
        const ordersData = await OrderHeader.findAll({
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
            ]
        });
        if (!ordersData){
            res.status(404).json({message : "No orders found in database"});
            return;
        }
        /*const orders = ordersData.map((order) =>
        order.get({ plain: true })
        );
        res.render('orderheader', {
            orders,
            loggedIn: req.session.loggedIn
        });*/
        res.status(200).json(ordersData);
    } catch (error){
        res.status(500).json(error);
    }
});

//Ruta para traer una orden incluyendo sus items
router.get('/:id', async (req, res) => {
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
    try {
        const newOrder = await OrderHeader.create({
            user_id : req.body.user_id,
            client_id : req.body.client_id,
            status_id : req.body.status_id,
            date : req.body.date,
        });
        const orderId = newOrder.dataValues.id;
        console.log(req.body.items);
        const newOrderItems = await OrderItem.bulkCreate([{order_id:orderId, material_id:9, qty:50, price:50},{order_id:orderId, material_id:10, qty:50, price:50}], { returning: true});
        res.status(200).json(newOrderItems);
    } catch (error) {
        res.status(500).json(error);
    }
});

//Ruta para actualizar/modificar una orden
router.put('/', async (req, res) => {
    try {

    } catch (error) {
        
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

module.exports = router;