"use strict";
const DataTypes = require('sequelize');

const sequelize = require("../models/connexion");

sequelize.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  }).catch((error) => {
    console.error('Unable to connect to the database:', error);
  });

const User = sequelize.define('User', {
  // Model attributes are defined here
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
    isAlpha: true,
    len: [2, 15]
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
    isAlpha: true,
    len: [2, 15]
  },
  bio: {
    type: DataTypes.STRING,
    allowNull: true,
    isAlpha: true,
  },
  email: {
    type: DataTypes.STRING(64),
    allowNull: false,
    isEmail: true,
    unique: true,
    len: [2, 20],
  },
  password: {
    type: DataTypes.STRING,
    is: /^[0-9a-f]{64}$/i,
    allowNull: false,
    len: [8, 55]
  },
  isModo: {
    type: DataTypes.BOOLEAN,
  },
  isAdmin: {
    type: DataTypes.BOOLEAN,
  },
  isSuperAdmin: {
    type: DataTypes.BOOLEAN,
  },
  avatar: {
    type: DataTypes.INTEGER,
    allowNull: true,
  }
});

(async () => {
  await sequelize.sync({ force: true });
  // Code here
})();

// User.sync({ force: true })

console.log(User === sequelize.models.User);

module.exports = User;
