"use client"

import { useSession } from "next-auth/react"
import { useEffect, useState, use } from "react"
import { useEditor, EditorContent } from '@tiptap/react'
import { BubbleMenu, FloatingMenu } from '@tiptap/react/menus'
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
      const altText = window.prompt("Digite uma descrição curta para a imagem (opcional)") || ""
      editor?.chain().focus().setImage({ src: data.url, alt: altText, title: altText }).run()
      
      if (altText) {
        editor?.chain().focus().insertContent(`<p style="text-align: center; font-size: 0.875rem; color: #6b7280; font-style: italic; margin-top: 0.5rem;">${altText}</p>`).run()
      }
    }
  }

  const handleSave = async () => {
    const contentHTML = editor?.getHTML() || ""
    if (!title || !contentHTML) return alert("Título e Conteúdo são obrigatórios")
    
    setIsSaving(true)
    const url = isNew ? '/api/posts' : `/api/posts/${slug}`
    const method = isNew ? 'POST' : 'PUT'

    const generatedSlug = slug || title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '')

    let finalCoverImage = coverImage
    if (!finalCoverImage) {
      const parser = new DOMParser()
      const doc = parser.parseFromString(contentHTML, 'text/html')
      const firstImg = doc.querySelector('img')
      if (firstImg && firstImg.src) {
        finalCoverImage = firstImg.src
      }
    }

    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title,
        slug: generatedSlug,
        content: contentHTML,
        cover_image: finalCoverImage
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

      {/* Bubble Menu para Formatação Rápida (Estilo Medium) */}
      {editor && (
        <BubbleMenu editor={editor} className="flex items-center bg-gray-900 text-white rounded-lg px-2 py-1 shadow-xl gap-1">
          <button
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={`p-1.5 rounded hover:bg-gray-700 transition ${editor.isActive('bold') ? 'text-green-400 bg-gray-800' : 'text-gray-300'}`}
            title="Negrito"
          >
            <strong className="font-serif">B</strong>
          </button>
          <button
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={`p-1.5 rounded hover:bg-gray-700 italic transition ${editor.isActive('italic') ? 'text-green-400 bg-gray-800' : 'text-gray-300'}`}
            title="Itálico"
          >
            <span className="font-serif">I</span>
          </button>
          <div className="w-px h-5 bg-gray-700 mx-1"></div>
          <button
            onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
            className={`p-1.5 text-sm font-bold rounded hover:bg-gray-700 transition ${editor.isActive('heading', { level: 2 }) ? 'text-green-400 bg-gray-800' : 'text-gray-300'}`}
            title="Título Secundário"
          >
            H2
          </button>
          <button
            onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
            className={`p-1.5 text-sm font-bold rounded hover:bg-gray-700 transition ${editor.isActive('heading', { level: 3 }) ? 'text-green-400 bg-gray-800' : 'text-gray-300'}`}
            title="Título Terciário"
          >
            H3
          </button>
        </BubbleMenu>
      )}

      {/* Floating Menu para Add Arquivos / Nova linha */}
      {editor && (
        <FloatingMenu editor={editor} className="flex ml-[-4rem]">
          <div className="relative group">
            <input 
              type="file" 
              id="image-upload-float" 
              className="hidden" 
              accept="image/*" 
              onChange={handleImageUpload} 
            />
            <label 
              htmlFor="image-upload-float" 
              className="inline-flex items-center justify-center cursor-pointer text-gray-400 hover:text-green-600 border border-gray-300 rounded-full w-10 h-10 transition hover:bg-gray-50 shadow-sm bg-white"
              title="Inserir Nova Imagem"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14"/><path d="M5 12h14"/></svg>
            </label>
          </div>
        </FloatingMenu>
      )}

      <div className="pb-32">
        <EditorContent editor={editor} />
      </div>
    </div>
  )
}
