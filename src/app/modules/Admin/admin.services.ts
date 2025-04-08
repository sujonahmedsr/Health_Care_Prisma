import { Prisma, PrismaClient } from "@prisma/client";
import { searchFields } from "./admin.constant";
import { calculatePagination, IOptions } from "../../../shared/paginationHelper";

const prisma = new PrismaClient();

type AdminQueryParams = {
    searchTerm?: string;
    [key: string]: string | undefined; // dynamic filtering fields
};

const getAdmin = async (params: AdminQueryParams, options: IOptions) => {
    const { limit, skip, sortBy, sortOrder } = calculatePagination(options)
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

    return result;
};

export const adminServices = {
    getAdmin
};
