'use client'

// imports
import { type FC, type ReactNode } from 'react'

// interface
interface IProps {
  children: ReactNode
}

// component
const MainLayoutModule: FC<Readonly<IProps>> = ({ children }) => {
  // return
  return (
    <div className='flex min-h-screen flex-col'>
      <main className='flex-1'>{children}</main>
    </div>
  )
}

export default MainLayoutModule
