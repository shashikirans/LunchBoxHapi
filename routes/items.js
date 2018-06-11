'use strict';

const models = require('../models');
const itemController = require('../controllers/itemController')
const bcrypt = require('bcryptjs');


const corsHeader = {
  origin: ['*'],
  headers: ['Access-Control-Allow-Origin', 'Access-Control-Allow-Headers', 'Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'AuthKey', 'Authorization', 'Email'],
  credentials: true
};

const itemRoutes = [
  {
    method: "POST",
    config: { auth: 'jwt',cors: corsHeader },
    path: "/api/items/create",
    handler: itemController.createItem
  },
  {
    method: "GET",
    path: "/api/items",
    config: { auth: 'jwt',cors: corsHeader },
    handler: itemController.getItem
  }
];

module.exports = itemRoutes;