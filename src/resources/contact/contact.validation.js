import { body } from "express-validator";

const createValidations = [
  body(
    ["name", "company", "personal_phone_number", "address"],
    "field is required"
  )
    .not()
    .isEmpty(),
  body("email", "email is not valid").isEmail(),
  body("birth_date", "birth_date is not valid").isDate(),
];

const updateValidations = [
  body("email", "email is not valid")
    .if((value, { req }) => req.body.email)
    .isEmail(),
];

export { createValidations, updateValidations };
