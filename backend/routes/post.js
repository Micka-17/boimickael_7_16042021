const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');
const postCtrl = require('../controllers/post');

router.get('/', auth, postCtrl.getAllPost);

router.get('/:id', auth, postCtrl.getOnePost);

router.post('/post', auth, multer, postCtrl.createPost);

router.put('/:id', auth, postCtrl.modifyPost);

router.delete('/:id', auth, postCtrl.deletePost);

// router.post('/:id/like', auth, postCtrl.likePost);

module.exports = router;