import { PrismaClient, userRole } from "@prisma/client"
import * as bcrypt from "bcrypt"

const prisma = new PrismaClient()

const createAdmin = async(data: any) => {
    const hashedPass = await bcrypt.hash(data.password, 12)

    const userData = {
        email: data.admin.email,
        password: hashedPass,
        role: userRole.ADMIN
    }

    const result = await prisma.$transaction(async(tx) => {
        await tx.user.create({
            data: userData
        })

        const createAdmin = await tx.admin.create({
            data: data.admin
        })

        return createAdmin
    })
    
    return result
}

export const userService = {
    createAdmin
}