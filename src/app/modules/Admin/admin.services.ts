import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

type AdminQueryParams = {
  searchTerm?: string;
  [key: string]: string | undefined; // dynamic filtering fields
};

const getAdmin = async (params: AdminQueryParams) => {
  const { searchTerm, ...fieldData } = params;

  const conditions: Prisma.AdminWhereInput[] = [];
  const searchFields = ['name', 'email'];

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
    where: whereInfo
  });

  return result;
};

export const adminServices = {
  getAdmin
};
