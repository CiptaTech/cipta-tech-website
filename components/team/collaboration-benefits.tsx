"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";

export default function CollaborationBenefits() {
    const benefits = [
        {
            number: "01",
            title: "Market Expansion Opportunities",
            description:
                "Collaborations enable access to new customer bases, enhancing product visibility and driving sales growth in untapped regions.",
        },
        {
            number: "02",
            title: "Cost Efficiency Gains",
            description:
                "Sharing resources with partners reduces operational expenses, allowing for reinvestment in innovation and improved service delivery.",
        },
        {
            number: "03",
            title: "Accelerated Product Development",
            description:
                "Joint efforts foster rapid innovation, combining diverse expertise to create advanced features and solutions that meet evolving market demands.",
        },
    ];

    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-center mb-16"
        >
            <h3 className="text-2xl font-bold text-foreground mb-8 font-heading">
                Benefits of Collaborations
            </h3>
            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                {benefits.map((benefit, index) => (
                    <motion.div
                        key={benefit.number}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
                    >
                        <Card className="p-6 text-left h-full hover:shadow-lg transition-shadow duration-300">
                            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                                <span className="text-primary font-bold">
                                    {benefit.number}
                                </span>
                            </div>
                            <h4 className="text-lg font-bold text-foreground mb-3">
                                {benefit.title}
                            </h4>
                            <p className="text-muted-foreground text-sm leading-relaxed">
                                {benefit.description}
                            </p>
                        </Card>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
}
