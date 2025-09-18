"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import SmoothScrollNav from "@/components/smooth-scroll-nav"

export default function TeamPage() {
  const teamMembers = [
    {
      name: "Ahmad Rahman",
      role: "Lead Developer",
      image: "/professional-malaysian-male-developer-portrait.jpg",
      description: "Full-stack developer with 8+ years of experience in web and mobile applications.",
    },
    {
      name: "Siti Nurhaliza",
      role: "UI/UX Designer",
      image: "/professional-malaysian-female-designer-portrait.jpg",
      description: "Creative designer specializing in user-centered design and brand identity.",
    },
    {
      name: "Raj Kumar",
      role: "Mobile Developer",
      image: "/professional-malaysian-male-mobile-developer-portr.jpg",
      description: "Expert in iOS and Android development with focus on performance optimization.",
    },
    {
      name: "Lim Wei Ling",
      role: "Project Manager",
      image: "/professional-malaysian-female-project-manager-port.jpg",
      description: "Experienced project manager ensuring timely delivery and client satisfaction.",
    },
    {
      name: "Hassan Ali",
      role: "Backend Developer",
      image: "/professional-malaysian-male-backend-developer-port.jpg",
      description: "Backend specialist with expertise in cloud architecture and database optimization.",
    },
    {
      name: "Priya Devi",
      role: "Marketing Specialist",
      image: "/professional-malaysian-female-marketing-specialist.jpg",
      description: "Digital marketing expert helping clients build strong online presence.",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <SmoothScrollNav />

      <div className="pt-24 pb-20">
        <div className="container mx-auto px-4">
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-6 font-heading">Our Team</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
              Meet the passionate professionals behind Ciptatech's innovative solutions
            </p>
          </motion.div>

          {/* Team Members Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
              >
                <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-all duration-300 group overflow-hidden">
                  <div className="relative">
                    <img
                      src={member.image || "/placeholder.svg"}
                      alt={member.name}
                      className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <CardContent className="p-6 text-center">
                    <h3 className="text-xl font-bold text-foreground mb-2 font-heading">{member.name}</h3>
                    <p className="text-primary font-semibold mb-3">{member.role}</p>
                    <p className="text-muted-foreground text-sm leading-relaxed">{member.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Collaboration Benefits */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-center mb-16"
          >
            <h3 className="text-2xl font-bold text-foreground mb-8 font-heading">Benefits of Collaborations</h3>
            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              <Card className="p-6 text-left">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                  <span className="text-primary font-bold">01</span>
                </div>
                <h4 className="text-lg font-bold text-foreground mb-3">Market Expansion Opportunities</h4>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Collaborations enable access to new customer bases, enhancing product visibility and driving sales
                  growth in untapped regions.
                </p>
              </Card>
              <Card className="p-6 text-left">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                  <span className="text-primary font-bold">02</span>
                </div>
                <h4 className="text-lg font-bold text-foreground mb-3">Cost Efficiency Gains</h4>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Sharing resources with partners reduces operational expenses, allowing for reinvestment in innovation
                  and improved service delivery.
                </p>
              </Card>
              <Card className="p-6 text-left">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                  <span className="text-primary font-bold">03</span>
                </div>
                <h4 className="text-lg font-bold text-foreground mb-3">Accelerated Product Development</h4>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Joint efforts foster rapid innovation, combining diverse expertise to create advanced features and
                  solutions that meet evolving market demands.
                </p>
              </Card>
            </div>
          </motion.div>

          {/* Sustainability Commitment */}
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
              <Card className="p-6 text-left">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                  <span className="text-primary font-bold">01</span>
                </div>
                <h4 className="text-lg font-bold text-foreground mb-3">Integrated Sustainability Practices</h4>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  CiptaTech's operations incorporate eco-friendly technologies, ensuring minimal environmental impact
                  while promoting sustainable growth across all business areas.
                </p>
              </Card>
              <Card className="p-6 text-left">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                  <span className="text-primary font-bold">02</span>
                </div>
                <h4 className="text-lg font-bold text-foreground mb-3">Community Engagement Initiatives</h4>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  The company actively supports local communities through training programs and partnerships, enhancing
                  social equity and economic opportunities for underrepresented groups.
                </p>
              </Card>
              <Card className="p-6 text-left">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                  <span className="text-primary font-bold">03</span>
                </div>
                <h4 className="text-lg font-bold text-foreground mb-3">Transparent Governance Framework</h4>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  CiptaTech maintains rigorous compliance and ethical standards, ensuring accountability and
                  transparency in all business dealings to uphold stakeholder trust.
                </p>
              </Card>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
