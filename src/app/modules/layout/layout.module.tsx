'use client'

// imports
import { type FC, type ReactNode } from 'react'
import { HeaderWidget, FooterWidget } from '@/app/widgets'

// interface
interface IProps {
  children: ReactNode
}

// component
const MainLayoutModule: FC<Readonly<IProps>> = ({ children }) => {
  // return
  return (
    <div className='flex min-h-screen flex-col'>
      <HeaderWidget />
      <main className='flex-1'>{children}</main>
      <FooterWidget />
    </div>
  )
}

export default MainLayoutModule
