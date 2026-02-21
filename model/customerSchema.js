const mongoose = require("mongoose");
const orderSchema = new mongoose.Schema(
    {
        user:{
type:mongoose.Schema.Types.ObjectId,
ref:"User"  ,  //reference to user collection
required:true
        },
        orderId: {   
            type: String,
            required: true
        },
        product: {
            type: String,
            required: true
        },
        amount:
        {
            type: Number
            , required: true
        },
        paymentType: {
            type: String,
            enum: ["apple_pay", "paypal", "credit_card"],
            required: true
        },
        orderStatus: {
            type: String,
            enum: ["completed", "pending", "cancelled"],
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now
        }
    });
const customerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    }, phone: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ["active", "inactive"],
        
    },
    Type: {
        type: [String],
        enum: ["customer", "staff", "visiters"],
    },

    orders: [orderSchema],
},
    { timestamps: true }
);

      
module.exports = mongoose.model("Customer", customerSchema)




