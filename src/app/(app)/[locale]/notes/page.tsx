import { notesListOptions } from '@/app/entities/api'
import { NotesModule } from '@/app/modules'
import { auth } from '@/pkg/integrations/better-auth/auth.config'
import { getQueryClient } from '@/pkg/libraries/rest-api/service'
import { HydrationBoundary, dehydrate } from '@tanstack/react-query'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import { FC, Suspense } from 'react'

// interface
interface IProps {}

// content component
const NotesPageContent: FC = async () => {
  const headersList = await headers()
  const session = await auth.api.getSession({ headers: headersList })

  if (!session?.user) {
    redirect('/login')
  }

  const queryClient = getQueryClient()
  await queryClient.prefetchQuery(notesListOptions())

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesModule />
    </HydrationBoundary>
  )
}

// component
const NotesPage: FC<Readonly<IProps>> = (props) => {
  return (
    <Suspense fallback={<div className='container mx-auto px-4 py-8 text-center'>Loading...</div>}>
      <NotesPageContent />
    </Suspense>
  )
}

export default NotesPage
