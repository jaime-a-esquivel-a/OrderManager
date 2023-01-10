//Importar router de express
const router = require('express').Router();
//Importar la conexión de sequelize
const sequelize = require('../config/connection');
//Importar el modelo OrderHeader
const OrderHeader = require ('../models/OrderHeader');
//Importar el modelo OrderStatus
const OrderStatus = require ('../models/OrderStatus');
//Importar la función para validar autorización
const withAuth = require("../utils/auth");

//Ruta de home/página de inicio
router.get('/', async (req, res) => {
    try {
        if (!req.session.loggedIn){ //Si el usuario no ha iniciado sesión
            res.render('login', {loggedIn: req.session.loggedIn}); //Hacer render del view para login
        } else { //Si el usuario inició sesión
            res.render('home', { //Hacer render del view home con la información necesaria
                loggedIn: req.session.loggedIn,
                username: req.session.username
            });
        }
    } catch (err) {
        res.status(500).json(err);
    }
});

//Ruta de inicio sesión
router.get('/login', (req, res) => {
    if (req.session.loggedIn) { //Si el usuario inició sesión
      res.redirect('/'); //Redireccionar a home
      return;
    } 
    //Si el usuario no está conectado
    res.render('login'); //Hacer render del view de login
  });

//GET route to log out
router.get('/logout', (req, res) => {
    res.redirect('/'); //redirect to home
});


//Ruta para traer la información para crear el gráfico
router.get('/chartdata', withAuth, async (req, res) => {
    try {
        let userIdvar = {};
        if(req.session.super != true){ //Si el usuario conectado no es un super user
            userIdvar = {user_id: req.session.userid}; //Definir un objeto con el user id del usuario conectado
        }
        const ordersData = await OrderHeader.findAll({ //Buscar todas las órdenes en la base de datos
            where: userIdvar, //Utilizar el objeto construido dependiendo si es un super user o no
            attributes: ["status_id",
                [sequelize.fn("COUNT", sequelize.col("status_id")), "total"], //Contar el número de órdenes por status_id
            ],
            group: "status_id", //Agrupar por status_id
            include:[
                {
                    model: OrderStatus, //Incluir el modelo OrderStatus para saber el nombre del status
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

//Exportar rutas
module.exports = router;