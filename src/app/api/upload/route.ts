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

  // Sanitizar o nome do arquivo para evitar problemas de filesystem
  const sanitizedName = file.name.replace(/[^a-zA-Z0-9.\-_]/g, '')
  const timestampName = `${Date.now()}-${sanitizedName}`
  const filePath = join(uploadDir, timestampName)

  await writeFile(filePath, buffer)

  // Retornar o caminho acessível publicamente pelo front-end
  return NextResponse.json({ url: `/uploads/${folderName}/${timestampName}` })
}
