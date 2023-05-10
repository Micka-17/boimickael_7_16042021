const express = require('express');
const router = express.Router();

const auth = require("../middleware/auth");
const userCtrl = require('../controllers/user');

router.post('/signup', userCtrl.signup);

router.post('/login', userCtrl.login);

router.get('/account', auth, userCtrl.getOneUser);

router.put('/user', auth, userCtrl.modifyUser);

router.get('/users', auth, userCtrl.getAllUser);

router.delete('/delete', auth, userCtrl.deleteUser);

router.put('/manageuser/:id', auth, userCtrl.modifyUserById);

module.exports = router;