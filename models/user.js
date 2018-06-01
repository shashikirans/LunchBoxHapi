'use strict';
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
  return User;
};