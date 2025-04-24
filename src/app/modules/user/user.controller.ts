import { Request, Response } from "express";
import { userService } from "./user.service";
import catchAsync from "../../utils/catchAsync";
import pick from "../../shared/pick";

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
    const query = pick(req.query, ["searchTerm", "email"]) as Record<string, string>;
    const options = pick(req.query, ['page', 'limit', 'sortBy', 'sortOrder']) as Record<string, string>;
    const result = await userService.getAllUsers(query, options)
    res.status(200).json({
        success: true,
        message: "All User Retrive Successfully",
        meta: result.meta,
        data: result.data
    })
})

export const userController = {
    createAdmin,
    createDoctor,
    createPatient,
    getAllUsers
}