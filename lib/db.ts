import sqlite3 from 'sqlite3'
import { open, Database } from 'sqlite'

let dbInstance: Database<sqlite3.Database, sqlite3.Statement> | null = null

export async function openDb() {
  if (dbInstance) {
    return dbInstance
  }

  const db = await open({
    filename: './blog.db',
    driver: sqlite3.Database,
  })

  // Criar tabela se não existir
  await db.exec(`
    CREATE TABLE IF NOT EXISTS posts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      slug TEXT UNIQUE NOT NULL,
      content TEXT NOT NULL,
      cover_image TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `)

  dbInstance = db
  return db
}
