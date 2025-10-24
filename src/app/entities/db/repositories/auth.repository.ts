import { eq } from 'drizzle-orm'
import { db } from '@/pkg/integrations/drizzle'
import { user, session, account, verification } from '../schemas'

export const AuthRepository = {
  // User operations
  findUserByEmail: async (email: string) => {
    const result = await db.select().from(user).where(eq(user.email, email)).limit(1)
    return result[0] || null
  },

  findUserById: async (id: string) => {
    const result = await db.select().from(user).where(eq(user.id, id)).limit(1)
    return result[0] || null
  },

  createUser: async (data: typeof user.$inferInsert) => {
    const result = await db.insert(user).values(data).returning()
    return result[0]
  },

  updateUser: async (id: string, data: Partial<typeof user.$inferInsert>) => {
    const result = await db.update(user).set(data).where(eq(user.id, id)).returning()
    return result[0]
  },

  deleteUser: async (id: string) => {
    await db.delete(user).where(eq(user.id, id))
  },

  // Session operations
  findSessionByToken: async (token: string) => {
    const result = await db.select().from(session).where(eq(session.token, token)).limit(1)
    return result[0] || null
  },

  findSessionById: async (id: string) => {
    const result = await db.select().from(session).where(eq(session.id, id)).limit(1)
    return result[0] || null
  },

  createSession: async (data: typeof session.$inferInsert) => {
    const result = await db.insert(session).values(data).returning()
    return result[0]
  },

  deleteSession: async (token: string) => {
    await db.delete(session).where(eq(session.token, token))
  },

  deleteSessionById: async (id: string) => {
    await db.delete(session).where(eq(session.id, id))
  },

  // Account operations
  findAccountByUserId: async (userId: string) => {
    const result = await db.select().from(account).where(eq(account.userId, userId))
    return result
  },

  createAccount: async (data: typeof account.$inferInsert) => {
    const result = await db.insert(account).values(data).returning()
    return result[0]
  },

  // Verification operations
  createVerification: async (data: typeof verification.$inferInsert) => {
    const result = await db.insert(verification).values(data).returning()
    return result[0]
  },

  findVerificationByIdentifier: async (identifier: string) => {
    const result = await db.select().from(verification).where(eq(verification.identifier, identifier)).limit(1)
    return result[0] || null
  },

  deleteVerification: async (identifier: string) => {
    await db.delete(verification).where(eq(verification.identifier, identifier))
  },
}
