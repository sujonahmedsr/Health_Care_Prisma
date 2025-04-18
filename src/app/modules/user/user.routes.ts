import { Router } from "express";
import { userController } from "./user.controller";
import { userRole } from "@prisma/client";
import { auth } from "../../middleWare/Auth";

const router = Router()

router.post('/', auth(userRole.ADMIN, userRole.SUPER_ADMIN), userController.createAdmin)

export const userRouter = router