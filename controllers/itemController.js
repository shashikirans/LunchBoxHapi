'use strict';
const models = require('../models');
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

exports.deleteItem = (req, h) => {
  console.log(req.headers.authorization)
  return models.Item.destroy({
    where: {
      id: req.params.id
    }
  }).then((itemInfo) => {
    return { message: "Success", Item: itemInfo };
  })
  .catch((err) => {
    return { err: "err" };
  });
}

exports.showItem = (req, h) => {
  console.log(req.headers.authorization)
  return models.Item.findOne({
    where: {
      id: req.params.id
    }
  }).then((itemInfo) => {
    console.log(itemInfo)
    if(itemInfo) {
      return h.response(itemInfo).code(200);  
    }
    else {
      return { message: "Item not found", Item: itemInfo }
    }
  })
  .catch((err) => {
    return { err: err };
  });
}

exports.updateItem = (req, h) => {
 return  models.Item.findOne({
    where: {
      id: req.params.id
    }
  })
  .then((itemInfo) => {
    if(!itemInfo){
      return { message: "Item not found"}
    }
    console.log(req.payload)
    const params = {
      name: req.payload.name,
      price: req.payload.price,
      quantity: req.payload.quantity,
      category: req.payload.category
    }
    return itemInfo.updateAttributes(params).then((itemInfo) => {
      return { message: "Item updated Successfully", Item: itemInfo};
    })
  })
  .catch((err) => {
    return { err: err}
  })
}