import {  Router } from "express";
import { adminController } from "./admin.controller";

const router = Router()

router.get('/', adminController.getAllAdmin)
router.get('/:id', adminController.getSingleAdmin)
router.patch('/:id', adminController.updateAdmin)
router.delete('/:id', adminController.deleteData)

export const adminRoutes = router