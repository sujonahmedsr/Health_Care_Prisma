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
    const result = await userService.createAdmin(req)
    res.status(200).json({
        success: true,
        message: "Doctor Created Successfully",
        data: result
    })
})

export const userController = {
    createAdmin,
    createDoctor
}