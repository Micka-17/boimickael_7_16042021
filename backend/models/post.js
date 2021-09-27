"use strict";
const DataTypes = require("sequelize");

const sequelize = require("../models/connexion");

sequelize.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  }).catch((error) => {
    console.error('Unable to connect to the database:', error);
  });

const Post = sequelize.define('Post', {
  // Model attributes are defined here
  title: {
    type: DataTypes.STRING,
    allowNull: true,
    required: true
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true,
    required: true
  },
  image: {
    type: DataTypes.STRING,
    allowNull: true,
    required: true
  },
  comment: {
    type: DataTypes.STRING,
    required: true,
    allowNull: true,
  }
});

(async () => {
  await sequelize.sync({ force: true });
  // Code here
})();

 Post.sync({ force: true })

console.log(Post === sequelize.models.Post);

module.exports = Post;