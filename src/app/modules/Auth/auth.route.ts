import { Router } from "express";
import { authController } from "./auth.controller";
import { auth } from "../../middleWare/Auth";
import { userRole } from "@prisma/client";

const route = Router()

route.post('/login', authController.userLogin)

route.post('/resfresh-token', authController.refreshToken)

route.post('/change-password', auth(userRole.ADMIN, userRole.DOCTOR, userRole.PATIENT, userRole.SUPER_ADMIN), authController.changePassword)

export const authRoute = route