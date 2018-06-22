'use strict';
const JWT = require('jsonwebtoken');

exports.createItem = (req, h) => {
  const itemInfo = {
    image: "http://demo.webulous.in/restaurant/wp-content/uploads/sites/5/2014/06/chennaicitypage_03art1_gt819dhqj119nxg_p3_meals.jpg",
    name: "Mysuru-highway",
    price: 120,
    quantity: 20,
    category: "Veg",
    source: "Mysuru hotel"
  };
  return models.Item.create(itemInfo).then((itemInfo) => {
    return { message: "Item created successfully", user: itemInfo };
  }).catch((err) => {
    return { err: err };
  });
}

exports.getItem = (req, h) => {
    console.log(req.headers.authorization)
  return models.Item.findAll({
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