import { Gender, userStatus } from "@prisma/client";
import { z } from "zod";

export const createAdmin = z.object({
    password: z.string({
        required_error: "Password is required"
    }),
    admin: z.object({
        name: z.string({
            required_error: "Name is required!"
        }),
        email: z.string({
            required_error: "Email is required!"
        }),
        contactNumber: z.string({
            required_error: "Contact Number is required!"
        })
    })
});

export const createDoctor = z.object({
    password: z.string({
        required_error: "Password is required"
    }),
    doctor: z.object({
        name: z.string({
            required_error: "Name is required!"
        }),
        email: z.string({
            required_error: "Email is required!"
        }),
        contactNumber: z.string({
            required_error: "Contact Number is required!"
        }),
        address: z.string().optional(),
        registrationNumber: z.string({
            required_error: "Reg number is required"
        }),
        experience: z.number().optional(),
        gender: z.enum([Gender.MALE, Gender.FEMALE]),
        appointmentFee: z.number({
            required_error: "appointment fee is required"
        }),
        qualification: z.string({
            required_error: "quilification is required"
        }),
        currentWorkingPlace: z.string({
            required_error: "Current working place is required!"
        }),
        designation: z.string({
            required_error: "Designation is required!"
        })
    })
});

export const createPatient = z.object({
    password: z.string({
        required_error: "Password is required"
    }),
    patient: z.object({
        name: z.string({
            required_error: "Name is required!"
        }),
        email: z.string({
            required_error: "Email is required!"
        }),
        contactNumber: z.string({
            required_error: "Contact Number is required!"
        }),
        address: z.string().optional()
    })
});

export const updateStatus = z.object({
    body: z.object({
        status: z.enum([userStatus.ACTIVE, userStatus.BLOCKED])
    })
})