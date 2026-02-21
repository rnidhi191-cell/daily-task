const mongoose=require("mongoose");
const newschema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    }
},
    {
        timestamps:true
    })
    module.exports=mongoose.model("newschema",newschema);