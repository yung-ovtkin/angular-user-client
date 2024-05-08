const express = require('express');
const authController = require('../controllers/user.controller');
const { isAuthenticated, authorizeRoles } = require('../middlewares/auth');

const router = express.Router();

router.post('/register', authController.register);

router.post('/login', authController.login);

router.get('/me', isAuthenticated, authController.getUserInfo);

router.patch('/update-user-info', isAuthenticated, authController.updateUserInfo);

router.patch('/update-user-password', isAuthenticated, authController.updateUserPassword);

router.get('/get-all-users', isAuthenticated, authorizeRoles([1]), authController.getAllUsers);

router.patch('/update-user-role', isAuthenticated, authorizeRoles([1]), authController.updateUserRole);

router.delete('/delete-one-user/:id', isAuthenticated, authorizeRoles([1]), authController.deleteOneUser);

module.exports = router;