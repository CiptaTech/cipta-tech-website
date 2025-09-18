"use client"

import { useState, useEffect } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowRight, Code, Zap, Shield, Target } from "lucide-react"
import Link from "next/link"
import SmoothScrollNav from "@/components/smooth-scroll-nav"

export default function HomePage() {
  const [showScrollTop, setShowScrollTop] = useState(false)

  const { scrollYProgress } = useScroll()
  const heroY = useTransform(scrollYProgress, [0, 1], [0, -50])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0])

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <div className="min-h-screen bg-background">
      <SmoothScrollNav />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <motion.div
          style={{ y: heroY, opacity: heroOpacity }}
          className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-secondary/10"
        />

        <div className="absolute inset-0 opacity-[0.03]">
          {/* Grid Pattern */}
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `
                linear-gradient(rgba(34, 197, 94, 0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(34, 197, 94, 0.1) 1px, transparent 1px)
              `,
              backgroundSize: "60px 60px",
            }}
          />

          {/* Dot Pattern Overlay */}
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle, rgba(34, 197, 94, 0.15) 1px, transparent 1px)`,
              backgroundSize: "30px 30px",
              backgroundPosition: "15px 15px",
            }}
          />
        </div>

        <div className="absolute inset-0 opacity-10">
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 10, 0],
              x: [0, 30, 0],
            }}
            transition={{
              duration: 25,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
            className="absolute top-20 left-20 w-72 h-72 bg-gradient-to-br from-primary to-primary/50 rounded-full blur-3xl"
          />
          <motion.div
            animate={{
              scale: [1, 1.3, 1],
              rotate: [0, -15, 0],
              x: [0, -40, 0],
            }}
            transition={{
              duration: 30,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
            className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-br from-secondary to-secondary/50 rounded-full blur-3xl"
          />
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
              rotate: [0, 8, 0],
              y: [0, -20, 0],
            }}
            transition={{
              duration: 20,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-br from-primary/30 to-secondary/30 rounded-full blur-2xl"
          />
        </div>

        <div className="relative z-10 container mx-auto px-4 py-20 pt-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Logo and Branding */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center lg:text-left"
            >
              {/* Logo Placeholder */}
              <div className="mb-8">
                <motion.div
                  whileHover={{ scale: 1.05, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-primary to-primary/80 rounded-2xl mb-4 shadow-lg"
                >
                  <span className="text-2xl font-black text-primary-foreground font-heading">CT</span>
                </motion.div>
                <h1 className="text-4xl lg:text-6xl font-black text-foreground font-heading leading-tight">
                  <motion.span
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                  >
                    Ciptatech
                  </motion.span>
                  <motion.span
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="block text-primary"
                  >
                    Sdn Bhd
                  </motion.span>
                </h1>
              </div>
            </motion.div>

            {/* Right Column - Tagline and CTA */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-center lg:text-left"
            >
              <h2 className="text-2xl lg:text-4xl font-bold text-foreground mb-6 font-heading text-balance">
                Advanced Digital Solutions for Sustainable Growth
              </h2>
              <p className="text-lg lg:text-xl text-muted-foreground mb-8 leading-relaxed text-pretty">
                CiptaTech specializes in creating advanced applications and tools that enhance operational efficiency
                and promote sustainable practices across various sectors.
              </p>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="grid grid-cols-2 gap-4 mb-8"
              >
                {[
                  { icon: Code, label: "Custom Development" },
                  { icon: Zap, label: "Fast Delivery" },
                  { icon: Shield, label: "Quality Assured" },
                  { icon: Target, label: "Client-Focused" },
                ].map((item, index) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                    whileHover={{ scale: 1.05, y: -2 }}
                    className="flex items-center gap-3 p-3 rounded-xl bg-background/50 backdrop-blur-sm border border-border/50 shadow-sm hover:shadow-md transition-all duration-300"
                  >
                    <div className="w-10 h-10 bg-gradient-to-br from-primary/20 to-primary/10 rounded-lg flex items-center justify-center">
                      <item.icon className="w-5 h-5 text-primary" />
                    </div>
                    <span className="text-sm font-medium text-foreground">{item.label}</span>
                  </motion.div>
                ))}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.2 }}
              >
                <Link href="/contact">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary text-primary-foreground px-8 py-6 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group"
                  >
                    Start Your Project
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Enhanced Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.5 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            whileHover={{ scale: 1.1 }}
            className="w-6 h-10 border-2 border-primary/30 rounded-full flex justify-center cursor-pointer"
            onClick={() => document.getElementById("featured-projects")?.scrollIntoView({ behavior: "smooth" })}
          >
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              className="w-1 h-3 bg-primary rounded-full mt-2"
            />
          </motion.div>
        </motion.div>
      </section>

      {/* Featured Projects Section */}
      <section id="featured-projects" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-6 font-heading">Our Featured Projects</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto text-pretty">
              Innovative applications designed to enhance social impact and promote sustainable practices
            </p>
          </motion.div>

          {/* mycarecredit App */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            viewport={{ once: true }}
            className="mb-20"
          >
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-2xl lg:text-3xl font-bold text-foreground mb-6 font-heading">mycarecredit App</h3>
                <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                  A revolutionary platform that tracks and rewards care activities, promoting volunteerism and community
                  engagement through innovative gamification features.
                </p>
                <div className="grid md:grid-cols-3 gap-6 mb-8">
                  <motion.div whileHover={{ y: -4, scale: 1.02 }} transition={{ duration: 0.2 }}>
                    <Card className="p-6 text-center h-full bg-gradient-to-br from-background to-muted/30 border-border/50 shadow-sm hover:shadow-lg transition-all duration-300">
                      <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                        <span className="text-primary font-bold">01</span>
                      </div>
                      <h4 className="font-semibold text-foreground mb-3">Care Credit Tracking</h4>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        Users can track their care credit hours on the platform, ensuring their hours are recorded.
                      </p>
                    </Card>
                  </motion.div>
                  <motion.div whileHover={{ y: -4, scale: 1.02 }} transition={{ duration: 0.2 }}>
                    <Card className="p-6 text-center h-full bg-gradient-to-br from-background to-muted/30 border-border/50 shadow-sm hover:shadow-lg transition-all duration-300">
                      <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                        <span className="text-primary font-bold">02</span>
                      </div>
                      <h4 className="font-semibold text-foreground mb-3">Streamlined Digital Experience</h4>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        The app simplifies the application process, allowing users to collect carecredit quickly and
                        efficiently without cumbersome paperwork.
                      </p>
                    </Card>
                  </motion.div>
                  <motion.div whileHover={{ y: -4, scale: 1.02 }} transition={{ duration: 0.2 }}>
                    <Card className="p-6 text-center h-full bg-gradient-to-br from-background to-muted/30 border-border/50 shadow-sm hover:shadow-lg transition-all duration-300">
                      <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                        <span className="text-primary font-bold">03</span>
                      </div>
                      <h4 className="font-semibold text-foreground mb-3">Extensive Volunteer Access</h4>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        A wide network of volunteer requests are available, enabling users to find where their services
                        are needed.
                      </p>
                    </Card>
                  </motion.div>
                </div>
              </div>
              <motion.div
                whileHover={{ scale: 1.02, y: -4 }}
                transition={{ duration: 0.3 }}
                className="bg-gradient-to-br from-primary/10 via-primary/5 to-secondary/10 rounded-2xl p-8 text-center shadow-lg hover:shadow-xl transition-all duration-300 border border-border/30"
              >
                <div className="w-24 h-24 bg-gradient-to-br from-primary/30 to-primary/20 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-md">
                  <span className="text-2xl font-bold text-primary">MC</span>
                </div>
                <h4 className="text-xl font-bold text-foreground mb-3">mycarecredit</h4>
                <p className="text-muted-foreground">Empowering communities through care tracking</p>
              </motion.div>
            </div>
          </motion.div>

          {/* CiptaESG App */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="mb-20"
          >
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div
                whileHover={{ scale: 1.02, y: -4 }}
                transition={{ duration: 0.3 }}
                className="order-2 lg:order-1 bg-gradient-to-br from-secondary/10 via-secondary/5 to-primary/10 rounded-2xl p-8 text-center shadow-lg hover:shadow-xl transition-all duration-300 border border-border/30"
              >
                <div className="w-24 h-24 bg-gradient-to-br from-secondary/30 to-secondary/20 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-md">
                  <span className="text-2xl font-bold text-secondary">ESG</span>
                </div>
                <h4 className="text-xl font-bold text-foreground mb-3">CiptaESG</h4>
                <p className="text-muted-foreground">Measuring impact for sustainable future</p>
              </motion.div>
              <div className="order-1 lg:order-2">
                <h3 className="text-2xl lg:text-3xl font-bold text-foreground mb-6 font-heading">CiptaESG App</h3>
                <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                  A comprehensive ESG platform that helps businesses and individuals measure their impact on the
                  environment, society, and governance, providing data-driven insights for sustainable practices.
                </p>
                <motion.div whileHover={{ y: -2, scale: 1.01 }} transition={{ duration: 0.2 }}>
                  <Card className="p-6 bg-gradient-to-br from-background to-muted/30 border-border/50 shadow-sm hover:shadow-lg transition-all duration-300">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-secondary/20 to-secondary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <span className="text-secondary font-bold text-sm">ESG</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground mb-3">Comprehensive User Support</h4>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          The ESG app includes a dedicated support system that offers users access to expert guidance
                          and resources, ensuring they can effectively utilize the app's features to enhance their
                          sustainability initiatives and navigate complex regulatory landscapes.
                        </p>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Upcoming Developments */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h3 className="text-2xl font-bold text-foreground mb-8 font-heading">Upcoming Product Developments</h3>
            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              <motion.div whileHover={{ y: -4, scale: 1.02 }} transition={{ duration: 0.2 }}>
                <Card className="p-6 text-left h-full bg-gradient-to-br from-background to-muted/30 border-border/50 shadow-sm hover:shadow-lg transition-all duration-300">
                  <div className="w-10 h-10 bg-gradient-to-br from-primary/20 to-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <Zap className="w-5 h-5 text-primary" />
                  </div>
                  <h4 className="text-lg font-bold text-foreground mb-3">Enhanced User Engagement</h4>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    New gamification features in the mycarecredit App to boost user interaction and reward timely
                    actions.
                  </p>
                </Card>
              </motion.div>
              <motion.div whileHover={{ y: -4, scale: 1.02 }} transition={{ duration: 0.2 }}>
                <Card className="p-6 text-left h-full bg-gradient-to-br from-background to-muted/30 border-border/50 shadow-sm hover:shadow-lg transition-all duration-300">
                  <div className="w-10 h-10 bg-gradient-to-br from-secondary/20 to-secondary/10 rounded-lg flex items-center justify-center mb-4">
                    <Target className="w-5 h-5 text-secondary" />
                  </div>
                  <h4 className="text-lg font-bold text-foreground mb-3">AI-Driven Efficiency</h4>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    mycarecredit and CiptaESG Apps will utilize AI to expedite application processes, improving user
                    experience significantly.
                  </p>
                </Card>
              </motion.div>
              <motion.div whileHover={{ y: -4, scale: 1.02 }} transition={{ duration: 0.2 }}>
                <Card className="p-6 text-left h-full bg-gradient-to-br from-background to-muted/30 border-border/50 shadow-sm hover:shadow-lg transition-all duration-300">
                  <div className="w-10 h-10 bg-gradient-to-br from-primary/20 to-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <Shield className="w-5 h-5 text-primary" />
                  </div>
                  <h4 className="text-lg font-bold text-foreground mb-3">Sustainability Insights</h4>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    ESG App will offer detailed carbon footprint reports, encouraging users to adopt more sustainable
                    practices.
                  </p>
                </Card>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-6 font-heading">
              Ready to Transform Your Ideas?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8 text-pretty">
              Let's work together to create innovative digital solutions that drive your business forward and make a
              positive impact.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary text-primary-foreground px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group"
                >
                  Start Your Project
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link href="/about">
                <Button
                  variant="outline"
                  size="lg"
                  className="px-8 py-3 rounded-xl border-2 hover:bg-muted/50 transition-all duration-300 bg-transparent"
                >
                  Learn More About Us
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground text-background py-12">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <Link href="/">
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary to-primary/80 rounded-2xl mb-4 shadow-lg"
              >
                <span className="text-xl font-black text-primary-foreground font-heading">CT</span>
              </motion.div>
            </Link>
            <h3 className="text-2xl font-bold mb-2 font-heading">Ciptatech Sdn Bhd</h3>
            <p className="text-background/70 mb-6">Your Trusted Software House Partner</p>
            <div className="flex justify-center space-x-8 text-sm text-background/70">
              <motion.a whileHover={{ scale: 1.05 }} href="#" className="hover:text-background transition-colors">
                Privacy Policy
              </motion.a>
              <motion.a whileHover={{ scale: 1.05 }} href="#" className="hover:text-background transition-colors">
                Terms of Service
              </motion.a>
              <Link href="/contact">
                <motion.span
                  whileHover={{ scale: 1.05 }}
                  className="hover:text-background transition-colors cursor-pointer"
                >
                  Contact
                </motion.span>
              </Link>
            </div>
            <div className="mt-8 pt-8 border-t border-background/20">
              <p className="text-background/50 text-sm">© 2024 Ciptatech Sdn Bhd. All rights reserved.</p>
            </div>
          </motion.div>
        </div>
      </footer>

      {/* Scroll to Top Button */}
      <motion.button
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: showScrollTop ? 1 : 0, scale: showScrollTop ? 1 : 0 }}
        onClick={scrollToTop}
        className="fixed bottom-8 right-8 w-12 h-12 bg-gradient-to-br from-primary to-primary/80 text-primary-foreground rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center z-40"
      >
        <ArrowRight className="w-5 h-5 -rotate-90" />
      </motion.button>
    </div>
  )
}
