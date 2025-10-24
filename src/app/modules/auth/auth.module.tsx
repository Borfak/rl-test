'use client'

import { LoginComponent, RegisterComponent } from '@/app/features'
import { FC } from 'react'

interface IProps {
  type: 'login' | 'register'
}

const AuthModule: FC<Readonly<IProps>> = (props) => {
  const { type } = props
  return (
    <div className='flex min-h-screen items-center justify-center p-4'>
      {type === 'login' ? <LoginComponent /> : <RegisterComponent />}
    </div>
  )
}

export default AuthModule