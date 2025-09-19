import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function testDatabase() {
    try {
        console.log("Testing database connection...");

        // Test connection
        await prisma.$connect();
        console.log("✅ Database connection successful");

        // Count users
        const userCount = await prisma.user.count();
        console.log(`📊 Total users in database: ${userCount}`);

        // Get admin users
        const adminUsers = await prisma.user.findMany({
            where: { role: "ADMIN" },
            select: { id: true, name: true, email: true, role: true },
        });
        console.log(`👑 Admin users: ${adminUsers.length}`);
        adminUsers.forEach((user) => {
            console.log(`  - ${user.name} (${user.email})`);
        });

        // Get regular users
        const regularUsers = await prisma.user.findMany({
            where: { role: "USER" },
            select: { id: true, name: true, email: true, role: true },
        });
        console.log(`👥 Regular users: ${regularUsers.length}`);
        regularUsers.forEach((user) => {
            console.log(`  - ${user.name} (${user.email})`);
        });

        console.log("✅ Database test completed successfully");
    } catch (error) {
        console.error("❌ Database test failed:", error);
    } finally {
        await prisma.$disconnect();
    }
}

testDatabase();
