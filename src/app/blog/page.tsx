import { openDb } from "../../../lib/db"
import MenuBar from "../../components/MenuBar"

async function getPosts() {
  const db = await openDb()
  return db.all('SELECT id, title, slug, cover_image, created_at FROM posts ORDER BY created_at DESC')
}

export const revalidate = 60 // Revalidar a cada 60s (ISR)

export default async function BlogPage() {
  const posts = await getPosts()

  return (
    <div className="min-h-screen bg-gray-50 font-poppins text-gray-900 pb-24">
      <MenuBar />
      <div className="max-w-4xl mx-auto px-6 pt-32 lg:pt-40">
        <header className="mb-16">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-4 tracking-tight">Blog</h1>
          <p className="text-xl text-gray-600">Meus ensaios, pensamentos técnicos e anotações de jornada.</p>
        </header>

        {posts.length === 0 ? (
          <div className="py-20 text-center text-gray-500 bg-white rounded-xl border border-gray-100 italic">
            Nenhum artigo publicado ainda. Em breve!
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {posts.map((post) => (
              <a 
                key={post.slug} 
                href={`/blog/${post.slug}`}
                className="group flex flex-col bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                {post.cover_image && (
                  <div className="h-48 overflow-hidden">
                    <img 
                      src={post.cover_image} 
                      alt={post.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                )}
                <div className="p-6 flex flex-col flex-1 justify-between">
                  <div>
                    <h2 className="text-2xl font-bold mb-3 group-hover:text-emerald-600 transition-colors line-clamp-2">
                      {post.title}
                    </h2>
                  </div>
                  <div className="text-sm font-medium text-gray-400 mt-6 uppercase tracking-wider">
                    {new Date(post.created_at).toLocaleDateString('pt-BR', { month: 'long', day: 'numeric', year: 'numeric' })}
                  </div>
                </div>
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
