const express=require("express");
const router=express.Router();
const { body, param, validationResult } = require("express-validator");
const{calculateMaths,createStudent}= require("../controller/studentController")
// const{createOrder}=require("../controller/orderController");
const{createOrder,pushOrder,delpull,getOrders,order}=require("../controller/order")
router.post("/student",calculateMaths);
 router.post("/students",

    [body("name")
        .notEmpty().withMessage("name is required"),
    body("email")
        .notEmpty().withMessage("email must required"),
    body("password")
        .notEmpty().isLength({ min: 6 }).withMessage("password must be 6 caharacter"),

    ],createStudent);

// registration page
const validation=require("../middleware/registerValidation");
const verifyToken=require("../middleware/authMiddleware");

const registerUser=require("../controller/registerUser");
router.post("/Register",validation,registerUser)
router.post("/order" ,order)
// login page
const loginUser=require("../controller/loginUser");
router.post("/login",loginUser)

const logoutUser=require("../controller/logoutUser")
router.post("/logout",verifyToken,logoutUser)

    router.post("/customers",createOrder);
    // router.put("/add",pushOrder);
router.put("/customer/:id", pushOrder);
router.put("/customer1/:id/:orderID",delpull);
router.get("/student1",verifyToken,getOrders);


    module.exports=router;
        // app.post("/data/insert", async (req, res) => {
//     try {
//         const { fname, lname, email, password, gender } = req.body;
//         if (!fname || !lname || !email) {
//             return res.status(400).json({ message: "fname ,lname and email are required" })
//         }
//         const insertdata = await Insertdata.create({
//             fname,
//             lname,
//             email,
//             password,
//             gender

//         });

//         res.status(201).json({
//             message: "User created successfully",
//             data: insertdata
//         });

//     } catch (error) {
//         res.status(500).json({
//             message: error.message
//         })

//     }
// / insertmany method
// app.post("/insertmany", async (req, res) => {
//     try {

//         const user1 = await Insertdata.insertMany(req.body);

//         res.status(200).json({ success: true, count: user1.length, data: user1 })

//     } catch (error) {
//         res.status(404).json({ error: error.message })
//     }
// })
// // // findone
// app.get("/findid/:id", async (req, res) => {
//   const{id}=req.params;
// const page=parseInt(req.query.page)||1;
// const limit=parseInt(req.query.limit)||5;

// const skip=(page-1)*limit;
//     const user2 = await Insertdata.findById(id)
//     .limit(limit)
//     .skip(skip)
//     res.json(user2)
// })
// app.delete("/delone/:id", async (req, res) => {
//     const user2 = await Insertdata.findByIdAndDelete(req.params.id)
//     res.json(user2);
// })

// app.post("/hello", async (req, res) => {
//     try {
//         const role = new Role({
//             roleName: "admin",
//             userId: req.body.userId,
//             permissions: {
//                 read: true,
//                 write: true,
//                 update: true,
//                 delete: true
//             }
//         })
//         console.log(role)

//         let result = await role.save()
//         res.status(200).json({
//             success: true,
//             data: result
//         })
//     } catch (error) {
//         res.status(404).json({ error: error.message })
//     }
// })
// app.get("/hi/:userId", async (req, res) => {
//     const user = await Role.findOne({ userId: req.params.userId })
//     console.log(user)
//     res.json(user)
// })

// app.get("/user2/:a/:b", (req, res) => {
//     let a = Number(req.params.a)
//     let b = Number(req.params.b)
//     let vala = multi(a, b);
//     res.json({
//         multiplication: vala,
//     })
// })
// app.get("/user3", (req, res) => {
//     let { a, b } = req.query;
//     let valuea = multiply(a, b);
//     res.json({
//         msg: "query recived",
//         data: {
//             mul: valuea
//         }
//     })
// })

// app.post("/user", (req, res) => {
//     res.send(req.body)
//     console.log(req.body);
// });

// app.get("/", (req, res) => {
//     return res.send({ status: true, msg: "it is my first self made route" })

// })
// app.get("/user/:id/:name/:age", (req, res) => {
//     res.send({ sataus: true, data: req.params });
// })
// app.get("/search", (req, res) => {
//     const { name, age, role } = req.query;
//     console.log(age, name, role)
//     return res.send({ status: true, data: { name1: name, age, role } })
//     //  return res.send({status:true,data:req.query})

// })
// app.get("/user1/:a/:b", (req, res) => {

//     const a = Number(req.params.a)
//     const b = Number(req.params.b)
//     const valuea = add(a, b)
//     const valueb = subtract(a, b);
//     const valuec = mul(a, b)
//     res.json({
//         add: valuea,

//         subtract: valueb,
//         multiply: valuec
//     });
// })

// app.get("/student/:id", (req, res) => {
//     const id = req.params.id;
//     const { age, name } = req.query;
//     console.log(req.query)
//     res.json({
//         studentId: id,
//         studentAge: age,
//         studentName: name
//     })

// })
// app.post("/salary", [
//   body("user")
//     .notEmpty()
//     .isMongoId()
//     .withMessage("Valid user ID is required"),

//   body("baseSalary")
//     .isNumeric()
//     .withMessage("Base salary must be a number"),

//   body("salaryType")
//     .isIn(["incentive", "overtime"])
//     .withMessage("Invalid salary type"),

//   body("totalSalary")
//     .isNumeric()
//     .withMessage("Total salary must be a number"),

//   body("incentiveAmount")
//     .optional()
//     .isNumeric(),

//   body("overtimeHours")
//     .optional()
//     .isNumeric(),

//   body("overtimeRate")
//     .optional()
//     .isNumeric(),
// ],
//   async (req, res) => {
//     try {
//       const errors = validationResult(req);
//       if (!errors.isEmpty()) {
//         return res.status(400).json({ success: false, errors: errors.array() })
//       }
//       const result = await Salary.insertMany(req.body)
//       // const result = await Salary.create(req.body)
//       // const result = await Salary.insertOne(req.body)
//       res.status(200).json({ success: true, data: result })
//     } catch (error) {
//       res.status(404).json({
//         error: error.message
//       })
//     }
//   }
// )


// app.get(
//   "/students/:id",
//   [
//     param("id")
//       .isMongoId()
//       .withMessage("Invalid student ID"),
//   ],
//   async (req, res) => {
//     try {

//       const errors = validationResult(req);
//       if (!errors.isEmpty()) {
//         return res.status(400).json({
//           success: false,
//           errors: errors.array(),
//         });
//       }


//       // const result = await Salary.find({"totalSalary":{$lte:26000 }})
//       // .populate("user");

//       const resultNew = await Salary.aggregate([
  
//         {
//     $lookup: {
//       from: "Insertdata",
//       localField: "user",
//       foreignField: "_id",
//       as: "userDetail"
//     }
//   }
// ])
// ;console.log(resultNew)

//       if (!resultNew) {
//         return res.status(404).json({
//           success: false,
//           message: "Student not found",
//         });
//       }


//       res.status(200).json({
//         success: true,
//         count:resultNew.length,
//         resultNew
//       });

//     } catch (error) {
//       res.status(500).json({
//         success: false,
//         error: error.message,
//       });
//     }
//   }
// );
// app.put("/salary/:id", [
//   param("id")
//     .isMongoId()
//     .withMessage("Invalid student ID"),
// ], async (req, res) => {
//   try {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(400).json({ success: false, errors: errors.mapped() })
//     }
//     const updated = await Salary.findByIdAndUpdate(
//       // req.params.id,
//        "696632e41f5d6353431d2d45" ,
//     //   { $pull: {
//     //   salary: { baseSalary: 40000 }
//     // }},
//     { $inc: { baseSalary: 10000 } },

//       // req.body,
//       { new: true, runValidators: true }
//     ); res.send(updated)


//   } catch (error) {
//     res.status(400).json({ error: error.message })
//   }

// })
// app.delete("/salary/:id", [
//   param("id").isMongoId().withMessage("id is not valid")
// ], async (req, res) => {
//   try {
//     const errors = validationResult(req)
//     if (!errors.isEmpty()) {
//       return res.status(400).json({ success: false, errors: errors.mapped() })
//     }
//     const deleted = await Salary.findByIdAndDelete(req.params.id,)
//     res.send(deleted)
//     res.status(500).json({ success: true, deleted })
//   } catch (error) {
//     res.status(400).json({ error: error.message })

//   }
// })

