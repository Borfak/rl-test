export interface INote {
  id: string
  title: string
  content: string
  userId: string
  createdAt: string
  updatedAt: string
}

export interface ICreateNoteInput {
  title: string
  content: string
}

export interface IUpdateNoteInput {
  title?: string
  content?: string
}
