import { Router } from "express";
import { authController } from "./auth.controller";

const route = Router()

route.post('/login', authController.userLogin)

route.post('/resfresh-token', authController.refreshToken)

export const authRoute = route