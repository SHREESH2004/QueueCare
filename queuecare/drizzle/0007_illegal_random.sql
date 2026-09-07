CREATE TABLE "consultations" (
	"id" serial PRIMARY KEY NOT NULL,
	"token_id" integer NOT NULL,
	"started_at" timestamp NOT NULL,
	"completed_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "consultations_token_id_unique" UNIQUE("token_id")
);
--> statement-breakpoint
ALTER TABLE "consultations" ADD CONSTRAINT "consultations_token_id_queue_tokens_id_fk" FOREIGN KEY ("token_id") REFERENCES "public"."queue_tokens"("id") ON DELETE no action ON UPDATE no action;