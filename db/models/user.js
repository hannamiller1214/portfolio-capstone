'use strict';

const bcrypt = require('bcrypt');
const sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('User', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING
  })

  User.addHook('beforeCreate', async function(user) {
    const salt = await bcrypt.genSalt(8);
    console.log(user);
    user.password = await bcrypt.hash(user.password, salt);
  })

  User.prototype.comparePassword = function(password, done) {
    bcrypt.compare(password, this.password, function(err, isMatch) {
      return done(err, isMatch);
    });
  };

  User.associate = function(models) {
    User.hasMany(models.Artwork);
  }

  return User;
};
