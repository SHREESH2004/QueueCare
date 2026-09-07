import {
    pgTable,
    serial,
    integer,
    varchar,
    timestamp,
} from "drizzle-orm/pg-core";

import { services } from "./services";

export const queues = pgTable("queues", {
    id: serial("id").primaryKey(),

    serviceId: integer("service_id")
        .notNull()
        .references(() => services.id),

    name: varchar("name", { length: 150 }).notNull(),

    createdAt: timestamp("created_at").defaultNow().notNull(),
});