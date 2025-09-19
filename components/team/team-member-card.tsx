"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { User } from "@/lib/types/user";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
    User as UserIcon,
    Mail,
    Phone,
    Linkedin,
    Github,
    Globe,
} from "lucide-react";

interface TeamMemberCardProps {
    member: User;
    index: number;
}

export default function TeamMemberCard({ member, index }: TeamMemberCardProps) {
    const getInitials = (name: string) => {
        return name
            .split(" ")
            .map((n) => n[0])
            .join("")
            .toUpperCase()
            .slice(0, 2);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: index * 0.1 }}
            whileHover={{ y: -10 }}
        >
            <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-all duration-300 group overflow-hidden">
                <div className="relative">
                    {/* Profile Image or Placeholder */}
                    <div className="w-full h-64 bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center">
                        {member.profile ? (
                            <img
                                src={member.profile}
                                alt={member.name}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                        ) : (
                            <div className="flex flex-col items-center justify-center text-center p-8">
                                <Avatar className="w-32 h-32 mb-4">
                                    <AvatarImage src={undefined} />
                                    <AvatarFallback className="text-2xl font-bold bg-primary/20 text-primary">
                                        {getInitials(member.name)}
                                    </AvatarFallback>
                                </Avatar>
                                <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mb-2">
                                    <UserIcon className="w-8 h-8 text-primary" />
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                <CardContent className="p-6">
                    <div className="text-center mb-4">
                        <h3 className="text-xl font-bold text-foreground mb-2 font-heading">
                            {member.name}
                        </h3>
                        {member.position && (
                            <div className="mb-3">
                                <Badge
                                    variant="secondary"
                                    className="text-sm font-semibold"
                                >
                                    {member.position}
                                </Badge>
                            </div>
                        )}
                    </div>

                    {/* Contact Information */}
                    <div className="space-y-2 mb-4">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Mail className="w-4 h-4" />
                            <span className="truncate">{member.email}</span>
                        </div>
                        {member.phone && (
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <Phone className="w-4 h-4" />
                                <span>{member.phone}</span>
                            </div>
                        )}
                    </div>

                    {/* Social Links */}
                    {member.socialLinks && (
                        <div className="flex justify-center gap-3 pt-4 border-t">
                            {member.socialLinks.linkedin && (
                                <a
                                    href={member.socialLinks.linkedin}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-2 rounded-full bg-blue-100 hover:bg-blue-200 transition-colors"
                                >
                                    <Linkedin className="w-4 h-4 text-blue-600" />
                                </a>
                            )}
                            {member.socialLinks.github && (
                                <a
                                    href={member.socialLinks.github}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                                >
                                    <Github className="w-4 h-4 text-gray-600" />
                                </a>
                            )}
                            {member.socialLinks.website && (
                                <a
                                    href={member.socialLinks.website}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-2 rounded-full bg-green-100 hover:bg-green-200 transition-colors"
                                >
                                    <Globe className="w-4 h-4 text-green-600" />
                                </a>
                            )}
                        </div>
                    )}
                </CardContent>
            </Card>
        </motion.div>
    );
}
