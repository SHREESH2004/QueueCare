import {
  pgTable,
  serial,
  integer,
  numeric,
  varchar,
  timestamp,
  pgEnum,
} from "drizzle-orm/pg-core";

import { users } from "./user";
import { queueTokens } from "./queue_tokens";

export const paymentStatus = pgEnum("payment_status", [
  "PENDING",
  "SUCCESS",
  "FAILED",
  "REFUNDED",
]);

export const payments = pgTable("payments", {
  id: serial("id").primaryKey(),

  userId: integer("user_id")
    .notNull()
    .references(() => users.id),

  tokenId: integer("token_id")
    .references(() => queueTokens.id),

  amount: numeric("amount", {
    precision: 10,
    scale: 2,
  }).notNull(),

  status: paymentStatus("status")
    .notNull()
    .default("PENDING"),

  transactionId: varchar("transaction_id", {
    length: 255,
  }),

  createdAt: timestamp("created_at")
    .defaultNow()
    .notNull(),
});