import { Request } from "express";
import { PrismaClient, Specialties } from "@prisma/client";
import { uploadToCloudinary } from "../../shared/fileUpload";
import { IFile } from "../../interface/file";

const prisma = new PrismaClient()

const inserIntoDB = async (req: Request) => {

    const file = req.file as IFile;

    if (file) {
        const imageUpload = await uploadToCloudinary(file);
        req.body.icon = imageUpload?.secure_url;
    }

    const result = await prisma.specialties.create({
        data: req.body
    });

    return result;
};

const getAllFromDB = async (): Promise<Specialties[]> => {
    return await prisma.specialties.findMany();
}

const deleteFromDB = async (id: string): Promise<Specialties> => {
    const result = await prisma.specialties.delete({
        where: {
            id,
        },
    });
    return result;
};

export const SpecialtiesService = {
    inserIntoDB,
    getAllFromDB,
    deleteFromDB
}