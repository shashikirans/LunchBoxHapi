'use strict';

const bcrypt = require('bcryptjs');
const Joi = require('joi');
var axiosObj = require('axios');

const api_dbal = require('../config/api_dbal');

const corsHeader = {
  origin: ['*'],
  headers: ['Access-Control-Allow-Origin', 'Access-Control-Allow-Headers', 'Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'AuthKey', 'Authorization', 'Email'],
  credentials: true
};

const usersRoutes = [
  {
    method: "POST",
    config: {
      validate: {
        payload: {
          first_name: Joi.string().required(),
          last_name: Joi.string().required(),
          password: Joi.string().min(1),
          email: Joi.string().min(1),
          account_status: Joi.boolean().required(),
          auth_token: Joi.string().required()
        },
        failAction: async(request, h, err) => {
          throw err;
        }
      },
      auth: false,
      cors: corsHeader,
      tags: ['api'],
      
      handler: (request, h) => {
        const userInfo = {
          first_name: request.payload.first_name,
          last_name: request.payload.last_name,
          contact_number: request.payload.contact_number,
          password: request.payload.password,
          email: request.payload.email,
          account_status: true,
          auth_token: 1234
        };
        return axiosObj.post(
          `${api_dbal.PATH}/api/users/create`, userInfo
        )
        .then(function (response) {
          console.log(response);
          return h.response(response.data);
        })
        .catch(function (error) {
          return h.response(error);
        });
      }
    },
    path: "/api/users/create",
  },
  {
    method: "POST",
    path: "/api/users/login",
    config: {
      auth: false,
      cors: api_dbal.corsHeader,
      tags: ['api'],
      handler:  (request, h) =>{
        const user = {
          email: request.payload.email,
          password: request.payload.password
        }
        return axiosObj.post(
          `${api_dbal.PATH}/api/users/login`, user
        )
        .then(function(response){
          return h.response(response.data);
        })
        .catch(function (error){
          return h.response(error);
        })
      }
    }
  }
];

module.exports = usersRoutes;