const { User } = require('../models');

const userData = [

    {
        first_name: 'Jaime',
        last_name:  'Esquivel',
        email:      'jaime.esquivel@adcos.com',
        tel:        '5532237825',
        password:   '12345678',
    },
    {
        first_name: 'Carolina',
        last_name:  'Cruz',
        email:      'caro21_cruz@hotmail.com',
        tel:        '5532237825',
        password:   '12345678',
    },
    {
        first_name: 'Jorge',
        last_name:  'Ramirez',
        email:      'jorge.ramirezl@adcos.com',
        tel:        '5532237825',
        password:   '12345678',
    },

];

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;