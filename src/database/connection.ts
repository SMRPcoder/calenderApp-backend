import mongoose from "mongoose";

const uri:string="mongodb+srv://rajapandeeswarans369:8R9WassnzoshmQcX@cluster0.lvpiawy.mongodb.net/calender?retryWrites=true&w=majority";

const connection=()=>mongoose.connect(uri).then(()=>{
    console.log("connection established successfully");
}).catch((err)=>{
    console.log(err);
});

export default connection;