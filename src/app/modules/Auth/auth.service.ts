import { PrismaClient, User, userStatus } from "@prisma/client"
import bcrypt from "bcrypt"
import status from "http-status"
import { generateToken, verifyToken } from "../../shared/generateToken"
import config from "../../config"
import ApiError from "../../error"
import emailSender from "./sendEmail"
const prisma = new PrismaClient()

const userLogin = async (payload: {
    email: string,
    password: string
}) => {
    const userData = await prisma.user.findUnique(
        {
            where: {
                email: payload.email
            }
        }
    )

    if (!userData) {
        throw new ApiError(status.NOT_FOUND, "User not found.")
    }

    const isPasswordMatched = await bcrypt.compare(payload.password, userData.password)

    if (!isPasswordMatched) {
        throw new ApiError(status.BAD_REQUEST, "Invalid password or email.")
    }

    const jwtPayload = {
        email: userData.email,
        role: userData.role
    }
    const accessToken = generateToken(jwtPayload, config.jwt_secrete as string, config.jwt_secrete_expires_in)
    const refreshToken = generateToken(jwtPayload, config.jwt_refresh as string, config.jwt_refresh_expires_in)

    return {
        accessToken,
        refreshToken,
        needPasswordChange: userData.needPasswordChange
    }
}

const refreshToken = async (token: string) => {
    let decoded;
    try {
        decoded = verifyToken(token, config.jwt_refresh as string)
    } catch (error) {
        throw new ApiError(status.UNAUTHORIZED, "You are not authorized.")
    }

    const userData = await prisma.user.findUnique({
        where: {
            email: decoded?.email
        }
    })

    if (!userData) {
        throw new ApiError(status.NOT_FOUND, "User not found.")
    }

    const jwtPayload = {
        email: userData?.email,
        role: userData?.role
    }

    const accessToken = generateToken(jwtPayload, config.jwt_secrete as string, config.jwt_secrete_expires_in)

    return {
        accessToken,
        needPasswordChange: userData.needPasswordChange
    }
}

const changePassword = async (user: User, payload: {
    oldPassword: string,
    newPassword: string
}) => {
    const userData = await prisma.user.findUnique({
        where: {
            email: user.email
        }
    })

    if (!userData) {
        throw new ApiError(status.NOT_FOUND, "User not found.")
    }

    const isPasswordMatched = await bcrypt.compare(payload.oldPassword, userData.password)

    if (!isPasswordMatched) {
        throw new ApiError(status.NOT_FOUND, "Password Did't Match.")
    }

    const passwordHashed = await bcrypt.hash(payload.newPassword, 12)

    await prisma.user.update({
        where: {
            email: userData.email
        },
        data: {
            password: passwordHashed,
            needPasswordChange: false
        }
    })
}

const forgotPassword = async (payload: {
    email: string
}) => {
    const userData = await prisma.user.findUnique({
        where: {
            email: payload?.email,
            status: userStatus.ACTIVE
        }
    })

    if (!userData) {
        throw new ApiError(status.NOT_FOUND, "User not found.")
    }

    const resetToken = generateToken({
        email: userData.email,
        role: userData.role
    }, config.reset_pass_secrete as string, config.reset_pass_expires_in)

    const passResetLink = `${config.reset_pass_link}?email=${userData?.email}&token=${resetToken}`

    await emailSender(
        userData.email,
        `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
          <h2 style="color: #2c3e50;">Password Reset Request</h2>
          <p>Assalamu Alaikum ${userData?.email || ''},</p>
          <p>We received a request to reset your password. If you made this request, please click the button below to reset your password:</p>
          
          <div style="margin: 20px 0;">
            <a href="${passResetLink}" 
               style="background-color: #3498db; color: #fff; padding: 12px 20px; text-decoration: none; border-radius: 5px; display: inline-block;">
              Reset Password
            </a>
          </div>
      
          <p>If the button doesn't work, you can copy and paste this link into your browser:</p>
          <p style="word-break: break-all;">${passResetLink}</p>
      
          <p>If you didn’t request a password reset, you can safely ignore this email. Your password will not be changed.</p>
      
          <p>JazakAllah Khair,<br/>The Support Team</p>
          <hr/>
          <small style="color: #777;">This link will expire in 15 minutes for security reasons.</small>
        </div>
        `
    );
}

export const authService = {
    userLogin,
    refreshToken,
    changePassword,
    forgotPassword
}