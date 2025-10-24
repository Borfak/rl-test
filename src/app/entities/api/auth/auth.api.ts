import { authClient } from '@/pkg/integrations/better-auth'
import type { ISignInData, ISignUpData } from '@/app/entities/models'

export const AuthApi = {
  signIn: async (data: ISignInData) => {
    return await authClient.signIn.email({
      email: data.email,
      password: data.password,
      callbackURL: data.callbackURL,
    })
  },

  signUp: async (data: ISignUpData) => {
    return await authClient.signUp.email({
      email: data.email,
      password: data.password,
      name: data.name,
      callbackURL: data.callbackURL,
    })
  },

  signOut: async (callbackURL?: string) => {
    return await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          window.location.href = callbackURL || '/'
        },
      },
    })
  },
}
