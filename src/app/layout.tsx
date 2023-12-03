import type { Metadata } from 'next'
import { Source_Code_Pro } from 'next/font/google'
import './globals.css'

const sourceCodePro = Source_Code_Pro({ subsets: ['latin'], weight: ['400', '700'] })

export const metadata: Metadata = {
  title: 'AgileHub',
  description: 'Helps your create user story and mange agile for your team',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" data-theme="halloween">
      <body className={sourceCodePro.className}>{children}</body>
    </html>
  )
}
