const router = require("express").Router();
const Campus = require("../db/models/campus");

router.get("/", (req, res, next) => {
  Campus.findAll({})
    .then(function(users) {
      res.json(users);
    })
    .catch(next);
});

router.get("/:campusId", (req, res) => {
    const id = req.params.campuslId;
  Campus.findOne({
    where: { id }
    })
    .then(function(campus) {
      res.json(campus);
    })
    .catch(next);
});

router.post("/", (req, res, next) => {
  Campus.create(req.body).then(campus => res.json(campus)).catch(next);
});

router.delete("/:campusId", (req, res) => {
  const id = req.params.campuslId;
  Campus.destroy({ where: { id } })
    .then(() => res.status(204).end())
    .catch(next);
});

module.exports = router;
