import { Request, Response } from "express";
import { registerschema } from "./auth.validation";
import { registerUser } from "./auth.service";
import { Params } from "zod/v4/core";


export async function register(req: Request, res: Response) {
    try {
        const result = registerschema.safeParse(req.body);
        if (!result.success) {
            return res.status(400).json({
                message: "Validation failed",
                errors: result.error.issues,
            })
        }
        const { name, email, password } = req.body;

        const user = await registerUser(name, email, password);
        return res.status(201).json({
            message: "User registered successfully",
            user,
        });
    } catch (error) {
        if (error instanceof Error) {
            return res.status(400).json({
                message: error.message
            })
        }
        return res.status(500).json({
            message: "Something went wrong",
            error: error
        });
    }
}