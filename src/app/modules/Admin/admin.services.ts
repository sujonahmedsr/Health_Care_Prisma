import { Prisma, PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

const getAdmin = async (params: any) => {
    const conditions: Prisma.AdminWhereInput[] = []

    // [
    //     {
    //         name: {
    //             contains: params.searchTerm,
    //             mode: "insensitive"
    //         }
    //     },
    //     {
    //         email: {
    //             contains: params.searchTerm,
    //             mode: "insensitive"
    //         }
    //     }
    // ]

    if (params.searchTerm) {
        conditions.push({
            OR: ['name', 'email'].map(field => ({
                [field]: {
                    contains: params.searchTerm,
                    mode: "insensitive"
                }
            }))
        })
    }

    const whereInfo: Prisma.AdminWhereInput = { AND: conditions }

    const result = await prisma.admin.findMany({
        where: whereInfo
    })
    return result
}

export const adminServices = {
    getAdmin
}