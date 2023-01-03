const { Model, DataTypes, Sequelize } = require('sequelize');
const sequelize = require('../config/connection');
const bcrypt = require('bcrypt');

class User extends Model {

    checkPassword(loginPw){
        return bcrypt.compareSync(loginPw, this.password);
    }

}

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
    {
        hooks: {

            beforeCreate: async (newUserData) => {

                newUserData.email = await newUserData.email.toLowerCase();

                newUserData.password = await bcrypt.hash(newUserData.password, 10);

                return newUserData;

            },
            beforeUpdate: async (updatedUserData) =>{

                updatedUserData.email = await updatedUserData.email.toLowerCase();
                
                if (updatedUserData.password !== ""){
                    updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
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

module.exports = User;