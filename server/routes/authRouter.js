const { login, register, getUsers, deleteUser, updateUser, getUser } = require('../controllers/authCon');
const { authMiddleware } = require('../middleware/auth')

const express = require('express');
const router = express.Router();

router.route('/login').post(login)
router.route('/register').post(register)
router.route('/users').get(authMiddleware, getUsers)
router.route('/').get(authMiddleware, getUser)
router.route('/:id').delete(authMiddleware, deleteUser).patch(authMiddleware, updateUser)

module.exports = router;