const { Material } = require('../models');

const materialData = [

    {
        sku: 'PA0481',
        description: 'Colorante para cemento de 1 kg. azul',
        stock: '500',
        uom: 'KG',
        price: 999.50,
    },
    {
        sku: 'PG3167',
        description: 'Cemento Transparente Extra Reforzado para PVC de 8oz',
        stock: '850',
        uom: 'OZ',
        price: 230.80,
    },
    {
        sku: 'PG4738',
        description: 'Bomba sumergible de acero inoxidable. 1 H.P',
        stock: '50',
        uom: 'PZA',
        price: 8554.00,
    },
    {
        sku: 'EL2176',
        description: 'Varilla para tierra de cobre 5/8 de 3 metros',
        stock: '500',
        uom: 'PZA',
        price: 426.50,
    },
    {
        sku: 'EC2160R',
        description: 'CABLE DE COBRE THHW-LS ROHS CALIBRE 8 ROJO 25 mts',
        stock: '500',
        uom: 'PZA',
        price: 3236.00,
    },
    {
        sku: 'PR6517',
        description: 'Malla borreguera 1.4 m acero galvanizado calibre 11/14.5',
        stock: '300',
        uom: 'PZA',
        price: 2117.00,
    },
    {
        sku: 'SY0022',
        description: 'SellaLack Profesional Secado Rápido Para Madera De 1L',
        stock: '400',
        uom: 'LT',
        price: 200.00,
    },
    {
        sku: 'PG7224',
        description: 'Tinaco vertical tricapa con Sistema Mejor Agua. Capacidad de 1100 litros',
        stock: '100',
        uom: 'PZA',
        price: 4636.00,
    },
    {
        sku: 'PG4402M',
        description: 'Bomba periférica BP-1240 con potencia de ½ H.P.',
        stock: '100',
        uom: 'PZA',
        price: 732.00,
    },
    {
        sku: 'PG4527',
        description: 'Hidroneumático de 150 litros con bomba Jet de 1 H.P',
        stock: '20',
        uom: 'PZA',
        price: 18288.00,
    },
    
];

const seedMaterials = () => Material.bulkCreate(materialData);

module.exports = seedMaterials;
