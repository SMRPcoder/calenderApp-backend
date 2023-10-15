import { Request, Response, Handler } from "express";
import { AddBookingSchema, UpdateBooking } from "../functions/joi-validation";
import Booking from "../models/Booking";
import moment from "moment";
import { IServiceSchema } from "../models/Servicer";



export const AddBooking: Handler = (req: Request, res: Response) => {
    try {
        const { error, value } = AddBookingSchema.validate(req.body);
        if (!error) {
            const { servicerId, date, time } = value;
            Booking.where({ servicerId, date, time }).findOne().populate("servicerId").then((data) => {
                const servicerData = (data?.servicerId as IServiceSchema);
                const startTime = moment(servicerData.startTime, "HH:mm");
                const endTime = moment(`${Number(servicerData.startTime) + Number(servicerData.totalHours)}`, "HH:mm");
                const timetoCheck = moment(time, "HH:mm")
                if (timetoCheck.isBetween(startTime, endTime, undefined, "[]")) {
                    const newBooking = new Booking(value);
                    newBooking.save().then(savedData => {
                        res.status(201).json({ message: "Booked Successfully", status: true });
                    }).catch(err => {
                        console.log(err);
                        res.status(417).json({ message: "Booking Expectation Failed", status: false });
                    });
                } else {
                    res.status(405).json({ message: "Scheduled Time is Not Within the Time of Servicer", status: false });
                }
            })
        }else{
            res.status(206).json({message:`${error}`,status:false});
        }
    } catch (error) {
        console.log(`Error Happend in Registering Booking: ${error}`);
        res.status(500).json({ message: "Error Happend in Registering Booking", status: false });
    }
}


export const changeStatus: Handler = (req: Request, res: Response) => {
    try {
        const { error, value } = UpdateBooking.validate(req.body);
        if (!error) {
            const {id,status}=value;
            Booking.findByIdAndUpdate(id,value,{new:true}).then(data=>{
                if(data){
                    const message=status?"Approved Successfully":"Disapproved Successfully";
                    res.status(200).json({message:message,status:true});
                }else{
                    res.status(404).json({message:"Given Data Not Matched",status:false});
                }
            })
        } else{
            res.status(206).json({message:`${error}`,status:false});
        }
    } catch (error) {
        console.log(`Error Happend while Approve/Disapprove: ${error}`);
        res.status(500).json({ message: "Error Happend while Approve/Disapprove", status: false });
    }
}