import { PrismaClient } from "@prisma/client"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
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
    const accessToken = jwt.sign(jwtPayload, "12ssd0.3",
        {
            algorithm: "HS256",
            expiresIn: "15m"
        })
    const refreshToken = jwt.sign(jwtPayload, "12ssd0.3",
        {
            algorithm: "HS256",
            expiresIn: "30d"
        })

    return {
        accessToken,
        refreshToken,
        needPasswordChange: userData.needPasswordChange
    }
}

export const authService = {
    userLogin
}