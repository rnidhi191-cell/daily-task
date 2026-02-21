const User=require("../model/userSchema");

const logoutUser=async(req,res)=>{

    
    try{
res.status(200).json({
    success:true,
    message:"successfully deleted"
})
    }catch(error){
        res.status(401).json({
            success:false,
            error:error.message
        })

    }
}
module.exports=logoutUser;