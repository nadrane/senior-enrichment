var router = require('express').Router();
var db = require('../../db/models')   //unused variable
var Student = require('../../db/models').Student
var Campus = require('../../db/models').Campus


//GET all students
router.get('/', (req, res, next) => {
    Student.findAll({}) //An empty object is not necessary
    .then(students => res.json(students))
    .catch(err => console.error(err))
    // You should be forwarding these to a unified error handler.
    // https://expressjs.com/en/guide/error-handling.html
    // .catch(next)   // Like this!
})

//GET a specific student
router.get('/:studentId', (req,res,next) => {
    Student.findOne({where: {   // Good use of findOne
        id: req.params.studentId
    }})
    .then(student => {
        res.status(200).json(student) // 200 is the default status. No need to set it explicitly
    })
    .catch(err => console.error(err))
})

//POST a student at a campus
//Maybe this should be 2 routes? One for creating a student and another for adding a campus to an existing student.
// POST /api/students   -- makes the route
// POST /api/students/:id/campus  -- Adds the campus
router.post('/', function (req, res, next) {
  Campus.findOne({
    where: {
      id: req.body.campusId
    }
  })
  .then(campus => {
    const student = Student.build(req.body);
    student.setCampus(campus, { save: false });
    return student.save()
      .then(student => {
        student = student.toJSON();
        student.campus = campus;  //Shouldn't this already be on the student?
                                  //I'm not sure how setCampus behaves on something that is not saved yet
                                  //Let me show how I would've written it.
        return student;
      });
  })
  .then(student => {
    res.json(student);
  })
  .catch(next);
});

//POST /api/students

router.post('/', function (req, res, next) {
  return Student.create(req.body)
  .then(student => {
    res.json(student);
  })
  .catch(next);
});

//POST /api/students/:id/campus

router.post('/:id', function (req, res, next) {
  return Student.findById(req.body.id)
  .then(student => {
    return student.setCampus(req.body.campusId)
  })
  .then(student => {
    res.json(student);
  })
  .catch(next);
});

//PUT modified student info
router.put('/:studentId', (req,res,next) => {
  const studentId = req.params.studentId;
  Student.findById(studentId)
    .then(student => student.update(req.body))
    .then(student => res.status(202).json(student))  //wrong use case for status code 202. This is just a 200. 202 might be for batch processing
    .catch(next);
})

//DELETE a student
router.delete('/:studentId', (req, res, next) => {
    const id = req.params.studentId
    Student.destroy({ where: { id } })
        .then(() => res.status(204).end()) //Good use of 204. Just do res.sendStatus(204)
        .catch(next);
})


module.exports = router