//Importar Model y DataTypes de sequelize
const { Model, DataTypes, Sequelize } = require('sequelize');
//Importar conexión de sequelize
const sequelize = require('../config/connection');
//Importar bcrypt
const bcrypt = require('bcrypt');

//Modelo User extiende el Model de sequelize
class User extends Model {
    //Método para verificar la contraseña del usuario
    checkPassword(loginPw){
        return bcrypt.compareSync(loginPw, this.password);
    }

}

//Definir columnas de la tabla user 
User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        first_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        last_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            validate:{
                isEmail: true,
            }
        },
        tel: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
              len: [8],
            },
        },
        superuser: {
            type: DataTypes.BOOLEAN,
        },
    },
    //Definir opciones y hooks
    {
        hooks: {

            beforeCreate: async (newUserData) => { //Hook cuando se crea un user

                newUserData.email = await newUserData.email.toLowerCase(); //Pasar el email a minúsculas

                newUserData.password = await bcrypt.hash(newUserData.password, 10); //Hacer hash de la contraseña

                return newUserData;

            },
            beforeUpdate: async (updatedUserData) =>{ //Hook cuando se actualizar el user

                updatedUserData.email = await updatedUserData.email.toLowerCase(); //Pasar el email a minúsculas
                
                if (updatedUserData.password !== ""){ //Si la contraseña no viene vacía
                    updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10); //Hacer hash de la contraseña
                }
                return updatedUserData;

            }
        },

        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'user',

    }
);

//Exportar modelo User
module.exports = User;