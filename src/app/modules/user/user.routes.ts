import { Router } from "express";
import { userController } from "./user.controller";
import { auth } from "../../../middleWare/Auth";
import { userRole } from "@prisma/client";

const router = Router()

router.post('/', auth(userRole.ADMIN, userRole.SUPER_ADMIN), userController.createAdmin)

export const userRouter = router