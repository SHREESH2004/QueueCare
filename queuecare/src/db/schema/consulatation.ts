import {
  pgTable,
  serial,
  integer,
  timestamp,
} from "drizzle-orm/pg-core";

import { queueTokens } from "./queue_tokens";

export const consultations = pgTable("consultations", {
  id: serial("id").primaryKey(),

  tokenId: integer("token_id")
    .notNull()
    .unique()
    .references(() => queueTokens.id),

  startedAt: timestamp("started_at")
    .notNull(),

  completedAt: timestamp("completed_at"),

  createdAt: timestamp("created_at")
    .defaultNow()
    .notNull(),
});