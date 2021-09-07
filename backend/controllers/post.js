const Post = require('../models/post');
const fs = require('fs');



exports.getAllPost = (req, res, next) => {
  Post.find()
  .then(posts => res.status(200).json(posts))
  .catch(error => res.status(400).json({ error }));
};

exports.getOnePost = (req, res, next) => {
  Post.findOne({ _id: req.params.id })
      .then(post => res.status(200).json(post))
      .catch(error => res.status(404).json({ error }));
};

exports.createPost = (req, res, next) => {
  const postObject = JSON.parse(req.body.post);
  delete postObject._id;
  const post = new Post({
      ...postObject,
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
      likes: 0,
      dislikes: 0
  });
  post.save()
      .then(() => res.status(201).json({ message: 'Post enregistrée !'}))
      .catch(error => {
          console.log(json({ error }));
          res.status(400).json({ error });
      });
};

exports.modifyPost = (req, res, next) => {
  if (req.file) {
      // si l'image est modifiée, il faut supprimer l'ancienne image dans le dossier /image
      Post.findOne({ _id: req.params.id })
          .then(post => {
              const filename = post.imageUrl.split('/images/')[1];
              fs.unlink(`images/${filename}`, () => {
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

exports.deletePost = (req, res, next) => {
  Post.findOne({ _id: req.params.id })
      .then(post => {
          const filename = post.imageUrl.split('/images/')[1];
          fs.unlink(`images/${filename}`, () => {
              Post.deleteOne({ _id: req.params.id })
                  .then(() => res.status(200).json({ message: 'Post supprimée !'}))
                  .catch(error => res.status(400).json({ error }));
          })
      })
      .catch(error => res.status(500).json({ error }));
};

exports.likePost = (req, res, next) => {
  const userId = req.body.userId;
  const like = req.body.like;
  const postId = req.params.id;
  Post.findOne({ _id: postId })
    .then(posts => {

      const newValues = {
        usersLiked: posts.usersLiked,
        usersDisliked: posts.usersDisliked,
        likes: 0,
        dislikes: 0
      }

      switch (like) {
        case 1:
          newValues.usersLiked.push(userId);
          break;
        case -1:
          newValues.usersDisliked.push(userId);
          break;
        case 0:
          if (newValues.usersLiked.includes(userId)) {

            const index = newValues.usersLiked.indexOf(userId);
            newValues.usersLiked.splice(index, 1);
          } else {

            const index = newValues.usersDisliked.indexOf(userId);
            newValues.usersDisliked.splice(index, 1);
          }
          break;
      };

      newValues.likes = newValues.usersLiked.length;
      newValues.dislikes = newValues.usersDisliked.length;
// check doc faute a SEB XD
      Post.updateOne({ _id: postId }, newValues)
        .then(() => res.status(200).json({ message: 'Post notée !' }))
        .catch(error => res.status(400).json({ error }))
    })
    .catch(error => res.status(500).json({ error }));
};