const  mongoose  = require("mongoose");

const insertDataSchema = new mongoose.Schema(
    {
        fname: {
            type: String,
            required: true
        },
        lname: {
            type: String,
            required: true
        },
        email: {
            type: String,
            unique: true,
            required: true
        },
        gender: {
            type: String,
            required: true,
            enum: {
                values: ["male", "female", "other"],
                message: "${value} is not valid value"
            }
        },
        password: {
            type: String,
            required: true,
            
        }
    },
        {
    timestamps: true
  }
    
)
const Insertdata = mongoose.model("Insertdata", insertDataSchema)
module.exports = Insertdata;