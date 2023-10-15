import { Express }  from "express-serve-static-core";
import express from "express";
import connection from "./database/connection";
import AuthRouter from "./routers/auth-routes";

const app:Express=express();
app.use(express.json());
connection();//conneting mongoose...

app.get("/",(req,res)=>{
    res.status(200).json({message:"hii hello world", status:true});
})

app.use("/api/auth",AuthRouter);

app.listen(4000,()=>{
    console.log("listening on port 4000")
})