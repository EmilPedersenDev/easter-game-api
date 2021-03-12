const { body } = require("express-validator");

exports.userValidation = () => {
  return [
    body("username")
      .not()
      .isEmpty()
      .trim()
      .withMessage("Username can not be empty.")
      .isLength({ max: 20 })
      .withMessage("Username can not contain more than 20 characters."),
    body("email").isEmail().withMessage("Not a valid email."),
  ];
};
