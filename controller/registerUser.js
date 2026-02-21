const User=require("../model/userSchema");
const bcrypt=require("bcryptjs")
const{ validationResult}=require("express-validator");

const registerUser=async(req,res)=>{
    try{
        const errors=validationResult(req)
        if(!errors.isEmpty()){
           return res.status(400).json({
                success:false,
                errors:errors.mapped()
            })
        }

        let{name,email,password,role}=req.body;
        email = email.toLowerCase().trim();

            const existingUser=await User.findOne({email})
            if(existingUser){
               return res.status(400).json({
                    success:false,
                    message:"user is already exists"
                })
            }
            //hash password
        const salt=await bcrypt.genSalt(10);
        const hashedPassword=await bcrypt.hash(password,salt);

const user=await User.create({
    name,
    password:hashedPassword,
    email,
    role
})
res.status(200).json({
    success:true,
    data:user,
    message:"user successfully register"
})
        

    }catch(err){
        next(err)

    }
} 
module.exports= registerUser;