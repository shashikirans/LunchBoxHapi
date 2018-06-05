'use strict';
const models = require('../models');
const JWT = require('jsonwebtoken');

exports.createUser = (req, h) => {
  const userInfo = {
    first_name: req.payload.first_name,
    last_name: req.payload.last_name,
    contact_number: req.payload.contact_number,
    password: req.payload.password,
    email: req.payload.email,
    account_status: true,
    auth_token: 1234
  };
  return models.User.create(userInfo).then((userInfo) => {
    return { message: "User created successfully", user: userInfo };
  }).catch((err) => {
    return { err: err };
  });
}

exports.loginUser = (req, res) => {
    const response = res.response('success');
    const users = {
      email: req.payload.email,
      password: req.payload.password
    }
    return models.User.findOne({ where: { email: users.email } }).then(user => {
        if (user != null && user.validatePassword(req.payload.password)) {
            console.log(user.dataValues)
         const token = JWT.sign(user.dataValues, "23094820394823948dsafbhasdfhasdbf");
          return res.response({message: "Signin successfully", token: token, user}).code(200)
        } else {
          return { message: "Email or Password is invalid" }
        }
        return user.dataValues
    }).catch((err) => {
      return err.message;
    })
  }

exports.getUser = (req, h) => {
    console.log(req.headers.authorization)
  return models.User.findAll({
    // where: {
    //   id: req.params.id
    // }
  }).then((userData) => {
    return { message: "Success", user: userData };
  })
  .catch((err) => {
    return { err: "err" };
  });
}