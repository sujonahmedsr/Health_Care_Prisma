import { PrismaClient } from "@prisma/client"
import bcrypt from "bcrypt"
import { generateToken, verifyToken } from "../../../shared/generateToken"
import jwt, { JwtPayload } from "jsonwebtoken"
import config from "../../../config"
const prisma = new PrismaClient()

const userLogin = async (payload: {
    email: string,
    password: string
}) => {
    const userData = await prisma.user.findUnique(
        {
            where: {
                email: payload.email,
                status: "ACTIVE"
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
        decoded = verifyToken(token, "12ssd0.5")
    } catch (error) {
        throw new Error("You are not authorized.")
    }
    
    const userData = await prisma.user.findUnique({
        where: {
            email: decoded?.email,
            status: "ACTIVE"
        }
    })

    if(!userData){
        throw new Error("User not found.")
    }

    const jwtPayload = {
        email: userData?.email,
        role: userData?.role
    }

    const accessToken = generateToken(jwtPayload, config.jwt_refresh as string, config.jwt_refresh_expires_in)

    return {
        accessToken,
        needPasswordChange: userData.needPasswordChange
    }
}

export const authService = {
    userLogin,
    refreshToken
}