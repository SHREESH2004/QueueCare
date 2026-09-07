import {
  pgTable,
  serial,
  integer,
  varchar,
  numeric,
  timestamp,
} from "drizzle-orm/pg-core";
import { departments } from "./departments";

export const services = pgTable("services", {
  id: serial("id").primaryKey(),

  departmentId: integer("department_id")
    .notNull()
    .references(() => departments.id),

  name: varchar("name", { length: 150 }).notNull(),

  charge: numeric("charge", { precision: 10, scale: 2 })
    .notNull(),

  createdAt: timestamp("created_at").defaultNow().notNull(),
});