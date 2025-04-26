import { Router } from "express";
import { userRouter } from "../modules/user/user.routes";
import { adminRoutes } from "../modules/Admin/admin.routes";
import { authRoute } from "../modules/Auth/auth.route";
import { SpecialtiesRoutes } from "../modules/Specialties/specialties.routes";
import { DoctorRoutes } from "../modules/Doctor/doctor.routes";
import { PatientRoutes } from "../modules/Patient/patient.route";
import { ScheduleRoutes } from "../modules/Schedule/schedule.routes";

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
    },
    {
        path: '/specialties',
        route: SpecialtiesRoutes
    },
    {
        path: '/doctor',
        route: DoctorRoutes
    },
    {
        path: '/patient',
        route: PatientRoutes
    },
    {
        path: '/schedule',
        route: ScheduleRoutes
    }
]

moduelRoutes.forEach(item => router.use(item.path, item.route))

export default router