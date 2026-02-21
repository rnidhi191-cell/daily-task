const mongoose = require("mongoose");
const Insertdata = require("./insert_data_schema");

const roleSchema = new mongoose.Schema(
    {
        roleName: {
            type: String,
            default: false
        },
        userId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:Insertdata,
            required:true
        },
        permission: {

            read: {
                type: Boolean,
                default: false
            },
            write: {
                type: Boolean,
                default: false
            },
            delete: {
                type: Boolean,
                default: false
            },
            update: {
                type: Boolean,
                default: false
            }
        }
    },
    { timestamps: true })

module.exports = mongoose.model("Role", roleSchema);