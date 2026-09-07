import {
    pgTable,
    serial,
    varchar,
    integer,
    timestamp,
} from "drizzle-orm/pg-core";
import { clinics } from "./clinics";

export const departments = pgTable("departments", {
    id: serial("id").primaryKey(),

    clinicId: integer("clinic_id")
        .notNull()
        .references(() => clinics.id),

    name: varchar("name", { length: 100 }).notNull(),

    createdAt: timestamp("created_at").defaultNow().notNull(),
});