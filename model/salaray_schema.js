const mongoose=require("mongoose");
// const Insertdata = require("./insert_data_schema");


const salarySchema=new mongoose.Schema({
    user:
{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Insertdata",
    required:true
},
baseSalary:{
    type:Number,
    required:true
},
salaryType:{
    type:String,
    enum:["incentive","overtime"],
    required:true

},
incentiveAmount: {
      type: Number,
      default: 0
    },

    overtimeHours: {
      type: Number,
      default: 0
    },

    overtimeRate: {
      type: Number,
      default: 0
    },
totalSalary:{
    type:Number,
    required:true
}
},
{timestamps:true}

)
module.exports=mongoose.model("Salary",salarySchema)