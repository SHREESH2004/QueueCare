import {
  pgTable,
  serial,
  varchar,
  timestamp,
} from "drizzle-orm/pg-core";

export const clinics = pgTable("clinics", {
  id: serial("id").primaryKey(),

  name: varchar("name", { length: 150 }).notNull(),

  address: varchar("address", { length: 255 }),

  createdAt: timestamp("created_at").defaultNow().notNull(),
});