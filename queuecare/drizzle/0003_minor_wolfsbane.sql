CREATE TABLE "services" (
	"id" serial PRIMARY KEY NOT NULL,
	"department_id" integer NOT NULL,
	"name" varchar(150) NOT NULL,
	"charge" numeric(10, 2) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "services" ADD CONSTRAINT "services_department_id_departments_id_fk" FOREIGN KEY ("department_id") REFERENCES "public"."departments"("id") ON DELETE no action ON UPDATE no action;