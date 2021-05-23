import { body } from "express-validator";

const createValidations = [
  body(
    ["name", "company", "personal_phone_number", "address"],
    "field is required"
  )
    .trim()
    .not()
    .isEmpty(),
  body("email", "email is not valid").trim().isEmail(),
  body("birth_date", "birth_date is not valid").trim().isDate(),
];

const updateValidations = [
  body("email", "email is not valid")
    .if((value, { req }) => req.body.email)
    .trim()
    .isEmail(),
];

export { createValidations, updateValidations };
