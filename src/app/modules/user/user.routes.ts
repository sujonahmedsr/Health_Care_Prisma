import { NextFunction, Request, Response, Router } from "express";
import { userController } from "./user.controller";
import { userRole } from "@prisma/client";
import { auth } from "../../middleWare/Auth";
import { upload } from "../../shared/fileUpload";
import { createAdmin } from "./user.validation";

const router = Router()

router.post('/create-admin',
    auth(userRole.ADMIN, userRole.SUPER_ADMIN),
    upload.single("file"),
    (req: Request, res: Response, next: NextFunction) => {        
        req.body = createAdmin.parse(JSON.parse(req.body.data))       
        return userController.createAdmin(req, res, next)
    }
)

export const userRouter = router