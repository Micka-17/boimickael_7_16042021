const Post = require('../models/post');
const User = require('../models/user');
const fs = require('fs');



exports.getAllPost = (req, res, next) => {
  Post.findAll({
    include: ["user"]
  })
    .then(posts => res.status(200).json(posts))
    .catch(error => res.status(400).json({ error }));
};

exports.getOnePost = (req, res, next) => {
  Post.findOne({ _id: req.params.id })
    .then(post => res.status(200).json(post))
    .catch(error => res.status(404).json({ error }));
};

exports.createPost = (req, res, next) => {
  User.findOne({
    attributes: ["id", "email", "lastName", "firstName", "isAdmin", "avatar", "password"],
    where: {
      id: req.token.id
    }
  });
  console.log("req.user.id                                    ");
  console.log(req.user);
  const post = new Post({
    User_Id: req.user.id,
    title: req.body.title,
    description: req.body.description,
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
  });
  post.save()
    .then(() => res.status(201).json({ message: 'Post enregistrée !' }))
    .catch(error => {
      console.log(({ error }));
      res.status(400).json({ error });
    });
};

exports.modifyPost = (req, res, next) => {
  if (req.file) {
    // si l'image est modifiée, il faut supprimer l'ancienne image dans le dossier /image
    Post.findOne({ _id: req.params.id })
      .then(post => {
        const filename = post.imageUrl.split('/images/')[1];
        fs.unlink(__dirname + `/../images/${filename}`, () => {
          // une fois que l'ancienne image est supprimée dans le dossier /image, on peut mettre à jour le reste
          const postObject = {
            ...JSON.parse(req.body.post),
            imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
          }
          Post.updateOne({ _id: req.params.id }, { ...postObject, _id: req.params.id })
            .then(() => res.status(200).json({ message: 'Post modifiée!' }))
            .catch(error => res.status(400).json({ error }));
        })
      })
      .catch(error => res.status(500).json({ error }));
  } else {
    // si l'image n'est pas modifiée
    const postObject = { ...req.body };
    Post.updateOne({ _id: req.params.id }, { ...postObject, _id: req.params.id })
      .then(() => res.status(200).json({ message: 'Post modifiée!' }))
      .catch(error => res.status(400).json({ error }));
  }
};

exports.deletePost = (req, res) => {
  Post.findOne({
    where: { id: req.params.id },
  }).then((Delete) => {
    console.log(Delete);
    if (req.token.id == Delete.User_Id || req.token.id == 1 ) {
    const filename = Delete.imageUrl.split('/images/')[1];
        fs.unlink(__dirname + `/../images/${filename}`,
        (()=> {})
        )
  
    Post.destroy({ where: { id: req.params.id } })
      .then(() => res.status(200).json({ message: 'Post supprimée !' }))
      .catch(error => res.status(400).json({ error: error.message }));
  }
 else {
  return res.status(401).json({ error: 'Ce n\'est pas ton post !!!' });
  }
  })
};