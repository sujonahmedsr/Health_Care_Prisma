import { NextFunction, Request, Response, Router } from "express";
import { adminController } from "./admin.controller";
import { AnyZodObject } from "zod"
import { adminValidationSchemas } from "./admin.ZodValidation";

const router = Router()

const validateRequest = (schema: AnyZodObject) => async (req: Request, res: Response, next: NextFunction) => {
    try {
        await schema.parseAsync({
            body: req.body
        })
        return next();
    } catch (err) {
        next(err);
    }
};


router.get('/', adminController.getAllAdmin)
router.get('/:id', adminController.getSingleAdmin)
router.patch('/:id', validateRequest(adminValidationSchemas.update), adminController.updateAdmin)
router.delete('/:id', adminController.deleteData)
router.delete('/soft/:id', adminController.softDeleteData)

export const adminRoutes = router