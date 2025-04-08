import { Request, Response } from "express";
import { userService } from "./user.service";

const createAdmin = async (req: Request, res: Response) => {
    try {
        const result = await userService.createAdmin(req.body)
        res.status(200).json({
            success: true,
            message: "Admic Created Successfully",
            data: result
        })
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error?.name || "Something went wrong",
            error: error
        })
    }
}

export const userController = {
    createAdmin
}