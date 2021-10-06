const User = require("./User");
const Post = require("./Post");

const loadModel = async () => {
  await Post.belongsTo(User, {
    foreignKey: "User_Id",
    onDelete: "cascade"
  });

}

module.exports = {
  loadModel,
  User,
  Post,
};