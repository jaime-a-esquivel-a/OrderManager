const bcrypt = require('bcrypt');
const { User } = require('../models');

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

const seedUsers = () => User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
});

module.exports = seedUsers;