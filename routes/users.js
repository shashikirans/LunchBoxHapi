'use strict';

const models = require('../models');
const usersController = require('../controllers/usersController')
const bcrypt = require('bcryptjs');

const usersRoutes = [
  {
    method: "POST",
    path: "/api/users/create",
    handler: usersController.createUser
  },
  {
    method: "GET",
    path: "/api/users",
    handler: usersController.getUser
  },
  {
    method: "POST",
    path: "/api/users/login",
    handler: usersController.loginUser
  }
];

module.exports = usersRoutes;