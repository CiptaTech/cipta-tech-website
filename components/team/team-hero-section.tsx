"use client";

import { motion } from "framer-motion";

export default function TeamHeroSection() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
        >
            <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-6 font-heading">
                Our Team
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
                Meet the passionate professionals behind Ciptatech's innovative
                solutions
            </p>
        </motion.div>
    );
}
