const { Client } = require('../models');

const ClientData = [
    {
        rfc: 'ICA990101NW4',
        active: true,
        name: 'ICA CONSTRUCTORA SA DE CV',
        address: 'Avenida Patriotismo 201, Piso 7, Col. San Pedro de los Pinos, Benito Juarez, CDMX, CP: 03800',
        tel: '55-4020-8001',
        email: 'informes@ica.com.mx'.toLowerCase(),
    },
    {
        rfc: 'CIC050203FG5',
        active: true,
        name: 'Carso Infraestructura y Construcción, S.A.B. de C.V. (CICSA)',
        address: 'Avenida Revolucion 201, Col. Campestre, Alvaro Obregon, CDMX, CP: 01020',
        tel: '55-5616-5462',
        email: 'informes@cicsa.com.mx'.toLowerCase(),
    },
    {
        rfc: 'OHL070705TW9',
        active: true,
        name: 'OHL México S.A.B. de C.V.',
        address: 'Montes Urales 445, Col. Lomas Virreyes, Miguel Hidalgo, CDMX, CP:11000',
        tel: '55-8842-4100',
        email: 'informes@ohl.com.mx'.toLowerCase(),
    },
    {
        rfc: 'PIN161715AC2',
        active: true,
        name: 'Promotora y Operadora de Infraestructura, S.A.B. de C.V. (PINFRA)',
        address: 'Bosque de Cidros 173, Col. Bosques de las Lomas, Cuajimalpa de Morelos, CDMX, CP: 05120',
        tel: '55-5342-8400',
        email: 'informes@pinfra.com.mx'.toLowerCase(),
    },
    {
        rfc: 'OMC112007KL9',
        active: true,
        name: 'Omega Corp. S.A. de C.V. (Omega Corp.)',
        address: 'Av Cordillera de Los Andes 310, Col. Lomas de Chapultepec III, Miguel Hidalgo, CDMX, CP:11000',
        tel: '55-5000-9090',
        email: 'informes@omega.com.mx'.toLowerCase(),
    },

];

const seedClients = () => Client.bulkCreate(ClientData);

module.exports = seedClients;