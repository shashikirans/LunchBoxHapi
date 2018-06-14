'use strict';
var faker = require('faker');

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('Person', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
   var items = [];
   for(var i = 0; i < 10; i++) {
     items.push({
       image: "http://demo.webulous.in/restaurant/wp-content/uploads/sites/5/2014/06/chennaicitypage_03art1_gt819dhqj119nxg_p3_meals.jpg",
       name: "Mysuru",
       price: 120,
       quantity: 20,
       category: "Veg",
       source: "paradise hotel",
       createdAt: new Date,
       updatedAt: new Date
     })
   }
   return queryInterface.bulkInsert('items', items, {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
   return queryInterface.bulkDelete('items', null, {});
  }
};
