import { NotesRepository } from '@/app/entities/db/repositories'
import { auth } from '@/pkg/integrations/better-auth/auth.config'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    const session = await auth.api.getSession({ headers: request.headers })

    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const notes = await NotesRepository.findByUserId(session.user.id)

    return NextResponse.json(notes)
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to fetch notes' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await auth.api.getSession({ headers: request.headers })

    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { title, content } = body

    if (!title || !content) {
      return NextResponse.json({ error: 'Title and content are required' }, { status: 400 })
    }

    const note = await NotesRepository.create({
      title,
      content,
      userId: session.user.id,
    })

    return NextResponse.json(note, { status: 201 })
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to create note' }, { status: 500 })
  }
}
