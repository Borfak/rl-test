import 'server-only'

import { eq, and, desc } from 'drizzle-orm'
import { db } from '@/pkg/integrations/drizzle'
import { notes } from '../schemas'
import { randomUUID } from 'crypto'

export interface CreateNoteDto {
  title: string
  content: string
  userId: string
}

export interface UpdateNoteDto {
  title?: string
  content?: string
}

export const NotesRepository = {
  async create(data: CreateNoteDto) {
    const now = new Date()

    const [note] = await db
      .insert(notes)
      .values({
        id: randomUUID(),
        title: data.title,
        content: data.content,
        userId: data.userId,
        createdAt: now,
        updatedAt: now,
      })
      .returning()

    return note
  },

  async findById(id: string) {
    const [note] = await db.select().from(notes).where(eq(notes.id, id))

    return note || null
  },

  async findByUserId(userId: string) {
    const userNotes = await db.select().from(notes).where(eq(notes.userId, userId)).orderBy(desc(notes.updatedAt))

    return userNotes
  },

  async update(id: string, userId: string, data: UpdateNoteDto) {
    const now = new Date()

    const [note] = await db
      .update(notes)
      .set({
        ...data,
        updatedAt: now,
      })
      .where(and(eq(notes.id, id), eq(notes.userId, userId)))
      .returning()

    return note || null
  },

  async delete(id: string, userId: string) {
    const [deletedNote] = await db
      .delete(notes)
      .where(and(eq(notes.id, id), eq(notes.userId, userId)))
      .returning()

    return deletedNote || null
  },
}
