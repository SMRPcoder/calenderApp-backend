import { model,Schema,Document } from "mongoose";
import bcrypt from "mongoose-bcrypt";

export interface IServiceSchema{
    first_name:string,
    last_name?: string,
    email: string,
    password:string,
    phoneNumber:string,
    address: string,
    service: string,
    startTime:number,
    totalHours:number,
    restStartingTime:number,
    restTotalTime:number
};

interface IServiceModel extends IServiceSchema,Document{
    verifyPassword(password:string):Promise<boolean>
}

const ServicerSchema:Schema=new Schema<IServiceSchema>({
    first_name:{
        type:String,
        required:true
    },
    last_name:{
        type:String
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        bcrypt:true
    },
    phoneNumber:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    service:{
        type:String,
        required:true
    },
    startTime:{
        type:Number,
        required:true
    },
    totalHours:{
        type:Number,
        required:true
    },
    restStartingTime:{
        type:Number,
        required:true
    },
    restTotalTime:{
        type:Number,
        required:true
    }
},{timestamps:true}).plugin(bcrypt,{
    fields:["password"]
});

const Servicer=model<IServiceModel>("Servicer",ServicerSchema);

export default Servicer;