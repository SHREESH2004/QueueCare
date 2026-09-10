import bcrypt from "bcrypt";
import { eq } from "drizzle-orm";

import { db } from "../../db";
import { users } from "../../db/schema/user";


export async function registerUser(
    name: string,
    email: string,
    password: string
) {
    const existingUser = await db.select().from(users).where(eq(users.email, email));

    if (existingUser.length > 0) {
        throw new Error("Email already exist");
    }

    const hashpassword = await bcrypt.hash(password, 10);

    const [user] = await db.insert(users).values({
        name,
        email,
        password: hashpassword,
        role: "PATIENT",
    })
        .returning({
            id: users.id,
            name: users.name,
            email: users.email,
            role: users.role,
        });

    return user;

}