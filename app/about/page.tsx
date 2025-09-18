"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Eye, Target, Heart } from "lucide-react"
import SmoothScrollNav from "@/components/smooth-scroll-nav"

export default function AboutPage() {
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
            <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-6 font-heading">About Ciptatech</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
              A leading software house dedicated to delivering innovative digital solutions that drive business growth
              and promote sustainable practices
            </p>
          </motion.div>

          {/* Vision, Mission, Who We Are */}
          <div className="grid lg:grid-cols-3 gap-12 mb-20">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
                <CardContent className="p-8 text-center">
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-primary/20 transition-colors"
                  >
                    <Eye className="w-8 h-8 text-primary" />
                  </motion.div>
                  <h3 className="text-xl font-bold text-foreground mb-4 font-heading">Our Vision</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    To empower communities and organizations through innovative digital platforms that inspire
                    purposeful action, enhance social impact, and foster a culture of care — advancing volunteerism, ESG
                    responsibility, and compassionate support for every generation.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
                <CardContent className="p-8 text-center">
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-primary/20 transition-colors"
                  >
                    <Target className="w-8 h-8 text-primary" />
                  </motion.div>
                  <h3 className="text-xl font-bold text-foreground mb-4 font-heading">Our Mission</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    To deliver exceptional software solutions through innovation, quality, and client-centric approach,
                    helping businesses achieve their digital transformation goals while promoting sustainable practices
                    and social responsibility.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
                <CardContent className="p-8 text-center">
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-primary/20 transition-colors"
                  >
                    <Heart className="w-8 h-8 text-primary" />
                  </motion.div>
                  <h3 className="text-xl font-bold text-foreground mb-4 font-heading">Who We Are</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    A passionate team of developers, designers, and consultants committed to creating innovative
                    software solutions that make a real difference in our clients' businesses and communities.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Core Values */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-center mb-16"
          >
            <h3 className="text-2xl font-bold text-foreground mb-8 font-heading">Our Core Values & Principles</h3>
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-left"
              >
                <Card className="p-6 h-full">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <span className="text-primary font-bold">01</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-foreground mb-2">Commitment to Ethical Standards</h4>
                      <p className="text-sm text-muted-foreground">
                        CiptaTech prioritizes ethical governance, ensuring transparency and accountability in all
                        operations, which builds trust and strengthens client relationships.
                      </p>
                    </div>
                  </div>
                </Card>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-left"
              >
                <Card className="p-6 h-full">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <span className="text-primary font-bold">02</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-foreground mb-2">Focus on Sustainable Innovation</h4>
                      <p className="text-sm text-muted-foreground">
                        By integrating sustainability into our innovation processes, CiptaTech not only meets market
                        demands but also contributes positively to environmental and social well-being.
                      </p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            </div>
          </motion.div>

          {/* Unique Selling Propositions */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-center mb-16"
          >
            <h3 className="text-2xl font-bold text-foreground mb-8 font-heading">Unique Selling Propositions</h3>
            <Card className="p-8 max-w-4xl mx-auto">
              <h4 className="text-xl font-bold text-foreground mb-4">Innovative Application Integration</h4>
              <p className="text-muted-foreground leading-relaxed">
                CiptaTech's unique selling propositions emphasize a cohesive ecosystem of applications that not only
                streamline operations but also enhance user experience, ensuring that clients benefit from a holistic
                approach to technology and sustainability.
              </p>
            </Card>
          </motion.div>

          {/* Current Products Overview */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-center"
          >
            <h3 className="text-2xl font-bold text-foreground mb-8 font-heading">Overview of Current Products</h3>
            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              <Card className="p-6 text-left">
                <h4 className="text-lg font-bold text-foreground mb-3">Innovative Application Suite</h4>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  CiptaTech's product lineup includes the Timebank, mycare credit, and CiptaESG Apps, each designed to
                  address specific industry challenges and enhance operational efficiency.
                </p>
              </Card>
              <Card className="p-6 text-left">
                <h4 className="text-lg font-bold text-foreground mb-3">User-Centric Design</h4>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Each application features intuitive interfaces and robust functionalities, ensuring a seamless user
                  experience that drives engagement and satisfaction across diverse user bases.
                </p>
              </Card>
              <Card className="p-6 text-left">
                <h4 className="text-lg font-bold text-foreground mb-3">Impactful Growth Metrics</h4>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  The products have demonstrated significant market traction, with impressive user adoption rates,
                  reflecting CiptaTech's commitment to delivering value-driven solutions.
                </p>
              </Card>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
