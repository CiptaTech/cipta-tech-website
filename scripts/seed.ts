import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
    console.log("🗑️  Truncating all tables...");

    // Truncate all tables in the correct order (respecting foreign key constraints)
    await prisma.$executeRaw`DELETE FROM sessions`;
    await prisma.$executeRaw`DELETE FROM accounts`;
    await prisma.$executeRaw`DELETE FROM verification_tokens`;
    await prisma.$executeRaw`DELETE FROM users`;

    // Reset auto-increment counters (SQLite specific) - only if the table exists
    try {
        await prisma.$executeRaw`DELETE FROM sqlite_sequence WHERE name IN ('users', 'accounts', 'sessions', 'verification_tokens')`;
    } catch (error) {
        // sqlite_sequence table doesn't exist yet, which is fine
        console.log(
            "ℹ️  sqlite_sequence table doesn't exist (normal for fresh database)"
        );
    }

    console.log("✅ Database truncated successfully");

    console.log("🌱 Seeding fresh data...");
    const hashedPassword = await bcrypt.hash("admin123", 12);

    const admin = await prisma.user.create({
        data: {
            email: "aungkhant.kk111@gmail.com",
            name: "Mubarak Ali Shah",
            phone: "+60123456789",
            role: "ADMIN",
            position: "Tech Lead",
            password: hashedPassword,
            socialLinks: {
                linkedin: "https://linkedin.com/in/admin",
                twitter: "https://twitter.com/admin",
                github: "https://github.com/admin",
            },
        },
    });

    console.log("Admin user created:", admin);

    // const teamMembers = [
    //     {
    //         email: "john.doe@ciptatech.com",
    //         name: "John Doe",
    //         phone: "+60123456790",
    //         role: "USER" as const,
    //         position: "CEO",
    //         socialLinks: {
    //             linkedin: "https://linkedin.com/in/johndoe",
    //             twitter: "https://twitter.com/johndoe",
    //         },
    //     },
    //     {
    //         email: "jane.smith@ciptatech.com",
    //         name: "Jane Smith",
    //         phone: "+60123456791",
    //         role: "USER" as const,
    //         position: "CTO",
    //         socialLinks: {
    //             linkedin: "https://linkedin.com/in/janesmith",
    //             github: "https://github.com/janesmith",
    //         },
    //     },
    //     {
    //         email: "mike.wilson@ciptatech.com",
    //         name: "Mike Wilson",
    //         phone: "+60123456792",
    //         role: "USER" as const,
    //         position: "Lead Developer",
    //         socialLinks: {
    //             linkedin: "https://linkedin.com/in/mikewilson",
    //             github: "https://github.com/mikewilson",
    //         },
    //     },
    // ];

    // for (const member of teamMembers) {
    //     const hashedPassword = await bcrypt.hash("password123", 12);

    //     await prisma.user.create({
    //         data: {
    //             ...member,
    //             password: hashedPassword,
    //         },
    //     });
    // }

    // console.log("Sample team members created");
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
