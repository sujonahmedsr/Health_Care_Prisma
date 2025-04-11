import { Router } from "express";
import { userRouter } from "../app/modules/user/user.routes";
import { adminRoutes } from "../app/modules/Admin/admin.routes";

const router = Router()

const moduelRoutes = [
    {
        path: '/user',
        route: userRouter
    },
    {
        path: '/admin',
        route: adminRoutes
    }
]

moduelRoutes.forEach(item => router.use(item.path, item.route))

export default router