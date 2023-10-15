import { Request,Response,Handler } from "express";
import Servicer from "../models/Servicer";
import { createJWT } from "../functions/jwt-token";
import { ServicerEditSchema } from "../functions/joi-validation";


export const EditServicer:Handler=(req:Request,res:Response)=>{
    try {
        const {error,value}=ServicerEditSchema.validate(req.body);
        if(!error){
            const {id}=value;
            Servicer.findByIdAndUpdate(id,value,{new:true}).then(data=>{
                if(data){
                    const token=createJWT({
                        id:data._id,
                        first_name:data.first_name,
                        last_name:data.last_name,
                        email:data.email,
                        phoneNumber:data.phoneNumber,
                        address:data.address,
                        service:data.service
                    });
                    res.status(200).json({message:"Edited Successfully",token,status:true});
                }else{
                    res.status(404).json({message:"Given Data is Not Matched",status:false});
                }
            })
        }else{
            res.status(206).json({message:error,status:false});
        }
    } catch (error) {
        console.error(`Error Happend while Editing Servicer: ${error}`);
        res.status(500).json({message:"Error Happend while Editing Servicer",status:false});
    }
}



