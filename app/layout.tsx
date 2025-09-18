import type React from "react"
import type { Metadata } from "next"
import { Montserrat } from "next/font/google"
import { Open_Sans } from "next/font/google"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { Suspense } from "react"

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "600", "700", "900"],
  variable: "--font-montserrat",
  display: "swap",
})

const openSans = Open_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-open-sans",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Ciptatech Sdn Bhd - Bridging Innovation and Industry",
  description:
    "Ciptatech accelerates adoption of emerging tech across agriculture, healthcare, manufacturing, and finance—providing trading, advisory and end-to-end implementation.",
  generator: "v0.app",
  keywords: [
    "technology",
    "innovation",
    "agriculture",
    "healthcare",
    "manufacturing",
    "finance",
    "AI",
    "IoT",
    "Malaysia",
  ],
  openGraph: {
    title: "Ciptatech Sdn Bhd - Bridging Innovation and Industry",
    description: "Accelerating adoption of emerging technologies across key industries",
    type: "website",
    locale: "en_US",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans ${montserrat.variable} ${openSans.variable} ${GeistMono.variable}`}>
        <Suspense fallback={null}>{children}</Suspense>
        <Analytics />
      </body>
    </html>
  )
}
