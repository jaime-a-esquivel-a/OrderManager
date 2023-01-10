//Importar bcrypt
const bcrypt = require('bcrypt');
//Importar modelo de User
const { User } = require('../models');

//Definir datos a llenar en la tabla user
const userData = [
    {
        first_name: 'Jaime',
        last_name:  'Esquivel',
        email:      'JAIME.ESQUIVEL@adcos.com',
        tel:        '5532237825',
        password:   '12345678',
        superuser:  false,
    },
    {
        first_name: 'Carolina',
        last_name:  'Cruz',
        email:      'caro21_cruz@hotmail.com',
        tel:        '5532237825',
        password:   '12345678',
        superuser:  false,
    },
    {
        first_name: 'Jorge',
        last_name:  'Ramirez',
        email:      'jorge.ramirezl@adcos.com',
        tel:        '5532237825',
        password:   '12345678',
        superuser:  false,
    },
    {
        first_name: 'Super',
        last_name:  'User',
        email:      'super.user@om.com',
        tel:        '5532237825',
        password:   '12345678',
        superuser:  true,
    },

];

const seedUsers = () => User.bulkCreate(userData, { //Función para crear todas las entradas en la base de datos 
    individualHooks: true, //Incluir hooks para pasar el email a minúsculas y hacer hash de la contraseña
    returning: true,
});

module.exports = seedUsers; //Exportar función para crear seeds en la tabla de user