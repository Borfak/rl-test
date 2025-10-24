import { cn } from '@/config/styles/utils'
import { ReactNode } from 'react'

interface ContainerProps {
  children: ReactNode
  className?: string
}

export function ContainerComponent({ children, className }: ContainerProps) {
  return (
    <div
      className={cn(
        'mx-auto flex min-h-[calc(100vh-60px)] w-full max-w-5xl flex-col gap-6 px-4 pt-4 pb-8 md:px-6',
        className,
      )}
    >
      {children}
    </div>
  )
}
