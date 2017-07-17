const router = require("express").Router();
const User = require("../db/models/user");
router.get("/", (req, res, next) => {
  User.findAll({})
    .then(function(users) {
      res.json(users);
    })
    .catch(next);
});

router.get("/:studentId", (req, res, next) => {
  User.findOne({
    where: {
      id: req.params.id
    }
  })
    .then(function(user) {
      res.json(user);
    })
    .catch(next);
});

router.post("/", (req, res, next) => {
    // over aggressive copy paste? You're sending campus back
    User.create(req.body).then(campus => res.json(campus)).catch(next);
});

router.delete("/:userId", (req, res, next) => {
    const id = req.params.userId;
    User.destroy({ where: { id } })
    .then(() => res.status(204).end()) //Just use sendStatus(204)
    .catch(next);
});

module.exports = router;
