'use strict';
var Sequelize = require('sequelize')
var db = require('../index.js')


module.exports = db.define('student', {
  name: Sequelize.STRING, //I would be explicit and use allowNull
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  }
})
