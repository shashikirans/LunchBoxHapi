'use strict';

const models = require('../models');
const usersController = require('../controllers/usersController')
const bcrypt = require('bcryptjs');

const corsHeader = {
  origin: ['*'],
  headers: ['Access-Control-Allow-Origin', 'Access-Control-Allow-Headers', 'Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'AuthKey', 'Authorization', 'Email'],
  credentials: true
};

const usersRoutes = [
  {
    method: "POST",
    config: { auth: false ,cors: corsHeader },
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
    config: { auth: false, cors: corsHeader },
    handler: usersController.loginUser
  }
];

module.exports = usersRoutes;