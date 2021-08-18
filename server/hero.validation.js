const { body, validationResult } = require("express-validator");

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

module.exports = {
  saveValidation,
  // export validations for other endpoints if needed
};
