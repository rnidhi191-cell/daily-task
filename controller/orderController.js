// const Customer=require("../model/customerSchema");
// const { body, param, validationResult } = require("express-validator");

// exports.createOrder=async(req,res)=>{
//     try{
//         const errors=validationResult(req)
//         if (!errors.isEmpty()) {
//       return res.status(400).json({
//         success: false,
//         errors: errors.array()
//       });
//     }
//         const order=await Customer.insertMany(req.body)
//         res.status(201).json({
//             success:true,
//             data:order
//         })
//     }catch(error){
//         res.status(400).json({
//             success:false,
//             error:error.message
//         })
//     }
// }