'use strict';

const models = require('../models');
const itemController = require('../controllers/itemController')
const bcrypt = require('bcryptjs');
const Joi = require('joi');

const corsHeader = {
  origin: ['*'],
  headers: ['Access-Control-Allow-Origin', 'Access-Control-Allow-Headers', 'Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'AuthKey', 'Authorization', 'Email'],
  credentials: true
};

const itemRoutes = [
  {
    method: "POST",
    config: { 
                validate: {
                  payload: {
                    image: Joi.string().required(),
                    name: Joi.string().required(),
                    price: Joi.number().min(1),
                    quantity: Joi.number().min(1),
                    category: Joi.number().min(1),
                    source: Joi.string().required()
                  } ,
                  failAction: async(request, h, err) => {
                    throw err;
                  },
                  headers: Joi.object({
                    'authorization': Joi.string().required()
                  }).unknown()
                },
              //   headers: Joi.object({
              //     'authorization': Joi.string().required()
              // }).unknown(),
                auth: 'jwt',
                cors: corsHeader,  
                tags: ['api'],
                description: 'List Items', 
              },
    path: "/api/items/create",
    handler: itemController.createItem
  },
  {
    method: "GET",
    path: "/api/items",
    config: { auth: 'jwt',cors: corsHeader,tags: ['api'],
    validate: {
    headers: Joi.object({
      'authorization': Joi.string().required()
    }).unknown() }
  },
    handler: itemController.getItem
  },
  {
    method: "DELETE",
    path: "/api/items/{id}",  
    config: { auth: 'jwt' },
    handler: itemController.deleteItem
  },
  {
    method: "GET",
    path: "/api/items/{id}",  
    config: { auth: 'jwt' },
    handler: itemController.showItem
  },
  {
    method: "PUT",
    path: "/api/items/{id}",  
    config: { auth: 'jwt' },
    handler: itemController.updateItem
  }
];

module.exports = itemRoutes;