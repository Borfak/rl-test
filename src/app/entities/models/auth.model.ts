export interface ISignInData {
  email: string
  password: string
  callbackURL?: string
}

export interface ISignUpData {
  email: string
  password: string
  name: string
  callbackURL?: string
}

export interface IUser {
  id: string
  email: string
  name: string
  createdAt: string
  updatedAt: string
}
