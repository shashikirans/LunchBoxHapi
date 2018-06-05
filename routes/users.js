'use strict';

const models = require('../models');
const usersController = require('../controllers/usersController')
const bcrypt = require('bcryptjs');

const usersRoutes = [
  {
    method: "POST",
    config: { auth: false },
    path: "/api/users/create",
    handler: usersController.createUser
  },
  {
    method: "GET",
    path: "/api/users",
    config: { auth: 'jwt' },
    handler: usersController.getUser
  },
  {
    method: "POST",
    path: "/api/users/login",
    config: { auth: false },
    handler: usersController.loginUser
  }
];

module.exports = usersRoutes;