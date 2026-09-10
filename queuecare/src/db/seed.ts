import "dotenv/config";

import { db } from "./index";
import { users } from "./schema/user";
import { clinics } from "./schema/clinics";
import { departments } from "./schema/departments";
import { services } from "./schema/services";
import { queues } from "./schema/queue";

import bcrypt from "bcrypt";

async function seed() {
    console.log("Seeding database...");

    const password = await bcrypt.hash("123456", 10);

    const [patient] = await db
        .insert(users)
        .values({
            name: "Rahul",
            email: "rahul@gmail.com",
            password,
            role: "PATIENT",
        })
        .returning();

    const [staff] = await db
        .insert(users)
        .values({
            name: "Dr. Sharma",
            email: "doctor@gmail.com",
            password,
            role: "STAFF",
        })
        .returning();

    const [admin] = await db
        .insert(users)
        .values({
            name: "Admin",
            email: "admin@gmail.com",
            password,
            role: "ADMIN",
        })
        .returning();

    // 2. Clinic
    const [clinic] = await db
        .insert(clinics)
        .values({
            name: "City Hospital",
            address: "Amaravati",
        })
        .returning();

    const [department] = await db
        .insert(departments)
        .values({
            clinicId: clinic.id,
            name: "Dental",
        })
        .returning();

    const [service] = await db
        .insert(services)
        .values({
            departmentId: department.id,
            name: "Dental Consultation",
            charge: "500.00",
        })
        .returning();

    const [queue] = await db
        .insert(queues)
        .values({
            serviceId: service.id,
            name: "Dental Consultation Queue",
        })
        .returning();

    console.log("Seed completed!");

    console.log({
        patient,
        staff,
        admin,
        clinic,
        department,
        service,
        queue,
    });

    process.exit(0);
}

seed().catch((error) => {
    console.error("Seed failed:", error);
    process.exit(1);
});