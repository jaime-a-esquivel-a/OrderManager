//Importar Op de sequelize
const { Op } = require("sequelize");
//Importar router de express
const router = require('express').Router();
//Importar el modelo de Client
const Client = require ('../models/Client');
//Importar función para validar autorización
const withAuth = require("../utils/auth");

//Ruta para traer todos los clientes
router.get('/', withAuth, async (req, res) => {
    try {
        const clientsData = await Client.findAll({}); //Traer todos los clientes de la base de datos
        if(!clientsData){
            res.status(404).json({message: "No clients found in database"});
            return;
        }
        const clients = clientsData.map((client) => //Convertir los datos a plano
            client.get({ plain: true })
        );
        for (let i =0; i < clients.length; i++){  //Agregar el atributo super a la información para saber si el usuario conectado es un super user o no
            clients[i].super = req.session.super;
        }
        res.render('client', { //Hacer render del view client con la información necesaria
            clients,
            loggedIn: req.session.loggedIn,
            super: req.session.super,
        });
    } catch (error) {
        res.status(500).json(error);
    }
});

//Ruta para traer un cliente por email
router.get('/email/:email', withAuth, async (req, res) => {
    try {
        const clientData = await Client.findOne({ //Traer un cliente de la base de datos
            where:{
                email: req.params.email, //Utilizar el email para encontrar el cliente
            }
        });
        if(!clientData){
            res.status(404).json({message: "No client was found with that email in database"});
            return;
        }
        res.status(200).json(clientData);
    } catch (error) {
        res.status(500).json(error);
    }
});

//Ruta para traer un cliente por RFC
router.get('/rfc/:rfc', withAuth, async (req, res) => {
    try {
        const clientData = await Client.findAll({ //Traer todos los clientes de la base de datos donde el RFC coincida total o parcialmente con el parámetro enviado
            where:{
                rfc: {
                    [Op.substring]: req.params.rfc //Buscar coincidencia total o parcial utilizando el parámetro de RFC
                }
            }
        });
        if(!clientData){
            res.status(404).json({message: "No client was found with that rfc in database"});
            return;
        }
        const clients = clientData.map((client) => //Convertir los datos a plano
            client.get({ plain: true })
        );
        for (let i =0; i < clients.length; i++){ //Agregar el atributo super a la información para saber si el usuario conectado es un super user o no
            clients[i].super = req.session.super;
        }
        res.render('client', { //Hacer render del view client con la información necesaria
            clients,
            loggedIn: req.session.loggedIn,
            super: req.session.super,
        });
    } catch (error) {
        res.status(500).json(error);
    }
});

//Ruta para crear un nuevo cliente (solo super user)
router.post('/', withAuth, async (req, res) => {
    if (req.session.super){ //Si el usuario conectado es un super user
        try {
            const newClient = await Client.create({ //Crear un cliente en la base de datos utilizando la información del body
                rfc: req.body.rfc,
                active: req.body.active,
                name: req.body.name,
                address: req.body.address,
                tel: req.body.tel,
                email: req.body.email,
            });
            res.status(200).json(newClient);
        } catch (error) {
            res.status(500).json(error);
        }
    } else { //Si el usuario conectado no es un super user
        res.json({message : "You don't have permission to create a client"})
    }
});

//Ruta para actualizar/modificar un cliente (solo super user)
router.put('/:rfc', withAuth, async (req, res) => {
    if (req.session.super){ //Si el usuario conectado es un super user
        try {
            const updateClient = await Client.update(req.body, { //Actualizar un cliente en la base de datos utilizando la información del body
                where: {
                    rfc: req.params.rfc, //Utilizar el RFC para actualizar al cliente
                },
            });

            if(!updateClient[0]){
                res.status(404).json({message: "No client was found with that rfc in database"});
                return;
            }
            res.status(200).json(updateClient);
        } catch (error) {
            res.status(500).json(error);
        }
    } else { //Si el usuario conectado no es un super user
        res.json({message : "You don't have permission to modify a client"})
    }
});

//Ruta para eliminar un cliente (solo super user)
router.delete('/:rfc', withAuth, async (req, res) => {
    if (req.session.super){ //Si el usuario conectado es un super user
        try {
            const deleteClient = await Client.destroy({ //Eliminar el cliente de la base de datos
                where: {
                    rfc: req.params.rfc, //Utilizar el RFC del cliente
                },
            });
            if(!deleteClient){
                res.status(404).json({message: "No client was found with that rfc in database"});
                return;
            }
            res.status(200).json(deleteClient);
        } catch (error) {
            res.status(500).json(error);
        }
    } else { //Si el usuario conectado no es un super user
        res.json({message : "You don't have permission to delete a client"})
    }
});

//Exportar rutas
module.exports = router;