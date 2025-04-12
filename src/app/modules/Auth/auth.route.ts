import { Router } from "express";
import { authController } from "./auth.controller";

const route = Router()

route.post('/login', authController.userLogin)

export const authRoute = route