'use client'

import { Button } from '@/app/shared/ui'
import { AuthApi } from '@/app/entities/api'
import { FC, useState } from 'react'
import { usePathname } from 'next/navigation'

// interface
interface IProps {
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link'
  size?: 'default' | 'sm' | 'lg' | 'icon'
  className?: string
}

const LogoutButtonComponent: FC<Readonly<IProps>> = (props) => {
  const { variant = 'outline', size = 'default', className } = props
  const [isLoading, setIsLoading] = useState(false)
  const pathname = usePathname()
  const locale = pathname.split('/')[1] || 'en'

  const handleLogout = async () => {
    setIsLoading(true)
    try {
      await AuthApi.signOut(`/${locale}/login`)
    } catch (error) {
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Button onClick={handleLogout} variant={variant} size={size} className={className} disabled={isLoading}>
      {isLoading ? 'Signing out...' : 'Sign Out'}
    </Button>
  )
}

export default LogoutButtonComponent