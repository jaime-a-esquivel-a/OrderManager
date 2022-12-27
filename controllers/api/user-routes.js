const router = require('express').Router();
const User = require ('../../models/User');


//Ruta para traer todos los usuarios
router.get('/', async (req, res) => {
    try{
        const usersData = await User.findAll({});
        if (!usersData){
            res.status(404).json({message : "No users found in database"});
            return;
        }
        const users = usersData.map((user) =>
        user.get({ plain: true })
        );
        res.render('createUser', {
            users,
            loggedIn: req.session.loggedIn
        });
    }
    catch (error){
        res.status(500).json(error);
    }

});

//Ruta para traer un usuario
router.get('/:email', async (req, res) => {
    try {
        const userData = await User.findOne({
            where: {
                email : req.params.email,
            }
        });
        if (!userData) {
            res.status(404).json({message : "No user was found with that email in database"});
            return;
        }
        res.status(200).json(userData);
    } catch (error) {
        res.status(500).json(error);
    }
});

//Ruta para crear un nuevo usuario (solo administrador)
router.post('/', async (req, res) => {
    /*req.body should look like this
    {
        first_name : "Jorge",
        last_name: "Ramiez",
        email: "jaanzaldo@hotmail.com",
        tel: 5519281738,
        password: "123456"
    }
    */
    if (req.session.super){
        try {
            const newUser = await User.create({
                first_name : req.body.first_name,
                last_name : req.body.last_name,
                email: req.body.email,
                tel : req.body.tel,
                password: req.body.password,
            });
            res.status(200).json(newUser);
        } catch (error) {
            res.status(500).json(error);
        }
    } else {
        res.json({message : "You don't have permission to create an user"})
    }
});

//Ruta para actualizar/modificar un usuario (solo administrador)
router.put('/:email', async (req, res) => {
    if (req.session.super){
        try {
            const updateUser = await User.update(req.body, {
                where: {
                    email: req.params.email,
                },
            });
            if (!updateUser[0]) {
                res.status(404).json({message : "No user was found with that email in database"});
                return;
            }
            res.status(200).json(updateUser);
        } catch (error) {
            res.status(500).json(error);
        }
    } else {
        res.json({message : "You don't have permission to update an user"})
    }
});

//Ruta para eliminar un usuario (solo administrador)
router.delete('/:email', async (req, res) => {
    if (req.session.super){
        try {
            const deleteUser = await User.destroy({
                where : {
                    email : req.params.email,
                },
            });
            if (!deleteUser) {
                res.status(404).json({ message: 'No user was found with that email in database' });
                return;
            }
            res.status(200).json(deleteUser); 
        } catch (error) {
            res.status(500).json(error);
        }
    } else {
        res.json({message : "You don't have permission to delete an user"})
    }
});

//Ruta para iniciar sesión
router.post('/login', async (req, res) => {
    try {
        const dbUserData = await User.findOne({
          where: {
            email: req.body.email,
          },
        });
    
        if (!dbUserData) {
          res
            .status(400)
            .json({ message: 'No user was found with that email' });
          return;
        }
        const validPassword = await dbUserData.checkPassword(req.body.password);
    
        if (!validPassword) {
          res
            .status(400)
            .json({ message: 'Incorrect password. Please try again!' });
          return;
        }
    
        req.session.save(() => {
          if (dbUserData.dataValues.superuser){
            req.session.super = true;
          }
          req.session.loggedIn = true;
          res
            .status(200)
            .json({ user: dbUserData, message: 'You are now logged in!' });
        });
      } catch (err) {
        console.log(err);
        res.status(500).json(err);
      }
});

//Ruta para cerrar sesión
router.post('/logout', async (req, res) => {
    if (req.session.loggedIn) {
        req.session.destroy(() => {
          res.status(204).end();
        });
      } else {
        res.status(404).end();
      }
});

module.exports = router;

