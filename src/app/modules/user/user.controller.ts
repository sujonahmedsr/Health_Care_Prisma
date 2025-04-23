import { Request, Response } from "express";
import { userService } from "./user.service";
import catchAsync from "../../utils/catchAsync";

const createAdmin = catchAsync(async (req: Request, res: Response) => {
    
    const result = await userService.createAdmin(req.body)
    res.status(200).json({
        success: true,
        message: "Admic Created Successfully",
        data: result
    })
})

export const userController = {
    createAdmin
}