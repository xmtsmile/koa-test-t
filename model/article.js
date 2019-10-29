const sequelize = require('../lib/sequelize')
const Sequelize = require('sequelize')

const Article = sequelize.define('article', {
    id: {
        type: Sequelize.INTEGER(11),
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    title: {
        allowNull: false,
        type: Sequelize.STRING(255),
        unique: {
            msg: '已添加'
        }
    },
    author: Sequelize.STRING,
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE,
    readCount: {
        type: Sequelize.INTEGER,
        defaultValue: 0
    },
    summary: Sequelize.STRING,
    content: Sequelize.TEXT
},  {
    sequelize,
    modelName: 'article'
});

module.exports = Article;
