const express = require("express");
const connectDb = require("./config/db.js");
const cors=require("cors");
const app = express();

connectDb();
const port = 3000;
app.use(express.json());//enable req.body
require("dotenv").config();
app.use(cors());
app.set("view engine","ejs")

app.use(express.static("public"));
app.get("/",(req,res)=>{
    res.render("index.ejs",{title:"home page",user:"nidhi",skills: ["HTML", "CSS", "JS", "Node"]
})
})
app.get("/login",(req,res)=>{
    res.render("login",{title:"Login"})
})
app.get("/register",(req,res)=>{
    res.render("Register",{title:"Register Page"})
})
const route=require("./routers/route.js");//import route
app.use("/api", route);//use route

app.use((err, req, res, next) => {
    console.error(err.stack);

    res.status(err.status || 500).json({
        success: false,
        name:"nidhi",
        message: err.message || "Internal Server Error"
    });
})
app.listen(port, () => {
  console.log(`server is running on port:${port}`)
})