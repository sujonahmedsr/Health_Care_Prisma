import { Request, Response } from "express"
import { adminServices } from "./admin.services"

const getAllAdmin = async (req: Request, res: Response) => {
    try {
        const result = await adminServices.getAdmin(req.query)
        res.status(200).json({
            success: true,
            message: "Admin Retrive Successfully",
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

export const adminController = {
    getAllAdmin
}