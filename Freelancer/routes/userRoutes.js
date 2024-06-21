const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

router.post('/register', userController.registerUser);
router.get('/', userController.getAllUsers);
router.get('/:phone', userController.getUserByPhone);
router.put('/:phone', userController.updateUserByPhone);
router.delete('/:phone', userController.deleteUserByPhone);

module.exports = router;
