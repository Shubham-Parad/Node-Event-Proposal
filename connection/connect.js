const mongoose=require("mongoose")
require("dotenv").config();

const url = process.env.DB_URL
// console.log(url)
mongoose.connect(url)
.then(res=>{
    console.log("connected to DB") 
})
.catch(res=>{
    console.log("error:"+res)
})
