import { z } from 'zod';

export const registerschema = z.object({
    name: z
        .string()
        .min(2, "Name must be at least 2 characters")
        .max(100, "Name is too long"),

    email: z
        .string()
        .email("Invalid email"),

    password: z
        .string()
        .min(6, "Password must be at least 6 characters")
        .max(10, "Password is too long"),
})