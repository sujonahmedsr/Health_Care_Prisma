import { Router } from "express";
import { userRouter } from "../modules/user/user.routes";
import { adminRoutes } from "../modules/Admin/admin.routes";
import { authRoute } from "../modules/Auth/auth.route";

const router = Router()

const moduelRoutes = [
    {
        path: '/user',
        route: userRouter
    },
    {
        path: '/admin',
        route: adminRoutes
    },
    {
        path: "/auth",
        route: authRoute
    }
]

moduelRoutes.forEach(item => router.use(item.path, item.route))

export default router