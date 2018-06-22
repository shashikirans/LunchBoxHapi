'use strict';

// const itemController = require('../controllers/itemController')
// const bcrypt = require('bcryptjs');
const bcrypt = require('bcryptjs');
const Joi = require('joi');
var axiosObj = require('axios');

var api_dbal = require('../config/api_dbal');

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
        },
        failAction: async(request, h, err) => {
          throw err;
        },
        headers: Joi.object({
          'authorization': Joi.string().required()
        }).unknown(),
      },
      handler: (request, h) => {
        const itemInfo = {
          image: "http://demo.webulous.in/restaurant/wp-content/uploads/sites/5/2014/06/chennaicitypage_03art1_gt819dhqj119nxg_p3_meals.jpg",
          name: request.payload.name,
          price: request.payload.price,
          quantity: request.payload.quantity,
          category: request.payload.category,
          source: request.payload.source
        };
        return axiosObj.post(
          `${api_dbal.PATH}/api/items/create`, itemInfo
        )
        .then(function (response) {
          return h.response(response.data);
        })
        .catch(function (error) {
          return h.response(error);
        });
      },
      auth: 'jwt',
      cors: api_dbal.corsHeader,  
      tags: ['api'],
      description: 'List Items', 
    },
    path: "/api/items/create",
  },
  {
    method: "GET",
    path: "/api/items",
    config: { 
      auth: 'jwt',
      cors: api_dbal.corsHeader,
      tags: ['api'],
      validate: {
        headers: Joi.object({
          'authorization': Joi.string().required()
        }).unknown()
      },
      handler: (request, h) => {
        axiosObj.get(`${api_dbal.PATH}/api/items`)
        .then(function (response){
          return h.response(response.data);
        })
        .catch(function(error){
          return h.response(error);
        });
      }
    }
  }
];

module.exports = itemRoutes;