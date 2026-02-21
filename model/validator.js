const {body}=require("express-validator")
// const { validationResult } = require("express-validator");

const validation=[

    body("name")
    .notEmpty().withMessage("name is required"),
    body("email")
    .notEmpty().withMessage("email must required"),
    body("password")
    .notEmpty().isLength({min:6}).withMessage("password must be 6 caharacter"),

]
module.exports = validation;
