import { NextFunction, Request, Response, Router } from "express";
import { adminController } from "./admin.controller";
import { AnyZodObject } from "zod"
import { adminValidationSchemas } from "./admin.ZodValidation";
import validateRequest from "../../../middleWare/validateRequest";

const router = Router()

router.get('/', adminController.getAllAdmin)

router.get('/:id', adminController.getSingleAdmin)

router.patch('/:id',
    validateRequest(adminValidationSchemas.update),
    adminController.updateAdmin
)

router.delete('/soft/:id', adminController.softDeleteData)

router.delete('/:id', adminController.deleteData)


export const adminRoutes = router