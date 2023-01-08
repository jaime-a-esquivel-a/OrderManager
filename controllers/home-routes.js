const router = require('express').Router();
const sequelize = require('../config/connection');
const OrderHeader = require ('../models/OrderHeader');
const OrderStatus = require ('../models/OrderStatus');

//Ruta de home/página de inicio
router.get('/', async (req, res) => {
    try {
        if (!req.session.loggedIn){
            res.render('login', {loggedIn: req.session.loggedIn});
        } else { 
            res.render('home', {
                loggedIn: req.session.loggedIn,
                username: req.session.username
            });
        }
        
    } catch (err) {

        console.log(err);
        res.status(500).json(err);
        
    }
});

router.get('/chartdata', async (req, res) => {

    try {

        let userIdvar = {};

        if(req.session.super != true){
            userIdvar = {user_id: req.session.userid};
        }

        const ordersData = await OrderHeader.findAll({
            where: userIdvar,
            attributes: ["status_id",
                [sequelize.fn("COUNT", sequelize.col("status_id")), "total"],
            ],
            group: "status_id",
            include:[
                {
                    model: OrderStatus,
                },
            ],
        });
        if (!ordersData){
            res.status(404).json({message : "No orders found in database"});
            return;
        }
        res.status(200).json(ordersData);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
            
    }
});

module.exports = router;