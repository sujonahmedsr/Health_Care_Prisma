import { Request, RequestHandler, Response } from "express"
import { authService } from "./auth.service"
import statusCode from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";

const userLogin: RequestHandler = catchAsync(async (req, res) => {
    const result = await authService.userLogin(req.body)
    const { refreshToken } = result

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

const refreshToken: RequestHandler = catchAsync(async (req, res) => {
    const {refreshToken} = req.cookies
    const result = await authService.refreshToken(refreshToken)

    sendResponse(res, {
        statusCode: statusCode.OK,
        success: true,
        message: "Refresh Token Generated.",
        data: result
    })
})

const changePassword = catchAsync(async (req: Request & {user?: any}, res: Response) => {
   
    const result = await authService.changePassword(req.user, req.body)

    sendResponse(res, {
        statusCode: statusCode.OK,
        success: true,
        message: "Change Password Successfully.",
        data: result
    })
})

const forgotPassword = catchAsync(async (req: Request & {user?: any}, res: Response) => {
   
    const result = await authService.forgotPassword(req.body)

    sendResponse(res, {
        statusCode: statusCode.OK,
        success: true,
        message: "Reset Password Okay.",
        data: result
    })
})

export const authController = {
    userLogin,
    refreshToken,
    changePassword,
    forgotPassword
}