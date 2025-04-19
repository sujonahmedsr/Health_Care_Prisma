import { Router } from "express";
import { authController } from "./auth.controller";
import { auth } from "../../middleWare/Auth";
import { userRole } from "@prisma/client";

const route = Router()

route.post('/login', authController.userLogin)

route.post('/resfresh-token', authController.refreshToken)

route.post('/change-password', auth(userRole.ADMIN, userRole.DOCTOR, userRole.PATIENT, userRole.SUPER_ADMIN), authController.changePassword)

route.post('/forgot-password', authController.forgotPassword)

route.post(
    '/reset-password',
    authController.resetPassword
)

export const authRoute = route