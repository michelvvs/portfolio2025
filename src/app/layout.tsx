import 'tailwindcss/tailwind.css'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Michel Victor - Javascript dev',
  description: 'Portfólio 2025 focado em Fullstack.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap" rel="stylesheet" />
      </head>
      <body>{children}</body>
    </html>
  )
}
