import { check, checkSchema } from "express-validator";

const checkValidations = [
  check("name", "name is required").not().isEmpty(),
  check("company", "company is required").not().isEmpty(),
  check("email", "email is not valid").isEmail(),
  check("birth_date", "birth_date is not valid").isDate(),
  check("personal_phone_number", "personal_phone_number is required")
    .not()
    .isEmpty(),
  check("work_phone_number", "work_phone_number is required").not().isEmpty(),
  check("address", "address is required").not().isEmpty(),
  checkSchema({
    'profile_image': {
        custom: {
            options: (value, { req }) => !!req.file,
            errorMessage: 'You should upload an image',
        },
    }
})
];

export { checkValidations as default };
