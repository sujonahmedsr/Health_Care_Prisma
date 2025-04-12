import { RequestHandler } from "express"
import catchAsync from "../../../middleWare/catchAsync"
import { authService } from "./auth.service"
import sendResponse from "../../../utils/sendResponse"
import statusCode from "http-status";

const userLogin: RequestHandler = catchAsync(async (req, res) => {
    const result = await authService.userLogin(req.body)
    const {refreshToken} = result
    
    res.cookie("refreshToken", refreshToken, {
        secure: false,
        httpOnly: true
    })
    sendResponse(res, {
        statusCode: statusCode.OK,
        success: true,
        message: "User Logged In Okay",
        data: {
            accessToken: result.accessToken,
            needPassChange: result.needPasswordChange
        }
    })
})

export const authController = {
    userLogin
}