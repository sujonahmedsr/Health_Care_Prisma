import { Request, Response, Router } from "express";
import { userController } from "./user.controller";

const router = Router()

router.post('/user', userController.createAdmin)

export const userRouter = router