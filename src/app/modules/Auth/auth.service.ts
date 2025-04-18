import { PrismaClient } from "@prisma/client"
import bcrypt from "bcrypt"
import status from "http-status"
import { generateToken, verifyToken } from "../../shared/generateToken"
import config from "../../config"
import ApiError from "../../error"
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
        throw new Error("User not found.")
    }

    const isPasswordMatched = await bcrypt.compare(payload.password, userData.password)

    if (!isPasswordMatched) {
        throw new Error("Invalid password or email.")
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

    if(!userData){
        throw new Error("User not found.")
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

export const authService = {
    userLogin,
    refreshToken
}