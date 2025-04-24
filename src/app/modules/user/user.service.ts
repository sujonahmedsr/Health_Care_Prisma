import { Admin, Doctor, Patient, Prisma, PrismaClient, userRole } from "@prisma/client"
import * as bcrypt from "bcrypt"
import { uploadToCloudinary } from "../../shared/fileUpload"
import ApiError from "../../error"
import status from "http-status"
import { Request } from "express"
import { object } from "zod"
import { calculatePagination, IOptions } from "../../shared/paginationHelper"

const prisma = new PrismaClient()

const createAdmin = async (req: Request): Promise<Admin> => {
    const file = req.file
    const data = req.body

    if (file) {
        const imageUpload = await uploadToCloudinary(file)

        if (!imageUpload?.secure_url) {
            throw new ApiError(status.INTERNAL_SERVER_ERROR, "Image upload failed");
        }

        req.body.admin.profilePhoto = imageUpload?.secure_url
    }

    if (!data?.password) {
        throw new ApiError(status.BAD_REQUEST, "Password is required");
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
        if (isUserExist) {
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

const createDoctor = async (req: Request): Promise<Doctor> => {
    const file = req.file
    const data = req.body

    if (file) {
        const imageUpload = await uploadToCloudinary(file)
        if (!imageUpload?.secure_url) {
            throw new ApiError(status.INTERNAL_SERVER_ERROR, "Image upload failed");
        }
        req.body.doctor.profilePhoto = imageUpload.secure_url
    }

    if (!data?.password) {
        throw new ApiError(status.BAD_REQUEST, "Password is required");
    }

    const hashedPass = await bcrypt.hash(data.password, 12)

    const userData = {
        email: data.doctor.email,
        password: hashedPass,
        role: userRole.DOCTOR
    }

    const result = await prisma.$transaction(async (tx) => {
        const isDoctorExist = await tx.user.findUnique({
            where: {
                email: data.doctor.email
            }
        })
        if (isDoctorExist) {
            throw new ApiError(status.BAD_REQUEST, "This email already used.")
        }
        await tx.user.create({
            data: userData
        })

        const createDoctor = await tx.doctor.create({
            data: data.doctor
        })

        return createDoctor
    })

    return result
}

const createPatient = async (req: Request): Promise<Patient> => {
    const file = req.file
    const data = req.body

    if (file) {
        const imageUpload = await uploadToCloudinary(file)
        if (!imageUpload?.secure_url) {
            throw new ApiError(status.INTERNAL_SERVER_ERROR, "Image upload failed");
        }
        req.body.patient.profilePhoto = imageUpload.secure_url
    }

    if (!data?.password) {
        throw new ApiError(status.BAD_REQUEST, "Password is required");
    }

    const hashedPass = await bcrypt.hash(data.password, 12)

    const userData = {
        email: data.patient.email,
        password: hashedPass,
        role: userRole.PATIENT
    }

    const result = await prisma.$transaction(async (tx) => {
        const isUserExist = await tx.user.findUnique({
            where: {
                email: data.patient.email
            }
        })
        if (isUserExist) {
            throw new ApiError(status.BAD_REQUEST, "This email already used.")
        }
        await tx.user.create({
            data: userData
        })

        const createDoctor = await tx.patient.create({
            data: data.patient
        })

        return createDoctor
    })

    return result
}

const getAllUsers = async (query: any, options: IOptions) => {
    const { searchTerm, ...field } = query
    const { page, limit, skip, sortBy, sortOrder } = calculatePagination(options)
    const andConditions: Prisma.UserWhereInput[] = []

    if(searchTerm){
        andConditions.push({
            OR: ["email"].map(field => ({
                [field]: {
                    contains: searchTerm,
                    mode: "insensitive"
                }
            }))
        })
    }

    if(Object.keys(field).length > 0){
        andConditions.push({
            AND: Object.keys(field).map(key => ({
                [key]: {
                    equals: field[key]
                }
            }))
        })
    }

    const whereConditions: Prisma.UserWhereInput = {AND: andConditions}

    const result = await prisma.user.findMany({
        where: whereConditions,
        skip,
        take: Number(limit),
        orderBy: sortBy && sortOrder ? {
            [sortBy]: sortOrder
        } : {
            createdAt: "desc"
        }
    })
    const total = await prisma.user.count()
    return {
        meta: {
            page,
            limit,
            total
        },
        data: result
    };
}

export const userService = {
    createAdmin,
    createDoctor,
    createPatient,
    getAllUsers
}