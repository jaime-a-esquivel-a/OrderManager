const { Op } = require("sequelize");
const router = require('express').Router();
const Material = require ('../models/Material');
const withAuth = require("../utils/auth");

//Ruta para traer todos los materiales
router.get('/', withAuth, async (req, res) => {
    try{
        const materialsData = await Material.findAll({});
        if (!materialsData){
            res.status(404).json({message : "No materials found in database"});
            return;
        }
        const materials = materialsData.map((material) =>
        material.get({ plain: true })
        );
        for (let i =0; i < materials.length; i++){
            materials[i].super = req.session.super;
        }
        res.render('material', {
            materials,
            loggedIn: req.session.loggedIn,
            super: req.session.super,
        });
    } catch (error){
        res.status(500).json(error);
    }
});

//Ruta para traer un material
router.get('/:sku', withAuth, async (req, res) => {
    try {
        const materialData = await Material.findAll({
            where: {
                sku : {
                    [Op.substring]: req.params.sku
                }
            }
        });
        if (!materialData) {
            res.status(404).json({message : "No material was found with that SKU in database"});
            return;
        }

        //res.status(200).json(materialData);

        const materials = materialData.map((material) =>
            material.get({ plain: true })
        );

        res.render('material', {
            materials,
            loggedIn: req.session.loggedIn
        });

    } catch (error) {
        res.status(500).json(error);
    }
});


//Ruta para crear un nuevo material
router.post('/', withAuth, async (req, res) => {
    /*req.body should look like this
    {
        sku: "CA3456",
        description: "Costal de arena",
        stock: 20,
        uom: "unidades",
        price: 200.40
    }
    */
    if (req.session.super){
        try {
            const newMaterial = await Material.create({
                sku : req.body.sku,
                description : req.body.description,
                stock : req.body.stock,
                uom : req.body.uom,
                price : req.body.price,
            });
            res.status(200).json(newMaterial);
        } catch (error) {
            res.status(500).json(error);
        }
    } else {
        res.json({message : "You don't have permission to create a material"})
    }
    
});

//Ruta para actualizar/modificar un material
router.put('/:sku', withAuth, async (req, res) => {
    if (req.session.super){
        try {
            const updateMaterial = await Material.update(req.body, {
                where: {
                    sku: req.params.sku,
                },
            });
            if (!updateMaterial[0]) {
                res.status(404).json({message : "No material was found with that SKU in database"});
                return;
            }
            res.status(200).json(updateMaterial);
        } catch (error) {
            res.status(500).json(error);
        }
    } else {
        res.json({message : "You don't have permission to update a material"})
    }
});

//Ruta para eliminar un material
router.delete('/:sku', withAuth, async (req, res) => {
    if (req.session.super){
        try {
            const deleteMaterial = await Material.destroy({
                where : {
                    sku : req.params.sku,
                },
            });
            if (!deleteMaterial) {
                res.status(404).json({ message: 'No material was found with that SKU in database' });
                return;
            }
            res.status(200).json(deleteMaterial); 
        } catch (error) {
            res.status(500).json(error);
        }
    } else {
        res.json({message : "You don't have permission to delete a material"})
    }
});

module.exports = router;