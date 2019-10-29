const sequelize = require('../lib/sequelize')
const Sequelize = require('sequelize')

const User = sequelize.define('user', {
    userid: {
        type: Sequelize.INTEGER(11),
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    username: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: {
            msg: '已添加'
        }
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE
}, {
    sequelize,
    modelName: 'user'
});

module.exports = User;
