import { Request,Response,Handler } from "express";
import { UserEditSchema } from "../functions/joi-validation";
import User from "../models/User";
import { createJWT } from "../functions/jwt-token";


export const editUserInfo:Handler=(req:Request,res:Response)=>{
    try {
        const {error,value}=UserEditSchema.validate(req.body);
        if(!error){
            const {id}=value;
            User.findByIdAndUpdate(id,value,{new:true}).then(data=>{
                if(data){
                    const token=createJWT({id:data._id,name:data.name,email:data.email,phoneNumber:data.phoneNumber});
                    res.status(200).json({message:"Edited Successfully",token,status:true});
                }else{
                    res.status(404).json({message:"Given Data is Not Valid",status:false});
                }
            }).catch(err=>{
                console.log(err);
                res.status(417).json({message:"Editing User Expectation failed,please Try again!!!",status:false});
            })
        }else{
            res.status(206).json({message:error,status:false});
        }
    } catch (error) {
        console.error(`Error Happend while Editing User: ${error}`);
        res.status(500).json({message:"Error Happend while Editing User",status:false});
    }
}