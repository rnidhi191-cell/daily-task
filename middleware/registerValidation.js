const{body}=require("express-validator");

const registerValidation=[
    body("name").notEmpty().withMessage("name is required"),
    body("email").isEmail().withMessage("valid email required"),
    body("password").isLength({min:6}).withMessage("password must be at least 6 character")
];
module.exports=registerValidation;