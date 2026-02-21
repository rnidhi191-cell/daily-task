const mongoose =require( "mongoose");
// OWkoH5mbbJ8yrySI
// mongodb+srv://rnidhi191_db_user:OWkoH5mbbJ8yrySI@cluster0.83naiue.mongodb.net/new_project
const connectDb=async()=>{
    try{
await mongoose.connect("mongodb+srv://rnidhi191_db_user:OWkoH5mbbJ8yrySI@cluster0.83naiue.mongodb.net/new_project");
console.log("db connected")
}catch(error){
console.error("mongodb error",error.message)
// process.exit(1);
    }

}
 module.exports= connectDb;