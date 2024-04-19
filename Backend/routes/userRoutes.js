const express = require("express");
const router = express.Router();
const { body } = require('express-validator');
const userController = require("../controllers/userController");
const validateRequest = require("../middlewares/validation");

const createUserValidationRules = [body("username").notEmpty().isString()];

router.get('/users/:username', userController.getUserByUsername);
router.get('/users/:username/repos', userController.getUserRepositories);
router.post('/users/new-user', createUserValidationRules, validateRequest, userController.createUser);
router.get("/users/:username/find-mutual-followers", userController.findMutualFollowersForUser);
router.get("/users/search", userController.searchUsers);
router.delete("/users/:username", userController.deleteUserByUsername);
router.put("/users/:username", userController.updateUserByUsername);
router.get("/users/sorted", userController.getAllUsersSortedByField);

module.exports = router;

