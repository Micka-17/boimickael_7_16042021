const bcrypt = require('bcrypt');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const Post = require('../models/post');

exports.signup = (req, res, next) => {
  bcrypt.hash(req.body.password, 10)
    .then(hash => {
      console.log(req.body);
      const user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: hash,
        isAdmin: false
      });
      const token =
        "Bearer " +
        jwt.sign({ id: user.id }, "SECRET_KEY", { expiresIn: "2H" });
      user.save()
        .then(() => res.status(201).json({
          message: 'Utilisateur créé !',
          token,
          user_id: user.id,
          email: user.email,
          username: user.username,
          isAdmin: user.isAdmin,
          role: user.role,
          token
        }))
        .catch(error => res.status(400).json({ error }));
    })
    .catch(error => res.status(500).json(console.log(error)));
};

exports.login = (req, res, next) => {
  User.findOne({
    where: {
      email: req.body.email
    }
  })
    .then(user => {
      if (!user) {
        return res.status(400).json({ error: 'Utilisateur non trouvé !' });
      }
      bcrypt.compare(req.body.password, user.password)
        .then(valid => {
          if (!valid) {
            return res.status(401).json({ error: 'Mot de passe incorrect !' });
          }
          res.status(200).json({
            id: user.id,
            token: jwt.sign(
              { id: user.id },
              'RANDOM_TOKEN_SECRET',
              { expiresIn: '2h' }
            )
          });
        })
        .catch(error => res.status(501).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};


exports.getOneUser = (req, res, next) => {
  User.findOne({
    attributes: ["id", "email", "lastName", "firstName", "isAdmin", "avatar", "password"],
    where: {
      id: req.token.id
    }
  }).then(post => res.status(200).json(post))
    .catch(error => res.status(404).json({ error }));
};

exports.deleteUser = (req, res, next) => {
  const posts = Post.destroy({
    where: {
      User_Id: req.token.id
    }
  }).then(() => {
    return User.destroy({ where: { id: req.token.id } });
  }).then(() => {
    res.status(200).json({ messageRetour: "utilisateur supprimé" });
  })
}

exports.modifyUser = (req, res, next) => {
  if (req.file) {
    // si l'image est modifiée, il faut supprimer l'ancienne image dans le dossier /image
    User.findOne({ _id: req.params.id })
      .then(user => {
        const filename = user.imageUrl.split('/images/')[1];
        fs.unlink(`images/${filename}`, () => {
          // une fois que l'ancienne image est supprimée dans le dossier /image, on peut mettre à jour le reste
          const userObject = {
            ...JSON.parse(req.body.user),
            imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
          }
          User.updateOne({ _id: req.params.id }, { ...userObject, _id: req.params.id })
            .then(() => res.status(200).json({ message: 'user modifiée!' }))
            .catch(error => res.status(400).json({ error }));
        })
      })
      .catch(error => res.status(500).json({ error }));
  } else {
    // si l'image n'est pas modifiée
    const userObject = { ...req.body };
    User.updateOne({ _id: req.params.id }, { ...userObject, _id: req.params.id })
      .then(() => res.status(200).json({ message: 'user modifiée!' }))
      .catch(error => res.status(400).json({ error }));
  }
};