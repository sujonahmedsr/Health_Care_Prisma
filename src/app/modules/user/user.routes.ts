import { NextFunction, Request, Response, Router } from "express";
import { userController } from "./user.controller";
import { userRole } from "@prisma/client";
import { auth } from "../../middleWare/Auth";
import { upload } from "../../shared/fileUpload";
import { createAdmin, createDoctor, createPatient } from "./user.validation";

const router = Router()

router.post('/create-admin',
    auth(userRole.ADMIN, userRole.SUPER_ADMIN),
    upload.single("file"),
    (req: Request, res: Response, next: NextFunction) => {        
        req.body = createAdmin.parse(JSON.parse(req.body.data))       
        return userController.createAdmin(req, res, next)
    }
)

router.post('/create-doctor', 
    auth(userRole.SUPER_ADMIN, userRole.ADMIN),
    upload.single("file"),
    (req: Request, res: Response, next: NextFunction) => {
        req.body = createDoctor.parse(JSON.parse(req.body.data))
        return userController.createDoctor(req, res, next)
    }
)

router.post('/create-patient', 
    upload.single("file"),
    (req: Request, res: Response, next: NextFunction) => {
        req.body = createPatient.parse(JSON.parse(req.body.data))
        return userController.createPatient(req, res, next)
    }
)

router.get('/', userController.getAllUsers)

export const userRouter = router