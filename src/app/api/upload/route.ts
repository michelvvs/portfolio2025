import { NextRequest, NextResponse } from 'next/server'
import { writeFile, mkdir } from 'fs/promises'
import { join } from 'path'
import { getServerSession } from "next-auth/next"

export async function POST(request: NextRequest) {
  // Verificando Autenticação
  const session = await getServerSession()
  if (!session || session.user?.email !== "michel.vvs@gmail.com") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const data = await request.formData()
  const file: File | null = data.get('file') as unknown as File

  if (!file) {
    return NextResponse.json({ error: "No file provided" }, { status: 400 })
  }

  const bytes = await file.arrayBuffer()
  const buffer = Buffer.from(bytes)

  // Gerar o nome de pasta YYYY-MM-DD
  const date = new Date()
  const folderName = date.toISOString().split('T')[0]
  const uploadDir = join(process.cwd(), 'public', 'uploads', folderName)

  try {
    await mkdir(uploadDir, { recursive: true })
  } catch (err) {
    console.error("Erro ao criar diretório", err)
  }

  // Sanitizar nome e trocar extensão para webp
  const sanitizedName = file.name.replace(/[^a-zA-Z0-9.\-_]/g, '').split('.')[0]
  const timestampName = `${Date.now()}-${sanitizedName}.webp`
  const filePath = join(uploadDir, timestampName)

  // Processar imagem com sharp (max 1200px X webp otimizado 80%)
  const sharp = (await import('sharp')).default
  await sharp(buffer)
    .resize({ width: 1200, withoutEnlargement: true })
    .webp({ quality: 80 })
    .toFile(filePath)

  return NextResponse.json({ url: `/uploads/${folderName}/${timestampName}` })
}
