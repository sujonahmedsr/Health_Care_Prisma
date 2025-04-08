import { Prisma, PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

const getAdmin = async (params: any) => {
    const {searchTerm, ...fieldData} = params

    console.log(fieldData);
    

    const conditions: Prisma.AdminWhereInput[] = []
    const searchFields = ['name', 'email']

    if (params.searchTerm) {
        conditions.push({
            OR: searchFields.map(field => ({
                [field]: {
                    contains: params.searchTerm,
                    mode: "insensitive"
                }
            }))
        })
    }

    if(Object.keys(fieldData).length > 0){
        conditions.push({
            AND: Object.keys(fieldData).map(key => ({
                [key] : {
                    equals: fieldData[key]
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