import { NextFunction, Request, Response, Router } from "express";
import { adminController } from "./admin.controller";
import { adminValidationSchemas } from "./admin.ZodValidation";
import { userRole } from "@prisma/client";
import { auth } from "../../middleWare/Auth";
import validateRequest from "../../middleWare/validateRequest";

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