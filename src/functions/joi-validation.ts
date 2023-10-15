import Joi from "joi";
import { IUserSchema } from "../models/User";
import { IServiceSchema } from "../models/Servicer";
import { IBookingSchema } from "../models/Booking";

interface UpdateBooking {
    id: string,
    status: boolean | null
};

interface IUserEditSchema extends IUserSchema{
    id:string
};

interface IServiceEditSchema extends IServiceSchema{
    id:string
}

export const UserValidateSchema: Joi.ObjectSchema = Joi.object<IUserSchema>({
    name: Joi.string().required().min(2),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).max(22).required(),
    phoneNumber: Joi.string().min(10).max(10).required()
});

export const UserEditSchema: Joi.ObjectSchema = Joi.object<IUserEditSchema>({
    id:Joi.string().required(),
    name: Joi.string().optional().min(2),
    email: Joi.string().email().optional(),
    phoneNumber: Joi.string().min(10).max(10).optional()
})
    .or("name", "email", "phoneNumber");

export const LoginSchema: Joi.ObjectSchema = Joi.object<IUserSchema>({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).max(22).required()
});

export const ServicerValidateSchema: Joi.ObjectSchema = Joi.object<IServiceSchema>({
    first_name: Joi.string().required(),
    last_name: Joi.string(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).max(22).required(),
    address: Joi.string().required(),
    service: Joi.string().required(),
    startTime: Joi.number().required(),
    totalHours: Joi.number().required(),
    restStartingTime: Joi.number(),
    restTotalTime: Joi.number()
})
    .xor("restStartingTime", "restTotalTime")
    .and("restStartingTime", "restTotalTime");

export const ServicerEditSchema: Joi.ObjectSchema = Joi.object<IServiceEditSchema>({
    id:Joi.string().required(),
    first_name: Joi.string().optional(),
    last_name: Joi.string(),
    email: Joi.string().email().optional(),
    address: Joi.string().optional(),
    service: Joi.string().optional(),
    startTime: Joi.number().optional(),
    totalHours: Joi.number().optional(),
    restStartingTime: Joi.number(),
    restTotalTime: Joi.number()
})
    .or("first_name", "last_name", "email", "address", "service", "startTime", "totalHours")
    .xor("restStartingTime", "restTotalTime")
    .and("restStartingTime", "restTotalTime");

export const ServicerLoginSchema: Joi.ObjectSchema = Joi.object<IServiceSchema>({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).max(22).required()
});

export const AddBookingSchema: Joi.ObjectSchema = Joi.object<IBookingSchema>({
    servicerId: Joi.string().required(),
    date: Joi.string().required(),
    time: Joi.string().required(),
    status: Joi.string().optional(),
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    phoneNumber: Joi.string().required()
});

export const UpdateBooking: Joi.ObjectSchema = Joi.object<UpdateBooking>({
    id: Joi.string().required(),
    status: Joi.string().required()
});



