const { body, validationResult, check } = require("express-validator");
const { getOneHero } = require("./hero.controllers");
// const { getAllHerosFromDb, writeHerosToDb } = require("./hero.jsonHandler");
// const { param } = require("./hero.router");

function checkValidation(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
  } else {
    next();
  }
}

const saveValidation = [
  body("name").notEmpty().isLength({ min: 3 }),
  body("power").isFloat({ min: 1, max: 5 }),
  body("speed").isFloat({ min: 1, max: 5 }),
  checkValidation,
];

const updateValitation = [
  body("name").notEmpty().isLength({ min: 3 }),
  body("power").isFloat({ min: 1, max: 5 }),
  body("speed").isFloat({ min: 1, max: 5 }),
  checkValidation,
];

const deleteValitation = [
  doIdExist,
  checkValidation,
];

function doIdExist(){
    check("id").custom((value) => {
      return hero.getOneHero(value).then(function (hero) {
        if (!hero) {
          throw new Error("this hero dose not exixt to be deleted");
        }
      });
    });
}

// const foo = param("id", req, res, next, id => {
//     let hero = getOneHero();
//      User.find(id, function(err, user){
//      if (err) {
//        next(err);
//      } else if (user) {
//        req.user = user;
//        next();
//      } else {
//        next(new Error('failed to load user'));
//      }
//    });
// });
// app.param('user_id', function(req, res, next, id){
//    User.find(id, function(err, user){
//      if (err) {
//        next(err);
//      } else if (user) {
//        req.user = user;
//        next();
//      } else {
//        next(new Error('failed to load user'));
//      }
//    });
//  });

module.exports = {
  saveValidation,
  updateValitation,
  deleteValitation,
};
