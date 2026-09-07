import { isNotNull } from "drizzle-orm";
import {
    pgTable,
    serial,
    varchar,
    timestamp,
    pgEnum,
} from "drizzle-orm/pg-core";

export const userRole = pgEnum("user-role", [
    "PATIENT",
    "STAFF",
    "ADMIN",
])
export const users = pgTable("users", {
    id: serial("id").primaryKey(),

    name: varchar("name", { length: 100 }).notNull(),

    email: varchar("email", { length: 255 }).notNull().unique(),

    password: varchar("password", { length: 255 }).notNull(),

    role: userRole("role").notNull().default('PATIENT'),

    createdAt: timestamp("created_at").defaultNow().notNull(),
});