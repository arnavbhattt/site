import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

// Configure the Inter font with all the weights needed
const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap", // Use 'swap' for better font loading behavior
})

export const metadata: Metadata = {
  title: 'Arnav Bhatt',
  description: 'Personal website of Arnav Bhatt - CS @ NCSU',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} bg-gray-900 text-gray-100 min-h-screen`}>{children}</body>
    </html>
  )
}

