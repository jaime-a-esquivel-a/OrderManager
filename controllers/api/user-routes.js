const router = require('express').Router();
const User = require ('../../models/User');


//Ruta para traer todos los usuarios
router.get('/', async (req, res) => {

    try{

        const usersData = await User.findAll({
            //include: [{model: User}],
        });

        res.status(200).json(usersData);

    }
    catch (err){

        res.status(500).json(err);

    }

});

//Ruta para traer un usuario
router.get('/:id', async (req, res) => {
    try {

    } catch (error) {
        
    }
});

//Ruta para crear un nuevo usuario (solo administrador)
router.post('/', async (req, res) => {
    try {

    } catch (error) {

    }
});

//Ruta para actualizar/modificar un usuario (solo administrador)
router.put('/', async (req, res) => {
    try {

    } catch (error) {
        
    }
});

//Ruta para eliminar un usuario (solo administrador)
router.delete('/', async (req, res) => {
    try {

    } catch (error) {
        
    }
});

//Ruta para iniciar sesión
router.post('/login', async (req, res) => {
    try {

    } catch (error) {
        
    }
});

//Ruta para cerrar sesión
router.post('/logout', async (req, res) => {
    try {

    } catch (error) {
        
    }
});

module.exports = router;

