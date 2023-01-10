//Importar Op de sequelize
const { Op } = require("sequelize");
//Importar router de express
const router = require('express').Router();
//Importar el modelo User
const User = require ('../../models/User');
//Importar la función para validar la autorización
const withAuth = require("../../utils/auth");


//Ruta para traer todos los usuarios
router.get('/', withAuth, async (req, res) => {
        try{
            const usersData = await User.findAll({}); //Traer todos los usuarios de la base de datos
            if (!usersData){
                res.status(404).json({message : "No users found in database"});
                return;
            }
            const users = usersData.map((user) => //Convertir los datos a plano
            user.get({ plain: true })
            );
            for (let i =0; i < users.length; i++){ //Agregar el atributo super a la información para saber si el usuario conectado es un super user o no
                users[i].super = req.session.super;
            }
            res.render('user', { //Hacer un render del view user con la información necesaria
                users,
                loggedIn: req.session.loggedIn,
                super : req.session.super,
            });
        }
        catch (error){
            res.status(500).json(error);
        }
});

//Ruta para traer un usuario por email
router.get('/:email', withAuth, async (req, res) => {
    try {
        const userData = await User.findAll({ //Traer todos los usarios de la base de datos donde el email coincida total o parcialmente con el parámetro enviado
            where: {
                email : {
                    [Op.substring]: req.params.email, //Buscar coincidencia total o parcial utilizando el parámetro de email
                }
            }
        });
        if (!userData) {
            res.status(404).json({message : "No user was found with that email in database"});
            return;
        }
        const users = userData.map((user) => //Convertir los datos a plano
            user.get({ plain: true })
        );
        for (let i =0; i < users.length; i++){ //Agregar el atributo super a la información para saber si el usuario conectado es un super user o no
            users[i].super = req.session.super;
        }
        res.render('user', { //Hacer un render del view user con la información necesaria
            users,
            loggedIn: req.session.loggedIn,
            super: req.session.super,
        });

    } catch (error) {
        res.status(500).json(error);
    }
});

//Ruta para crear un nuevo usuario (solo super user)
router.post('/', withAuth, async (req, res) => {
    /*req.body should look like this
    {
        first_name : "Jorge",
        last_name: "Ramiez",
        email: "jaanzaldo@hotmail.com",
        tel: 5519281738,
        password: "123456"
        superuser: false,
    }
    */
    if (req.session.super){ //Si el usuario conectado es un super user
        try {
            const newUser = await User.create({ //Crear un usuario en la base de datos utilizando la información del body
                first_name : req.body.first_name,
                last_name : req.body.last_name,
                email: req.body.email,
                tel : req.body.tel,
                password: req.body.password,
                superuser: req.body.superuser,
            });
            res.status(200).json(newUser);
        } catch (error) {
            res.status(500).json(error);
        }
    } else { //Si el usuario conectado no es un super user
        res.json({message : "You don't have permission to create an user"})
    }
});

//Ruta para actualizar/modificar un usuario (solo super user)
router.put('/:email', withAuth, async (req, res) => {
    if (req.session.super){ //Si el usuario conectado es un super user
        try {
            const updateUser = await User.update(req.body, { //Actualizar el usuario en la base de datos utilizando la información del body
                where: {
                    email: req.params.email, //Actualizar el usuario usando su email
                },
                individualHooks: true //Incluir hooks durante la actualización para hacer hash de la contraseña si esta cambia
            });
            if (!updateUser[0]) {
                res.status(404).json({message : "No user was found with that email in database"});
                return;
            }
            res.status(200).json(updateUser);
        } catch (error) {
            res.status(500).json(error);
        }
    } else { //Si el usuario conectado no es un super user
        res.json({message : "You don't have permission to update an user"})
    }
});

//Ruta para eliminar un usuario (solo super user)
router.delete('/:email', withAuth, async (req, res) => {
    if (req.session.super){ //Si el usuario conectado es un super user
        try {
            const deleteUser = await User.destroy({ //Borrar el usuario de la base de datos
                where : {
                    email : req.params.email, //Borrar el usuario utilizando su email
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
    } else { //Si el usuario conectado no es un super user
        res.json({message : "You don't have permission to delete an user"})
    }
});

//Ruta para iniciar sesión
router.post('/login', async (req, res) => {
    try {
        const dbUserData = await User.findOne({ //Encontrar al usuario en la base de datos
          where: {
            email: req.body.email, //Utilizar el email para buscar el usuario
          },
        });
    
        if (!dbUserData) { //Si no se encontró información
          res
            .status(400)
            .json({ message: 'No user was found with that email' }); //Regresar información indicando que no hay usuarios con ese email
          return;
        }
        //Si se encontró información
        const validPassword = await dbUserData.checkPassword(req.body.password); //Validar la contraseña del usuario
    
        if (!validPassword) { //Si la contraseña fue inválida
          res
            .status(400)
            .json({ message: 'Incorrect password. Please try again!' }); //Enviar mensaje de error
          return;
        }
        //Si la contraseña fue correcta
        req.session.save(() => { //Guardar variables de sesión
          if (dbUserData.dataValues.superuser){ //Si el usuario que se conecta es un super user
            req.session.super = true; //Definir la variable de sesión super con true
          }
          req.session.loggedIn = true; //Definir la variable de sesión loggedIn con true
          req.session.username = dbUserData.first_name + ' ' + dbUserData.last_name; //Definir la variable de sesión username
          req.session.userid = dbUserData.id; //Definir la variable de sesión userid
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
    if (req.session.loggedIn) { //Si el usuario estaba conectado
        req.session.destroy(() => { //Destruir la sesión
          res.status(204).end();
        });
      } else {
        res.status(204).end();
      }
});

//Exportar rutas de usuario
module.exports = router;

