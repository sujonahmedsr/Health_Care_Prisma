import { NextFunction, Request, Response } from "express";
import { adminServices } from "./admin.services";
import pick from "../../../shared/pick";
import { adminFilterableFields } from "./admin.constant";
import sendResponse from "../../../utils/sendResponse";
import statusCode from "http-status";

const getAllAdmin = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const query = pick(req.query, adminFilterableFields) as Record<string, string>;
        const options = pick(req.query, ['page', 'limit', 'sortBy', 'sortOrder']) as Record<string, string>;

        const result = await adminServices.getAdmin(query, options);

        sendResponse(res, {
            statusCode: statusCode.OK,
            success: true,
            message: "Get all admin",
            meta: result.meta,
            data: result.data
        })
    } catch (error: any) {
        next(error)
    }
};

const getSingleAdmin = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params
        const result = await adminServices.getSingleAdmin(id)
        sendResponse(res, {
            statusCode: statusCode.OK,
            success: true,
            message: "Get Single admin",
            data: result
        })
    } catch (error: any) {
        next(error)
    }
}

const updateAdmin = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params
        const data = req.body
        const result = await adminServices.updateAdmin(id, data)
        sendResponse(res, {
            statusCode: statusCode.OK,
            success: true,
            message: "Update admin",
            data: result
        })
    } catch (error: any) {
        next(error)
    }
}

const deleteData = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params
        const result = await adminServices.deleteFromDb(id)
        sendResponse(res, {
            statusCode: statusCode.OK,
            success: true,
            message: "Delete admin",
            data: result
        })
    } catch (error: any) {
        next(error)
    }
}

const softDeleteData = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params
        const result = await adminServices.softDeletedFromDb(id)
        sendResponse(res, {
            statusCode: statusCode.OK,
            success: true,
            message: "Soft Delete admin",
            data: result
        })
    } catch (error: any) {
        next(error)
    }
}

export const adminController = {
    getAllAdmin,
    getSingleAdmin,
    updateAdmin,
    deleteData,
    softDeleteData
};
