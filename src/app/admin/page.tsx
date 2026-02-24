"use client"

import { useSession, signIn, signOut } from "next-auth/react"
import { useEffect, useState } from "react"

export default function AdminDashboard() {
  const { data: session, status } = useSession()
  const [posts, setPosts] = useState<any[]>([])

  useEffect(() => {
    if (session) {
      fetch('/api/posts').then(res => res.json()).then(data => setPosts(data))
    }
  }, [session])

  if (status === "loading") {
    return <p className="text-center mt-10">Carregando...</p>
  }

  if (!session) {
    return (
      <div className="flex flex-col items-center justify-center h-96 gap-6">
        <h2 className="text-2xl font-semibold">Acesso Restrito</h2>
        <p className="text-gray-600">Faça login com sua conta do Github autorizada para gerenciar o blog.</p>
        <button 
          onClick={() => signIn("github")}
          className="bg-black text-white px-6 py-2 rounded-md hover:bg-gray-800 transition shadow-md"
        >
          Entrar com Github
        </button>
      </div>
    )
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-3xl font-bold font-poppins">Meus Artigos</h2>
          <p className="text-sm text-gray-500 mt-1">Bem-vindo(a), {session.user?.name || session.user?.email}</p>
        </div>
        <div className="flex gap-4">
          <a 
            href="/admin/editor/new"
            className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition shadow-sm font-medium"
          >
            + Novo Artigo
          </a>
          <button 
            onClick={() => signOut()}
            className="border border-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-100 transition shadow-sm"
          >
            Sair
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        {posts.length === 0 ? (
          <div className="p-8 text-center text-gray-500">Nenhum post encontrado. Crie o primeiro!</div>
        ) : (
          <ul className="divide-y divide-gray-200">
            {posts.map((post) => (
              <li key={post.slug} className="p-6 hover:bg-gray-50 transition flex justify-between items-center group">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition">{post.title}</h3>
                  <div className="text-sm text-gray-500 mt-1 flex gap-4">
                    <span>{new Date(post.created_at).toLocaleDateString('pt-BR')}</span>
                    <span className="font-mono bg-gray-100 px-2 py-0.5 rounded text-xs">{post.slug}</span>
                  </div>
                </div>
                <div className="flex gap-3">
                  <a href={`/admin/editor/${post.slug}`} className="text-sm text-blue-600 hover:text-blue-800 font-medium bg-blue-50 px-3 py-1.5 rounded-md hover:bg-blue-100 transition">Editar</a>
                  <button 
                    onClick={async () => {
                      if(confirm('Tem certeza que deseja apagar?')) {
                        await fetch(`/api/posts/${post.slug}`, { method: 'DELETE' })
                        setPosts(posts.filter(p => p.slug !== post.slug))
                      }
                    }}
                    className="text-sm text-red-600 hover:text-red-800 font-medium bg-red-50 px-3 py-1.5 rounded-md hover:bg-red-100 transition"
                  >
                    Apagar
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
