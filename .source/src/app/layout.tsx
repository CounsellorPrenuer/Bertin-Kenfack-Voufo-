import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Career Compass Global | Find your direction. Build your future.',
  description: 'Career Guidance, Workshops & Seminars, Admission Guidance by Bertin Kenfack Voufo.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
