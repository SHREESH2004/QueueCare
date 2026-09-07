import {
  pgTable,
  serial,
  integer,
  varchar,
  timestamp,
  pgEnum,
} from "drizzle-orm/pg-core";

import { queues } from "./queue";
import { users } from "./user";

export const tokenStatus = pgEnum("token_status", [
  "WAITING",
  "CALLED",
  "IN_PROGRESS",
  "COMPLETED",
  "SKIPPED",
  "CANCELLED",
]);

export const queueTokens = pgTable("queue_tokens", {
  id: serial("id").primaryKey(),

  queueId: integer("queue_id")
    .notNull()
    .references(() => queues.id),

  userId: integer("user_id")
    .notNull()
    .references(() => users.id),

  tokenNumber: integer("token_number").notNull(),

  status: tokenStatus("status")
    .notNull()
    .default("WAITING"),

  createdAt: timestamp("created_at")
    .defaultNow()
    .notNull(),

  calledAt: timestamp("called_at"),

  startedAt: timestamp("started_at"),

  completedAt: timestamp("completed_at"),
});