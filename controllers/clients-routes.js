const { Op } = require("sequelize");
const router = require('express').Router();
const Client = require ('../models/Client');
const withAuth = require("../utils/auth");

//Ruta para traer todos los clientes
router.get('/', withAuth, async (req, res) => {
    try {

        const clientsData = await Client.findAll({});

        if(!clientsData){
            res.status(404).json({message: "No clients found in database"});
            return;
        }

        const clients = clientsData.map((client) =>
            client.get({ plain: true })
        );

        for (let i =0; i < clients.length; i++){
            clients[i].super = req.session.super;
        }
        res.render('client', {
            clients,
            loggedIn: req.session.loggedIn,
            super: req.session.super,
        });

        //res.status(200).json(clientsData);

    } catch (error) {
        res.status(500).json(error);
    }
});

//Ruta para traer un cliente por email
router.get('/email/:email', withAuth, async (req, res) => {
    try {

        const clientData = await Client.findOne({
            where:{
                email: req.params.email,
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

        const clientData = await Client.findAll({
            where:{
                rfc: {
                    [Op.substring]: req.params.rfc
                }
            }
        });

        if(!clientData){
            res.status(404).json({message: "No client was found with that rfc in database"});
            return;
        }

        //res.status(200).json(clientData);

        const clients = clientData.map((client) =>
            client.get({ plain: true })
        );

        for (let i =0; i < clients.length; i++){
            clients[i].super = req.session.super;
        }

        res.render('client', {
            clients,
            loggedIn: req.session.loggedIn,
            super: req.session.super,
        });

    } catch (error) {
        res.status(500).json(error);
    }
});

//Ruta para crear un nuevo cliente
router.post('/', withAuth, async (req, res) => {
    if (req.session.super){
        try {
            const newClient = await Client.create({
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
    } else {
        res.json({message : "You don't have permission to create a client"})
    }
});

//Ruta para actualizar/modificar un cliente
router.put('/:rfc', withAuth, async (req, res) => {
    if (req.session.super){
        try {
            const updateClient = await Client.update(req.body, {
                where: {
                    rfc: req.params.rfc,
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
    } else {
        res.json({message : "You don't have permission to modify a client"})
    }
});

//Ruta para eliminar un cliente
router.delete('/:rfc', withAuth, async (req, res) => {
    if (req.session.super){
        try {

            const deleteClient = await Client.destroy({
                where: {
                    rfc: req.params.rfc,
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
    } else {
        res.json({message : "You don't have permission to delete a client"})
    }
});

module.exports = router;