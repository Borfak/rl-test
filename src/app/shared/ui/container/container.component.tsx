import { cn } from '@/config/styles/utils'
import { ReactNode } from 'react'

interface ContainerProps {
  children: ReactNode
  className?: string
}

export function ContainerComponent({ children, className }: ContainerProps) {
  return <div className={cn('container mx-auto px-4 sm:px-6 lg:px-8', className)}>{children}</div>
}
