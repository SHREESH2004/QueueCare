import {
  pgTable,
  serial,
  integer,
  varchar,
  timestamp,
} from "drizzle-orm/pg-core";

import { queueTokens } from "./queue_tokens";

export const queueEvents = pgTable("queue_events", {
  id: serial("id").primaryKey(),

  tokenId: integer("token_id")
    .notNull()
    .references(() => queueTokens.id),

  eventType: varchar("event_type", {
    length: 50,
  }).notNull(),

  createdAt: timestamp("created_at")
    .defaultNow()
    .notNull(),
});