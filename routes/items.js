'use strict';

const models = require('../models');
const itemController = require('../controllers/itemController')
const bcrypt = require('bcryptjs');

const itemRoutes = [
  {
    method: "POST",
    config: { auth: 'jwt' },
    path: "/api/items/create",
    handler: itemController.createItem
  },
  {
    method: "GET",
    path: "/api/items",
    config: { auth: 'jwt' },
    handler: itemController.getItem
  }
];

module.exports = itemRoutes;