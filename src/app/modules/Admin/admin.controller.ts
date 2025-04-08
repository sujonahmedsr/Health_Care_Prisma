import { Request, Response } from "express";
import { adminServices } from "./admin.services";
import pick from "../../../shared/pick";

const getAllAdmin = async (req: Request, res: Response) => {
    try {
        const query = pick(req.query, ["name", "email", "searchTerm", "contactNumber"]) as Record<string, string>;

        const result = await adminServices.getAdmin(query);

        res.status(200).json({
            success: true,
            message: "Admin Retrieve Successfully",
            data: result,
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error?.message || "Something went wrong",
            error,
        });
    }
};

export const adminController = {
    getAllAdmin,
};
