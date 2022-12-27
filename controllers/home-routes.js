const router = require('express').Router();

//Ruta de home/página de inicio
router.get('/', async (req, res) => {
    try {
        if (!req.session.loggedIn){
            res.render('login', {loggedIn: req.session.loggedIn});
        } else {
            res.render('home', {loggedIn: req.session.loggedIn});
        }
        

    } catch (err) {

        console.log(err);
        res.status(500).json(err);
        
    }
});

module.exports = router;