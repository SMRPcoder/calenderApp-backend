import mongoose, { Schema,model,Document} from "mongoose";
const bcrypt=require("mongoose-bcrypt");


export interface IUserSchema {
    name:string,
    email:string,
    password:string,
    phoneNumber:string
}

export interface IUserModel extends IUserSchema,Document {
    verifyPassword(password:string):Promise<boolean>;
}

const UserSchema:Schema=new Schema<IUserSchema>({
    name:{
        type:String,
        required:true
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
    }
    
},{
    timestamps:true
}).plugin(bcrypt,{
    fields:["password"]
})

const User=model<IUserModel>("User",UserSchema);
export default User;