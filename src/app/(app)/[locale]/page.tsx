import { HomeModule, LandingModule } from '@/app/modules'
import { auth } from '@/pkg/integrations/better-auth/auth.config'
import { headers } from 'next/headers'
import { FC, Suspense } from 'react'

// interface
interface IProps {}

// content component
const HomePageContent: FC = async () => {
  const headersList = await headers()
  const session = await auth.api.getSession({ headers: headersList })

  if (!session?.user) {
    return <LandingModule />
  }

  return <HomeModule />
}

// component
const HomePage: FC<Readonly<IProps>> = (props) => {
  return (
    <Suspense fallback={<div className='container mx-auto px-4 py-8 text-center'>Loading...</div>}>
      <HomePageContent />
    </Suspense>
  )
}

export default HomePage
