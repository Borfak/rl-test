import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'

import { envServer } from '@/config/env'

class DrizzleClient {
  private static instance: DrizzleClient | null = null
  private _db: ReturnType<typeof drizzle>
  private _client: ReturnType<typeof postgres>

  private constructor() {
    const connectionString = envServer.DATABASE_URL
    this._client = postgres(connectionString, { prepare: false })
    this._db = drizzle(this._client)
  }

  public static getInstance(): DrizzleClient {
    if (!DrizzleClient.instance) {
      DrizzleClient.instance = new DrizzleClient()
    }
    return DrizzleClient.instance
  }

  public get db() {
    return this._db
  }

  public get client() {
    return this._client
  }

  public async close() {
    await this._client.end()
    DrizzleClient.instance = null
  }
}

export const getDrizzleClient = () => DrizzleClient.getInstance()
export const db = getDrizzleClient().db
export const client = getDrizzleClient().client
