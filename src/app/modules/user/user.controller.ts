import { Request, Response } from "express";
import { userService } from "./user.service";
import catchAsync from "../../utils/catchAsync";
import pick from "../../shared/pick";
import { userFilterableFields } from "./user.constant";

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
    const query = pick(req.query, userFilterableFields) as Record<string, string>;
    const options = pick(req.query, ['page', 'limit', 'sortBy', 'sortOrder']) as Record<string, string>;
    const result = await userService.getAllUsers(query, options)
    res.status(200).json({
        success: true,
        message: "All User Retrive Successfully",
        meta: result.meta,
        data: result.data
    })
})

const changeProfileStatus = catchAsync(async (req: Request, res: Response) => {

    const { id } = req.params;
    const result = await userService.changeProfileStatus(id, req.body)

    res.status(200).json({
        success: true,
        message: "Users profile status changed!",
        data: result
    })
});

export const userController = {
    createAdmin,
    createDoctor,
    createPatient,
    getAllUsers,
    changeProfileStatus
}