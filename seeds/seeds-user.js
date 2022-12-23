const bcrypt = require('bcrypt');
const { User } = require('../models');

const userData = [

    {
        first_name: 'Jaime',
        last_name:  'Esquivel',
        email:      'JAIME.ESQUIVEL@adcos.com'.toLowerCase(),
        tel:        '5532237825',
        password:   bcrypt.hashSync('12345678', 10),
        superuser:  false,
    },
    {
        first_name: 'Carolina',
        last_name:  'Cruz',
        email:      'caro21_cruz@hotmail.com',
        tel:        '5532237825',
        password:   bcrypt.hashSync('12345678', 10),
        superuser:  false,
    },
    {
        first_name: 'Jorge',
        last_name:  'Ramirez',
        email:      'jorge.ramirezl@adcos.com'.toLowerCase(),
        tel:        '5532237825',
        password:   bcrypt.hashSync('12345678', 10),
        superuser:  false,
    },
    {
        first_name: 'Super',
        last_name:  'User',
        email:      'super.user@om.com'.toLowerCase(),
        tel:        '5532237825',
        password:   bcrypt.hashSync('12345678', 10),
        superuser:  true,
    },

];

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;