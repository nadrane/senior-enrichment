var router = require('express').Router();
var db = require('../../db/models')
var Student = require('../../db/models').Student
var Campus = require('../../db/models').Campus


//GET all students
router.get('/', (req, res, next) => {
    Student.findAll({})
    .then(students => res.json(students))
    .catch(err => console.error(err))
})

//GET a specific student
router.get('/:studentId', (req,res,next) => {
    Student.findOne({where: {
        id: req.params.studentId
    }})
    .then(student => {
        res.status(200).json(student)
    })
    .catch(err => console.error(err))
})

//POST a student at a campus 
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
        student.campus = campus;
        return student;
      });
  })
  .then(student => {
    res.json(student);
  })
  .catch(next);
});

//PUT modified student info
router.put('/:studentId', (req,res,next) => {
  const studentId = req.params.studentId;
  student.findById(studentId)
    .then(student => student.update(req.body))
    .catch(next);
})

//DELETE a student
router.delete('/:studentId', (req, res, next) => {
    const id = req.params.studentId
    Student.destroy({ where: { id } })
        .then(() => res.status(204).end())
        .catch(next);
})


module.exports = router