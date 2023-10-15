import { Request,Response,Handler } from "express";
import { LoginSchema, UserValidateSchema } from "../functions/joi-validation";
import User from "../models/User";
import Servicer from "../models/Servicer";
import { ServicerLoginSchema, ServicerValidateSchema } from "../functions/joi-validation";
import { createJWT } from "../functions/jwt-token";

export const Login:Handler=(req:Request,res:Response)=>{
    try {
        const {error,value}=LoginSchema.validate(req.body);
        if(!error){
            const {email,password}=value;
            User.where({email}).findOne().then(async (data)=>{
                if(data){
                    if(await data.verifyPassword(password)){
                        const token=createJWT({id:data._id,name:data.name,email:data.email,phoneNumber:data.phoneNumber});
                        res.status(200).json({message:"Logged in Successfully",token,status:true});
                    }else{
                        res.status(400).json({message:"Password Missmatch",status:false});
                    }
                }else{
                    res.status(404).json({message:"Email Not Found",status:false});
                }
            })
        }else{
            res.status(206).json({message:`${error}`,status:false});
        }

    } catch (error) {
        console.log(`Error Happend in login: ${error}`);
        res.status(500).json({message:"Error Happend in login",status:false});
    }
};

export const Register:Handler=(req:Request,res:Response)=>{
    try {
        const {error,value}=UserValidateSchema.validate(req.body);
        if(!error){
            const {email}=value;
            User.where({email}).findOne().then(data=>{
                if(data){
                    res.status(409).json({message:"Email Already Exists",status:false});
                }else{
                    const newUser=new User(value);
                    newUser.save().then(savedData=>{
                        const token=createJWT({id:savedData._id,name:savedData.name,email:savedData.email,phoneNumber:savedData.phoneNumber});
                        res.status(201).json({message:"User Created Successfully",token,status:true});
                    }).catch(err=>{
                        console.log(err);
                        res.status(417).json({message:"Expectation Failed To Save",status:false});
                    });
                }
            })
        }else{
            res.status(206).json({message:`${error}`,status:false});
        }
    } catch (error) {
        console.log(`Error Happend in Registering User: ${error}`);
        res.status(500).json({message:"Error Happend in Registering User",status:false});
    }
}

export const AddServicer:Handler=(req:Request,res:Response)=>{
    try {
        const {error, value}=ServicerValidateSchema.validate(req.body);
        if(!error){
            const {email}=value;
            Servicer.where({email}).findOne().then((data)=>{
                if(data){
                    res.status(409).json({message:"Email Alredy Exists",status:false});
                }else{
                    const newServicer=new Servicer(value);
                    newServicer.save().then(savedData=>{
                        res.status(201).json({message:"Profile Created Successfully",status:true});
                    }).catch(err=>{
                        console.log(err);
                        res.status(417).json({message:"Profile Creating Expectation Failed",status:false});
                    })
                }
            })
        }else{
            res.status(206).json({message:`${error}`,status:false});
        }
    } catch (error) {
        console.error(`Error Happend in Service Registering: ${error}`);
        res.status(500).json({message:"Error Happend in Service Registering",status:false});
    }
};


export const LoginServicer:Handler=(req:Request,res:Response)=>{
    try {
        const {error,value}=ServicerLoginSchema.validate(req.body);
        if(!error){
            const {email,password}=value;
            Servicer.where({email}).findOne().then(async (data)=>{
                if(data){
                    if(await data.verifyPassword(password)){
                        const token=createJWT({
                            id:data._id,
                            first_name:data.first_name,
                            last_name:data.last_name,
                            email:data.email,
                            phoneNumber:data.phoneNumber,
                            address:data.address,
                            service:data.service
                        });
                        res.status(200).json({message:"Logged in Successfully",token,status:true});
                    }else{
                        res.status(401).json({message:"Password Missmatch",status:false});
                    }
                    
                }else{
                    res.status(404).json({message:"Email is Not Found Please Register",status:false});
                }
            })
        }else{
            res.status(206).json({message:error,status:false});
        }
    } catch (error) {
        console.error(`Error Happend in Servicer Logging in: ${error}`);
        res.status(500).json({message:"Error Happend in Servicer Logging in",status:false});
    }
}