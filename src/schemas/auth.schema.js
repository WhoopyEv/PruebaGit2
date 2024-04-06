import { z } from "zod";

export const registerSchema = z.object({
    username: z.string({
        required_error: 'Username is required'
    }),
    email: z.string({
        required_error: 'Email is required'
    }).email({
        required_error: 'Invalid email'
    }),
    password: z.string({
        required_error: 'Password is required'
        // Se le indica una cantidad de caracteres minima
    }).min(6, {
        message: 'Password  must be at least 6 characteres'
    })
})

export const loginSchema = z.object({
    email: z.string({
        required_error: 'Email is required'
    }).email({
        required_error: 'Invalid email'
    }),
    password: z.string({
        required_error: 'Password is required'
        // Se le indica una cantidad de caracteres minima
    }).min(6, {
        message: 'Password  must be at least 6 characteres'
    })
})  