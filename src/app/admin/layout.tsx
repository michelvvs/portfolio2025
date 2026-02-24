"use client"

import { SessionProvider } from "next-auth/react"

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <header className="bg-white border-b px-6 py-4 flex justify-between items-center shadow-sm">
          <h1 className="text-xl font-bold font-poppins">Painel de Controle</h1>
          <a href="/" className="text-blue-500 hover:underline">Voltar ao Portfólio</a>
        </header>
        <main className="flex-1 p-6 max-w-5xl mx-auto w-full">
          {children}
        </main>
      </div>
    </SessionProvider>
  )
}
