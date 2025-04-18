import { RequestHandler } from "express"
import { authService } from "./auth.service"
import statusCode from "http-status";
import catchAsync from "../../middleWare/catchAsync";
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
        // data: {
        //     accessToken: result.accessToken,
        //     needPassChange: result.needPasswordChange
        // }
    })
})

export const authController = {
    userLogin,
    refreshToken
}