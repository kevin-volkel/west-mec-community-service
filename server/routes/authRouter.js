const { login, register, getUser, getUsers, deleteUser, updateUser } = require('../controllers/authCon');
const auth = require('../middleware/auth')

const express = require('express');
const router = express.Router();

router.route('/login').post(login)
router.route('/register').post(register)
router.route('/').get(auth, getUsers)
router.route('/:id').delete(auth, deleteUser).patch(auth, updateUser).get(auth, getUser)

module.exports = router;