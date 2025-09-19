import { prisma } from "@/lib/prisma";
import { User } from "@/lib/types/user";
import SmoothScrollNav from "@/components/smooth-scroll-nav";
import TeamHeroSection from "@/components/team/team-hero-section";
import TeamMembersSection from "@/components/team/team-members-section";
import CollaborationBenefits from "@/components/team/collaboration-benefits";
import SustainabilityCommitment from "@/components/team/sustainability-commitment";

export default async function TeamPage() {
    let teamMembers: User[] = [];

    try {
        const users = await prisma.user.findMany({
            where: {
                deletedAt: null,
            },
            select: {
                id: true,
                name: true,
                email: true,
                phone: true,
                position: true,
                role: true,
                profile: true,
                socialLinks: true,
                createdAt: true,
                updatedAt: true,
            },
            orderBy: {
                createdAt: "desc",
            },
        });

        teamMembers = users.map((user) => ({
            ...user,
            socialLinks: user.socialLinks as any,
        }));
    } catch (error) {
        console.error("Error fetching team members:", error);
    }

    return (
        <div className="min-h-screen bg-background">
            <SmoothScrollNav />

            <div className="pt-24 pb-20">
                <div className="container mx-auto px-4">
                    <TeamHeroSection />

                    <TeamMembersSection teamMembers={teamMembers} />

                    <CollaborationBenefits />

                    <SustainabilityCommitment />
                </div>
            </div>
        </div>
    );
}
