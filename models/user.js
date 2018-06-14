'use strict';
const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('User', {
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    contact_number: DataTypes.INTEGER,
    password: DataTypes.STRING,
    email: DataTypes.STRING,
    account_status: DataTypes.BOOLEAN,
    auth_token: DataTypes.STRING
  }, {});
  User.associate = function(models) {
    // associations can be defined here
  };
  User.prototype.validatePassword = function (password) {
    return bcrypt.compareSync(password, this.password);
  }
  User.beforeCreate((user, options) => {
    return bcrypt.hash(user.password, 10)
    .then(hash => {
      user.password = hash;
    })
    .catch(err => {
      throw new Error();
    });
  });

  return User;
};