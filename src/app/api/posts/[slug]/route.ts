import { NextRequest, NextResponse } from "next/server"
import { openDb } from "../../../../../lib/db"
import { getServerSession } from "next-auth/next"

export async function GET(request: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params
  const db = await openDb()
  const post = await db.get('SELECT * FROM posts WHERE slug = ?', [resolvedParams.slug])
  
  if (!post) {
    return NextResponse.json({ error: "Post not found" }, { status: 404 })
  }
  
  return NextResponse.json(post)
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params
  const session = await getServerSession()
  if (!session || session.user?.email !== "michel.vvs@gmail.com") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const body = await request.json()
  const { title, content, cover_image } = body

  if (!title || !content) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 })
  }

  const db = await openDb()
  const result = await db.run(
    'UPDATE posts SET title = ?, content = ?, cover_image = ? WHERE slug = ?',
    [title, content, cover_image ?? null, resolvedParams.slug]
  )

  if (result.changes === 0) {
    return NextResponse.json({ error: "Post not found" }, { status: 404 })
  }

  return NextResponse.json({ success: true })
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params
  const session = await getServerSession()
  if (!session || session.user?.email !== "michel.vvs@gmail.com") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const db = await openDb()
  const result = await db.run('DELETE FROM posts WHERE slug = ?', [resolvedParams.slug])

  if (result.changes === 0) {
    return NextResponse.json({ error: "Post not found" }, { status: 404 })
  }

  return NextResponse.json({ success: true })
}
