const Sequelize = require('sequelize');

const sequelize = new Sequelize('koareacttest', 'root', '888888', {
    host: 'localhost',
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});

sequelize.authenticate().then(() => {
    console.log('Connection has been established successfully.');
}).catch(err => {
    console.error('Unable to connect to the database:', err);
});

sequelize.sync(); // Sync all defined models to the DB.

module.exports = sequelize;
