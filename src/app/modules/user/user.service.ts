import { PrismaClient, userRole } from "@prisma/client"
import * as bcrypt from "bcrypt"
import { uploadToCloudinary } from "../../shared/fileUpload"
import ApiError from "../../error"
import status from "http-status"

const prisma = new PrismaClient()

const createAdmin = async (req: any) => {
    const file = req.file
    const data = req.body

    if(file){
        const imageUpload = await uploadToCloudinary(file)
        req.body.admin.profilePhoto = imageUpload?.secure_url
    }


    const hashedPass = await bcrypt.hash(data.password, 12)

    const userData = {
        email: data.admin.email,
        password: hashedPass,
        role: userRole.ADMIN
    }

    const result = await prisma.$transaction(async (tx) => {
        const isUserExist = await tx.user.findUnique({
            where: {
                email: data.admin.email
            }
        })
        if(isUserExist){
            throw new ApiError(status.BAD_REQUEST, "This email already used.")
        }
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