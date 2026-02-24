"use client"

import { useSession } from "next-auth/react"
import { useEffect, useState, use } from "react"
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Image from '@tiptap/extension-image'

export default function EditorPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params)
  const { data: session, status } = useSession()
  const isNew = resolvedParams.slug === 'new'
  
  const [title, setTitle] = useState('')
  const [slug, setSlug] = useState('')
  const [coverImage, setCoverImage] = useState('')
  const [isSaving, setIsSaving] = useState(false)

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit,
      Image.configure({
        inline: true,
        allowBase64: true,
        HTMLAttributes: {
          class: 'max-w-full rounded-lg shadow-sm my-8',
        },
      }),
    ],
    content: '',
    editorProps: {
      attributes: {
        class: 'prose prose-lg max-w-none focus:outline-none min-h-[50vh]',
      },
    },
  })

  useEffect(() => {
    if (!isNew && status === "authenticated" && editor) {
      fetch(`/api/posts/${resolvedParams.slug}`).then(res => res.json()).then(data => {
        if (!data.error) {
          setTitle(data.title)
          setSlug(data.slug)
          setCoverImage(data.cover_image || '')
          editor.commands.setContent(data.content)
        }
      })
    }
  }, [isNew, status, resolvedParams.slug, editor])

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const formData = new FormData()
    formData.append('file', file)

    const res = await fetch('/api/upload', {
      method: 'POST',
      body: formData
    })

    const data = await res.json()
    if (data.url) {
      editor?.chain().focus().setImage({ src: data.url }).run()
    }
  }

  const handleSave = async () => {
    if (!title || !editor?.getHTML()) return alert("Título e Conteúdo são obrigatórios")
    
    setIsSaving(true)
    const url = isNew ? '/api/posts' : `/api/posts/${slug}`
    const method = isNew ? 'POST' : 'PUT'

    const generatedSlug = slug || title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '')

    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title,
        slug: generatedSlug,
        content: editor.getHTML(),
        cover_image: coverImage
      })
    })

    const data = await res.json()
    setIsSaving(false)

    if (res.ok) {
      window.location.href = '/admin'
    } else {
      alert(data.error || 'Erro ao salvar')
    }
  }

  if (status === "loading") return <p className="text-center mt-10">Carregando...</p>
  if (!session) return <p className="text-center mt-10 text-red-500">Acesso Restrito</p>

  return (
    <div className="max-w-3xl mx-auto py-8">
      <div className="flex justify-between items-center mb-12">
        <a href="/admin" className="text-gray-500 hover:text-black transition">← Voltar</a>
        <button 
          onClick={handleSave} 
          disabled={isSaving}
          className="bg-green-600 text-white px-6 py-2 rounded-full font-medium hover:bg-green-700 disabled:opacity-50 transition shadow-sm"
        >
          {isSaving ? 'Salvando...' : 'Publicar'}
        </button>
      </div>

      <input 
        type="text" 
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Título do Artigo" 
        className="w-full text-4xl md:text-5xl font-bold border-none outline-none font-poppins text-gray-900 placeholder-gray-300 mb-6 bg-transparent"
      />
      
      <div className="flex flex-col sm:flex-row gap-4 mb-10 text-gray-500 text-sm border-b pb-6">
        <div className="flex-1">
          <label className="block text-xs uppercase tracking-wider mb-1 font-semibold text-gray-400">URL Amigável (Slug)</label>
          <input 
            type="text" 
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            placeholder={title ? title.toLowerCase().replace(/[^a-z0-9]+/g, '-') : "meu-novo-artigo"} 
            className="w-full border-none outline-none bg-transparent"
            disabled={!isNew}
          />
        </div>
        <div className="flex-1">
          <label className="block text-xs uppercase tracking-wider mb-1 font-semibold text-gray-400">URL Imagem Capa (Opcional)</label>
          <input 
            type="text" 
            value={coverImage}
            onChange={(e) => setCoverImage(e.target.value)}
            placeholder="https://... ou /uploads/..." 
            className="w-full border-none outline-none bg-transparent"
          />
        </div>
      </div>

      {/* Toolbar do TipTap */}
      <div className="flex items-center gap-2 mb-6 sticky top-0 bg-white/90 backdrop-blur-sm z-10 py-3 border-b border-gray-100">
        <button
          onClick={() => editor?.chain().focus().toggleBold().run()}
          className={`p-2 rounded hover:bg-gray-100 transition ${editor?.isActive('bold') ? 'bg-gray-200 text-black' : 'text-gray-500'}`}
          title="Negrito"
        >
          B
        </button>
        <button
          onClick={() => editor?.chain().focus().toggleItalic().run()}
          className={`p-2 rounded hover:bg-gray-100 italic transition ${editor?.isActive('italic') ? 'bg-gray-200 text-black' : 'text-gray-500'}`}
          title="Itálico"
        >
          I
        </button>
        <div className="w-px h-6 bg-gray-300 mx-2"></div>
        <button
          onClick={() => editor?.chain().focus().toggleHeading({ level: 2 }).run()}
          className={`p-2 rounded font-bold hover:bg-gray-100 transition ${editor?.isActive('heading', { level: 2 }) ? 'bg-gray-200 text-black' : 'text-gray-500'}`}
          title="Título (H2)"
        >
          H2
        </button>
        <button
          onClick={() => editor?.chain().focus().toggleHeading({ level: 3 }).run()}
          className={`p-2 rounded font-bold hover:bg-gray-100 transition ${editor?.isActive('heading', { level: 3 }) ? 'bg-gray-200 text-black' : 'text-gray-500'}`}
          title="Subtítulo (H3)"
        >
          H3
        </button>
        <div className="w-px h-6 bg-gray-300 mx-2"></div>
        <div className="relative">
          <input 
            type="file" 
            id="image-upload" 
            className="hidden" 
            accept="image/*" 
            onChange={handleImageUpload} 
          />
          <label 
            htmlFor="image-upload" 
            className="cursor-pointer text-gray-500 hover:text-black bg-gray-50 hover:bg-gray-100 px-3 py-1.5 rounded-md text-sm font-medium transition flex items-center gap-2 border border-gray-200"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>
            Inserir Imagem
          </label>
        </div>
      </div>

      <div className="pb-32">
        <EditorContent editor={editor} />
      </div>
    </div>
  )
}
