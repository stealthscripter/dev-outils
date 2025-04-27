import { z } from "zod"

export const signUpSchema = z
    .object({
        fullname: z.string()
            .nonempty({ message: "fullname is required." }).regex(/^\w+(\s\w+)?$/, {
                message: "only first name or first + last name allowed",
            }),
        email: z.string().nonempty({ message: "email is required." }).email({
            message: 'please enter a valid email address.',
        }),
        password: z
            .string()
            .nonempty({ message: "password is required." })
            .min(4, { message: "password must be at least 4 characters." }),
        confirmPassword: z.string().min(1, "confirm password is required"),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords do not match.",
        path: ["confirmPassword"],
    });



export const loginSchema = z.object({
    email: z.string().email({
        message: 'Please enter a valid email address.',
    }),
    password: z
        .string()
        .nonempty({ message: "Password is required." })
})