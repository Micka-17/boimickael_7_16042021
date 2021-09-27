const Sequelize = require("sequelize");

const sequelize = new Sequelize('projet_7', 'root', '', {
    host: 'localhost',
    user: 'root',
    password: '',
    dialect: 'mysql',
    port: 3308
  });

  module.exports = sequelize;