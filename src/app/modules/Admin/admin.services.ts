import { Admin, Prisma, PrismaClient } from "@prisma/client";
import { searchFields } from "./admin.constant";
import { calculatePagination, IOptions } from "../../../shared/paginationHelper";

const prisma = new PrismaClient();

type AdminQueryParams = {
    searchTerm?: string;
    [key: string]: string | undefined; // dynamic filtering fields
};

const getAdmin = async (params: AdminQueryParams, options: IOptions) => {
    const { page, limit, skip, sortBy, sortOrder } = calculatePagination(options)
    const { searchTerm, ...fieldData } = params;
    const conditions: Prisma.AdminWhereInput[] = [];

    // 🔍 Search Term condition
    if (searchTerm) {
        conditions.push({
            OR: searchFields.map(field => ({
                [field]: {
                    contains: searchTerm,
                    mode: 'insensitive'
                }
            }))
        });
    }

    // 🔍 Dynamic field filter condition
    if (Object.keys(fieldData).length > 0) {
        conditions.push({
            AND: Object.entries(fieldData).map(([key, value]) => ({
                [key]: {
                    equals: value
                }
            }))
        });
    }

    conditions.push({
        isDeleted: false
    })

    const whereInfo: Prisma.AdminWhereInput = conditions.length > 0 ? { AND: conditions } : {};


    // 🔍 Final Prisma query
    const result = await prisma.admin.findMany({
        where: whereInfo,
        skip,
        take: limit,
        orderBy: sortBy && sortOrder ? {
            [sortBy]: sortOrder
        } : {
            createdAt: "desc"
        }
    });

    const total = await prisma.admin.count({
        where: whereInfo
    })

    return {
        meta: {
            page,
            limit,
            total
        },
        data: result
    };
};

const getSingleAdmin = async (id: string) => {
    const result = await prisma.admin.findUnique({
        where: {
            id,
            isDeleted: false
        }
    })

    return result
}

const updateAdmin = async (id: string, data: Partial<Admin>) => {
    const existing = await prisma.admin.findUnique({
        where: {
            id,
            isDeleted: false
        }
    })

    if (!existing) {
        throw new Error("Admin not found.")
    }

    const result = await prisma.admin.update({
        where: {
            id
        },
        data
    })
    return result
}

const deleteFromDb = async (id: string) => {
    const existing = await prisma.admin.findUnique({
        where: {
            id,
            isDeleted: false
        }
    })

    if (!existing) {
        throw new Error("Admin not found.")
    }

    const result = await prisma.$transaction(async (transactionClient) => {
        const adminDeletedData = await transactionClient.admin.delete({
            where: {
                id
            }
        });

        await transactionClient.user.delete({
            where: {
                email: adminDeletedData.email
            }
        });

        return adminDeletedData;
    });

    return result
}

const softDeletedFromDb = async (id: string) => {
    const existing = await prisma.admin.findUnique({
        where: {
            id,
            isDeleted: false
        }
    })
    if (!existing) {
        throw new Error("Admin not found.")
    }

    const result = await prisma.$transaction(async (tx) => {
        const adminDeletedData = await tx.admin.update({
            where: {
                id
            },
            data: {
                isDeleted: true
            }
        })

        const userDeleted = await tx.user.update({
            where: {
                email: adminDeletedData.email
            },
            data: {
                status: "BLOCKED"
            }
        })
        return adminDeletedData
    })

    return result
}

export const adminServices = {
    getAdmin,
    getSingleAdmin,
    updateAdmin,
    deleteFromDb,
    softDeletedFromDb
};
