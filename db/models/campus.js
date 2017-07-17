'use strict';
var Sequelize = require('sequelize')
var db = require('../index.js')


module.exports = db.define('Campus',{
    name: Sequelize.STRING, //I would be explicit and use allowNull on every field.
    image: Sequelize.STRING
})