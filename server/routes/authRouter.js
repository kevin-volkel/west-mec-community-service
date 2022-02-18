const { login, register, getUser, deleteUser, updateUser } = require('../controllers/authCon');
const auth = require('../middleware/auth')

const express = require('express');
const router = express.Router();

router.route('/login').post(login)
router.route('/register').post(register)
router.route('/').get(auth, getUser)
router.route('/:id').delete(auth, deleteUser).patch(auth, updateUser)

module.exports = router;