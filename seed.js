const db = require('./db')
const Campuses = require('./db/models/campus')
const User = require('./db/models/user')



Campuses.create({
    name:'Patriots',
    image:'/images/test.jpg'
})


db.sync({force: true})
.then(function () {
  console.log('Seeding database');
});