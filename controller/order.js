const Customer = require("../model/customerSchema");
const { body, param, validationResult } = require("express-validator");
const newschema=require("../model/newschema");
exports.createOrder = async (req, res) => {
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                errors: errors.array()
            });
        }
        const order = await Customer.insertMany(req.body)
        res.status(201).json({
            success: true,
            data: order
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            error: error.message
        })
    }
}
exports.pushOrder = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(500).json({
                success: false,
                errors: errors.mapped(),

            });
        }
        const { id } = req.params;
        // const orderData=req.body;
        const updateCustomer = await Customer.findByIdAndUpdate(
            id,
            {
                $push: { orders: req.body }
            },
            { new: true, runValidators: true });//upsertTrue
        if (!updatedCustomer) {
            return res.status(404).json({
                success: false,
                message: "Customer not found",
            });
        }

        res.status(200).json({
            success: true,
            data: updateCustomer
        })

    } catch (error) {
        res.status(404).json({
            success: false,
            error: error.message
        })

    }
}

exports.delpull = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (errors.isEmpty()) {
            res.status(500).json({
                success: false,
                errors: errors.mapped()
            })
        }
        const { id, orderID } = req.body;
        const deleteOrder = await Customer.findByIdAndDelete(
            id,
            {
                $pull: {
                    orders: { orderId: orderID }

                }
            }, { new: true })
        if (!deleteOrder) {
            res.status(505).json({
                success: false,
                message: "customer not find"
            });
        } res.status(200).json({
            success: true,
            data: deleteOrder
        })
    } catch (error) {
        res.status(404).json({
            success: false,
            error: error.message
        })
    }
}

exports.getOrders = async (req, res,next) => {
    try {
        next("vb");
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                errors: errors.mapped()
            })
        }
        
        
        const { orderStatus, status, orderId, Type ,studentId,name} = req.query;

        const filter = {};
        if (studentId) {
  filter._id = new mongoose.Types.ObjectId(studentId.trim());
}

        if (name) {
            filter.name = { $regex: name, $options: "i" }
        }
        if(Type&& Array.isArray(Type)){
            filter.Type={$in:Type.map(t=>new RegExp(`^${t}$`, "i"))}
        }
    if(orderStatus){
        filter["orders.orderStatus"]={$regex:`^${orderStatus}$`,$options:"i"}
    }
    if(status){
        filter.status={$regex:status,$options:"i"}
    }
    
    if(orderId){
        filter["orders.orderId"]={$regex:orderId,$options:"i"}
    }

        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        // await Promise.all
        const totalRecords = await Customer.countDocuments(filter);
        const orders = await Customer.find(filter)
            .skip(skip)
            .limit(limit);



        res.status(200).json({
            success: true,
            page,
            limit,
            totalPages: Math.ceil(totalRecords / limit),
            totalRecords,
            data: orders
        });


    } 
    catch (error) {
        return next(error)
        res.status(500).json({
            success: false,
            error: error.message
        });

    }
}
exports.order=async(req,res,next)=>{
    try{
const{userId,product,amount,paymentType,orderStatus}=req.body;
const order=await Customer.create({
    user:userId,
    product,
    amount,
    paymentType,
    orderStatus
});
res.status(201).json({
    success:true,
    order
})
    }catch(err){
next(err)
    }
}