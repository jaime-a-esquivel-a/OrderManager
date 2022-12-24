const router = require('express').Router();

//Ruta de home/página de inicio
router.get('/', async (req, res) => {
    try {

        res.render('login', {loggedIn: req.session.loggedIn});

    } catch (err) {

        console.log(err);
        res.status(500).json(err);
        
    }
});



//Ruta de inicio de sesión
router.get('/login', async (req, res) => {
    try {

    } catch (error) {
        
    }
});

module.exports = router;