import { PrismaClient, userRole } from "@prisma/client"

const prisma = new PrismaClient()

const createAdmin = async(data: any) => {
    const userData = {
        email: data.admin.email,
        password: data.password,
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