const { Model, Sequelize } = require("sequelize");

class ModelsPost extends Model {}
module.exports = (sequelize, Sequelize) => {
ModelsPost = Post.create({
  lastName: { type: String, required: true },
  firstName: { type: String, required: true },
  description: { type: String, required: true }, 
  imageUrl: { type: String, required: true },
  likes: { type: Number, required: true },
  dislikes: { type: Number, required: true },
  usersLiked: { type: Array, required: true },
  usersDisliked: { type: Array, required: true },
  comment: { type: Number, required: true }
}, { sequelize, modelName: 'ModelsPost' });
};
