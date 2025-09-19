import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function clearUsers() {
    console.log("🗑️  Clearing all users and related data...");

    // Clear in the correct order (respecting foreign key constraints)
    await prisma.session.deleteMany();
    await prisma.account.deleteMany();
    await prisma.verificationToken.deleteMany();
    await prisma.user.deleteMany();

    console.log("✅ All users and related data cleared successfully");
    console.log(
        "ℹ️  You can now sign in with Google OAuth and create new users"
    );
}

clearUsers()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
