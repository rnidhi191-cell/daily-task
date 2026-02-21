const bcrypt=require("bcryptjs");
const User=require("../model/userSchema");
const jwt=require("jsonwebtoken");


const loginUser=async(req,res)=>{
    try{

const{email,password}=req.body;

console.log(email,password)
 const normalizedEmail = email.toLowerCase().trim();

const user=await User.findOne({
    email: normalizedEmail 
})
console.log(user)
if(!user){
 return res.status(400).json({
        success:false,
        message:"invalid user"
    })
}
const isMatch=await bcrypt.compare(password,user.password);
if(!isMatch){
     return res.status(400).json({
        success:false,
        message:"invalid password and email"
    })
}
const token = jwt.sign({"name":user.name,
    "email":user.email,
    "password":user.password
},
  process.env.JWT_SECRET,
  { expiresIn: "1d" }
);

res.status(200).json({
    success:true,
    data:user,
    token,
    message:"login successfully",
    redirect: "/dashboard"
})
    }
    catch(error){
        res.status(500).json({
            success:false,
            error:error.message
        })

    }
}
module.exports=loginUser;