import jwt,{ Jwt } from "jsonwebtoken";

export interface IUser {
    id:string,
    name:string,
    email:string,
    phoneNumber:string
}

export interface IServicer {
    id:string,
    first_name:string,
    last_name?:string,
    email:string,
    phoneNumber:string,
    address:string,
    service:string
}

const SecretKey:string="e294447404aafa64632f4d7033e6cf82";

export const createJWT=(UserDetail:IUser|IServicer)=>{
    const token=jwt.sign(UserDetail,SecretKey,{expiresIn:"24h"});
    return token;
};

export const verifyJWT=(token:string)=>{
    const decoded=jwt.verify(token,SecretKey);
    return decoded;
}
