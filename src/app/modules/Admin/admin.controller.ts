import { NextFunction, Request, RequestHandler, Response } from "express";
import { adminServices } from "./admin.services";
import pick from "../../../shared/pick";
import { adminFilterableFields } from "./admin.constant";
import sendResponse from "../../../utils/sendResponse";
import statusCode from "http-status";
import catchAsync from "../../../middleWare/catchAsync";



const getAllAdmin: RequestHandler = catchAsync(async (req, res, next) => {
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
})

const getSingleAdmin = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params
    const result = await adminServices.getSingleAdmin(id)
    sendResponse(res, {
        statusCode: statusCode.OK,
        success: true,
        message: "Get Single admin",
        data: result
    })
})

const updateAdmin = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params
    const data = req.body
    const result = await adminServices.updateAdmin(id, data)
    sendResponse(res, {
        statusCode: statusCode.OK,
        success: true,
        message: "Update admin",
        data: result
    })
})

const deleteData = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params
    const result = await adminServices.deleteFromDb(id)
    sendResponse(res, {
        statusCode: statusCode.OK,
        success: true,
        message: "Delete admin",
        data: result
    })
})

const softDeleteData = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params
    const result = await adminServices.softDeletedFromDb(id)
    sendResponse(res, {
        statusCode: statusCode.OK,
        success: true,
        message: "Soft Delete admin",
        data: result
    })
})

export const adminController = {
    getAllAdmin,
    getSingleAdmin,
    updateAdmin,
    deleteData,
    softDeleteData
};
