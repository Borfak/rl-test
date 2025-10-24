import { headers } from 'next/headers'
import { HydrationBoundary, dehydrate } from '@tanstack/react-query'
import { getQueryClient } from '@/pkg/libraries/rest-api/service'
import { auth } from '@/pkg/integrations/better-auth/auth.config'
import { HomeModule, LandingModule } from '@/app/modules'
import { notesListOptions } from '@/app/entities/api'
import { FC } from 'react'

// interface
interface IProps {}

// component
const HomePage: FC<Readonly<IProps>> = async (props) => {
  const headersList = await headers()
  const session = await auth.api.getSession({ headers: headersList })

  // Show landing for unauthenticated users
  if (!session?.user) {
    return <LandingModule />
  }

  // Prefetch notes data for authenticated users
  const queryClient = getQueryClient()
  await queryClient.prefetchQuery(notesListOptions())

  // return
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <HomeModule />
    </HydrationBoundary>
  )
}

export default HomePage
