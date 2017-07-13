var router = require('express').Router();
var db = require('../../db/models')
var Student = require('../../db/models').Student
var Campus = require('../../db/models').Campus

//GET all campuses
router.get('/', (req, res, next) => {
    Campus.findAll({})
    .then(campuses => res.json(campuses))
    .catch(err => console.err(err))
})

//GET a specific campus
router.get('/:campusId', (req,res,next) => {
    Campus.findOne({where: {
        id: req.params.campusId
    }})
    .then(campus => {
        res.status(201).json(campus)
    })
    .catch(err => console.error(err))
})

//POST a new campus
router.post('/', (req, res, next) => {
    Campus.create(req.body)
    .then(campus => res.status(201).json(campus))
    .catch(err => console.error(err))
})

//PUT modified campus info
router.put('/:campusId', (req,res,next) => {
  const campusId = req.params.messageId;
  Campus.findById(campusId)
    .then(campus => campus.update(req.body))
    .catch(next);
})

//DELETE a campus
router.delete('/:campusId', (req, res, next) => {
    const id = req.params.campusId
    Campus.destroy({ where: { id } })
        .then(() => res.status(204).end())
        .catch(next);
})

module.exports = router