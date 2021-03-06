'use strict';
var Sequelize = require('sequelize')
var db = require('../index.js')
var Campus = require('./campus.js')


module.exports = db.define('student', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: Sequelize.STRING,
  imgUrl: {
    type: Sequelize.STRING,
    defaultValue: '/images/defaultStudent.png'
  }
}, {
  defaultScope: {
    include: [
      { model: Campus }
    ]
  }
});
