import { openDb } from "../../../../lib/db"
import MenuBar from "../../../components/MenuBar"
import { notFound } from "next/navigation"

async function getPost(slug: string) {
  const db = await openDb()
  const post = await db.get('SELECT * FROM posts WHERE slug = ?', [slug])
  return post
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params
  const post = await getPost(resolvedParams.slug)
  if (!post) return { title: 'Not Found' }
  return { title: `${post.title} | Michel Victor` }
}

export const revalidate = 60

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params
  const post = await getPost(resolvedParams.slug)

  if (!post) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-white font-poppins pb-32">
      <MenuBar />
      
      <article className="max-w-3xl mx-auto px-6 pt-32 lg:pt-40">
        <header className="mb-12 text-center">
          <div className="text-emerald-600 font-semibold tracking-widest uppercase text-sm mb-4">
            {new Date(post.created_at).toLocaleDateString('pt-BR', { month: 'long', day: 'numeric', year: 'numeric' })}
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-10 leading-tight text-gray-900">
            {post.title}
          </h1>
          
          {post.cover_image && (
            <div className="w-full aspect-[21/9] rounded-2xl overflow-hidden my-12 shadow-md">
              <img 
                src={post.cover_image} 
                alt={post.title} 
                className="w-full h-full object-cover"
              />
            </div>
          )}
        </header>

        <div 
          className="prose prose-lg md:prose-xl prose-emerald max-w-none text-gray-800"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        <div className="mt-20 pt-10 border-t border-gray-100 flex justify-between items-center">
          <a href="/blog" className="text-emerald-600 font-bold hover:text-emerald-800 transition flex items-center gap-2">
            ← Voltar para todos os artigos
          </a>
        </div>
      </article>
    </div>
  )
}
