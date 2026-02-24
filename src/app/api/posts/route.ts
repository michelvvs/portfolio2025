import { NextRequest, NextResponse } from "next/server"
import { openDb } from "../../../../lib/db"
import { getServerSession } from "next-auth/next"

export async function GET() {
  const db = await openDb()
  const posts = await db.all('SELECT id, title, slug, cover_image, created_at FROM posts ORDER BY created_at DESC')
  return NextResponse.json(posts)
}

export async function POST(request: NextRequest) {
  const session = await getServerSession()
  if (!session || session.user?.email !== "michel.vvs@gmail.com") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const body = await request.json()
  const { title, slug, content, cover_image } = body

  if (!title || !slug || !content) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 })
  }

  const db = await openDb()
  try {
    const result = await db.run(
      'INSERT INTO posts (title, slug, content, cover_image) VALUES (?, ?, ?, ?)',
      [title, slug, content, cover_image ?? null]
    )
    return NextResponse.json({ id: result.lastID, slug }, { status: 201 })
  } catch (error: any) {
    if (error.message.includes("UNIQUE constraint failed")) {
      return NextResponse.json({ error: "Slug already exists" }, { status: 409 })
    }
    return NextResponse.json({ error: "Database error" }, { status: 500 })
  }
}
