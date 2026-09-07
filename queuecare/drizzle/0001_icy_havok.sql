CREATE TABLE "clinics" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(150) NOT NULL,
	"address" varchar(255),
	"created_at" timestamp DEFAULT now() NOT NULL
);
