import { PrismaClient, userRole } from "@prisma/client"
import * as bcrypt from "bcrypt"
import { uploadToCloudinary } from "../../shared/fileUpload"

const prisma = new PrismaClient()

const createAdmin = async(req: any) => {
    const file = req.file
    
    if(file){
        const imageUpload = await uploadToCloudinary(file)
        console.log(imageUpload, "image");
    }

    
    

    
    // const hashedPass = await bcrypt.hash(data.password, 12)

    // const userData = {
    //     email: data.admin.email,
    //     password: hashedPass,
    //     role: userRole.ADMIN
    // }

    // const result = await prisma.$transaction(async(tx) => {
    //     await tx.user.create({
    //         data: userData
    //     })

    //     const createAdmin = await tx.admin.create({
    //         data: data.admin
    //     })

    //     return createAdmin
    // })
    
    // return result
}

export const userService = {
    createAdmin
}