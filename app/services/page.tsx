"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import {
  Globe,
  Smartphone,
  Monitor,
  Palette,
  Video,
  MessageSquare,
  Settings,
  FileText,
  Cog,
  CheckCircle,
  Rocket,
} from "lucide-react"
import SmoothScrollNav from "@/components/smooth-scroll-nav"

export default function ServicesPage() {
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
            <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-6 font-heading">Our Services</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
              Comprehensive software development services tailored to meet your business needs and drive digital
              transformation
            </p>
          </motion.div>

          {/* Services Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
            {[
              {
                icon: Globe,
                title: "Website Development",
                description:
                  "Custom websites and web applications built with modern technologies and responsive design.",
              },
              {
                icon: Smartphone,
                title: "App Development",
                description:
                  "Native and cross-platform mobile applications for iOS and Android with seamless user experience.",
              },
              {
                icon: Monitor,
                title: "System Development",
                description:
                  "Enterprise software solutions, CRM systems, and custom business applications tailored to your needs.",
              },
              {
                icon: Palette,
                title: "Graphic Design",
                description: "Creative visual solutions including branding, UI/UX design, and marketing materials.",
              },
              {
                icon: Video,
                title: "Video Editing",
                description:
                  "Professional video production and editing services for marketing, training, and promotional content.",
              },
              {
                icon: MessageSquare,
                title: "Website Consulting",
                description:
                  "Strategic guidance on web technologies, digital transformation, and online presence optimization.",
              },
              {
                icon: Settings,
                title: "Software Consulting",
                description:
                  "Expert advice on software architecture, technology selection, and development best practices.",
              },
            ].map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
              >
                <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
                  <CardContent className="p-8 text-center">
                    <motion.div
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.5 }}
                      className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-primary/20 transition-colors"
                    >
                      <service.icon className="w-8 h-8 text-primary" />
                    </motion.div>
                    <h3 className="text-xl font-bold text-foreground mb-4 font-heading">{service.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{service.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Development Process */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h3 className="text-2xl lg:text-3xl font-bold text-foreground mb-6 font-heading">
              Our Development Process
            </h3>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
              A proven methodology that ensures successful project delivery from concept to deployment
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: FileText,
                title: "Requirements Gathering",
                description:
                  "We analyze your business needs, understand your goals, and define project scope with detailed documentation.",
                step: "01",
              },
              {
                icon: Cog,
                title: "Design & Development",
                description:
                  "Our team creates wireframes, designs, and develops your solution using best practices and modern technologies.",
                step: "02",
              },
              {
                icon: CheckCircle,
                title: "Testing & Quality Assurance",
                description:
                  "Rigorous testing ensures your software is bug-free, secure, and performs optimally across all platforms.",
                step: "03",
              },
              {
                icon: Rocket,
                title: "Deployment & Support",
                description:
                  "We deploy your solution and provide ongoing support, maintenance, and updates to ensure continued success.",
                step: "04",
              },
            ].map((process, index) => (
              <motion.div
                key={process.title}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                whileHover={{ y: -5 }}
                className="relative"
              >
                <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
                  <CardContent className="p-8 text-center relative">
                    {/* Step Number */}
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                      <span className="text-sm font-bold text-primary-foreground">{process.step}</span>
                    </div>

                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6 mt-4 group-hover:bg-primary/20 transition-colors"
                    >
                      <process.icon className="w-8 h-8 text-primary" />
                    </motion.div>
                    <h4 className="text-lg font-bold text-foreground mb-4 font-heading">{process.title}</h4>
                    <p className="text-muted-foreground leading-relaxed text-sm">{process.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
