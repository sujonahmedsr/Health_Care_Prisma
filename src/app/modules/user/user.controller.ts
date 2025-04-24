import { Request, Response } from "express";
import { userService } from "./user.service";
import catchAsync from "../../utils/catchAsync";

const createAdmin = catchAsync(async (req: Request, res: Response) => {
    const result = await userService.createAdmin(req)
    res.status(200).json({
        success: true,
        message: "Admin Created Successfully",
        data: result
    })
})

const createDoctor = catchAsync(async (req: Request, res: Response) => {
    const result = await userService.createDoctor(req)
    res.status(200).json({
        success: true,
        message: "Doctor Created Successfully",
        data: result
    })
})

const createPatient = catchAsync(async (req: Request, res: Response) => {
    const result = await userService.createPatient(req)
    res.status(200).json({
        success: true,
        message: "Patient Created Successfully",
        data: result
    })
})

const getAllUsers = catchAsync(async (req: Request, res: Response) => {
    const query = req.query
    const result = await userService.getAllUsers(query)
    res.status(200).json({
        success: true,
        message: "All User Retrive Successfully",
        data: result
    })
})

export const userController = {
    createAdmin,
    createDoctor,
    createPatient,
    getAllUsers
}