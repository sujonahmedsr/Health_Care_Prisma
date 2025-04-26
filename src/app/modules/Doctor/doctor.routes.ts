import express from 'express'
import { DoctorController } from './doctor.controller';
import { DoctorValidation } from './doctor.validation';
import { userRole } from '@prisma/client';
import { auth } from '../../middleWare/Auth';
import validateRequest from '../../middleWare/validateRequest';

const router = express.Router();

// task 3
router.get('/', DoctorController.getAllFromDB);

//task 4
router.get('/:id', DoctorController.getByIdFromDB);

router.patch(
    '/:id',
    auth(userRole.SUPER_ADMIN, userRole.ADMIN, userRole.DOCTOR),
    validateRequest(DoctorValidation.update),
    DoctorController.updateIntoDB
);

//task 5
router.delete(
    '/:id',
    auth(userRole.SUPER_ADMIN, userRole.ADMIN),
    DoctorController.deleteFromDB
);

// task 6
router.delete(
    '/soft/:id',
    auth(userRole.SUPER_ADMIN, userRole.ADMIN),
    DoctorController.softDelete);

export const DoctorRoutes = router