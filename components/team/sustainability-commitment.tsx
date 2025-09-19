"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";

export default function SustainabilityCommitment() {
    const commitments = [
        {
            number: "01",
            title: "Integrated Sustainability Practices",
            description:
                "CiptaTech's operations incorporate eco-friendly technologies, ensuring minimal environmental impact while promoting sustainable growth across all business areas.",
        },
        {
            number: "02",
            title: "Community Engagement Initiatives",
            description:
                "The company actively supports local communities through training programs and partnerships, enhancing social equity and economic opportunities for underrepresented groups.",
        },
        {
            number: "03",
            title: "Transparent Governance Framework",
            description:
                "CiptaTech maintains rigorous compliance and ethical standards, ensuring accountability and transparency in all business dealings to uphold stakeholder trust.",
        },
    ];

    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-center"
        >
            <h3 className="text-2xl font-bold text-foreground mb-8 font-heading">
                Commitment to Sustainability and ESG
            </h3>
            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                {commitments.map((commitment, index) => (
                    <motion.div
                        key={commitment.number}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
                    >
                        <Card className="p-6 text-left h-full hover:shadow-lg transition-shadow duration-300">
                            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                                <span className="text-primary font-bold">
                                    {commitment.number}
                                </span>
                            </div>
                            <h4 className="text-lg font-bold text-foreground mb-3">
                                {commitment.title}
                            </h4>
                            <p className="text-muted-foreground text-sm leading-relaxed">
                                {commitment.description}
                            </p>
                        </Card>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
}
