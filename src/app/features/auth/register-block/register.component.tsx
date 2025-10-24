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
interface RegisterFormData {
  name: string
  email: string
  password: string
  confirmPassword: string
}

// component
const RegisterComponent: FC<Readonly<IProps>> = (props: IProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<RegisterFormData>()
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const router = useRouter()
  const t = useTranslations('auth')

  const password = watch('password')

  const onSubmit = async (data: RegisterFormData) => {
    setError(null)
    setIsLoading(true)
    try {
      const result = await AuthApi.signUp({
        name: data.name,
        email: data.email,
        password: data.password,
        callbackURL: `${window.location.origin}/`,
      })

      if (result.error) {
        setError(result.error.message || t('registerError'))
        setIsLoading(false)
      } else {
        setIsSuccess(true)
        // Wait a bit to show success state, then navigate
        setTimeout(() => {
          router.push('/')
          router.refresh()
        }, 500)
      }
    } catch (err: any) {
      setError(err?.message || t('registerError'))
      setIsLoading(false)
    }
  }

  return (
    <Card className='w-full max-w-md'>
      <CardHeader>
        <CardTitle>{t('signUp')}</CardTitle>
        <CardDescription>{t('signUpDescription')}</CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent className='space-y-4'>
          {error && <div className='bg-destructive/15 text-destructive rounded-md p-3 text-sm'>{error}</div>}
          {isSuccess && (
            <div className='rounded-md bg-green-500/15 p-3 text-sm text-green-700 dark:text-green-400'>
              {t('registerSuccess')}
            </div>
          )}
          <div className='space-y-2'>
            <Label htmlFor='name'>{t('name')}</Label>
            <Input
              id='name'
              type='text'
              placeholder={t('namePlaceholder')}
              disabled={isLoading || isSuccess}
              {...register('name', {
                required: t('nameRequired'),
                minLength: {
                  value: 2,
                  message: t('nameMinLength'),
                },
              })}
            />
            {errors.name && <p className='text-destructive text-sm'>{errors.name.message}</p>}
          </div>
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
                minLength: { value: 8, message: t('passwordMinLength') },
              })}
            />
            {errors.password && <p className='text-destructive text-sm'>{errors.password.message}</p>}
          </div>
          <div className='space-y-2'>
            <Label htmlFor='confirmPassword'>{t('confirmPassword')}</Label>
            <Input
              id='confirmPassword'
              type='password'
              placeholder='••••••••'
              disabled={isLoading || isSuccess}
              {...register('confirmPassword', {
                required: t('confirmPasswordRequired'),
                validate: (value) => value === password || t('passwordsDoNotMatch'),
              })}
            />
            {errors.confirmPassword && <p className='text-destructive text-sm'>{errors.confirmPassword.message}</p>}
          </div>
        </CardContent>
        <CardFooter className='flex flex-col space-y-4'>
          <Button type='submit' className='w-full' disabled={isLoading || isSuccess}>
            {isLoading ? t('creatingAccount') : isSuccess ? t('success') : t('createAccount')}
          </Button>
          <p className='text-muted-foreground text-center text-sm'>
            {t('haveAccount')}{' '}
            <Link href='/login' className='text-primary hover:underline'>
              {t('signIn')}
            </Link>
          </p>
        </CardFooter>
      </form>
    </Card>
  )
}

export default RegisterComponent
