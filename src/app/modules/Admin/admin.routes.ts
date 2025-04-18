import { NextFunction, Request, Response, Router } from "express";
import { adminController } from "./admin.controller";
import { AnyZodObject } from "zod"
import { adminValidationSchemas } from "./admin.ZodValidation";
import validateRequest from "../../../middleWare/validateRequest";
import { auth } from "../../../middleWare/Auth";
import { userRole } from "@prisma/client";

const router = Router()

router.get('/', auth(userRole.ADMIN, userRole.SUPER_ADMIN), adminController.getAllAdmin)

router.get('/:id', auth(userRole.ADMIN, userRole.SUPER_ADMIN), adminController.getSingleAdmin)

router.patch('/:id', auth(userRole.ADMIN, userRole.SUPER_ADMIN),
    validateRequest(adminValidationSchemas.update),
    adminController.updateAdmin
)

router.delete('/soft/:id', auth(userRole.ADMIN, userRole.SUPER_ADMIN), adminController.softDeleteData)

router.delete('/:id', auth(userRole.ADMIN, userRole.SUPER_ADMIN), adminController.deleteData)


export const adminRoutes = router