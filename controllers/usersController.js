'use strict';
const JWT = require('jsonwebtoken');

exports.loginUser = async (res) => {
  // console.log("hello")
  // console.log(res)
  const promise = new Promise((resolve, reject) => {
    // prequest.get(theUrl, function (err, res, body) {
        // if (err) {
        //     reject(err);
        // } else {
            // const response = h.response(body)
            //     .header('Cache-Control', 'public, max-age=2629000')
            //     .header('Content-Type', 'image/png');

            resolve(res);
        // }

    // });
});

// return promise;
  // const response = res.response('success');
  // const users = {
  //   email: req.payload.email,
  //   password: req.payload.password
  // }
  // return models.User.findOne({ where: { email: users.email } }).then(user => {
  //   if (user != null && user.validatePassword(req.payload.password)) {
  //       console.log(user.dataValues)
  //     const token = JWT.sign(user.dataValues, "23094820394823948dsafbhasdfhasdbf");
  //     return res.response({message: "Signin successfully", token: token, user}).code(200)
  //   } else {
    //  await next();
     return { message: res }

  //   }
  //   return user.dataValues;
  // }).catch((err) => {
  //   return err.message;
  // })
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