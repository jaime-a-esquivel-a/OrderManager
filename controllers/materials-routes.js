//Importar Op de sequelize
const { Op } = require("sequelize");
//Importar router de express
const router = require('express').Router();
//Importar el modelo Material
const Material = require ('../models/Material');
//Importar la función para validar autorización
const withAuth = require("../utils/auth");

//Ruta para traer todos los materiales
router.get('/', withAuth, async (req, res) => {
    try{
        const materialsData = await Material.findAll({}); //Traer todos los materiales de la base de datos
        if (!materialsData){
            res.status(404).json({message : "No materials found in database"});
            return;
        }
        const materials = materialsData.map((material) => //Convertir los datos a plano
        material.get({ plain: true })
        );
        for (let i =0; i < materials.length; i++){ //Agregar el atributo super a la información para saber si el usuario conectado es un super user o no
            materials[i].super = req.session.super;
        }
        res.render('material', { //Hacer render el view material con la información necesaria
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
        const materialData = await Material.findAll({ //Traer todos los materiales de la base de datos donde el SKU coincida total o parcialmente con el parámetro enviado
            where: {
                sku : {
                    [Op.substring]: req.params.sku //Buscar coincidencia total o parcial utilizando el parámetro de SKU
                }
            }
        });
        if (!materialData) {
            res.status(404).json({message : "No material was found with that SKU in database"});
            return;
        }
        const materials = materialData.map((material) => //Convertir los datos a plano
            material.get({ plain: true })
        );
        for (let i =0; i < materials.length; i++){ //Agregar el atributo super a la información para saber si el usuario conectado es un super user o no
            materials[i].super = req.session.super;
        }
        res.render('material', { //Hacer render el view material con la información necesaria
            materials,
            loggedIn: req.session.loggedIn,
            super: req.session.super,
        });

    } catch (error) {
        res.status(500).json(error);
    }
});


//Ruta para crear un nuevo material (solo super user)
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
    if (req.session.super){ //Si el usuario conectado es un super user
        try {
            const newMaterial = await Material.create({ //Crear un material en la base de datos utilizando la información del body
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
    } else { //Si el usuario conectado no es un super user
        res.json({message : "You don't have permission to create a material"})
    }
    
});

//Ruta para actualizar/modificar un material (solo super user)
router.put('/:sku', withAuth, async (req, res) => {
    if (req.session.super){ //Si el usuario conectado es un super user
        try {
            const updateMaterial = await Material.update(req.body, { //Actualizar un material en la base de datos
                where: {
                    sku: req.params.sku, //Usar el SKU del material para actualizarlo
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
    } else { //Si el usuario conectado no es un super user
        res.json({message : "You don't have permission to update a material"})
    }
});

//Ruta para eliminar un material (solo super user)
router.delete('/:sku', withAuth, async (req, res) => {
    if (req.session.super){ //Si el usuario conectado es un super user
        try {
            const deleteMaterial = await Material.destroy({ //Eliminar un material de la base de datos
                where : {
                    sku : req.params.sku, //Usar el SKU del material para eliminarlo
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
    } else { //Si el usuario conectado no es un super user
        res.json({message : "You don't have permission to delete a material"})
    }
});

//Exportar rutas de materiales
module.exports = router;