import { model,Schema,Document } from "mongoose";
import { IServiceSchema } from "./Servicer";


export interface IBookingSchema{
    servicerId:Schema.Types.ObjectId|IServiceSchema,
    date:string,
    time:string,
    status:boolean|null,
    name:string,
    email:string,
    phoneNumber:string
};

interface IBookingModel extends IBookingSchema, Document{}

const BookingSchema:Schema=new Schema<IBookingSchema>({
    servicerId:{
        type:Schema.Types.ObjectId,
        required:true,
        ref:"Servicer"
    },
    date:{
        type:String,
        required:true
    },
    time:{
        type:String,
        required:true
    },
    status:{
        type:String,
        default:null
    },
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    phoneNumber:{
        type:String,
        required:true
    }

},{timestamps:true});

const Booking=model<IBookingModel>("Booking",BookingSchema);

export default Booking;

