import { RequestHandler } from "express"
import catchAsync from "../../../middleWare/catchAsync"
import { authService } from "./auth.service"
import sendResponse from "../../../utils/sendResponse"
import statusCode from "http-status";

const userLogin: RequestHandler = catchAsync(async (req, res) => {
    const result = await authService.userLogin(req.body)
    sendResponse(res, {
        statusCode: statusCode.OK,
        success: true,
        message: "User Logged In Okay",
        data: result
    })
})

export const authController = {
    userLogin
}