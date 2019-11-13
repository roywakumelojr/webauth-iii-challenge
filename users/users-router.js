const router = require("express").Router();

const Users = require("./users-model.js");
const restricted = require("../auth/restricted-middleware.js");

router.get("/", restricted, checkDepartment(["department", "accounting"]), (req, res) => {
  Users.find()
    .then(users => {
      res.json(users);
    })
    .catch(err => res.send(err));
});

module.exports = router;

function checkDepartment(departments) {
  return function(req, res, next) {
    if (departments.includes(req.decodedJwt.department)) {
      next();
    } else {
      res.status(403).json({ message: "Can't touch this!" });
    }
  };
}
