'use strict';

const models = require('../models');
const usersController = require('../controllers/usersController')
const bcrypt = require('bcryptjs');
const Joi = require('joi');

const corsHeader = {
  origin: ['*'],
  headers: ['Access-Control-Allow-Origin', 'Access-Control-Allow-Headers', 'Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'AuthKey', 'Authorization', 'Email'],
  credentials: true
};

const usersRoutes = [
  {
    method: "POST",
    config: {  validate: {
      payload: {
        first_name: Joi.string().required(),
        last_name: Joi.string().required(),
        password: Joi.string().min(1),
        email: Joi.string().min(1),
        account_status: Joi.boolean().required(),
        auth_token: Joi.string().required()
      } ,
      failAction: async(request, h, err) => {
        throw err;
      }
    },auth: false ,cors: corsHeader, tags: ['api'] },
    path: "/api/users/create",
    handler: usersController.createUser
  },
  {
    method: "GET",
    path: "/api/users",
    config: { auth: 'jwt',tags: ['api'],
    validate: {
      headers: Joi.object({
        'authorization': Joi.string().required()
      }).unknown() } },
    handler: usersController.getUser
  },
  {
    method: "POST",
    path: "/api/users/login",
    config: { auth: false, cors: corsHeader,tags: ['api'] },
    handler: usersController.loginUser
  }
];

module.exports = usersRoutes;