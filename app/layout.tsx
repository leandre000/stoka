import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import Footer from "@/components/Footer"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Stoka",
  description: "A comprehensive inventory management system for products and services",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" sizes="any" />
        <link rel="apple-touch-icon" href="/favicon.svg" sizes="180x180" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" sizes="32x32" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" sizes="16x16" />
        <link rel="shortcut icon" href="/favicon.svg" type="image/svg+xml" />
        <meta name="msapplication-TileColor" content="#8B4513" />
        <meta name="theme-color" content="#8B4513" />
      </head>
      <body className={inter.className + " min-h-screen flex flex-col"}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
          <div className="flex-1 flex flex-col min-h-screen">
            {children}
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
