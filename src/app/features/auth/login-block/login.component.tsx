'use client'

import { useForm } from 'react-hook-form'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/app/shared/ui'
import { Button } from '@/app/shared/ui'
import { Input } from '@/app/shared/ui'
import { Label } from '@/app/shared/ui'
import { AuthApi } from '@/app/entities/api'
import { FC, useState } from 'react'
import { Link, useRouter } from '@/pkg/libraries/locale'
import { useTranslations } from 'next-intl'

// interface
interface IProps {}

// interface
interface IFormData {
  email: string
  password: string
}

const LoginComponent: FC<Readonly<IProps>> = (props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormData>()
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const router = useRouter()
  const t = useTranslations('auth')

  const onSubmit = async (data: IFormData) => {
    setError(null)
    setIsLoading(true)
    try {
      const result = await AuthApi.signIn({
        ...data,
        callbackURL: `${window.location.origin}/`,
      })

      if (result.error) {
        setError(result.error.message || t('loginError'))
        setIsLoading(false)
      } else {
        setIsSuccess(true)
        setTimeout(() => {
          router.push('/')
          router.refresh()
        }, 500)
      }
    } catch (err: any) {
      setError(err?.message || t('loginError'))
      setIsLoading(false)
    }
  }

  return (
    <Card className='w-full max-w-md'>
      <CardHeader>
        <CardTitle>{t('signIn')}</CardTitle>
        <CardDescription>{t('signInDescription')}</CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent className='space-y-4'>
          {error && <div className='bg-destructive/15 text-destructive rounded-md p-3 text-sm'>{error}</div>}
          {isSuccess && (
            <div className='rounded-md bg-green-500/15 p-3 text-sm text-green-700 dark:text-green-400'>
              {t('loginSuccess')}
            </div>
          )}
          <div className='space-y-2'>
            <Label htmlFor='email'>{t('email')}</Label>
            <Input
              id='email'
              type='email'
              placeholder={t('emailPlaceholder')}
              disabled={isLoading || isSuccess}
              {...register('email', {
                required: t('emailRequired'),
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: t('emailInvalid'),
                },
              })}
            />
            {errors.email && <p className='text-destructive text-sm'>{errors.email.message}</p>}
          </div>
          <div className='space-y-2'>
            <Label htmlFor='password'>{t('password')}</Label>
            <Input
              id='password'
              type='password'
              placeholder='••••••••'
              disabled={isLoading || isSuccess}
              {...register('password', {
                required: t('passwordRequired'),
                minLength: {
                  value: 8,
                  message: t('passwordMinLength'),
                },
              })}
            />
            {errors.password && <p className='text-destructive text-sm'>{errors.password.message}</p>}
          </div>
        </CardContent>
        <CardFooter className='flex flex-col space-y-4'>
          <Button type='submit' className='w-full' disabled={isLoading || isSuccess}>
            {isLoading ? t('signingIn') : isSuccess ? t('success') : t('signIn')}
          </Button>
          <p className='text-muted-foreground text-center text-sm'>
            {t('noAccount')}{' '}
            <Link href='/register' className='text-primary hover:underline'>
              {t('signUp')}
            </Link>
          </p>
        </CardFooter>
      </form>
    </Card>
  )
}

export default LoginComponent
